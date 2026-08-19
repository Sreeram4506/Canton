export const SHOP = {
  legalName: "Canton Auto Services & Auto Body",
  name: "Canton Auto",
  tagline: "Services & Auto Body",
  ownerName: "Eli Dallaleh",
  phone: "7818309480",
  phoneDisplay: "(781) 830-9480",
  address: "879B Washington St, Canton, MA 02021",
  hours: [
    { day: "Mon – Fri", time: "8:00am – 5:00pm EST" },
    { day: "Saturday", time: "8:00am – 2:00pm EST" },
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

export function getESTDate(now = new Date()) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });

  const parts = formatter.formatToParts(now);
  let weekdayStr = "";
  let hour = 0;
  let minute = 0;

  for (const part of parts) {
    if (part.type === "weekday") weekdayStr = part.value;
    if (part.type === "hour") hour = parseInt(part.value, 10);
    if (part.type === "minute") minute = parseInt(part.value, 10);
  }

  if (hour === 24) hour = 0;

  const dayMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  return {
    day: dayMap[weekdayStr] ?? 0,
    minutes: hour * 60 + minute,
  };
}

export function getOpenStatus(now = new Date()) {
  const est = getESTDate(now);
  const minutes = est.minutes;
  const todayDay = est.day;
  const today = HOURS_BY_DAY[todayDay];

  if (today && minutes >= today[0] && minutes < today[1]) {
    return { open: true as const, label: `Open until ${formatMinutes(today[1])} EST` };
  }

  for (let ahead = 0; ahead < 8; ahead++) {
    const day = (todayDay + ahead) % 7;
    const window = HOURS_BY_DAY[day];
    if (!window) continue;
    if (ahead === 0 && minutes >= window[0]) continue;

    const when = ahead === 0 ? "today" : ahead === 1 ? "tomorrow" : DAY_LABELS[day];
    return { open: false as const, label: `Opens ${when} at ${formatMinutes(window[0])} EST` };
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
