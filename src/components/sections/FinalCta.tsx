import Image from "next/image";
import { asset } from "@/lib/asset";
import { Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { copy } from "@/content/copy";
import { site } from "@/config/site";
import { whatsappLink } from "@/lib/whatsapp";

export function FinalCta() {
  return (
    <section id="contato" aria-labelledby="contato-title" className="bg-rust on-dark relative overflow-hidden text-card">
      {/* Marcas de régua nas bordas, como uma fita métrica */}
      <div aria-hidden="true" className="ruler absolute inset-x-0 top-0 text-wood" />
      <Container className="relative grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-[1fr_auto] lg:py-24">
        <div>
          <h2 id="contato-title" className="display text-[2.2rem] sm:text-[3rem] lg:text-[3.6rem]">
            {copy.finalCta.title}
          </h2>
          <p className="mt-5 max-w-2xl text-[1.1rem] text-card/90 sm:text-[1.2rem]">{copy.finalCta.subtitle}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-dark px-7 text-[1.05rem]">
              <WhatsAppIcon />
              {copy.finalCta.button}
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
            <a
              href={`tel:${site.phone.e164}`}
              className="label flex min-h-12 items-center justify-center gap-2 rounded-lg px-4 text-[1rem] text-card underline-offset-4 hover:underline"
            >
              <Phone aria-hidden="true" className="size-4" />
              Ou ligue: {site.phone.display}
            </a>
          </div>
        </div>
        <Image
          src={asset("/brand/emblem.webp")}
          alt=""
          width={256}
          height={256}
          loading="lazy"
          className="hidden size-56 rounded-full shadow-[0_20px_50px_-15px_rgb(0_0_0/0.6)] lg:block"
        />
      </Container>
    </section>
  );
}
