import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Phone, ShieldCheck, Star } from "lucide-react";
import { SHOP } from "./shop";
import { riseItem, stagger } from "./Reveal";
import { BookAppointmentDialog } from "./BookAppointmentDialog";
import { OpenStatus } from "./OpenStatus";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[85vh] lg:min-h-[90vh] items-center overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24"
    >
      {/* Background Image & Overlays */}
      <img
        src="/cantonbg.png"
        alt="Canton Auto Services shop storefront"
        width={1600}
        height={1200}
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-black/90 via-black/70 to-black/40"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-transparent to-black/40"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={stagger}
          initial={reduce ? false : "hidden"}
          animate="show"
          className="max-w-3xl"
        >
          {/* Badge */}
          <motion.div
            variants={riseItem}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-md"
          >
            <ShieldCheck className="h-4 w-4 text-primary-on-dark" />
            <span>Family-Owned &amp; Operating Since {SHOP.founded}</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={riseItem}
            className="mt-6 font-display text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl leading-[1.1]"
          >
            Canton’s Trusted Auto Repair &amp; Collision Shop
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={riseItem}
            className="mt-6 max-w-2xl text-lg text-white/85 sm:text-xl leading-relaxed"
          >
            From complex engine diagnostics to full collision bodywork and classic car restoration, our certified technicians handle it all with complete transparency.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={riseItem}
            className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <BookAppointmentDialog
              trigger={
                <button
                  type="button"
                  className="brand-gradient shadow-brand group inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4 text-base font-bold text-primary-foreground transition-transform duration-200 hover:scale-[1.02] focus-visible:outline-none"
                >
                  Book Appointment
                  <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              }
            />

            <a
              href={`tel:${SHOP.phone}`}
              className="inline-flex items-center justify-center gap-2.5 rounded-full border border-white/30 bg-white/5 px-8 py-4 text-base font-bold text-white transition-all duration-200 hover:border-white/60 hover:bg-white/15 focus-visible:outline-none"
            >
              <Phone className="h-5 w-5 text-primary-on-dark" />
              {SHOP.phoneDisplay}
            </a>
          </motion.div>

          {/* Trust proof bar */}
          <motion.div
            variants={riseItem}
            className="mt-10 flex flex-wrap items-center gap-6 text-sm font-medium text-white/80"
          >
            <div className="flex items-center gap-2">
              <div className="flex text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span>{SHOP.rating}★ on Yelp ({SHOP.reviewCount}+ reviews)</span>
            </div>
            <span className="hidden sm:inline text-white/30">•</span>
            <div className="flex items-center gap-2">
              <OpenStatus light />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
