import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

export function PageHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="grid-lines absolute inset-0 -z-10" />
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-28 sm:px-6 sm:pt-36 lg:pt-40">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-sm text-muted-foreground"
        >
          <Link to="/" className="transition-colors hover:text-primary">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span className="text-foreground">{title}</span>
        </nav>
        <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">{description}</p>
        )}
      </div>
    </div>
  );
}
