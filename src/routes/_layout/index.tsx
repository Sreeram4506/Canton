import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/home/Hero";
import { IntroSection } from "@/components/home/IntroSection";
import { Services } from "@/components/home/Services";
import { LocationsSection } from "@/components/home/LocationsSection";
import { FAQSection } from "@/components/home/FAQSection";
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

const FAQS = [
  {
    q: "Which car brands do you service?",
    a: "We service all major domestic and import brands, specializing in general repair and auto body work.",
  },
  {
    q: "Do I need an appointment, or can I walk in?",
    a: "Yes, appointments will allow us to service vehicles immediately, ensuring a quick turnaround and limiting wait time.",
  },
  {
    q: "Do you offer basic oil changes for my vehicle?",
    a: "Yes, we offer basic oil changes and routine maintenance. Service recommendations are based on your vehicle’s age and mileage.",
  },
  {
    q: "Can I drop off my car outside of business hours?",
    a: "Yes, we offer secure key lockboxes for easy, hassle-free after-hours vehicle drop-off or pickup. Our regular hours are Monday–Friday, 8 AM–5 PM.",
  },
  {
    q: "Do you charge a diagnostic fee?",
    a: "We charge a standard diagnostic fee based on the time required to properly diagnose the concern, as modern vehicle issues can be complex and involve in-depth testing.",
  },
];

function Index() {
  return (
    <>
      <Hero />
      <IntroSection />
      <Services />
      <LocationsSection />
      <FAQSection heading="Frequently Asked Questions" items={FAQS} />
    </>
  );
}
