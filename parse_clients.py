#!/usr/bin/env python3
"""
Parse ~200 customer profile MD files and write to Excel CRM.
"""
import os
import re
import glob
from datetime import datetime
import openpyxl
from openpyxl.styles import Font, Alignment

EXCEL_PATH = '/mnt/d/Project/Wischos trading website/二次工作文件/Wischos 潜在客户开发记录表.xlsx'
BASE_DIR = '/mnt/d/Project/Wischos trading website/临时'

# Files/folders to skip
SKIP_FOLDERS = {'通用资料', '排除-自有中国办公室'}
SKIP_FILES = {
    'supplier-importer-leads-2026-05-21.md',
    'sheeneagh-dowling-analysis-comparison.md',
}

# Already in Excel
EXISTING_COMPANIES = {
    'alberta custom flag and banner',
    'pr promotional products',
    'brandz marketing inc.',
    'brandz marketing inc',
    'caribou gifts',
    'promo gear',
}
EXISTING_CONTACTS = {
    ('alberta custom flag and banner', 'warren gross'),
    ('pr promotional products', 'anthony rogers-altman'),
    ('brandz marketing inc.', 'graeme dawes'),
    ('brandz marketing inc', 'graeme dawes'),
    ('caribou gifts', 'megan munro'),
    ('promo gear', 'david hulett'),
}

# Country folder map
FOLDER_COUNTRY_MAP = {
    '加拿大': '加拿大',
    '澳大利亚': '澳大利亚',
    '英国': '英国',
    '美国': '美国',
    'UAE': 'UAE',
    '其他': '其他',
    '新西兰': '新西兰',
}

def get_country_from_path(filepath):
    """Derive country from parent folder name."""
    parts = filepath.replace(BASE_DIR, '').split(os.sep)
    # parts[0] is empty, parts[1] is top folder
    for part in parts[1:]:
        if part in FOLDER_COUNTRY_MAP:
            return FOLDER_COUNTRY_MAP[part]
    return None

def get_all_md_files():
    """Collect all relevant MD files."""
    all_files = []
    for root, dirs, files in os.walk(BASE_DIR):
        # Skip unwanted folders
        dirs[:] = [d for d in dirs if d not in SKIP_FOLDERS]
        for f in files:
            if f.endswith('.md'):
                if f in SKIP_FILES:
                    continue
                full_path = os.path.join(root, f)
                all_files.append(full_path)
    return sorted(all_files)

def read_file(filepath):
    """Read file with error handling."""
    try:
        with open(filepath, 'r', encoding='utf-8') as fh:
            return fh.read()
    except Exception as e:
        print(f"  ERROR reading {filepath}: {e}")
        return ''

def extract_field(content, field_name):
    """Extract **Field**: value from markdown."""
    pattern = rf'\*\*{re.escape(field_name)}\*\*[：:]\s*(.+)'
    m = re.search(pattern, content)
    if m:
        return m.group(1).strip()
    return ''

def parse_title_line(content):
    """Extract company name and contact from # Title line."""
    m = re.match(r'^#\s+(.+)', content, re.MULTILINE)
    if not m:
        return '', ''
    title = m.group(1).strip()
    # Remove trailing notes like 客户档案, 独立调查 etc
    title = re.sub(r'\s+客户档案.*$', '', title)
    title = re.sub(r'\s+（独立调查.*$', '', title)

    # Split on ' - ' or ' – ' or ' — '
    for sep in [' – ', ' — ', ' - ']:
        if sep in title:
            parts = title.split(sep, 1)
            return parts[0].strip(), parts[1].strip()
    return title.strip(), ''

def parse_contact_field(content):
    """Extract contact name and role from **联系人**: field."""
    lianxiren = extract_field(content, '联系人')
    if not lianxiren:
        return '', ''
    # Split at first comma or Chinese comma
    for sep in ['，', ',']:
        if sep in lianxiren:
            parts = lianxiren.split(sep, 1)
            return parts[0].strip(), parts[1].strip()
    # Just a name
    return lianxiren.strip(), ''

def parse_priority(content):
    """Map priority stars/class to Chinese label."""
    # Look for priority line
    # Check for A类 (not A-类)
    if re.search(r'A类(?!\s*[-—])', content):
        return '高'
    # ⭐⭐⭐⭐⭐
    if '⭐⭐⭐⭐⭐' in content:
        return '高'
    # A-类 or B+类 or ⭐⭐⭐⭐ (but not ⭐⭐⭐⭐⭐)
    if re.search(r'A-类|B\+类', content):
        return '中高'
    # Count ⭐⭐⭐⭐ carefully (exactly 4, not 5)
    stars_match = re.search(r'⭐+', content)
    if stars_match:
        count = len(stars_match.group())
        if count >= 5:
            return '高'
        elif count == 4:
            return '中高'
        elif count == 3:
            return '中'
        elif count == 2:
            return '低'
        elif count == 1:
            return '极低'
    # Text-based
    if re.search(r'综合优先级.*?[：:]\s*[低极低]|优先级[：:]\s*低', content):
        return '低'
    if re.search(r'B类|B-类', content):
        return '中'
    if re.search(r'C类', content):
        return '低'
    if re.search(r'D类', content):
        return '极低'
    # Check for "综合优先级：高" style
    m = re.search(r'综合优先级[：:]\s*(\S+)', content)
    if m:
        val = m.group(1)
        if '高' in val:
            return '高'
        elif '中' in val:
            return '中'
        elif '低' in val:
            return '低'
    return '中'

def parse_buyer_type(content, filepath):
    """Determine buyer type."""
    # Check file/content for corporate buyer indicators
    if re.search(r'hamper|gifting platform|B2C|终端礼品买家|corporate gifting specialist', content, re.IGNORECASE):
        return '企业终端'
    # Most promo product companies are distributors
    if re.search(r'promo\s+distributor|promotional\s+products|分销商|distributor|经销商', content, re.IGNORECASE):
        return '分销商'
    if re.search(r'corporate\s+gift', content, re.IGNORECASE):
        return '企业终端'
    return '分销商'

def parse_date(content):
    """Extract date from 独立可行性分析（YYYY-MM-DD）."""
    m = re.search(r'独立可行性分析[（(](\d{4}-\d{2}-\d{2})[）)]', content)
    if m:
        try:
            return datetime.strptime(m.group(1), '%Y-%m-%d').date()
        except:
            pass
    return None

def parse_location(content, country):
    """Extract city from **位置**: field or content."""
    loc = extract_field(content, '位置')
    if loc:
        return loc
    # Try to find city from content
    return country or ''

def parse_email(content):
    """Extract email from **邮箱**: field."""
    email = extract_field(content, '邮箱')
    if email:
        # Clean up
        email = re.sub(r'\s*[（(].*$', '', email)
        email = email.split('；')[0].split(';')[0].strip()
        if '待确认' in email or '待核实' in email:
            return ''
        return email
    return ''

def parse_phone(content):
    """Extract phone from **电话**: field."""
    phone = extract_field(content, '电话')
    if phone and '待确认' not in phone:
        return phone.split('；')[0].split(';')[0].strip()
    return ''

def parse_website(content):
    """Extract website from **网站**: field."""
    site = extract_field(content, '网站')
    if site:
        # Remove markdown link formatting
        m = re.search(r'\[([^\]]+)\]\(([^)]+)\)', site)
        if m:
            return m.group(2)
        return site.strip('[]()').strip()
    return ''

def parse_linkedin_url(content):
    """Extract LinkedIn URL from content."""
    # Look for linkedin.com/in/ URL
    m = re.search(r'(https?://[a-z]{0,3}\.?linkedin\.com/in/[^\s\)\]"\']+)', content, re.IGNORECASE)
    if m:
        return m.group(1).rstrip('.,;')
    # Also try LinkedIn: line
    m = re.search(r'\*\*LinkedIn\*\*[：:\s]+(.+)', content)
    if m:
        val = m.group(1).strip()
        url_m = re.search(r'(https?://[^\s\)\]"\']+)', val)
        if url_m:
            return url_m.group(1).rstrip('.,;')
    return ''

def parse_company_size(content):
    """Extract company size / employee count."""
    # Look for patterns like "1-10人", "11-50 employees", "小型", etc.
    patterns = [
        r'(\d+[-–]\d+\s*(?:名?员工|人|employees?|staff))',
        r'(规模\s*[：:]\s*[^\n]+)',
        r'(\d+\s*(?:名?员工|人|employees?))',
        r'(小型|中型|大型|微型)',
        r'(~\d+\s*(?:人|staff|employees?))',
    ]
    for p in patterns:
        m = re.search(p, content, re.IGNORECASE)
        if m:
            val = m.group(1).strip()
            if len(val) < 50:
                return val
    return ''

def parse_main_business(content):
    """Extract main business description, max 80 chars."""
    # Try 公司概况 table first
    m = re.search(r'产品与服务能力[：:]\s*\n([^\n]+)', content)
    if m:
        return m.group(1).strip()[:80]

    # Try first paragraph after company overview heading
    m = re.search(r'##\s*(?:公司概况|一、公司概况)[^\n]*\n+\|[^|]+\|[^|]+\|[^\n]*\n(?:[^\n]+\n)*', content)

    # Look for 主营业务 in table
    m = re.search(r'\|\s*主营业务\s*\|\s*([^|]+)\|', content)
    if m:
        return m.group(1).strip()[:80]

    # Extract from 产品 or 业务 sections
    m = re.search(r'(?:主要产品|主营|核心业务|产品与服务)[^：:]*[：:]\s*([^\n]{10,})', content)
    if m:
        return m.group(1).strip()[:80]

    # Try first description paragraph
    # Remove headers and find first substantial text paragraph
    text = re.sub(r'#[^\n]*\n', '', content)
    text = re.sub(r'\*\*[^*]+\*\*[：:][^\n]*\n', '', text)
    text = re.sub(r'---+\n', '', text)
    paragraphs = [p.strip() for p in text.split('\n\n') if len(p.strip()) > 30]
    if paragraphs:
        return paragraphs[0][:80]

    return ''

def parse_founded(content):
    """Extract founding year."""
    patterns = [
        r'成立(?:时间|年份)?[：:\s]+(\d{4})',
        r'Founded[：:\s]+(\d{4})',
        r'注册时间[：:\s]+(\d{4})',
        r'created in (\d{4})',
        r'since (\d{4})',
        r'(\d{4})年(?:成立|创立|注册|建立|founded)',
        r'\|\s*成立时间\s*\|\s*(\d{4})',
    ]
    for p in patterns:
        m = re.search(p, content, re.IGNORECASE)
        if m:
            year = m.group(1)
            if 1900 <= int(year) <= 2026:
                return year
    return ''

def parse_associations(content):
    """Look for industry associations."""
    assocs = []
    for assoc in ['APPA', 'ASI', 'PPPC', 'PPAI', 'SAGE', 'BPMA', 'APPA', 'SEDEX']:
        if assoc in content:
            assocs.append(assoc)
    return ', '.join(assocs) if assocs else ''

def parse_approach(content):
    """Extract 切入角度 from first 接触钩子 bullet."""
    # Look for 接触钩子 section
    m = re.search(r'接触钩子[^\n]*\n+(?:1\.|[-*•])\s*\*\*([^*\n]+)\*\*', content)
    if m:
        return m.group(1).strip()[:100]

    m = re.search(r'接触钩子[^\n]*\n+(?:1\.|[-*•])\s*(.+)', content)
    if m:
        val = m.group(1).strip()
        # Remove markdown bold
        val = re.sub(r'\*+', '', val)
        return val[:100]

    # Look for 切入角度 line
    m = re.search(r'切入角度[：:]\s*(.+)', content)
    if m:
        return m.group(1).strip()[:100]

    return ''

def parse_risk(content):
    """Extract first structural risk."""
    # Look for 结构性风险 table first row
    m = re.search(r'结构性风险[^\n]*\n[^\n]*\n[^\n]*\n\|\s*\*?\*?([^|*]+)\*?\*?\s*\|', content)
    if m:
        return m.group(1).strip()[:100]

    # Table row pattern: | risk | explanation |
    m = re.search(r'结构性风险[^\n]*\n.*?\n.*?\n\|\s*([^|]+)\|', content, re.DOTALL)
    if m:
        val = m.group(1).strip()
        val = re.sub(r'\*+', '', val)
        return val[:100]

    # Look for 注意 or 风险 bullet
    m = re.search(r'(?:结构性风险|风险|注意)[：:][^\n]*\n[-*•]\s*(.+)', content)
    if m:
        return m.group(1).strip()[:100]

    return ''

def parse_value_prop(content):
    """Extract 核心价值主张."""
    m = re.search(r'核心价值主张[：:]\s*(.+)', content)
    if m:
        return m.group(1).strip()[:100]
    # Look for WGS references as proxy
    m = re.search(r'(?:WGS-\d+[^；\n]*)', content)
    if m:
        return m.group(0).strip()[:100]
    return ''

def parse_decision_char(content):
    """Extract decision characteristics."""
    m = re.search(r'决策(?:特征|力|风格)[：:]\s*(.+)', content)
    if m:
        return m.group(1).strip()[:100]
    return ''

def is_duplicate_file(filepath, content):
    """Check if this is a duplicate file (e.g. -原始潜在档案 suffix)."""
    filename = os.path.basename(filepath)
    if '原始潜在档案' in filename:
        return True
    if 'follow-up-tracker' in filename:
        return True
    if '-Outreach' in filename:
        return True
    return False

def check_jm_designs(filepath, content):
    """Special check for jm_designs file - is it a client profile?"""
    # It mentions company analysis but no standard headers
    return '**联系人**' not in content and '**网站**' not in content

def parse_multi_contact_file(filepath, content, country):
    """Handle files with multiple contacts (like J&F Gift, Alpha Promotions)."""
    records = []

    title_company, title_contact = parse_title_line(content)

    # Check if title has & (multiple contacts)
    if '&' in title_contact and 'Inc' not in title_contact:
        # Like "Jiehan Lim & Felina Tan"
        contacts_part = title_contact
        contact_names = re.split(r'\s*[&＆]\s*', contacts_part)
        for cname in contact_names:
            cname = cname.strip()
            if not cname:
                continue
            rec = parse_single_contact(filepath, content, country, title_company, cname, '')
            if rec:
                records.append(rec)
        return records

    # Check for multiple contact sections in file
    # Pattern: ### N. Contact Name or ## 联系人 N:
    contact_sections = re.findall(
        r'(?:###\s*(?:\d+\.|四、)?(?:关键联系人\s*\d*[：:]?\s*)?|##\s*联系人\s*\d*[：:]?\s*)([A-Za-z\u4e00-\u9fff][^\n]+)\n',
        content
    )

    if len(contact_sections) > 1:
        for csec in contact_sections:
            cname = csec.strip()
            # Clean up
            cname = re.sub(r'（[^）]+）', '', cname).strip()
            cname = re.sub(r'\（[^\）]+\）', '', cname).strip()
            if len(cname) < 2 or len(cname) > 50:
                continue
            rec = parse_single_contact(filepath, content, country, title_company, cname, '')
            if rec:
                records.append(rec)
        return records

    return None  # Not multi-contact

def parse_single_contact(filepath, content, country, company_name, contact_name, role):
    """Build a record dict for a single contact."""
    if not company_name:
        return None
    if not contact_name:
        return None

    rec = {
        'company': company_name,
        'contact': contact_name,
        'role': role,
        'country': country or '',
        'filepath': filepath,
    }
    return rec

def parse_file(filepath):
    """Parse a single MD file and return list of record dicts."""
    content = read_file(filepath)
    if not content:
        return []

    # Skip non-client files
    filename = os.path.basename(filepath)

    # jm_designs - check if client profile
    if filename == 'jm_designs_janelle_twyman_report.md':
        # Based on our read, it IS a profile but no standard headers
        # Include it but parse manually
        pass

    # Skip follow-up tracker and outreach files (duplicates)
    if is_duplicate_file(filepath, content):
        return []

    country = get_country_from_path(filepath)
    if not country:
        # Derive from **位置**: field
        loc = extract_field(content, '位置')
        if loc:
            if 'Australia' in loc or '澳大利亚' in loc:
                country = '澳大利亚'
            elif 'Canada' in loc or '加拿大' in loc:
                country = '加拿大'
            elif 'New Zealand' in loc or '新西兰' in loc:
                country = '新西兰'
            elif 'UK' in loc or 'United Kingdom' in loc or '英国' in loc:
                country = '英国'
            elif 'UAE' in loc or 'Dubai' in loc or 'Abu Dhabi' in loc:
                country = 'UAE'
            elif 'USA' in loc or 'United States' in loc or '美国' in loc:
                country = '美国'
            else:
                country = '其他'
        else:
            country = '其他'

    title_company, title_contact = parse_title_line(content)
    contact_name, contact_role = parse_contact_field(content)

    # Use title contact if no **联系人** field, or verify
    if not contact_name:
        contact_name = title_contact
    if not title_company:
        return []

    # Handle special files with non-standard format
    if filename == 'jm_designs_janelle_twyman_report.md':
        # From our read: J&M Designs, Janelle Twyman, Owner and Operator, New Zealand
        title_company = 'J&M Designs'
        contact_name = 'Janelle Twyman'
        contact_role = 'Owner and Operator'
        country = '新西兰'

    # Multi-contact files
    # J&F Gift Inc
    if 'J&F Gift' in title_company or ('Jiehan' in content and 'Felina' in content and title_company):
        records = []
        # Contact 1: Jiehan Lim
        r1 = extract_full_record(filepath, content, country, title_company, 'Jiehan Lim', 'Owner')
        records.append(r1)
        # Contact 2: Felina Tan
        r2 = extract_full_record(filepath, content, country, title_company, 'Felina Tan', 'Co-founder, Owner')
        records.append(r2)
        return records

    # Alpha Promotions Ltd综合报告 (multiple contacts)
    if 'Alpha Promotions' in title_company and '综合' in filename:
        records = []
        # Contact 1: Scott Lee
        r1 = extract_full_record(filepath, content, country, 'Alpha Promotions Ltd', 'Scott Lee', 'Sales Manager')
        records.append(r1)
        # Contact 2: Belinda Bryant
        m = re.search(r'Belinda Bryant', content)
        if m:
            r2 = extract_full_record(filepath, content, country, 'Alpha Promotions Ltd', 'Belinda Bryant', 'Director')
            records.append(r2)
        return records

    # Normal single-contact file
    if not contact_name:
        return []

    return [extract_full_record(filepath, content, country, title_company, contact_name, contact_role)]

def extract_full_record(filepath, content, country, company, contact, role):
    """Extract all fields for a record."""
    if not role:
        _, role = parse_contact_field(content)

    # Get location
    loc = extract_field(content, '位置')
    if not loc:
        loc = country

    # Get phone/email
    email = parse_email(content)
    phone = parse_phone(content)

    # LinkedIn
    linkedin = parse_linkedin_url(content)

    # Priority
    priority = parse_priority(content)

    # Buyer type
    buyer_type = parse_buyer_type(content, filepath)

    # Date
    built_date = parse_date(content)

    # Company size
    size = parse_company_size(content)

    # Main business
    biz = parse_main_business(content)

    # Founded
    founded = parse_founded(content)

    # Associations
    assocs = parse_associations(content)

    # Approach
    approach = parse_approach(content)

    # Value prop
    value_prop = parse_value_prop(content)

    # Decision
    decision = parse_decision_char(content)

    # Risk
    risk = parse_risk(content)

    return {
        'company': company,
        'contact': contact,
        'role': role,
        'buyer_type': buyer_type,
        'location': loc,
        'country': country,
        'phase': '待接触',
        'priority': priority,
        'linkedin': linkedin,
        'email': email,
        'phone': phone,
        'whatsapp': '',
        'size': size,
        'main_biz': biz,
        'founded': founded,
        'associations': assocs,
        'approach': approach,
        'value_prop': value_prop,
        'decision': decision,
        'risk': risk,
        'source': 'LinkedIn + 官网',
        'built_date': built_date,
        'filepath': filepath,
    }

def deduplicate(records):
    """Remove duplicates: same company+contact = keep one. Same company+different contacts = keep both."""
    seen = {}  # key=(company_lower, contact_lower) -> record
    result = []

    for rec in records:
        company_key = rec['company'].lower().strip()
        contact_key = rec['contact'].lower().strip()
        key = (company_key, contact_key)

        if key in seen:
            # Keep the one with more data
            existing = seen[key]
            existing_filled = sum(1 for v in existing.values() if v)
            new_filled = sum(1 for v in rec.values() if v)
            if new_filled > existing_filled:
                seen[key] = rec
        else:
            seen[key] = rec

    # Return in stable order
    for rec in records:
        company_key = rec['company'].lower().strip()
        contact_key = rec['contact'].lower().strip()
        key = (company_key, contact_key)
        if key in seen and seen[key] is rec:
            result.append(rec)
            seen[key] = None  # Mark as added

    return result

def is_existing(rec):
    """Check if record matches existing C001-C005 entries."""
    company_low = rec['company'].lower().strip()
    contact_low = rec['contact'].lower().strip()

    if company_low in EXISTING_COMPANIES:
        if (company_low, contact_low) in EXISTING_CONTACTS:
            return True
        # Same company different contact - still skip if company is exactly in list?
        # Per instructions: same company + different contact = separate row
        # But C001-C005 are specific company+contact pairs.
        # Skip if same company AND same contact, include if different contact
        return False
    return False

def write_to_excel(records):
    """Write records to Excel file."""
    wb = openpyxl.load_workbook(EXCEL_PATH)
    ws_main = wb['主板']
    ws_detail = wb['客户库']

    # Find next rows
    main_next_row = 12  # Per instructions
    detail_next_row = 9  # Per instructions

    # Verify by checking actual data
    # Main board: data starts at row 7, existing data C001-C005 in rows 7-11
    # Detail: data starts at row 4, existing C001-C005 in rows 4-8

    added = 0
    start_id = 6  # C006 onwards

    for i, rec in enumerate(records):
        cid = f'C{start_id + i:03d}'

        # Write to 主板
        row_main = main_next_row + i
        ws_main.cell(row=row_main, column=1, value=cid)
        ws_main.cell(row=row_main, column=2, value=rec['company'])
        ws_main.cell(row=row_main, column=3, value=rec['contact'])
        ws_main.cell(row=row_main, column=4, value=rec['buyer_type'])
        # Country/location
        loc_val = rec['location'] if rec['location'] != rec['country'] else rec['country']
        ws_main.cell(row=row_main, column=5, value=loc_val)
        ws_main.cell(row=row_main, column=6, value=rec['phase'])
        ws_main.cell(row=row_main, column=7, value=rec['priority'])
        ws_main.cell(row=row_main, column=8, value=None)  # 上次跟进 - blank
        ws_main.cell(row=row_main, column=9, value=None)  # 下次跟进 - blank
        ws_main.cell(row=row_main, column=10, value=0)    # 跟进次数
        ws_main.cell(row=row_main, column=11, value='')   # 快速备注

        # Write to 客户库
        row_detail = detail_next_row + i
        ws_detail.cell(row=row_detail, column=1, value=cid)
        ws_detail.cell(row=row_detail, column=2, value=rec['company'])
        ws_detail.cell(row=row_detail, column=3, value=rec['contact'])
        ws_detail.cell(row=row_detail, column=4, value=rec['role'])
        ws_detail.cell(row=row_detail, column=5, value=rec['buyer_type'])
        ws_detail.cell(row=row_detail, column=6, value=rec['linkedin'])
        ws_detail.cell(row=row_detail, column=7, value=rec['email'])
        ws_detail.cell(row=row_detail, column=8, value=rec['phone'])
        ws_detail.cell(row=row_detail, column=9, value=rec['whatsapp'])
        ws_detail.cell(row=row_detail, column=10, value=rec['location'])
        ws_detail.cell(row=row_detail, column=11, value=rec['size'])
        ws_detail.cell(row=row_detail, column=12, value=rec['main_biz'])
        ws_detail.cell(row=row_detail, column=13, value=rec['founded'])
        ws_detail.cell(row=row_detail, column=14, value=rec['associations'])
        ws_detail.cell(row=row_detail, column=15, value=rec['approach'])
        ws_detail.cell(row=row_detail, column=16, value=rec['value_prop'])
        ws_detail.cell(row=row_detail, column=17, value=rec['decision'])
        ws_detail.cell(row=row_detail, column=18, value=rec['risk'])
        ws_detail.cell(row=row_detail, column=19, value=rec['source'])
        # Built date
        if rec['built_date']:
            ws_detail.cell(row=row_detail, column=20, value=rec['built_date'])

        added += 1

    wb.save(EXCEL_PATH)
    return added

def main():
    print("=== Wischos Client Profile Parser ===")
    print(f"Scanning: {BASE_DIR}")

    all_files = get_all_md_files()
    print(f"Found {len(all_files)} MD files to process")

    all_records = []
    skipped_files = []
    error_files = []
    duplicate_files = []

    for filepath in all_files:
        filename = os.path.basename(filepath)

        # Skip duplicate/outreach files
        if is_duplicate_file(filepath, ''):
            duplicate_files.append(filepath)
            continue

        try:
            records = parse_file(filepath)
            if not records:
                skipped_files.append(filepath)
                continue
            all_records.extend(records)
        except Exception as e:
            print(f"  ERROR: {filepath}: {e}")
            error_files.append(filepath)

    print(f"\nRaw records extracted: {len(all_records)}")
    print(f"Duplicate/outreach files skipped: {len(duplicate_files)}")
    print(f"Files yielding no records: {len(skipped_files)}")

    # Deduplicate
    unique_records = deduplicate(all_records)
    print(f"After deduplication: {len(unique_records)}")

    # Filter out existing C001-C005
    new_records = [r for r in unique_records if not is_existing(r)]
    print(f"After removing existing C001-C005: {len(new_records)}")

    # Write to Excel
    print(f"\nWriting {len(new_records)} records to Excel...")
    added = write_to_excel(new_records)

    print(f"\n=== SUMMARY ===")
    print(f"Records added: {added}")
    print(f"IDs: C006 – C{5 + added:03d}")
    print(f"\nSkipped files ({len(skipped_files)} + {len(duplicate_files)} duplicates):")
    for f in duplicate_files:
        print(f"  [DUPLICATE] {os.path.relpath(f, BASE_DIR)}")
    for f in skipped_files[:20]:
        print(f"  [NO_RECORD] {os.path.relpath(f, BASE_DIR)}")
    if len(skipped_files) > 20:
        print(f"  ... and {len(skipped_files)-20} more")

    if error_files:
        print(f"\nErrors ({len(error_files)}):")
        for f in error_files:
            print(f"  {f}")

if __name__ == '__main__':
    main()
