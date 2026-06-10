# Task Router For Lightweight / Caveman Mode

Use this file before loading the full export-customer-development references. Its purpose is to reduce token waste by selecting only the files needed for the current task.

## Routing Rules

1. Identify the user's task type first.
2. Load only the listed references for that task.
3. Load templates only when the user needs a report, sheet, draft, checklist, or reusable artifact.
4. Do not load `test-runs/` unless the user asks to review previous tests or reuse a tested market conclusion.
5. If a short market/customer summary exists, prefer reading that summary before loading a long report.
6. If the task changes stage, load the next stage's files then; do not preload the whole skill.

## Task Map

| User task | Read first | Optional template |
|---|---|---|
| Understand the whole workflow | `SKILL.md` | none |
| Decide which files to use | `task-router.md` | none |
| Product learning / capability boundary | `references/product-capability-research.md`, `references/market-research.md` | `templates/product-capability-report.md` |
| Manufacturing process / feasibility | `references/product-capability-research.md` | `templates/product-capability-report.md` |
| Front-end market research | `references/market-research.md`, `references/industry-landscape-research.md`, `references/product-capability-research.md` | `templates/market-landscape-report.md` |
| Competitor / similar-business research | `references/industry-landscape-research.md` | `templates/market-landscape-report.md` |
| Find blog / LinkedIn topics | `references/content-topic-discovery.md` | `templates/content-topic-map.md`, `templates/content-calendar.md` |
| Write blog / LinkedIn content | `references/content-marketing-playbook.md`, `references/seo-geo-content-optimization.md` | `templates/content-brief.md`, `templates/linkedin-content-draft.md`, `templates/seo-geo-checklist.md` |
| Source leads | `references/lead-sourcing.md`, `references/customer-analysis.md` | `templates/lead-research-report.md`, `templates/crm-columns.csv` |
| Analyze one customer | `references/customer-intelligence-profile.md`, `references/customer-analysis.md`, `references/customer-value-assessment.md`, `references/account-entry-strategy.md` | `templates/customer-scorecard.md` |
| Find contacts / emails | `references/contact-discovery.md`, `references/customer-intelligence-profile.md` | none |
| Write cold email / LinkedIn outreach | `references/outreach-playbook.md`, `references/account-entry-strategy.md` | `templates/outreach-sequence.md` |
| Customer replied / inquiry received | `references/inquiry-qualification.md`, `references/pipeline-action-rules.md` | `templates/inquiry-qualification-report.md` |
| Prepare quote / reply to price request | `references/quotation-strategy.md`, `references/inquiry-quote-conversion.md` | `templates/quotation-plan.md` |
| Plan samples | `references/sample-strategy.md` | `templates/sample-plan.md` |
| Negotiate / convert / handle delay | `references/inquiry-quote-conversion.md`, `references/pipeline-action-rules.md` | `templates/quotation-plan.md` |
| Build or update CRM | `references/crm-fields.md`, `references/pipeline-action-rules.md` | `templates/crm-columns.csv` |
| Weekly review | `references/crm-fields.md`, `references/pipeline-action-rules.md` | `templates/weekly-pipeline-review.md` |
| Final quality check | `references/quality-gate.md` | `templates/quality-checklist.md` |

## Default Lightweight Execution Pattern

Use this compact sequence:

```text
1. Restate task type in one line.
2. Select files from the task map.
3. State assumptions and missing information.
4. Produce the requested output.
5. Apply quality gate only if the output is customer-facing, strategic, or reusable.
6. End with next action.
```

## Avoid Loading By Default

Avoid reading these unless needed:

- `test-runs/`: only for reviewing prior tests or reusing prior market conclusions.
- Content references when the task is only quote/sample/customer analysis.
- Quote/sample references when the task is only market research or content planning.
- All templates at once.
- This Chinese explanation file, unless the user asks how the files work.

## Escalation Rule

If the current task cannot be answered with the selected files, load the next most relevant file and explain why briefly. Do not jump from a narrow task to the full workflow unless the user asks for an end-to-end run.
