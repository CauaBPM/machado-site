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
          ? "border-line bg-kraft/95 shadow-[0_6px_20px_-12px_rgb(43_29_20/0.45)] backdrop-blur-sm"
          : "border-transparent bg-kraft"
      }`}
    >
      <a
        href="#conteudo"
        className="label absolute left-4 top-2 z-50 -translate-y-24 rounded-md bg-wood px-4 py-3 text-sm text-kraft focus:translate-y-0"
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
                  className="label relative flex min-h-11 items-center px-3 text-[0.95rem] text-wood/85 transition-colors after:absolute after:inset-x-3 after:bottom-2 after:h-0.5 after:origin-left after:scale-x-0 after:bg-rust after:transition-transform hover:text-wood hover:after:scale-x-100"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a href="#orcamento" className="btn btn-primary hidden min-h-11 px-5 text-[0.9rem] sm:inline-flex">
            Pedir orçamento
          </a>
          <button
            ref={menuButton}
            type="button"
            className="flex size-12 items-center justify-center rounded-lg border-2 border-wood/80 text-wood lg:hidden"
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
        className="border-t border-line bg-kraft lg:hidden"
      >
        <ul className="mx-auto max-w-[1200px] px-4 py-3 sm:px-6">
          {nav.map((item, i) => (
            <li key={item.href} className="border-b border-line/70 last:border-0">
              <a
                ref={i === 0 ? firstLink : undefined}
                href={item.href}
                onClick={() => setOpen(false)}
                className="label flex min-h-13 items-center text-lg text-wood"
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
