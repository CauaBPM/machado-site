import { Clock, House, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { copy } from "@/content/copy";
import { cityLabel, site } from "@/config/site";
import { AreaCheck } from "./AreaCheck";

export function ServiceArea() {
  const hasAreas = site.serviceAreas.length > 0;
  return (
    <section
      id="atendimento"
      aria-labelledby="atendimento-title"
      className="border-y border-line bg-card/60 py-16 sm:py-20 lg:py-24"
    >
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <SectionHeading id="atendimento-title" eyebrow={copy.area.eyebrow} title={copy.area.title} subtitle={copy.area.text} />

          <ul className="mt-8 space-y-4">
            {cityLabel ? (
              <li className="flex items-start gap-3">
                <MapPin aria-hidden="true" className="mt-1 size-5 shrink-0 text-rust-ink" />
                <span>
                  <strong className="font-semibold">Cidade-base:</strong> {cityLabel}
                </span>
              </li>
            ) : null}
            <li className="flex items-start gap-3">
              <House aria-hidden="true" className="mt-1 size-5 shrink-0 text-rust-ink" />
              <span>{copy.area.serviceMode}</span>
            </li>
            {site.openingHours.length ? (
              <li className="flex items-start gap-3">
                <Clock aria-hidden="true" className="mt-1 size-5 shrink-0 text-rust-ink" />
                <span>
                  <strong className="font-semibold">Horário:</strong> {site.openingHours.map((h) => h.label).join(" · ")}
                </span>
              </li>
            ) : null}
          </ul>

          {hasAreas ? (
            <div className="mt-8">
              <h3 className="label text-[0.9rem] text-wood">Regiões atendidas</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {site.serviceAreas.map((a) => (
                  <li key={a} className="rounded-full border border-line bg-card px-3.5 py-1.5 text-[0.95rem] font-medium">
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <AreaCheck cta={copy.area.cta} />
        </div>

        <AreaMap label={site.city} />
      </Container>
    </section>
  );
}

/** Representação gráfica simples (não é um mapa real): quadras, ruas e um pino. */
function AreaMap({ label }: { label: string | null }) {
  return (
    <div
      className="wood relative aspect-[16/10] overflow-hidden rounded-[22px] sm:aspect-[5/4] lg:aspect-square"
      aria-hidden="true"
    >
      <svg viewBox="0 0 400 400" className="absolute inset-0 size-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="quadras" width="56" height="56" patternUnits="userSpaceOnUse" patternTransform="rotate(-12)">
            <rect x="6" y="6" width="44" height="44" rx="4" fill="#3a2a1d" />
          </pattern>
        </defs>
        <rect width="400" height="400" fill="url(#quadras)" opacity="0.9" />
        <path d="M-20 300 C 80 250, 140 320, 240 230 S 380 150, 430 170" stroke="#8e97a5" strokeWidth="14" fill="none" opacity="0.35" />
        <path d="M60 -20 L 150 420" stroke="#eadcc0" strokeWidth="6" opacity="0.18" />
        <path d="M-20 120 L 420 60" stroke="#eadcc0" strokeWidth="6" opacity="0.18" />
        <circle cx="200" cy="200" r="120" fill="none" stroke="#d9794d" strokeWidth="2" strokeDasharray="4 8" opacity="0.8" />
        <circle cx="200" cy="200" r="70" fill="#a8431c" opacity="0.14" />
      </svg>
      <span className="stitch" />
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-[70%] flex-col items-center">
        <span className="flex size-16 rotate-45 items-center justify-center rounded-full rounded-br-none bg-rust shadow-[0_10px_25px_-6px_rgb(0_0_0/0.7)]">
          <span className="size-5 rounded-full bg-card" />
        </span>
        <span className="label mt-5 rounded-md bg-kraft px-3 py-1.5 text-[0.85rem] text-wood shadow">
          {label ?? "Sua região"}
        </span>
      </div>
    </div>
  );
}
