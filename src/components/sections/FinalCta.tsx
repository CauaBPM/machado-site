import { Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { copy } from "@/content/copy";
import { site } from "@/config/site";
import { whatsappLink } from "@/lib/whatsapp";

export function FinalCta() {
  return (
    <section id="contato" aria-labelledby="contato-title" className="relative overflow-hidden bg-black">
      <div aria-hidden="true" className="gold-rule-fade" />
      <div aria-hidden="true" className="gold-glow pointer-events-none absolute -right-48 top-1/2 hidden size-[44rem] -translate-y-1/2 lg:block" />
      <Container className="relative grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-[1fr_auto] lg:gap-16 lg:py-24">
        <div>
          <p className="eyebrow">Contato</p>
          <h2 id="contato-title" className="display mt-4 text-[2rem] sm:text-[2.7rem] lg:text-[3.1rem]">
            {copy.finalCta.title}
          </h2>
          <div aria-hidden="true" className="gold-rule mt-6 w-20" />
          <p className="mt-6 max-w-2xl text-[1.05rem] text-ivory-muted sm:text-[1.15rem]">{copy.finalCta.subtitle}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-primary px-7">
              <WhatsAppIcon className="size-[1.1rem]" />
              {copy.finalCta.button}
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
            <a href={`tel:${site.phone.e164}`} className="btn btn-outline">
              <Phone aria-hidden="true" className="size-4" />
              Ligar: {site.phone.display}
            </a>
          </div>
        </div>
        <Logo variant="full" width={300} className="hidden lg:block" />
      </Container>
    </section>
  );
}
