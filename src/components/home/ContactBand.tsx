import { useState, type FormEvent } from "react";
import { Clock, MapPin, Phone, Send } from "lucide-react";
import { toast } from "sonner";
import { Reveal } from "./Reveal";
import { SHOP } from "./shop";

export function ContactBand() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    toast.success("Request received", {
      description: `We'll call you back on the number provided. For anything urgent, ring ${SHOP.phoneDisplay}.`,
    });
    e.currentTarget.reset();
  };

  return (
    <section id="contact" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="panel-gradient overflow-hidden rounded-3xl border border-border">
          <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:p-14">
            <Reveal>
              <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
                Tell us what the car is doing
              </h2>
              <p className="mt-4 max-w-md text-muted-foreground">
                Send the details and we'll come back with a time slot and a ballpark price. Prefer
                to talk? Call the shop directly.
              </p>

              <ul className="mt-8 space-y-5">
                <li className="flex min-w-0 items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <a
                    href={`tel:${SHOP.phone}`}
                    className="min-w-0 font-display text-lg font-bold transition-colors hover:text-primary"
                  >
                    {SHOP.phoneDisplay}
                  </a>
                </li>
                <li className="flex min-w-0 items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span className="min-w-0 text-sm text-muted-foreground">{SHOP.address}</span>
                </li>
                <li className="flex min-w-0 items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div className="min-w-0 space-y-1 text-sm text-muted-foreground">
                    {SHOP.hours.map((h) => (
                      <div key={h.day} className="grid grid-cols-[minmax(0,1fr)_auto] gap-4">
                        <span className="truncate">{h.day}</span>
                        <span className="shrink-0 text-foreground/85">{h.time}</span>
                      </div>
                    ))}
                  </div>
                </li>
              </ul>
            </Reveal>

            <Reveal delay={0.1}>
              <form
                onSubmit={onSubmit}
                className="rounded-2xl border border-border bg-background/50 p-6 backdrop-blur sm:p-8"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Your name" name="name" placeholder="Alex Moore" />
                  <Field label="Phone" name="phone" type="tel" placeholder="(123) 456-7890" />
                </div>
                <div className="mt-4">
                  <Field label="Vehicle" name="vehicle" placeholder="2018 Honda Civic" />
                </div>
                <div className="mt-4">
                  <label
                    htmlFor="issue"
                    className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground"
                  >
                    What's going on?
                  </label>
                  <textarea
                    id="issue"
                    name="issue"
                    rows={4}
                    required
                    placeholder="Grinding noise when braking at low speed…"
                    className="w-full resize-none rounded-xl border border-input bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/40"
                  />
                </div>
                <button
                  type="submit"
                  className="brand-gradient group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-semibold text-primary-foreground transition-transform duration-200 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {sent ? "Send another request" : "Request a callback"}
                  <Send className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
                <p className="mt-3 text-center text-xs text-muted-foreground">
                  We reply during shop hours, usually within the hour.
                </p>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div className="min-w-0">
      <label
        htmlFor={name}
        className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="w-full rounded-xl border border-input bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/40"
      />
    </div>
  );
}
