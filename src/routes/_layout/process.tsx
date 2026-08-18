import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/home/PageHeader";
import { Process } from "@/components/home/Process";
import { FAQSection } from "@/components/home/FAQSection";
import { SHOP } from "@/components/home/shop";

const TITLE = `Our Process — ${SHOP.legalName}`;
const DESCRIPTION = "How booking, diagnosis, and pickup work — three steps, no runaround.";

const FAQS = [
  {
    q: "Do I need to make an appointment?",
    a: "You can call ahead, book online, or just drop off — especially after a collision, when we'll hold a bay for you.",
  },
  {
    q: "Will I get a price before you start the work?",
    a: "Yes. After we inspect and photograph the issue, we send a written estimate before any repair begins.",
  },
  {
    q: "What happens if it's a collision claim?",
    a: "We coordinate directly with your insurance company on collision claims, so you don't have to relay estimates back and forth yourself.",
  },
  {
    q: "What do I get back when the repair is done?",
    a: "A completed, road-tested vehicle. If you were using a loaner, you'll swap back in and pick up your keys.",
  },
];

export const Route = createFileRoute("/_layout/process")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "/process" }],
  }),
  component: ProcessPage,
});

function ProcessPage() {
  return (
    <>
      <PageHeader
        title="Process"
        description="Three simple steps from first call to driving away."
      />
      <Process />
      <FAQSection heading="Questions about the process" items={FAQS} />
    </>
  );
}
