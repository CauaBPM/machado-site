/**
 * Prefixa o basePath em arquivos de /public. Necessário quando o site é
 * publicado numa subpasta (ex.: GitHub Pages em usuario.github.io/repo),
 * pois o next/image não adiciona o basePath sozinho.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/+$/, "") ?? "";

export const asset = (path: string) => (path.startsWith("/") ? basePath + path : path);
