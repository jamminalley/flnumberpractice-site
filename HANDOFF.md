# Handoff — FL Number Practice marketing site

A small static site for the iOS app. Mobile-first, hand-coded HTML/CSS. No build step, no framework, no JavaScript required at runtime.

## Status as of 2026-05-26

**All 14 cheat sheets are now live.** Every language tile on the cheatsheets index links to a real page (no `#` placeholders remain). The site is deployed via GitHub Pages on the `jamminalley/flnumberpractice-site` repo and served from the custom domain **https://flnumberpractice.com** (DNS already wired up, CNAME committed). Every push to `main` auto-deploys.

### Live pages and URLs

| Language | URL slug | Notes |
|---|---|---|
| Português (Portugal) | `/portuguese-pt/` | Latin script |
| Português (Brasil) | `/portuguese-br/` | Latin script |
| Español | `/spanish/` | Latin script |
| Français | `/french/` | Latin script |
| Italiano | `/italian/` | Latin script |
| Deutsch | `/german/` | Latin script |
| Nederlands | `/dutch/` | Latin script |
| English | `/english/` | Latin script |
| Русский | `/russian/` | Cyrillic + BGN/PCGN romanization, Noto Serif |
| 日本語 | `/japanese/` | Hiragana/Kanji + Hepburn romanization, Noto Serif JP |
| 한국어 | `/korean/` | Hangul + revised romanization, Noto Serif KR |
| 中文 | `/mandarin/` | Simplified Chinese + pinyin with tones, Noto Serif SC |
| العربية | `/arabic/` | RTL Arabic + simple romanization, Noto Naskh Arabic |
| Bahasa Indonesia | `/indonesian/` | Latin script |

All pages link to each other via a sticky "language rail" sidebar (desktop only, ≥1100px) and via the footer's "Cheat sheets" column. The cheatsheets index at `/cheatsheets/` is the canonical "all languages" view.

### Deep-linking from the iOS app

URL slugs are stable. If the app needs to link out to a specific cheat sheet, use `https://flnumberpractice.com/<slug>/` (trailing slash matters on GitHub Pages). The slugs in the table above are guaranteed to keep working.

### What's still TODO (unchanged from original handoff)

- **App Store link** in landing CTA and footer still goes to `#` — replace with the real URL once the app ships.
- **Privacy / Terms** footer links go to `#` — write those pages when ready.
- **No Open Graph tags** on any page yet. Worth adding to each `<head>` before sharing the site widely. The icon at `AppIcon-1024.png` is the obvious og:image.

The rest of the doc below describes the design system, cloning conventions, and accessibility notes — **still accurate** and useful if the app needs to match the site's visual identity. The "What's NOT done" section listing 11 remaining sheets is now obsolete (all built).

## File tree

```
site/
  site.css              ← shared design system (tokens, type, layout)
  index.html            ← landing page
  cheatsheets.html      ← cheat-sheets index (14 languages, grouped by family)
  portuguese-pt.html    ← detail page · Português (Portugal)
  japanese.html         ← detail page · 日本語
  arabic.html           ← detail page · العربية
  AppIcon-1024.png      ← shared icon asset
```

## What's done

- **Landing.** Hero, "how it works" (3 steps), two-modes section, cheat-sheet teaser strip, about, download CTA, footer.
- **Index.** Languages grouped by family (Romance, Germanic, Slavic, CJK, Semitic + Other), search bar, filter chips, 14 tiles. Featured tile (Portuguese) styled dark.
- **3 full cheat sheets:** Portuguese (PT), Japanese (with romaji), Arabic (with simple romanization, RTL native blocks, dual digit systems).

## What's NOT done (intentional — placeholder)

- The other 11 cheat sheets (links go to `#` or to the index). Each one should be cloned from the existing template per the rules below.
- The App Store link goes to `#` — replace with the real URL once it's live.
- Footer "Privacy" and "Terms" links go to `#` — write these pages when you're ready.
- No real domain wired up.

## Design system

Don't redefine these — they live in `site/site.css` as CSS custom properties:

| Token            | Value           | Purpose                                            |
|------------------|-----------------|----------------------------------------------------|
| `--paper`        | `#F1ECE0`       | page background (matches the app)                  |
| `--paper-raised` | `#FAF6EC`       | card surfaces                                      |
| `--paper-sunk`   | `#E8E1D2`       | chip / tag surfaces                                |
| `--ink`          | `#15110A`       | text + dark hero cards                             |
| `--ink-soft`     | 62% ink         | secondary copy                                     |
| `--ink-faint`    | 28% ink         | tertiary, very quiet                               |
| `--hair`         | 14% ink         | hairline borders                                   |
| `--signal-red`   | `#D63A2F`       | the one accent — primary CTA, irregulars, accent   |
| `--ok-green`     | `#2E6B3E`       | correct / success                                  |
| `--error-red`    | `#A02A1F`       | wrong / destructive                                |

Fonts (loaded from Google Fonts in each `<head>`):

- **Space Grotesk** (400/500/600/700) — body / UI
- **Instrument Serif** (regular + italic) — large display, page titles, italic flourishes
- **JetBrains Mono** (400/500/700/800) — numerals, transliterations, the mono "º" mark
- **Noto Serif JP** — Japanese native script (japanese.html only)
- **Noto Naskh Arabic** — Arabic native script (arabic.html only)

Breakpoints: mobile-first → `720px` (tablet) → `1100px` (desktop). They're declared in `site.css`.

## Cloning a new cheat sheet

Copy `site/portuguese-pt.html` as the base when the target language uses Latin script. Copy `site/japanese.html` (CJK pattern) or `site/arabic.html` (RTL pattern + dual digits) when not.

For each cheat sheet, populate:

1. `<title>` + `lang` attribute on `<html>`
2. The breadcrumb + hero card (language family eyebrow, native-script name, romanization for the eyebrow subtitle, stats row, hero display: digit + native + romanization)
3. Each `<section class="sec">` — bump the section number, write the heading and blurb, fill the `.nums` grid with `.ncard` (or `.ncard.irreg` for irregulars / red highlight)
4. The "Things to remember" section — keep the same numbered card pattern
5. The sticky language rail (`<aside class="toc-side">` → `.lang-rail`) — mark the current page with `class="active"`
6. The footer's "Cheat sheets" column — add the new page

### Number card markup

```html
<div class="ncard">
  <div class="n">42</div>
  <div class="w">setenta e dois</div>
</div>
```

For non-Latin scripts, add a romanization line:

```html
<div class="ncard">
  <div class="n">42</div>
  <div class="w">四十二</div>
  <div class="r">yon-jū-ni</div>
</div>
```

For Arabic, show both digit systems:

```html
<div class="ncard">
  <div class="n">42 <span class="east">٤٢</span></div>
  <div class="w">اثنان وأربعون</div>
  <div class="r">ithnān wa-arbaʿūn</div>
</div>
```

For irregulars (filled red tile):

```html
<div class="ncard irreg">
  <span class="badge">irregular</span>
  <div class="n">500</div>
  <div class="w">quinhentos</div>
</div>
```

For a full-width emphasis card (good for "in the wild" example numbers):

```html
<div class="ncard wide">
  <div class="n">763</div>
  <div class="w">setecentos <span class="ein">e</span> sessenta <span class="ein">e</span> três</div>
</div>
```

### Romanization systems committed

| Language | System                                    |
|----------|-------------------------------------------|
| Japanese | Hepburn (`yon-jū-ni`)                     |
| Korean   | Revised Romanization (`sasibi`)           |
| Mandarin | Hanyu Pinyin with tone marks (`sìshí èr`) |
| Arabic   | Simple romanization, no diacritics on macrons (`ithnān wa-arbaʿūn`) |
| Russian  | BGN/PCGN (`sorok dva`)                    |

Stress marks (acute accent) only on tens / irregulars where the stress is unpredictable from the spelling.

## Deployment

Drop the `site/` folder onto any static host (Vercel, Netlify, Cloudflare Pages, GitHub Pages, S3). No build step.

Tip: when you have the real domain, update the `<meta name="description">` and add Open Graph tags to each `<head>`. The icon at `site/AppIcon-1024.png` is the obvious og:image.

## Accessibility notes

- Headings cascade correctly (one `h1` per page, then `h2`/`h3`).
- All interactive elements have visible `:focus-visible` outlines (red, offset 3px).
- The hero card and dark CTAs hit AA contrast against the accent red.
- Arabic native-script blocks use `direction: rtl; unicode-bidi: isolate;` so RTL doesn't leak into surrounding LTR copy.
- The sticky TOC works fine with screen readers — it's a normal `<nav>` with anchor links.

## Things I'd consider for v2

- Print stylesheet so people can print a single cheat sheet cleanly.
- A simple per-section URL fragment scrollspy that highlights the current section in the TOC.
- A "copy table to clipboard" button at the end of each number group.

None of these are blockers.
