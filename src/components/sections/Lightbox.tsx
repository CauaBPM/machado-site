"use client";

import Image from "next/image";
import { asset } from "@/lib/asset";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef } from "react";
import type { Project } from "@/content/projects";

type Props = {
  projects: Project[];
  index: number;
  onClose: () => void;
  onChange: (i: number) => void;
};

/** Visualizador de fotos em <dialog> nativo: foco preso, Esc fecha, setas navegam. */
export function Lightbox({ projects, index, onClose, onChange }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const p = projects[index];
  const total = projects.length;

  useEffect(() => {
    const dialog = ref.current;
    if (dialog && !dialog.open) dialog.showModal();
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, []);

  const go = (d: number) => onChange((index + d + total) % total);

  return (
    <dialog
      ref={ref}
      aria-label={`Foto ${index + 1} de ${total}: ${p.title}`}
      onClose={onClose}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => e.target === ref.current && onClose()}
      onKeyDown={(e) => {
        if (total < 2) return;
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
      className="m-auto max-h-none max-w-none bg-transparent p-0 backdrop:bg-wood-2/90"
    >
      <div className="flex h-dvh w-screen flex-col items-center justify-center gap-4 p-4 sm:p-8">
        <div className="flex w-full max-w-5xl items-center justify-between text-kraft">
          <p className="label text-sm" aria-live="polite">
            {index + 1} / {total}
          </p>
          <button
            type="button"
            onClick={onClose}
            autoFocus
            className="flex size-12 items-center justify-center rounded-full bg-kraft/10 hover:bg-kraft/20"
          >
            <X aria-hidden="true" className="size-6" />
            <span className="sr-only">Fechar</span>
          </button>
        </div>

        <figure className="relative flex min-h-0 w-full max-w-5xl flex-1 flex-col">
          <div className="relative min-h-0 flex-1">
            <Image src={asset(p.image.src)} alt={p.image.alt} fill sizes="100vw" className="object-contain" />
          </div>
          <figcaption className="mt-4 text-center text-kraft">
            <span className="label text-[0.8rem] text-rust-light">{p.category}</span>
            <span className="mt-1 block font-medium">{p.title}</span>
            {p.location ? <span className="block text-sm text-kraft/70">{p.location}</span> : null}
          </figcaption>
        </figure>

        {total > 1 ? (
          <div className="flex gap-3">
            <button type="button" onClick={() => go(-1)} className="flex size-12 items-center justify-center rounded-full bg-kraft text-wood hover:bg-card">
              <ChevronLeft aria-hidden="true" className="size-6" />
              <span className="sr-only">Foto anterior</span>
            </button>
            <button type="button" onClick={() => go(1)} className="flex size-12 items-center justify-center rounded-full bg-kraft text-wood hover:bg-card">
              <ChevronRight aria-hidden="true" className="size-6" />
              <span className="sr-only">Próxima foto</span>
            </button>
          </div>
        ) : null}
      </div>
    </dialog>
  );
}
