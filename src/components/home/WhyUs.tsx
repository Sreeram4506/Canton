import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { BadgeCheck, Car, Receipt, Wrench } from "lucide-react";
import { Reveal } from "./Reveal";
import { SHOP } from "./shop";

const POINTS = [
  {
    icon: BadgeCheck,
    title: "BBB A+ accredited",
    text: "Accredited since 2015 with an A+ rating for trust and transparency.",
  },
  {
    icon: Receipt,
    title: "Transparent pricing",
    text: "Written estimate before we touch a bolt. No surprise change orders.",
  },
  {
    icon: Wrench,
    title: "Repair & auto body, one roof",
    text: "From routine maintenance to full collision and classic car restoration.",
  },
  {
    icon: Car,
    title: "Loaner cars available",
    text: "Free loaners on longer repairs, so you're not stuck without wheels.",
  },
];

// Every figure here must be traceable to SHOP data — no invented headcounts or ratings.
const STATS = [
  { value: SHOP.yearsInBusiness, suffix: "+", label: "Years in business" },
  { value: SHOP.reviewCount, suffix: "+", label: "Yelp reviews" },
  { value: SHOP.rating, suffix: "★", label: "Average rating" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(0);
  const decimals = Number.isInteger(value) ? 0 : 1;

  useEffect(() => {
    if (!inView) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDisplay(value);
      return;
    }
    const duration = 1400;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(value * eased);
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <span ref={ref} className="font-display text-3xl font-extrabold sm:text-4xl">
      {display.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      <span className="text-primary">{suffix}</span>
    </span>
  );
}

export function WhyUs() {
  return (
    <section id="why" className="relative overflow-hidden py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center">
          <Reveal>
            <h2 className="font-display text-3xl font-black leading-tight sm:text-5xl">
              Family-run, straight with you since {SHOP.founded}
            </h2>
            <p className="mt-4 max-w-lg text-muted-foreground">
              We show you the worn part, explain what it does, and price the fix before the work
              starts. That's how {SHOP.ownerName} and the crew have done it for{" "}
              {SHOP.yearsInBusiness} years.
            </p>

            <dl className="mt-10 grid grid-cols-3 divide-x divide-border border-y border-border">
              {STATS.map((stat) => (
                <div key={stat.label} className="px-3 py-5 first:pl-0">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <Counter value={stat.value} suffix={stat.suffix} />
                    <span className="mt-1 block text-sm text-muted-foreground">{stat.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <div className="rounded-2xl border border-border bg-shop-paper px-5 shadow-elevated sm:px-7">
            {POINTS.map((point, i) => (
              <Reveal
                key={point.title}
                delay={i * 0.08}
                className="flex items-start gap-4 border-b border-border py-6 last:border-0"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-background text-primary">
                  <point.icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-base font-bold">{point.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{point.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
