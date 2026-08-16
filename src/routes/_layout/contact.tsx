import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/home/PageHeader";
import { ContactBand } from "@/components/home/ContactBand";
import { SHOP } from "@/components/home/shop";

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
    </>
  );
}
