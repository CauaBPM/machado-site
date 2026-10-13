import Image from "next/image";
import { asset } from "@/lib/asset";

type Props = {
  /** Tom do texto: "dark" sobre kraft, "light" sobre madeira/couro. */
  tone?: "dark" | "light";
  size?: "sm" | "md";
  priority?: boolean;
};

/**
 * Logo oficial: emblema extraído do arquivo da marca + nome em Alfa Slab One,
 * a mesma composição horizontal do manual de identidade.
 * O emblema não é redesenhado nem recolorido.
 */
export function Logo({ tone = "dark", size = "md", priority = false }: Props) {
  const emblem = size === "sm" ? 44 : 52;
  return (
    <span className="flex items-center gap-3">
      <Image
        src={asset("/brand/emblem-128.webp")}
        alt=""
        width={emblem}
        height={emblem}
        priority={priority}
        className="shrink-0 transition-[width,height] duration-200"
        style={{ width: emblem, height: emblem }}
      />
      <span className="flex flex-col leading-none">
        <span
          className={`display ${size === "sm" ? "text-[1.45rem]" : "text-[1.65rem]"} ${tone === "light" ? "text-kraft" : "text-wood"}`}
        >
          MACHADO
        </span>
        <span
          className={`label mt-1 text-[0.62rem] tracking-[0.26em] ${tone === "light" ? "text-rust-light" : "text-rust-ink"}`}
        >
          Manutenção e Reforma
        </span>
      </span>
    </span>
  );
}
