#!/usr/bin/env python3
"""Tell IndexNow engines (Bing, Yandex, Seznam, Naver…) that every sitemap URL changed.

Run after a deploy is live: npm run seo:ping
The key file public/<KEY>.txt must be reachable on the live site first.
Baidu, 360 and Sogou do not take IndexNow; submit to them in their webmaster consoles.
"""

from __future__ import annotations

import json
import re
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
KEY = "db5cbade336cdb13ce76d1b7e528e5a0"
HOST = "syw.fashion"


def main() -> None:
    sitemap = (ROOT / "dist" / "sitemap.xml").read_text(encoding="utf-8")
    urls = re.findall(r"<loc>([^<]+)</loc>", sitemap)
    body = json.dumps(
        {
            "host": HOST,
            "key": KEY,
            "keyLocation": f"https://{HOST}/{KEY}.txt",
            "urlList": urls,
        }
    ).encode()
    req = urllib.request.Request(
        "https://api.indexnow.org/indexnow",
        data=body,
        headers={"Content-Type": "application/json; charset=utf-8"},
    )
    with urllib.request.urlopen(req, timeout=30) as res:
        print(f"IndexNow {res.status}: submitted {len(urls)} urls")


if __name__ == "__main__":
    main()
