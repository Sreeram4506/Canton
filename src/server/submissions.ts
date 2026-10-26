export const SUBMISSION_STATUSES = ["new", "contacted", "done"] as const;
export type SubmissionStatus = (typeof SUBMISSION_STATUSES)[number];

export type Submission = {
  id: string;
  type: "appointment" | "callback";
  name: string;
  phone: string;
  email: string;
  vehicle: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
  status: SubmissionStatus;
  createdAt: string;
};

const LIMITS: Record<string, number> = {
  name: 100,
  phone: 40,
  email: 150,
  vehicle: 120,
  service: 120,
  preferredDate: 60,
  preferredTime: 30,
  message: 2000,
};

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

/** Returns a sanitized submission body, or null when required fields are missing. */
export function parseSubmission(body: unknown) {
  if (!body || typeof body !== "object") return null;
  const b = body as Record<string, unknown>;
  // Honeypot: real visitors never fill this hidden field.
  if (b["website"]) return null;
  const type = b["type"] === "appointment" ? "appointment" : "callback";
  const fields = Object.fromEntries(
    Object.entries(LIMITS).map(([key, max]) => [key, clean(b[key], max)]),
  ) as Record<keyof typeof LIMITS, string>;
  if (!fields["name"] || !fields["phone"]) return null;
  return { type, ...fields } as {
    type: Submission["type"];
    name: string;
    phone: string;
    email: string;
    vehicle: string;
    service: string;
    preferredDate: string;
    preferredTime: string;
    message: string;
  };
}
