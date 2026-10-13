import { cityLabel, site } from "@/config/site";
import { services } from "./services";

export type FaqItem = { question: string; answer: string };

const serviceList = services.map((s) => s.name.toLowerCase()).join(", ").replace(/, ([^,]*)$/, " e $1");

const areaAnswer =
  site.serviceAreas.length > 0
    ? `Atendemos ${cityLabel ? `a partir de ${cityLabel}, ` : ""}nas seguintes regiões: ${site.serviceAreas.join(", ")}. Se o seu bairro não estiver na lista, mande uma mensagem que a gente confirma.`
    : "Fale com a Machado pelo WhatsApp informando o seu bairro e cidade. A equipe confirma se a sua região está dentro da área de atendimento.";

/** Perguntas frequentes. Também viram dados estruturados FAQPage. */
export const faq: FaqItem[] = [
  {
    question: "Como solicitar um orçamento?",
    answer:
      "É simples: escolha o serviço desejado e envie uma mensagem pelo WhatsApp contando o que precisa. Se preferir, use o formulário de orçamento desta página, que já monta a mensagem para você. A equipe vai orientar sobre os próximos passos.",
  },
  {
    question: "Quais serviços a Machado realiza?",
    answer: `Hoje os serviços são: ${serviceList}, além de manutenção e pequenos reparos gerais. Se o seu caso não se encaixa em nenhum deles, descreva o problema pelo WhatsApp e a gente diz se consegue ajudar.`,
  },
  {
    question: "Vocês atendem apartamentos e estabelecimentos comerciais?",
    answer:
      "Sim. O atendimento é feito em casas, apartamentos e comércios. Ao pedir o orçamento, informe o tipo de imóvel para que o serviço seja planejado do jeito certo.",
  },
  {
    question: "Posso enviar fotos do problema pelo WhatsApp?",
    answer:
      "Pode e é recomendado. Fotos e vídeos curtos ajudam a entender o serviço e agilizam a conversa sobre o orçamento.",
  },
  {
    question: "Como posso consultar a disponibilidade?",
    answer:
      "Mande uma mensagem pelo WhatsApp dizendo o serviço e quando você precisa. A disponibilidade de agenda é combinada diretamente na conversa.",
  },
  {
    question: "Em quais regiões vocês atendem?",
    answer: areaAnswer,
  },
  {
    question: "Vocês realizam pequenos reparos?",
    answer:
      "Sim. Trocar uma torneira, instalar uma prateleira, trocar uma tomada ou fixar uma cortina: pequenos consertos também fazem parte do trabalho da Machado.",
  },
];
