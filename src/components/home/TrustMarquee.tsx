import { Sparkle } from "lucide-react";
import { SHOP } from "./shop";

const ITEMS = [
  `${SHOP.yearsInBusiness}+ Years in Business`,
  `Family-Run Since ${SHOP.founded}`,
  "BBB A+ Accredited",
  `${SHOP.rating}★ on Yelp`,
  "Free Loaner Cars",
  "Transparent Pricing",
  "Collision & Auto Body",
  "Classic Car Restoration",
  "State Inspection & Emissions",
];

function MarqueeGroup() {
  return (
    <div className="flex shrink-0 items-center" aria-hidden="true">
      {ITEMS.map((item, i) => (
        <span key={i} className="flex items-center">
          <span className="whitespace-nowrap px-6 font-display text-lg font-bold tracking-tight text-primary-foreground sm:text-2xl">
            {item}
          </span>
          <Sparkle className="h-3.5 w-3.5 shrink-0 fill-primary-foreground/50 text-primary-foreground/50" />
        </span>
      ))}
    </div>
  );
}

export function TrustMarquee() {
  return (
    <section
      className="brand-gradient group overflow-hidden py-5 sm:py-6"
      aria-label={`${SHOP.name} at a glance`}
    >
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        <MarqueeGroup />
        <MarqueeGroup />
      </div>
      <span className="sr-only">
        {SHOP.yearsInBusiness}+ years in business, family-run since {SHOP.founded}, BBB A+
        accredited, {SHOP.rating} stars on Yelp, free loaner cars, transparent pricing, collision
        and auto body, classic car restoration, state inspection and emissions.
      </span>
    </section>
  );
}
