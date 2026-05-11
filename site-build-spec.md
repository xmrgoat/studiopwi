# Site Build Specification
## Swiss Web Studio for Landscapers

> A clean, editorial, minimal-but-alive agency site. Refined minimalism × Swiss editorial × organic motion. Built for trust, clarity and conversion.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Design System](#2-design-system)
3. [Tech Stack](#3-tech-stack)
4. [Global Elements](#4-global-elements)
5. [Sections](#5-sections)
   - [5.1 Hero](#51-hero)
   - [5.2 Credibility Bar](#52-credibility-bar)
   - [5.3 Problem](#53-problem)
   - [5.4 Services & Pricing](#54-services--pricing)
   - [5.5 Case Studies](#55-case-studies)
   - [5.6 Why Us + Final CTA](#56-why-us--final-cta)
   - [5.7 Footer](#57-footer)
6. [Asset Checklist](#6-asset-checklist)
7. [Performance & Accessibility](#7-performance--accessibility)
8. [Editorial Notes](#8-editorial-notes)

---

## 1. Project Overview

| Field | Value |
|---|---|
| **Studio name** | `[YOUR_STUDIO_NAME]` |
| **Audience** | Swiss landscapers (Romandie focus) |
| **Promise** | Premium websites that generate qualified leads for craft-driven landscapers |
| **Differentiator** | Niche-only, transparent pricing, 90-day guarantee |
| **Tone** | Editorial, calm, confident, slightly poetic — never "tech bro" |
| **Visual direction** | Swiss minimalism with organic warmth. Generous whitespace, decisive typography, restrained motion |

---

## 2. Design System

### 2.1 Color Tokens

Pure 60 / 30 / 10 distribution. Use CSS variables.

```css
:root {
  /* 60% — Canvas */
  --color-bg: #efefef;
  --color-bg-elevated: #f6f6f6;

  /* 30% — Brand */
  --color-brand: #82cd9d;
  --color-brand-soft: #c1e5cc;    /* tints for backgrounds, hovers */
  --color-brand-light: #e8f5ed;   /* very soft brand wash */

  /* 10% — Depth */
  --color-ink: #396c5e;            /* primary text, dark sections */
  --color-ink-soft: #4d7d70;       /* secondary text */
  --color-ink-deep: #1d3a32;       /* dark inverted sections bg */

  /* Neutral support */
  --color-line: rgba(57, 108, 94, 0.12);
  --color-line-strong: rgba(57, 108, 94, 0.24);
  --color-muted: rgba(57, 108, 94, 0.6);
}
```

**Usage rule**: 60% of any viewport must be `--color-bg` (light). Brand green (`--color-brand`) is accent only — buttons, highlights, decorative elements. Deep ink (`--color-ink`) carries text and dark-inverted sections. Resist the urge to over-green.

### 2.2 Typography

**Display**: `Fraunces` (Google Fonts) — variable serif with optical sizing. Use Italic 300 for accent words, Roman 400/500 for headlines.
**Body**: `Geist` (Vercel) — clean modern grotesque, Swiss-feel.
**Mono**: `Geist Mono` — labels, timestamps, metrics, "01 / 02 / 03" markers.

> **Paid alternative (if budget allows)**: `PP Editorial New` (display) + `PP Neue Montreal` (body) from Pangram Pangram. Substantially more distinctive.

**Scale** (clamp-based, fluid):

```css
:root {
  --fs-display: clamp(3.5rem, 7vw, 7rem);     /* hero headline */
  --fs-h1: clamp(2.5rem, 4vw, 4rem);          /* section titles */
  --fs-h2: clamp(1.75rem, 2.5vw, 2.5rem);     /* card titles */
  --fs-h3: clamp(1.25rem, 1.5vw, 1.5rem);     /* sub headings */
  --fs-body: clamp(1rem, 1.1vw, 1.125rem);    /* paragraph */
  --fs-small: 0.875rem;                        /* captions, labels */
  --fs-micro: 0.75rem;                         /* eyebrow, mono labels */

  --lh-tight: 1.05;
  --lh-snug: 1.2;
  --lh-normal: 1.5;
  --lh-loose: 1.65;

  --ls-tight: -0.025em;
  --ls-normal: -0.01em;
  --ls-wide: 0.08em;     /* uppercase mono labels */
}
```

**Type rules**:
- Display headlines: Fraunces, weight 400, optical size 144, line-height 1.05, letter-spacing -0.03em
- Use **Fraunces Italic 300** for ONE accent word per headline (creates rhythm — e.g. "We build the *impossible*")
- Body: Geist 400, line-height 1.65, max-width 60ch
- Mono labels: Geist Mono 500, uppercase, letter-spacing 0.08em, font-size 12px

### 2.3 Spacing & Grid

**Grid**: 12 columns, max-width 1440px, gutter 24px desktop / 16px mobile, side padding 80px desktop / 24px mobile.

**Spacing scale** (8px base):

```css
:root {
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 16px;
  --space-4: 24px;
  --space-5: 32px;
  --space-6: 48px;
  --space-7: 64px;
  --space-8: 96px;
  --space-9: 128px;
  --space-10: 192px;

  --section-py: clamp(96px, 12vw, 192px);   /* vertical section padding */
}
```

**Section rhythm**: each section vertical padding = `--section-py`. Resist crammed sections — generous whitespace IS the Swiss feel.

### 2.4 Motion Principles

1. **Restraint over flash**. Every animation must earn its place.
2. **Eases**: prefer `expo.out`, `power3.out`, custom `cubic-bezier(0.65, 0, 0.35, 1)`. Avoid bouncy/elastic.
3. **Durations**: 0.4–0.8s for UI elements, 1–1.6s for hero load orchestration.
4. **Stagger**: 60–80ms between siblings.
5. **Scroll reveals**: trigger at `top 80%` of viewport, animate once.
6. **Reduce motion**: respect `prefers-reduced-motion`. All animations must have a static fallback.

### 2.5 Iconography & Imagery

- **Icons**: Lucide (open source, Swiss-aligned line weight 1.5px, 20–24px).
- **Photography**: high-contrast editorial. Landscape work, hands on plants, soft natural light. Avoid stock-photo cliché. If using AI imagery (Nano Banana / Flux), keep palette aligned with brand greens.
- **Imagery treatment**: subtle desaturation (-10%) and warmth (+5%) for cohesion across portfolio shots.

---

## 3. Tech Stack

### 3.1 Core

- **HTML5** semantic + **vanilla CSS** (custom properties) or **Tailwind** (configured to brand tokens)
- **JavaScript**: ES modules, no framework needed unless integrating CMS

### 3.2 Animation Libraries

```html
<!-- Required -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12/dist/ScrollTrigger.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12/dist/SplitText.min.js"></script>

<!-- Smooth scroll -->
<script src="https://cdn.jsdelivr.net/npm/lenis@1.1/dist/lenis.min.js"></script>
```

> **Note**: SplitText is a GSAP Club plugin (paid). Free alternative: write a tiny split-by-word/char utility, or use the open-source `splitting.js`.

### 3.3 Lenis + GSAP integration

```js
import Lenis from 'lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({ duration: 1.2, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add(time => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```

### 3.4 File structure

```
/
├── index.html
├── /assets
│   ├── /video
│   │   ├── flower.mp4
│   │   ├── flower.webm
│   │   └── flower-poster.webp
│   ├── /images
│   │   ├── /case-studies/...
│   │   ├── /logos/...
│   │   └── /process/...
│   └── /fonts (if self-hosting)
├── /css
│   ├── reset.css
│   ├── tokens.css
│   ├── base.css
│   └── sections/*.css
└── /js
    ├── main.js
    ├── lenis.js
    └── animations/*.js
```

---

## 4. Global Elements

### 4.1 Sticky Header

- Position: `fixed top: 0`, height 72px desktop / 64px mobile
- Background: `var(--color-bg)` with 80% opacity + `backdrop-filter: blur(20px)` once scrolled past 40px
- Left: logo mark + wordmark (12px gap)
- Center (desktop): nav links — *Work*, *Services*, *About*, *Journal* (Geist Mono, 14px, uppercase)
- Right: dark/light toggle (subtle, icon-only) + primary CTA *"Start a project →"* (pill button, `--color-ink` bg, white text, 14px)
- **Scroll behavior**: header background appears at 40px scroll. No hide-on-scroll-down (creates anxiety).

**GSAP**:
```js
ScrollTrigger.create({
  start: 'top -40',
  toggleClass: { className: 'is-scrolled', targets: 'header' }
});
```

### 4.2 Cursor (optional, recommended)

Custom cursor: 8px dot, mix-blend-mode difference. Scales to 32px on interactive elements with subtle delay (lerp). **Desktop only**, hidden on touch devices.

### 4.3 Grain overlay (optional)

A very subtle SVG noise overlay at 3% opacity, fixed position, pointer-events none. Adds film-like texture, prevents the bg from feeling sterile. Toggle on/off via CSS variable.

---

## 5. Sections

---

### 5.1 Hero

**Purpose**: 3-second hook. Promise the outcome. Show the magic (flower.mp4).

**Layout**:
- Height: `min(100vh, 900px)`, min 720px
- Grid: 12 cols. Left (cols 1–6): text cluster, vertically centered. Right (cols 7–12): video, bleeds to right edge of viewport.
- Top bar (under header, 80px below): eyebrow + metrics row
- Bottom-left: scroll indicator (small "Scroll" label + animated downward line)

**Copy** (edit here):

```
Eyebrow:    (CH) — WEB STUDIO FOR LANDSCAPERS

Headline:   We build the *impossible*
            for those who grow it.

Subtitle:   Websites built for Swiss landscapers.
            Designed to grow your business —
            not just your online presence.

Primary CTA:    Start a project →
Secondary CTA:  See our work

Metrics bar:    12 PROJECTS · 90 DAYS · 1 CONTACT · 24H REPLY
```

> *Italic word* = Fraunces Italic 300, in `--color-brand` (#82cd9d). The headline rhythm is the visual hook.

**Visual**:
- `flower.mp4` — autoplay, muted, playsinline, **no loop**. Freezes on last frame at 5s.
- Poster fallback: `flower-poster.webp` (extracted last frame)
- Video container: `object-fit: cover`, full bleed to right viewport edge, masked with a soft vertical gradient on its left edge (fade into bg over 80px)

**HTML skeleton**:

```html
<section class="hero">
  <div class="hero__inner">
    <div class="hero__text">
      <span class="eyebrow">(CH) — Web studio for landscapers</span>
      <h1 class="display">
        <span class="word">We</span>
        <span class="word">build</span>
        <span class="word">the</span>
        <span class="word italic accent">impossible</span>
        <span class="word">for those</span>
        <span class="word">who grow it.</span>
      </h1>
      <p class="lead">Websites built for Swiss landscapers. Designed to grow your business — not just your online presence.</p>
      <div class="hero__ctas">
        <a class="btn btn--primary" href="#contact">Start a project <span aria-hidden>→</span></a>
        <a class="btn btn--ghost" href="#work">See our work</a>
      </div>
    </div>
    <div class="hero__media">
      <video src="/assets/video/flower.mp4"
             poster="/assets/video/flower-poster.webp"
             autoplay muted playsinline preload="auto"></video>
    </div>
  </div>
  <div class="hero__metrics">
    <span><strong data-count="12">0</strong> Projects</span>
    <span><strong data-count="90">0</strong> Days</span>
    <span><strong data-count="1">0</strong> Contact</span>
    <span><strong data-count="24">0</strong>h Reply</span>
  </div>
  <a class="hero__scroll" href="#trust" aria-label="Scroll to next section">
    <span>Scroll</span>
    <span class="line"></span>
  </a>
</section>
```

**Animations (GSAP) — On Load**:

```js
const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

// Pre-state set in CSS: opacity 0, words masked

tl
  .to('header', { opacity: 1, duration: 0.4, delay: 0.1 })
  .to('.eyebrow', { clipPath: 'inset(0 0 0 0)', duration: 0.7 }, '-=0.2')
  .to('.hero__text .word', { yPercent: 0, duration: 0.9, stagger: 0.06 }, '-=0.4')
  .to('.lead', { opacity: 1, y: 0, duration: 0.6 }, '-=0.5')
  .to('.hero__ctas .btn', { opacity: 1, scale: 1, duration: 0.5, stagger: 0.08 }, '-=0.4')
  .to('.hero__metrics span', { opacity: 1, y: 0, duration: 0.5, stagger: 0.05 }, '-=0.3')
  .from('.hero__metrics strong', { textContent: 0, duration: 1.2, snap: { textContent: 1 }, stagger: 0.05, ease: 'power2.out' }, '<')
  .to('.hero__scroll', { opacity: 1, duration: 0.4 }, '-=0.2');

// Trigger video play in sync with text reveal
gsap.delayedCall(0.4, () => document.querySelector('.hero__media video').play());
```

**Animations (GSAP) — Parallax on scroll**:

```js
// Text scrolls UP faster than video (creates depth)
gsap.to('.hero__text', {
  yPercent: -25,
  ease: 'none',
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: 1
  }
});

// Video moves UP slower (background-like)
gsap.to('.hero__media', {
  yPercent: -10,
  ease: 'none',
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: 1
  }
});

// Subtle scale on video for depth
gsap.fromTo('.hero__media video',
  { scale: 1 },
  { scale: 1.08, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } }
);
```

**Notes**:
- Mobile (<768px): video stacks ABOVE text, both at normal scroll speed (no parallax — too jarring). Metrics become a 2×2 grid.
- Reduce-motion: skip word splits, fade-in everything in 0.4s. Video still autoplays unless explicitly disabled.
- Video freeze on last frame: see [§6 Asset Checklist](#6-asset-checklist) for the JS snippet.

---

### 5.2 Credibility Bar

**Purpose**: Instant trust. "Already working with real landscapers."

**Layout**:
- Section padding: 64px top / bottom
- Centered label *"TRUSTED BY SWISS LANDSCAPERS"* (mono, uppercase, 12px, `--color-muted`)
- Below: horizontal **infinite marquee** of 5–8 client logos. Speed: ~40s per loop. Pauses on hover.

**Copy**:

```
Label:    Trusted by Swiss landscapers
Logos:    [Jardins Dupont] [Paysage Müller] [VertCH] [Espaces Verts SA] [...]
```

**Visual**:
- Logos: SVG, mono-color (rendered in `--color-ink` at 50% opacity, full opacity on hover).
- Logo height: 32px max. Gap between logos: 80px.

**Animation (GSAP)**:

```js
// Infinite marquee using GSAP — no setInterval, smooth
const track = document.querySelector('.marquee__track');
gsap.to(track, {
  xPercent: -50,
  duration: 40,
  ease: 'none',
  repeat: -1
});
// Duplicate logos in the DOM so the loop is seamless
```

**Visual life add-on**: rotate the label slightly into the gutter, vertical text reading "01 / TRUST" as a margin marker (Swiss editorial touch).

---

### 5.3 Problem

**Purpose**: Speak directly to the prospect's frustration. Make them say "yes, that's me."

**Layout**:
- **Dark inverted**: background `--color-ink-deep` (#1d3a32), text `--color-bg`
- Section padding: `--section-py`
- Two-column intro (cols 1–6 left: section number + eyebrow + heading; cols 7–12 right: lead paragraph)
- Below: 3 pain points in a horizontal row (desktop) / stack (mobile). Each card has a number (01 / 02 / 03), heading, paragraph.

**Copy**:

```
Section marker:  02 / THE PROBLEM
Heading:         You craft outdoor spaces.
                 Your website is still *stuck in 2015*.

Lead:            Most Swiss landscapers lose qualified leads every week —
                 not because they're bad at what they do, but because their
                 online presence doesn't match the quality of their work.

Pain 01:         INVISIBLE ON GOOGLE
                 82% of homeowners search online before calling. If you're
                 not on page one for "paysagiste [your city]", you're not
                 in the conversation.

Pain 02:         GENERIC TEMPLATES
                 A Wix template from 2019 tells prospects you're cheap —
                 or worse, that you don't care about details. The opposite
                 of who you are.

Pain 03:         NO PROOF, NO PRICE
                 Beautiful projects buried three clicks deep. No idea what
                 things cost. Prospects bounce to whoever makes it easy.
```

**Visual life add-ons**:
- Each pain card has a thin animated divider line that draws in on scroll (1px, `--color-brand`, scaleX 0 → 1)
- Optional: a small dotted topographic pattern in the background (very subtle, opacity 4%) to nod at landscape architecture
- Number marker (01 / 02 / 03) is in Fraunces Italic, large (3rem), `--color-brand`

**Animation (GSAP)**:

```js
// Heading: split by line, reveal upward on scroll
ScrollTrigger.create({
  trigger: '.problem h2',
  start: 'top 75%',
  onEnter: () => {
    const split = new SplitText('.problem h2', { type: 'lines' });
    gsap.from(split.lines, { yPercent: 100, duration: 0.9, stagger: 0.08, ease: 'expo.out' });
  }
});

// Pain cards: fade up with stagger
gsap.from('.problem__card', {
  opacity: 0,
  y: 40,
  duration: 0.8,
  stagger: 0.12,
  ease: 'power3.out',
  scrollTrigger: { trigger: '.problem__grid', start: 'top 80%' }
});

// Draw the line under each card
gsap.from('.problem__card .divider', {
  scaleX: 0,
  duration: 0.8,
  stagger: 0.12,
  ease: 'power2.out',
  scrollTrigger: { trigger: '.problem__grid', start: 'top 75%' }
});
```

---

### 5.4 Services & Pricing

**Purpose**: Concrete offer + transparent prices in one breath. Three tiers, one featured.

**Layout**:
- Section padding: `--section-py`
- Header: section marker (03 / SERVICES) + heading + intro paragraph (cols 1–7)
- Optional right column (cols 9–12): a "How we choose" mini-block with 2-3 sentences guiding the visitor
- Below: 3 pricing cards in a row. Middle card is featured (slight scale, `--color-brand-light` background, label "Most popular").

**Copy**:

```
Section marker:  03 / SERVICES

Heading:         Three ways to *plant your roots* online.

Intro:           Transparent pricing. Clear timelines. No surprises.
                 Each package is built around what Swiss landscapers actually
                 need to win local clients.

— CARD 1 —
Tag:             ESSENTIAL
Title:           Showcase Site
Price:           CHF 3,900
Duration:        3 weeks
Description:     A beautiful 5-page website built around your work. Mobile-first, fast, SEO-ready.
Features:
  · Custom design (no templates)
  · 5 core pages
  · Local SEO foundations
  · Contact form + Google Maps
  · 1-year hosting included
CTA:             Choose Showcase →

— CARD 2 (FEATURED) —
Tag:             MOST POPULAR
Title:           Growth Site
Price:           CHF 5,900
Duration:        5 weeks
Description:     Everything in Showcase, plus a portfolio system, blog, and ongoing optimization for 3 months.
Features:
  · Portfolio with project pages
  · Blog / journal
  · Advanced local SEO
  · Google Business Profile setup
  · 3 months optimization included
CTA:             Choose Growth →

— CARD 3 —
Tag:             PARTNERSHIP
Title:           Growth Partnership
Price:           CHF 990 / month
Duration:        Ongoing
Description:     Your in-house digital team. Site, content, SEO, ads, photography — handled.
Features:
  · Everything in Growth
  · Quarterly seasonal content shoots
  · Monthly SEO + analytics report
  · Google Ads management
  · Priority support
CTA:             Talk to us →
```

**Visual life add-ons**:
- Each card has a subtle hover lift (-4px translateY, slight shadow)
- Featured card has a small "01" / "02" / "03" mono marker in the top-right corner
- Below the cards, a small reassurance row: *"All packages include: 90-day satisfaction guarantee · CHF, no hidden fees · Swiss hosting · Single point of contact"*
- Optional: an editorial side note in the gutter — *"Not sure which? Book a free 20-min call."*

**Animation (GSAP)**:

```js
// Cards rise from bottom on scroll
gsap.from('.service-card', {
  y: 60,
  opacity: 0,
  duration: 0.9,
  stagger: 0.1,
  ease: 'expo.out',
  scrollTrigger: { trigger: '.services__grid', start: 'top 80%' }
});

// Featured card gets a subtle pulse on initial reveal
gsap.from('.service-card--featured', {
  scale: 0.96,
  duration: 1.2,
  ease: 'expo.out',
  scrollTrigger: { trigger: '.services__grid', start: 'top 80%' }
});

// Magnetic CTA buttons (subtle)
document.querySelectorAll('.service-card .btn').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(btn, { x: x * 0.15, y: y * 0.15, duration: 0.4, ease: 'power3.out' });
  });
  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
  });
});
```

---

### 5.5 Case Studies

**Purpose**: Visual proof. Show the work. Embed testimonials inside each case (not a separate section).

**Layout**:
- Section padding: `--section-py`
- Header: section marker (04 / WORK) + heading
- 3 case studies, each as a full-width row. Alternating image-left / image-right (zigzag rhythm).
- Each case: large editorial image (12-col span on left or right, 7 cols on a single row) + text block with name, location, challenge, result, embedded quote.

**Copy** (placeholder — replace with real cases):

```
Section marker:  04 / SELECTED WORK
Heading:         Three landscapers.
                 Three different *roots*.

— CASE 01 —
Client:          Jardins Dupont
Location:        Lausanne, VD
Year:            2025
Tag:             SHOWCASE SITE
Image:           /assets/images/case-studies/dupont.webp

Challenge:       A family business with 30 years of work hidden in a folder.
Solution:        Editorial portfolio site with seasonal photography rotation.
Result:          +180% qualified leads in 6 months. First-page ranking for 4 keywords.

Quote:           "We finally have a site that looks like our gardens — not like everyone else's."
Attribution:     Marie Dupont, Co-founder

CTA:             Read the case →

— CASE 02 —
Client:          Paysage Müller
Location:        Neuchâtel, NE
Year:            2025
Tag:             GROWTH SITE
Image:           /assets/images/case-studies/muller.webp

Challenge:       New generation taking over, wanted to attract premium clients.
Solution:        Editorial site with blog, SEO content strategy, before/after sliders.
Result:          Average project value +35%. 2x quote requests per month.

Quote:           "I now spend less time chasing leads. The right ones come to us."
Attribution:     Lukas Müller, Director

CTA:             Read the case →

— CASE 03 —
Client:          VertCH
Location:        Geneva, GE
Year:            2026
Tag:             PARTNERSHIP
Image:           /assets/images/case-studies/vertch.webp

Challenge:       Strong reputation, weak digital presence. No time for marketing.
Solution:        Full partnership: site + monthly content + Google Ads + seasonal shoots.
Result:          From 3 to 12 inbound qualified leads per month in 90 days.

Quote:           "It feels like having a marketing team without the overhead."
Attribution:     Sophie Berger, Owner

CTA:             Read the case →
```

**Visual life add-ons**:
- **Image hover**: subtle `clip-path` reveal — image scales from 90% → 100% on enter
- **Parallax**: each case image has a slight Y-parallax on scroll (translate -10% over its viewport pass)
- **Quote**: rendered as a large pull-quote in Fraunces Italic, with two thin `--color-brand` quote marks
- **Tag chips**: rounded pill, `--color-brand-light` bg, `--color-ink` text
- **Result number**: large display-size, e.g. *"+180%"* in Fraunces, italic, brand-colored — anchors the eye

**Animation (GSAP)**:

```js
// Image clip-path reveal on enter
document.querySelectorAll('.case__image').forEach(img => {
  gsap.from(img, {
    clipPath: 'inset(20% 20% 20% 20%)',
    scale: 1.1,
    duration: 1.2,
    ease: 'expo.out',
    scrollTrigger: { trigger: img, start: 'top 85%' }
  });
});

// Image parallax (subtle, only the inner img element)
document.querySelectorAll('.case__image img').forEach(img => {
  gsap.to(img, {
    yPercent: -10,
    ease: 'none',
    scrollTrigger: { trigger: img, start: 'top bottom', end: 'bottom top', scrub: true }
  });
});

// Text block: split lines, stagger up
document.querySelectorAll('.case__text').forEach(block => {
  const split = new SplitText(block.querySelector('h3'), { type: 'lines' });
  gsap.from(split.lines, {
    yPercent: 100,
    duration: 0.9,
    stagger: 0.08,
    ease: 'expo.out',
    scrollTrigger: { trigger: block, start: 'top 80%' }
  });
});

// Big result number counter
document.querySelectorAll('.case__result-number').forEach(el => {
  gsap.from(el, {
    textContent: 0,
    duration: 1.4,
    snap: { textContent: 1 },
    ease: 'power2.out',
    scrollTrigger: { trigger: el, start: 'top 80%' }
  });
});
```

**Visual life add-on — section divider**: between case 2 and case 3, insert a thin horizontal slider/marquee of small detail shots (close-ups of plants, tools, textures) at 80px height, slowly drifting. Adds editorial rhythm without weight.

---

### 5.6 Why Us + Final CTA

**Purpose**: Final conviction layer. Pin the differentiator while the proof scrolls past. End with the action.

**Layout**:
- **Dark inverted**: background `--color-ink-deep`, text `--color-bg`
- Section padding: `--section-py`
- **Sticky left column** (cols 1–5, sticks at top:120px): section marker (05 / WHY US) + bold claim + 4 trust badges stacked
- **Scrolling right column** (cols 7–12): the 3-step process + 90-day guarantee block + final CTA

**Copy — Left (sticky)**:

```
Section marker:  05 / WHY US

Claim:           We work with *landscapers only*.
                 So we know what works.

Trust badges (stacked, small, mono labels with icons):
  · 100% Swiss. Based in Romandie.
  · Niche-only studio. Landscapers only.
  · One contact. From brief to launch.
  · 90-day satisfaction guarantee.
```

**Copy — Right (scrolling)**:

```
Sub-heading:   How it works

Step 01:       DISCOVERY CALL — 30 min, free
               We listen, you talk shop. We map your goals,
               your audience and what we can realistically promise.

Step 02:       DESIGN & BUILD — 3 to 5 weeks
               One designer, one developer. Weekly previews.
               You sign off at each stage. No surprises.

Step 03:       LAUNCH & GROW — Ongoing
               We don't ghost you after go-live. 90 days of
               optimization included. Real humans, real replies.

— Guarantee block (highlighted card) —
Label:         90-DAY GUARANTEE
Title:         If it doesn't grow your business, we keep working until it does.
Body:          Within 90 days of launch, if you haven't seen measurable
               improvement in qualified leads, we extend the engagement
               at no cost — until the numbers move.

— Final CTA —
Title:         Ready to *plant the seed*?
Body:          Book a free 20-minute discovery call. We'll tell you
               within the hour whether we're a good fit.

CTA primary:   Book a discovery call →
CTA secondary: Or write us — hello@[studio].ch

Signature:     [Your photo, 64px circular] + "[Your name], founder"
```

**Visual life add-ons**:
- Trust badges: each preceded by a small `--color-brand` dot that animates in (scale 0 → 1) on scroll
- Process steps: each step has a large mono number (01 / 02 / 03) in `--color-brand`, with a thin vertical line connecting them (draws in on scroll)
- Guarantee block: subtle border in `--color-brand`, slight inset shadow, rounded 16px
- Final CTA: founder's photo creates the human moment — critical for Swiss B2B trust

**Animation (GSAP)**:

```js
// Pin the left column
ScrollTrigger.create({
  trigger: '.why-us__inner',
  start: 'top 120',
  end: 'bottom bottom',
  pin: '.why-us__sticky',
  pinSpacing: false
});

// Trust badges: dots + text reveal on scroll
gsap.from('.trust-badge', {
  x: -20,
  opacity: 0,
  duration: 0.6,
  stagger: 0.1,
  ease: 'power3.out',
  scrollTrigger: { trigger: '.why-us__sticky', start: 'top 70%' }
});

gsap.from('.trust-badge__dot', {
  scale: 0,
  duration: 0.4,
  stagger: 0.1,
  ease: 'back.out(2)',
  scrollTrigger: { trigger: '.why-us__sticky', start: 'top 70%' }
});

// Process: each step reveals as it enters, vertical line draws progressively
gsap.from('.process__step', {
  y: 40,
  opacity: 0,
  duration: 0.8,
  stagger: 0.15,
  ease: 'expo.out',
  scrollTrigger: { trigger: '.process', start: 'top 75%' }
});

gsap.to('.process__line', {
  scaleY: 1,
  duration: 1.4,
  ease: 'power2.inOut',
  scrollTrigger: { trigger: '.process', start: 'top 75%' }
});

// Guarantee block: scale-in with slight emphasis
gsap.from('.guarantee', {
  scale: 0.95,
  opacity: 0,
  duration: 1,
  ease: 'expo.out',
  scrollTrigger: { trigger: '.guarantee', start: 'top 80%' }
});

// Final CTA: magnetic button (reuse helper from services)
```

---

### 5.7 Footer

**Purpose**: Reassurance and navigation. Quiet but complete.

**Layout**:
- Background: `--color-bg` (same as canvas, no inversion — feels like a soft landing)
- Section padding: 96px top / 40px bottom
- Three columns:
  - Col 1: studio mark + tagline + address
  - Col 2: nav links (Work, Services, Journal, About, Contact)
  - Col 3: socials (LinkedIn, Instagram) + newsletter form (single email input + arrow button)

**Copy**:

```
Tagline:         Web studio for Swiss landscapers.
Address:         Rue de la Treille 2 · 2000 Neuchâtel · Switzerland

Newsletter:      Get one editorial email every season.
                 No spam. Unsubscribe anytime.
Input:           your@email.com →

Legal row:       © 2026 [Studio Name] · Privacy · Terms · Imprint
                 Built with care in Switzerland.
```

**Visual life add-on**:
- Big background wordmark: studio name in `--color-line` (very faint), positioned bottom-right, slightly cropped by the viewport edge. Scales fluidly with viewport. A signature Swiss editorial move.
- Optional: a 1px line that slowly draws across the top of the footer on scroll into view.

**Animation (GSAP)**:

```js
// Background wordmark fades up on enter
gsap.from('.footer__wordmark', {
  y: 80,
  opacity: 0,
  duration: 1.4,
  ease: 'expo.out',
  scrollTrigger: { trigger: '.footer', start: 'top 80%' }
});

// Top line draws in
gsap.from('.footer__topline', {
  scaleX: 0,
  duration: 1.2,
  ease: 'power2.inOut',
  transformOrigin: 'left center',
  scrollTrigger: { trigger: '.footer', start: 'top 90%' }
});
```

---

## 6. Asset Checklist

| Asset | Format | Notes |
|---|---|---|
| `flower.mp4` | MP4 H.264, 5s, 1920×1080 | Hero video, no loop, no audio. Compress to <2MB. |
| `flower.webm` | WebM VP9 | Fallback for modern browsers |
| `flower-poster.webp` | WebP, 1920×1080 | Last frame of flower.mp4. Use as `poster` attribute and as static fallback. Extract via: `ffmpeg -sseof -0.05 -i flower.mp4 -vframes 1 flower-poster.webp` |
| Case study images | WebP, 1600px wide | 3 hero shots + 3 detail shots, editorial style |
| Client logos | SVG, mono-color | 5–8 logos, optimized, single color (`currentColor`) |
| Founder photo | WebP, 256×256 | Circular crop, soft natural light |
| Favicon | ICO + SVG | Studio mark, simple and recognizable |
| Open Graph image | PNG/JPG, 1200×630 | Hero composition |

**JS snippet — freeze video on last frame**:

```js
const heroVideo = document.querySelector('.hero__media video');
heroVideo.addEventListener('ended', () => {
  heroVideo.pause();
  heroVideo.currentTime = heroVideo.duration - 0.05;
});
```

---

## 7. Performance & Accessibility

### 7.1 Performance targets

- **LCP**: < 2.0s (hero image/video loads first, optimized poster)
- **CLS**: < 0.05 (reserve all space for media via aspect-ratio)
- **TBT**: < 200ms (defer non-critical JS, GSAP loads async after DOMContentLoaded)
- **Total page weight**: < 1.5 MB on first load
- Lazy-load all below-the-fold images (`loading="lazy"`, `fetchpriority="low"`)
- Hero video: `preload="auto"` only on desktop; on mobile, `preload="metadata"` and show poster until tap

### 7.2 Accessibility

- All animations honor `prefers-reduced-motion: reduce` — provide CSS fallback that skips transforms and clip-paths
- All interactive elements have visible focus states (2px outline, `--color-brand`, offset 4px)
- Color contrast: text on `--color-bg` (`#efefef`) uses `--color-ink` (`#396c5e`) → ratio ≈ 5.8:1 ✓
- Dark sections: white text on `--color-ink-deep` (#1d3a32) → ratio ≈ 12:1 ✓
- Headings follow logical order (h1 in hero, h2 per section, no skips)
- Video has `aria-label` and a `Pause animation` toggle for users who want to stop motion
- Form inputs labeled, error states visible, never color-only

### 7.3 SEO foundations

- One `<h1>` per page (hero)
- Schema.org `LocalBusiness` + `WebDesignAgency` JSON-LD
- Meta description ≤ 155 chars
- Open Graph + Twitter Card tags
- Sitemap.xml + robots.txt
- Self-host fonts (no Google Fonts CDN) for better performance + GDPR

---

## 8. Editorial Notes

### 8.1 Voice & tone

- **Confident but quiet**: never shout. The work shouts for you.
- **Specific over generic**: "Lausanne landscapers" beats "local businesses".
- **Numbers earn trust**: replace "many clients" with "12 projects in 18 months".
- **Avoid jargon**: no "synergies", "leverage", "ROI-driven solutions". Talk like a person.

### 8.2 Italic accent rule

In every headline, **exactly one word** is set in Fraunces Italic 300, color `--color-brand`. This creates a consistent visual rhythm across the site. Examples:

- "We build the *impossible* for those who grow it."
- "Three ways to *plant your roots* online."
- "We work with *landscapers only*."
- "Ready to *plant the seed*?"

### 8.3 Section markers

Each section starts with a mono uppercase marker: `01 / TRUST`, `02 / THE PROBLEM`, etc. These create wayfinding and add Swiss-editorial weight. Position: top-left of the section, 24px above the heading.

### 8.4 What NOT to do

- ❌ No gradient backgrounds (especially purple). Solid colors only.
- ❌ No stock photography. Either real client work, real founder photo, or none.
- ❌ No emoji in headlines (a small Swiss flag in the footer is the only exception).
- ❌ No "Get started today!" CTAs. Use specific verbs: *Book a call*, *See the work*, *Start a project*.
- ❌ No carousel of testimonials. Embed quotes inside their case study where they have context.
- ❌ No three-line paragraphs of meaningless brand-speak. Each sentence earns its place.

### 8.5 Future iterations

- **Journal**: lightweight blog with seasonal essays — keeps SEO fresh and ties to landscaper seasonality
- **Case study detail pages**: long-form scrollytelling for each project
- **Localization**: FR primary, DE + EN secondary for German Switzerland and international landscape architects

---

**End of spec.**

> Edit any section above. Color tokens and copy are isolated for easy customization. Animation specs are working snippets — copy them into `/js/animations/[section].js` and import in `main.js`.
