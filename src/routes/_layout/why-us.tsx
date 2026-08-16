import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/home/PageHeader";
import { WhyUs } from "@/components/home/WhyUs";
import { SHOP } from "@/components/home/shop";

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
    </>
  );
}
