import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { copy } from "@/content/copy";

export function HowItWorks() {
  return (
    <section
      id="como-funciona"
      aria-labelledby="como-funciona-title"
      className="border-y border-line bg-card py-16 sm:py-20 lg:py-24"
    >
      <Container>
        <SectionHeading id="como-funciona-title" eyebrow={copy.how.eyebrow} title={copy.how.title} />

        <div className="relative mt-12">
          {/* Fita métrica ligando as etapas (desktop) */}
          <div aria-hidden="true" className="ruler pointer-events-none absolute inset-x-0 top-[1.6rem] hidden text-wood md:block" />
          <ol className="relative grid gap-10 md:grid-cols-3 md:gap-8">
          {copy.how.steps.map((step, i) => (
            <li key={step.title} className="relative flex gap-5 md:block">
              <span className="relative z-10 flex h-[4.25rem] w-[4.75rem] shrink-0 items-center justify-center rounded-xl bg-wood text-kraft shadow-[0_4px_0_var(--color-rust)]">
                <span className="display text-[1.9rem]">{String(i + 1).padStart(2, "0")}</span>
              </span>
              {/* Linha vertical (mobile) */}
              {i < copy.how.steps.length - 1 ? (
                <span aria-hidden="true" className="absolute bottom-[-2.5rem] left-[2.35rem] top-[4.75rem] w-0 border-l-2 border-dashed border-line md:hidden" />
              ) : null}
              <div className="md:mt-6">
                <h3 className="label text-[1.3rem] tracking-[0.06em] text-wood">{step.title}</h3>
                <p className="mt-2 max-w-sm text-muted">{step.text}</p>
              </div>
            </li>
          ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
