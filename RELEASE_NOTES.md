# Release Notes — AI Builder OS v1.0

## 2026-06-27 — Initial Release

### Features

**Dashboard**
- Stats overview: 100 projects, 200 workflows, 100 cases, 600 eval cases
- Top 5 recommended projects by composite score
- Category distribution chart
- Top 5 high-value workflows
- Quick navigation to all modules

**AI Project Library (100 projects)**
- 7-dimension scoring: resume value, business value, tech growth, freelance fit, developability, differentiation, long-term reuse
- Search by name, description, category
- Filter by category (20 directions), difficulty (1-5)
- Sort by composite score, resume value, business value
- Detail modal with all 50+ fields
- Generate resume bullets (Chinese/English)
- Generate MVP development plan
- Generate portfolio introduction
- Pagination (20 per page)

**Client Intake Analysis (100 cases)**
- Rule-based analysis engine (keyword matching + pattern recognition)
- Input: client's raw message
- Output: client type, surface/real/hidden needs, risk assessment, product recommendation, pricing strategy, communication questions, WeChat reply, formal quote, SOW draft, acceptance criteria, stop conditions
- 100 case browser with search and type filtering
- Case detail modal with full analysis

**Workflow Templates (200 workflows)**
- Search by name, description, pain point
- Filter by category (20 directions), difficulty, business value
- Expandable detail view with steps, tools, APIs, prompt template, risks
- One-click prompt copy
- Pagination (20 per page)

**AI Eval Bench (600 test cases)**
- 6 evaluation categories × 100 cases each
- Categories: RAG retrieval, multi-turn dialogue, tool calling, hallucination detection, safety boundaries, malicious input
- Mock evaluation runner with random results
- OpenAI-compatible Provider interface (defined, not connected)
- Provider configuration guide

**Portfolio & Resume**
- Auto-generated Chinese resume bullets
- Auto-generated English resume bullets
- STAR format interview script
- GitHub README template
- Portfolio homepage copy
- Screenshot checklist
- Demo script
- One-click copy for all sections

**Status Dashboard**
- Module completion status
- Data source inventory (1,000 entries)
- Feature availability (real vs mock)
- Build commands
- Resume/interview guidance
- Upgrade roadmap

### Technical

- Next.js 16 App Router with Turbopack
- TypeScript strict mode (zero `any` types)
- Tailwind CSS with dark glass-morphism theme
- Responsive sidebar navigation (desktop + mobile hamburger)
- System fonts (no Google Fonts dependency)
- Static site generation (zero server runtime)
- Local JSON data (1,000 structured entries)
- npm run build: zero errors, 5.2s compilation

### Data

| Source | Count | Format |
|--------|-------|--------|
| AI Projects | 100 | JSON (727KB) |
| Client Cases | 100 | JSON (253KB) |
| Workflow Templates | 200 | JSON (998KB) |
| Eval Test Cases | 600 | JSON (6 files, 758KB) |
| Service Products | 14 | JSON (12KB) |
| Customer Profiles | 12 | JSON (14KB) |
| **Total** | **1,000** | — |

### Known Limitations

- Client analysis uses rule engine, not real LLM
- Eval runner returns mock (random) results
- No data persistence (refresh resets state)
- No a11y attributes
- No i18n support

### Roadmap

- [ ] Connect OpenAI-compatible Provider for real client analysis
- [ ] Add localStorage for data persistence
- [ ] Add a11y (aria-labels, focus traps, keyboard navigation)
- [ ] Add PDF/Word export for SOW and reports
- [ ] Add more eval test cases
- [ ] Add i18n (Chinese/English)
- [ ] Deploy to Vercel
