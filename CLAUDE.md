# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

The README documents `pnpm` commands; the project's `package.json` uses `npm` scripts. Both work — pick whichever lockfile is present (`package-lock.json` exists). All commands below assume `npm`; substitute `pnpm` if the user prefers.

| Command | Purpose |
|---|---|
| `npm run dev` | Dev server on `http://localhost:3000` |
| `npm run build` | Production build (compiles + typechecks + lints + collects routes) |
| `npm run typecheck` | `tsc --noEmit` only |
| `npm run lint` | `next lint` |
| `npm run db:push` | Sync Prisma schema to the local SQLite file |
| `npm run db:studio` | Visual DB browser |

No test framework is configured. Don't invent one.

`next build` performs route-data collection at the end, which **instantiates `src/lib/env.ts`** (Zod schema). Missing `RESEND_API_KEY` / `RESEND_FROM` / `LEADS_TO` will fail the build even though they are unrelated to the change being made. See [`.env.example`](.env.example) — copy to `.env` (or `.env.local`) and fill before building locally.

## Architecture — the parts you must understand before editing

### Content is the source of truth, not the components

All visible copy lives in three typed files:

- [`src/content/site.ts`](src/content/site.ts) — hero, problem, why-us, contact, FAQ, footer, navigation
- [`src/content/services.ts`](src/content/services.ts) — three pricing tiers (Lancement / Croissance / Partenariat)
- [`src/content/cases.ts`](src/content/cases.ts) — case studies

Sections import from these files; copy changes never go in component JSX. **The SEO routes also read from these files** — `robots.ts`, `sitemap.ts`, `manifest.ts`, `opengraph-image.tsx`, `llms.txt/route.ts`, `page.md/route.ts`, and `components/seo/JsonLd.tsx` all pull live data. Editing `site.ts` cascades to OG cards, JSON-LD, the AI brief, and the Markdown mirror automatically. Don't duplicate constants across files.

The site is **French (fr-CH) targeting Swiss landscapers**. The `<html lang>`, metadata copy, JSON-LD `inLanguage`, and content files are all in French. Don't mix languages.

### Two animation runtimes you must keep separate

- **Lenis** (smooth scrolling) is mounted once in [`src/components/layout/SmoothScroll.tsx`](src/components/layout/SmoothScroll.tsx) from the root layout. It owns `window` scroll.
- **GSAP + ScrollTrigger** is used inside section components via `useEffect` + `gsap.context()`. Every animation:
  1. Calls `registerGsapPlugins()` from [`src/lib/motion.ts`](src/lib/motion.ts) before creating triggers
  2. Bails out under `prefersReducedMotion()`
  3. Uses `gsap.context(() => …, root)` so the cleanup function (`ctx.revert()`) tears down triggers on unmount
  4. Calls `ScrollTrigger.refresh()` in the cleanup if it added triggers

Breaking any of those four rules causes ghost triggers across navigations or layout-shift jank under reduced-motion preference.

### CSS Modules + design tokens — no Tailwind

Styling is per-component `*.module.css` files plus three global stylesheets imported by `globals.css`:

- [`src/styles/tokens.css`](src/styles/tokens.css) — every color, font, space, easing as CSS custom properties. **Never hardcode hex / px values in component CSS — read from tokens.** If a needed token doesn't exist, add it to `tokens.css` first.
- [`src/styles/reset.css`](src/styles/reset.css)
- [`src/styles/base.css`](src/styles/base.css) — body type defaults, headings, focus, `.skip-link`, `.accent`, `.mono`, `.container`, `.section`, and `.section--dark` invert for dark sections

Conventions worth knowing:
- `.section--dark` inverts text + adjusts the italic accent color so the brand teal stays legible
- One italic phrase per headline using `<ItalicAccent>` or the `.accent` class (spec §8.2)
- `<SplitWords text="…" />` is the custom replacement for GSAP's paid `SplitText` plugin

### SEO surface — eight generated routes

Files under `src/app/` that aren't pages or layouts are Next.js metadata-route conventions. **Do not create static counterparts in `/public`** — that creates two competing routes:

| Route | File | Purpose |
|---|---|---|
| `/robots.txt` | `src/app/robots.ts` | Allow `/`, disallow `/api/`, `/_next/`, `/admin`; points to sitemap |
| `/sitemap.xml` | `src/app/sitemap.ts` | Homepage only (other linked routes don't exist yet) |
| `/manifest.webmanifest` | `src/app/manifest.ts` | PWA manifest |
| `/icon` (32×32) | `src/app/icon.tsx` | Generated favicon via `next/og` |
| `/apple-icon` (180×180) | `src/app/apple-icon.tsx` | iOS touch icon via `next/og` |
| `/opengraph-image` (1200×630) | `src/app/opengraph-image.tsx` | Generated OG card via `next/og` |
| `/twitter-image` | `src/app/twitter-image.tsx` | Re-exports `opengraph-image` |
| `/llms.txt` | `src/app/llms.txt/route.ts` | French + English brief for AI answer engines |
| `/page.md` | `src/app/page.md/route.ts` | Markdown mirror of the homepage (carries `X-Robots-Tag: noindex`) |

JSON-LD lives in [`src/components/seo/JsonLd.tsx`](src/components/seo/JsonLd.tsx) (five typed components: `OrganizationLd`, `WebSiteLd`, `LocalBusinessLd`, `FaqLd`, `WebPageLd`) and is mounted in two places — sitewide schema in `layout.tsx`, page-level schema in `page.tsx`. The components share `@id` references so Google can stitch the graph; preserve that pattern when adding new schema types.

`metadataBase` and every SEO route default to `https://studiopwi.com` when `NEXT_PUBLIC_SITE_URL` is unset. The canonical domain is **studiopwi.com**; the canonical contact email is **contact@studiopwi.com**. Older drafts used `studio.ch` / `contact@pwi.com` — those are wrong, don't reintroduce them.

### Forms, rate-limiting, env validation

Both `/api/contact` and `/api/newsletter` follow the same shape: rate-limit by IP → Zod validate → honeypot field (`website`) returns silent 200 → persist via Prisma → send email via Resend. Schemas live in [`src/lib/validation.ts`](src/lib/validation.ts); rate-limit bucket in [`src/lib/rateLimit.ts`](src/lib/rateLimit.ts) (in-memory — swap for Upstash before scaling).

[`src/lib/env.ts`](src/lib/env.ts) throws at module load if any required env is missing. This intentionally fails the build / dev server fast instead of producing runtime 500s. The trade-off: build-only changes still need full env to complete `next build`.

Newsletter uses double opt-in: `POST /api/newsletter` → email with token → `GET /api/newsletter/confirm?token=…` flips `confirmed: true`.

### Accessibility invariants worth preserving

- Skip link `<a href="#main" className="skip-link">` is the **first focusable element** in `<body>` (`layout.tsx`); `<main id="main">` is the target in `page.tsx`. Don't reorder these or break the anchor.
- Hero `<section>` has `aria-labelledby="hero-headline"` pointing at the `<h1 id="hero-headline">`. If you restructure the hero, keep the ID linkage.
- Every animation respects `prefers-reduced-motion`; global CSS also forces near-zero durations on `*` under that media query.
- One `<h1>` per page (in `Hero`), `<h2>` per section, `<h3>` inside cases — never skip levels.

## Commit workflow (user preference)

The user wants **a commit and push to `origin/main` after every individual file edit** — not batched commits. Commit messages should be Conventional-Commits-style (`fix:`, `seo:`, `a11y:`, `feat:`) with a body when the diff isn't self-explanatory. **Do not add a `Co-Authored-By: Claude` trailer** — the user explicitly opted out.

## Things deliberately not done (don't "fix" these)

- `CredibilityBar` renders text spans, not `<img>` tags — placeholder until real client SVGs are commissioned. Don't replace with `<Image>` until logos arrive.
- `cases.ts` has only one case study (`jardins-dupont`). The component handles a list and will scale.
- `flower.mp4` poster and several `/images/*` paths in `site.ts` and `cases.ts` reference files that don't exist in `/public` yet. They are tracked in the README's "Open issues" list — don't delete the references.
- `next lint` deprecation warning is upstream noise; do not migrate to the ESLint CLI without being asked.
- `force-static` is set on the AI-facing routes (`llms.txt`, `page.md`) but not yet on `robots.ts` / `sitemap.ts`. Both work either way; only add `force-static` if asked.
