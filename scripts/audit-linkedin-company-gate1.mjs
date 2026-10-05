import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

/*
 * Offline identity audit for the LinkedIn company batch.
 *
 * This intentionally does not call Firecrawl. It re-ranks every already-saved
 * search result and separates an owned company site from directories, hosted
 * catalogues, client stores, and unrelated namesakes. The output is additive:
 * the original gate1-results.json is never overwritten.
 */

const root = process.cwd();
const batchDir = path.join(root, '.firecrawl/linkedin-company-batch-2026-08-13');
const inputPath = path.join(batchDir, 'gate1-results.json');
const mapDir = path.join(batchDir, 'maps');
const searchDirs = ['search', 'search-alt', 'search-v1']
  .map((name) => path.join(batchDir, name))
  .filter((directory) => existsSync(directory));

const directoryHosts = [
  'a-leads.co', 'aeroleads.com', 'agcc.co.uk', 'approvedbusiness.co.uk',
  'arbroath-sct.business-dir.co.uk', 'bizapedia.com', 'bnicanada.ca',
  'bpma.co.uk', 'bravenet.com', 'britishnewspaperarchive.co.uk',
  'business-dir.co.uk', 'businessgifts-info.co.uk', 'businessinsurrey.chambermaster.com',
  'businessmagnet.co.uk', 'bobconnections.co.uk',
  'can1business.com', 'canpages.ca', 'chambermaster.com', 'chamberofcommerce.com',
  'chronofhorse.com', 'clutch.co', 'companieshouse.gov.uk', 'companycheck.co.uk',
  'company-information.service.gov.uk', 'creditsafe.com', 'crunchbase.com', 'cylex-uk.co.uk', 'cybo.com',
  'datanyze.com', 'directory.hertfordshiremercury.co.uk', 'directory.theargus.co.uk',
  'dnb.com', 'endole.co.uk', 'ensun.io', 'eventbrite.com', 'facebook.com', 'feefo.com', 'glassdoor.com',
  'indeed.com', 'instagram.com', 'kompass.com', 'kentsmallbusiness.co.uk',
  'linkedin.com', 'mapquest.com', 'maptons.com', 'marketingagencyindex.com', 'marketingplusmore.co.uk',
  'members.achesonbusiness.com', 'merchbar.com', 'moovitapp.com', 'northdata.com',
  'neverbounce.com', 'opencorporates.com', 'printerslocations.co.uk', 'prospeo.io', 'provenexpert.com', 'pubrio.com',
  'quickorder.com', 'recommendedcompany.co.uk', 'reviews.co.uk', 'rocketreach.co',
  'reddit.com', 'shoporillia.com', 'signalhire.com', 'sourcingcitynews.co.uk', 'sourcetool.com', 'supportstaffordshire.org.uk',
  'tiktok.com', 'touchnewport.com', 'tracxn.com', 'trustpilot.com',
  'ukdiscountcodes.com', 'ukpropertyforums.com', 'uksmallbusinessdirectory.co.uk',
  'venuedirectory.com', 'wheree.com', 'wikipedia.org', 'x.com', 'yell.com', 'yelp.ca', 'yelp.com',
  'yellowpages.com', 'youtube.com', 'zoominfo.com', 'yudu.com', 'all.biz', 'behance.net', 'grubhub.com',
];

const hostedCatalogueHosts = [
  'clickpromo.com', 'espwebsite.com', 'fullcollection.com', 'promotrendz.com',
  'your-logo.ca',
];

const legalTokens = new Set([
  'a', 'an', 'and', 'the', 'of', 'co', 'company', 'corp', 'corporation', 'inc',
  'incorporated', 'limited', 'ltd', 'llc', 'llp', 'plc', 'pty', 'gmbh', 'bv',
]);

const industryTokens = new Set([
  ...legalTokens,
  'agency', 'brand', 'branded', 'branding', 'business', 'canada', 'concept',
  'concepts', 'creative', 'design', 'digital', 'gift', 'gifts', 'global', 'group',
  'international', 'marketing', 'merch', 'merchandise', 'product', 'products',
  'promo', 'promotional', 'promotion', 'promotions', 'services', 'solution',
  'solutions', 'studio', 'uk', 'worldwide',
]);

const promoRe = /\b(promotional|promo(?:tions?)?|merchandise|branded (?:product|merch|gift)|corporate gift|business gift|swag|giveaway|incentive|recognition|awards|award supplier|troph|logo(?:ed| branded)? apparel|company store|fulfilment|fulfillment)\b/i;
const apparelRe = /\b(apparel|clothing|uniform|workwear|embroidery|embroidered|screen print(?:ing)?|teamwear)\b/i;
const printRe = /\b(printing|print services?|signage|lithograph|graphic design)\b/i;
const foodRe = /\b(bakery|biscuits?|food hamper|gift basket|confectionery|chocolate|edible gifts?)\b/i;
const digitalRe = /\b(digital (?:strategy|marketing|agency)|web design|seo agency|social media agency|software|app development|photography|roofing|pottery|food packaging|fish (?:and|&) chip wraps?|interleaving sheets|fry cones)\b/i;
const localOnlyRe = /\b(handmade only|locally made only|canadian made only|artisan only)\b/i;
const metalRe = /\b(metal|stainless steel|aluminium|aluminum|awards|award supplier|troph|medal|badge|lapel pin|keyring|keychain|pen|drinkware|bottle|tumbler|desk accessor|executive gift|gift set)\b/i;

function norm(value = '') {
  return String(value)
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[®™©]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function tokens(value) {
  return norm(value).split(/\s+/).filter(Boolean);
}

function companyIdentity(company) {
  const all = tokens(company);
  const core = all.filter((token) => !legalTokens.has(token));
  const distinctive = core.filter((token) => token.length > 2 && !industryTokens.has(token));
  return {
    phrase: core.join(' '),
    compact: core.join(''),
    core,
    distinctive,
  };
}

function parseUrl(value) {
  try { return new URL(value); } catch { return null; }
}

function hostMatches(host, suffix) {
  return host === suffix || host.endsWith(`.${suffix}`);
}

function hostIn(host, list) {
  return list.some((suffix) => hostMatches(host, suffix));
}

function compactUrlIdentity(url) {
  const parsed = parseUrl(url);
  if (!parsed) return '';
  return norm(`${parsed.hostname.replace(/^www\./, '')} ${parsed.pathname}`).replaceAll(' ', '');
}

function coverage(needles, haystack) {
  if (!needles.length) return 0;
  const matched = needles.filter((token) => haystack.includes(token)).length;
  return matched / needles.length;
}

function pageType(url, title = '', description = '') {
  const parsed = parseUrl(url);
  const pathText = norm(parsed?.pathname || '');
  const text = norm(`${title} ${description}`);
  if (/\b(company store|employee store|partnership program|client store|portal login)\b/.test(text)
      || /\b(company store|employee store|partnership program|client store)\b/.test(pathText)) return 'customer-store';
  if (/\b(students? union|university store|school store|fan shop|supporters? shop)\b/.test(text)) return 'customer-store';
  if (/\b(privacy|terms|cookie|refund|returns|policies|policy)\b/.test(pathText)
      || /\b(privacy policy|terms and conditions|cookie policy)\b/.test(text)) return 'policy';
  if (/\.(pdf|xlsx?|docx?)$/i.test(parsed?.pathname || '')) return 'document';
  if (/\b(blog|news|article|tag|forum)\b/.test(pathText)) return 'article';
  if (/\b(product|products|category|collections|shop)\b/.test(pathText)) return 'product';
  if (/\b(contact|get in touch|about|our story)\b/.test(pathText)) return 'company-page';
  return 'home-or-landing';
}

function evaluateCandidate(company, candidate) {
  const parsed = parseUrl(candidate?.url);
  if (!parsed) return { ...candidate, identity_score: -100, candidate_type: 'invalid-url', identity_reasons: ['URL 无效'] };
  const host = parsed.hostname.toLowerCase().replace(/^www\./, '');
  const title = norm(candidate.title);
  const description = norm((candidate.description || '').slice(0, 2400));
  const text = `${title} ${description}`;
  const identity = companyIdentity(company.company);
  const urlIdentity = compactUrlIdentity(candidate.url);
  const hostIdentity = norm(host).replaceAll(' ', '');
  const titleDistinctiveCoverage = coverage(identity.distinctive, title);
  const textDistinctiveCoverage = coverage(identity.distinctive, text);
  const titleCoreCoverage = coverage(identity.core, title);
  const urlDistinctiveCoverage = coverage(identity.distinctive, urlIdentity);
  const hostDistinctiveCoverage = coverage(identity.distinctive, hostIdentity);
  const nonGenericCore = identity.core.filter((token) => !industryTokens.has(token));
  const hostCoreCoverage = coverage(nonGenericCore, hostIdentity);
  const exactTitle = identity.phrase.length >= 3 && title.includes(identity.phrase);
  const exactDescription = identity.phrase.length >= 5 && description.includes(identity.phrase);
  const compactHostMatch = identity.compact.length >= 4 && hostIdentity.includes(identity.compact);
  const domainAffinity = compactHostMatch
    || hostDistinctiveCoverage >= (identity.distinctive.length > 1 ? 0.5 : 1)
    || (identity.distinctive.length === 0 && hostCoreCoverage >= 0.5);
  const isDirectory = hostIn(host, directoryHosts)
    || /(^|\.)(directory|listings?|reviews?|members?)\./.test(host)
    || /\b(company profile|member directory|reviews? experiences|location on the map)\b/.test(text);
  const isHostedCatalogue = hostIn(host, hostedCatalogueHosts);
  const type = isDirectory ? 'third-party' : isHostedCatalogue ? 'hosted-catalogue' : 'owned-domain';
  const pType = pageType(candidate.url, candidate.title, candidate.description);
  const isNonProductionHost = /(^|[.-])(dev|staging|stage|test|preview|demo)([.-])/.test(parsed.hostname.toLowerCase());
  const reasons = [];
  let score = 0;

  if (isDirectory) {
    reasons.push('第三方目录/媒体/评价页，不是独立官网');
    score = -100;
  } else {
    if (exactTitle) { score += 38; reasons.push('标题含完整公司名'); }
    if (exactDescription) { score += 14; reasons.push('摘要含完整公司名'); }
    score += titleDistinctiveCoverage * 28;
    score += textDistinctiveCoverage * 12;
    score += titleCoreCoverage * 14;
    score += urlDistinctiveCoverage * 25;
    score += hostDistinctiveCoverage * 35;
    if (compactHostMatch) { score += 42; reasons.push('域名与公司名高度一致'); }
    if ((candidate.position || 99) === 1) score += 5;
    const locationWords = tokens(company.location).filter((token) => token.length > 3);
    if (locationWords.some((token) => text.includes(token))) { score += 4; reasons.push('地点证据一致'); }
    if (promoRe.test(text)) score += 3;
    if (pType === 'document') { score -= 12; reasons.push('搜索命中为文档而非首页'); }
    if (pType === 'policy') { score -= 8; reasons.push('搜索命中为政策页而非首页'); }
    if (pType === 'customer-store') { score -= 12; reasons.push('搜索命中疑似客户/合作项目网店'); }
    if (isHostedCatalogue) { score -= 8; reasons.push('使用第三方促销品目录平台'); }
    if (isNonProductionHost) { score -= 25; reasons.push('命中开发/测试/预览子域，不优先作为正式官网'); }
    if (!exactTitle && titleDistinctiveCoverage === 0 && !domainAffinity) {
      score -= 35;
      reasons.push('标题、辨识词和域名均不能确认公司身份');
    }
  }

  // Repeating a company name in a page title is not enough: directories,
  // suppliers, customer stores and press releases all do that. A candidate must
  // also carry a company-specific token in its own host.
  if (!isDirectory && !isHostedCatalogue && !domainAffinity) {
    score = Math.min(score, 55);
    reasons.push('域名本身不含公司辨识词，不能仅凭页面标题认定官网');
  }
  const hostedAffinity = isHostedCatalogue
    && (compactHostMatch || urlDistinctiveCoverage >= (identity.distinctive.length > 1 ? 0.5 : 1));
  if (isHostedCatalogue && !hostedAffinity) score = Math.min(score, 44);
  const identityStatus = score >= 82 ? 'verified' : score >= 62 ? 'likely' : score >= 45 ? 'ambiguous' : 'unverified';
  return {
    ...candidate,
    identity_score: Math.round(score),
    identity_status: identityStatus,
    candidate_type: type,
    evidence_page_type: pType,
    identity_reasons: reasons,
    identity_metrics: {
      exact_title: exactTitle,
      compact_host_match: compactHostMatch,
      domain_affinity: domainAffinity,
      hosted_affinity: hostedAffinity,
      non_production_host: isNonProductionHost,
      host_distinctive_coverage: Number(hostDistinctiveCoverage.toFixed(2)),
      title_distinctive_coverage: Number(titleDistinctiveCoverage.toFixed(2)),
      url_distinctive_coverage: Number(urlDistinctiveCoverage.toFixed(2)),
    },
  };
}

function urlsFromMap(raw) {
  if (Array.isArray(raw)) return raw.map((item) => typeof item === 'string' ? item : item?.url).filter(Boolean);
  for (const key of ['links', 'data']) {
    if (Array.isArray(raw?.[key])) return raw[key].map((item) => typeof item === 'string' ? item : item?.url).filter(Boolean);
  }
  return [];
}

function mapEvidence(company, selected) {
  const file = path.join(mapDir, `${company.slug}.json`);
  if (!selected || !existsSync(file)) return { map_available: false, mapped_count: 0, same_origin_count: 0 };
  try {
    const urls = urlsFromMap(JSON.parse(readFileSync(file, 'utf8')));
    const origin = parseUrl(selected.url)?.origin;
    return {
      map_available: true,
      mapped_count: urls.length,
      same_origin_count: urls.filter((url) => parseUrl(url)?.origin === origin).length,
    };
  } catch {
    return { map_available: true, mapped_count: 0, same_origin_count: 0, map_invalid: true };
  }
}

function canonicalOfficialUrl(candidate, company) {
  const parsed = parseUrl(candidate.url);
  if (!parsed) return '';
  parsed.search = '';
  parsed.hash = '';
  const identity = companyIdentity(company.company);
  const firstSegment = parsed.pathname.split('/').filter(Boolean)[0] || '';
  const territoryInPath = identity.distinctive.some((token) => firstSegment.includes(token));
  // Franchise branches use a territory path under a shared corporate domain.
  if (territoryInPath && !candidate.identity_metrics.compact_host_match) {
    return `${parsed.origin}/${firstSegment}/`;
  }
  // Owned domains and named subdomains should be represented by their base, not
  // by a privacy/product/client-store result that happened to rank in search.
  return `${parsed.origin}/`;
}

function businessGate(company, selected, map) {
  const linkedinText = `${company.linkedin_positioning || ''} ${company.linkedin_notes || ''}`;
  const officialText = `${selected?.title || ''} ${selected?.description || ''}`;
  const officialPromo = promoRe.test(officialText);
  const linkedinPromo = promoRe.test(linkedinText);
  const hasMetal = metalRe.test(officialText);
  const apparel = apparelRe.test(officialText);
  const print = printRe.test(officialText);
  const food = foodRe.test(officialText);
  const unrelated = digitalRe.test(officialText);
  const localOnly = localOnlyRe.test(officialText);
  const identity = selected?.identity_status || 'unverified';
  const hosted = selected?.candidate_type === 'hosted-catalogue';
  const weakPage = ['customer-store', 'policy', 'document'].includes(selected?.evidence_page_type);

  if (!selected) {
    return { gate1: 'Review', confidence: 'low', reason: '现有搜索证据中没有可信独立官网；不可把目录页当官网，需人工补查' };
  }
  if (identity === 'ambiguous' || identity === 'unverified') {
    return { gate1: 'Review', confidence: 'low', reason: '候选域名与公司身份匹配不足，需人工核对同名企业/官网归属' };
  }
  if (hosted) {
    return { gate1: 'Review', confidence: 'low', reason: '只确认到第三方托管产品目录；业务相关但尚无独立官网/主体归属证据' };
  }
  if (localOnly) {
    return { gate1: 'Reject', confidence: 'medium', reason: '现有公司与官网证据明确显示仅本地制造/手工艺产品' };
  }
  if (food && !officialPromo) {
    return { gate1: 'Reject', confidence: 'medium', reason: '现有证据显示主营食品/礼篮，未见企业促销商品业务' };
  }
  if ((apparel || print) && !officialPromo) {
    return { gate1: 'Reject', confidence: 'medium', reason: '现有证据显示主营服装/印刷/装饰，未见更广促销商品业务' };
  }
  if (unrelated && !officialPromo) {
    return { gate1: 'Reject', confidence: 'medium', reason: '可信官网显示为与促销礼赠无关的服务/行业' };
  }
  if (!officialPromo) {
    return {
      gate1: 'Review',
      confidence: 'low',
      reason: linkedinPromo
        ? 'LinkedIn 定位提及促销商品/礼赠，但可信官网摘要尚未交叉验证，需抓首页与产品页'
        : '公司官网身份较可信，但现有摘要不足以证明促销商品/企业礼赠业务',
    };
  }
  if (weakPage && !(map.same_origin_count >= 3)) {
    return { gate1: 'Review', confidence: 'low', reason: '业务方向匹配，但搜索命中为政策/文档/客户项目页，需抓首页确认' };
  }
  return {
    gate1: 'Pass',
    confidence: hasMetal || map.same_origin_count >= 5 ? 'high' : 'medium',
    reason: hasMetal
      ? '可信官网及现有证据显示促销商品/企业礼赠业务，并出现潜在金属品类'
      : '可信官网及现有证据显示促销商品、品牌商品或企业礼赠业务',
  };
}

function loadSearchResults(company) {
  const found = [];
  for (const directory of searchDirs) {
    const file = path.join(directory, `${company.slug}.json`);
    if (!existsSync(file)) continue;
    try {
      const parsed = JSON.parse(readFileSync(file, 'utf8'));
      found.push(...(parsed?.data?.web || []));
    } catch {
      // A valid parallel search pass can still be used.
    }
  }
  const deduped = new Map();
  for (const item of found) {
    if (!item?.url) continue;
    const parsed = parseUrl(item.url);
    if (!parsed) continue;
    parsed.hash = '';
    parsed.searchParams.delete('srsltid');
    const key = parsed.href.replace(/\/$/, '');
    if (!deduped.has(key)) deduped.set(key, item);
  }
  return [...deduped.values()];
}

const current = JSON.parse(readFileSync(inputPath, 'utf8'));
const audited = current.map((company) => {
  const evaluated = loadSearchResults(company)
    .map((candidate) => evaluateCandidate(company, candidate))
    .sort((a, b) => b.identity_score - a.identity_score);
  const selected = evaluated.find((candidate) =>
    candidate.candidate_type !== 'third-party'
    && ['verified', 'likely'].includes(candidate.identity_status)
    && (candidate.evidence_page_type !== 'customer-store' || candidate.identity_metrics.compact_host_match));
  const map = mapEvidence(company, selected);
  const gate = businessGate(company, selected, map);
  const previousHost = parseUrl(company.official_url)?.hostname.replace(/^www\./, '') || '';
  const selectedHost = parseUrl(selected?.url)?.hostname.replace(/^www\./, '') || '';
  const selectionChanged = previousHost !== selectedHost;
  const manualReasons = [];
  if (!selected) manualReasons.push('无可信独立官网');
  if (selected?.candidate_type === 'hosted-catalogue') manualReasons.push('仅第三方托管目录');
  if (selected?.identity_status === 'likely') manualReasons.push('官网身份仅为 likely');
  if (['customer-store', 'policy', 'document'].includes(selected?.evidence_page_type)) manualReasons.push(`命中页面为 ${selected.evidence_page_type}`);
  if (selectionChanged && company.official_url) manualReasons.push('原官网候选被撤销或替换');
  if (gate.gate1 === 'Review') manualReasons.push('Gate 1 业务证据待复核');
  if (company.gate1 !== gate.gate1) manualReasons.push(`Gate 1 从 ${company.gate1 || company.status} 改为 ${gate.gate1}`);

  return {
    ...company,
    previous_official_url: company.official_url || '',
    previous_gate1: company.gate1 || '',
    official_url: selected ? canonicalOfficialUrl(selected, company) : '',
    official_evidence_url: selected?.url || '',
    official_title: selected?.title || '',
    homepage_evidence: (selected?.description || '').slice(0, 4000),
    identity_status: selected?.identity_status || 'unverified',
    identity_score: selected?.identity_score ?? null,
    candidate_type: selected?.candidate_type || (evaluated.some((item) => item.candidate_type === 'third-party') ? 'third-party-only' : 'none'),
    evidence_page_type: selected?.evidence_page_type || '',
    map_evidence: map,
    gate1: gate.gate1,
    confidence: gate.confidence,
    reason: gate.reason,
    requires_manual_review: manualReasons.length > 0,
    manual_review_reasons: [...new Set(manualReasons)],
    candidate_audit: evaluated.slice(0, 8).map((candidate) => ({
      url: candidate.url,
      title: candidate.title,
      identity_score: candidate.identity_score,
      identity_status: candidate.identity_status,
      candidate_type: candidate.candidate_type,
      evidence_page_type: candidate.evidence_page_type,
      reasons: candidate.identity_reasons,
    })),
  };
});

const auditedPath = path.join(batchDir, 'gate1-results-audited.json');
writeFileSync(auditedPath, `${JSON.stringify(audited, null, 2)}\n`);

const countBy = (field) => Object.entries(audited.reduce((acc, item) => {
  const key = item[field] || 'none';
  acc[key] = (acc[key] || 0) + 1;
  return acc;
}, {})).sort((a, b) => a[0].localeCompare(b[0]));

const changedDomain = audited.filter((item) => {
  const before = parseUrl(item.previous_official_url)?.hostname.replace(/^www\./, '') || '';
  const after = parseUrl(item.official_url)?.hostname.replace(/^www\./, '') || '';
  return before !== after;
});
const changedGate = audited.filter((item) => item.previous_gate1 !== item.gate1);
const manual = audited.filter((item) => item.requires_manual_review);
const revokedOfficial = audited.filter((item) => item.previous_official_url && !item.official_url);
const oldPassDowngraded = audited.filter((item) => item.previous_gate1 === 'Pass' && item.gate1 !== 'Pass');
const oldOfficialWasThirdPartyOnly = audited.filter((item) => item.previous_official_url && item.candidate_type === 'third-party-only');
const esc = (value) => String(value ?? '').replaceAll('|', '\\|').replace(/\s+/g, ' ').trim();

const summaryLines = [
  '# Gate 1 官网身份离线审计',
  '',
  `> 生成时间：${new Date().toISOString()}`,
  '> 数据范围：仅使用已落盘 Firecrawl 搜索结果和 map 结果；本脚本不联网。',
  '> 原始 gate1-results.json 保持不变；下游应使用 gate1-results-audited.json。',
  '',
  '## 结果概览',
  '',
  `- 总公司数：${audited.length}`,
  `- 审计后 Gate 1：${countBy('gate1').map(([key, count]) => `${key}=${count}`).join('；')}`,
  `- 官网身份：${countBy('identity_status').map(([key, count]) => `${key}=${count}`).join('；')}`,
  `- 候选类型：${countBy('candidate_type').map(([key, count]) => `${key}=${count}`).join('；')}`,
  `- 官网域名被撤销/替换：${changedDomain.length}`,
  `- 原官网候选被彻底撤销：${revokedOfficial.length}（其中仅剩第三方证据 ${oldOfficialWasThirdPartyOnly.length}）`,
  `- 原 Pass 被降为 Review/Reject：${oldPassDowngraded.length}`,
  `- Gate 1 判断发生变化：${changedGate.length}`,
  `- 需人工复核：${manual.length}`,
  '',
  '## 主要误判模式',
  '',
  '- 第三方公司目录、协会会员页、地图、评价页被当作官网，并因页面出现“promotional products”而误判 Pass。',
  '- 搜索命中隐私政策、条款、PDF、博客标签或单个产品页，旧逻辑没有区分页面性质。',
  '- 通用行业词参与域名匹配，使同名或无关企业获得过高身份分。',
  '- fullcollection/clickpromo/promotrendz 等托管目录可证明业务线索，但不能单独证明独立官网和经营主体。',
  '- 客户/合作项目网店可证明履约能力，但不能代替公司首页；现改为 Review。',
  '',
  '## 被撤销或替换的官网候选',
  '',
  '| ID | 公司 | 原候选 | 审计后官网 | 原 Gate | 新 Gate |',
  '|---:|---|---|---|---|---|',
  ...changedDomain.map((item) => `| ${item.id} | ${esc(item.company)} | ${esc(item.previous_official_url) || '—'} | ${esc(item.official_url) || '—'} | ${item.previous_gate1 || '—'} | ${item.gate1} |`),
  '',
];
writeFileSync(path.join(batchDir, 'gate1-audit-summary.md'), summaryLines.join('\n'));

const manualLines = [
  '# Gate 1 人工复核清单',
  '',
  '> 按风险优先：原 Pass 被降级/官网被撤销，其次 hosted catalogue、身份 likely、业务证据不足。',
  '',
  '| 优先级 | ID | 公司 | 当前候选 | 新 Gate | 复核原因 | 建议动作 |',
  '|---:|---:|---|---|---|---|---|',
  ...manual
    .sort((a, b) => {
      const risk = (item) => (item.previous_gate1 === 'Pass' && item.gate1 !== 'Pass' ? 100 : 0)
        + (!item.official_url && item.previous_official_url ? 60 : 0)
        + (item.candidate_type === 'hosted-catalogue' ? 30 : 0)
        + (item.identity_status === 'likely' ? 15 : 0);
      return risk(b) - risk(a) || a.id - b.id;
    })
    .map((item, index) => {
      const action = !item.official_url
        ? '按公司名+城市补搜官网；不得采用目录页'
        : item.candidate_type === 'hosted-catalogue'
          ? '查独立公司页、联系方式和法律主体'
          : ['customer-store', 'policy', 'document'].includes(item.evidence_page_type)
            ? '抓官网首页/About，确认该域名主体'
            : '核对首页公司名、地址、产品范围';
      return `| ${index + 1} | ${item.id} | ${esc(item.company)} | ${esc(item.official_url || item.official_evidence_url) || '—'} | ${item.gate1} | ${esc(item.manual_review_reasons.join('；'))} | ${action} |`;
    }),
  '',
];
writeFileSync(path.join(batchDir, 'gate1-manual-review.md'), manualLines.join('\n'));

writeFileSync(
  path.join(batchDir, 'official-urls-audited.txt'),
  `${audited.filter((item) => item.official_url).map((item) => `${item.id}\t${item.company}\t${item.official_url}\t${item.identity_status}\t${item.gate1}`).join('\n')}\n`,
);

process.stdout.write(`${JSON.stringify({
  total: audited.length,
  gate1: Object.fromEntries(countBy('gate1')),
  identity: Object.fromEntries(countBy('identity_status')),
  changed_domain: changedDomain.length,
  changed_gate: changedGate.length,
  revoked_official: revokedOfficial.length,
  old_pass_downgraded: oldPassDowngraded.length,
  manual_review: manual.length,
}, null, 2)}\n`);
