import { BadgeCheck, Quote, Star } from "lucide-react";
import { Reveal } from "./Reveal";
import { SHOP } from "./shop";

const HIGHLIGHTS = [
  {
    title: "Genuine and caring crew",
    text: "Reviewers consistently point to honesty and a personal touch — you talk directly with the person working on your car, not a receptionist relaying messages.",
  },
  {
    title: "Careful collision work",
    text: "After a collision, reviewers describe Eli arranging a rental car and handling the insurance claim directly, with repairs often finished on time or early.",
  },
  {
    title: "Trusted with every car",
    text: "Owners bring in vintage and muscle cars for repair and describe a shop that treats them with real attention to detail.",
  },
  {
    title: "Fair, honest pricing",
    text: '"Honesty" and "great price" are the words reviewers reach for most — no upselling, no padded invoices.',
  },
];

export function Testimonials() {
  return (
    <section id="reviews" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="grid gap-6 border-b border-border pb-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:items-end">
          <h2 className="font-display text-3xl font-black leading-tight sm:text-5xl">
            What Canton drivers remember after pickup.
          </h2>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-semibold text-foreground/85 lg:justify-end">
            <span className="inline-flex items-center gap-2">
              <span className="flex gap-0.5" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={
                      i < Math.round(SHOP.rating)
                        ? "h-3.5 w-3.5 fill-primary text-primary"
                        : "h-3.5 w-3.5 text-muted-foreground"
                    }
                  />
                ))}
              </span>
              {SHOP.rating} on Google · {SHOP.reviewCount}+ reviews
            </span>
            <span className="inline-flex items-center gap-2">
              <BadgeCheck className="h-4 w-4 text-primary" />
              BBB A+ accredited
            </span>
          </div>
        </Reveal>

        <div className="mt-3 grid divide-y divide-border md:grid-cols-4 md:divide-x md:divide-y-0">
          {HIGHLIGHTS.map((item, i) => (
            <Reveal
              key={item.title}
              delay={i * 0.08}
              className="py-8 md:px-6 md:first:pl-0 md:last:pr-0"
            >
              <figure>
                <Quote className="h-9 w-9 text-primary/35" />
                <figcaption className="mt-5 font-display text-base font-black">
                  {item.title}
                </figcaption>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
