import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { asset } from "@/lib/asset";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "Machado",
    description: site.tagline,
    start_url: asset("/"),
    display: "browser",
    background_color: "#eadcc0",
    theme_color: "#2b1d14",
    lang: "pt-BR",
    icons: [
      { src: asset("/brand/emblem-192.png"), sizes: "192x192", type: "image/png" },
      { src: asset("/brand/emblem-512.png"), sizes: "512x512", type: "image/png" },
    ],
  };
}
