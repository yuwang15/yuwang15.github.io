#!/usr/bin/env python3
"""Generate right-sized WebP derivatives for the store listing page.

The listing shows one hero and two thumbs per store.
Reads src/data/stores.ts so the set stays in sync when images change.
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

HERO_W = 1800
THUMB_W = 1000
QUALITY = 80


def parse_listing_images() -> list[tuple[str, int]]:
    src = DATA.read_text(encoding="utf-8")
    picks: list[tuple[str, int]] = []

    for block in re.findall(r"images:\s*\[(.*?)\]", src, re.S):
        urls = re.findall(r"'([^']+)'", block)
        if len(urls) < 3:
            continue
        picks.append((urls[0], HERO_W))
        picks.append((urls[1], THUMB_W))
        picks.append((urls[2], THUMB_W))

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
            im = im.resize(
                (width, round(im.height * width / im.width)), Image.LANCZOS
            )
        im.save(out, "WEBP", quality=QUALITY, method=6)

        src_kb = src_path.stat().st_size / 1024
        out_kb = out.stat().st_size / 1024
        before += src_kb
        after += out_kb
        print(f"{public_url:50s} {src_kb:8.0f} KB -> {out_kb:6.0f} KB  {out.name}")

    print(f"\n{len(picks)} images  {before:.0f} KB -> {after:.0f} KB")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
