#!/usr/bin/env python3
"""Generate right-sized WebP derivatives for the store listing page.

The listing shows one hero (~858x528 CSS) and two thumbs (~373x263 CSS) per
store, but the source photos are 2800-3000px wide and 1-3 MB each. Serving the
originals there costs ~12 MB and makes the last thumb visibly trail behind.

Reads src/data/stores.ts so the set stays in sync when covers change.
Run: npm run images:stores
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "src" / "data" / "stores.ts"
PUBLIC = ROOT / "public"

# Widest CSS box x2 for retina, with headroom for object-fit: cover cropping.
HERO_W = 1800
THUMB_W = 1000
QUALITY = 80


def parse_listing_images() -> list[tuple[str, int]]:
    """Return [(public_path, target_width)] for every image the listing renders."""
    src = DATA.read_text(encoding="utf-8")
    picks: list[tuple[str, int]] = []

    for block in src.split("slug:")[1:]:
        cover = re.search(r"cover:\s*'([^']+)'", block)
        images_block = re.search(r"images:\s*\[(.*?)\]", block, re.S)
        if not cover or not images_block:
            continue
        picks.append((cover.group(1), HERO_W))
        urls = re.findall(r"'([^']+)'", images_block.group(1))
        for url in urls[1:3]:
            picks.append((url, THUMB_W))

    return picks


def derived_path(public_url: str, width: int) -> Path:
    rel = public_url.lstrip("/")
    p = PUBLIC / rel
    suffix = "hero" if width == HERO_W else "thumb"
    return p.parent / "derived" / f"{p.stem}-{suffix}.webp"


def main() -> int:
    picks = parse_listing_images()
    if not picks:
        print("No listing images found in stores.ts", file=sys.stderr)
        return 1

    before = after = 0
    for public_url, width in picks:
        src_path = PUBLIC / public_url.lstrip("/")
        if not src_path.exists():
            print(f"missing: {src_path}", file=sys.stderr)
            return 1

        out = derived_path(public_url, width)
        out.parent.mkdir(parents=True, exist_ok=True)

        im = ImageOps.exif_transpose(Image.open(src_path)).convert("RGB")
        if im.width > width:
            im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
        im.save(out, "WEBP", quality=QUALITY, method=6)

        src_kb = src_path.stat().st_size / 1024
        out_kb = out.stat().st_size / 1024
        before += src_kb
        after += out_kb
        print(f"{public_url:45s} {src_kb:8.0f} KB -> {out_kb:6.0f} KB  {out.name}")

    print(f"\ntotal {before / 1024:.1f} MB -> {after / 1024:.2f} MB")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
