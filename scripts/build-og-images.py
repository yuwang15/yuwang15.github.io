#!/usr/bin/env python3
"""Crop existing stills into 1200×630 Open Graph cards."""

from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "assets" / "share"

# Focus a bit above centre so faces in lookbook covers stay in frame.
FOCUS_Y = 0.28
SIZE = (1200, 630)

SOURCES = {
    "og.jpg": ROOT / "public" / "assets" / "hero-main.jpg",
    "og-aw26.jpg": ROOT / "public" / "assets" / "collections" / "aw26" / "cover.jpg",
    "og-spring26.jpg": ROOT / "public" / "assets" / "collections" / "spring26" / "cover.jpg",
    "og-aw25.jpg": ROOT / "public" / "assets" / "collections" / "aw25" / "cover.jpg",
    "og-ss26.jpg": ROOT / "public" / "assets" / "collections" / "ss26" / "cover.jpg",
    "og-resort26.jpg": ROOT / "public" / "assets" / "collections" / "resort26" / "cover.jpg",
}


def crop_cover(src: Path) -> Image.Image:
    im = Image.open(src).convert("RGB")
    tw, th = SIZE
    sw, sh = im.size
    scale = max(tw / sw, th / sh)
    nw, nh = round(sw * scale), round(sh * scale)
    im = im.resize((nw, nh), Image.LANCZOS)
    left = (nw - tw) // 2
    top = max(0, min(nh - th, int(nh * FOCUS_Y) - th // 2))
    return im.crop((left, top, left + tw, top + th))


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for name, src in SOURCES.items():
        if not src.exists():
            raise SystemExit(f"missing source: {src}")
        dest = OUT / name
        crop_cover(src).save(dest, "JPEG", quality=86, optimize=True)
        print(f"{dest.relative_to(ROOT)}  {dest.stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()
