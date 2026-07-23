# Ntegra Product Engineering OKRs — Keynote

A complete 15-slide keynote presentation introducing OKRs to Ntegra Product Engineering.

## Deliverables

| File | Description |
|------|-------------|
| `Ntegra_Product_Engineering_OKRs_Keynote.pptx` | Primary deliverable — open in PowerPoint |
| `Ntegra_Product_Engineering_OKRs_Keynote.pdf` | PDF export from Playwright renderer |
| `output/contact-sheet.png` | All 15 slides at a glance |
| `output/previews/slide-01.png` … `slide-15.png` | Full-resolution slide PNGs |
| `speaker-notes.md` | 45–90 second notes per slide |

## Slide Structure

| # | Slide | Purpose |
|---|-------|---------|
| 1 | Cover | Opening — Product Engineering OKRs |
| 2 | The Real Reason | Framing — we're changing how we think about success |
| 3 | Why Change? | Three honest observations / opportunities |
| 4 | The Future | Aspirational vision one year from now |
| 5 | Mission | "Join, grow and stay" — our north star |
| 6 | Three Strategic Pillars | Career Pathways / Ownership / Innovation |
| 7 | Why OKRs? | Old vs new way of thinking |
| 8 | Strategy Cascade | Mission → Objectives → Key Results → Initiatives |
| 9 | Anatomy of an OKR | Concrete worked example |
| 10 | Common Mistake | Activities vs Outcomes |
| 11 | Our First Objectives | Three objectives mapped to pillars |
| 12 | Dashboard | Illustrative progress metrics |
| 13 | Quarterly Rhythm | The cadence: Plan → Align → Execute → Check in → Review → Learn |
| 14 | Workshop | Now we build them together |
| 15 | Closing | Objectives inspire. Key Results measure. Initiatives deliver. |

## Design

- **Palette:** Navy `#0F172A` · Blue `#2563EB` · Green `#16A34A` · Amber `#F59E0B` · Slate `#64748B`
- **Typography:** Calibri (safe font, renders correctly in all PowerPoint versions)
- **Format:** LAYOUT_WIDE (13.3" × 7.5" — standard widescreen)

## Regenerating

```bash
# Regenerate the .pptx
node generate.js

# Re-render slide PNGs + PDF
node render-preview.js

# Re-generate contact sheet
node contact-sheet.js
```

## Requirements

- Node.js 18+
- `npm install` (installs pptxgenjs, playwright, sharp)
- `npx playwright install chromium` (for render-preview.js)
