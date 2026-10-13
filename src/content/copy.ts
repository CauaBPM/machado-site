/**
 * TEXTOS DAS SEÇÕES
 * Títulos e textos de apoio ficam aqui para facilitar revisões de copy
 * sem mexer nos componentes.
 */

export const nav = [
  { href: "#servicos", label: "Serviços" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#trabalhos", label: "Trabalhos" },
  { href: "#atendimento", label: "Área de atendimento" },
  { href: "#contato", label: "Contato" },
] as const;

export const copy = {
  hero: {
    eyebrow: "Pintura · Elétrica · Hidráulica",
    title: "Precisando de um reparo ou reforma? A Machado resolve.",
    subtitle:
      "Serviços de pintura, elétrica, hidráulica, montagem de móveis, drywall e pequenos reparos para sua casa ou negócio.",
    primary: "Solicitar orçamento",
    secondary: "Conhecer os serviços",
  },
  services: {
    eyebrow: "Serviços",
    title: "Tudo o que você precisa para cuidar do seu espaço.",
    subtitle: "Da manutenção do dia a dia aos serviços de reforma, encontre a ajuda que você procura.",
    cta: "Solicitar este serviço",
    extra: "Tomada, prateleira, pintura ou reparo: se não está na lista, conte o que você precisa.",
  },
  quote: {
    eyebrow: "Orçamento pelo WhatsApp",
    title: "Conte o que você precisa. A gente conversa sobre a solução.",
    subtitle:
      "Quatro perguntas rápidas e a sua mensagem fica pronta para enviar. Sem cadastro, sem e-mail, sem compromisso.",
  },
  how: {
    eyebrow: "Como funciona",
    title: "Resolver seu problema pode ser mais simples.",
    steps: [
      {
        title: "Você conta o que precisa",
        text: "Chame no WhatsApp ou descreva o serviço pelo formulário. Se puder, mande fotos.",
      },
      {
        title: "A Machado avalia o pedido",
        text: "A gente recebe as informações e conversa com você sobre o que o serviço vai exigir.",
      },
      {
        title: "Você combina os próximos passos",
        text: "Alinhados orçamento, condições e disponibilidade, o atendimento é agendado.",
      },
    ],
  },
  projects: {
    eyebrow: "Trabalhos realizados",
    title: "Veja de perto o nosso trabalho.",
    subtitle: "Fotos reais de serviços feitos pela Machado.",
    emptySubtitle:
      "Estamos reunindo as fotos dos serviços realizados. Enquanto isso, peça pelo WhatsApp exemplos de trabalhos parecidos com o seu.",
    emptyCta: "Pedir fotos de trabalhos",
  },
  area: {
    eyebrow: "Área de atendimento",
    title: "Manutenção e reforma perto de você.",
    text: "Quer saber se atendemos no seu bairro? Fale com a Machado e consulte a disponibilidade para sua região.",
    cta: "Consultar meu bairro",
    serviceMode: "O atendimento é feito no seu endereço: casa, apartamento ou comércio.",
  },
  faq: {
    eyebrow: "Dúvidas",
    title: "Ainda ficou alguma dúvida?",
  },
  finalCta: {
    title: "Tem algo precisando de conserto? Vamos conversar.",
    subtitle: "Conte para a Machado o que você precisa e encontre uma solução para sua casa ou negócio.",
    button: "Solicitar orçamento no WhatsApp",
  },
} as const;
