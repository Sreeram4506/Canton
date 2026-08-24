import { Link } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { NAV, SHOP } from "./shop";
import { BrandLogo } from "./BrandLogo";
import { OpenStatus } from "./OpenStatus";

export function SiteFooter() {
  return (
    <footer className="shop-dark border-t border-white/15 py-12 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div className="min-w-0">
            <BrandLogo className="h-14" glow />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/70">
              Family-run auto repair and auto body shop serving Canton, MA since {SHOP.founded},
              with transparent pricing on every job.
            </p>
          </div>

          <nav className="min-w-0">
            <h3 className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary-on-dark">
              Explore
            </h3>
            <ul className="mt-4 space-y-2">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-sm text-white/70 transition-colors hover:text-primary-on-dark focus-visible:outline-none focus-visible:text-primary-on-dark focus-visible:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="min-w-0">
            <h3 className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary-on-dark">
              Visit
            </h3>
            <p className="mt-4 text-sm text-white/70">{SHOP.address}</p>
            <a
              href={`tel:${SHOP.phone}`}
              className="mt-3 inline-flex items-center gap-2 font-display text-base font-bold text-white transition-colors hover:text-primary-on-dark focus-visible:outline-none focus-visible:text-primary-on-dark focus-visible:underline"
            >
              <Phone className="h-4 w-4 shrink-0 text-primary-on-dark" />
              {SHOP.phoneDisplay}
            </a>
            <div className="mt-4 space-y-1 text-sm text-white/70">
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

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/15 pt-6 text-xs text-white/60 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {SHOP.legalName}. All rights reserved.
          </p>
          <Link
            to="/admin"
            className="inline-flex items-center gap-1 font-semibold text-white/60 transition-colors hover:text-primary-on-dark focus-visible:outline-none focus-visible:text-primary-on-dark"
          >
            Admin Portal
          </Link>
        </div>
      </div>
    </footer>
  );
}
