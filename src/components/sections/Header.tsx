"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { nav } from "@/content/copy";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    firstLink.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-[background-color,box-shadow,border-color] duration-200 ${
        scrolled || open
          ? "border-gold-dark/40 bg-black/92 shadow-[0_10px_30px_-18px_rgb(0_0_0/0.9)] backdrop-blur-md"
          : "border-line bg-black"
      }`}
    >
      <a
        href="#conteudo"
        className="label absolute left-4 top-2 z-50 -translate-y-24 rounded-md bg-gold px-4 py-3 text-sm text-black focus:translate-y-0"
      >
        Pular para o conteúdo
      </a>

      <div className="mx-auto flex h-[4.5rem] max-w-[1200px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a href="#inicio" className="rounded-md">
          <Logo size={scrolled ? "sm" : "md"} priority />
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="label relative flex min-h-11 items-center px-3 text-[0.78rem] tracking-[0.2em] text-ivory/85 transition-colors after:absolute after:inset-x-3 after:bottom-2 after:h-px after:origin-left after:scale-x-0 after:bg-gold after:transition-transform hover:text-gold-light hover:after:scale-x-100"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a href="#orcamento" className="btn btn-primary hidden min-h-11 px-5 text-[0.78rem] sm:inline-flex">
            Orçamento
          </a>
          <button
            ref={menuButton}
            type="button"
            className="flex size-12 items-center justify-center rounded-lg border border-gold-dark/70 text-gold lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X aria-hidden="true" className="size-6" /> : <Menu aria-hidden="true" className="size-6" />}
            <span className="sr-only">{open ? "Fechar menu" : "Abrir menu"}</span>
          </button>
        </div>
      </div>

      <nav
        id="menu-mobile"
        aria-label="Menu"
        hidden={!open}
        className="border-t border-gold-dark/30 bg-black lg:hidden"
      >
        <ul className="mx-auto max-w-[1200px] px-4 py-3 sm:px-6">
          {nav.map((item, i) => (
            <li key={item.href} className="border-b border-line last:border-0">
              <a
                ref={i === 0 ? firstLink : undefined}
                href={item.href}
                onClick={() => setOpen(false)}
                className="label flex min-h-13 items-center text-[0.95rem] tracking-[0.2em] text-ivory"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="pb-2 pt-4 sm:hidden">
            <a href="#orcamento" onClick={() => setOpen(false)} className="btn btn-primary w-full">
              Pedir orçamento
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
