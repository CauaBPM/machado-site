import Image from "next/image";
import { asset } from "@/lib/asset";
import { ArrowDown, Clock, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { copy } from "@/content/copy";
import { cityLabel, site } from "@/config/site";
import { whatsappLink } from "@/lib/whatsapp";

export function Hero() {
  const areaText = site.serviceAreas.length
    ? site.serviceAreas.slice(0, 3).join(", ") + (site.serviceAreas.length > 3 ? " e região" : "")
    : cityLabel
      ? `${cityLabel} e região`
      : "Casas, apartamentos e comércios";

  const facts = [
    { icon: MapPin, label: "Atendimento", value: areaText },
    ...(site.openingHours.length
      ? [{ icon: Clock, label: "Horário", value: site.openingHours.map((h) => h.label).join(" · ") }]
      : []),
    { icon: Phone, label: "WhatsApp", value: site.whatsapp.display },
  ];

  const [question, answer] = splitTitle(copy.hero.title);

  return (
    <section id="inicio" aria-labelledby="hero-title" className="wood on-dark relative overflow-hidden text-kraft">
      <Container className="grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 lg:py-20">
        <div>
          <p className="eyebrow">{copy.hero.eyebrow}</p>
          <h1 id="hero-title" className="display mt-4 text-[2.35rem] sm:text-[3.3rem] lg:text-[3.9rem]">
            {question} <span className="text-rust-light">{answer}</span>
          </h1>
          <p className="mt-5 max-w-xl text-[1.08rem] text-kraft/85 sm:text-[1.2rem]">{copy.hero.subtitle}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary sm:px-7"
            >
              <WhatsAppIcon />
              {copy.hero.primary}
              <span className="sr-only"> pelo WhatsApp (abre em nova aba)</span>
            </a>
            <a href="#servicos" className="btn btn-outline-light">
              {copy.hero.secondary}
              <ArrowDown aria-hidden="true" className="size-4" />
            </a>
          </div>

          <ul className="mt-10 grid gap-x-8 gap-y-4 border-t border-kraft/15 pt-6 sm:grid-cols-2 lg:max-w-xl">
            {facts.map(({ icon: Icon, label, value }) => (
              <li key={label} className="flex items-start gap-3">
                <Icon aria-hidden="true" className="mt-1 size-5 shrink-0 text-rust-light" />
                <span>
                  <span className="label block text-[0.78rem] text-steel-light">{label}</span>
                  <span className="block font-medium text-kraft">{value}</span>
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
              className="aspect-[4/5] w-full rounded-[var(--radius-photo)] object-cover"
            />
          </div>
        ) : (
          <HeroPanel />
        )}
      </Container>
    </section>
  );
}

/** Divide "Pergunta? Resposta." para destacar a resposta. */
function splitTitle(title: string): [string, string] {
  const i = title.indexOf("?");
  return i === -1 ? [title, ""] : [title.slice(0, i + 1), title.slice(i + 1).trim()];
}

/**
 * Painel exibido enquanto não há foto real: couro + costura (como o emblema)
 * e um bilhete que mostra como fica um pedido feito pelo site.
 * Identificado como "exemplo" para não parecer um serviço real.
 */
function HeroPanel() {
  const lines = [
    ["Serviço", "Hidráulica"],
    ["Local", "Apartamento"],
    ["Descrição", "Trocar a torneira da cozinha e instalar duas prateleiras."],
    ["Prazo", "Nos próximos dias"],
  ];
  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none" aria-hidden="true">
      <div className="leather relative aspect-[4/4.4] rounded-[22px] p-6 shadow-[0_30px_60px_-25px_rgb(0_0_0/0.7)] sm:aspect-[4/4] sm:p-10">
        <span className="stitch" />
        <Image
          src={asset("/brand/emblem.webp")}
          alt=""
          width={256}
          height={256}
          priority
          className="absolute -right-6 -top-6 size-28 rotate-12 opacity-95 sm:size-32"
        />

        <div className="relative flex h-full items-center justify-center">
          <div className="w-full max-w-[19rem] -rotate-2 rounded-lg bg-card px-6 pb-6 pt-5 text-wood shadow-[0_18px_30px_-12px_rgb(0_0_0/0.6)]">
            <div className="flex items-center justify-between border-b border-dashed border-line pb-3">
              <p className="label text-[0.8rem] text-rust-ink">Exemplo de pedido</p>
              <WhatsAppIcon className="size-5 text-whatsapp" />
            </div>
            <dl className="mt-3 space-y-2 text-[0.95rem] leading-snug">
              {lines.map(([k, v]) => (
                <div key={k}>
                  <dt className="label text-[0.72rem] text-muted">{k}</dt>
                  <dd className="font-medium">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="label mt-4 rounded-md bg-wood px-3 py-2 text-center text-[0.78rem] text-kraft">
              Pronto para enviar
            </p>
          </div>
        </div>

        <div className="ruler absolute inset-x-8 bottom-5 text-kraft" />
      </div>
    </div>
  );
}
