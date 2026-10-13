import { site } from "@/config/site";

/** Monta o link wa.me com a mensagem codificada para URL. */
export function whatsappLink(message: string = site.whatsapp.defaultMessage): string {
  return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

/** Link contextual de cada serviço. */
export function serviceWhatsappLink(intent: string): string {
  return whatsappLink(`Olá! Encontrei a Machado pelo site e ${intent}. Pode me passar um orçamento?`);
}

export type QuoteRequest = {
  service: string;
  place: string;
  description: string;
  timing: string;
};

/** Mensagem organizada do orçamento interativo. Campos vazios são omitidos. */
export function buildQuoteMessage({ service, place, description, timing }: QuoteRequest): string {
  const lines = ["Olá, Machado! Gostaria de solicitar um orçamento.", ""];
  if (service) lines.push(`Serviço: ${service}`);
  if (place) lines.push(`Local: ${place}`);
  const text = description.trim();
  if (text) lines.push(`Descrição: ${text}`);
  if (timing) lines.push(`Prazo desejado: ${timing}`);
  lines.push("", "Encontrei vocês pelo site.");
  return lines.join("\n");
}

export const areaCheckMessage =
  "Olá, Machado! Encontrei vocês pelo site e queria saber se vocês atendem no meu bairro: ";
