import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { copy } from "@/content/copy";
import { QuoteWizard } from "./QuoteWizard";

export function Quote() {
  return (
    <section id="orcamento" aria-labelledby="orcamento-title" className="relative border-y border-gold-dark/30 bg-graphite py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeading
          id="orcamento-title"
          eyebrow={copy.quote.eyebrow}
          title={copy.quote.title}
          subtitle={copy.quote.subtitle}
        />
        <div className="mt-10">
          <QuoteWizard />
        </div>
      </Container>
    </section>
  );
}
