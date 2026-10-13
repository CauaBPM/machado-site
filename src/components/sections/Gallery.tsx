"use client";

import Image from "next/image";
import { asset } from "@/lib/asset";
import { Maximize2 } from "lucide-react";
import { useRef, useState } from "react";
import type { Project } from "@/content/projects";
import { BeforeAfter } from "./BeforeAfter";
import { Lightbox } from "./Lightbox";

export function Gallery({ projects }: { projects: Project[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);
  const comparisons = projects.filter((p) => p.before);
  const photos = projects.filter((p) => !p.before);

  const close = () => {
    const i = open;
    setOpen(null);
    if (i !== null) requestAnimationFrame(() => triggers.current[i]?.focus());
  };

  return (
    <>
      {comparisons.length ? (
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {comparisons.map((p) => (
            <article key={p.id}>
              <BeforeAfter before={p.before!} after={p.image} title={p.title} />
              <ProjectCaption project={p} />
            </article>
          ))}
        </div>
      ) : null}

      {photos.length ? (
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((p, i) => (
            <li key={p.id}>
              <article>
                <button
                  ref={(el) => {
                    triggers.current[i] = el;
                  }}
                  type="button"
                  onClick={() => setOpen(i)}
                  className="group relative block aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-photo)] bg-leather"
                >
                  <Image
                    src={asset(p.image.src)}
                    alt={p.image.alt}
                    fill
                    loading="lazy"
                    sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <span className="absolute bottom-3 right-3 flex size-10 items-center justify-center rounded-full bg-wood/80 text-kraft opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                    <Maximize2 aria-hidden="true" className="size-4" />
                  </span>
                  <span className="sr-only">Ampliar foto: {p.title}</span>
                </button>
                <ProjectCaption project={p} />
              </article>
            </li>
          ))}
        </ul>
      ) : null}

      {open !== null ? <Lightbox projects={photos} index={open} onChange={setOpen} onClose={close} /> : null}
    </>
  );
}

function ProjectCaption({ project: p }: { project: Project }) {
  return (
    <div className="mt-3">
      <p className="label text-[0.78rem] text-rust-ink">{p.category}</p>
      <h3 className="mt-0.5 font-semibold text-wood">{p.title}</h3>
      <p className="text-[0.98rem] text-muted">{p.description}</p>
      {p.location ? <p className="mt-1 text-sm text-muted">{p.location}</p> : null}
    </div>
  );
}
