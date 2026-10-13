import { cityLabel, site } from "@/config/site";
import { faq } from "@/content/faq";
import { services } from "@/content/services";

export const absoluteUrl = (path = "/") => new URL(path.replace(/^\/+/, ""), site.url + "/").toString();

/** Título e descrição adaptados automaticamente quando a cidade é informada. */
export const seoTitle = cityLabel
  ? `Machado Manutenção e Reforma em ${site.city} | Pintura, Elétrica e Reparos`
  : "Machado Manutenção e Reforma | Pintura, Elétrica e Reparos";

export const seoDescription = cityLabel
  ? `Pintura, elétrica, hidráulica, drywall, montagem de móveis e marido de aluguel em ${cityLabel}. Fale com a Machado e solicite seu orçamento pelo WhatsApp.`
  : "Precisa de pintura, elétrica, hidráulica, drywall ou montagem de móveis? Conheça os serviços da Machado Manutenção e Reforma e solicite um orçamento.";

const sameAs = [site.social.instagram, site.social.facebook, site.social.googleBusiness].filter(
  (v): v is string => Boolean(v),
);

/**
 * JSON-LD do negócio local. Só entram propriedades com dados reais:
 * endereço, área atendida, horários e redes aparecem quando preenchidos em site.ts.
 * Nada de avaliações, notas ou coordenadas inventadas.
 */
export function localBusinessJsonLd() {
  const business: Record<string, unknown> = {
    "@type": "HomeAndConstructionBusiness",
    "@id": absoluteUrl("/#empresa"),
    name: site.name,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/brand/emblem-512.png"),
    image: absoluteUrl("/og-image.jpg"),
    description: seoDescription,
    telephone: site.phone.e164,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: site.phone.e164,
      contactType: "customer service",
      availableLanguage: "Portuguese",
    },
    knowsLanguage: "pt-BR",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Serviços de manutenção e reforma",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.seoName,
          description: s.description,
          ...(site.serviceAreas.length || site.city ? { areaServed: areaServed() } : {}),
        },
      })),
    },
  };

  if (site.legalName) business.legalName = site.legalName;
  if (site.email) business.email = site.email;
  if (sameAs.length) business.sameAs = sameAs;

  if (site.address) {
    business.address = {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.city ?? undefined,
      addressRegion: site.state ?? undefined,
      postalCode: site.address.postalCode,
      addressCountry: "BR",
    };
  } else if (site.city) {
    // Empresa de área de atendimento: informa só cidade/estado, sem rua.
    business.address = {
      "@type": "PostalAddress",
      addressLocality: site.city,
      ...(site.state ? { addressRegion: site.state } : {}),
      addressCountry: "BR",
    };
  }

  const area = areaServed();
  if (area.length) business.areaServed = area;

  if (site.openingHours.length) {
    business.openingHoursSpecification = site.openingHours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days.map((d) => `https://schema.org/${d}`),
      opens: h.opens,
      closes: h.closes,
    }));
  }

  return business;
}

function areaServed() {
  const names = site.serviceAreas.length ? site.serviceAreas : site.city ? [site.city] : [];
  return names.map((name) => ({ "@type": "Place", name }));
}

export function pageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      localBusinessJsonLd(),
      {
        "@type": "WebSite",
        "@id": absoluteUrl("/#site"),
        url: absoluteUrl("/"),
        name: site.name,
        inLanguage: "pt-BR",
        publisher: { "@id": absoluteUrl("/#empresa") },
      },
      {
        "@type": "FAQPage",
        "@id": absoluteUrl("/#duvidas"),
        mainEntity: faq.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
    ],
  };
}
