# Design

<!-- impeccable:design-schema 1 -->

## Site structure

Multi-page site (converted from a single-page scroll site per user request). Routes live under a shared pathless layout (`src/routes/_layout.tsx`, header + outlet + footer) with one file per page in `src/routes/_layout/`:

- `/` — Hero + `Stats` + `TrustMarquee` + `ProcessInMotion` + `ExploreLinks`.
  - `TrustMarquee`: a full-bleed `brand-gradient` band with real facts (years in business, BBB accreditation, Yelp rating, services) scrolling in an infinite CSS-keyframe loop (`animate-marquee` in `styles.css`), pausing on hover and disabled under `prefers-reduced-motion`.
  - `ProcessInMotion`: a scroll-driven "reactive video" moment (user request: "something more like a video... but reactive") — no fabricated footage was used; it's built from the one real garage photo already on the site (`hero-garage.jpg`) plus Framer Motion's `useScroll`/`useTransform`. A `position: sticky` viewport-height stage pins while the wrapping `h-[300vh]` section scrolls past; scroll progress drives a photo zoom and counter-parallax (1.18 → 1 with a ±4% Y drift, both skipped under `prefers-reduced-motion`) and steps through the same three real process steps as `/process` (shared via `PROCESS_STEPS` in `shop.ts`, consumed by both `Process.tsx` and this component so they can't drift), highlighting the active one and filling a bottom progress bar like a video scrubber. Pure CSS `position: sticky` + passive scroll-progress reads — no scroll-hijacking, keyboard/wheel scrolling behaves normally throughout.

  Rebuilt 2026-08-18 after the user called the section "basic": scroll progress now runs through a `useSpring` so the zoom, parallax, rail and scrubber all ease rather than tracking the wheel step-for-step. The bare numbered badges became per-step lucide icons (`CalendarCheck` / `ClipboardList` / `KeyRound`) on a vertical timeline rail whose `brand-gradient` fill scales with scroll, giving the steps a spine instead of leaving them floating. Each step carries a third line (`detail` in `PROCESS_STEPS`) naming the concrete commitment — same-day drop-off, nothing fixed before you approve, free loaner cars. Past steps hold a lit-but-quiet state (`bg-white/20`) distinct from not-yet-reached (`bg-white/10`), so the rail reads as progress rather than as on/off. Step copy fades on opacity only; it is never height-collapsed, so the layout does not jump as the active step changes.
  - `ExploreLinks`: a divided-list nav into the other five pages, styled distinctly from every other section's list treatment.
- `/why-us`, `/services`, `/process`, `/reviews`, `/contact` — each pairs a `PageHeader` (`h1` + one-line orienting description; the breadcrumb was removed — it repeated the `h1` immediately below it, e.g. "Home / Contact" directly above "Contact") with the pre-existing section component, then a page-specific enrichment so the sub-pages read as informative rather than thin:
  - Why Us, Services, Process, Contact each end in an `FAQSection` (built on the pre-existing, previously-unused shadcn `Accordion`) — every Q&A is grounded in facts already established elsewhere on the site (hours, written estimates, loaner cars, insurance coordination), nothing invented for length.
  - Reviews gained a fourth real highlight ("Fair, honest pricing," from the same businessyab.com review research as the other highlights) and a "Leave a review on Yelp" CTA linking to the verified Yelp listing (`SHOP.yelpUrl`).
  - Contact gained a real Google Maps embed (`SHOP.mapsEmbedUrl`/`mapsUrl`, the shop's actual verified address, no API key needed) plus its own FAQ.

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

The hero photo is now **full-bleed across the entire hero section** (user directive, 2026-08-18), replacing the earlier contained/framed card treatment. `src/assets/hero-garage.jpg` fills the section as an absolutely-positioned `object-cover` layer; all hero content sits on top of it in a single left-aligned column.

Two stacked scrims make the dark photo carry legible text without washing it out — a horizontal `from-black/85 via-black/55 to-black/15` (anchoring the text column at left, letting the lit car breathe at right) plus a vertical `from-black/70 via-transparent to-black/35` for top and bottom edges. This is the opposite conclusion from the earlier pass, and it works here because the section is dark-on-dark rather than a dark photo bled onto a white page.

The section is `min-h-[100svh] flex items-center` so the hero occupies exactly one viewport. On mobile it also carries `pb-[6.5rem]` because the fixed action bar overlays the viewport — without it the last content row renders underneath the bar.

## Color on dark surfaces

The signage red (`--primary`, oklch 0.48) is tuned for the white ground and measures only **2.4:1** on the dark hero/process photos — below WCAG's 3:1 non-text floor. `--primary-on-dark` (oklch 0.66 0.19 25) is the lifted tint of the same hue for brand-red marks on dark surfaces, measured at **4.9:1** over the composited photo. Every accent inside `Hero` and `ProcessInMotion` uses it: the headline accent span, service-list dots, star ratings, badge and caption icons, the step counter, and step detail lines. Filled `brand-gradient` surfaces are unaffected — they carry white text and were already compliant.

## Live open/closed status

`getOpenStatus()` in `shop.ts` derives open/closed state and the next opening time from the real posted hours (`HOURS_BY_DAY`), so the status can never drift from the hours listed in the footer. `OpenStatus.tsx` renders it with a pulsing dot, re-checking every 60s, and takes a `light` prop for dark grounds. It appears in the hero (desktop only), the footer, and the mobile action bar. The dot uses `--open` / `--open-on-dark` — deliberately outside the brand red so "open" never reads as an alert state.

## Conversion surfaces

- `MobileActionBar.tsx`: a fixed bottom bar on mobile carrying the live status plus paired Call / Book actions, replacing the previous single circular call FAB. The layout root adds `pb-28 sm:pb-0` so page content clears it. Because Call is permanently one thumb away, the hero's secondary phone CTA is hidden below `sm`.
- `Stats.tsx`: a four-cell divided row between Hero and TrustMarquee, count-up animated on first view via `useInView` (respects `prefers-reduced-motion`, and the founding year renders unanimated since a counting year reads as nonsense). Every figure comes from `SHOP` — no invented numbers.

## Logo

`BrandLogo.tsx` preloads `public/canton-logo.png` (the shop's real signage wordmark) via an off-DOM `Image` and only swaps in the `<img>` once it actually decodes. The earlier `onError` approach flashed a broken-image box with the alt text sprawled across the header on every load while the file is missing. Until the file is supplied, the text lockup (badge + name) is what ships; it takes a `light` prop for the dark hero.

## Accessibility

WCAG AA: body/UI text ≥4.5:1 (foreground/muted-foreground pairs measured 6.7–17:1), non-text UI (borders/inputs) ≥3:1 (measured 3.2–3.9:1 after correction), visible `focus-visible` rings on every custom interactive element (buttons, links, form fields) sized/offset for keyboard use, tap targets sized for touch.

## Known deferred items

- `codex-grid-background` (advisory, `detect.mjs`): the hairline grid-line texture now only backs `PageHeader` on the sub-pages — the Hero dropped it when the photo went full-bleed. Kept as a pre-existing atmospheric detail; replacing it with product-specific texture remains out of scope.
- Real logo file not yet placed at `public/canton-logo.png` — this is the only 404 on the site, and `BrandLogo` renders its text lockup until the file lands.
- The site still has one photograph. The full-bleed hero and the `ProcessInMotion` stage both run on `hero-garage.jpg`, so the same image appears twice on the home page. Real photos of the bays, the collision work, and a finished restoration would let each surface carry its own subject; that needs assets only the shop can supply.
