import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Phone, ShieldCheck, Star, StarHalf, Wrench } from "lucide-react";
import { SHOP } from "./shop";
import { riseItem, stagger } from "./Reveal";
import { BookAppointmentDialog } from "./BookAppointmentDialog";
import { OpenStatus } from "./OpenStatus";

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
    <section
      id="top"
      // The fixed mobile action bar overlays the viewport, so its height comes off the
      // centering box — otherwise the last row of hero content sits underneath it.
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pb-[6.5rem] sm:pb-0"
    >
      <img
        src="/cantonbg.png"
        alt="Technician servicing a car on a lift inside the Canton Auto garage"
        width={1600}
        height={1200}
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/55 to-black/15"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-black/70 via-transparent to-black/35"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-10 pt-24 sm:px-6 sm:pb-20 sm:pt-32">
        <motion.div
          variants={stagger}
          initial={reduce ? false : "hidden"}
          animate="show"
          className="max-w-2xl"
        >
          <motion.div
            variants={riseItem}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-white/90 backdrop-blur"
          >
            <ShieldCheck className="h-3.5 w-3.5 text-primary-on-dark" />
            BBB A+ accredited since 2015
          </motion.div>

          <motion.h1
            variants={riseItem}
            className="mt-6 font-display text-4xl font-extrabold leading-[1.05] text-white sm:text-6xl lg:text-7xl"
          >
            Specializing in Auto Repair & Collision,
            <span className="text-primary-on-dark"> done right since {SHOP.founded}</span>
          </motion.h1>


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
                    className="h-1 w-1 shrink-0 rounded-full bg-primary-on-dark/70"
                  />
                )}
                <span className="text-sm font-medium text-white/85 transition-colors hover:text-white sm:text-base">
                  {pill}
                </span>
              </li>
            ))}
          </motion.ul>

          <motion.div
            variants={riseItem}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
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
            {/* Hidden on mobile: the fixed action bar already keeps Call one thumb away. */}
            <a
              href={`tel:${SHOP.phone}`}
              className="hidden items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-4 text-sm font-semibold text-white transition-colors duration-200 hover:border-white/60 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:inline-flex"
            >
              <Phone className="h-4 w-4" />
              {SHOP.phoneDisplay}
            </a>
          </motion.div>

          <motion.div
            variants={riseItem}
            className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-white/75"
          >
            <span className="flex items-center gap-3">
              <span className="flex gap-0.5" aria-hidden="true">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary-on-dark text-primary-on-dark" />
                ))}
                <StarHalf className="h-4 w-4 fill-primary-on-dark text-primary-on-dark" />
              </span>
              Rated {SHOP.rating} on Yelp from {SHOP.reviewCount}+ reviews
            </span>
            <span aria-hidden="true" className="hidden h-4 w-px bg-white/20 sm:block" />
            {/* The mobile action bar carries this same status below the fold — don't say it twice. */}
            <span className="hidden sm:block">
              <OpenStatus light />
            </span>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
        className="pointer-events-none absolute bottom-6 left-4 hidden items-center gap-2 text-sm font-semibold text-white/80 sm:left-6 lg:flex"
      >
        <Wrench className="h-4 w-4 shrink-0 text-primary-on-dark" />
        Family-run and hands-on since {SHOP.founded}
      </motion.div>
    </section>
  );
}
