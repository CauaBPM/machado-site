"use client";

import { useEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { whatsappLink } from "@/lib/whatsapp";

/**
 * Contato sempre à mão, sem competir:
 * - celular (< 768px): barra inferior "Solicitar orçamento";
 * - tablet/desktop: botão flutuante do WhatsApp.
 * Aparecem depois do topo da página e somem quando o formulário de
 * orçamento, o CTA final ou o rodapé estão na tela (para não cobrir nada).
 */
export function FloatingContact() {
  const [pastHero, setPastHero] = useState(false);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("inicio");
    const onScroll = () => {
      const limit = hero ? hero.offsetTop + hero.offsetHeight * 0.6 : 400;
      setPastHero(window.scrollY > limit);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const targets = ["orcamento", "contato", "rodape"]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    const visible = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
        setBlocked(visible.size > 0);
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    targets.forEach((t) => io.observe(t));

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  const show = pastHero && !blocked;
  const href = whatsappLink();

  return (
    <>
      {/* Barra inferior (mobile) */}
      <div
        className={`fixed inset-x-0 bottom-0 z-30 border-t border-wood/15 bg-kraft/95 px-4 pt-3 backdrop-blur-sm transition-transform duration-300 md:hidden ${
          show ? "translate-y-0" : "pointer-events-none translate-y-full"
        }`}
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
        inert={!show}
      >
        <a href={href} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-full">
          <WhatsAppIcon />
          Solicitar orçamento
          <span className="sr-only"> pelo WhatsApp (abre em nova aba)</span>
        </a>
      </div>

      {/* Botão flutuante (tablet/desktop) */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        inert={!show}
        className={`fixed z-30 hidden items-center gap-2.5 rounded-full bg-whatsapp py-3 pl-4 pr-5 text-card shadow-[0_12px_30px_-10px_rgb(0_0_0/0.55)] transition-[opacity,transform,background-color] duration-300 hover:bg-[#186a3f] md:flex ${
          show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
        style={{
          right: "max(1.25rem, env(safe-area-inset-right))",
          bottom: "max(1.25rem, env(safe-area-inset-bottom))",
        }}
      >
        <WhatsAppIcon className="size-6" />
        <span className="label text-[0.95rem]">WhatsApp</span>
        <span className="sr-only"> – solicitar orçamento (abre em nova aba)</span>
      </a>
    </>
  );
}
