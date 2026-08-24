import { useEffect, useState } from "react";
import { SHOP } from "./shop";

const LOGO_SRC = "/cantonlogowbg.png";

/**
 * The real signage wordmark is supplied by the shop and may not be present yet.
 * Preload it and only swap in the <img> once it actually decodes, so a missing
 * file never flashes a broken-image box with the alt text sprawled across the header.
 */
export function BrandLogo({
  className = "h-10 sm:h-12",
  glow = false,
}: {
  className?: string;
  /** Adds a soft light halo so the dark wordmark stays legible over a dark photo background. */
  glow?: boolean;
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
            className={`block truncate font-display text-lg font-extrabold tracking-tight ${glow ? "text-white" : "text-foreground"}`}
          >
            {SHOP.name}
          </span>
          <span
            className={`block truncate text-[11px] uppercase tracking-[0.22em] ${glow ? "text-white/70" : "text-muted-foreground"}`}
          >
            {SHOP.tagline}
          </span>
        </span>
      </span>
    );
  }

  return (
    <img
      src={LOGO_SRC}
      alt={SHOP.legalName}
      className={`w-auto shrink-0 object-contain ${className}`}
      style={
        glow
          ? {
              filter:
                "drop-shadow(0 1px 14px rgb(255 255 255 / 0.7)) drop-shadow(0 8px 24px rgb(0 0 0 / 0.45))",
            }
          : undefined
      }
    />
  );
}
