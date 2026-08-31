#!/usr/bin/env python3
"""Stamp per-route title/description/OG onto copies of the Vite HTML shell.

GitHub Pages has no rewrite rules. A real file at dist/collections/aw26/index.html
makes that URL return HTTP 200 instead of 404, so crawlers (and WeChat, which
does not run JavaScript) can read the tags.
"""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DIST = ROOT / "dist"
ORIGIN = "https://syw.fashion"
DEFAULT_IMAGE = "/assets/share/og.jpg"

# Keep in lockstep with src/seo/routes.ts
PAGES: list[dict] = [
    {
        "path": "/",
        "title": "SYW",
        "description": "SYW — 成衣与配饰，以卓越品质与持久设计为核心。",
        "image": DEFAULT_IMAGE,
        "sitemap": True,
    },
    {
        "path": "/collections",
        "title": "系列 | SYW",
        "description": "SYW 成衣系列：Ridge、Rise、Quiet Form、Daylight、Away。",
        "image": DEFAULT_IMAGE,
        "sitemap": True,
    },
    {
        "path": "/films",
        "title": "品牌视频 | SYW",
        "description": "SYW 品牌短片与系列影像。",
        "image": DEFAULT_IMAGE,
        "sitemap": True,
    },
    {
        "path": "/services",
        "title": "服务 | SYW",
        "description": "尺码、现货与到店试穿，通过官方微信咨询。",
        "image": DEFAULT_IMAGE,
        "sitemap": True,
    },
    {
        "path": "/brand",
        "title": "关于我们 | SYW",
        "description": "SYW 成衣与配饰品牌。穿得好看，也穿得自在。",
        "image": DEFAULT_IMAGE,
        "sitemap": True,
    },
    {
        "path": "/contact",
        "title": "加盟合作 | SYW",
        "description": "SYW 加盟与合作咨询，请通过官方微信联系。",
        "image": DEFAULT_IMAGE,
        "sitemap": True,
    },
    {
        "path": "/stores",
        "title": "门店 | SYW",
        "description": "添加官方微信，咨询门店地址、营业时间与当季在售款式。",
        "image": DEFAULT_IMAGE,
        "sitemap": False,
    },
]


def parse_collections() -> list[dict]:
    text = (ROOT / "src" / "data" / "collections.ts").read_text(encoding="utf-8")
    blocks = re.findall(
        r"slug:\s*'([^']+)'\s*,\s*title:\s*'([^']+)'\s*,\s*"
        r"season:\s*\{\s*zh:\s*'([^']+)'[\s\S]*?year:\s*'(\d+)'\s*,\s*"
        r"summary:\s*\{\s*zh:\s*'([^']+)'",
        text,
    )
    if len(blocks) < 5:
        raise SystemExit(f"expected at least 5 collections, parsed {len(blocks)}")
    pages = []
    for slug, title, season, year, summary in blocks:
        pages.append(
            {
                "path": f"/collections/{slug}",
                "title": f"{title} {year} {season}系列 | SYW",
                "description": f"{title}，SYW {year} {season}系列。{summary}",
                "image": f"/assets/share/og-{slug}.jpg",
                "sitemap": True,
            }
        )
    return pages


def abs_url(path: str) -> str:
    if path == "/":
        return f"{ORIGIN}/"
    return f"{ORIGIN}{path}"


def inject(html: str, page: dict) -> str:
    url = abs_url(page["path"])
    image = f"{ORIGIN}{page['image']}"
    title = page["title"]
    desc = page["description"]

    html = re.sub(r"<title>[^<]*</title>", f"<title>{title}</title>", html, count=1)
    html = re.sub(
        r'<meta\s+name="description"\s+content="[^"]*"\s*/>',
        f'<meta name="description" content="{desc}" />',
        html,
        count=1,
    )

    extra = "\n".join(
        [
            f'    <link rel="canonical" href="{url}" />',
            f'    <meta property="og:site_name" content="SYW" />',
            '    <meta property="og:type" content="website" />',
            '    <meta property="og:locale" content="zh_CN" />',
            f'    <meta property="og:title" content="{title}" />',
            f'    <meta property="og:description" content="{desc}" />',
            f'    <meta property="og:url" content="{url}" />',
            f'    <meta property="og:image" content="{image}" />',
            '    <meta property="og:image:width" content="1200" />',
            '    <meta property="og:image:height" content="630" />',
            '    <meta name="twitter:card" content="summary_large_image" />',
            f'    <meta name="twitter:title" content="{title}" />',
            f'    <meta name="twitter:description" content="{desc}" />',
            f'    <meta name="twitter:image" content="{image}" />',
        ]
    )
    html = html.replace("<title>", extra + "\n    <title>", 1)

    # Hero preload is only useful on the homepage.
    if page["path"] != "/":
        html = re.sub(
            r"\s*<!-- Hero still[\s\S]*?<link\s+rel=\"preload\"\s+as=\"image\"[\s\S]*?/>",
            "",
            html,
            count=1,
        )

    noscript = (
        f'    <noscript><h1>{title}</h1><p>{desc}</p></noscript>\n'
        "    <div id=\"root\"></div>"
    )
    html = html.replace('<div id="root"></div>', noscript, 1)
    return html


def dest_for(path: str) -> Path:
    if path == "/":
        return DIST / "index.html"
    return DIST / path.lstrip("/") / "index.html"


def write_sitemap(pages: list[dict]) -> None:
    listed = [p for p in pages if p["sitemap"]]
    urls = "\n".join(
        f"  <url><loc>{abs_url(p['path'])}</loc></url>" for p in listed
    )
    (DIST / "sitemap.xml").write_text(
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        f"{urls}\n"
        "</urlset>\n",
        encoding="utf-8",
    )
    (DIST / "robots.txt").write_text(
        "User-agent: *\n"
        "Allow: /\n"
        f"Sitemap: {ORIGIN}/sitemap.xml\n",
        encoding="utf-8",
    )


def main() -> None:
    shell = (DIST / "index.html").read_text(encoding="utf-8")
    pages = PAGES + parse_collections()
    for page in pages:
        dest = dest_for(page["path"])
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_text(inject(shell, page), encoding="utf-8")
        print(f"  {page['path']}  →  {page['title']}")
    write_sitemap(pages)
    print(f"wrote {len(pages)} html files, sitemap, robots.txt")


if __name__ == "__main__":
    main()
