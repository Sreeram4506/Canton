import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { CalendarDays, Menu, Phone, X } from "lucide-react";
import { NAV, SHOP } from "./shop";
import { BookAppointmentDialog } from "./BookAppointmentDialog";
import { BrandLogo } from "./BrandLogo";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const overHero = pathname === "/" && !scrolled;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-background/85 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6 lg:py-4">
        <Link
          to="/"
          className="flex min-w-0 items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <BrandLogo light={overHero} />
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                  overHero
                    ? "text-white/85 hover:text-white"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                activeProps={{ className: "!text-primary" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <BookAppointmentDialog
            trigger={
              <button
                type="button"
                className={`hidden items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:inline-flex ${
                  overHero
                    ? "border-white/30 text-white hover:border-white/60"
                    : "border-border text-foreground hover:border-primary/60 hover:text-primary"
                }`}
              >
                <CalendarDays className="h-4 w-4 shrink-0" />
                Book Now
              </button>
            }
          />
          <a
            href={`tel:${SHOP.phone}`}
            className="brand-gradient hidden items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform duration-200 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:inline-flex"
          >
            <Phone className="h-4 w-4 shrink-0" />
            {SHOP.phoneDisplay}
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className={`grid h-10 w-10 shrink-0 place-items-center rounded-md border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background lg:hidden ${
              overHero
                ? "border-white/30 text-white hover:bg-white/10"
                : "border-border text-foreground hover:bg-secondary"
            }`}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 lg:hidden ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl flex-col px-4 py-2 sm:px-6">
          {NAV.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-border/60 py-3 text-sm font-medium text-muted-foreground transition-colors last:border-0 hover:text-foreground focus-visible:outline-none focus-visible:text-primary"
              activeProps={{ className: "!text-primary" }}
            >
              {item.label}
            </Link>
          ))}
          <BookAppointmentDialog
            trigger={
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="my-3 inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <CalendarDays className="h-4 w-4" />
                Book Now
              </button>
            }
          />
          <a
            href={`tel:${SHOP.phone}`}
            className="brand-gradient mb-3 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Phone className="h-4 w-4" />
            {SHOP.phoneDisplay}
          </a>
        </nav>
      </div>
    </header>
  );
}
