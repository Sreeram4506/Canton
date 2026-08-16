import { CalendarCheck, Search, KeyRound } from "lucide-react";
import { Reveal } from "./Reveal";
import { PROCESS_STEPS } from "./shop";

const ICONS = [CalendarCheck, Search, KeyRound] as const;
const STEPS = PROCESS_STEPS.map((step, i) => ({ ...step, icon: ICONS[i]! }));

export function Process() {
  return (
    <section id="process" className="relative overflow-hidden py-20 sm:py-28">
      <div aria-hidden="true" className="grid-lines absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-3xl font-extrabold sm:text-5xl">
            Three steps, no runaround
          </h2>
        </Reveal>

        <ol className="mt-12 grid gap-10 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.1}>
              <li className="list-none">
                <span className="brand-gradient grid h-11 w-11 place-items-center rounded-full text-base font-bold text-primary-foreground">
                  {i + 1}
                </span>
                <div className="mt-5 flex items-center gap-2">
                  <step.icon className="h-4 w-4 shrink-0 text-primary" />
                  <h3 className="font-display text-lg font-bold">{step.title}</h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
