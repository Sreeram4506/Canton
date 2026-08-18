import { Link } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { NAV, SHOP } from "./shop";
import { BrandLogo } from "./BrandLogo";
import { OpenStatus } from "./OpenStatus";

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div className="min-w-0">
            <BrandLogo className="h-14" />
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Family-run auto repair and auto body shop serving Canton, MA since {SHOP.founded},
              with transparent pricing on every job.
            </p>
          </div>

          <nav className="min-w-0">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Explore
            </h3>
            <ul className="mt-4 space-y-2">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:text-primary focus-visible:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="min-w-0">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Visit
            </h3>
            <p className="mt-4 text-sm text-muted-foreground">{SHOP.address}</p>
            <a
              href={`tel:${SHOP.phone}`}
              className="mt-3 inline-flex items-center gap-2 font-display text-base font-bold transition-colors hover:text-primary focus-visible:outline-none focus-visible:text-primary focus-visible:underline"
            >
              <Phone className="h-4 w-4 shrink-0 text-primary" />
              {SHOP.phoneDisplay}
            </a>
            <div className="mt-4 space-y-1 text-sm text-muted-foreground">
              {SHOP.hours.map((h) => (
                <div key={h.day} className="grid grid-cols-[minmax(0,1fr)_auto] gap-4">
                  <span className="truncate">{h.day}</span>
                  <span className="shrink-0">{h.time}</span>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <OpenStatus />
            </div>
          </div>
        </div>

        <p className="mt-10 border-t border-border pt-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} {SHOP.legalName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
