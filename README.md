# Machado Manutenção e Reforma — site

Landing page da Machado: serviços, orçamento interativo pelo WhatsApp, galeria de trabalhos, área de atendimento e FAQ.
Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS 4, exportado como **site estático** (pasta `out/`).
Não tem backend, banco de dados, login nem cookies.

---

## 1. Rodar no computador

Requisitos: Node.js 20 ou superior.

```bash
npm install
npm run dev        # http://localhost:3000
```

Outros comandos:

```bash
npm run build      # gera o site final em /out
npm run lint       # ESLint
npm run typecheck  # TypeScript
npm start          # serve a pasta /out localmente (npx serve)
```

> **Pasta no OneDrive:** o OneDrive às vezes trava arquivos da pasta `.next` e o build falha com `EPERM`.
> Se acontecer, apague a pasta `.next` e rode de novo, ou mova o projeto para fora do OneDrive (ex.: `C:\projetos\machado`).

## 2. Publicar

O build gera arquivos estáticos e funciona em qualquer hospedagem.

**Antes de publicar, defina o domínio real** (é usado em canonical, Open Graph, sitemap e dados estruturados):

```bash
# arquivo .env.local (copie de .env.example)
NEXT_PUBLIC_SITE_URL=https://www.dominio-da-machado.com.br
```

Sem essa variável, o build mostra um aviso e usa `https://www.seudominio.com.br`, que **não pode ir ao ar**.

- **Vercel / Netlify / Cloudflare Pages:** importe o repositório, comando de build `npm run build`, pasta de saída `out`. Cadastre `NEXT_PUBLIC_SITE_URL` nas variáveis de ambiente do painel.
- **Hospedagem comum (Hostinger, Locaweb etc.):** rode `npm run build` e envie o **conteúdo** da pasta `out/` para `public_html`.

## 3. Onde editar cada coisa

| O quê | Arquivo |
| --- | --- |
| Nome, WhatsApp, telefone, cidade, bairros, horários, Instagram, foto do topo | `src/config/site.ts` |
| Serviços (cards, rodapé, mensagens do WhatsApp, JSON-LD) | `src/content/services.ts` |
| Fotos de trabalhos e antes/depois | `src/content/projects.ts` + imagens em `public/trabalhos/` |
| Perguntas frequentes | `src/content/faq.ts` |
| Títulos e textos das seções | `src/content/copy.ts` |
| Links e mensagens do WhatsApp | `src/lib/whatsapp.ts` |
| Título, descrição e dados estruturados (SEO) | `src/lib/seo.ts` |
| Cores e tipografia | `src/app/globals.css` (bloco `@theme`) |
| Logo e ícones | `public/brand/`, `src/app/favicon.ico`, `icon.png`, `apple-icon.png` |

Campos vazios (`null` ou `[]`) **não aparecem** no site nem no JSON-LD. Ao preencher a cidade, o título da página e
a meta description passam a incluí-la automaticamente.

### Fotos

- Use **somente fotos reais** de serviços da Machado. Nada de banco de imagens apresentado como trabalho próprio.
- Formato `.webp`, cerca de 1600 px no lado maior e menos de 300 KB. Informe `width` e `height` reais.
- Antes/depois: as duas fotos devem ser da **mesma obra e do mesmo ângulo**.
- Com a lista vazia, a galeria mostra espaços reservados marcados como "Fotos reais em breve".

## 4. Checklist: o que depende de informações reais

- [ ] **Domínio** definitivo → `NEXT_PUBLIC_SITE_URL`
- [ ] **Cidade-base e estado** → `site.city`, `site.state`
- [ ] **Bairros/municípios atendidos** (só os confirmados) → `site.serviceAreas`
- [ ] **Horário de atendimento** → `site.openingHours`
- [ ] **Instagram** (e outras redes, se houver) → `site.social`
- [ ] **Fotos reais de trabalhos** → `src/content/projects.ts`
- [ ] **Foto real para o topo** (opcional) → `site.heroPhoto`. Sem ela, o topo mostra um painel com um "exemplo de pedido"
- [ ] **Razão social/CNPJ** (opcional) → `site.legalName`
- [ ] **Endereço público**: só se a Machado atender clientes num endereço físico. Para quem vai até o cliente, deixe `null`
- [ ] Confirmar com a empresa que **todas as descrições de serviços** batem com o que ela realmente faz (principalmente elétrica e drywall)
- [ ] Confirmar o número **(27) 99858-3602** como WhatsApp **e** telefone para ligação (o botão "Ou ligue" usa o mesmo número)
- [ ] Revisar a **Política de privacidade** (`src/app/privacidade/page.tsx`) se forem adicionados Analytics, pixels ou formulários com envio

## 5. Google Search Console

1. Publique o site com o domínio real.
2. Em <https://search.google.com/search-console>, adicione a propriedade.
   - **Domínio** (recomendado): verificação por registro DNS TXT no painel do domínio.
   - **Prefixo de URL**: escolha "Tag HTML" e coloque só o valor do `content` em `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`. Refaça o build e publique.
3. Em **Sitemaps**, envie `https://SEU-DOMINIO/sitemap.xml`.
4. Em **Inspeção de URL**, teste a home e clique em "Solicitar indexação".
5. Valide os dados estruturados em <https://search.google.com/test/rich-results> e <https://validator.schema.org>.

Google Analytics 4 não está instalado. Se for pedido depois, crie a propriedade, adicione o ID real e atualize a política de privacidade.

## 6. Perfil da Empresa no Google (Google Business Profile)

O perfil **não** é criado automaticamente: isso precisa ser feito pelo responsável da Machado em <https://business.google.com>.

- **Nome:** use exatamente `Machado Manutenção e Reforma`, igual ao site. Não acrescente palavras-chave no nome.
- **Telefone:** o mesmo do site, (27) 99858-3602.
- **Site:** o domínio definitivo.
- **Categoria:** escolha a mais próxima do serviço principal (ex.: "Serviço de reformas", "Faz-tudo", "Pintor") e adicione as outras como secundárias.
- **Empresa de área de atendimento:** como a Machado vai até o cliente, ative a opção de **ocultar o endereço** e cadastre as cidades/bairros atendidos. Use a mesma lista de `site.serviceAreas`.
- **Horário:** o mesmo de `site.openingHours`.
- Depois de verificado, copie o link público do perfil para `site.social.googleBusiness` (ele entra no `sameAs` do JSON-LD).

Mantenha nome, telefone e região **idênticos** no site, no perfil do Google e no Instagram.

## 7. SEO implementado

- HTML semântico (`header`, `nav`, `main`, `section`, `article`, `footer`), um único `h1` e hierarquia de `h2`/`h3`.
- Todo o conteúdo pré-renderizado no HTML (exportação estática); não depende de JavaScript para ser lido.
- Title e description otimizados, que se adaptam quando a cidade é preenchida.
- Canonical, Open Graph, Twitter Card, `robots.txt`, `sitemap.xml`, web manifest, favicon e apple-touch-icon a partir do emblema oficial.
- JSON-LD: `HomeAndConstructionBusiness` (com catálogo de serviços), `WebSite` e `FAQPage`. Endereço, área, horários e
  redes entram só quando preenchidos. Sem avaliações, notas ou coordenadas inventadas.
- Imagens com `width`/`height`, `alt` descritivo e lazy loading abaixo da primeira dobra.

SEO melhora a capacidade de o site ser encontrado, mas **não garante** posição no Google nem volume de clientes.

## 8. Testes feitos no desenvolvimento

- `npm run build`, `lint` e `typecheck` sem erros.
- Navegador headless (Chrome) em 360, 390, 768, 1024 e 1440 px: sem rolagem horizontal, um único `h1`, todos os alvos
  de toque com pelo menos 44 × 44 px e nenhuma âncora quebrada.
- Fluxo completo do orçamento (validação, foco entre etapas, link do WhatsApp com mensagem codificada), menu mobile
  (abrir/Esc), accordion, barra inferior escondida sobre o formulário/rodapé.
- Galeria, lightbox (setas, Esc, devolução de foco) e comparador antes/depois (teclado e arraste) testados com imagens
  temporárias, removidas em seguida.
- Lighthouse local (localhost, simulação no próprio computador de desenvolvimento): Acessibilidade 100, Boas práticas 100,
  SEO 100; Performance 97 no desktop e 77 no mobile simulado (LCP 3,8 s, CLS 0). **Esses números não são medições de
  campo.** Meça de novo no domínio publicado com o PageSpeed Insights (<https://pagespeed.web.dev>) e, com tráfego real,
  acompanhe o relatório de Core Web Vitals do Search Console.
