import { ArrowRight, Car } from "lucide-react";
import { Reveal } from "./Reveal";

export function AutoSalesBanner() {
  return (
    <section className="border-y border-border bg-shop-charcoal py-20 sm:py-28 text-white relative overflow-hidden">
      <img 
        src="/auto-sales-bg.jpg" 
        alt="High-quality pre-owned cars in a showroom" 
        className="absolute inset-0 z-0 h-full w-full object-cover object-center opacity-40"
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-shop-charcoal via-shop-charcoal/80 to-transparent" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-white backdrop-blur-md sm:text-xs">
              <Car className="h-4 w-4 text-primary-on-dark" />
              <span>Looking for your next vehicle?</span>
            </div>
            <h2 className="mt-5 font-display text-3xl font-black sm:text-4xl lg:text-5xl">
              We also sell high-quality, pre-owned cars.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/80 sm:text-lg">
              Washington Street Auto Sales offers a curated inventory of reliable vehicles. Every car we sell has been fully inspected and serviced by our very own master technicians.
            </p>
          </div>
          
          <div className="shrink-0">
            <a
              href="http://www.washingtonstreetautosales.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="brand-gradient group inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-full px-8 py-4 text-sm font-extrabold uppercase tracking-[0.12em] text-primary-foreground shadow-brand transition-transform duration-200 hover:translate-y-[-2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Browse Inventory
              <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
