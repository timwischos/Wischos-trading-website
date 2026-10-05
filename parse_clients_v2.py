#!/usr/bin/env python3
"""
Parse ~200 customer profile MD files and write to Excel CRM.
Version 2 - handles non-standard formats
"""
import os
import re
from datetime import datetime, date
import openpyxl

EXCEL_PATH = '/mnt/d/Project/Wischos trading website/二次工作文件/Wischos 潜在客户开发记录表.xlsx'
BASE_DIR = '/mnt/d/Project/Wischos trading website/临时'

# Files/folders to skip
SKIP_FOLDERS = {'通用资料', '排除-自有中国办公室'}
SKIP_FILES = {
    'supplier-importer-leads-2026-05-21.md',
    'sheeneagh-dowling-analysis-comparison.md',
}

# Already in Excel (C001-C005) - exact company+contact pairs
EXISTING_PAIRS = {
    ('alberta custom flag and banner', 'warren gross'),
    ('pr promotional products', 'anthony rogers-altman'),
    ('brandz marketing inc.', 'graeme dawes'),
    ('brandz marketing inc', 'graeme dawes'),
    ('caribou gifts', 'megan munro'),
    ('promo gear', 'david hulett'),
}

FOLDER_COUNTRY_MAP = {
    '加拿大': '加拿大',
    '澳大利亚': '澳大利亚',
    '英国': '英国',
    '美国': '美国',
    'UAE': 'UAE',
    '其他': '其他',
    '新西兰': '新西兰',
    '潜在': None,  # check 位置
}


def get_country_from_path(filepath):
    rel = filepath.replace(BASE_DIR, '')
    parts = [p for p in rel.split(os.sep) if p]
    for part in parts:
        if part in FOLDER_COUNTRY_MAP:
            return FOLDER_COUNTRY_MAP[part]
    return None


def get_all_md_files():
    all_files = []
    for root, dirs, files in os.walk(BASE_DIR):
        dirs[:] = [d for d in dirs if d not in SKIP_FOLDERS]
        for f in files:
            if f.endswith('.md') and f not in SKIP_FILES:
                all_files.append(os.path.join(root, f))
    return sorted(all_files)


def read_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as fh:
            return fh.read()
    except Exception as e:
        print(f"  ERROR reading {filepath}: {e}")
        return ''


def is_skip_file(filepath):
    """Skip duplicate/outreach/tracker files."""
    fname = os.path.basename(filepath)
    skip_patterns = ['原始潜在档案', 'follow-up-tracker', '-Outreach']
    return any(p in fname for p in skip_patterns)


def extract_bold_field(content, field):
    """Extract **Field**: value."""
    pattern = rf'\*\*{re.escape(field)}\*\*[：:]\s*([^\n]+)'
    m = re.search(pattern, content)
    return m.group(1).strip() if m else ''


def extract_table_field(content, field):
    """Extract from markdown table | field | value |."""
    pattern = rf'\|\s*{re.escape(field)}\s*\|\s*([^|]+)\|'
    m = re.search(pattern, content)
    return m.group(1).strip() if m else ''


def extract_any_field(content, field):
    """Try bold field then table field."""
    v = extract_bold_field(content, field)
    if not v:
        v = extract_table_field(content, field)
    return v


def parse_title(content):
    """Get company and contact from first # heading."""
    m = re.match(r'^#\s+(.+)', content, re.MULTILINE)
    if not m:
        return '', ''
    title = m.group(1).strip()
    # Remove trailing notes
    title = re.sub(r'\s+客户档案.*$', '', title)
    title = re.sub(r'\s+[（(]独立调查.*$', '', title)
    title = re.sub(r'\s*\(PE\d+\)', '', title)  # like (PE98)
    title = title.strip()

    for sep in [' – ', ' — ', ' - ']:
        if sep in title:
            parts = title.split(sep, 1)
            return parts[0].strip(), parts[1].strip()
    return title.strip(), ''


def strip_markdown_link(text):
    """Convert [Name](URL) to just Name."""
    return re.sub(r'\[([^\]]+)\]\([^)]+\)', r'\1', text).strip()


def get_contact_from_bold(content):
    """Extract 联系人 from **联系人**: field."""
    v = extract_bold_field(content, '联系人')
    if v:
        v = strip_markdown_link(v)
        for sep in ['，', ',']:
            if sep in v:
                parts = v.split(sep, 1)
                return parts[0].strip(), parts[1].strip()
        return v.strip(), ''
    return '', ''


def get_contact_from_table(content):
    """Extract 联系人 from table | 联系人 | value |.
    Skips rows where the value looks like a column header (职位, 角色, etc.)."""
    # Find ALL matches, not just first
    pattern = r'\|\s*联系人\s*\|\s*([^|]+)\|'
    for m in re.finditer(pattern, content):
        v = m.group(1).strip()
        # Skip if it looks like a table header value
        header_words = {'职位', '角色', '备注', '线索', '切入角度', '决策力', 'role', 'title', 'notes'}
        if v.lower() in header_words or any(v == w for w in header_words):
            continue
        # Skip if it's just markdown formatting
        if v.startswith('---') or v.startswith(':--'):
            continue
        v = strip_markdown_link(v)
        for sep in ['，', ',']:
            if sep in v:
                parts = v.split(sep, 1)
                return parts[0].strip(), parts[1].strip()
        return v.strip(), ''
    return '', ''


def get_role_from_table(content):
    """Extract role from table | 职位 | value |."""
    v = extract_table_field(content, '职位')
    if not v:
        v = extract_table_field(content, '头衔')
    return v


def parse_priority(content):
    """Map priority to label."""
    # Exact 5 stars or A类 (not A-)
    if '⭐⭐⭐⭐⭐' in content:
        return '高'
    if re.search(r'A类(?!\s*[-—])', content):
        return '高'
    if re.search(r'A\+', content):
        return '高'
    if '⭐⭐⭐⭐' in content and '⭐⭐⭐⭐⭐' not in content:
        return '中高'
    if re.search(r'A-类|B\+类|A-\s*/\s*B\+', content):
        return '中高'
    if '⭐⭐⭐' in content and '⭐⭐⭐⭐' not in content:
        return '中'
    if re.search(r'\bB类\b|B-类|B\s*/', content):
        return '中'
    if '⭐⭐' in content and '⭐⭐⭐' not in content:
        return '低'
    if re.search(r'\bC类\b|C\+', content):
        return '低'
    if '⭐' in content and '⭐⭐' not in content:
        return '极低'
    if re.search(r'\bD类\b', content):
        return '极低'
    # Text-based fallback
    m = re.search(r'综合优先级[：:]\s*([^\n\|]{1,30})', content)
    if m:
        val = m.group(1)
        if '高' in val and 'A' not in val:
            return '高'
        if 'A+' in val:
            return '高'
        if 'A类' in val:
            return '高'
        if 'B' in val:
            return '中'
        if '低' in val:
            return '低'
    # Check star rating in table
    m = re.search(r'Star Rating.*?⭐+', content)
    if m:
        stars = m.group(0).count('⭐')
        if stars >= 5: return '高'
        if stars == 4: return '中高'
        if stars == 3: return '中'
        if stars == 2: return '低'
    return '中'


def parse_buyer_type(content, company=''):
    """分销商 vs 企业终端."""
    comp_lower = company.lower()
    if any(w in comp_lower for w in ['hamper', 'thankly', 'giftroo', 'giftagram', 'parcelle']):
        return '企业终端'
    if re.search(r'gifting platform|hampers?(?!\s+and)|B2C|零售|retail\s+gift', content, re.IGNORECASE):
        return '企业终端'
    # Most are distributors
    return '分销商'


def parse_date(content):
    m = re.search(r'独立可行性分析[（(](\d{4}-\d{2}-\d{2})[）)]', content)
    if m:
        try:
            return datetime.strptime(m.group(1), '%Y-%m-%d').date()
        except:
            pass
    m = re.search(r'调查日期[：:]\s*(\d{4}-\d{2}-\d{2})', content)
    if m:
        try:
            return datetime.strptime(m.group(1), '%Y-%m-%d').date()
        except:
            pass
    return None


def derive_country(content):
    """Derive country from content."""
    loc_patterns = [
        (r'Australia|澳大利亚|NSW|VIC|QLD|WA|SA|ACT', '澳大利亚'),
        (r'Canada|加拿大|Ontario|BC|Alberta|Quebec|Manitoba|Saskatchewan', '加拿大'),
        (r'New Zealand|新西兰|Auckland|Wellington|Christchurch', '新西兰'),
        (r'United Kingdom|UK|England|Britain|英国', '英国'),
        (r'UAE|Dubai|Abu Dhabi|Sharjah|United Arab Emirates', 'UAE'),
        (r'United States|USA|US\b', '美国'),
    ]
    for pattern, country in loc_patterns:
        if re.search(pattern, content, re.IGNORECASE):
            return country
    return '其他'


def parse_email(content):
    v = extract_any_field(content, '邮箱')
    if not v:
        # Try 联系方式 table
        m = re.search(r'\*\*Email\*\*[：:]\s*([^\n]+)', content)
        if m:
            v = m.group(1).strip()
        else:
            m = re.search(r'\|\s*(?:Email|邮箱)\s*\|\s*([^|]+)\|', content)
            if m:
                v = m.group(1).strip()
    if v:
        v = re.sub(r'\s*[（(].*$', '', v)
        v = v.split('；')[0].split(';')[0].split('（')[0].strip()
        if any(w in v for w in ['待确认', '待核实', '未找到', '未公开']):
            return ''
        # Filter out non-email text
        if '@' in v and '.' in v:
            # Extract just the email
            m = re.search(r'[\w.+-]+@[\w.-]+\.\w+', v)
            return m.group(0) if m else v[:100]
    return ''


def parse_phone(content):
    v = extract_any_field(content, '电话')
    if not v:
        m = re.search(r'\*\*Phone\*\*[：:]\s*([^\n]+)', content)
        if m:
            v = m.group(1).strip()
        else:
            m = re.search(r'\|\s*(?:Phone|电话)\s*\|\s*([^|]+)\|', content)
            if m:
                v = m.group(1).strip()
    if v and '待确认' not in v:
        return v.split('；')[0].split(';')[0].strip()[:50]
    return ''


def parse_linkedin(content):
    m = re.search(r'(https?://[a-z]{0,3}\.?linkedin\.com/in/[^\s\)\]"\'#\|]+)', content, re.IGNORECASE)
    if m:
        return m.group(1).rstrip('.,;)')
    # Also try LinkedIn: URL pattern
    m = re.search(r'\*\*LinkedIn\*\*[^：:\n]*[：:]\s*(https?://[^\s\)\]"\'#\|]+)', content)
    if m:
        return m.group(1).rstrip('.,;)')
    return ''


def parse_location(content, country):
    """Get city/location."""
    v = extract_any_field(content, '位置')
    if not v:
        v = extract_any_field(content, '总部')
        if not v:
            v = extract_any_field(content, '地区')
    if v:
        return v
    # Try to find city from content
    return country or ''


def parse_size(content):
    patterns = [
        r'(\d+[-–]\d+\s*(?:名?员工|人|employees?|staff))',
        r'(约\s*\d+\s*(?:名?员工|人))',
        r'(~\s*\d+\s*(?:名?员工|人))',
        r'(\d+\s*(?:名?员工|人)(?:，|\s|$))',
        r'(\d+[-–]\d+\s*employees)',
        r'(公司规模.*?[:：]\s*[^\n\|]{3,40})',
        r'(\b(?:小型|中型|大型|微型|solo|1人)\b)',
    ]
    for p in patterns:
        m = re.search(p, content, re.IGNORECASE)
        if m:
            v = m.group(1).strip()
            if len(v) < 60:
                return v
    # Table lookup
    v = extract_table_field(content, '规模')
    if v and len(v) < 60:
        return v
    return ''


def parse_main_biz(content, company=''):
    """Main business, max 80 chars."""
    # From table
    v = extract_table_field(content, '主营业务')
    if v and len(v) > 5:
        return v[:80]
    v = extract_table_field(content, '核心人物')
    # From 产品与服务能力
    m = re.search(r'产品与服务能力[：:]\s*([^\n]+)', content)
    if m:
        return m.group(1).strip()[:80]
    # From specialties section
    m = re.search(r'Specialties[：:]\s*([^\n]+)', content, re.IGNORECASE)
    if m:
        return m.group(1).strip()[:80]
    # First paragraph description
    lines = content.split('\n')
    for i, line in enumerate(lines):
        line = line.strip()
        if len(line) > 40 and not line.startswith('#') and not line.startswith('|') and not line.startswith('*') and '[' not in line[:5]:
            cleaned = re.sub(r'\[web:\d+\]', '', line)
            cleaned = re.sub(r'\*+', '', cleaned).strip()
            if len(cleaned) > 20:
                return cleaned[:80]
    return ''


def parse_founded(content):
    patterns = [
        r'\|\s*成立(?:时间|年份)?\s*\|\s*(\d{4})',
        r'成立(?:时间|年份)?[：:\s]+(\d{4})',
        r'Founded[：:\s]+(\d{4})',
        r'(\d{4})年(?:成立|创立|注册|建立)',
        r'since\s+(\d{4})',
        r'\bestablished\s+(?:in\s+)?(\d{4})',
    ]
    for p in patterns:
        m = re.search(p, content, re.IGNORECASE)
        if m:
            year = m.group(1)
            if 1900 <= int(year) <= 2026:
                return year
    return ''


def parse_associations(content):
    assocs = []
    for a in ['APPA', 'ASI', 'PPPC', 'PPAI', 'SAGE', 'BPMA', 'SEDEX', 'EcoVadis', 'IGC']:
        if re.search(r'\b' + a + r'\b', content):
            assocs.append(a)
    return ', '.join(assocs[:4]) if assocs else ''


def parse_approach(content):
    """切入角度 from first 接触钩子 bullet, max 100 chars."""
    m = re.search(r'接触钩子[^\n]*\n+(?:\d\.\s*)?\*?\*?([^\n*]{10,})', content)
    if m:
        val = re.sub(r'\*+', '', m.group(1)).strip()
        # Remove leading bold markers or numbers
        val = re.sub(r'^[\d\.\s]+', '', val)
        return val[:100]
    # Look for 切入角度 in table
    v = extract_table_field(content, '切入角度')
    if v:
        return v[:100]
    # Look for approach line
    m = re.search(r'切入角度[：:]\s*(.{10,})', content)
    if m:
        return re.sub(r'\*+', '', m.group(1)).strip()[:100]
    return ''


def parse_risk(content):
    """First structural risk, max 100 chars."""
    # Table row after 结构性风险
    m = re.search(r'结构性风险[^\n]*\n[|\-\s*]+\n\|\s*\*?\*?([^|*\n]{5,})\*?\*?\s*\|', content)
    if m:
        return re.sub(r'\*+', '', m.group(1)).strip()[:100]
    # Simple mention
    m = re.search(r'(?:最大障碍|核心障碍|风险|注意)[^：:\n]*[：:]\s*([^\n]{10,})', content)
    if m:
        return re.sub(r'\*+', '', m.group(1)).strip()[:100]
    # Table 风险 column
    v = extract_table_field(content, '风险')
    if v:
        return v[:100]
    return ''


def parse_value_prop(content):
    """核心价值主张."""
    v = extract_table_field(content, '核心价值主张')
    if v:
        return v[:100]
    m = re.search(r'核心价值主张[：:]\s*(.{10,})', content)
    if m:
        return re.sub(r'\*+', '', m.group(1)).strip()[:100]
    # Proxy: WGS references
    m = re.search(r'(WGS-\d+[/,\s\w]*?)(?:\n|\|)', content)
    if m:
        return m.group(1).strip()[:100]
    return ''


def parse_decision(content):
    """Decision characteristics."""
    m = re.search(r'决策(?:特征|力|风格)[：:]\s*([^\n\|]{5,80})', content)
    if m:
        return re.sub(r'\*+', '', m.group(1)).strip()[:100]
    return ''


def extract_embedded_markdown(content):
    """Extract content from Perplexity-style files that wrap MD in code blocks."""
    # Pattern: file starts with <img> or conversation text, then ```markdown ... ```
    m = re.search(r'```markdown\s*\n(.*?)```', content, re.DOTALL)
    if m:
        return m.group(1)
    return content


def build_record(company, contact, role, country, content, filepath):
    """Build a full record dict."""
    loc = parse_location(content, country)
    return {
        'company': company,
        'contact': contact,
        'role': role,
        'buyer_type': parse_buyer_type(content, company),
        'location': loc,
        'country': country,
        'phase': '待接触',
        'priority': parse_priority(content),
        'linkedin': parse_linkedin(content),
        'email': parse_email(content),
        'phone': parse_phone(content),
        'whatsapp': '',
        'size': parse_size(content),
        'main_biz': parse_main_biz(content, company),
        'founded': parse_founded(content),
        'associations': parse_associations(content),
        'approach': parse_approach(content),
        'value_prop': parse_value_prop(content),
        'decision': parse_decision(content),
        'risk': parse_risk(content),
        'source': 'LinkedIn + 官网',
        'built_date': parse_date(content),
        'filepath': filepath,
    }


def extract_contact_from_bold_heading(content):
    """Extract contact from ## 联系人 section with **Name** sub-heading."""
    # Pattern: ## 联系人\n\n**Name**\n- **头衔**: Role
    m = re.search(r'##\s*联系人[^\n]*\n+\*\*([A-Za-z\s\u4e00-\u9fff]+)\*\*\s*\n', content)
    if m:
        name = m.group(1).strip()
        # Get role from - **头衔**: or - **职位**: line after
        role_m = re.search(r'\*\*(?:头衔|职位)[：:]\*\*[^*\n]*?：?\s*([^-\n*]{5,80})', content)
        role = role_m.group(1).strip() if role_m else ''
        return name, role
    return '', ''


def extract_contact_from_name_heading(content):
    """Extract contact from **姓名：** Name pattern."""
    m = re.search(r'\*\*姓名[：:]\*\*\s*([A-Za-z\s\u4e00-\u9fff]+)', content)
    if m:
        name = m.group(1).strip()
        # Get role from **职位：** pattern
        role_m = re.search(r'\*\*职位[：:]\*\*\s*([^\n]+)', content)
        role = role_m.group(1).strip() if role_m else ''
        return name, role
    return '', ''


def extract_contact_from_core_person(content):
    """Extract from 核心人物: Name (Role) table pattern."""
    v = extract_table_field(content, '核心人物')
    if v:
        # v might be "Shanda Butler (Director of Operations & Marketing)"
        m = re.match(r'([A-Za-z\s\u4e00-\u9fff]+)\s*[\(（]([^\)）]+)[\)）]', v)
        if m:
            return m.group(1).strip(), m.group(2).strip()
        # Or just name
        return v.split('(')[0].strip(), ''
    return '', ''


def parse_file(filepath):
    """Parse MD file, return list of records."""
    raw = read_file(filepath)
    if not raw:
        return []

    filename = os.path.basename(filepath)
    country = get_country_from_path(filepath)

    # Extract embedded markdown if Perplexity export
    content = extract_embedded_markdown(raw)

    # Derive country from content if not from path
    if not country:
        country = derive_country(content)

    # ===== Special multi-contact files =====

    # J&F Gift Inc - two owners
    if 'J&F Gift' in content or ('Jiehan' in content and 'Felina' in content):
        company = 'J&F Gift Inc.'
        r1 = build_record(company, 'Jiehan Lim', 'Owner', country, content, filepath)
        r2 = build_record(company, 'Felina Tan', 'Co-founder, Owner', country, content, filepath)
        return [r1, r2]

    # Alpha Promotions Ltd 综合报告
    if 'Alpha Promotions' in content and ('Scott Lee' in content or 'Belinda Bryant' in content):
        company = 'Alpha Promotions Ltd'
        records = []
        if 'Scott Lee' in content:
            records.append(build_record(company, 'Scott Lee', 'Sales Manager', country, content, filepath))
        if 'Belinda Bryant' in content:
            records.append(build_record(company, 'Belinda Bryant', 'Director', country, content, filepath))
        if records:
            return records

    # Promotional Source - multi-contact
    if 'Promotional Source' in content and 'Chris Roth' in content:
        company = 'Promotional Source'
        records = []
        contacts_roles = [
            ('Chris Roth', 'Product Sourcing Specialist'),
            ('Rebecca Korhonen', 'VP of Process Excellence'),
            ('Cindy Diamond', 'Brand Intuitive'),
            ('Cindy Chapman', 'Senior Brand Specialist'),
        ]
        for cname, crole in contacts_roles:
            if cname in content:
                r = build_record(company, cname, crole, country, content, filepath)
                # Set specific LinkedIn from contact matrix table
                m = re.search(rf'\|\s*{re.escape(cname)}\s*\|[^\|]+\|\s*(https?://[^\s\|]+)', content)
                if m:
                    r['linkedin'] = m.group(1).strip().rstrip('.,;)')
                # Set email from content
                em = re.search(rf'{re.escape(cname.split()[0].lower())}@[^\s\|]+', content, re.IGNORECASE)
                if not em:
                    # Try from table: | Name | role | linkedin | email |
                    em2 = re.search(rf'\|\s*{re.escape(cname)}\s*\|[^\|]+\|[^\|]+\|\s*([\w.+-]+@[^\s\|]+)', content)
                    if em2:
                        r['email'] = em2.group(1).strip().rstrip('.,;)')
                records.append(r)
        if records:
            return records

    # TPS Promotions - Jeffrey Ho is primary contact
    if 'TPS Promotions' in content and 'Jeffrey Ho' in content:
        company = 'TPS Promotions & Incentives'
        r = build_record(company, 'Jeffrey Ho', 'Import / Compliance / Supply Chain', country, content, filepath)
        r['linkedin'] = 'https://ca.linkedin.com/in/jeffrey-ho-36906351'
        r['location'] = 'Markham, Ontario, Canada'
        return [r]

    # ===== Special file: Betta Promotional Products (table-only, no standard headers) =====
    if 'Betta Promotional Products' in content and 'Ross Freeman' in content:
        r = build_record('Betta Promotional Products', 'Ross Freeman', 'Principal / Promotions Officer', country, content, filepath)
        r['email'] = 'freemanross@hotmail.com'
        r['phone'] = '0412 239 118'
        r['location'] = 'Padstow / Revesby, NSW, Australia'
        return [r]

    # ===== Special file: Chilli-Eileen-Du (contact in data table, not header) =====
    if 'Chilli Promotions' in content and 'Eileen Du' in content:
        r = build_record('Chilli Promotions', 'Eileen Du', 'Offshore Production Manager', country, content, filepath)
        r['email'] = 'info@chillipromotions.com.au'
        r['phone'] = '1300 913 288'
        r['location'] = 'Port Melbourne VIC, Australia'
        return [r]

    # ===== Special file: Design Marketing (table-only, Customer Intelligence Dossier format) =====
    if 'Design Marketing' in content and 'Shanda Butler' in content:
        r = build_record('Design Marketing', 'Shanda Butler', 'Director of Operations & Marketing', country, content, filepath)
        return [r]

    # ===== Special file: Giftagram (embedded Perplexity with ## 联系人岗位 section) =====
    if 'Giftagram' in content and 'Jason Reid' in content:
        r = build_record('Giftagram', 'Jason Reid', 'CEO & Co-Founder', country, content, filepath)
        return [r]

    # ===== PromoSpark root file (analysis brief, no standard headers) =====
    if 'PromoSpark' in content and 'Mike Griffiths' in content and 'Premedia' in content:
        r = build_record('PromoSpark', 'Mike Griffiths', 'Founder & Director', country, content, filepath)
        r['location'] = 'Hornsby (Sydney), NSW, Australia'
        return [r]

    # ===== Standard parsing =====
    title_company, title_contact = parse_title(content)

    # Fix company name that starts with ❌ marker
    # parse_title splits on first — giving company='❌ 不适合', contact='RealCompany — Contact'
    if title_company.startswith('❌') and title_contact:
        # title_contact now holds 'RealCompany — Contact Name'
        for sep in [' – ', ' — ', ' - ']:
            if sep in title_contact:
                parts = title_contact.split(sep, 1)
                title_company = parts[0].strip()
                title_contact = parts[1].strip()
                break
        else:
            title_company = title_contact
            title_contact = ''

    # Fix trailing separator in company name (e.g. "Promotional Elements Inc. —")
    title_company = re.sub(r'\s*[—–-]+\s*$', '', title_company).strip()
    title_contact = re.sub(r'\s*[—–-]+\s*$', '', title_contact).strip()

    # Get contact from various field patterns
    contact_name, contact_role = get_contact_from_bold(content)
    if not contact_name:
        contact_name, contact_role = get_contact_from_table(content)
    if not contact_name:
        contact_name, contact_role = extract_contact_from_bold_heading(content)
    if not contact_name:
        contact_name, contact_role = extract_contact_from_name_heading(content)
    if not contact_name:
        contact_name, contact_role = extract_contact_from_core_person(content)
    if not contact_role:
        contact_role = get_role_from_table(content)

    # Use title contact if no field found
    if not contact_name and title_contact:
        contact_name = title_contact
        if not contact_role:
            # Try to get role from content near the name
            m = re.search(rf'{re.escape(title_contact)}\s*[,，–—]\s*([^\n\|]{5,80})', content)
            if m:
                contact_role = m.group(1).strip()

    if not title_company or not contact_name:
        return []

    rec = build_record(title_company, contact_name, contact_role, country, content, filepath)
    return [rec]


def deduplicate(records):
    """Deduplicate: same company+contact -> keep more complete."""
    seen = {}
    order = []
    for rec in records:
        key = (rec['company'].lower().strip(), rec['contact'].lower().strip())
        if key not in seen:
            seen[key] = rec
            order.append(key)
        else:
            # Keep more complete
            old = seen[key]
            old_filled = sum(1 for v in old.values() if v)
            new_filled = sum(1 for v in rec.values() if v)
            if new_filled > old_filled:
                seen[key] = rec
    return [seen[k] for k in order if seen[k]]


def is_existing(rec):
    key = (rec['company'].lower().strip(), rec['contact'].lower().strip())
    return key in EXISTING_PAIRS


def write_to_excel(records):
    wb = openpyxl.load_workbook(EXCEL_PATH)
    ws_main = wb['主板']
    ws_detail = wb['客户库']

    main_start = 12
    detail_start = 9
    start_id = 6

    for i, rec in enumerate(records):
        cid = f'C{start_id + i:03d}'
        rm = main_start + i
        rd = detail_start + i

        # Build concise country/city string for 主板 (e.g. "澳大利亚 Sydney NSW")
        country = rec['country'] or ''
        loc_full = rec['location'] or ''
        # If location is just the country name or empty, use country
        if not loc_full or loc_full == country:
            main_loc = country
        else:
            # Strip street addresses (lines starting with digits or containing long comma chains)
            # Keep only the city/state part
            loc_clean = loc_full.split('\n')[0].strip()  # first line only
            # Remove street number patterns at start
            loc_clean = re.sub(r'^\d+\S*\s+', '', loc_clean)
            # If it's very long (>40 chars), truncate to country + first city token
            if len(loc_clean) > 50:
                tokens = re.split(r'[,，;；]', loc_clean)
                city_part = tokens[0].strip() if tokens else ''
                main_loc = f'{country} {city_part}'.strip() if city_part and city_part != country else country
            else:
                main_loc = loc_clean if country in loc_clean else f'{country} {loc_clean}'.strip()

        # 主板
        ws_main.cell(row=rm, column=1, value=cid)
        ws_main.cell(row=rm, column=2, value=rec['company'])
        ws_main.cell(row=rm, column=3, value=rec['contact'])
        ws_main.cell(row=rm, column=4, value=rec['buyer_type'])
        ws_main.cell(row=rm, column=5, value=main_loc)
        ws_main.cell(row=rm, column=6, value=rec['phase'])
        ws_main.cell(row=rm, column=7, value=rec['priority'])
        ws_main.cell(row=rm, column=8, value=None)
        ws_main.cell(row=rm, column=9, value=None)
        ws_main.cell(row=rm, column=10, value=0)
        ws_main.cell(row=rm, column=11, value='')

        # 客户库
        ws_detail.cell(row=rd, column=1, value=cid)
        ws_detail.cell(row=rd, column=2, value=rec['company'])
        ws_detail.cell(row=rd, column=3, value=rec['contact'])
        ws_detail.cell(row=rd, column=4, value=rec['role'])
        ws_detail.cell(row=rd, column=5, value=rec['buyer_type'])
        ws_detail.cell(row=rd, column=6, value=rec['linkedin'])
        ws_detail.cell(row=rd, column=7, value=rec['email'])
        ws_detail.cell(row=rd, column=8, value=rec['phone'])
        ws_detail.cell(row=rd, column=9, value=rec['whatsapp'])
        ws_detail.cell(row=rd, column=10, value=rec['location'])
        ws_detail.cell(row=rd, column=11, value=rec['size'])
        ws_detail.cell(row=rd, column=12, value=rec['main_biz'])
        ws_detail.cell(row=rd, column=13, value=rec['founded'])
        ws_detail.cell(row=rd, column=14, value=rec['associations'])
        ws_detail.cell(row=rd, column=15, value=rec['approach'])
        ws_detail.cell(row=rd, column=16, value=rec['value_prop'])
        ws_detail.cell(row=rd, column=17, value=rec['decision'])
        ws_detail.cell(row=rd, column=18, value=rec['risk'])
        ws_detail.cell(row=rd, column=19, value=rec['source'])
        if rec['built_date']:
            ws_detail.cell(row=rd, column=20, value=rec['built_date'])

    wb.save(EXCEL_PATH)
    return len(records)


def main():
    print("=== Wischos Client Profile Parser v2 ===")
    all_files = get_all_md_files()
    print(f"Found {len(all_files)} MD files")

    all_records = []
    skipped = []
    errors = []
    dup_files = []

    for fp in all_files:
        if is_skip_file(fp):
            dup_files.append(fp)
            continue
        try:
            recs = parse_file(fp)
            if recs:
                all_records.extend(recs)
            else:
                skipped.append(fp)
        except Exception as e:
            print(f"  ERROR {os.path.basename(fp)}: {e}")
            errors.append(fp)

    print(f"Raw records: {len(all_records)}")
    print(f"Duplicate/outreach files: {len(dup_files)}")
    print(f"Files with no records: {len(skipped)}")

    unique = deduplicate(all_records)
    print(f"After dedup: {len(unique)}")

    new = [r for r in unique if not is_existing(r)]
    print(f"After removing C001-C005: {len(new)}")

    print(f"\nWriting {len(new)} records to Excel...")
    added = write_to_excel(new)

    print(f"\n=== SUMMARY ===")
    print(f"Records added: {added}")
    print(f"IDs: C006 – C{5 + added:03d}")

    print(f"\nDuplicate files skipped ({len(dup_files)}):")
    for f in dup_files:
        print(f"  {os.path.relpath(f, BASE_DIR)}")

    print(f"\nFiles with no parseable record ({len(skipped)}):")
    for f in skipped:
        print(f"  {os.path.relpath(f, BASE_DIR)}")

    if errors:
        print(f"\nErrors ({len(errors)}):")
        for f in errors:
            print(f"  {f}")

    # Sample output
    print(f"\nSample records:")
    for r in new[:5]:
        print(f"  {r['company']} | {r['contact']} | {r['country']} | {r['priority']} | {r['email'][:30] if r['email'] else '-'}")


if __name__ == '__main__':
    main()
