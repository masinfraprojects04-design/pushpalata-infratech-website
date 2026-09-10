# PRD — Pushpalata Infratech Private Limited Corporate Website

## Original problem statement
Build a complete, premium, modern corporate website for Pushpalata Infratech Private Limited (pushpalatainfratech.com): Transmission Line Construction, Tower Erection, Re-Conductoring, Stringing, Substation Works and Full EPC Execution. Critical positioning rule: company was a subcontractor/execution partner 2014–Nov 2025; full EPC expansion began Nov 2025 with a 35 km 765 kV D/C New Narendra (GIS)–Pune (GIS) Package-1 project in Karnataka. Never blur subcontract history into EPC claims; never invent stats, certifications, clients or line lengths. Brand: deep forest green + charcoal + engineering orange + off-white; strong sans-serif typography; Awwwards-level craft (kinetic masked hero, marquee, numbered chapters, framer-motion reveals, lenis smooth scroll, parallax hero).

## User personas
- EPC/procurement decision-makers at utilities and main contractors evaluating execution capability
- Project organizations seeking tower erection / stringing subcontractors
- Job seekers in transmission-line disciplines

## Architecture
- Frontend: Vite + React 19 + TS, Tailwind v4, `motion` (framer-motion) + `lenis`; routes in `src/App.tsx`; pages in `src/pages/`; shared primitives in `src/components/site/Shared.tsx`; all content data in `src/lib/data.ts` (services, projects, timeline, partners, contacts, corporate registrations).
- Backend: FastAPI `backend/server.py` — `POST /api/enquiries`, `GET /api/enquiries` (MongoDB `enquiries` collection), plus template `/api/status`. EmailStr validation; uuid string ids; tz-aware datetimes.
- No authentication anywhere.

## Core requirements (static)
Pages: Home, About Us, Services (+ detail template), Projects (+ detail template), EPC Capabilities, Our Experience, Quality & HSE, Careers, Contact. Sticky compacting navbar with orange "Request a Project Discussion" CTA; mobile hamburger overlay; footer with quick links/services/corporate info. SEO title/meta per brief.

## Implemented (2026-09-10)
- Real company PLP logo wired into navbar, footer and favicon. (Sep 2026) User asked to use the original red PLP mark AS-IS — original scan is now used directly (only frame trimmed + white bg made transparent, no AI redraw). Do NOT regenerate/redraw the logo.
- Enquiry email alerts: every POST /api/enquiries also emails info@pushpalatainfratech.com via Emergent-managed Resend proxy (guardrail-gated template; email failure never blocks enquiry saving — logged only)
- Legal pages: /privacy-policy and /terms-and-conditions with footer links wired
- Kinetic hero: parallax 765 kV imagery, masked line-by-line headline reveal, CTAs, scroll indicator
- KPI strip (Established 2014 / 765 kV / 35 km EPC / Up to 3,000* / 1,500+ km as subcontractor — user-confirmed Sep 2026) with animated counters; * footnoted as management-provided
- About preview with 2014–2025 subcontract vs 2025–present EPC era cards; editorial marquee; 8 service cards; animated 33→765 kV voltage band; flagship EPC showcase; partner strip with honest role labels; CTA band
- About: story, mission/vision/values, people & organization, engineering & technology (PLS-CADD etc.), corporate registrations (CIN/GSTIN/Udyam/EPFO), directors
- Projects: filterable portfolio (Current EPC / Recent-Current Execution / Subcontract), 11 projects with honest role labels, detail template with scope/meta/notes
- EPC Capabilities: 9-step animated timeline (Survey→Commissioning) + framework-in-action on flagship project
- Experience: vertical timeline 2014→current, marquee, animated stats, partner strip
- Quality & HSE: dark section, 4 pillars, field gallery
- Certifications & Compliance section (components/site/Certifications.tsx, data in CERTIFICATIONS in data.ts) on About (#06) and Quality & HSE (#03): ISO 9001/14001/45001 worded as 'aligned to' (NOT certified — user skipped confirming; verify with client), plus verified Udyam/CIN/GST/EPFO
- Floating WhatsApp button (components/site/WhatsAppButton.tsx) on all pages, popover with both numbers (wa.me links)
- Navbar brand: single-line 'PUSHPALATA INFRATECH PRIVATE LIMITED' in Roboto Slab (font-brand), dark green when scrolled / white over hero; CTA 'Contact Us'; Contact link removed from desktop nav (still in mobile menu)
- Home CTA band button 'Start a Project Discussion' now white/forest (user asked for colour change)
- Root + frontend eslint.config.js added only so the platform lint check can run (project lint is oxlint)
- REAL SITE FOOTAGE (Sep 10 2026): user's WhatsApp stringing video → /public/media/stringing.mp4 + .webm (muted, ffmpeg-encoded) + 4 extracted stills (stringing-drums/tensioner/puller/tower.jpg). Data in FIELD_VIDEO (data.ts). components/site/FieldVideo.tsx = "Live From Our Sites" section (autoplay/loop/muted video + play-pause + 4 stills) on Home (#03) and /services/stringing (#01). Stringing service img, DVC HTLS project img and 2 Quality&HSE gallery tiles now use real stills. Other images still stock.
- FOUNDATION PHOTOS (Sep 10 2026): 5 user photos (JCB excavation, total station, cement stock, cube test CTM, toolbox talk) — date/GPS stamps removed by CROPPING (no AI edit) → /public/media/foundation-*.jpg, survey-total-station.jpg. FOUNDATION_GALLERY in data.ts; components/site/SiteGallery.tsx renders on /services/foundation-civil-works and /projects/narendra-pune-765 (photos are from Vijayapura, Karnataka = flagship line). Foundation + Survey service imgs and 3 Q&HSE gallery tiles use them. Pattern for future photos: add to IMG + a *_GALLERY array, attach via `gallery` on Service/Project.
- Careers: discipline chips, locations, ONLINE APPLICATION FORM with resume upload (PDF/DOC/DOCX ≤5MB) → POST /api/applications (multipart) → Mongo `applications` + file in /app/backend/uploads/resumes + owner email (Resend) with tokenized download link GET /api/applications/{id}/resume?token=…; mailto fallback kept
- Contact: 2 office cards, call/WhatsApp/email strip, Google Map embed, project enquiry form persisting to MongoDB with success toast
- Lenis smooth scrolling, lenis CSS, SEO meta in index.html

## Verification done
- curl POST /api/enquiries (201 + id), GET list, negative 422 validation — all via public URL
- `yarn typecheck` clean
- Browser pass via public URL: hero, scroll sections, marquee, projects filters, project detail, contact form submit (success toast observed), mobile hamburger menu

## Backlog / remaining
- P0: Swap stock imagery for real company/project photographs when supplied
- P1: Confirm ISO certification status with client; attach real certificate images/PDFs to Certifications cards
- P2: Social media links once accounts exist
- P2: Blog/news section for SEO
- P2: Admin view for enquiries/applications

## Next tasks
1. Collect real project photos (user has not attached any yet)
2. Confirm ISO certificates
3. Testing: /app/test_reports/iteration_1.json — all backend (8/8) + frontend flows passed (Sep 10 2026)
