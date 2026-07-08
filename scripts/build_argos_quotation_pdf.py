from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    HRFlowable,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


OUT = Path("docs/quotations/argos-promo-wgs001-wgs002-quotation.pdf")


def money(value: str) -> Paragraph:
    return Paragraph(value, styles["Money"])


def spec_lines(lines: list[tuple[str, str]]) -> str:
    return "<br/>".join(f"<b>{label}:</b> {text}" for label, text in lines)


styles = getSampleStyleSheet()
styles.add(
    ParagraphStyle(
        name="Brand",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=17,
        leading=20,
        textColor=colors.HexColor("#171717"),
        uppercase=True,
    )
)
styles.add(
    ParagraphStyle(
        name="Muted",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=8.8,
        leading=12,
        textColor=colors.HexColor("#646464"),
    )
)
styles.add(
    ParagraphStyle(
        name="QuoteMeta",
        parent=styles["Muted"],
        alignment=TA_RIGHT,
    )
)
styles.add(
    ParagraphStyle(
        name="TitleClean",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=25,
        leading=28,
        spaceAfter=6,
        textColor=colors.HexColor("#171717"),
    )
)
styles.add(
    ParagraphStyle(
        name="Section",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=10,
        leading=12,
        textColor=colors.HexColor("#171717"),
        spaceBefore=12,
        spaceAfter=6,
    )
)
styles.add(
    ParagraphStyle(
        name="Small",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=8.8,
        leading=11.5,
        textColor=colors.HexColor("#333333"),
    )
)
styles.add(
    ParagraphStyle(
        name="Cell",
        parent=styles["Small"],
        fontSize=8.2,
        leading=10.7,
    )
)
styles.add(
    ParagraphStyle(
        name="CellMuted",
        parent=styles["Cell"],
        textColor=colors.HexColor("#646464"),
    )
)
styles.add(
    ParagraphStyle(
        name="HeaderCell",
        parent=styles["Cell"],
        fontName="Helvetica-Bold",
        fontSize=7.6,
        leading=9,
        textColor=colors.HexColor("#3a332d"),
    )
)
styles.add(
    ParagraphStyle(
        name="Money",
        parent=styles["Cell"],
        fontName="Helvetica-Bold",
        alignment=TA_RIGHT,
        leading=10.5,
    )
)
styles.add(
    ParagraphStyle(
        name="SetTitle",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=16,
        leading=18,
        spaceAfter=3,
    )
)
styles.add(
    ParagraphStyle(
        name="Sku",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=8.2,
        leading=10,
        textColor=colors.HexColor("#B87333"),
    )
)


def p(text: str, style: str = "Small") -> Paragraph:
    return Paragraph(text, styles[style])


def build() -> None:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(
        str(OUT),
        pagesize=A4,
        rightMargin=13 * mm,
        leftMargin=13 * mm,
        topMargin=13 * mm,
        bottomMargin=12 * mm,
        title="Quotation - WGS-001 and WGS-002 Custom Metal Gift Sets",
        author="Wischos Gift Trading Co.",
    )

    story = []

    header = Table(
        [
            [
                [
                    p("WISCHOS GIFT", "Brand"),
                    p("China-based sourcing partner for custom metal corporate gift sets", "Muted"),
                    p("wischosgift.com | johnlui@wischosgift.com", "Muted"),
                ],
                [
                    p("<b>Quotation No.</b> WG-ARGOS-20260602-01", "QuoteMeta"),
                    p("<b>Date</b> 2 June 2026", "QuoteMeta"),
                    p("<b>Prepared for</b> Argos Promo, New Zealand", "QuoteMeta"),
                    p("<b>Validity</b> 14 days, subject to freight space", "QuoteMeta"),
                ],
            ]
        ],
        colWidths=[105 * mm, 76 * mm],
    )
    header.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ]
        )
    )
    story.append(header)
    story.append(HRFlowable(width="100%", thickness=0.8, color=colors.HexColor("#ded8d1")))
    story.append(Spacer(1, 10))
    story.append(p("Quotation for Custom Metal Gift Sets", "TitleClean"))
    story.append(
        p(
            "Distributor reference pricing for two custom metal gift set configurations at 100 sets. "
            "Each set is designed as a starting point: component finishes, logo placement, and box details "
            "can be adjusted after artwork and packaging requirements are confirmed.",
            "Muted",
        )
    )
    story.append(Spacer(1, 9))

    info = Table(
        [
            [
                p("<b>Quantity</b><br/>100 sets per design", "Cell"),
                p("<b>Currency</b><br/>USD", "Cell"),
                p("<b>Lead Time</b><br/>25-35 days after approval", "Cell"),
                p("<b>Destination</b><br/>Auckland, New Zealand", "Cell"),
            ]
        ],
        colWidths=[45.25 * mm] * 4,
    )
    info.setStyle(
        TableStyle(
            [
                ("GRID", (0, 0), (-1, -1), 0.6, colors.HexColor("#ded8d1")),
                ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#fffdfb")),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("LEFTPADDING", (0, 0), (-1, -1), 7),
                ("RIGHTPADDING", (0, 0), (-1, -1), 7),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ]
        )
    )
    story.append(info)
    story.append(Spacer(1, 10))

    story.append(p("PRICE SUMMARY", "Section"))
    price_table = Table(
        [
            [
                p("Set", "HeaderCell"),
                p("Set Name", "HeaderCell"),
                p("Qty", "HeaderCell"),
                p("FOB China", "HeaderCell"),
                p("CIF Auckland Port", "HeaderCell"),
                p("DAP Auckland Metro", "HeaderCell"),
            ],
            [
                p("<b>WGS-001-3</b>", "Cell"),
                p("The Desk Starter", "Cell"),
                p("100 sets", "Cell"),
                money("USD 10.80 / set<br/>USD 1,080 total"),
                money("USD 14.80 / set<br/>USD 1,480 total"),
                money("USD 19.80 / set<br/>USD 1,980 total"),
            ],
            [
                p("<b>WGS-002-3</b>", "Cell"),
                p("The Mechanical Desk", "Cell"),
                p("100 sets", "Cell"),
                money("USD 26.80 / set<br/>USD 2,680 total"),
                money("USD 32.80 / set<br/>USD 3,280 total"),
                money("USD 39.80 / set<br/>USD 3,980 total"),
            ],
        ],
        colWidths=[24 * mm, 35 * mm, 18 * mm, 34.5 * mm, 34.5 * mm, 35 * mm],
        repeatRows=1,
    )
    price_table.setStyle(
        TableStyle(
            [
                ("GRID", (0, 0), (-1, -1), 0.6, colors.HexColor("#ded8d1")),
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#f3eee8")),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("LEFTPADDING", (0, 0), (-1, -1), 6),
                ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                ("TOPPADDING", (0, 0), (-1, -1), 7),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
            ]
        )
    )
    story.append(price_table)

    sets = [
        {
            "sku": "WGS-001-3",
            "name": "The Desk Starter",
            "subtitle": "Entry-tier desk gift set for daily desk visibility: writing, opening mail, and branded page marking.",
            "price": "USD 10.80 / set FOB China",
            "components": [
                (
                    "WP-102",
                    "Executive Dual-Head Metal Pen",
                    [
                        ("Function", "Inkless tip + rollerball writing end"),
                        ("Material", "Aluminium alloy body with gunmetal finish"),
                        ("Size / Weight", "approx. 144 x 10mm | 23.3g"),
                        ("Logo", "Pen body or clip, by laser marking, UV print, or pad print"),
                    ],
                ),
                (
                    "WP-203",
                    "Executive Zinc Alloy Letter Opener",
                    [
                        ("Function", "Desk letter opener for envelopes and documents"),
                        ("Material", "Zinc alloy with high-gloss electroplating"),
                        ("Size / Weight", "approx. 230mm total length | 74g"),
                        ("Logo", "Flat handle surface, laser etching or screen print"),
                    ],
                ),
                (
                    "WP-205",
                    "Precision Custom Metal Bookmark",
                    [
                        ("Function", "Rigid page marker and flat desk-visible brand surface"),
                        ("Material", "Brass, stainless steel, or zinc alloy by final brief"),
                        ("Size / Weight", "approx. 120-150mm | around 20g"),
                        ("Logo", "Laser engraving, chemical etching, or profile cutting"),
                    ],
                ),
            ],
        },
        {
            "sku": "WGS-002-3",
            "name": "The Mechanical Desk",
            "subtitle": "Executive desk gift set built around three tactile actions: writing, opening mail, and holding a device.",
            "price": "USD 26.80 / set FOB China",
            "components": [
                (
                    "WP-101",
                    "Brass Crown Bolt-Action Pen",
                    [
                        ("Function", "One-handed bolt-action pen with G2 refill"),
                        ("Material", "Brass details, aluminium body, stainless steel clip"),
                        ("Size / Weight", "approx. 138 x 10mm | 28g"),
                        ("Logo", "Pen body, clip, or tail crown depending on artwork"),
                    ],
                ),
                (
                    "WP-204",
                    "Propeller Spinning Letter Opener",
                    [
                        ("Function", "Letter opener with visible propeller spin mechanism"),
                        ("Material", "Zinc alloy, matte brushed electroplated silver finish"),
                        ("Size / Weight", "approx. 187 x 19 x 4mm | 85g"),
                        ("Logo", "Flat blade surface or propeller face"),
                    ],
                ),
                (
                    "WP-208",
                    "Precision Folding Aluminium Device Stand",
                    [
                        ("Function", "Folding stand for phone or tablet desk use"),
                        ("Material", "Anodised aluminium alloy with silicone contact pads"),
                        ("Size / Weight", "approx. 182 x 60 x 18mm folded | 150g"),
                        ("Logo", "Flat aluminium base panel, laser marking"),
                    ],
                ),
            ],
        },
    ]

    for item in sets:
        story.append(Spacer(1, 7))
        set_header = Table(
            [
                [
                    [
                        p(item["sku"], "Sku"),
                        p(item["name"], "SetTitle"),
                        p(item["subtitle"], "Muted"),
                    ],
                    p(f"<b>{item['price']}</b>", "QuoteMeta"),
                ]
            ],
            colWidths=[132 * mm, 49 * mm],
        )
        set_header.setStyle(
            TableStyle(
                [
                    ("GRID", (0, 0), (-1, -1), 0.6, colors.HexColor("#ded8d1")),
                    ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#fffdfb")),
                    ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                    ("LEFTPADDING", (0, 0), (-1, -1), 7),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 7),
                    ("TOPPADDING", (0, 0), (-1, -1), 8),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
                ]
            )
        )
        story.append(set_header)

        comp_rows = []
        for code, name, specs in item["components"]:
            comp_rows.append([p(code, "Sku"), p(f"<b>{name}</b><br/>{spec_lines(specs)}", "CellMuted")])

        component_table = Table(comp_rows, colWidths=[25 * mm, 156 * mm])
        component_table.setStyle(
            TableStyle(
                [
                    ("GRID", (0, 0), (-1, -1), 0.6, colors.HexColor("#ded8d1")),
                    ("VALIGN", (0, 0), (-1, -1), "TOP"),
                    ("LEFTPADDING", (0, 0), (-1, -1), 7),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 7),
                    ("TOPPADDING", (0, 0), (-1, -1), 6),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
                ]
            )
        )
        story.append(component_table)

    story.append(PageBreak())
    story.append(p("Quotation Assumptions and Terms", "TitleClean"))
    story.append(Spacer(1, 8))

    terms = [
        (
            "Included Assumptions",
            [
                "Standard logo marking on each component, one standard position per item.",
                "Standard set packaging with EVA insert; final box structure and artwork subject to approval.",
                "Production starts after artwork, sample direction, and deposit are confirmed.",
                "Component colours and finishes are subject to supplier availability at order confirmation.",
            ],
        ),
        (
            "Freight and Tax Notes",
            [
                "CIF Auckland includes estimated sea freight and insurance to Auckland port only.",
                "DAP Auckland metro is duties and taxes unpaid. NZ GST, duty, customs clearance, inspection, storage, and remote-area delivery are excluded.",
                "DAP pricing is subject to confirmed carton size, gross weight, delivery address, and freight validity.",
                "For Wellington, Christchurch, or non-metro delivery, inland delivery may be requoted.",
            ],
        ),
        (
            "Optional Upgrades",
            [
                "Magnetic rigid box, drawer rigid box, soft-touch lamination, printed liner, foil stamping, or debossed box logo.",
                "Additional logo position, full-colour UV printing, Pantone print matching, or custom bookmark silhouette.",
                "Reference sample or custom pre-production sample can be quoted separately after project direction is confirmed.",
            ],
        ),
        (
            "Payment Terms",
            [
                "50% deposit to start production, 50% balance before shipment unless otherwise agreed.",
                "Bank fees and any destination charges not listed in this quotation are for buyer's account.",
                "Quotation is valid for 14 days and may change if freight rates, material costs, or exchange conditions move significantly.",
            ],
        ),
    ]

    rows = []
    for title, bullets in terms:
        bullet_text = "<br/>".join(f"- {line}" for line in bullets)
        rows.append([p(f"<b>{title}</b>", "Cell"), p(bullet_text, "CellMuted")])

    term_table = Table(rows, colWidths=[44 * mm, 137 * mm])
    term_table.setStyle(
        TableStyle(
            [
                ("GRID", (0, 0), (-1, -1), 0.6, colors.HexColor("#ded8d1")),
                ("BACKGROUND", (0, 0), (0, -1), colors.HexColor("#f3eee8")),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ]
        )
    )
    story.append(term_table)
    story.append(Spacer(1, 14))
    story.append(HRFlowable(width="100%", thickness=0.8, color=colors.HexColor("#ded8d1")))
    story.append(Spacer(1, 8))
    story.append(
        p(
            "<b>Wischos Gift Trading Co.</b><br/>Custom metal gift set sourcing and set development from China.<br/>"
            "wischosgift.com | johnlui@wischosgift.com",
            "Muted",
        )
    )

    doc.build(story)


if __name__ == "__main__":
    build()
