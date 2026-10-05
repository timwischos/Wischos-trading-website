#!/usr/bin/env python3
"""Validate and merge the three Similar/Apollo Gate 2 agent outputs."""

from __future__ import annotations

import json
import re
from collections import Counter
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
BATCH = ROOT / ".firecrawl/similar-apollo-2026-09-10"
AGENT_FILES = [BATCH / f"gate2-agent-{suffix}.json" for suffix in "abc"]
ALLOWED = {"A", "B", "B-", "C", "D", "Reject"}


def slugify(value: str) -> str:
    value = value.lower().replace("&", " and ")
    value = re.sub(r"[^a-z0-9]+", "-", value).strip("-")
    return value or "company"


def main() -> None:
    gate1 = json.loads((BATCH / "gate1-results.json").read_text(encoding="utf-8"))
    expected = {int(row["id"]): row for row in gate1 if row["gate1_result"] == "Pass"}
    merged: dict[int, dict] = {}
    errors: list[str] = []
    warnings: list[str] = []

    for file in AGENT_FILES:
        if not file.exists():
            errors.append(f"缺少 {file.name}")
            continue
        payload = json.loads(file.read_text(encoding="utf-8"))
        companies = payload.get("companies") if isinstance(payload, dict) else None
        if not isinstance(companies, list):
            errors.append(f"{file.name} 顶层 companies 不是数组")
            continue
        for company in companies:
            try:
                company_id = int(company["id"])
            except (KeyError, TypeError, ValueError):
                errors.append(f"{file.name} 存在无效 id")
                continue
            if company_id in merged:
                errors.append(f"重复 Gate 2 id={company_id}")
                continue
            if company_id not in expected:
                errors.append(f"Gate 2 多出非 Pass id={company_id}")
            grade = str(company.get("gate2_grade") or "").strip()
            if grade not in ALLOWED:
                errors.append(f"id={company_id} 无效评级 {grade!r}")
            should_target = grade in {"A", "B"}
            if bool(company.get("target_customer")) != should_target:
                errors.append(f"id={company_id} target_customer 与评级 {grade} 不一致")
            for key in ("fit_score", "value_score"):
                try:
                    score = int(company.get(key))
                except (TypeError, ValueError):
                    errors.append(f"id={company_id} 缺少有效 {key}")
                    continue
                if not 0 <= score <= 100:
                    errors.append(f"id={company_id} {key}={score} 超范围")
            sources = company.get("research_sources")
            if not isinstance(sources, list) or not any(item.get("url") for item in sources if isinstance(item, dict)):
                errors.append(f"id={company_id} 缺少 research_sources URL")
            if not company.get("decision_reason"):
                errors.append(f"id={company_id} 缺少 decision_reason")
            if company_id in {2, 32, 37, 47, 64} and should_target:
                warnings.append(f"id={company_id} 是已知成熟采购链风险账户但被评为 {grade}，需人工复核")
            merged[company_id] = company

    missing = sorted(set(expected) - set(merged))
    if missing:
        errors.append(f"缺少 Gate 2 ids: {missing}")
    if errors:
        raise SystemExit("\n".join(errors))

    companies = [merged[company_id] for company_id in sorted(merged)]
    (BATCH / "gate2-results.json").write_text(
        json.dumps({"companies": companies}, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    evidence_targets = []
    for company in companies:
        if company["gate2_grade"] not in {"A", "B"}:
            continue
        source = expected[int(company["id"])]
        evidence_targets.append(
            {
                "id": int(company["id"]),
                "slug": slugify(str(company["company"])),
                "company": str(company["company"]),
                "official_url": str(company.get("official_website") or source.get("official_website") or ""),
                "location": str(source.get("location") or company.get("city_region") or ""),
                "country": str(company.get("country") or source.get("country") or ""),
                "gate1": "Pass",
            }
        )
    (BATCH / "external-evidence-targets.json").write_text(
        json.dumps(evidence_targets, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    counts = Counter(company["gate2_grade"] for company in companies)
    print(json.dumps({"companies": len(companies), "grades": counts, "external_targets": len(evidence_targets)}, ensure_ascii=False, default=dict))
    print("A/B ids:", ",".join(str(row["id"]) for row in evidence_targets))
    for warning in warnings:
        print("WARNING:", warning)


if __name__ == "__main__":
    main()
