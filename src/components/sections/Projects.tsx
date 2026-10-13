import { Camera } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { copy } from "@/content/copy";
import { projects } from "@/content/projects";
import { whatsappLink } from "@/lib/whatsapp";
import { Gallery } from "./Gallery";

const PLACEHOLDERS = ["Pintura", "Hidráulica", "Montagem de móveis"];

export function Projects() {
  const empty = projects.length === 0;
  return (
    <section id="trabalhos" aria-labelledby="trabalhos-title" className="py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeading
          id="trabalhos-title"
          eyebrow={copy.projects.eyebrow}
          title={copy.projects.title}
          subtitle={empty ? copy.projects.emptySubtitle : copy.projects.subtitle}
        />

        {empty ? (
          <>
            <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-label="Galeria em preparação">
              {PLACEHOLDERS.map((cat, i) => (
                <li
                  key={cat}
                  className={`leather relative flex aspect-[16/9] flex-col sm:aspect-[4/3] items-center justify-center rounded-[var(--radius-photo)] text-center text-kraft ${
                    i === 2 ? "hidden lg:flex" : ""
                  }`}
                >
                  <span className="stitch" />
                  <Camera aria-hidden="true" className="size-8 text-rust-light" strokeWidth={1.6} />
                  <p className="label mt-3 text-[0.95rem]">{cat}</p>
                  <p className="mt-1 text-sm text-kraft/70">Fotos reais em breve</p>
                </li>
              ))}
            </ul>
            <a
              href={whatsappLink("Olá, Machado! Encontrei vocês pelo site. Vocês podem me mostrar fotos de trabalhos parecidos com o que eu preciso?")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline mt-8"
            >
              <WhatsAppIcon className="size-4" />
              {copy.projects.emptyCta}
            </a>
          </>
        ) : (
          <Gallery projects={projects} />
        )}
      </Container>
    </section>
  );
}
