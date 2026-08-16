import { Gauge, Hammer, Cog, Disc3, ClipboardCheck, Droplets, type LucideIcon } from "lucide-react";
import { Reveal } from "./Reveal";

const SERVICES: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Gauge,
    title: "Auto Repair & Diagnostics",
    text: "Engine, electrical and drivetrain issues diagnosed and explained before we touch a bolt.",
  },
  {
    icon: Hammer,
    title: "Collision & Auto Body",
    text: "Frame straightening, bumper and panel repair, and paint-matched bodywork after an accident.",
  },
  {
    icon: Cog,
    title: "Classic & Muscle Car Restoration",
    text: "Ground-up restorations and custom upgrades for vintage and muscle cars, done in-house.",
  },
  {
    icon: Disc3,
    title: "Brakes & Suspension",
    text: "Pads, rotors, shocks and steering components — inspected free with every visit.",
  },
  {
    icon: ClipboardCheck,
    title: "State Inspection & Emissions",
    text: "Massachusetts state inspection stickers and emissions testing while you wait.",
  },
  {
    icon: Droplets,
    title: "Oil & Preventative Maintenance",
    text: "Scheduled fluid service and multi-point checks to catch small problems early.",
  },
];

export function Services() {
  return (
    <section id="services" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-3xl font-extrabold sm:text-5xl">
            Repair and auto body, under one roof
          </h2>
          <p className="mt-4 text-muted-foreground">
            From a five-minute warning-light scan to full collision repair or a ground-up classic
            car restoration, our bays handle domestic, import and vintage vehicles alike.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {SERVICES.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.06}>
              <article className="group flex gap-5">
                <service.icon className="h-7 w-7 shrink-0 text-primary transition-transform duration-300 group-hover:scale-110" />
                <div className="min-w-0">
                  <h3 className="font-display text-lg font-bold">{service.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {service.text}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
