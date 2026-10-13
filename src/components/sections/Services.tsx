import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { copy } from "@/content/copy";
import { services } from "@/content/services";
import { serviceWhatsappLink, whatsappLink } from "@/lib/whatsapp";

export function Services() {
  return (
    <section id="servicos" aria-labelledby="servicos-title" className="bg-black py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeading
          id="servicos-title"
          eyebrow={copy.services.eyebrow}
          title={copy.services.title}
          subtitle={copy.services.subtitle}
        />

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-5">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <li key={s.id}>
                <article
                  id={`servico-${s.id}`}
                  className="card group flex h-full scroll-mt-28 flex-col p-6 transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-gold/60 hover:shadow-[0_18px_40px_-24px_rgb(233_180_34/0.35)] target:border-gold sm:p-7"
                >
                  <div className="flex items-start justify-between">
                    <span className="icon-tile size-12 bg-black transition-colors group-hover:border-gold group-hover:text-gold-light">
                      <Icon aria-hidden="true" className="size-6" strokeWidth={1.4} />
                    </span>
                  </div>
                  <h3 className="label mt-5 text-[1rem] tracking-[0.16em] text-ivory">{s.name}</h3>
                  <p className="mt-2 flex-1 text-[1rem] text-ivory-muted">{s.description}</p>
                  <a
                    href={serviceWhatsappLink(s.whatsappIntent)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label mt-6 inline-flex min-h-11 items-center gap-2 self-start border-b border-gold/40 text-[0.75rem] text-gold transition-colors hover:border-gold-light hover:text-gold-light"
                  >
                    {copy.services.cta}
                    <span className="sr-only">: {s.name}, pelo WhatsApp (abre em nova aba)</span>
                    <ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </article>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 flex flex-col items-start gap-4 rounded-2xl border border-dashed border-gold-dark/50 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-medium text-ivory">{copy.services.extra}</p>
          <a
            href={whatsappLink("Olá, Machado! Encontrei vocês pelo site. Preciso de um serviço que não está na lista: ")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline min-h-11 shrink-0 px-5 text-[0.75rem]"
          >
            <WhatsAppIcon className="size-4" />
            Falar sobre outro serviço
          </a>
        </div>
      </Container>
    </section>
  );
}
