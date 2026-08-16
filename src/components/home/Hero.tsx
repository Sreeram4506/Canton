import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Phone, ShieldCheck, Star, StarHalf, Wrench } from "lucide-react";
import heroImage from "@/assets/hero-garage.jpg";
import { SHOP } from "./shop";
import { riseItem, stagger } from "./Reveal";
import { BookAppointmentDialog } from "./BookAppointmentDialog";

const PILLS = [
  "Diagnostics",
  "Collision Repair",
  "Classic Restoration",
  "Brakes & Suspension",
  "State Inspection",
  "Oil Service",
];

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section id="top" className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="grid-lines absolute inset-0 -z-10" />

      <div className="mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 sm:pb-24 sm:pt-36 lg:pb-32 lg:pt-40">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <motion.div
            variants={stagger}
            initial={reduce ? false : "hidden"}
            animate="show"
            className="max-w-xl"
          >
            <motion.div
              variants={riseItem}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground backdrop-blur"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              BBB A+ accredited since 2015
            </motion.div>

            <motion.h1
              variants={riseItem}
              className="mt-6 font-display text-4xl font-extrabold leading-[1.05] sm:text-6xl lg:text-7xl"
            >
              Auto repair and auto body,
              <span className="text-primary"> done right since {SHOP.founded}</span>
            </motion.h1>

            <motion.p
              variants={riseItem}
              className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              Diagnostics, collision repair, classic car restoration and routine maintenance —
              handled by the {SHOP.legalName} crew with transparent pricing and{" "}
              {SHOP.yearsInBusiness}+ years serving Canton, MA.
            </motion.p>

            <motion.ul
              variants={riseItem}
              className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2"
              aria-label="Core services"
            >
              {PILLS.map((pill, i) => (
                <li key={pill} className="flex items-center gap-3">
                  {i > 0 && (
                    <span
                      aria-hidden="true"
                      className="h-1 w-1 shrink-0 rounded-full bg-primary/50"
                    />
                  )}
                  <span className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary sm:text-base">
                    {pill}
                  </span>
                </li>
              ))}
            </motion.ul>

            <motion.div
              variants={riseItem}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <BookAppointmentDialog
                trigger={
                  <button
                    type="button"
                    className="brand-gradient shadow-brand group inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-semibold text-primary-foreground transition-transform duration-200 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    Book an appointment
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </button>
                }
              />
              <a
                href={`tel:${SHOP.phone}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-7 py-4 text-sm font-semibold text-foreground transition-colors duration-200 hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <Phone className="h-4 w-4" />
                {SHOP.phoneDisplay}
              </a>
            </motion.div>

            <motion.div
              variants={riseItem}
              className="mt-8 flex items-center gap-3 text-sm text-muted-foreground"
            >
              <span className="flex gap-0.5" aria-hidden="true">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
                <StarHalf className="h-4 w-4 fill-primary text-primary" />
              </span>
              Rated {SHOP.rating} on Yelp from {SHOP.reviewCount}+ reviews
            </motion.div>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none"
          >
            <div
              aria-hidden="true"
              className="brand-gradient absolute -bottom-5 -right-5 h-full w-full rounded-[1.75rem]"
            />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-border shadow-elevated">
              <img
                src={heroImage}
                alt="Technician servicing a car on a lift inside the Canton Auto garage"
                width={1600}
                height={1200}
                className="aspect-[4/5] w-full object-cover lg:aspect-[3/4]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 via-black/10 to-transparent"
              />
              <div className="absolute bottom-5 left-5 right-5 flex items-center gap-2 text-sm font-semibold text-white">
                <Wrench className="h-4 w-4 shrink-0 text-white" />
                Family-run and hands-on since {SHOP.founded}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
