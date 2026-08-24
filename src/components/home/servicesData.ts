import {
  Gauge,
  Hammer,
  Cog,
  Disc3,
  ClipboardCheck,
  Droplets,
  CircleDot,
  Settings2,
  Snowflake,
  KeyRound,
  type LucideIcon,
} from "lucide-react";

export type ServiceItem = {
  slug: string;
  icon: LucideIcon;
  title: string;
  text: string;
  image: string;
  intro: string;
  highlights: string[];
};

export const SERVICES: ServiceItem[] = [
  {
    slug: "auto-repair-diagnostics",
    icon: Gauge,
    title: "Auto Repair & Diagnostics",
    text: "Engine, electrical and drivetrain issues diagnosed and explained before we touch a bolt.",
    image: "/services/auto-repair-diagnostics.svg",
    intro:
      "From a stubborn check-engine light to a drivetrain that just doesn't feel right, we run a full diagnostic scan and walk you through exactly what's wrong — in plain English — before any work begins.",
    highlights: [
      "Computer diagnostic scan for check-engine and warning lights",
      "Engine, electrical and drivetrain troubleshooting",
      "Written, itemized estimate before any repair starts",
      "Domestic, import and vintage vehicles",
    ],
  },
  {
    slug: "collision-auto-body",
    icon: Hammer,
    title: "Collision & Auto Body",
    text: "Frame straightening, bumper and panel repair, and paint-matched bodywork after an accident.",
    image: "/services/collision-auto-body.svg",
    intro:
      "After an accident, our body shop handles everything from a scuffed bumper to full frame straightening — with paint matched to your exact factory finish and we coordinate directly with your insurance company.",
    highlights: [
      "Frame straightening and structural repair",
      "Bumper, panel and fender replacement",
      "Computer-matched paint and refinishing",
      "Direct coordination with your insurance adjuster",
      "Paintless dent repair for minor dings",
      "Headlight and taillight replacement",
      "Free loaner cars available on longer repairs",
    ],
  },
  {
    slug: "classic-restoration",
    icon: Cog,
    title: "Classic & Muscle Car Restoration",
    text: "Ground-up restorations and custom upgrades for vintage and muscle cars, done in-house.",
    image: "/services/classic-restoration.svg",
    intro:
      "Whether it's a barn-find that needs a full ground-up rebuild or a muscle car ready for custom upgrades, our crew treats every restoration like the long-term project it is — done in-house, start to finish.",
    highlights: [
      "Ground-up restorations for vintage and muscle cars",
      "Rust repair, metal fabrication and panel replacement",
      "Custom performance and cosmetic upgrades",
      "Period-correct and show-quality finish work",
    ],
  },
  {
    slug: "brakes-suspension",
    icon: Disc3,
    title: "Brakes & Suspension",
    text: "Pads, rotors, shocks and steering components — inspected free with every visit.",
    image: "/services/brakes-suspension.svg",
    intro:
      "Braking and handling are the two things you can't afford to ignore. We inspect pads, rotors, shocks and steering components free with every visit, and only recommend what your car actually needs — rotors get resurfaced when they're within spec, and replaced only when they're not.",
    highlights: [
      "Brake pad, rotor and caliper service",
      "Brake fluid flush and inspection",
      "Shocks, struts and suspension components",
      "Steering and alignment checks",
      "Free multi-point inspection with every visit",
    ],
  },
  {
    slug: "state-inspection",
    icon: ClipboardCheck,
    title: "State Inspection & Emissions",
    text: "Massachusetts state inspection stickers and emissions testing while you wait.",
    image: "/services/state-inspection.svg",
    intro:
      "Skip the line — we're a licensed Massachusetts state inspection station, running your inspection sticker and emissions test while you wait, and fixing anything that needs attention on the spot.",
    highlights: [
      "Official Massachusetts state inspection stickers",
      "Emissions testing",
      "Same-visit repairs for failed items",
      "Typically done while you wait",
    ],
  },
  {
    slug: "oil-maintenance",
    icon: Droplets,
    title: "Oil & Preventative Maintenance",
    text: "Scheduled fluid service and multi-point checks to catch small problems early.",
    image: "/services/oil-maintenance.svg",
    intro:
      "Regular oil changes and preventative maintenance are the cheapest insurance your car has. We handle scheduled fluid service and multi-point checks so small issues get caught long before they become expensive ones.",
    highlights: [
      "Oil and filter changes, all makes and models",
      "Conventional, synthetic, high-mileage and diesel oil options",
      "Fluid top-offs — coolant, brake fluid, washer fluid — with every visit",
      "Fluid checks and flushes on a manufacturer schedule",
      "Multi-point inspection with every service",
      "Belts, hoses and battery testing",
    ],
  },
  {
    slug: "tire-service",
    icon: CircleDot,
    title: "Tire Service",
    text: "Mounting, balancing, rotations and flat repair — plus honest advice on when a tire is actually done.",
    image: "/services/tire-service.svg",
    intro:
      "From a slow leak to a full set of new tires, we mount, balance and rotate on-site, and we'll tell you straight when a repair is safe versus when it's time to replace — no upselling a tire that still has life in it.",
    highlights: [
      "Mounting, balancing and rotations",
      "Flat repair and puncture inspection",
      "TPMS (tire pressure sensor) reset included",
      "Seasonal tire changeovers and storage",
      "Straight advice on repair vs. replace",
    ],
  },
  {
    slug: "transmission-service",
    icon: Settings2,
    title: "Transmission Repair & Service",
    text: "Fluid service, diagnostics and repair for automatic and manual transmissions.",
    image: "/services/transmission-service.svg",
    intro:
      "Slipping gears, delayed engagement, or a transmission that's just due for service — we diagnose the cause first, explain what we find, and handle everything from a fluid and filter service to a full repair.",
    highlights: [
      "Transmission fluid and filter service",
      "Diagnostics for slipping, shifting or noise issues",
      "Automatic, manual and semi-automatic transmission repair",
      "Transmission replacement when repair isn't practical",
      "Written estimate before any repair starts",
    ],
  },
  {
    slug: "ac-heating-repair",
    icon: Snowflake,
    title: "Heating & AC Repair",
    text: "Get the air conditioning and cabin heat working right, in every season.",
    image: "/services/ac-heating-repair.svg",
    intro:
      "Warm air out of the vents in July or no heat in January — we diagnose the actual cause, whether it's a refrigerant leak, a failing compressor, or a heating system issue, and fix it, not just recharge it and send you off.",
    highlights: [
      "AC diagnostics, recharge and leak repair",
      "R134a and R1234yf refrigerant service",
      "Heating system diagnosis and repair",
      "Compressor and blower motor service",
      "Cabin air filter replacement",
    ],
  },
  {
    slug: "key-programming",
    icon: KeyRound,
    title: "Key Cutting & Programming",
    text: "Cut and program replacement keys and fobs, including transponder and push-to-start keys.",
    image: "/services/key-programming.svg",
    intro:
      "Lost your only key or need a spare cut? We cut and program replacement keys and remote fobs — including modern transponder and push-to-start keys — while your car is already in the shop or as a standalone visit.",
    highlights: [
      "Cut and program transponder keys and fobs",
      "Push-to-start and remote key programming",
      "Immobilizer system reset and re-pairing",
      "Spare key cutting for most makes and models",
      "On-site mobile key service by appointment",
      "No dealership wait times",
    ],
  },
];

export function getServiceBySlug(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}
