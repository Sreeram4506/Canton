import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/home/PageHeader";
import { Services } from "@/components/home/Services";
import { SHOP } from "@/components/home/shop";

const TITLE = `Services — ${SHOP.legalName}`;
const DESCRIPTION =
  "Diagnostics, collision and auto body repair, classic car restoration, brakes and suspension, state inspection, and oil service.";

export const Route = createFileRoute("/_layout/services")({
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
    </>
  );
}
