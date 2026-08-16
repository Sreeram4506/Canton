import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import heroImage from "@/assets/hero-garage.jpg";
import { PROCESS_STEPS } from "./shop";

export function ProcessInMotion() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.15, 1]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(PROCESS_STEPS.length - 1, Math.floor(v * PROCESS_STEPS.length));
    setActive(idx);
  });

  return (
    <section ref={sectionRef} className="relative h-[240vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.img
          src={heroImage}
          alt="Inside the Canton Auto garage — a technician working under a lifted car"
          style={{ scale }}
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/45 to-black/20"
        />

        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
          <p className="max-w-xl font-display text-3xl font-extrabold text-white sm:text-5xl">
            How a repair actually goes
          </p>

          <ol className="mt-9 space-y-6 sm:mt-12 sm:space-y-8">
            {PROCESS_STEPS.map((step, i) => (
              <li key={step.title} className="flex items-start gap-4">
                <span
                  className={
                    i === active
                      ? "brand-gradient grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-bold text-primary-foreground transition-colors duration-300"
                      : "grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/15 text-sm font-bold text-white/60 transition-colors duration-300"
                  }
                >
                  {i + 1}
                </span>
                <div className="min-w-0 pt-1">
                  <h3
                    className={
                      i === active
                        ? "font-display text-lg font-bold text-white transition-colors duration-300 sm:text-2xl"
                        : "font-display text-lg font-bold text-white/45 transition-colors duration-300 sm:text-2xl"
                    }
                  >
                    {step.title}
                  </h3>
                  <p
                    className={
                      i === active
                        ? "mt-1 max-w-md text-sm text-white/90 transition-colors duration-300 sm:text-base"
                        : "mt-1 max-w-md text-sm text-white/0 transition-colors duration-300 sm:text-base"
                    }
                  >
                    {step.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-1 bg-white/15" aria-hidden="true">
          <motion.div style={{ width: progressWidth }} className="brand-gradient h-full" />
        </div>
      </div>
    </section>
  );
}
