import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { FloatingContact } from "@/components/sections/FloatingContact";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Projects } from "@/components/sections/Projects";
import { Quote } from "@/components/sections/Quote";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { Services } from "@/components/sections/Services";
import { pageJsonLd } from "@/lib/seo";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        // JSON gerado a partir de site.ts; "<" escapado por segurança.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd()).replace(/</g, "\\u003c") }}
      />
      <Header />
      <main id="conteudo">
        <Hero />
        <Services />
        <Quote />
        <HowItWorks />
        <Projects />
        <ServiceArea />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <FloatingContact />
    </>
  );
}
