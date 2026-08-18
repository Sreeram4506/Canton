import { SHOP } from "./shop";

export function LocationsSection() {
  return (
    <section className="bg-surface py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
        <h2 className="font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Our Location
        </h2>
        <div className="mx-auto mt-12 max-w-lg text-left">
          <div className="rounded-2xl border border-border bg-background p-8 shadow-sm">
            <h3 className="font-display text-2xl font-bold text-foreground">
              {SHOP.name}
            </h3>
            <p className="mt-4 text-muted-foreground">{SHOP.address}</p>
            <div className="mt-4 flex flex-col gap-2">
              {SHOP.hours.map((h) => (
                <div key={h.day} className="flex justify-between text-sm">
                  <span className="font-medium text-foreground">{h.day}</span>
                  <span className="text-muted-foreground">{h.time}</span>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <a
                href={`tel:${SHOP.phone}`}
                className="font-display text-2xl font-bold text-primary transition-colors hover:text-primary-on-dark"
              >
                {SHOP.phoneDisplay}
              </a>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
               <a
                href={SHOP.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex flex-1 items-center justify-center rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-on-dark"
              >
                Get Directions
              </a>
               <a
                href={`tel:${SHOP.phone}`}
                className="inline-flex flex-1 items-center justify-center rounded-full border border-border bg-background px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                Call Shop
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
