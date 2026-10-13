"use client";

import { Plus } from "lucide-react";
import { useId, useState } from "react";
import type { FaqItem } from "@/content/faq";

/**
 * Accordion acessível (padrão WAI-ARIA): botões com aria-expanded e
 * aria-controls. As respostas ficam no HTML desde o início (bom para SEO);
 * fechadas, ficam fora da árvore de acessibilidade via `inert`.
 */
export function Accordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const uid = useId();

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, i) => {
        const expanded = open === i;
        const btn = `${uid}-b${i}`;
        const panel = `${uid}-p${i}`;
        return (
          <div key={item.question}>
            <h3>
              <button
                id={btn}
                type="button"
                aria-expanded={expanded}
                aria-controls={panel}
                onClick={() => setOpen(expanded ? null : i)}
                className="flex min-h-16 w-full items-center justify-between gap-4 py-4 text-left text-[1.08rem] font-semibold text-wood transition-colors hover:text-rust-ink sm:text-[1.15rem]"
              >
                {item.question}
                <span
                  className={`flex size-9 shrink-0 items-center justify-center rounded-full border-2 transition-[transform,background-color,border-color,color] duration-300 ${
                    expanded ? "rotate-45 border-rust bg-rust text-card" : "border-line text-rust-ink"
                  }`}
                >
                  <Plus aria-hidden="true" className="size-4" strokeWidth={2.5} />
                </span>
              </button>
            </h3>
            <div
              id={panel}
              role="region"
              aria-labelledby={btn}
              inert={!expanded}
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl pb-6 pr-4 text-muted sm:pr-12">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
