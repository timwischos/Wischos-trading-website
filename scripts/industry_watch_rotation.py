"""Pick today's line-C rotation for industry-watch.

Pool: master index rows graded A / B+ / B, plus ungraded rows already in outreach,
excluding US and archived/paused rows.
Order: never scanned first, then oldest scan date; ties broken by grade then Fit.
Active follow-ups (stage shows outreach already happened) get a reserved share.

Usage: python scripts/industry_watch_rotation.py [N] [--active K]
"""
import re
import sys
from pathlib import Path

import pandas as pd

ROOT = Path(__file__).resolve().parent.parent
INDEX = ROOT / "客户系统/00_主索引/Wischos_客户主索引.xlsx"
LEDGER = ROOT / "docs/industry-watch/_ledger.md"
HOLD = ROOT / "客户系统/03_外展跟进/联系限制名单.md"

GRADE_ORDER = {"A": 0, "B+": 1, "B": 2}
NOT_ACTIVE = {"待接触", "待开发", "已调查/已建档", "⬜ 待接触", "未连接", "待联系人确认"}


def market_rank(s):
    # AU/NZ > UK/EU > CA > UAE > rest, per the SKILL's market priority
    for rank, pat in enumerate([r"AU|NZ|澳|新西兰", r"UK|英国|欧洲|爱尔兰", r"加拿大|Canada|BC\b|Ontario", r"UAE"]):
        if re.search(pat, s):
            return rank
    return 4


def norm(s):
    return re.sub(r"[^a-z0-9]", "", str(s).lower())


def last_scanned():
    seen = {}
    if not LEDGER.exists():
        return seen
    for line in LEDGER.read_text(encoding="utf-8").splitlines():
        cells = [c.strip() for c in line.strip().strip("|").split("|")]
        if len(cells) < 4 or cells[1] != "C" or not re.match(r"\d{4}-\d{2}-\d{2}", cells[0]):
            continue
        name = re.split(r" — | → ", cells[2])[0]
        key = norm(name)
        seen[key] = max(seen.get(key, ""), cells[0])
    return seen


def hold_keys():
    if not HOLD.exists():
        return set()
    keys = set()
    for line in HOLD.read_text(encoding="utf-8").splitlines():
        cells = [c.strip() for c in line.strip().strip("|").split("|")]
        if len(cells) >= 4 and re.match(r"\d{4}-\d{2}-\d{2}", cells[0]):
            keys.add(norm(re.split(r"[（(]", cells[1])[0]))
            for d in cells[3].split("/"):
                keys.add(norm(d))
    return keys


LI_RE = re.compile(r"https?://(?:[a-z]{2,3}\.)?linkedin\.com/company/[A-Za-z0-9%_\-.]+")


def linkedin_url(profile_path):
    """First company-page URL found in the customer's profile folder, if any."""
    if not isinstance(profile_path, str) or not profile_path.strip():
        return ""
    p = Path(profile_path.replace("/mnt/d/", "D:/"))
    files = [p] if p.is_file() else sorted(p.glob("*.md")) if p.is_dir() else []
    for f in files:
        m = LI_RE.search(f.read_text(encoding="utf-8", errors="ignore"))
        if m:
            return m.group(0).rstrip(".")
    return ""


def main():
    args = sys.argv[1:]
    n = int(args[0]) if args and args[0].isdigit() else 18
    k_active = int(args[args.index("--active") + 1]) if "--active" in args else 10

    df = pd.read_excel(INDEX, sheet_name=0)
    stage = df["当前阶段"].fillna("").astype(str).str.strip()
    # ungraded rows still count when outreach is already underway (e.g. DF034 P1 rows)
    df = df[df["评级"].isin(GRADE_ORDER) | (df["评级"].isna() & (stage != "") & ~stage.isin(NOT_ACTIVE))]
    df = df[~df["国家/地区"].astype(str).str.contains("美国|US\\b|USA", regex=True)]
    df = df[~df["当前阶段"].astype(str).str.contains("淘汰|暂停|排除")]

    seen, holds = last_scanned(), hold_keys()

    def scanned(row):
        names = [row["标准公司名"]] + str(row["别名/名称变体"]).split("/")
        return max((seen.get(norm(x), "") for x in names), default="")

    df = df.assign(
        last=df.apply(scanned, axis=1),
        g=df["评级"].map(GRADE_ORDER).fillna(3),
        mkt=df["国家/地区"].fillna("").astype(str).map(market_rank),
        active=df["当前阶段"].notna() & ~df["当前阶段"].astype(str).str.strip().isin(NOT_ACTIVE),
        hold=df.apply(lambda r: norm(r["标准公司名"]) in holds or norm(r["官网域名"]) in holds, axis=1),
    ).sort_values(["last", "g", "mkt", "Fit"], ascending=[True, True, True, False])

    act = df[df["active"]].head(k_active)
    rest = df.drop(act.index).head(n - len(act))
    pick = pd.concat([act, rest])

    print(f"池子 {len(df)} 家（其中跟进中 {int(df['active'].sum())}），今日 {len(pick)} 家\n")
    print("| 公司 | ID | 级 | 市场 | 官网 | LinkedIn 公司页 | 阶段 | 上次扫描 | 限制 |")
    print("|---|---|---|---|---|---|---|---|---|")
    for _, r in pick.iterrows():
        stage = str(r["当前阶段"])[:30] if pd.notna(r["当前阶段"]) else ""
        dom = r["官网域名"] if pd.notna(r["官网域名"]) else "（无，需搜索）"
        li = linkedin_url(r["正式档案路径"]) or "（档案里没有，需查找）"
        print(f"| {r['标准公司名']} | {r['客户ID']} | {r['评级']} | {str(r['国家/地区'])[:20]} | {dom} | {li} | {stage} "
              f"| {r['last'] or '从未'} | {'⚠️联系限制' if r['hold'] else ''} |")


if __name__ == "__main__":
    main()
