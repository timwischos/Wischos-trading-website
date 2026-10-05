#!/usr/bin/env python3
"""Validate and merge detailed A/B profile data from Gate 3 agents."""

from __future__ import annotations

import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
BATCH = ROOT / ".firecrawl/similar-apollo-2026-09-10"

FIT_MAX = {
    "product_fit": 20, "buyer_role_fit": 15, "evidence_strength": 15,
    "procurement_potential": 15, "reachability": 10, "market_value": 10,
    "supplier_fit": 10, "risk_adjustment": -15,
}
VALUE_MAX = {
    "annual_procurement": 20, "margin_quality": 15, "strategic_value": 15,
    "cooperation_depth": 15, "conversion_access": 10, "capability_fit": 10,
    "relationship_efficiency": 10, "risk_adjustment": -15,
}


def validate_score(company: dict, key: str, total_key: str, maxima: dict[str, int], errors: list[str]) -> None:
    company_id = company.get("id")
    values = company.get(key)
    if not isinstance(values, dict) or set(values) != set(maxima):
        errors.append(f"id={company_id} {key}分项键不完整")
        return
    for field, maximum in maxima.items():
        value = values[field]
        if not isinstance(value, (int, float)):
            errors.append(f"id={company_id} {key}.{field}不是数值")
        elif maximum > 0 and not 0 <= value <= maximum:
            errors.append(f"id={company_id} {key}.{field}超出0..{maximum}")
        elif maximum < 0 and not maximum <= value <= 0:
            errors.append(f"id={company_id} {key}.{field}超出{maximum}..0")
    if all(isinstance(values[field], (int, float)) for field in maxima):
        calculated = sum(values.values())
        if company.get(total_key) != calculated:
            errors.append(f"id={company_id} {total_key}={company.get(total_key)} 与分项合计{calculated}不一致")


def main() -> None:
    gate2 = json.loads((BATCH / "gate2-results.json").read_text(encoding="utf-8"))["companies"]
    expected = {int(row["id"]) for row in gate2 if row["gate2_grade"] in {"A", "B"}}
    files = sorted(BATCH.glob("gate3-agent-*.json"))
    if not files:
        raise SystemExit("尚无 gate3-agent-*.json")
    merged = {}
    errors = []
    for file in files:
        payload = json.loads(file.read_text(encoding="utf-8"))
        for company in payload.get("companies", []):
            company_id = int(company["id"])
            if company_id in merged:
                errors.append(f"重复 id={company_id}")
                continue
            if company_id not in expected:
                errors.append(f"多出非A/B id={company_id}")
            # Gate 3 may uncover a hard exclusion that was not verifiable in
            # Gate 2.  Keep the full evaluation, but do not create a profile.
            if company.get("gate2_grade") not in {"A", "B", "Reject"}:
                errors.append(f"id={company_id} Gate3评级不是A/B/Reject")
            required_lists = [
                "product_lines", "contacts", "potential_procurement_needs", "pain_points",
                "china_supplier_entry_angles", "structural_risks", "contact_hooks", "research_sources", "unknowns",
            ]
            for key in required_lists:
                if not isinstance(company.get(key), list) or not company[key]:
                    errors.append(f"id={company_id} 缺少完整 {key}")
            if len(company.get("china_supplier_entry_angles") or []) < 3:
                errors.append(f"id={company_id} 少于3个切入角度")
            validate_score(company, "fit_breakdown", "fit_score", FIT_MAX, errors)
            validate_score(company, "value_breakdown", "value_score", VALUE_MAX, errors)
            merged[company_id] = company
    missing = sorted(expected - set(merged))
    if missing:
        errors.append(f"缺少A/B ids={missing}")
    if errors:
        raise SystemExit("\n".join(errors))
    companies = [merged[company_id] for company_id in sorted(merged)]
    (BATCH / "gate3-results.json").write_text(
        json.dumps({"companies": companies}, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    print(f"Gate 3 merged: {len(companies)} companies")


if __name__ == "__main__":
    main()
