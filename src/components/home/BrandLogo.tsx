import { useState } from "react";
import { SHOP } from "./shop";

export function BrandLogo({ className = "h-11 sm:h-14" }: { className?: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className="flex min-w-0 items-center gap-3">
        <span className="brand-gradient grid h-9 w-9 shrink-0 place-items-center rounded-lg font-display text-sm font-extrabold text-primary-foreground">
          C
        </span>
        <span className="min-w-0">
          <span className="block truncate font-display text-lg font-extrabold tracking-tight">
            {SHOP.name}
          </span>
          <span className="block truncate text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            {SHOP.tagline}
          </span>
        </span>
      </span>
    );
  }

  return (
    <img
      src="/canton-logo.png"
      alt={SHOP.legalName}
      className={`w-auto shrink-0 ${className}`}
      onError={() => setFailed(true)}
    />
  );
}
