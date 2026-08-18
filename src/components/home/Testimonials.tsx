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
    title: "Trusted with classic cars",
    text: "Owners bring in vintage and muscle cars for restoration and describe a shop that treats them with real attention to detail.",
  },
  {
    title: "Fair, honest pricing",
    text: '"Honesty" and "great price" are the words reviewers reach for most — no upselling, no padded invoices.',
  },
];

export function Testimonials() {
  return (
    <section id="reviews" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-3xl font-extrabold sm:text-5xl">
            What Canton drivers say
          </h2>
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-semibold text-foreground/85">
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
              {SHOP.rating} on Yelp · {SHOP.reviewCount}+ reviews
            </span>
            <span className="inline-flex items-center gap-2">
              <BadgeCheck className="h-4 w-4 text-primary" />
              BBB A+ accredited
            </span>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-10 divide-y divide-border md:grid-cols-4 md:gap-6 md:divide-x md:divide-y-0">
          {HIGHLIGHTS.map((item, i) => (
            <Reveal
              key={item.title}
              delay={i * 0.08}
              className="pt-8 first:pt-0 md:px-6 md:pt-0 md:first:pl-0 md:last:pr-0"
            >
              <figure>
                <Quote className="h-8 w-8 text-primary/30" />
                <figcaption className="mt-4 font-display text-base font-bold">
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
