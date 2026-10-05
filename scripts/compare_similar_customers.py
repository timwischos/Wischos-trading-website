#!/usr/bin/env python3
"""Cross-check a LinkedIn-style company list against local customer records."""
from __future__ import annotations

import csv
import re
from collections import defaultdict
from difflib import SequenceMatcher
from pathlib import Path

from openpyxl import Workbook, load_workbook
from openpyxl.styles import Alignment, Font, PatternFill
from openpyxl.utils import get_column_letter

ROOT = Path(__file__).resolve().parents[1]
INPUT = Path('/mnt/c/Users/whenigone/Desktop/similar客户待查.txt')
OUTPUT = ROOT / '调整' / 'similar客户待查_客户交叉比对_2026-09-09.xlsx'
VAULT = Path('/mnt/d/Wischos Vault/Wischos gifts/市场端调查')
VAULT_GIFTS = VAULT.parent
EXTRA_STRUCTURED = [
    ROOT / 'premium corporate gifts  AU.xlsx', ROOT / 'premium corporate gifts  US.xlsx',
    ROOT / 'PSI_Belgium_展商客户信息_第1-5页.xlsx',
    VAULT_GIFTS / '销售工具' / 'Australia_Corporate_Gifts_Targeting.xlsx',
]
CUSTOMER_DATA_DIRS = [
    ROOT / '临时' / x for x in ('association_directories', '加拿大', '加英', '澳大利亚', '欧洲', '英国', '美国', '客户开发进度', '整理文件', '通用资料')
] + [ROOT / '临时' / 'mail_automation' / 'data'] + [ROOT / '二次工作文件' / x for x in ('co-work', '开发客户')] + [ROOT / 'outputs' / 'au_nz_220_248_review']
SKIP_PARTS = {'.git', 'node_modules', '.venv', 'venv', '__pycache__', '.firecrawl', '.output', '.tmp'}
TEXT_SUFFIXES = {'.md', '.txt', '.csv'}
LEGAL = r'\b(ltd|limited|llc|inc|incorporated|gmbh|e\.k\.?|pty|plc|l\.l\.c)\b'
GENERIC_NAMES = {'merchandise', 'promotions', 'promotion', 'marketing', 'branding', 'promo', 'gifts', 'gift'}


def norm(value: object) -> str:
    s = str(value or '').lower().replace('&', ' and ')
    s = re.sub(LEGAL, ' ', s, flags=re.I)
    s = re.sub(r'[^a-z0-9]+', ' ', s)
    return re.sub(r'\s+', ' ', s).strip()


def useful(name: str) -> bool:
    toks = norm(name).split()
    return (len(''.join(toks)) >= 6 and not (len(toks) == 1 and (len(toks[0]) <= 4 or toks[0] in GENERIC_NAMES)))


def parse_input():
    lines = [x.strip() for x in INPUT.read_text(encoding='utf-8-sig').splitlines()]
    result, seen = [], set()
    i = 0
    while i < len(lines):
        if lines[i] != 'Company logo':
            i += 1
            continue
        fields = [x for x in lines[i + 1:i + 9] if x]
        name = fields[0] if fields else ''
        location = fields[1] if len(fields) > 1 else ''
        employees = fields[2] if len(fields) > 2 and re.fullmatch(r'\d+', fields[2]) else ''
        if name and name not in seen and name not in {'Name', 'Location'}:
            seen.add(name)
            result.append({'name': name, 'location': location, 'employees': employees})
        i += 1
    return result


def relevant(path: Path) -> bool:
    if any(part in SKIP_PARTS for part in path.parts):
        return False
    # Files that contain company/client lists, profiles, trackers, or the named prospect datasets.
    p = str(path).lower()
    keywords = ('客户', 'client', 'customer', 'prospect', 'lead', 'outreach', 'distributor',
                'association_directories', 'potential', 'linkedin', '批量汇总', '开发进度',
                '加拿大促销品', 'au-nz-customer', 'premium corporate gifts')
    return any(k in p for k in keywords)


def designated_customer_data(path: Path) -> bool:
    return any(path.is_relative_to(folder) for folder in CUSTOMER_DATA_DIRS if folder.exists())


def iter_files(base: Path):
    """Walk only customer-data locations and prune heavyweight virtual/build folders."""
    import os
    if not base.exists():
        return
    for root, dirs, files in os.walk(base, onerror=lambda _e: None):
        dirs[:] = [d for d in dirs if d not in SKIP_PARTS]
        for file in files:
            yield Path(root) / file


def add(index, value, source):
    n = norm(value)
    if useful(n):
        index[n].add(source)


def display_path(path: Path) -> str:
    if path.is_relative_to(VAULT_GIFTS):
        return 'Vault/' + str(path.relative_to(VAULT_GIFTS))
    return str(path.relative_to(ROOT))


def scan_structured(index):
    bases = [ROOT / '临时', ROOT / '二次工作文件', ROOT / 'docs', ROOT / '调整', ROOT / 'outputs', VAULT_GIFTS]
    for base in bases:
      for path in iter_files(base):
        if not relevant(path) and not designated_customer_data(path) and path not in EXTRA_STRUCTURED:
            continue
        rel = display_path(path)
        try:
            if path.suffix.lower() == '.csv':
                with path.open('r', encoding='utf-8-sig', errors='ignore', newline='') as f:
                    rows = list(csv.reader(f))
                if not rows:
                    continue
                headers = [norm(h) for h in rows[0]]
                cols = [j for j,h in enumerate(headers) if any(k in h for k in ('company','公司','business','organization','supplier','account'))]
                for row in rows[1:]:
                    for j in cols:
                        if j < len(row): add(index, row[j], rel)
            elif path.suffix.lower() == '.xlsx':
                wb = load_workbook(path, read_only=True, data_only=True)
                for ws in wb.worksheets:
                    first = list(ws.iter_rows(min_row=1, max_row=min(6, ws.max_row), values_only=True))
                    header_row, cols = None, []
                    for ridx, row in enumerate(first, 1):
                        found = [j for j,v in enumerate(row) if any(k in norm(v) for k in ('company','公司名','客户名称','客户名','business','organization','supplier','account'))]
                        if found:
                            header_row, cols = ridx, found
                            break
                    if header_row:
                        for row in ws.iter_rows(min_row=header_row + 1, values_only=True):
                            for j in cols:
                                if j < len(row): add(index, row[j], f'{rel}｜{ws.title}')
            elif path.suffix.lower() == '.xls':
                import xlrd
                book = xlrd.open_workbook(str(path))
                for sheet in book.sheets():
                    headers = [norm(sheet.cell_value(0, j)) for j in range(sheet.ncols)]
                    cols = [j for j,h in enumerate(headers) if any(k in h for k in ('company','公司','客户','business','organization','supplier','account'))]
                    for i in range(1, sheet.nrows):
                        for j in cols:
                            add(index, sheet.cell_value(i, j), f'{rel}｜{sheet.name}')
        except Exception:
            continue


def scan_profiles(index):
    bases = [ROOT / '临时', ROOT / '二次工作文件', ROOT / 'docs', ROOT / '调整', ROOT / 'outputs', VAULT_GIFTS]
    for base in bases:
      for path in iter_files(base):
        if path.suffix.lower() != '.md' or not relevant(path):
            continue
        rel = display_path(path)
        # Folder/file names are reliable for individual customer profiles.
        stem = path.stem.replace('_', ' ').replace('-', ' ')
        add(index, stem, rel)
        try:
            text = path.read_text(encoding='utf-8', errors='ignore')
        except Exception:
            continue
        for h in re.findall(r'^#\s+(.+?)\s*$', text, flags=re.M):
            h = re.sub(r'(客户档案|独立调查|调查报告|状态记录).*$', '', h).strip(' -—–')
            add(index, h, rel)
        for m in re.findall(r'\*\*(?:公司|公司名称|客户|客户名称|Company)\*\*\s*[:：]\s*([^\n|]+)', text, flags=re.I):
            add(index, m, rel)


def scan_vault_folder_names(index):
    """Vault's country/company folder hierarchy is the authoritative 806-profile index."""
    if not VAULT.exists():
        return
    for country in VAULT.iterdir():
        if not country.is_dir() or country.name.startswith('.'):
            continue
        try:
            for company in country.iterdir():
                if company.is_dir():
                    add(index, company.name, 'Vault/' + country.name + '/' + company.name)
        except OSError:
            continue


def match(candidate, index):
    n = norm(candidate)
    exact = index.get(n, set())
    if exact:
        return '已存在（名称精确匹配）', sorted(exact), 100
    # Only accept clear aliases: an entire normalized company phrase must occur in the other name,
    # or names become identical after removing isolated initials (e.g. "A D AD").
    compact = ' '.join(t for t in n.split() if len(t) > 1)
    for existing in index:
        ex_compact = ' '.join(t for t in existing.split() if len(t) > 1)
        phrase_alias = (
            (len(existing.split()) >= 2 or len(existing) >= 10)
            and (existing.startswith(n + ' ') or n.startswith(existing + ' '))
        )
        if compact == ex_compact or phrase_alias:
            return f'已存在（别名/名称扩展：{existing}）', sorted(index[existing]), 94
    return '新增候选（本地记录未命中）', [], 0


def main():
    candidates = parse_input()
    index = defaultdict(set)
    scan_vault_folder_names(index)
    scan_structured(index)
    scan_profiles(index)
    rows = []
    for c in candidates:
        status, sources, score = match(c['name'], index)
        rows.append([c['name'], c['location'], c['employees'], status, score, '\n'.join(sources[:8]) if sources else '—'])

    wb = Workbook()
    ws = wb.active; ws.title = '对比结果'
    headers = ['待查客户', '地点', '员工数（原文件）', '交叉比对结果', '名称匹配度', '已存在记录来源']
    ws.append(headers)
    for row in rows: ws.append(row)
    summary = wb.create_sheet('汇总')
    summary.append(['项目', '结果'])
    summary.append(['待查客户总数', len(rows)])
    for label in ('已存在（名称精确匹配）', '已存在（别名/名称扩展', '新增候选'):
        summary.append([label, sum(label in r[3] for r in rows)])
    summary.append(['本次比对的本地客户索引条目数', len(index)])
    summary.append(['比对范围', '按《客户系统全盘点》纳入所有标为“客户数据/名单”“客户档案库(逐家)”或“CRM/跟进表”的实际记录：项目内临时/二次工作文件/docs/根目录/outputs，以及 D:\\Wischos Vault 的市场端调查和销售工具名单；空白模板与纯流程文档不计入。'])
    notes = wb.create_sheet('说明')
    notes.append(['说明'])
    notes.append(['“新增候选”表示未在本地可访问客户记录中以公司名命中，并非已完成工商主体或官网域名核验。'])
    notes.append(['“别名/名称扩展”仅在完整公司名被包含或去掉单字母缩写后相同的情况下标出；普通词（如 Merchandise、Promo）相似不会误判为重复。'])
    notes.append(['名称比较会忽略 Ltd/Inc/GmbH 等法律后缀；员工数及地点均保留自用户提供的原始名单。'])
    for sheet in wb.worksheets:
        sheet.freeze_panes = 'A2'
        sheet.auto_filter.ref = sheet.dimensions
        for cell in sheet[1]:
            cell.font = Font(bold=True, color='FFFFFF')
            cell.fill = PatternFill('solid', fgColor='1F4E78')
        for row in sheet.iter_rows():
            for cell in row:
                cell.alignment = Alignment(vertical='top', wrap_text=True)
        for col in range(1, sheet.max_column + 1):
            longest = max((len(str(sheet.cell(r, col).value or '')) for r in range(1, sheet.max_row + 1)), default=10)
            sheet.column_dimensions[get_column_letter(col)].width = min(max(longest + 2, 12), 55)
        for r in range(2, sheet.max_row + 1): sheet.row_dimensions[r].height = 32
    wb.save(OUTPUT)
    print(f'Candidates: {len(rows)}')
    for r in rows: print(' | '.join(map(str, r[:5])))
    print(f'Index entries: {len(index)}')
    print(OUTPUT)

if __name__ == '__main__': main()
