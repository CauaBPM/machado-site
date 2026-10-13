"use client";

import Image from "next/image";
import { asset } from "@/lib/asset";
import { ChevronsLeftRight } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import type { ProjectImage } from "@/content/projects";

/**
 * Comparador antes/depois. Funciona por arraste (mouse e toque) e teclado
 * (setas, Home/End), usando o padrão ARIA de "slider".
 */
export function BeforeAfter({ before, after, title }: { before: ProjectImage; after: ProjectImage; title: string }) {
  const [pos, setPos] = useState(50);
  const box = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const update = useCallback((clientX: number) => {
    const rect = box.current?.getBoundingClientRect();
    if (!rect) return;
    setPos(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)));
  }, []);

  const onKey = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 5;
    const map: Record<string, number> = { ArrowLeft: -step, ArrowDown: -step, ArrowRight: step, ArrowUp: step };
    if (e.key in map) setPos((p) => Math.min(100, Math.max(0, p + map[e.key])));
    else if (e.key === "Home") setPos(0);
    else if (e.key === "End") setPos(100);
    else return;
    e.preventDefault();
  };

  return (
    <div
      ref={box}
      className="relative aspect-[4/3] touch-pan-y select-none overflow-hidden rounded-[var(--radius-photo)] bg-leather"
      onPointerDown={(e) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        update(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && update(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      <Image src={asset(after.src)} alt={after.alt} fill sizes="(min-width: 1024px) 600px, 100vw" loading="lazy" draggable={false} className="object-cover" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={asset(before.src)} alt={before.alt} fill sizes="(min-width: 1024px) 600px, 100vw" loading="lazy" draggable={false} className="object-cover" />
      </div>

      <span className="label pointer-events-none absolute left-3 top-3 rounded-md bg-wood/85 px-2.5 py-1 text-[0.75rem] text-kraft">Antes</span>
      <span className="label pointer-events-none absolute right-3 top-3 rounded-md bg-rust px-2.5 py-1 text-[0.75rem] text-card">Depois</span>

      <div className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-card" style={{ left: `${pos}%` }} />
      <div
        role="slider"
        tabIndex={0}
        aria-label={`Comparar antes e depois: ${title}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        aria-valuetext={`${Math.round(pos)}% da foto de antes visível`}
        onKeyDown={onKey}
        className="absolute top-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border-2 border-card bg-rust text-card shadow-lg"
        style={{ left: `${pos}%` }}
      >
        <ChevronsLeftRight aria-hidden="true" className="size-6" />
      </div>
    </div>
  );
}
