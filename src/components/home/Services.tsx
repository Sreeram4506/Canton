import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Reveal } from "./Reveal";
import { SERVICES } from "./servicesData";

export function Services() {
  return (
    <section id="services" className="service-counter relative overflow-hidden py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="flex flex-col justify-between gap-6 border-b border-border pb-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-black sm:text-5xl">
              Every service, one front desk.
            </h2>
            <p className="mt-4 text-muted-foreground">
              From a warning-light scan to full collision repair or a ground-up classic car
              restoration, the shop handles domestic, import, and vintage vehicles alike.
            </p>
          </div>
          <Link
            to="/services"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-xs font-extrabold uppercase tracking-[0.16em] text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            View all services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>

        <div className="mt-4 divide-y divide-border">
          {SERVICES.map((service, i) => (
            <Reveal key={service.slug} delay={i * 0.06}>
              <Link
                to="/services/$slug"
                params={{ slug: service.slug }}
                className="group grid gap-5 py-6 transition-colors hover:bg-background/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:grid-cols-[3.5rem_minmax(0,1fr)_auto] sm:items-center sm:px-3"
              >
                <span className="grid h-14 w-14 place-items-center rounded-xl bg-primary text-primary-foreground shadow-brand transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105">
                  <service.icon className="h-7 w-7" />
                </span>
                <div className="min-w-0 max-w-3xl">
                  <h3 className="font-display text-xl font-black transition-colors group-hover:text-primary">
                    {service.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {service.text}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-extrabold uppercase tracking-[0.16em] text-primary sm:justify-self-end">
                  Details
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
