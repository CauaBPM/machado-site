import Link from "next/link";
import { Clock, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { Logo } from "@/components/ui/Logo";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { nav } from "@/content/copy";
import { services } from "@/content/services";
import { cityLabel, instagramHandle, site } from "@/config/site";
import { serviceWhatsappLink, whatsappLink } from "@/lib/whatsapp";

export function Footer({ homePrefix = "" }: { homePrefix?: string }) {
  const year = new Date().getFullYear();
  const area = site.serviceAreas.length ? site.serviceAreas.join(", ") : cityLabel;

  return (
    <footer id="rodape" className="border-t border-gold-dark/40 bg-graphite pb-28 md:pb-0">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr] lg:py-16">
        <div>
          <Logo variant="full" width={170} />
          <p className="mt-6 max-w-xs text-[0.98rem] text-ivory-muted">{site.tagline}</p>
        </div>

        <nav aria-label="Serviços">
          <h2 className="label text-[0.72rem] text-gold">Serviços</h2>
          <ul className="mt-4 space-y-1">
            {services.map((s) => (
              <li key={s.id}>
                <a
                  href={serviceWhatsappLink(s.whatsappIntent)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center text-ivory/85 hover:text-gold-light"
                >
                  {s.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Navegação do rodapé">
          <h2 className="label text-[0.72rem] text-gold">Navegação</h2>
          <ul className="mt-4 space-y-1">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={homePrefix + item.href} className="inline-flex min-h-11 items-center text-ivory/85 hover:text-gold-light">
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a href={homePrefix + "#orcamento"} className="inline-flex min-h-11 items-center text-ivory/85 hover:text-gold-light">
                Orçamento
              </a>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="label text-[0.72rem] text-gold">Contato</h2>
          <ul className="mt-4 space-y-3">
            <li>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-11 items-center gap-3 font-medium hover:text-gold-light"
              >
                <WhatsAppIcon className="size-5 text-gold" />
                <span>WhatsApp <span className="whitespace-nowrap">{site.whatsapp.display}</span></span>
              </a>
            </li>
            <li>
              <a href={`tel:${site.phone.e164}`} className="flex min-h-11 items-center gap-3 hover:text-gold-light">
                <Phone aria-hidden="true" className="size-5 text-gold" strokeWidth={1.5} />
                {site.phone.display}
              </a>
            </li>
            {area ? (
              <li className="flex items-start gap-3">
                <MapPin aria-hidden="true" className="mt-1 size-5 shrink-0 text-gold" strokeWidth={1.5} />
                <span>{area}</span>
              </li>
            ) : null}
            {site.openingHours.length ? (
              <li className="flex items-start gap-3">
                <Clock aria-hidden="true" className="mt-1 size-5 shrink-0 text-gold" strokeWidth={1.5} />
                <span>{site.openingHours.map((h) => h.label).join(" · ")}</span>
              </li>
            ) : null}
            {site.social.instagram ? (
              <li>
                <a
                  href={site.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="flex min-h-11 items-center gap-3 hover:text-gold-light"
                >
                  <InstagramIcon className="size-5 text-gold" />
                  {instagramHandle}
                  <span className="sr-only"> no Instagram</span>
                </a>
              </li>
            ) : null}
          </ul>
        </div>
      </Container>

      <div className="border-t border-line">
        <Container className="flex flex-col gap-3 py-6 text-[0.9rem] text-ivory-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}
            {site.legalName ? ` · ${site.legalName}` : ""}. Todos os direitos reservados.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/privacidade/" className="inline-flex min-h-11 items-center hover:text-gold-light">
              Política de privacidade
            </Link>
            <a
              href={site.credit.url}
              target="_blank"
              rel="noopener"
              className="inline-flex min-h-11 items-center text-ivory-muted/80 transition-colors hover:text-gold-light"
            >
              Desenvolvido por {site.credit.label}
            </a>
          </div>
        </Container>
      </div>
    </footer>
  );
}
