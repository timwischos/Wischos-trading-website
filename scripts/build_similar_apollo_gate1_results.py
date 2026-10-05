#!/usr/bin/env python3
"""Build the human-audited Gate 1 decision file for the Similar/Apollo batch."""

from __future__ import annotations

import json
from pathlib import Path
from urllib.parse import urlparse


ROOT = Path(__file__).resolve().parents[1]
BATCH = ROOT / ".firecrawl/similar-apollo-2026-09-10"

WEBSITES = {
    1: "https://initialincentives.com", 2: "https://www.edgepromotions.com",
    4: "https://adbrandedsolutions.com", 8: "https://inck.com.au",
    10: "https://www.pgm.nu", 13: "https://www.whitelightpromo.com",
    15: "https://www.evergreenbranding.co.uk", 17: "https://www.gadgetfactory.ch",
    18: "https://www.beaumontpps.com", 23: "https://www.proline.jetzt",
    24: "https://www.willsmerwagg.com", 29: "https://werbemittelagentur-hagemann.de",
    30: "https://futurepromo.co.uk", 32: "https://www.brandedbystreamline.com",
    33: "https://www.traffik360.com", 34: "https://orbgroup.co.uk",
    35: "https://www.directmarketingltd.co.uk", 36: "https://bbtrading.ch",
    37: "https://www.fullservice-stuco.de", 40: "https://www.schrema.de",
    42: "https://www.formkraft.co.uk", 44: "https://www.branded4uk.com",
    45: "https://beigebell.com", 46: "https://vipitalia.it",
    47: "https://uk.geiger.com", 49: "https://www.limelightpublicity.co.uk",
    50: "https://www.kwopen.com", 51: "https://profilbureauet.com",
    55: "https://meetinglinq.com", 56: "https://innovation1st.com",
    57: "https://www.infinityinc.co.uk", 58: "https://fortunemarketing.ie",
    59: "https://promisepromo.com", 62: "https://pinfoldpromotions.co.uk",
    63: "https://www.vanbavel.be", 64: "https://catalogue.groupe-fullace.fr",
    66: "https://www.yellow-solutions.eu", 67: "https://www.yetimo.com",
    70: "https://www.metz.dk", 71: "https://allinonemerchandise.co.uk",
    72: "https://www.pronel.be", 75: "https://www.sugarcoat.com",
    76: "https://www.run-print-run.co.uk", 77: "https://www.brandedmerchandise.co.uk",
    78: "https://www.nowandzen.fr", 80: "https://aspectmerchandise.co.uk",
    81: "https://leecommunication.ch", 82: "https://ci-artwork.de",
    84: "https://www.meri.se", 85: "https://www.happysmile.co.uk",
    86: "https://www.tcseurope.co.uk", 87: "https://www.turnkeypromotions.com.au",
    89: "https://www.thegoodidea.it", 90: "https://www.wintherwinther.com",
    94: "https://www.alertpromotie.nl",
}

REJECTS = {
    9: "完整精确名称与地区搜索只找到 Facebook、Instagram 和商业目录；未找到可验证独立官网，按社媒-only/无官网规则 Reject。",
    22: "未找到可验证的促销品独立官网；当前同名 Bremen 主体公开信号偏有机产品批发，旧 PSI 记录的地址亦不一致，身份与业务无法确认。",
    38: "可定位到 aduka.de 的本地传播/设计 agency，但官网与精确搜索未证明其经营 promotional products 或 corporate gifts。",
    43: "精确名称与 Barcelona 地区搜索未找到可核验独立官网或一致的公司主体，搜索结果均为无关同名。",
    52: "SAI DEVI 是 The Good Idea 的 beauty branch，未找到独立官网或独立采购主体；且该分支主业为美妆，作为父公司重复/非金属分支停止。",
    54: "仅找到商业园目录、LinkedIn/本地目录；公开邮箱域名 thesimplepromoco.com 已 DNS 失效，无可验证独立官网。",
    73: "仅找到 Facebook、LinkedIn 人员摘要和本地商会报道，未找到可验证独立官网，按社媒-only规则 Reject。",
}

# aduka has an independent site, but no qualifying merchandise channel; keep its
# reject reason separate from pure website failures.

CUSTOM_PASS_REASONS = {
    2: "独立官网确认是爱尔兰 promotional merchandise 企业；但官网同时披露 Far East offices，Gate 1 通过后须在 Gate 2 检查成熟采购链。",
    8: "独立官网、Sydney 地址和 LinkedIn 一致，明确提供 bespoke branded merchandise、sourcing、large-volume项目与合规管理。",
    32: "当前官网/LinkedIn与 Edinburgh 地址一致，明确提供 branded merchandise、company stores、workwear与企业项目。",
    37: "独立官网明确是 Werbeartikel full-service，覆盖采购、仓储、履约、企业商店与定制项目。",
    44: "独立官网与 Enfield 地址一致，明确经营 branded merchandise 并为 BPMA 成员，不是纯印刷业务。",
    50: "独立官网明确经营 sustainable promotional products、creative full-service 与 outsourced merchandise services。",
    71: "公司同时有数字营销站点和独立 merchandise 站点；后者明确提供 custom promotional products 与 bespoke branded merchandise。",
    76: "主公司含印刷业务，但独立 promotions 站点明确经营 branded promotional merchandise，故不属于 print-only。",
    77: "英国独立官网 brandedmerchandise.co.uk 与 London 主体一致；与澳大利亚 tbmco.com.au 是不同公司，不按同名重复处理。",
    84: "官网与 Östersund 主体一致，虽含服装但也明确经营 profile/present advertising，并非 apparel-only。",
    90: "LinkedIn、PSI 目录和独立域名 wintherwinther.com 一致，明确提供 custom-made merchandise 与 company gifts。",
}


def domain(url: str) -> str:
    return urlparse(url).netloc.lower().removeprefix("www.")


def main() -> None:
    targets = json.loads((BATCH / "gate1-targets.json").read_text(encoding="utf-8"))
    compact = json.loads((BATCH / "gate1-evidence-compact.json").read_text(encoding="utf-8"))
    evidence_by_id = {row["id"]: row for row in compact}
    results = []
    for lead in targets:
        company_id = lead["id"]
        evidence = evidence_by_id[company_id]
        if company_id in REJECTS:
            decision = "Reject"
            website = "https://www.aduka.de" if company_id == 38 else ""
            reason = REJECTS[company_id]
        else:
            decision = "Pass"
            website = WEBSITES[company_id]
            reason = CUSTOM_PASS_REASONS.get(
                company_id,
                "独立官网/公司页与名称、地区一致，并明确经营 promotional products、branded merchandise、corporate gifts、awards 或相关 B2B 商品方案。",
            )

        official_domain = domain(website) if website else ""
        source_urls = []
        evidence_notes = []
        for item in evidence.get("results", []):
            if item.get("url"):
                source_urls.append(item["url"])
            if official_domain and (
                item.get("domain") == official_domain
                or item.get("domain", "").endswith("." + official_domain)
                or official_domain.endswith("." + item.get("domain", ""))
            ):
                evidence_notes.append(item.get("description") or item.get("extract") or item.get("title"))
        results.append(
            {
                **lead,
                "official_website": website,
                "official_website_verified": bool(website),
                "gate1_result": decision,
                "gate1_reason": reason,
                "gate1_evidence": " ".join(note for note in evidence_notes if note)[:1600],
                "gate1_source_urls": list(dict.fromkeys(source_urls)),
            }
        )

    output = BATCH / "gate1-results.json"
    output.write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding="utf-8")
    counts = {key: sum(row["gate1_result"] == key for row in results) for key in ("Pass", "Reject", "Review")}
    print(json.dumps({"total": len(results), **counts}, ensure_ascii=False))
    for row in results:
        print(f"{row['id']:02d}\t{row['gate1_result']}\t{row['company']}\t{row['official_website']}")


if __name__ == "__main__":
    main()
