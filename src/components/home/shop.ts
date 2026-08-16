export const SHOP = {
  legalName: "Canton Auto Services & Auto Body",
  name: "Canton Auto",
  tagline: "Services & Auto Body",
  ownerName: "Eli Dallaleh",
  phone: "7818309480",
  phoneDisplay: "(781) 830-9480",
  address: "879B Washington St, Canton, MA 02021",
  hours: [
    { day: "Mon – Fri", time: "8:00am – 5:00pm" },
    { day: "Saturday", time: "8:00am – 2:00pm" },
    { day: "Sunday", time: "Closed" },
  ],
  founded: 1989,
  yearsInBusiness: new Date().getFullYear() - 1989,
  rating: 4.4,
  reviewCount: 71,
};

export const NAV = [
  {
    label: "Why Us",
    href: "/why-us",
    description: "Family-run, transparent pricing, and what makes us different.",
  },
  {
    label: "Services",
    href: "/services",
    description: "Diagnostics, collision repair, restoration and maintenance.",
  },
  {
    label: "Process",
    href: "/process",
    description: "How booking, diagnosis and pickup work — start to finish.",
  },
  {
    label: "Reviews",
    href: "/reviews",
    description: "What Canton drivers say about the crew and the work.",
  },
  {
    label: "Contact",
    href: "/contact",
    description: "Hours, location, phone, and a callback request form.",
  },
] as const;

export const PROCESS_STEPS = [
  {
    title: "Book your slot",
    text: "Call, book online, or drop off after a collision — we'll hold a bay for you.",
  },
  {
    title: "Diagnose & quote",
    text: "We inspect, photograph the issue and send a written estimate — coordinating directly with your insurer on collision claims.",
  },
  {
    title: "Drive away",
    text: "Repair completed and road-tested. Pick up your keys, or swap in your loaner.",
  },
] as const;

export const SERVICE_OPTIONS = [
  "Auto Repair & Diagnostics",
  "Collision & Auto Body",
  "Classic & Muscle Car Restoration",
  "Brakes & Suspension",
  "State Inspection & Emissions",
  "Oil & Preventative Maintenance",
  "Something else",
];
