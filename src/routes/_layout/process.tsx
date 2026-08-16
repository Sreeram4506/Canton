import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/home/PageHeader";
import { Process } from "@/components/home/Process";
import { SHOP } from "@/components/home/shop";

const TITLE = `Our Process — ${SHOP.legalName}`;
const DESCRIPTION = "How booking, diagnosis, and pickup work — three steps, no runaround.";

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
    </>
  );
}
