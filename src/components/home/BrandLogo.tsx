import { useEffect, useState } from "react";
import { SHOP } from "./shop";

const LOGO_SRC = "/canton-logo.png";

/**
 * The real signage wordmark is supplied by the shop and may not be present yet.
 * Preload it and only swap in the <img> once it actually decodes, so a missing
 * file never flashes a broken-image box with the alt text sprawled across the header.
 */
export function BrandLogo({
  className = "h-11 sm:h-14",
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setLoaded(true);
    img.src = LOGO_SRC;
    return () => {
      img.onload = null;
    };
  }, []);

  if (!loaded) {
    return (
      <span className="flex min-w-0 items-center gap-3">
        <span className="brand-gradient grid h-9 w-9 shrink-0 place-items-center rounded-lg font-display text-sm font-extrabold text-primary-foreground">
          C
        </span>
        <span className="min-w-0">
          <span
            className={`block truncate font-display text-lg font-extrabold tracking-tight ${light ? "text-white" : "text-foreground"}`}
          >
            {SHOP.name}
          </span>
          <span
            className={`block truncate text-[11px] uppercase tracking-[0.22em] ${light ? "text-white/70" : "text-muted-foreground"}`}
          >
            {SHOP.tagline}
          </span>
        </span>
      </span>
    );
  }

  return <img src={LOGO_SRC} alt={SHOP.legalName} className={`w-auto shrink-0 ${className}`} />;
}
