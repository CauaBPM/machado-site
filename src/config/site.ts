/**
 * CONFIGURAÇÃO CENTRAL DA EMPRESA
 * ------------------------------------------------------------------
 * Todas as informações comerciais do site saem daqui. Altere apenas
 * este arquivo para atualizar telefone, cidade, horários, redes etc.
 *
 * Regra do projeto: nada de dados inventados. Campos com `null` ou
 * listas vazias ficam ocultos no site e fora dos dados estruturados
 * (JSON-LD) até que sejam preenchidos com informações reais.
 */

export type OpeningHours = {
  /** Dias no padrão schema.org: Monday, Tuesday, ... */
  days: ("Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday")[];
  opens: string; // "08:00"
  closes: string; // "18:00"
  /** Texto exibido no site, ex.: "Segunda a sexta, 8h às 18h" */
  label: string;
};

export type SiteConfig = {
  name: string;
  legalName: string | null;
  tagline: string;
  /** Domínio definitivo. Defina NEXT_PUBLIC_SITE_URL no ambiente de build. */
  url: string;
  urlIsPlaceholder: boolean;
  whatsapp: {
    /** Somente dígitos, com código do país (55) e DDD. */
    number: string;
    display: string;
    defaultMessage: string;
  };
  /** Telefone para ligação. Por padrão é o mesmo número do WhatsApp. */
  phone: { e164: string; display: string };
  email: string | null;
  /** Cidade-base. PREENCHER com a cidade real. */
  city: string | null;
  /** Sigla do estado, ex.: "ES". PREENCHER. */
  state: string | null;
  /**
   * Endereço público. A Machado atende no endereço do cliente, então o
   * padrão é não exibir endereço (empresa de área de atendimento).
   */
  address: {
    street: string;
    neighborhood: string;
    postalCode: string;
  } | null;
  /** Bairros e municípios atendidos CONFIRMADOS pela empresa. */
  serviceAreas: string[];
  openingHours: OpeningHours[];
  social: {
    instagram: string | null; // URL completa
    facebook: string | null;
    googleBusiness: string | null; // link do Perfil da Empresa no Google
  };
  /**
   * Foto real para o topo da página (obra ou profissional da Machado).
   * Enquanto for null, o topo exibe um painel de couro com um exemplo de pedido.
   */
  heroPhoto: { src: string; alt: string; width: number; height: number } | null;
  googleSiteVerification: string | null;
  credit: { label: string; url: string };
};

const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "");
const PLACEHOLDER_URL = "https://www.seudominio.com.br";

export const site: SiteConfig = {
  name: "Machado Manutenção e Reforma",
  legalName: null, // PREENCHER se quiser exibir a razão social / CNPJ
  tagline: "Pintura, elétrica, hidráulica, drywall, montagem de móveis e pequenos reparos.",

  url: envUrl || PLACEHOLDER_URL,
  urlIsPlaceholder: !envUrl,

  whatsapp: {
    number: "5527998583602",
    display: "(27) 99858-3602",
    defaultMessage: "Olá, Machado! Encontrei vocês pelo site e gostaria de solicitar um orçamento.",
  },
  phone: { e164: "+5527998583602", display: "(27) 99858-3602" },
  email: null,

  city: null, // PREENCHER, ex.: "Vila Velha"
  state: null, // PREENCHER, ex.: "ES"
  address: null,
  serviceAreas: [], // PREENCHER, ex.: ["Vila Velha", "Vitória", "Serra", "Cariacica"]

  openingHours: [], // PREENCHER, ex.: [{ days: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "08:00", closes: "18:00", label: "Segunda a sexta, 8h às 18h" }]

  social: {
    instagram: null, // PREENCHER, ex.: "https://www.instagram.com/machado.reformas"
    facebook: null,
    googleBusiness: null,
  },

  heroPhoto: null, // PREENCHER, ex.: { src: "/trabalhos/hero.webp", alt: "Profissional da Machado pintando parede de sala", width: 1400, height: 1600 }

  googleSiteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || null,

  credit: { label: "Trivo", url: "https://trivo.dev.br" },
};

/** "Vila Velha – ES", ou null enquanto a cidade não for informada. */
export const cityLabel = site.city ? (site.state ? `${site.city} – ${site.state}` : site.city) : null;

export const instagramHandle = site.social.instagram
  ? "@" + site.social.instagram.replace(/\/+$/, "").split("/").pop()
  : null;

if (site.urlIsPlaceholder && process.env.NODE_ENV === "production") {
  console.warn(
    "\n[machado] NEXT_PUBLIC_SITE_URL não definido. Canonical, sitemap e Open Graph estão usando " +
      PLACEHOLDER_URL +
      ". Defina o domínio real antes de publicar.\n",
  );
}
