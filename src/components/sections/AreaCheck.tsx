"use client";

import { useId, useState } from "react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { areaCheckMessage, whatsappLink } from "@/lib/whatsapp";

/** Campo opcional: o bairro digitado entra na mensagem. Nada é armazenado. */
export function AreaCheck({ cta }: { cta: string }) {
  const [place, setPlace] = useState("");
  const id = useId();
  const link = whatsappLink(areaCheckMessage + (place.trim() || "(informe seu bairro e cidade)"));

  return (
    <div className="mt-8 rounded-2xl border border-line bg-card p-5 sm:p-6">
      <label htmlFor={id} className="label block text-[0.9rem] text-wood">
        Seu bairro e cidade <span className="font-normal normal-case tracking-normal text-muted">(opcional)</span>
      </label>
      <div className="mt-3 flex flex-col gap-3 md:flex-row lg:flex-col xl:flex-row">
        <input
          id={id}
          type="text"
          autoComplete="address-level3"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          placeholder="Ex.: nome do bairro, cidade"
          className="min-h-13 w-full min-w-0 flex-1 rounded-xl border-2 border-line bg-kraft/40 px-4 text-wood placeholder:text-muted/75 focus:border-rust focus:outline-none"
        />
        <a href={link} target="_blank" rel="noopener noreferrer" className="btn btn-primary shrink-0">
          <WhatsAppIcon className="size-5" />
          {cta}
          <span className="sr-only"> pelo WhatsApp (abre em nova aba)</span>
        </a>
      </div>
    </div>
  );
}
