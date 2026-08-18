import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { CalendarDays, ChevronDown, Menu, Phone, X } from "lucide-react";
import { SHOP } from "./shop";
import { SERVICES } from "./servicesData";
import { BookAppointmentDialog } from "./BookAppointmentDialog";
import { BrandLogo } from "./BrandLogo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  const overHero = pathname === "/" && !scrolled;
  const navLinkClass = (extra = "") =>
    `text-sm font-bold uppercase tracking-wider transition-colors focus-visible:outline-none ${
      overHero ? "text-white hover:text-white/80" : "text-muted-foreground hover:text-primary"
    } ${extra}`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-background/90 backdrop-blur-md shadow-sm"
          : "bg-transparent border-transparent"
      }`}
    >
      {/* Main Nav */}
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:grid lg:grid-cols-[1fr_auto_1fr] transition-all duration-300 ${
          !scrolled ? "py-3 lg:py-4" : "py-2 lg:py-2.5"
        }`}
      >
        {/* Left Links (Desktop) */}
        <nav className="hidden items-center justify-start gap-6 lg:flex">
          <Link
            to="/why-us"
            className={navLinkClass()}
            activeProps={{ className: "!text-foreground" }}
          >
            Why Us
          </Link>
          <Link
            to="/process"
            className={navLinkClass()}
            activeProps={{ className: "!text-foreground" }}
          >
            Process
          </Link>
        </nav>

        {/* Center Logo */}
        <Link
          to="/"
          className="flex min-w-0 shrink-0 items-center justify-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <BrandLogo
            className={`w-auto transition-all duration-300 ${scrolled ? "h-14 sm:h-16" : "h-24 sm:h-32"}`}
          />
        </Link>

        {/* Right CTA / Links */}
        <div className="flex items-center justify-end gap-4 lg:gap-6">
          <nav className="hidden items-center gap-6 lg:flex">
            <DropdownMenu>
              <DropdownMenuTrigger
                className={`group inline-flex items-center gap-1 ${navLinkClass()}`}
              >
                Services
                <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" sideOffset={14} className="w-72 p-2">
                {SERVICES.map((service) => (
                  <DropdownMenuItem
                    key={service.slug}
                    asChild
                    className="cursor-pointer rounded-md py-2.5"
                  >
                    <Link
                      to="/services/$slug"
                      params={{ slug: service.slug }}
                      className="flex items-center gap-3"
                    >
                      <service.icon className="h-4 w-4 shrink-0 text-primary" />
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold text-foreground">
                          {service.title}
                        </span>
                      </span>
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor-pointer rounded-md py-2">
                  <Link
                    to="/services"
                    className="text-sm font-bold uppercase tracking-wider text-primary"
                  >
                    View all services
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          <BookAppointmentDialog
            trigger={
              <button
                type="button"
                className="brand-gradient hidden items-center gap-2 rounded px-5 py-2 text-sm font-bold uppercase tracking-wider text-primary-foreground transition-transform duration-200 hover:scale-[1.03] focus-visible:outline-none sm:inline-flex"
              >
                <CalendarDays className="h-4 w-4 shrink-0" />
                Book Appointment
              </button>
            }
          />

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className={`grid h-10 w-10 shrink-0 place-items-center rounded-md border transition-colors focus-visible:outline-none lg:hidden ${
              overHero
                ? "border-white/30 text-white hover:bg-white/10"
                : "border-border text-foreground hover:bg-secondary"
            }`}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={`overflow-hidden border-t border-border bg-background transition-[max-height,opacity] duration-300 lg:hidden ${
          open ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl flex-col px-4 py-2 sm:px-6">
          <Link
            to="/why-us"
            onClick={() => setOpen(false)}
            className="border-b border-border/60 py-3 text-sm font-bold uppercase tracking-wider text-muted-foreground transition-colors last:border-0 hover:text-foreground focus-visible:outline-none focus-visible:text-primary"
            activeProps={{ className: "!text-primary" }}
          >
            Why Us
          </Link>
          <Link
            to="/process"
            onClick={() => setOpen(false)}
            className="border-b border-border/60 py-3 text-sm font-bold uppercase tracking-wider text-muted-foreground transition-colors last:border-0 hover:text-foreground focus-visible:outline-none focus-visible:text-primary"
            activeProps={{ className: "!text-primary" }}
          >
            Process
          </Link>

          <div className="border-b border-border/60">
            <button
              type="button"
              onClick={() => setMobileServicesOpen((v) => !v)}
              aria-expanded={mobileServicesOpen}
              className="flex w-full items-center justify-between py-3 text-sm font-bold uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:text-primary"
            >
              Services
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`}
              />
            </button>
            <div
              className={`overflow-hidden transition-[max-height] duration-300 ${
                mobileServicesOpen ? "max-h-96" : "max-h-0"
              }`}
            >
              <ul className="pb-2">
                {SERVICES.map((service) => (
                  <li key={service.slug}>
                    <Link
                      to="/services/$slug"
                      params={{ slug: service.slug }}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 py-2 pl-1 text-sm font-semibold text-foreground/90 transition-colors hover:text-primary"
                    >
                      <service.icon className="h-4 w-4 shrink-0 text-primary" />
                      {service.title}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    to="/services"
                    onClick={() => setOpen(false)}
                    className="inline-block py-2 pl-1 text-xs font-bold uppercase tracking-wider text-primary"
                  >
                    View all services
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mb-3 mt-3 flex items-center">
            <BookAppointmentDialog
              trigger={
                <button
                  type="button"
                  className="brand-gradient inline-flex w-full items-center justify-center gap-2 rounded px-5 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground focus-visible:outline-none"
                >
                  <CalendarDays className="h-4 w-4" />
                  Book Appointment
                </button>
              }
            />
          </div>
        </nav>
      </div>
    </header>
  );
}
