import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/home/PageHeader";
import { Testimonials } from "@/components/home/Testimonials";
import { SHOP } from "@/components/home/shop";

const TITLE = `Reviews — ${SHOP.legalName}`;
const DESCRIPTION = `Rated ${SHOP.rating} on Yelp from ${SHOP.reviewCount}+ reviews. See what Canton drivers say about the crew and the work.`;

export const Route = createFileRoute("/_layout/reviews")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "/reviews" }],
  }),
  component: ReviewsPage,
});

function ReviewsPage() {
  return (
    <>
      <PageHeader
        title="Reviews"
        description="Real feedback from Canton drivers, in their own words."
      />
      <Testimonials />
    </>
  );
}
