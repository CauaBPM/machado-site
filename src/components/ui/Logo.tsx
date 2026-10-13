import Image from "next/image";
import { asset } from "@/lib/asset";

type Props = {
  /** "horizontal": casa + nome lado a lado (cabeçalho). "full": logo completa empilhada. */
  variant?: "horizontal" | "full";
  size?: "sm" | "md";
  /** Largura da logo completa, em px. O manual pede no mínimo 120 px. */
  width?: number;
  priority?: boolean;
  className?: string;
};

/**
 * Logo oficial dourada, recortada do arquivo da marca (não redesenhada nem
 * recolorida). Sempre sobre preto, grafite ou foto escurecida: o manual
 * proíbe o uso sobre fundo claro ou colorido.
 */
export function Logo({ variant = "horizontal", size = "md", width = 220, priority = false, className = "" }: Props) {
  if (variant === "full") {
    return (
      <Image
        src={asset("/brand/logo-machado.webp")}
        alt="Machado Manutenção e Reformas"
        width={900}
        height={655}
        priority={priority}
        className={className}
        style={{ width, height: "auto" }}
      />
    );
  }

  const house = size === "sm" ? 34 : 40;
  const word = size === "sm" ? 132 : 150;
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <Image
        src={asset("/brand/emblem-128.webp")}
        alt=""
        width={128}
        height={81}
        priority={priority}
        className="shrink-0 transition-[height,width] duration-200"
        style={{ height: house, width: "auto" }}
      />
      <Image
        src={asset("/brand/wordmark.webp")}
        alt="Machado Manutenção e Reformas"
        width={480}
        height={118}
        priority={priority}
        className="shrink-0 transition-[width] duration-200"
        style={{ width: word, height: "auto" }}
      />
    </span>
  );
}
