import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { CalendarCheck, ClipboardList, KeyRound } from "lucide-react";
import heroImage from "@/assets/hero-garage.jpg";
import { PROCESS_STEPS } from "./shop";

const STEP_ICONS = [CalendarCheck, ClipboardList, KeyRound] as const;

export function ProcessInMotion() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const scale = useTransform(smooth, [0, 1], reduce ? [1, 1] : [1.18, 1]);
  const imageY = useTransform(smooth, [0, 1], reduce ? ["0%", "0%"] : ["-4%", "4%"]);
  const railScale = useTransform(smooth, [0, 1], [0, 1]);
  const progressWidth = useTransform(smooth, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(PROCESS_STEPS.length - 1, Math.floor(v * PROCESS_STEPS.length));
    setActive(idx);
  });

  return (
    <section ref={sectionRef} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.img
          src={heroImage}
          alt="Inside the Canton Auto garage — a technician working under a lifted car"
          style={{ scale, y: imageY }}
          className="absolute inset-0 -z-20 h-full w-full scale-110 object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-r from-black/90 via-black/70 to-black/35"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-transparent to-black/50"
        />

        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-primary-on-dark">
              Step {active + 1} of {PROCESS_STEPS.length}
            </span>
            <span aria-hidden="true" className="h-px flex-1 max-w-24 bg-white/25" />
          </div>

          <h2 className="mt-5 max-w-2xl font-display text-3xl font-extrabold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
            How a repair actually goes
          </h2>

          <div className="relative mt-10 sm:mt-14">
            <div
              aria-hidden="true"
              className="absolute left-[1.375rem] top-3 bottom-3 w-px bg-white/15 sm:left-[1.625rem]"
            >
              <motion.div
                style={{ scaleY: railScale }}
                className="brand-gradient h-full w-full origin-top"
              />
            </div>

            <ol className="space-y-8 sm:space-y-10">
              {PROCESS_STEPS.map((step, i) => {
                const Icon = STEP_ICONS[i % STEP_ICONS.length]!;
                const isActive = i === active;
                const isDone = i < active;

                return (
                  <li key={step.title} className="relative flex items-start gap-5 sm:gap-6">
                    <span
                      className={`relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full transition-all duration-500 sm:h-14 sm:w-14 ${
                        isActive
                          ? "brand-gradient shadow-brand scale-105 text-primary-foreground"
                          : isDone
                            ? "bg-white/20 text-white backdrop-blur"
                            : "bg-white/10 text-white/45 backdrop-blur"
                      }`}
                    >
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </span>

                    <div className="min-w-0 pt-1 sm:pt-2">
                      <h3
                        className={`font-display text-lg font-bold transition-colors duration-500 sm:text-2xl ${
                          isActive ? "text-white" : "text-white/45"
                        }`}
                      >
                        {step.title}
                      </h3>
                      <motion.div
                        animate={{
                          opacity: isActive ? 1 : 0,
                          y: isActive || reduce ? 0 : 6,
                        }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="mt-2 max-w-lg text-sm leading-relaxed text-white/85 sm:text-base">
                          {step.text}
                        </p>
                        <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary-on-dark sm:text-sm sm:tracking-[0.12em]">
                          {step.detail}
                        </p>
                      </motion.div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-1 bg-white/15" aria-hidden="true">
          <motion.div style={{ width: progressWidth }} className="brand-gradient h-full" />
        </div>
      </div>
    </section>
  );
}
