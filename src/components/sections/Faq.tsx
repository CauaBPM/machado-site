import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { copy } from "@/content/copy";
import { faq } from "@/content/faq";
import { Accordion } from "./Accordion";

export function Faq() {
  return (
    <section id="duvidas" aria-labelledby="duvidas-title" className="py-16 sm:py-20 lg:py-24">
      <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        <div>
          <SectionHeading id="duvidas-title" eyebrow={copy.faq.eyebrow} title={copy.faq.title} />
          <div aria-hidden="true" className="ruler mt-8 hidden max-w-xs text-wood lg:block" />
        </div>
        <Accordion items={faq} />
      </Container>
    </section>
  );
}
