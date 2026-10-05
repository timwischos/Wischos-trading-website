#!/usr/bin/env python3
"""Create a compact, reviewable Gate 1 evidence file from Firecrawl search outputs."""

from __future__ import annotations

import json
import re
from pathlib import Path
from urllib.parse import urlparse


ROOT = Path(__file__).resolve().parents[1]
BATCH = ROOT / ".firecrawl/similar-apollo-2026-09-10"

KEYWORDS = re.compile(
    r"promotional|merchandise|corporate gift|branded|award|recognition|incentive|"
    r"print|apparel|textil|werbeartikel|werbemittel|cadeau|geschenk|gadget|sourc|"
    r"handmade|artisan|local.?made|beauty|cosmetic|marketing",
    re.I,
)
SPACE = re.compile(r"\s+")


def clean(text: object) -> str:
    return SPACE.sub(" ", str(text or "")).strip()


def evidence_extract(markdown: str, limit: int = 900) -> str:
    text = clean(markdown)
    if not text:
        return ""
    matches = list(KEYWORDS.finditer(text))
    if not matches:
        return text[:limit]
    chunks = []
    used = 0
    for match in matches[:8]:
        start = max(0, match.start() - 120)
        end = min(len(text), match.end() + 260)
        chunk = text[start:end]
        if chunk in chunks:
            continue
        chunks.append(chunk)
        used += len(chunk)
        if used >= limit:
            break
    return " … ".join(chunks)[:limit]


def main() -> None:
    targets = json.loads((BATCH / "gate1-targets.json").read_text(encoding="utf-8"))
    by_id = {row["id"]: row for row in targets}
    compact = []
    for file in sorted((BATCH / "gate1-search").glob("*.json")):
        company_id = int(file.stem)
        payload = json.loads(file.read_text(encoding="utf-8"))
        results = []
        for item in payload.get("data", {}).get("web", []):
            url = clean(item.get("url"))
            results.append(
                {
                    "url": url,
                    "domain": urlparse(url).netloc.lower().removeprefix("www."),
                    "title": clean(item.get("title")),
                    "description": clean(item.get("description")),
                    "extract": evidence_extract(item.get("markdown", "")),
                }
            )
        lead = by_id[company_id]
        compact.append(
            {
                "id": company_id,
                "company": lead["company"],
                "location": lead["location"],
                "employees_input": lead["employees_input"],
                "results": results,
            }
        )
    compact.sort(key=lambda row: row["id"])
    output = BATCH / "gate1-evidence-compact.json"
    output.write_text(json.dumps(compact, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"wrote {output} with {len(compact)} companies")


if __name__ == "__main__":
    main()
