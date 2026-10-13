import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { copy } from "@/content/copy";
import { QuoteWizard } from "./QuoteWizard";

export function Quote() {
  return (
    <section id="orcamento" aria-labelledby="orcamento-title" className="leather on-dark relative py-16 text-kraft sm:py-20 lg:py-24">
      <Container>
        <SectionHeading
          id="orcamento-title"
          eyebrow={copy.quote.eyebrow}
          title={copy.quote.title}
          subtitle={copy.quote.subtitle}
          tone="light"
        />
        <div className="mt-10">
          <QuoteWizard />
        </div>
      </Container>
    </section>
  );
}
