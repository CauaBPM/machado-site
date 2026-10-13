import type { NextConfig } from "next";

// Exportação estática: o build gera a pasta /out, que pode ser publicada
// em qualquer hospedagem de arquivos (Vercel, Netlify, Cloudflare Pages, Hostinger etc.).
// NEXT_PUBLIC_BASE_PATH só é necessário quando o site fica numa subpasta (ex.: GitHub Pages).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/+$/, "") || undefined;

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default nextConfig;
