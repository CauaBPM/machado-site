import type { LucideIcon } from "lucide-react";
import { Armchair, BrickWall, Droplet, PaintRoller, Wrench, Zap } from "lucide-react";

/**
 * SERVIÇOS
 * Cards da seção "Serviços", rodapé, FAQ e catálogo do JSON-LD saem daqui.
 * Para incluir ou alterar um serviço, edite somente esta lista.
 */
export type Service = {
  id: string;
  name: string;
  /** Usado em títulos e no JSON-LD, com termo de busca natural. */
  seoName: string;
  description: string;
  icon: LucideIcon;
  /** Complemento da frase "Olá! Encontrei a Machado pelo site e ..." */
  whatsappIntent: string;
};

export const services: Service[] = [
  {
    id: "pintura",
    name: "Pintura",
    seoName: "Serviços de pintura residencial e comercial",
    description: "Pintura de paredes, ambientes internos e externos, retoques e renovação de espaços.",
    icon: PaintRoller,
    whatsappIntent: "tenho interesse em um serviço de pintura",
  },
  {
    id: "eletrica",
    name: "Elétrica",
    seoName: "Serviços elétricos residenciais",
    description: "Instalação e substituição de tomadas, interruptores, luminárias e outros serviços elétricos.",
    icon: Zap,
    whatsappIntent: "preciso de um serviço elétrico",
  },
  {
    id: "hidraulica",
    name: "Hidráulica",
    seoName: "Serviços hidráulicos e reparos de encanamento",
    description: "Reparos em torneiras, sifões, descargas, vazamentos e instalações hidráulicas.",
    icon: Droplet,
    whatsappIntent: "preciso de um serviço hidráulico",
  },
  {
    id: "montagem-de-moveis",
    name: "Montagem de móveis",
    seoName: "Montagem e desmontagem de móveis",
    description: "Montagem e desmontagem de móveis para casas, apartamentos e escritórios.",
    icon: Armchair,
    whatsappIntent: "gostaria de solicitar montagem de móveis",
  },
  {
    id: "drywall",
    name: "Drywall",
    seoName: "Instalação de drywall",
    description: "Instalações, divisórias, fechamentos e pequenos projetos em drywall.",
    icon: BrickWall,
    whatsappIntent: "tenho interesse em um serviço de drywall",
  },
  {
    id: "marido-de-aluguel",
    name: "Marido de aluguel",
    seoName: "Marido de aluguel e pequenos reparos",
    description: "Instalação de suportes, prateleiras, cortinas, acessórios e pequenos reparos domésticos.",
    icon: Wrench,
    whatsappIntent: "preciso de um marido de aluguel para alguns reparos",
  },
];
