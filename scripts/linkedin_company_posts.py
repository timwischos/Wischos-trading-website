"""List recent posts on a public LinkedIn company page, newest first, with exact dates.

Reads the logged-out (guest) view only; never signs in. LinkedIn activity IDs carry
their creation time in the top 41 bits, so dates are exact rather than "1w ago".

Usage: python scripts/linkedin_company_posts.py <company-page-url> [--days 30]
"""
import datetime as dt
import html
import re
import sys
import urllib.request

UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"
POST_RE = re.compile(r"https://[a-z]+\.linkedin\.com/(?:posts/[^\"?&\s<]*?activity-(\d{19})[^\"?&\s<]*|feed/update/urn:li:(?:activity|ugcPost|share):(\d{19}))")


def post_date(activity_id):
    return dt.datetime.fromtimestamp((int(activity_id) >> 22) / 1000, dt.UTC).date()


def main():
    args = sys.argv[1:]
    if not args:
        sys.exit(__doc__)
    url = args[0]
    days = int(args[args.index("--days") + 1]) if "--days" in args else 30

    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept-Language": "en"})
    try:
        with urllib.request.urlopen(req, timeout=25) as resp:
            final, page = resp.geturl(), resp.read().decode("utf-8", "ignore")
    except Exception as e:  # noqa: BLE001 - report and let the caller mark it 未扫成
        print(f"FETCH_FAILED {e}")
        return
    if "authwall" in final or "/login" in final:
        print("AUTHWALL — 记为未扫成，不要登录、不要重试")
        return

    title = re.search(r"<title>([^<]*)", page)
    followers = re.search(r"([\d,]+) followers", page)
    print(f"页面: {html.unescape(title.group(1)) if title else url}")
    print(f"关注者: {followers.group(1) if followers else '?'}")

    posts = {}
    for m in POST_RE.finditer(page):
        aid = m.group(1) or m.group(2)
        link = m.group(0)
        # prefer the readable /posts/ permalink over the bare urn form
        if aid not in posts or "/posts/" in link:
            posts[aid] = link
    cutoff = dt.date.today() - dt.timedelta(days=days)
    rows = sorted(((post_date(a), l) for a, l in posts.items()), reverse=True)
    recent = [(d, l) for d, l in rows if d >= cutoff]
    print(f"帖子共 {len(rows)} 条，近 {days} 天 {len(recent)} 条；最新一条 {rows[0][0] if rows else '无'}")
    for d, l in recent:
        print(f"{d}  {l}")


if __name__ == "__main__":
    main()
