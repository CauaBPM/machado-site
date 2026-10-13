/**
 * TRABALHOS REALIZADOS
 * ------------------------------------------------------------------
 * Coloque SOMENTE fotos reais de serviços feitos pela Machado.
 *
 * 1. Salve as imagens em /public/trabalhos (de preferência .webp, ~1600px no lado maior).
 * 2. Adicione um item abaixo. `width`/`height` são as dimensões reais do arquivo
 *    (evitam que a página "pule" enquanto carrega).
 * 3. Para antes/depois, use fotos da MESMA obra, do mesmo ângulo, e preencha `before`.
 *
 * Enquanto a lista estiver vazia, o site mostra espaços reservados
 * identificados como "em breve", sem simular trabalhos.
 */

export type ProjectImage = {
  src: string; // ex.: "/trabalhos/pintura-sala-depois.webp"
  alt: string; // descreva o que aparece na foto
  width: number;
  height: number;
};

export type Project = {
  id: string;
  /** Deve corresponder ao nome de um serviço, ex.: "Pintura" */
  category: string;
  title: string;
  description: string;
  /** Somente se o cliente autorizou, e de forma genérica: "Apartamento em Vila Velha" */
  location?: string;
  image: ProjectImage; // foto principal (ou "depois")
  before?: ProjectImage; // ativa o comparador antes/depois
};

export const projects: Project[] = [
  // Exemplo (remova o comentário e troque pelos dados reais):
  // {
  //   id: "pintura-sala-01",
  //   category: "Pintura",
  //   title: "Pintura completa de sala",
  //   description: "Correção de trincas, massa e duas demãos de tinta acrílica.",
  //   location: "Apartamento, Vila Velha",
  //   image: { src: "/trabalhos/pintura-sala-depois.webp", alt: "Sala com paredes recém-pintadas em tom areia", width: 1600, height: 1200 },
  //   before: { src: "/trabalhos/pintura-sala-antes.webp", alt: "Mesma sala antes da pintura, com paredes manchadas", width: 1600, height: 1200 },
  // },
];
