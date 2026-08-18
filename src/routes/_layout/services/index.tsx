import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/home/PageHeader";
import { Services } from "@/components/home/Services";
import { FAQSection } from "@/components/home/FAQSection";
import { SHOP } from "@/components/home/shop";

const FAQS = [
  {
    q: "Do you work on all makes and models?",
    a: "Yes — our bays handle domestic, import, and vintage vehicles alike, from routine maintenance to full collision repair.",
  },
  {
    q: "Will you deal with my insurance company directly?",
    a: "Yes. On collision claims, we coordinate directly with your insurer, so you're not stuck relaying quotes back and forth.",
  },
  {
    q: "Can I get a Massachusetts state inspection done there?",
    a: "Yes — we handle state inspection stickers and emissions testing while you wait.",
  },
  {
    q: "Do you only do collision work, or routine maintenance too?",
    a: "Both, under one roof: oil changes and multi-point checks, brakes and suspension, diagnostics, and full collision or restoration work.",
  },
];

const TITLE = `Services — ${SHOP.legalName}`;
const DESCRIPTION =
  "Diagnostics, collision and auto body repair, classic car restoration, brakes and suspension, state inspection, and oil service.";

export const Route = createFileRoute("/_layout/services/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Services"
        description="Every service under one roof — no need to shop around."
      />
      <Services />
      <FAQSection heading="Questions about our services" items={FAQS} />
    </>
  );
}
