import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Reveal } from "./Reveal";
import { SERVICES } from "./servicesData";

export function Services() {
  return (
    <section id="services" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-3xl font-extrabold sm:text-5xl">
            Maintenance & Services
          </h2>
          <p className="mt-4 text-muted-foreground">
            From a five-minute warning-light scan to full collision repair or a ground-up classic
            car restoration, our bays handle domestic, import and vintage vehicles alike.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {SERVICES.map((service, i) => (
            <Reveal key={service.slug} delay={i * 0.06}>
              <Link
                to="/services/$slug"
                params={{ slug: service.slug }}
                className="group flex gap-5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <service.icon className="h-7 w-7 shrink-0 text-primary transition-transform duration-300 group-hover:scale-110" />
                <div className="min-w-0">
                  <h3 className="font-display text-lg font-bold transition-colors group-hover:text-primary">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {service.text}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    Learn more
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
