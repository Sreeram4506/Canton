import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, MapPin, Phone, ShieldCheck, Star, Wrench } from "lucide-react";
import { SHOP } from "./shop";
import { riseItem, stagger } from "./Reveal";
import { BookAppointmentDialog } from "./BookAppointmentDialog";
import { OpenStatus } from "./OpenStatus";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-zinc-950 pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-28"
    >
      {/* Background Accent Mesh */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(220,38,38,0.15),transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={stagger}
          initial={reduce ? false : "hidden"}
          animate="show"
          className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-8"
        >
          {/* Left Column - Copy & CTA */}
          <div className="lg:col-span-7">
            {/* Top Pill Badge */}
            <motion.div
              variants={riseItem}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-md"
            >
              <ShieldCheck className="h-4 w-4 text-primary-on-dark" />
              <span>Family-Owned &amp; Serving Canton Since {SHOP.founded}</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={riseItem}
              className="mt-6 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.1]"
            >
              Precision Auto Repair &amp; Bodywork, Done Right.
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={riseItem}
              className="mt-5 max-w-xl text-base text-zinc-300 sm:text-lg leading-relaxed"
            >
              From complex diagnostics to certified collision repair and classic restoration, we provide transparent estimates and expert care for every vehicle.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={riseItem}
              className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center"
            >
              <BookAppointmentDialog
                trigger={
                  <button
                    type="button"
                    className="brand-gradient shadow-brand group inline-flex items-center justify-center gap-2.5 rounded-xl px-7 py-3.5 text-base font-bold text-primary-foreground transition-transform duration-200 hover:scale-[1.02] focus-visible:outline-none"
                  >
                    Book Appointment
                    <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                  </button>
                }
              />

              <a
                href={`tel:${SHOP.phone}`}
                className="inline-flex items-center justify-center gap-2.5 rounded-xl border border-white/20 bg-white/5 px-7 py-3.5 text-base font-bold text-white transition-all duration-200 hover:border-white/40 hover:bg-white/10 focus-visible:outline-none"
              >
                <Phone className="h-4 w-4 text-primary-on-dark" />
                {SHOP.phoneDisplay}
              </a>
            </motion.div>

            {/* Proof Points */}
            <motion.div
              variants={riseItem}
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/10 pt-6 text-sm text-zinc-400"
            >
              <div className="flex items-center gap-2">
                <div className="flex text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="font-semibold text-white">{SHOP.rating}★</span>
                <span>Yelp ({SHOP.reviewCount}+ reviews)</span>
              </div>
              <span className="hidden sm:inline text-white/20">•</span>
              <div className="flex items-center gap-2">
                <OpenStatus light />
              </div>
            </motion.div>
          </div>

          {/* Right Column - Framed Shop Image Card */}
          <motion.div
            variants={riseItem}
            className="relative lg:col-span-5"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative ring */}
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-red-600/30 to-amber-600/20 blur-lg opacity-70" />

              {/* Main Image Frame */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/15 bg-zinc-900 shadow-2xl">
                <img
                  src="/cantonbg.png"
                  alt="Canton Auto Repair storefront and facility"
                  className="h-full w-full object-cover object-center transition-transform duration-500 hover:scale-105"
                />

                {/* Gradient vignette inside frame */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-black/20" />

                {/* Floating Glass Pill Top Right */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full border border-white/20 bg-zinc-950/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md shadow-lg">
                  <MapPin className="h-3.5 w-3.5 text-primary-on-dark" />
                  <span>Canton, MA</span>
                </div>

                {/* Floating Badge Bottom Left */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl border border-white/15 bg-zinc-950/80 p-3 backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <div className="brand-gradient grid h-9 w-9 shrink-0 place-items-center rounded-lg text-white shadow-md">
                      <Wrench className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-white">
                        Full-Service Bay
                      </div>
                      <div className="text-[11px] text-zinc-400">
                        Collision • Mechanical • Restoration
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
