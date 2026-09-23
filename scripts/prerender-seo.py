#!/usr/bin/env python3
"""Write a fully rendered HTML file per route, plus sitemap.xml and robots.txt.

GitHub Pages has no rewrite rules. A real file at dist/collections/aw26/index.html
makes that URL return HTTP 200 instead of 404. Each file carries the route's
title/description/OG tags and its server-rendered page body, because Baidu,
360, Sogou and WeChat read the raw HTML and mostly do not run JavaScript.

Route metadata comes from src/seo/routes.ts via the SSR bundle, so the app and
this script can no longer drift apart.
"""

from __future__ import annotations

import json
import re
import subprocess
from datetime import date
from html import escape
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DIST = ROOT / "dist"

# Paste the codes from each webmaster console here, then rebuild and deploy.
# 百度 ziyuan.baidu.com · 360 zhanzhang.so.com · 搜狗 zhanzhang.sogou.com · 必应 bing.com/webmasters
SITE_VERIFICATION: dict[str, str] = {
    "baidu-site-verification": "",
    "360-site-verification": "",
    "sogou_site_verification": "",
    "msvalidate.01": "",
}


def load_routes() -> tuple[str, list[dict], dict[str, str]]:
    out = subprocess.run(
        ["node", str(ROOT / "scripts" / "render-routes.mjs")],
        check=True,
        capture_output=True,
        text=True,
    ).stdout
    data = json.loads(out)
    return data["origin"], data["routes"], data["html"]


def abs_url(origin: str, path: str) -> str:
    # Mirrors canonicalUrl() in src/seo/routes.ts: the trailing-slash form is the 200.
    return f"{origin}/" if path == "/" else f"{origin}{path}/"


def structured_data(origin: str) -> str:
    graph = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": f"{origin}/#org",
                "name": "SYW",
                "alternateName": ["SYW官网", "SYW 官方网站"],
                "url": f"{origin}/",
                "logo": f"{origin}/apple-touch-icon.png",
                "description": "SYW 成衣与配饰品牌，以卓越品质与持久设计为核心。",
            },
            {
                "@type": "WebSite",
                "@id": f"{origin}/#site",
                "name": "SYW 官方网站",
                "url": f"{origin}/",
                "inLanguage": "zh-CN",
                "publisher": {"@id": f"{origin}/#org"},
            },
        ],
    }
    body = json.dumps(graph, ensure_ascii=False, indent=2).replace("</", "<\\/")
    return f'    <script type="application/ld+json">\n{body}\n    </script>'


def inject(html: str, origin: str, page: dict, markup: str) -> str:
    url = abs_url(origin, page["path"])
    image = f"{origin}{page['image']}"
    title = escape(page["title"])
    desc = escape(page["description"])

    html = re.sub(r"<title>[^<]*</title>", f"<title>{title}</title>", html, count=1)
    html = re.sub(
        r'<meta\s+name="description"\s+content="[^"]*"\s*/>',
        f'<meta name="description" content="{desc}" />',
        html,
        count=1,
    )

    lines = [
        f'    <meta name="keywords" content="{escape(page["keywords"])}" />',
        f'    <link rel="canonical" href="{url}" />',
        '    <meta property="og:site_name" content="SYW" />',
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
    if page["path"] == "/":
        lines += [
            f'    <meta name="{name}" content="{escape(code)}" />'
            for name, code in SITE_VERIFICATION.items()
            if code
        ]
        lines.append(structured_data(origin))
    html = html.replace("<title>", "\n".join(lines) + "\n    <title>", 1)

    # Hero preload is only useful on the homepage.
    if page["path"] != "/":
        html = re.sub(
            r"\s*<!-- Hero still[\s\S]*?<link\s+rel=\"preload\"\s+as=\"image\"[\s\S]*?/>",
            "",
            html,
            count=1,
        )

    # createRoot in main.tsx replaces this markup once the bundle loads.
    return html.replace('<div id="root"></div>', f'<div id="root">{markup}</div>', 1)


def dest_for(path: str) -> Path:
    if path == "/":
        return DIST / "index.html"
    return DIST / path.lstrip("/") / "index.html"


def write_sitemap(origin: str, pages: list[dict]) -> None:
    today = date.today().isoformat()
    urls = "\n".join(
        f"  <url><loc>{abs_url(origin, p['path'])}</loc><lastmod>{today}</lastmod></url>"
        for p in pages
        if p["sitemap"]
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
        f"Sitemap: {origin}/sitemap.xml\n",
        encoding="utf-8",
    )


def main() -> None:
    shell = (DIST / "index.html").read_text(encoding="utf-8")
    origin, pages, markup = load_routes()
    for page in pages:
        dest = dest_for(page["path"])
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_text(inject(shell, origin, page, markup[page["path"]]), encoding="utf-8")
        print(f"  {page['path']}  →  {page['title']}")
    write_sitemap(origin, pages)
    print(f"wrote {len(pages)} html files, sitemap, robots.txt")


if __name__ == "__main__":
    main()
