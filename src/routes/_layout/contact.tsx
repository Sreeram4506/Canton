import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/home/PageHeader";
import { ContactBand } from "@/components/home/ContactBand";
import { FAQSection } from "@/components/home/FAQSection";
import { Reveal } from "@/components/home/Reveal";
import { SHOP } from "@/components/home/shop";

const FAQS = [
  {
    q: "What are your hours?",
    a: `Monday–Friday ${SHOP.hours[0]!.time}, Saturday ${SHOP.hours[1]!.time}, closed Sunday.`,
  },
  {
    q: "How fast will you get back to me?",
    a: "We reply during shop hours, usually within the hour. For anything urgent, call the shop directly.",
  },
  {
    q: "Can I just drop the car off without calling first?",
    a: "Yes — especially after a collision, you can drop off and we'll take it from there.",
  },
];

const TITLE = `Contact — ${SHOP.legalName}`;
const DESCRIPTION = `Call ${SHOP.phoneDisplay}, visit ${SHOP.address}, or send us the details online and we'll call you back.`;

export const Route = createFileRoute("/_layout/contact")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact"
        description="Reach the shop directly, or send us the details and we'll call you back."
      />
      <ContactBand />

      <section className="pb-20 sm:pb-28">
        <Reveal className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-extrabold sm:text-3xl">Find us</h2>
              <p className="mt-2 text-muted-foreground">{SHOP.address}</p>
            </div>
            <a
              href={SHOP.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
            >
              Get directions
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-6 overflow-hidden rounded-2xl border border-border">
            <iframe
              title={`Map to ${SHOP.legalName}`}
              src={SHOP.mapsEmbedUrl}
              loading="lazy"
              className="h-80 w-full sm:h-96"
            />
          </div>
        </Reveal>
      </section>

      <FAQSection heading="Questions about reaching us" items={FAQS} />
    </>
  );
}
