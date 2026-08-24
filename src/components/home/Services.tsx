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

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
          {SERVICES.map((service, i) => (
            <Reveal key={service.slug} delay={i * 0.06}>
              <Link
                to="/services/$slug"
                params={{ slug: service.slug }}
                className="group flex h-full flex-col rounded-2xl border border-border bg-background p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className="mb-6 grid h-14 w-14 place-items-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <service.icon className="h-7 w-7" />
                </span>
                
                <h3 className="mb-3 font-display text-xl font-bold transition-colors group-hover:text-primary">
                  {service.title}
                </h3>
                
                <p className="mb-8 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {service.text}
                </p>
                
                <span className="mt-auto inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-[0.16em] text-primary">
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
