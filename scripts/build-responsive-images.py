#!/usr/bin/env python3
"""Build high-quality responsive WebP variants (downscale only, never upscale).

Preserves visual quality: WebP q=90 + LANCZOS. Browsers pick the right width
via srcset so phones stop downloading 2800px masters.

Output: public/assets/.rsp/<rel-stem>/w{WIDTH}.webp
Manifest: src/data/responsive.manifest.json
Run: npm run images:responsive
"""

from __future__ import annotations

import json
import os
from concurrent.futures import ProcessPoolExecutor, as_completed
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public" / "assets"
OUT_ROOT = PUBLIC / ".rsp"
MANIFEST = ROOT / "src" / "data" / "responsive.manifest.json"

WIDTHS = (720, 1080, 1440, 1920, 2560)
WEBP_QUALITY = 90
SKIP_DIR_NAMES = {"derived", ".rsp", "_orient", "qr", "share"}


def should_skip(path: Path) -> bool:
    if any(part in SKIP_DIR_NAMES for part in path.parts):
        return True
    return path.suffix.lower() not in {".jpg", ".jpeg", ".png", ".webp"}


def out_dir_for(src: Path) -> Path:
    rel = src.relative_to(PUBLIC)
    return OUT_ROOT / rel.with_suffix("")


def target_widths(src_w: int) -> list[int]:
    targets = [w for w in WIDTHS if src_w >= w]
    if src_w not in targets:
        # Keep a near-original tier when master isn't on the ladder.
        targets.append(min(src_w, WIDTHS[-1]))
    return sorted(set(targets))


def process_one(src_str: str) -> tuple[str, list[int]]:
    src = Path(src_str)
    im = ImageOps.exif_transpose(Image.open(src))
    if im.mode not in ("RGB", "RGBA"):
        im = im.convert("RGB")
    elif im.mode == "RGBA":
        bg = Image.new("RGB", im.size, (255, 255, 255))
        bg.paste(im, mask=im.split()[-1])
        im = bg

    dest_dir = out_dir_for(src)
    dest_dir.mkdir(parents=True, exist_ok=True)
    widths = target_widths(im.width)
    public_url = "/assets/" + src.relative_to(PUBLIC).as_posix()

    for w in widths:
        out = dest_dir / f"w{w}.webp"
        if out.exists() and out.stat().st_mtime >= src.stat().st_mtime:
            continue
        if w == im.width:
            frame = im
        else:
            frame = im.resize(
                (w, round(im.height * w / im.width)),
                Image.Resampling.LANCZOS,
            )
        frame.save(out, "WEBP", quality=WEBP_QUALITY, method=6)

    return public_url, widths


def collect_sources() -> list[Path]:
    return sorted(p for p in PUBLIC.rglob("*") if p.is_file() and not should_skip(p))


def main() -> int:
    sources = collect_sources()
    print(f"sources: {len(sources)}")
    workers = max(1, min(8, os.cpu_count() or 4))
    manifest: dict[str, list[int]] = {}
    done = 0
    with ProcessPoolExecutor(max_workers=workers) as pool:
        futures = [pool.submit(process_one, str(p)) for p in sources]
        for fut in as_completed(futures):
            url, widths = fut.result()
            manifest[url] = widths
            done += 1
            if done % 40 == 0 or done == len(sources):
                print(f"[{done}/{len(sources)}] {url} -> {widths}")

    MANIFEST.parent.mkdir(parents=True, exist_ok=True)
    MANIFEST.write_text(
        json.dumps(dict(sorted(manifest.items())), indent=2) + "\n",
        encoding="utf-8",
    )
    print(f"manifest: {MANIFEST} ({len(manifest)} entries)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
