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
  yelpUrl: "https://www.yelp.com/biz/canton-auto-services-and-auto-body-canton",
  mapsEmbedUrl: "https://www.google.com/maps?q=879B+Washington+St,+Canton,+MA+02021&output=embed",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=879B+Washington+St,+Canton,+MA+02021",
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
    detail: "Same-day drop-off available during posted hours.",
  },
  {
    title: "Diagnose & quote",
    text: "We inspect, photograph the issue and send a written estimate — coordinating directly with your insurer on collision claims.",
    detail: "Nothing gets fixed before you approve the estimate.",
  },
  {
    title: "Drive away",
    text: "Repair completed and road-tested. Pick up your keys, or swap in your loaner.",
    detail: "Free loaner cars on longer repairs.",
  },
] as const;

/** Posted hours as [openMinutes, closeMinutes) from midnight, indexed by getDay() (0 = Sunday). */
const HOURS_BY_DAY: ReadonlyArray<readonly [number, number] | null> = [
  null,
  [8 * 60, 17 * 60],
  [8 * 60, 17 * 60],
  [8 * 60, 17 * 60],
  [8 * 60, 17 * 60],
  [8 * 60, 17 * 60],
  [8 * 60, 14 * 60],
];

const DAY_LABELS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function formatMinutes(total: number) {
  const h24 = Math.floor(total / 60);
  const m = total % 60;
  const suffix = h24 >= 12 ? "pm" : "am";
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return m === 0 ? `${h12}${suffix}` : `${h12}:${String(m).padStart(2, "0")}${suffix}`;
}

export function getOpenStatus(now = new Date()) {
  const minutes = now.getHours() * 60 + now.getMinutes();
  const today = HOURS_BY_DAY[now.getDay()];

  if (today && minutes >= today[0] && minutes < today[1]) {
    return { open: true as const, label: `Open until ${formatMinutes(today[1])}` };
  }

  for (let ahead = 0; ahead < 8; ahead++) {
    const day = (now.getDay() + ahead) % 7;
    const window = HOURS_BY_DAY[day];
    if (!window) continue;
    if (ahead === 0 && minutes >= window[0]) continue;

    const when = ahead === 0 ? "today" : ahead === 1 ? "tomorrow" : DAY_LABELS[day];
    return { open: false as const, label: `Opens ${when} at ${formatMinutes(window[0])}` };
  }

  return { open: false as const, label: "Closed" };
}

export const SERVICE_OPTIONS = [
  "Auto Repair & Diagnostics",
  "Collision & Auto Body",
  "Classic & Muscle Car Restoration",
  "Brakes & Suspension",
  "State Inspection & Emissions",
  "Oil & Preventative Maintenance",
  "Something else",
];
