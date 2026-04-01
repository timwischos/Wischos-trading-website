# Google Search Operator Prospecting Playbook — Wischos Gift

## 1. How to Use This Playbook

These strings are for manual research in Google — paste each one directly into the google.com search box. Results surface public LinkedIn profiles and company pages that match the target role and geography. After finding candidates via Google, check their LinkedIn activity manually — prioritise profiles that have posted or commented in the past 30 days. This is a prospecting research tool for human-led outreach, not automated scraping.

---

## 2. Operator Reference

| Operator | Function | Example |
|----------|----------|---------|
| `site:linkedin.com/in/` | Search only LinkedIn personal profiles | `site:linkedin.com/in/ "office manager"` |
| `site:linkedin.com/company/` | Search only LinkedIn company pages | `site:linkedin.com/company/ "professional services"` |
| `intitle:"..."` | Page title contains exact phrase | `intitle:"office manager"` |
| `"..."` | Exact phrase match anywhere on page | `"corporate gifting"` |
| `OR` | Boolean OR between two terms (must be uppercase) | `"sydney" OR "melbourne"` |
| `-` | Exclude term from results | `-retail -government` |

---

## 3. Search Strings by Persona and Geography

### Office Manager

```
# Office Manager — AU: Sydney / Melbourne / Brisbane, professional services and tech SMBs
site:linkedin.com/in/ "office manager" "sydney" OR "melbourne" OR "brisbane" "professional services" OR "consulting" OR "tech"
```

```
# Office Manager — AU: Operations titles, broader geography net
site:linkedin.com/in/ "operations manager" OR "office administrator" "australia" "professional services" OR "law" OR "real estate"
```

```
# Office Manager — EU: Amsterdam / Rotterdam / Berlin / Hamburg, professional services
site:linkedin.com/in/ "office manager" "amsterdam" OR "rotterdam" OR "berlin" OR "hamburg" "professional services" OR "consulting"
```

```
# Office Manager — EU: Netherlands and Germany, broader operations titles
site:linkedin.com/in/ "operations manager" OR "office coordinator" "netherlands" OR "germany" "technology" OR "fintech" OR "consulting"
```

```
# Office Manager — SG: Singapore, technology and professional services
site:linkedin.com/in/ "office manager" "singapore" "technology" OR "fintech" OR "professional services"
```

---

### Executive Assistant / EA

```
# EA — AU: Sydney / Melbourne, financial services, law, and real estate
site:linkedin.com/in/ "executive assistant" "sydney" OR "melbourne" "financial services" OR "law" OR "real estate"
```

```
# EA — AU: PA and Chief of Staff titles, broader geography
site:linkedin.com/in/ "personal assistant" OR "chief of staff" "australia" "consulting" OR "technology" OR "finance"
```

```
# EA — EU: London / Amsterdam, consulting and finance
site:linkedin.com/in/ "executive assistant" OR "personal assistant" "london" OR "amsterdam" "consulting" OR "finance"
```

```
# EA — JP: Tokyo, international and global firms
site:linkedin.com/in/ "executive assistant" "tokyo" "international" OR "global"
```

---

### HR Manager / People Ops

```
# HR Manager — SG: Singapore, technology and fintech
site:linkedin.com/in/ "hr manager" OR "people operations" "singapore" "technology" OR "fintech" OR "professional services"
```

```
# HR Manager — KR: Seoul, technology and startup
site:linkedin.com/in/ "hr manager" OR "head of people" "seoul" "technology" OR "startup"
```

```
# HR Manager — AU: Melbourne / Sydney, startup and scale-up
site:linkedin.com/in/ "hr manager" OR "head of people" OR "people operations" "melbourne" OR "sydney" "startup" OR "scale-up"
```

```
# HR / People Ops — AU: Culture and engagement titles (higher-value buyers for onboarding programs)
site:linkedin.com/in/ "culture" OR "engagement" "people" "australia" "technology" OR "saas" OR "fintech"
```

---

### Marketing Coordinator (Secondary)

```
# Marketing Coordinator — AU: Event-driven buyers, tech and professional services
site:linkedin.com/in/ "marketing coordinator" OR "events coordinator" "australia" "technology" OR "professional services"
```

```
# Marketing Coordinator — EU: Netherlands / Germany / UK, brand and events roles
site:linkedin.com/in/ "marketing coordinator" OR "brand manager" "netherlands" OR "germany" OR "united kingdom" "technology" OR "consulting"
```

---

### Company-Level Searches (Finding Target Companies, Not Individuals)

```
# Company — AU: Professional services SMBs (51–200 employees)
site:linkedin.com/company/ "professional services" "australia" "51-200 employees"
```

```
# Company — SG: Technology companies, target employee range
site:linkedin.com/company/ "technology" "singapore" "51-200 employees" OR "201-500 employees"
```

```
# Company — AU: Tech and SaaS companies with visible event or gifting signals
site:linkedin.com/company/ "saas" OR "technology" "australia" "51-200 employees" -retail -government
```

```
# Company — EU: Consulting and professional services, NL and DE
site:linkedin.com/company/ "consulting" OR "professional services" "netherlands" OR "germany" "51-200 employees"
```

```
# Company — KR: Technology companies in Seoul
site:linkedin.com/company/ "technology" "seoul" "51-200 employees" OR "201-500 employees"
```

---

## 4. Post-Google LinkedIn Filtering

After running a search string, apply these checks to each profile found before adding to your outreach shortlist:

- **Activity check:** Open the profile's "Activity" tab — has this person posted or commented in the past 30 days? If inactive for 6+ months, skip.
- **Gifting signals:** Search their posts and About section for mentions of "corporate gifts", "swag", "onboarding kit", "company gift", "team gifts", "event giveaway". Any match = higher priority.
- **Company size confirmation:** Click through to their company page — confirm headcount is 50–500 employees. LinkedIn shows this in the About section.
- **Industry check:** Confirm the company is not in manufacturing, retail, or government. When in doubt, check the company page "Industry" field.
- **Role match:** Confirm the contact's current role matches one of the four personas (Office Manager, EA, HR Manager, Marketing Coordinator). People change jobs — verify their current position, not an old one.

If all five checks pass: add to outreach shortlist with a note on which persona and geography category they fit.

---

## 5. Outreach Starting Point

After building your shortlist, reach out via LinkedIn DM. Keep the first message under 75 words. Lead with one specific observation about their company or role — something you noticed on their profile or company page, not a generic opener. Mention wischosgift.com once with a specific product or use case that fits their industry. Do not ask for a meeting or a call. End with a question — something they can answer in a single sentence — that confirms whether they are the right person to speak with.

**What not to do:** "Hi, I came across your profile and thought you might be interested in our custom gifts." That is a spam message. Write it like a human who actually looked at their profile for 60 seconds.
