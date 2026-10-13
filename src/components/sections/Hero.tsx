import Image from "next/image";
import { asset } from "@/lib/asset";
import { ArrowDown, Clock, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { copy } from "@/content/copy";
import { services } from "@/content/services";
import { cityLabel, site } from "@/config/site";
import { whatsappLink } from "@/lib/whatsapp";

export function Hero() {
  const areaText = site.serviceAreas.length
    ? site.serviceAreas.slice(0, 3).join(", ") + (site.serviceAreas.length > 3 ? " e região" : "")
    : cityLabel
      ? `${cityLabel} e região`
      : "Casas, apartamentos e empresas";

  const facts = [
    { icon: MapPin, label: "Atendimento", value: areaText },
    ...(site.openingHours.length
      ? [{ icon: Clock, label: "Horário", value: site.openingHours.map((h) => h.label).join(" · ") }]
      : []),
    { icon: Phone, label: "WhatsApp", value: site.whatsapp.display },
  ];

  const eyebrow = site.city ? [site.city, site.state].filter(Boolean).join(" · ") : copy.hero.eyebrow;

  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative overflow-hidden bg-black">
      {/* Brilho dourado discreto atrás da logo */}
      <div aria-hidden="true" className="gold-glow pointer-events-none absolute -right-40 top-0 hidden size-[56rem] lg:block" />

      <Container className="relative grid items-center gap-10 pb-10 pt-12 sm:pt-16 lg:grid-cols-[1.3fr_0.7fr] lg:gap-12 lg:pb-14 lg:pt-20">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1 id="hero-title" className="display mt-5 text-[2rem] sm:text-[2.8rem] lg:text-[3.25rem]">
            {copy.hero.title} <span className="gold-text">{copy.hero.highlight}</span>
          </h1>
          <p className="mt-6 max-w-xl text-[1.05rem] text-ivory-muted sm:text-[1.15rem]">{copy.hero.subtitle}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-primary sm:px-7">
              <WhatsAppIcon className="size-[1.1rem]" />
              {copy.hero.primary}
              <span className="sr-only"> pelo WhatsApp (abre em nova aba)</span>
            </a>
            <a href="#servicos" className="btn btn-outline">
              {copy.hero.secondary}
              <ArrowDown aria-hidden="true" className="size-4" />
            </a>
          </div>

          <ul className="mt-10 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:max-w-xl">
            {facts.map(({ icon: Icon, label, value }) => (
              <li key={label} className="flex items-start gap-3">
                <Icon aria-hidden="true" className="mt-1 size-5 shrink-0 text-gold" strokeWidth={1.5} />
                <span>
                  <span className="label block text-[0.7rem] text-gold">{label}</span>
                  <span className="block font-medium text-ivory">{value}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {site.heroPhoto ? (
          <div className="relative">
            <Image
              src={asset(site.heroPhoto.src)}
              alt={site.heroPhoto.alt}
              width={site.heroPhoto.width}
              height={site.heroPhoto.height}
              priority
              sizes="(min-width: 1024px) 480px, 100vw"
              className="aspect-[4/5] w-full rounded-[var(--radius-photo)] border border-gold-dark/40 object-cover"
            />
          </div>
        ) : (
          <div className="relative hidden justify-center lg:flex">
            <Logo variant="full" width={400} priority className="drop-shadow-[0_20px_40px_rgb(233_180_34/0.12)]" />
          </div>
        )}
      </Container>

      {/* Fileira de serviços, como na aplicação do manual */}
      <Container className="relative pb-14 sm:pb-16 lg:pb-20">
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <li key={s.id}>
                <a
                  href={`#servico-${s.id}`}
                  className="card group flex h-full min-h-[6.5rem] flex-col justify-between gap-4 p-4 transition-colors hover:border-gold/70 hover:bg-graphite-2"
                >
                  <Icon aria-hidden="true" className="size-6 text-gold transition-colors group-hover:text-gold-light" strokeWidth={1.4} />
                  <span className="label text-[0.72rem] leading-snug text-ivory">{s.name}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </Container>

      <div aria-hidden="true" className="gold-rule-fade" />
    </section>
  );
}
