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
    <footer id="rodape" className="wood on-dark pb-28 text-kraft md:pb-0">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr] lg:py-16">
        <div>
          <Logo tone="light" />
          <p className="mt-5 max-w-xs text-[0.98rem] text-kraft/75">{site.tagline}</p>
        </div>

        <nav aria-label="Serviços">
          <h2 className="label text-[0.85rem] text-rust-light">Serviços</h2>
          <ul className="mt-4 space-y-1">
            {services.map((s) => (
              <li key={s.id}>
                <a
                  href={serviceWhatsappLink(s.whatsappIntent)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center text-kraft/85 hover:text-kraft hover:underline"
                >
                  {s.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Navegação do rodapé">
          <h2 className="label text-[0.85rem] text-rust-light">Navegação</h2>
          <ul className="mt-4 space-y-1">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={homePrefix + item.href} className="inline-flex min-h-11 items-center text-kraft/85 hover:text-kraft hover:underline">
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a href={homePrefix + "#orcamento"} className="inline-flex min-h-11 items-center text-kraft/85 hover:text-kraft hover:underline">
                Orçamento
              </a>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="label text-[0.85rem] text-rust-light">Contato</h2>
          <ul className="mt-4 space-y-3">
            <li>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-11 items-center gap-3 font-medium hover:underline"
              >
                <WhatsAppIcon className="size-5 text-rust-light" />
                WhatsApp {site.whatsapp.display}
              </a>
            </li>
            <li>
              <a href={`tel:${site.phone.e164}`} className="flex min-h-11 items-center gap-3 hover:underline">
                <Phone aria-hidden="true" className="size-5 text-rust-light" />
                {site.phone.display}
              </a>
            </li>
            {area ? (
              <li className="flex items-start gap-3">
                <MapPin aria-hidden="true" className="mt-1 size-5 shrink-0 text-rust-light" />
                <span>{area}</span>
              </li>
            ) : null}
            {site.openingHours.length ? (
              <li className="flex items-start gap-3">
                <Clock aria-hidden="true" className="mt-1 size-5 shrink-0 text-rust-light" />
                <span>{site.openingHours.map((h) => h.label).join(" · ")}</span>
              </li>
            ) : null}
            {site.social.instagram ? (
              <li>
                <a
                  href={site.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="flex min-h-11 items-center gap-3 hover:underline"
                >
                  <InstagramIcon className="size-5 text-rust-light" />
                  {instagramHandle}
                  <span className="sr-only"> no Instagram</span>
                </a>
              </li>
            ) : null}
          </ul>
        </div>
      </Container>

      <div className="border-t border-kraft/10">
        <Container className="flex flex-col gap-3 py-6 text-[0.9rem] text-kraft/65 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}
            {site.legalName ? ` · ${site.legalName}` : ""}. Todos os direitos reservados.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/privacidade/" className="inline-flex min-h-11 items-center hover:text-kraft hover:underline">
              Política de privacidade
            </Link>
            <a
              href={site.credit.url}
              target="_blank"
              rel="noopener"
              className="inline-flex min-h-11 items-center text-kraft/50 transition-colors hover:text-kraft/80"
            >
              Desenvolvido por {site.credit.label}
            </a>
          </div>
        </Container>
      </div>
    </footer>
  );
}
