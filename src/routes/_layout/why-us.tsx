import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/home/PageHeader";
import { WhyUs } from "@/components/home/WhyUs";
import { FAQSection } from "@/components/home/FAQSection";
import { SHOP } from "@/components/home/shop";

const FAQS = [
  {
    q: "Do you give a free written estimate before starting work?",
    a: "Yes. We inspect the vehicle and send a written estimate before we touch a bolt, so there are no surprise charges once the work is underway.",
  },
  {
    q: "What if I need a car while mine is in the shop?",
    a: "We offer free loaner cars on longer repairs, so you're not stuck without wheels while we work.",
  },
  {
    q: "Are you accredited or verified by anyone besides yourselves?",
    a: `Yes — we've been BBB A+ accredited since 2015, and we're rated ${SHOP.rating}★ on Yelp from ${SHOP.reviewCount}+ reviews.`,
  },
  {
    q: "Who actually works on my car?",
    a: `${SHOP.ownerName} and the crew — a small, family-run team, not a franchise. You deal directly with the people doing the work, not a call center.`,
  },
  {
    q: "How long has Canton Auto been around?",
    a: `Since ${SHOP.founded} — that's ${SHOP.yearsInBusiness}+ years serving Canton, MA.`,
  },
];

const TITLE = `Why ${SHOP.name} — ${SHOP.legalName}`;
const DESCRIPTION =
  "Family-run since 1989, BBB A+ accredited, transparent written estimates, and free loaner cars on longer repairs.";

export const Route = createFileRoute("/_layout/why-us")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "/why-us" }],
  }),
  component: WhyUsPage,
});

function WhyUsPage() {
  return (
    <>
      <PageHeader title="Why Us" description="What makes Canton Auto different, in plain terms." />
      <WhyUs />
      <FAQSection heading="Common questions" items={FAQS} />
    </>
  );
}
