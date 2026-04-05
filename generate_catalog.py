#!/usr/bin/env python3
"""
Wischos Gift — 2025 Product Catalog Generator
Run with: python3 generate_catalog.py
Output:   Wischos_Gift_Catalog_2025.pdf
"""

import io
from pathlib import Path
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas as rl_canvas
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase.pdfmetrics import stringWidth
from PIL import Image as PILImage

# ── Brand ────────────────────────────────────────────────────────────────────
DARK    = HexColor('#0a0a0a')
WHITE   = HexColor('#ffffff')
COPPER  = HexColor('#B87333')
GRID    = HexColor('#e0e0e0')
MUTED   = HexColor('#767676')
WARM_BG = HexColor('#f4f2ef')

# ── Page ─────────────────────────────────────────────────────────────────────
W, H = A4        # 595.28 × 841.89 pt
M    = 22 * mm   # page margin

# ── Paths ─────────────────────────────────────────────────────────────────────
PUBLIC = Path(__file__).parent / 'public' / 'products'
OUT    = Path(__file__).parent / 'Wischos_Gift_Catalog_2025.pdf'

# ── Image loader ──────────────────────────────────────────────────────────────
def load_cover(folder: str, crop_square: bool = True) -> ImageReader | None:
    p = PUBLIC / folder
    if not p.exists():
        print(f'  ! missing folder: {folder}')
        return None
    for f in sorted(p.iterdir()):
        if 'cover' in f.name.lower() and f.suffix.lower() in ('.avif', '.jpg', '.jpeg', '.png'):
            try:
                img = PILImage.open(f).convert('RGB')
                if crop_square:
                    w, h = img.size
                    s = min(w, h)
                    img = img.crop(((w - s) // 2, (h - s) // 2, (w + s) // 2, (h + s) // 2))
                buf = io.BytesIO()
                img.save(buf, 'JPEG', quality=88)
                buf.seek(0)
                return ImageReader(buf)
            except Exception as e:
                print(f'  ! {f.name}: {e}')
    return None

# ── Drawing helpers ────────────────────────────────────────────────────────────
def hline(c, x1, y, x2, color=GRID, lw=0.5):
    c.setStrokeColor(color)
    c.setLineWidth(lw)
    c.line(x1, y, x2, y)

def wrapped_lines(text, font, size, max_w):
    words = text.split()
    lines, cur = [], []
    for word in words:
        test = ' '.join(cur + [word])
        if stringWidth(test, font, size) <= max_w:
            cur.append(word)
        else:
            if cur:
                lines.append(' '.join(cur))
            cur = [word]
    if cur:
        lines.append(' '.join(cur))
    return lines or ['']

def draw_wrapped(c, text, x, y, max_w, font='Helvetica', size=9, leading=13, color=DARK):
    c.setFont(font, size)
    c.setFillColor(color)
    for line in wrapped_lines(text, font, size, max_w):
        c.drawString(x, y, line)
        y -= leading
    return y

def img_box(c, ir, x, y_bot, w, h):
    """Draw image into box (y_bot = ReportLab bottom coord). Fills with placeholder if None."""
    if ir is None:
        c.setFillColor(HexColor('#ebebeb'))
        c.rect(x, y_bot, w, h, fill=1, stroke=0)
    else:
        c.drawImage(ir, x, y_bot, width=w, height=h,
                    preserveAspectRatio=False, mask='auto')

def footer(c):
    c.setFont('Helvetica', 6.5)
    c.setFillColor(MUTED)
    c.drawString(M, M - 9, 'Wischos Gift Trading Co., Ltd  ·  Anhui, China')
    c.drawRightString(W - M, M - 9, 'wischosgift.com  ·  inquiries@wischosgift.com')

# ─────────────────────────────────────────────────────────────────────────────
# DATA
# ─────────────────────────────────────────────────────────────────────────────
GIFT_SETS = [
    {
        'sku': 'WGS-001-3', 'name': 'The Desk Starter',
        'tagline': 'Three tools. Every desk. No excuses.',
        'fob': '$18–28', 'folder': 'WGS-001-3-The-Desk-Starter',
        'cta': 'A sharp first impression at a practical MOQ.',
        'target': 'SME gifting · ESG-focused brands · Conferences · Academia',
        'components': [
            ('WP-102', 'Executive Dual-Head Metal Pen (Inkless)'),
            ('WP-203', 'Executive Zinc Alloy Letter Opener'),
            ('WP-205', 'Precision Custom Metal Bookmark'),
        ],
        'points': [
            'Inkless tip writes 20,000m — no refills, no waste, ESG-aligned story',
            'Matte-finish metal unity across all three pieces — photographs as a set',
            'Full laser engraving on every piece at the lowest FOB in the lineup',
        ],
    },
    {
        'sku': 'WGS-002-3', 'name': 'The Mechanical Desk',
        'tagline': 'For the desk that thinks with its hands.',
        'fob': '$28–42', 'folder': 'WGS-002-3-The-Mechanical-Desk',
        'cta': 'Precision mechanisms. Permanent brand mark.',
        'target': 'Tech companies · Engineering firms · Design studios · Innovation teams',
        'components': [
            ('WP-101', 'Brass Crown Bolt-Action Pen'),
            ('WP-204', 'Propeller Spinning Letter Opener'),
            ('WP-206', 'Precision Brass Spinning Top'),
        ],
        'points': [
            'Three distinct kinetic interactions: bolt-click, propeller, spinning top',
            'Solid brass delivers above-price-point weight and material quality',
            'Conversation-starter gifting — picked up, handled, remembered',
        ],
    },
    {
        'sku': 'WGS-003-3', 'name': 'The Pocket Three',
        'tagline': "Everything in your pocket. Nothing you don't need.",
        'fob': '$22–32', 'folder': 'WGS-003-3-The-Pocket-Three',
        'cta': 'The set that stays in the pocket.',
        'target': 'HR teams · Finance & Banking · Insurance · Retail appreciation',
        'components': [
            ('WP-302', 'Industrial Brass Key Organizer'),
            ('WP-303', 'Industrial Stainless Steel Money Clip'),
            ('WP-306', 'Executive Zinc Alloy Nail Clipper'),
        ],
        'points': [
            'Pocket-optimized — all three pieces disappear without bulk or protrusion',
            'Three-metal material story: brass, stainless steel, zinc alloy',
            'Gender-neutral utility — broader targeting, fewer returns',
        ],
    },
    {
        'sku': 'WGS-004-3', 'name': 'The Field EDC',
        'tagline': 'Built for the field. Sharp enough for the office.',
        'fob': '$28–38', 'folder': 'WGS-004-3-The-Field-EDC',
        'cta': 'Field-ready tools, brand-ready finish.',
        'target': 'Construction · Logistics · Safety corporates · Outdoor equipment',
        'components': [
            ('WP-103', 'Tactical Stainless Steel Pen with Glass Breaker'),
            ('WP-305', 'Industrial Mini EDC Pry Bar'),
            ('WP-307', 'EDC Folding Metal Scissors'),
        ],
        'points': [
            'Emergency-ready trio: glass breaker, prying edge, cutting blade',
            'All-metal construction — no polymer components, no wear-out points',
            'Sector-differentiated gifting: stands out in construction and logistics',
        ],
    },
    {
        'sku': 'WGS-005-3', 'name': 'The Morning Ritual',
        'tagline': 'The three you reach for before you leave.',
        'fob': '$38–50', 'folder': 'WGS-005-3-The-Morning-Ritual',
        'cta': 'The set for the professional who packs intentionally.',
        'target': 'Executive gifting · Finance sector · Premium HR onboarding',
        'components': [
            ('WP-101', 'Brass Crown Bolt-Action Pen'),
            ('WP-402', 'Pure Titanium Capsule Flask (150ml)'),
            ('WP-304', 'Titanium Anti-Static EDC Comb'),
        ],
        'points': [
            'Titanium + brass pairing — deliberate premium two-tone material story',
            'Shirt-pocket complete — all three fit in a single jacket pocket',
            'Zero disposables: no ink, no plastic, no consumables across the set',
        ],
    },
    {
        'sku': 'WGS-006-3', 'name': 'The First Day',
        'tagline': 'Everything you need. Day one.',
        'fob': '$25–38', 'folder': 'WGS-006-3-The-First-Day',
        'cta': 'Turn day one into a brand moment.',
        'target': 'Enterprise HR onboarding · Co-working spaces · Trade show welcome packs',
        'components': [
            ('WP-301', 'RFID Aluminum Wallet & Badge Holder'),
            ('WP-104', '6-in-1 Precision Metal Tool Pen'),
            ('WP-202', 'Precision Aluminum Pen Holder'),
        ],
        'points': [
            'Badge holder — the first branded object a new hire touches on day one',
            '6-in-1 pen reveals new utility daily: ballpoint, LED, stylus, ruler, screwdriver, level',
            'Aluminum identity system — three pieces share one design language',
        ],
    },
]

CATEGORIES = [
    {
        'title': 'Writing Instruments',
        'items': [
            {'sku': 'WP-101', 'name': 'Brass Crown Bolt-Action Pen',
             'tagline': 'Brass · Aluminum · Steel  |  G2 refill  |  28g',
             'folder': 'WP-101-brass-crown-bolt-action-pen'},
            {'sku': 'WP-102', 'name': 'Executive Dual-Head Metal Pen (Inkless)',
             'tagline': 'Aluminum alloy  |  Inkless tip  |  Writes 20,000m',
             'folder': 'WP-102-executive-dual-head-metal-pen'},
            {'sku': 'WP-103', 'name': 'Tactical Stainless Steel Pen',
             'tagline': '316 Steel  |  Pressurized cartridge  |  Glass breaker',
             'folder': 'WP-103-tactical-stainless-steel-pen'},
            {'sku': 'WP-104', 'name': '6-in-1 Precision Metal Tool Pen',
             'tagline': 'Ballpoint · LED · Stylus · Ruler · Screwdriver · Level',
             'folder': 'WP-104-6-in-1-precision-metal-tool-pen'},
        ],
    },
    {
        'title': 'Desk Accessories',
        'items': [
            {'sku': 'WP-201', 'name': 'Professional Aluminum Desk Mat',
             'tagline': 'Aircraft aluminum  |  Dual-sided surface',
             'folder': 'WP-201-professional-aluminum-desk-mat'},
            {'sku': 'WP-202', 'name': 'Precision Aluminum Pen Holder',
             'tagline': 'CNC machined  |  Anodized  |  Weighted base',
             'folder': 'WP-202-precision-aluminum-pen-holder'},
            {'sku': 'WP-203', 'name': 'Executive Zinc Alloy Letter Opener',
             'tagline': 'Zinc alloy  |  Mirror polish  |  Flush engraving',
             'folder': 'WP-203-executive-zinc-alloy-letter-opener'},
            {'sku': 'WP-204', 'name': 'Propeller Spinning Letter Opener',
             'tagline': 'Solid brass  |  Propeller mechanism  |  Natural patina',
             'folder': 'WP-204-propeller-spinning-letter-opener'},
            {'sku': 'WP-205', 'name': 'Precision Custom Metal Bookmark',
             'tagline': 'Stainless steel  |  Ultra-slim  |  Laser engravable',
             'folder': 'WP-205-precision-custom-metal-bookmark'},
            {'sku': 'WP-206', 'name': 'Precision Brass Spinning Top',
             'tagline': 'Solid brass  |  Tungsten carbide tip  |  3+ min spin',
             'folder': 'WP-206-precision-brass-spinning-top'},
            {'sku': 'WP-207', 'name': 'Carbon Fiber Magnetic Fidget Stick',
             'tagline': 'Carbon fiber  |  Neodymium magnets  |  Desk object',
             'folder': 'WP-207-carbon-fiber-magnetic-fidget-stick'},
        ],
    },
    {
        'title': 'EDC & Carry',
        'items': [
            {'sku': 'WP-301', 'name': 'RFID Aluminum Wallet & Badge Holder',
             'tagline': 'Aluminum  |  RFID blocking  |  Cards + badge',
             'folder': 'WP-301-rfid-aluminum-wallet-badge-holder'},
            {'sku': 'WP-302', 'name': 'Industrial Brass Key Organizer',
             'tagline': 'Aircraft aluminum  |  Titanium pivot  |  Silent carry',
             'folder': 'WP-302-industrial-brass-key-organizer'},
            {'sku': 'WP-303', 'name': 'Industrial Stainless Steel Money Clip',
             'tagline': '316 stainless  |  Ultra-slim  |  Mirror polish',
             'folder': 'WP-303-industrial-stainless-steel-money-clip'},
            {'sku': 'WP-304', 'name': 'Titanium Anti-Static EDC Comb',
             'tagline': 'Grade 5 titanium  |  18g  |  Anti-static  |  Hypoallergenic',
             'folder': 'WP-304-titanium-anti-static-edc-comb'},
            {'sku': 'WP-305', 'name': 'Industrial Mini EDC Pry Bar',
             'tagline': '440 stainless  |  Pry · Score · Open  |  Keychain',
             'folder': 'WP-305-industrial-mini-edc-pry-bar'},
            {'sku': 'WP-306', 'name': 'Executive Zinc Alloy Nail Clipper',
             'tagline': 'Zinc alloy  |  Precision blades  |  Gift-box ready',
             'folder': 'WP-306-executive-zinc-alloy-nail-clipper'},
            {'sku': 'WP-307', 'name': 'EDC Folding Metal Scissors',
             'tagline': 'Stainless steel  |  Compact fold  |  Pocket-safe',
             'folder': 'WP-307-edc-folding-metal-scissors'},
        ],
    },
    {
        'title': 'Drinkware',
        'items': [
            {'sku': 'WP-401', 'name': 'Pure Titanium Vacuum Insulated Bottle',
             'tagline': 'Grade 1 titanium  |  500ml  |  90g  |  No liner, no taste',
             'folder': 'WP-401-pure-titanium-vacuum-insulated-bottle'},
            {'sku': 'WP-402', 'name': 'Pure Titanium Capsule Flask',
             'tagline': 'Pure titanium  |  150ml  |  Shirt-pocket size',
             'folder': 'WP-402-pure-titanium-capsule-flask-150ml'},
            {'sku': 'WP-403', 'name': 'Weighted Vacuum Insulated Office Tumbler',
             'tagline': '316 stainless  |  350ml  |  Anti-tip weighted base',
             'folder': 'WP-403-weighted-vacuum-insulated-office-tumbler'},
            {'sku': 'WP-404', 'name': 'Bamboo Groove Stainless Steel Mug',
             'tagline': 'Stainless steel  |  Bamboo lid  |  300ml  |  ESG-aligned',
             'folder': 'WP-404-bamboo-groove-stainless-steel-mug'},
            {'sku': 'WP-405', 'name': 'Ice Crystal Pure Titanium Egg Cup',
             'tagline': 'Pure titanium  |  60ml  |  Textured surface  |  Collector piece',
             'folder': 'WP-405-ice-crystal-pure-titanium-egg-cup'},
        ],
    },
]

# ─────────────────────────────────────────────────────────────────────────────
# PAGE DRAWING FUNCTIONS
# ─────────────────────────────────────────────────────────────────────────────

def page_cover(c):
    # Full dark background
    c.setFillColor(DARK)
    c.rect(0, 0, W, H, fill=1, stroke=0)

    # Brand name — small, copper, letter-spaced
    c.setFont('Helvetica', 7.5)
    c.setFillColor(COPPER)
    c.drawCentredString(W / 2, H - 52 * mm, 'W I S C H O S   G I F T')

    # Copper rule
    c.setStrokeColor(COPPER)
    c.setLineWidth(0.75)
    c.line(W / 2 - 34 * mm, H - 58 * mm, W / 2 + 34 * mm, H - 58 * mm)

    # Main headline — three lines, large serif
    c.setFillColor(WHITE)
    lines = ['Custom Metal', 'Corporate', 'Gift Sets']
    y0 = H - 118 * mm
    for i, line in enumerate(lines):
        c.setFont('Times-Roman', 54)
        c.drawCentredString(W / 2, y0 - i * 62, line)

    # Catalog subtitle
    c.setFont('Helvetica', 7)
    c.setFillColor(HexColor('#888888'))
    c.drawCentredString(W / 2, H - 295 * mm, '2 0 2 5   P R O D U C T   C A T A L O G')

    # Dark rule above footer
    c.setStrokeColor(HexColor('#2a2a2a'))
    c.setLineWidth(0.5)
    c.line(M, 72, W - M, 72)

    # Footer contact
    c.setFont('Helvetica', 8)
    c.setFillColor(HexColor('#999999'))
    c.drawCentredString(W / 2, 54, 'wischosgift.com  ·  inquiries@wischosgift.com')
    c.setFont('Helvetica', 7)
    c.setFillColor(HexColor('#666666'))
    c.drawCentredString(W / 2, 38, 'MOQ 100 Sets  ·  FOB China  ·  Lead Time 25–35 Days')


def page_about(c):
    y = H - M

    # Kicker
    y -= 16
    c.setFont('Helvetica', 6.5)
    c.setFillColor(COPPER)
    c.drawString(M, y, 'ABOUT WISCHOS GIFT')

    # Heading
    y -= 30
    c.setFont('Times-Roman', 30)
    c.setFillColor(DARK)
    c.drawString(M, y, 'Your Single Point of Contact')
    y -= 34
    c.drawString(M, y, 'for Custom Metal Corporate Gifts')

    # Copper rule
    y -= 14
    hline(c, M, y, W - M, COPPER, 0.75)

    # Intro
    y -= 20
    intro = (
        'Wischos Gift is a registered trading company in Anhui, China, working exclusively with '
        'corporate buyers internationally. We source custom metal gifts through a verified manufacturer '
        'network across Yangjiang, Dongguan, Zhongshan, Shenzhen, Yiwu, and Wenzhou. One contact '
        'manages your brief, factory coordination, branding, quality inspection, and all shipping '
        'documentation — from first inquiry through to delivery.'
    )
    y = draw_wrapped(c, intro, M, y, W - 2 * M, 'Helvetica', 9, 14, DARK)

    # Three columns: what you stop worrying about
    y -= 24
    col_data = [
        ('Import & Compliance',
         'Accurate customs documentation and materials sourced to international standards. '
         'Shipments clear without delays — paperwork prepared for you.'),
        ('Consistent Quality',
         'Every order ships with written QC specs and pre-shipment photos. '
         'Whether 100 or 5,000 sets — quality and branding stay consistent.'),
        ('Reliable Communication',
         'One contact, clear timelines, prompt replies across any time zone. '
         'You always know where your order stands. No chasing updates.'),
    ]
    IW = W - 2 * M
    col_gap = 8 * mm
    col_w = (IW - 2 * col_gap) / 3

    for i, (title, body) in enumerate(col_data):
        cx = M + i * (col_w + col_gap)
        cy = y

        # Copper top rule
        c.setStrokeColor(COPPER)
        c.setLineWidth(2)
        c.line(cx, cy + 8, cx + 22 * mm, cy + 8)

        cy -= 16
        c.setFont('Times-Roman', 11.5)
        c.setFillColor(DARK)
        for line in wrapped_lines(title, 'Times-Roman', 11.5, col_w):
            c.drawString(cx, cy, line)
            cy -= 14
        cy -= 4
        draw_wrapped(c, body, cx, cy, col_w, 'Helvetica', 8.5, 12.5, MUTED)

    # Ordering section
    y2 = H - 420
    hline(c, M, y2, W - M, GRID)
    y2 -= 24

    c.setFont('Helvetica', 6.5)
    c.setFillColor(COPPER)
    c.drawString(M, y2, 'HOW TO ORDER')

    y2 -= 26
    c.setFont('Times-Roman', 24)
    c.setFillColor(DARK)
    c.drawString(M, y2, 'Four Steps from Brief to Delivery')

    y2 -= 22
    steps = [
        ('01', 'Send Your Brief',
         'Share product preferences, quantity, and branding requirements. '
         'We respond within 24 hours with a quote and sample timeline.'),
        ('02', 'Sample Approval',
         'We coordinate factory samples with your logo applied. You approve '
         'in writing before production begins — no surprises.'),
        ('03', 'Production & QC',
         'Production runs 25–35 days. We share in-process photos and conduct '
         'a pre-shipment inspection against your approved sample.'),
        ('04', 'Shipment & Docs',
         'Full customs documentation prepared to your import standards. '
         'You receive tracking and all paperwork before arrival.'),
    ]
    step_w = (IW - 3 * 6 * mm) / 4

    for i, (num, title, body) in enumerate(steps):
        sx = M + i * (step_w + 6 * mm)
        sy = y2

        c.setFont('Times-Roman', 28)
        c.setFillColor(COPPER)
        c.drawString(sx, sy, num)

        sy -= 18
        c.setFont('Helvetica-Bold', 8.5)
        c.setFillColor(DARK)
        for line in wrapped_lines(title, 'Helvetica-Bold', 8.5, step_w):
            c.drawString(sx, sy, line)
            sy -= 12
        sy -= 3
        draw_wrapped(c, body, sx, sy, step_w, 'Helvetica', 8, 12, MUTED)

    # Info boxes at bottom
    box_y = M + 8
    box_h = 38
    specs = [
        ('MOQ', '100 Sets / 100 Pcs'),
        ('Lead Time', '25–35 Days'),
        ('Incoterms', 'FOB China'),
        ('Customization', 'Laser Engraving'),
        ('Packaging', 'Corrugated Box + EVA Foam'),
        ('Response', 'Within 24 Hours'),
    ]
    spec_gap = 4 * mm
    spec_w = (IW - 5 * spec_gap) / 6

    for i, (label, val) in enumerate(specs):
        bx = M + i * (spec_w + spec_gap)

        c.setFillColor(HexColor('#f7f7f7'))
        c.rect(bx, box_y, spec_w, box_h, fill=1, stroke=0)

        c.setFillColor(COPPER)
        c.rect(bx, box_y + box_h - 3, spec_w, 3, fill=1, stroke=0)

        c.setFont('Helvetica', 5.5)
        c.setFillColor(MUTED)
        c.drawString(bx + 4, box_y + box_h - 12, label.upper())

        c.setFont('Helvetica-Bold', 7)
        c.setFillColor(DARK)
        vlines = wrapped_lines(val, 'Helvetica-Bold', 7, spec_w - 8)
        vy = box_y + 18
        for vl in reversed(vlines):
            c.setFont('Helvetica-Bold', 7)
            c.drawString(bx + 4, vy, vl)
            vy += 9

    footer(c)


def page_gift_set(c, gs):
    left_w = W * 0.50

    # Left panel background
    c.setFillColor(WARM_BG)
    c.rect(0, 0, left_w, H, fill=1, stroke=0)

    # Product image — centered square in left panel
    ir = load_cover(gs['folder'], crop_square=True)
    img_size = left_w - 20 * mm
    img_x = (left_w - img_size) / 2
    img_y = H / 2 - img_size / 2
    img_box(c, ir, img_x, img_y, img_size, img_size)

    # SKU label at bottom of left panel
    c.setFont('Helvetica', 6.5)
    c.setFillColor(MUTED)
    c.drawCentredString(left_w / 2, M - 2, gs['sku'])

    # Vertical separator
    c.setStrokeColor(GRID)
    c.setLineWidth(0.5)
    c.line(left_w, M, left_w, H - M)

    # ── Right panel ──────────────────────────────────────────────────────────
    rx = left_w + 14 * mm
    rw = W - rx - M
    y = H - M

    # GIFT SET label
    y -= 16
    c.setFont('Helvetica', 6.5)
    c.setFillColor(COPPER)
    c.drawString(rx, y, 'GIFT SET')

    # Copper rule
    y -= 9
    hline(c, rx, y, rx + rw, COPPER, 0.75)

    # Set name
    y -= 34
    c.setFont('Times-Roman', 30)
    c.setFillColor(DARK)
    for line in wrapped_lines(gs['name'], 'Times-Roman', 30, rw):
        c.drawString(rx, y, line)
        y -= 34

    # Tagline
    y -= 4
    c.setFont('Times-Italic', 10.5)
    c.setFillColor(MUTED)
    y = draw_wrapped(c, gs['tagline'], rx, y, rw, 'Times-Italic', 10.5, 14, MUTED)

    # Divider
    y -= 14
    hline(c, rx, y, rx + rw, GRID)

    # Components
    y -= 14
    c.setFont('Helvetica', 6)
    c.setFillColor(COPPER)
    c.drawString(rx, y, 'SET COMPONENTS')

    y -= 13
    for sku, name in gs['components']:
        c.setFillColor(COPPER)
        c.circle(rx + 3, y + 3.5, 1.8, fill=1, stroke=0)
        c.setFont('Helvetica-Bold', 7.5)
        c.setFillColor(COPPER)
        c.drawString(rx + 10, y, sku)
        sku_w = stringWidth(sku, 'Helvetica-Bold', 7.5)
        c.setFont('Helvetica', 8.5)
        c.setFillColor(DARK)
        c.drawString(rx + 10 + sku_w + 5, y, name)
        y -= 14

    # Divider
    y -= 8
    hline(c, rx, y, rx + rw, GRID)

    # FOB Price
    y -= 14
    c.setFont('Helvetica', 6)
    c.setFillColor(MUTED)
    c.drawString(rx, y, 'FOB PRICE RANGE (per set)')

    y -= 26
    c.setFont('Times-Roman', 30)
    c.setFillColor(COPPER)
    c.drawString(rx, y, gs['fob'])
    fob_w = stringWidth(gs['fob'], 'Times-Roman', 30)
    c.setFont('Helvetica', 7)
    c.setFillColor(MUTED)
    c.drawString(rx + fob_w + 6, y + 9, 'USD · FOB China')

    # Divider
    y -= 12
    hline(c, rx, y, rx + rw, GRID)

    # Key points
    y -= 14
    c.setFont('Helvetica', 6)
    c.setFillColor(COPPER)
    c.drawString(rx, y, 'WHY BUYERS CHOOSE THIS SET')

    y -= 12
    for pt in gs['points']:
        c.setFont('Helvetica', 9)
        c.setFillColor(HexColor('#bbbbbb'))
        c.drawString(rx, y, '—')
        y = draw_wrapped(c, pt, rx + 11, y, rw - 11, 'Helvetica', 8.5, 13, DARK)
        y -= 3

    # Divider
    y -= 8
    hline(c, rx, y, rx + rw, GRID)

    # Target buyer
    y -= 12
    c.setFont('Helvetica', 6)
    c.setFillColor(COPPER)
    c.drawString(rx, y, 'IDEAL FOR')
    y -= 11
    y = draw_wrapped(c, gs['target'], rx, y, rw, 'Helvetica', 8, 12, MUTED)

    # Packaging + MOQ
    y -= 8
    c.setFont('Helvetica', 6)
    c.setFillColor(COPPER)
    c.drawString(rx, y, 'PACKAGING  ·  MOQ')
    y -= 11
    c.setFont('Helvetica', 8)
    c.setFillColor(DARK)
    c.drawString(rx, y, 'Corrugated Box + EVA Foam Insert  ·  100 sets minimum')

    # CTA
    cta_y = M + 30
    hline(c, rx, cta_y + 18, rx + rw, GRID)
    c.setFont('Times-Italic', 10)
    c.setFillColor(COPPER)
    draw_wrapped(c, f'"{gs["cta"]}"', rx, cta_y, rw, 'Times-Italic', 10, 14, COPPER)

    footer(c)


def page_products(c, category_title, items):
    """2-column product grid. Max 4 items per page."""
    IW = W - 2 * M
    y = H - M

    # Kicker
    y -= 16
    c.setFont('Helvetica', 6.5)
    c.setFillColor(COPPER)
    c.drawString(M, y, 'PRODUCT RANGE')

    # Category title
    y -= 28
    c.setFont('Times-Roman', 26)
    c.setFillColor(DARK)
    c.drawString(M, y, category_title)

    # Rule
    y -= 12
    hline(c, M, y, W - M, COPPER, 0.75)
    y -= 12

    # Grid: 2 cols
    n_cols = 2
    col_gap = 10 * mm
    col_w = (IW - col_gap) / n_cols
    img_h = col_w         # square images
    row_gap = 10 * mm
    text_h = 22 * mm      # text area below image

    for idx, item in enumerate(items[:4]):
        col = idx % n_cols
        row = idx // n_cols
        x = M + col * (col_w + col_gap)
        top_y = y - row * (img_h + text_h + row_gap)

        # Image
        ir = load_cover(item['folder'], crop_square=True)
        img_box(c, ir, x, top_y - img_h, col_w, img_h)

        # Text
        ty = top_y - img_h - 9

        # SKU
        c.setFont('Helvetica', 7)
        c.setFillColor(COPPER)
        c.drawString(x, ty, item['sku'])
        ty -= 13

        # Name
        c.setFont('Times-Roman', 11)
        c.setFillColor(DARK)
        for line in wrapped_lines(item['name'], 'Times-Roman', 11, col_w):
            c.drawString(x, ty, line)
            ty -= 13

        # Tagline
        c.setFont('Helvetica', 7.5)
        c.setFillColor(MUTED)
        for line in wrapped_lines(item['tagline'], 'Helvetica', 7.5, col_w):
            c.drawString(x, ty, line)
            ty -= 10

    # Footer note
    c.setFont('Helvetica', 7)
    c.setFillColor(MUTED)
    c.drawRightString(W - M, M + 10, 'All items: MOQ 100 pcs  ·  Laser engraving on all pieces')

    footer(c)


def page_contact(c):
    # Dark background
    c.setFillColor(DARK)
    c.rect(0, 0, W, H, fill=1, stroke=0)

    # Kicker
    y = H - 95 * mm
    c.setFont('Helvetica', 7)
    c.setFillColor(COPPER)
    c.drawCentredString(W / 2, y + 22, 'G E T   I N   T O U C H')

    # Heading
    c.setFont('Times-Roman', 40)
    c.setFillColor(WHITE)
    c.drawCentredString(W / 2, y, 'Start Your Inquiry')

    # Rule
    y -= 18
    c.setStrokeColor(COPPER)
    c.setLineWidth(0.75)
    c.line(W / 2 - 42 * mm, y, W / 2 + 42 * mm, y)

    # Subtext
    y -= 26
    c.setFont('Times-Italic', 11)
    c.setFillColor(HexColor('#cccccc'))
    c.drawCentredString(W / 2, y,
        'Send us your brief. We respond within 24 hours with a quote and sample timeline.')

    # Contact details table
    y -= 40
    details = [
        ('Email',         'inquiries@wischosgift.com'),
        ('Website',       'wischosgift.com'),
        ('Response Time', 'Within 24 hours'),
        ('MOQ',           '100 sets / 100 pcs per item'),
        ('Lead Time',     '25–35 days production after sample approval'),
        ('Incoterms',     'FOB China'),
        ('Customization', 'Laser engraving on all items'),
        ('Packaging',     'Corrugated box with EVA foam insert'),
    ]

    mid = W / 2
    for label, val in details:
        c.setFont('Helvetica', 7)
        c.setFillColor(HexColor('#888888'))
        c.drawRightString(mid - 8, y, label.upper())

        c.setFont('Helvetica', 9)
        c.setFillColor(WHITE)
        c.drawString(mid + 8, y, val)
        y -= 20

    # Divider
    y -= 16
    c.setStrokeColor(HexColor('#2a2a2a'))
    c.setLineWidth(0.5)
    c.line(M, y, W - M, y)

    # Custom note
    y -= 24
    c.setFont('Times-Italic', 11)
    c.setFillColor(HexColor('#888888'))
    c.drawCentredString(W / 2, y,
        'All products available with custom laser engraving, anodized color options,')
    c.drawCentredString(W / 2, y - 14,
        'and branded packaging — confirmed at sample stage.')

    # Company info at bottom
    reg_y = M + 30
    c.setStrokeColor(HexColor('#2a2a2a'))
    c.setLineWidth(0.5)
    c.line(M, reg_y + 18, W - M, reg_y + 18)
    c.setFont('Helvetica', 6.5)
    c.setFillColor(HexColor('#555555'))
    c.drawCentredString(W / 2, reg_y + 4,
        'Anhui Wischos International Trading Co., Ltd  ·  Registered 2024  ·  Anhui, China')


# ─────────────────────────────────────────────────────────────────────────────
# MAIN
# ─────────────────────────────────────────────────────────────────────────────

def main():
    c = rl_canvas.Canvas(str(OUT), pagesize=A4)
    c.setTitle('Wischos Gift — Product Catalog 2025')
    c.setAuthor('Wischos Gift Trading Co., Ltd')
    c.setSubject('Custom Metal Corporate Gift Sets — 2025')

    print('Generating Wischos Gift Catalog 2025...')

    print('  [1] Cover')
    page_cover(c)
    c.showPage()

    print('  [2] About & Ordering')
    page_about(c)
    c.showPage()

    for i, gs in enumerate(GIFT_SETS, 3):
        print(f'  [{i}] Gift Set: {gs["name"]}')
        page_gift_set(c, gs)
        c.showPage()

    page_num = 3 + len(GIFT_SETS)
    for cat in CATEGORIES:
        items = cat['items']
        title = cat['title']
        for chunk_start in range(0, len(items), 4):
            chunk = items[chunk_start:chunk_start + 4]
            print(f'  [{page_num}] Products: {title} (items {chunk_start+1}–{chunk_start+len(chunk)})')
            page_products(c, title, chunk)
            c.showPage()
            page_num += 1

    print(f'  [{page_num}] Contact')
    page_contact(c)
    c.showPage()

    c.save()
    total = page_num
    print(f'\n✓ Saved: {OUT}')
    print(f'  Total pages: {total}')


if __name__ == '__main__':
    main()
