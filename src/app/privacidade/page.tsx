import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { site } from "@/config/site";
import { whatsappLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Política de privacidade",
  description: `Como o site da ${site.name} trata as informações de quem o visita.`,
  alternates: { canonical: "/privacidade/" },
};

/**
 * Texto válido para a versão atual do site, que não usa cookies, analytics
 * nem formulários com envio a servidores. Se GA4, pixels ou formulários
 * com backend forem adicionados, ATUALIZE esta página.
 */
export default function Privacidade() {
  return (
    <>
      <header className="border-b border-gold-dark/40 bg-black">
        <Container className="flex h-[4.5rem] items-center">
          <Link href="/" className="rounded-md">
            <Logo size="sm" />
          </Link>
        </Container>
      </header>
      <main id="conteudo" className="bg-black py-14 sm:py-20">
        <Container className="max-w-3xl">
          <p className="eyebrow">Privacidade</p>
          <h1 className="display mt-4 text-[2rem] sm:text-[2.6rem]">Política de privacidade</h1>
          <div className="mt-8 space-y-5 text-ivory-muted [&_h2]:label [&_h2]:mt-10 [&_h2]:text-[0.9rem] [&_h2]:text-gold">
            <p>
              Este site existe para apresentar os serviços da {site.name} e facilitar o contato pelo WhatsApp. Ele foi
              feito para coletar o mínimo possível de informações.
            </p>
            <h2>O que o site não faz</h2>
            <p>
              O site não pede cadastro, não usa cookies de rastreamento nem ferramentas de publicidade, e não guarda o
              que você digita no formulário de orçamento ou no campo de bairro.
            </p>
            <h2>Formulário de orçamento</h2>
            <p>
              As respostas do formulário são usadas apenas para montar uma mensagem no seu próprio aparelho. Nada é
              enviado ao site. A mensagem só chega à {site.name} se você decidir enviá-la pelo WhatsApp.
            </p>
            <h2>Conversas pelo WhatsApp</h2>
            <p>
              Ao conversar pelo WhatsApp, as informações que você compartilha (nome, telefone, endereço, fotos) são
              usadas somente para responder ao seu pedido e combinar o atendimento. O WhatsApp tem sua própria política de
              privacidade, definida pela Meta.
            </p>
            <h2>Hospedagem</h2>
            <p>
              Como qualquer site, o servidor de hospedagem pode registrar dados técnicos de acesso (como endereço IP e
              tipo de navegador) para segurança e funcionamento.
            </p>
            <h2>Seus direitos</h2>
            <p>
              Conforme a Lei Geral de Proteção de Dados (LGPD), você pode pedir informações, correção ou exclusão dos
              seus dados a qualquer momento.{" "}
              <a href={whatsappLink("Olá, Machado! Tenho uma dúvida sobre privacidade dos meus dados.")} className="font-semibold text-gold underline underline-offset-4 hover:text-gold-light" target="_blank" rel="noopener noreferrer">
                Fale com a gente pelo WhatsApp
              </a>
              .
            </p>
          </div>
        </Container>
      </main>
      <Footer homePrefix="/" />
    </>
  );
}
