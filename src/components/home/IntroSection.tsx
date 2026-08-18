import { SHOP } from "./shop";

export function IntroSection() {
  return (
    <section className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <h2 className="font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Specializing in Auto Repair & Collision
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          {SHOP.legalName}, Canton’s leading auto repair and body shop, specializes in diagnostics, collision repair, and classic car restoration. Providing auto owners with quality, trained service, utilizing premium replacement parts, all with the highest level of service and satisfaction. {SHOP.name} is located in the heart of Canton, MA. We take pride in our neighborhood and strive to bestow a very personalized experience that can only be achieved with a sense of community.
        </p>
      </div>
    </section>
  );
}
