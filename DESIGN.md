# Design

<!-- impeccable:design-schema 1 -->

## Site structure

Multi-page site (converted from a single-page scroll site per user request). Routes live under a shared pathless layout (`src/routes/_layout.tsx`, header + outlet + footer) with one file per page in `src/routes/_layout/`:

- `/` — Hero + `TrustMarquee` + `ProcessInMotion` + `ExploreLinks`.
  - `TrustMarquee`: a full-bleed `brand-gradient` band with real facts (years in business, BBB accreditation, Yelp rating, services) scrolling in an infinite CSS-keyframe loop (`animate-marquee` in `styles.css`), pausing on hover and disabled under `prefers-reduced-motion`.
  - `ProcessInMotion`: a scroll-driven "reactive video" moment (user request: "something more like a video... but reactive") — no fabricated footage was used; it's built from the one real garage photo already on the site (`hero-garage.jpg`) plus Framer Motion's `useScroll`/`useTransform`. A `position: sticky` viewport-height stage pins while the wrapping `h-[240vh]` section scrolls past; scroll progress drives a slow photo zoom (1.15 → 1, skipped under `prefers-reduced-motion`) and steps through the same three real process steps as `/process` (now shared via `PROCESS_STEPS` in `shop.ts`, consumed by both `Process.tsx` and this component so they can't drift), highlighting the active one and filling a bottom progress bar like a video scrubber. Pure CSS `position: sticky` + passive scroll-progress reads — no scroll-hijacking, keyboard/wheel scrolling behaves normally throughout.
  - `ExploreLinks`: a divided-list nav into the other five pages, styled distinctly from every other section's list treatment.
- `/why-us`, `/services`, `/process`, `/reviews`, `/contact` — each pairs a `PageHeader` (breadcrumb + `h1` + one-line orienting description, not a restatement of the section's own heading) with the pre-existing section component for that content

`NAV` in `shop.ts` is the single source of truth for labels, route paths, and one-line descriptions — both the header/footer nav and the home page's `ExploreLinks` read from it. Header/footer nav links use TanStack Router's `Link` (not `<a href="#...">`) with `activeProps` so the current page highlights in `text-primary`, on both desktop and mobile nav.

## World

Clean shop-white surface with the shop's own signage red as the sole accent (Restrained color strategy — neutrals plus one accent). Replaces the prior dark-garage-charcoal + ember-orange system. The red is tuned to match the real Canton Auto logo (`public/canton-logo.png`), not picked independently — the logo is the color's source of truth.

## Palette

All tokens in `src/styles.css`, oklch, referenced only by CSS custom property — never hardcoded in components.

- `--background` / `--card` / `--popover`: near-white, warm-neutral hue (oklch ~0.995–1 L, hue 40)
- `--foreground`: near-black warm charcoal (oklch 0.225 L, hue 25) — 17:1 on background
- `--surface` / `--surface-2`: off-white panel tones for subtle layering without a hard color break
- `--primary` / `--accent` / `--ring`: deep signage red (oklch 0.48 L, chroma 0.205, hue 23) — 6.9:1 on background, 6.8:1ᵉ for white text on it
- `--destructive`: distinct orange-red (hue 45) so error states don't read as brand-colored
- `--border` / `--input`: oklch 0.65 / 0.60 L — tuned to clear WCAG 1.4.11's 3:1 non-text contrast against the white background (the original draft at 0.89 L failed at 1.4:1; corrected via measured canvas-based contrast checks, not eyeballing)
- `--gradient-brand`: diagonal red gradient for filled CTA surfaces only (buttons, logo-mark fallback, floating call button) — never for text
- `--shadow-elevated` / `--shadow-brand`: soft, low-opacity shadows tuned for a white ground (dark neutral / red respectively)

## Type

Sora (display/headings), Manrope (body) — unchanged from the incumbent system; not part of this pass's brief.

## Component language

- CTAs: full pill (`rounded-full`), `brand-gradient` fill for primary actions, outlined `border-border` for secondary
- Trust badge (hero pill): the one legitimate bordered pill on the page — a single credibility badge, not a repeated grid
- No kicker/eyebrow labels above section headings (removed per craft-floor ban — headings carry their own weight)
- No gradient text (removed per craft-floor ban — emphasis is weight/size + solid `text-primary`, not a gradient clip)
- **No boxed icon+heading+text card grids** (removed per craft-floor ban on "cards as the lazy container," and per direct user request to stop repeating one boxy template): each content section now has its own distinct, box-free treatment instead of the same bordered/shadowed rounded-rectangle repeated everywhere —
  - Hero service tags: flowing text list with dot separators, no pills/borders
  - Why Us points: single-column divided list (`divide-y`), icon left, text right
  - Services: open 2-column icon+text grid, bare colored icon (no icon container), no borders, no dividers
  - Process steps: filled circular numbered badges (`brand-gradient`) — numbering is earned here since the steps are genuinely sequential, unlike the banned default use of `01/02/03`
  - Testimonials: column-divided quote wall (`divide-x` on desktop, `divide-y` stacked on mobile), oversized light quote-mark icon, no card background
  - Testimonials rating/BBB badges: converted from bordered pills to plain inline icon+text
- Ghost sequence numbers, where still used, favor `text-foreground/[0.08]` over a surface token so the watermark stays visible on a light card regardless of theme lightness

## Hero image

Full-bleed background-photo-with-white-wash was replaced with a contained, framed treatment: the shop's real garage photo (`src/assets/hero-garage.jpg`, deliberately dark/moody) sits in its own rounded card on the right (mobile: stacked below the text), with a `brand-gradient` accent block offset behind it for depth and a bottom scrim + caption line over the photo itself. The previous full-bleed wash treatment washed a dark photo down to near-invisibility on a white background — a photo this dark needs to be a contained subject, not a bled-out background.

## Logo

`BrandLogo.tsx` renders `public/canton-logo.png` (the shop's real signage wordmark) and falls back to a text lockup (badge + name) via `onError` if the file is absent — the file was not available to place programmatically in this pass and needs to be supplied.

## Accessibility

WCAG AA: body/UI text ≥4.5:1 (foreground/muted-foreground pairs measured 6.7–17:1), non-text UI (borders/inputs) ≥3:1 (measured 3.2–3.9:1 after correction), visible `focus-visible` rings on every custom interactive element (buttons, links, form fields) sized/offset for keyboard use, tap targets sized for touch.

## Known deferred items

- `codex-grid-background` (advisory, `detect.mjs`): the hairline grid-line texture behind Hero/Process is a pre-existing atmospheric detail, kept as-is — replacing it with product-specific texture is out of this pass's scope (visual restyle + reorder, not a structural rebuild).
- Real logo file not yet placed at `public/canton-logo.png`.
