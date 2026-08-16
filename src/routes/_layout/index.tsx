import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/home/Hero";
import { ExploreLinks } from "@/components/home/ExploreLinks";
import { SHOP } from "@/components/home/shop";

const TITLE = "Canton Auto Services & Auto Body — Repair, Collision & Classic Restoration";
const DESCRIPTION =
  "Canton Auto Services & Auto Body has served Canton, MA since 1989: diagnostics, brakes, collision repair, classic car restoration and state inspections. BBB A+ accredited, 4.4★ on Yelp.";

export const Route = createFileRoute("/_layout/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AutoRepair",
          name: SHOP.legalName,
          telephone: SHOP.phone,
          description: DESCRIPTION,
          address: {
            "@type": "PostalAddress",
            streetAddress: "879B Washington St",
            addressLocality: "Canton",
            addressRegion: "MA",
            postalCode: "02021",
            addressCountry: "US",
          },
          openingHours: ["Mo-Fr 08:00-17:00", "Sa 08:00-14:00"],
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: SHOP.rating,
            reviewCount: SHOP.reviewCount,
          },
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <ExploreLinks />
    </>
  );
}
