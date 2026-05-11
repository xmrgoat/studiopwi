# Studio — Swiss web studio for landscapers

Next.js 15 (App Router) · React 19 · TypeScript strict · Prisma · Resend.

Spec source: [`site-build-spec.md`](./site-build-spec.md).

## Quick start

```bash
# 1. Install
pnpm install   # or npm / yarn

# 2. Env
cp .env.example .env.local
# Fill RESEND_API_KEY, RESEND_FROM, LEADS_TO

# 3. Database
pnpm db:push           # creates prisma/dev.db (SQLite)

# 4. Dev
pnpm dev               # http://localhost:3000
```

## Scripts

| Command | Purpose |
|---|---|
| `pnpm dev` | Dev server (Turbopack) |
| `pnpm build` | Production build |
| `pnpm start` | Production server |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm lint` | ESLint |
| `pnpm db:push` | Sync Prisma schema to DB |
| `pnpm db:studio` | Prisma Studio (visual DB) |

## Architecture

```
src/
├── app/                       # Next.js App Router
│   ├── layout.tsx             # Fonts (Fraunces/Geist), metadata, SmoothScroll
│   ├── page.tsx               # Home: composes sections
│   ├── globals.css            # Imports tokens + reset + base
│   ├── not-found.tsx
│   └── api/
│       ├── contact/route.ts          # POST /api/contact
│       └── newsletter/
│           ├── route.ts              # POST /api/newsletter
│           └── confirm/route.ts      # GET /api/newsletter/confirm?token=
│
├── components/
│   ├── layout/                # Header, Footer, SmoothScroll (Lenis)
│   ├── sections/              # Hero, CredibilityBar, Problem, Services, CaseStudies, WhyUs
│   ├── ui/                    # Button, SectionMarker, ItalicAccent, ContactForm, NewsletterForm
│   └── motion/                # SplitWords, Counter, Magnetic, Reveal
│
├── content/                   # ALL copy lives here — edit once, applies everywhere
│   ├── site.ts                # hero, problem, why-us, footer, nav
│   ├── services.ts            # 3 pricing tiers
│   └── cases.ts               # case studies
│
├── lib/
│   ├── env.ts                 # Zod-validated env, fails fast at boot
│   ├── db.ts                  # Prisma client singleton
│   ├── email.ts               # Resend wrappers
│   ├── validation.ts          # Zod schemas (contact, newsletter)
│   ├── rateLimit.ts           # In-memory bucket, swap for Upstash in prod
│   ├── motion.ts              # GSAP + Lenis helpers, prefers-reduced-motion
│   └── cn.ts                  # className helper
│
├── styles/
│   ├── tokens.css             # All design tokens — §2 of spec
│   ├── reset.css
│   └── base.css               # Body, headings, focus, .accent, .mono
│
└── ...
prisma/schema.prisma           # Lead + NewsletterSubscriber
public/                        # videos/, images/, og.png, favicon
```

## Design system

All design tokens are CSS custom properties in [`src/styles/tokens.css`](src/styles/tokens.css). Sections consume them — never hardcode hex values or sizes.

| Token | Use |
|---|---|
| `--color-bg` / `--color-ink` / `--color-ink-deep` | 60/30/10 distribution |
| `--color-brand` | Accent only (buttons, italic words, dividers) |
| `--color-focus` | `var(--color-ink)` — WCAG-compliant focus indicator (brand was 1.7:1) |
| `--font-display` / `--font-body` / `--font-mono` | Fraunces / Geist / Geist Mono |
| `--section-py` | `clamp(96px, 12vw, 192px)` vertical rhythm |

### Italic accent rule

§8.2 of the spec: one italic phrase per headline, in `--color-brand`. Render with `<ItalicAccent>word</ItalicAccent>` or the `.accent` class.

## Forms

Both forms POST JSON to `/api/*`. Server-side:
1. Rate-limit by IP (5/h contact, 10/h newsletter).
2. Validate with Zod.
3. Honeypot field `website` — bots get a silent 200.
4. Persist via Prisma.
5. Send email via Resend.

Newsletter uses double-opt-in: subscriber gets a confirm link → `GET /api/newsletter/confirm?token=`.

## Motion

GSAP + Lenis are loaded via `next/dynamic`-friendly ES modules (no CDN). Every animation:
- Registers plugins via `registerGsapPlugins()` in [`lib/motion.ts`](src/lib/motion.ts).
- Bails out under `prefers-reduced-motion: reduce`.
- Uses `gsap.context()` so React unmount → `ctx.revert()` cleans up triggers.

Custom components instead of GSAP Club's SplitText:
- `<SplitWords text="…" />` wraps each word for line/word reveals.
- `<Counter value={12} />` correctly animates 0 → target (fixes the `gsap.from({textContent:0})` bug from the spec).
- `<Magnetic>` uses `quickTo` and respects `(hover: none)`.

## Performance & a11y

- Self-hosted fonts via `next/font/google` with `display: "swap"` and preload on display + body.
- Hero video: `preload="metadata"` (not auto) — autoplay attempt wrapped in `.catch()`; poster stays visible on failure.
- All media has explicit `width`/`height` or `aspect-ratio` → CLS budget.
- `prefers-reduced-motion` honored globally (CSS) and per-component (JS).
- Headings: one `<h1>` (hero), `<h2>` per section, `<h3>` inside cases — no skips.
- Honeypot + rate limit on all public POSTs.

## Production swap-outs

| Dev | Prod |
|---|---|
| SQLite (`prisma/dev.db`) | Postgres — change `provider` in `schema.prisma` |
| In-memory rate limit | Upstash/Redis (`@upstash/ratelimit`) |
| Resend test sender | Verified domain on Resend |
| Placeholder logos (text) | Real SVG client logos in `public/images/logos/` |
| AI hero images | Real photography in `public/images/case-studies/` |

## Adding content

- **New service tier** → edit [`src/content/services.ts`](src/content/services.ts).
- **New case study** → append to `cases.items` in [`src/content/cases.ts`](src/content/cases.ts).
- **Copy change anywhere** → only edit `src/content/`.

## Open issues from the 5-agent audit

Tracked but not yet wired up:

- [ ] Real client logos (SVG, single-color, `currentColor`).
- [ ] Founder photo at `public/images/founder.webp`.
- [ ] OG image at `public/images/og.png`.
- [ ] Newsletter confirm landing page `/newsletter/confirmed`.
- [ ] Legal pages: `/privacy`, `/terms`, `/imprint`.
- [ ] Extract `flower-poster.webp` from `flower.mp4` and place at `public/images/`.
- [ ] Decide audience scope: Romandie-only vs Swiss-wide (copy currently mixed).
