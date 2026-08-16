# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Car owners in and around Canton, MA who need auto repair, collision/auto body work, classic car restoration, or routine maintenance. They arrive deciding whether to trust this shop with their vehicle and want to book a service or get a quote quickly.

## Product Purpose

Canton Auto Services & Auto Body's marketing site converts visitors into booked appointments or callback requests. Success is a phone call, an online booking, or a submitted callback form.

## Positioning

Family-run repair and auto body shop under one roof since 1989 (Eli and crew), with written estimates before work starts and free loaner cars on longer repairs — a combination (repair + collision + classic restoration + transparent pricing + loaners) a typical single-service competitor does not offer together.

## Operating Context

- Services: diagnostics, collision/auto body repair (coordinates directly with insurers on claims), classic & muscle car restoration, brakes & suspension, MA state inspection & emissions, oil & preventative maintenance.
- Booking flow: call, phone-based appointment dialog on-site, or drop off after a collision.
- Contact form on-site collects name/phone/vehicle/issue and shows a confirmation toast; no backend persistence beyond the toast (evidenced in `ContactBand.tsx`).

## Capabilities and Constraints

- Built with React + TanStack Router + Vite, Tailwind v4 token-based theming (`src/styles.css`), shadcn/ui primitives.
- Multi-page site (converted from single-page, 2026-08-16): shared layout at `src/routes/_layout.tsx` (Header, Outlet, Footer), six pages under `src/routes/_layout/` — Home (`/`), Why Us, Services, Process, Reviews, Contact — each its own route with its own SEO metadata.
- All component styling routes through CSS custom-property tokens (no hardcoded colors in components) — confirmed by repo scan.

## Brand Commitments

- Legal name: Canton Auto Services & Auto Body. Display name: "Canton Auto." Founded 1989.
- Address: 879B Washington St, Canton, MA 02021. Phone: (781) 830-9480.
- Hours: Mon–Fri 8am–5pm, Sat 8am–2pm, Sun closed.
- BBB A+ accredited since 2015. Yelp: 4.4★ from 71+ reviews.
- Real logo: user supplied the shop's actual signage wordmark (2026-08-16) — "Canton" in a red 3D-bevel script over "AUTO SERVICE & AUTO BODY" in black, white background. This is now the authoritative brand mark, referenced at `public/canton-logo.png` (user to supply the file; `BrandLogo.tsx` falls back to a text lockup until it exists).
- Fonts: Sora (display/headings), Manrope (body) — kept as brand voice; not swapped in this pass.
- Accent color: shifted from the incumbent ember-orange to a deep red (oklch hue ~23) matching the real logo's signage red, replacing an earlier in-session blue pick that predated the logo being shared (2026-08-16).

## Evidence on Hand

- Real hero photo: technician servicing a car on a lift (`src/assets/hero-garage.jpg`).
- Real service list, hours, address, phone, rating counts — all sourced from `src/components/home/shop.ts`.
- Web-verified facts added 2026-08-16 (most listing sites — Yelp, Openbay, Carfax, Manta, Loc8NearMe, the shop's own defunct `cantonautobodyrepair.com` — block automated fetches; only BBB and one aggregator (businessyab.com) returned content):
  - Owner/manager's full name **Eli Dallaleh**, confirmed via [BBB profile](https://www.bbb.org/us/ma/canton/profile/auto-repair/canton-auto-service-auto-body-0021-78511) (Principal Contact). Existing hours (Mon–Fri 8–5, Sat 8–2), BBB accreditation date (Nov 20, 2015), and 37-years-in-business figure were independently confirmed by the same BBB profile — no changes needed there.
  - Confirmed **not** a AAA Approved Auto Repair facility (checked AAA's Canton, MA facility list) — do not add an AAA badge/claim.
  - Real (paraphrased, undated beyond "2020") review themes via [businessyab.com](https://www.businessyab.com/explore/united_states/massachusetts/norfolk_county/canton/washington_street/879/canton-auto-services-auto-body-781-830-9480.html): Eli arranging a rental car and handling insurance directly after a collision with early/on-time completion; customers talking directly to the technician rather than a receptionist. Folded into `Testimonials.tsx` highlights, still unattributed (no real names/dates to cite).
  - The staff names previously listed alongside Eli ("Rick, Sam, Ray, Claudette") could not be independently verified. User confirmed (2026-08-16) to remove them rather than keep unverified names — `Testimonials.tsx` no longer names anyone but Eli.
  - **Caution**: several similarly-named Canton, MA businesses exist at different addresses — "Canton Auto Body" / "Canton Auto Body Inc." (1027 Turnpike St), "Steve's Canton Auto Repair" (1158 Washington St), "Living The Dream Auto Care" (363 Neponset St, likely the "ltdac.com" referenced in this repo's original README as unrelated design inspiration). Do not attribute their info to this business (879B Washington St).
- No customer logos, press mentions, case studies, or verifiable photo library on hand.

## Product Principles

1. Trust and transparency lead — written estimates, no surprise pricing, real credentials (BBB, Yelp) surfaced early.
2. One roof for repair, body work, and restoration — don't fragment this into siloed service pages.
3. Fast path to contact — phone number and booking CTA stay reachable from any scroll position.
4. Family-run warmth without sacrificing professional credibility — this is a 35+ year local business, not a startup.

## Accessibility & Inclusion

WCAG AA contrast, focus states, and tap targets are an explicit requirement for this pass (user directive, 2026-08-16), applied across the redesigned white theme.
