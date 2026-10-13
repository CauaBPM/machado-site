"use client";

import { ArrowLeft, ArrowRight, Check, MessageSquareText, Pencil, RotateCcw } from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { buildQuoteMessage, whatsappLink } from "@/lib/whatsapp";

/**
 * Orçamento interativo. Tudo acontece no navegador: nada é enviado a
 * servidores nem armazenado. O resultado é só um link do WhatsApp com a
 * mensagem pronta.
 */

const SERVICE_OPTIONS = [
  "Pintura",
  "Elétrica",
  "Hidráulica",
  "Montagem de móveis",
  "Drywall",
  "Pequenos reparos",
  "Outro serviço",
];
const PLACE_OPTIONS = ["Casa", "Apartamento", "Comércio", "Outro"];
const TIMING_OPTIONS = ["Assim que possível", "Nos próximos dias", "Estou apenas pesquisando"];
const MAX_DESCRIPTION = 500;

type Field = "service" | "place" | "description" | "timing";
type Answers = Record<Field, string>;

type Step =
  | { kind: "choice"; field: Exclude<Field, "description">; short: string; title: string; options: string[]; error: string }
  | { kind: "text"; field: "description"; short: string; title: string }
  | { kind: "review"; short: string; title: string };

const STEPS: Step[] = [
  {
    kind: "choice",
    field: "service",
    short: "Serviço",
    title: "Qual serviço você precisa?",
    options: SERVICE_OPTIONS,
    error: "Escolha um serviço para continuar. Se não souber, marque “Outro serviço”.",
  },
  {
    kind: "choice",
    field: "place",
    short: "Local",
    title: "Onde será realizado?",
    options: PLACE_OPTIONS,
    error: "Escolha o tipo de local para continuar.",
  },
  { kind: "text", field: "description", short: "Detalhes", title: "Conte um pouco sobre o problema" },
  {
    kind: "choice",
    field: "timing",
    short: "Prazo",
    title: "Quando você precisa?",
    options: TIMING_OPTIONS,
    error: "Escolha um prazo para continuar.",
  },
  { kind: "review", short: "Enviar", title: "Confira e envie pelo WhatsApp" },
];

const EMPTY: Answers = { service: "", place: "", description: "", timing: "" };

export function QuoteWizard() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(EMPTY);
  const [error, setError] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const moved = useRef(false);
  const uid = useId();

  const current = STEPS[step];
  const message = useMemo(() => buildQuoteMessage(answers), [answers]);
  const link = whatsappLink(message);
  const hasAnything = Boolean(answers.service || answers.place || answers.description.trim() || answers.timing);

  // Leva o foco ao título da nova etapa (somente após interação do usuário).
  useEffect(() => {
    if (moved.current) headingRef.current?.focus({ preventScroll: false });
  }, [step]);

  const goTo = (n: number) => {
    moved.current = true;
    setError(false);
    setStep(n);
  };

  const set = (field: Field, value: string) => {
    setAnswers((a) => ({ ...a, [field]: value }));
    setError(false);
  };

  const next = () => {
    if (current.kind === "choice" && !answers[current.field]) {
      setError(true);
      return;
    }
    goTo(Math.min(step + 1, STEPS.length - 1));
  };

  const restart = () => {
    setAnswers(EMPTY);
    goTo(0);
  };

  const errorId = `${uid}-erro`;

  return (
    <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:gap-8">
      <div className="rounded-2xl border border-gold-dark/40 bg-black p-5 text-ivory shadow-[0_30px_60px_-30px_rgb(0_0_0/0.9)] sm:p-8">
        {/* Progresso */}
        <div>
          <p className="label text-[0.72rem] text-ivory-muted" aria-live="polite">
            Etapa {step + 1} de {STEPS.length}
            <span className="sr-only">: {current.short}</span>
          </p>
          <ol className="mt-3 grid grid-cols-5 gap-1.5" aria-label="Etapas do pedido">
            {STEPS.map((s, i) => {
              const done = i < step;
              const active = i === step;
              return (
                <li key={s.short} aria-current={active ? "step" : undefined}>
                  <span
                    className={`block h-1.5 rounded-full transition-colors duration-300 ${
                      done || active ? "bg-gold" : "bg-line"
                    }`}
                  />
                  <span
                    className={`label mt-2 hidden text-[0.65rem] sm:block ${
                      active ? "text-gold" : done ? "text-ivory" : "text-ivory-muted/80"
                    }`}
                  >
                    {s.short}
                    {done ? <span className="sr-only"> (concluída)</span> : null}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>

        <form
          className="mt-7"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            next();
          }}
        >
          {current.kind === "choice" ? (
            <fieldset aria-describedby={error ? errorId : undefined} aria-invalid={error || undefined}>
              <legend className="block w-full">
                <h3 ref={headingRef} tabIndex={-1} className="display text-[1.6rem] outline-none sm:text-[2rem]">
                  {current.title}
                </h3>
              </legend>
              <div
                className={`mt-5 grid gap-2.5 ${
                  current.options.length > 4 ? "sm:grid-cols-2" : current.options.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"
                }`}
              >
                {current.options.map((opt) => {
                  const checked = answers[current.field] === opt;
                  return (
                    <label
                      key={opt}
                      className={`group relative flex min-h-14 cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 font-medium transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-gold-light ${
                        checked ? "border-gold bg-gold/[0.08] text-ivory" : "border-line bg-graphite hover:border-gold-dark"
                      }`}
                    >
                      <input
                        type="radio"
                        name={current.field}
                        value={opt}
                        checked={checked}
                        onChange={() => set(current.field, opt)}
                        className="sr-only"
                      />
                      <span
                        aria-hidden="true"
                        className={`flex size-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                          checked ? "border-gold bg-gold text-black" : "border-ivory-muted/50 bg-black"
                        }`}
                      >
                        {checked ? <Check className="size-3.5" strokeWidth={3} /> : null}
                      </span>
                      {opt}
                    </label>
                  );
                })}
              </div>
              {error ? (
                <p id={errorId} role="alert" className="mt-4 flex items-start gap-2 font-medium text-gold-light">
                  <span aria-hidden="true" className="mt-2 size-2 shrink-0 rounded-full bg-gold-light" />
                  {current.error}
                </p>
              ) : null}
            </fieldset>
          ) : null}

          {current.kind === "text" ? (
            <div>
              <h3 ref={headingRef} tabIndex={-1} className="display text-[1.6rem] outline-none sm:text-[2rem]">
                {current.title}
              </h3>
              <label htmlFor={`${uid}-descricao`} className="mt-2 block text-ivory-muted">
                Opcional. Quanto mais detalhes, mais fácil orientar você. Fotos podem ser enviadas depois, na conversa.
              </label>
              <textarea
                id={`${uid}-descricao`}
                rows={5}
                maxLength={MAX_DESCRIPTION}
                value={answers.description}
                onChange={(e) => set("description", e.target.value)}
                placeholder="Ex.: preciso instalar três prateleiras e trocar uma torneira."
                aria-describedby={`${uid}-contador`}
                className="mt-4 block w-full resize-y rounded-xl border border-line bg-graphite px-4 py-3 text-[1.0625rem] text-ivory placeholder:text-ivory-muted/70 focus:border-gold focus:outline-none"
              />
              <p id={`${uid}-contador`} className="mt-2 text-right text-sm text-ivory-muted">
                {answers.description.length}/{MAX_DESCRIPTION} caracteres
              </p>
            </div>
          ) : null}

          {current.kind === "review" ? (
            <div>
              <h3 ref={headingRef} tabIndex={-1} className="display text-[1.6rem] outline-none sm:text-[2rem]">
                {current.title}
              </h3>
              <p className="mt-2 text-ivory-muted">
                Ao tocar no botão, o WhatsApp abre com a mensagem pronta. Você ainda pode editar antes de enviar.
              </p>
              <ul className="mt-5 divide-y divide-line rounded-xl border border-line bg-graphite">
                {STEPS.slice(0, 4).map((s, i) => {
                  if (s.kind === "review") return null;
                  const value = answers[s.field].trim();
                  return (
                    <li key={s.short} className="flex items-start justify-between gap-3 px-4 py-3">
                      <p className="min-w-0">
                        <span className="label block text-[0.68rem] text-gold">{s.short}</span>
                        <span className={`block break-words font-medium ${value ? "" : "italic text-ivory-muted"}`}>
                          {value || "Não informado"}
                        </span>
                      </p>
                      <button
                        type="button"
                        onClick={() => goTo(i)}
                        className="label flex min-h-11 shrink-0 items-center gap-1.5 rounded-md px-2 text-[0.7rem] text-gold hover:bg-gold/10"
                      >
                        <Pencil aria-hidden="true" className="size-3.5" />
                        Alterar<span className="sr-only"> {s.short.toLowerCase()}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-5 lg:hidden">
                <MessagePreview message={message} empty={false} />
              </div>

              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary mt-6 w-full text-[0.9rem]"
              >
                <WhatsAppIcon />
                Enviar meu pedido de orçamento
                <span className="sr-only"> (abre o WhatsApp em nova aba)</span>
              </a>
            </div>
          ) : null}

          <div className="mt-7 flex items-center justify-between gap-3 border-t border-line pt-5">
            {step > 0 ? (
              <button
                type="button"
                onClick={() => goTo(step - 1)}
                className="label flex min-h-12 items-center gap-2 rounded-lg px-3 text-[0.8rem] text-ivory hover:bg-ivory/5"
              >
                <ArrowLeft aria-hidden="true" className="size-4" />
                Voltar
              </button>
            ) : (
              <span />
            )}

            {current.kind === "review" ? (
              <button
                type="button"
                onClick={restart}
                className="label flex min-h-12 items-center gap-2 rounded-lg px-3 text-[0.8rem] text-ivory-muted hover:bg-ivory/5"
              >
                <RotateCcw aria-hidden="true" className="size-4" />
                Recomeçar
              </button>
            ) : (
              <button type="submit" className="btn btn-primary min-h-12 px-6">
                {current.kind === "text" && !answers.description.trim() ? "Pular" : "Continuar"}
                <ArrowRight aria-hidden="true" className="size-4" />
              </button>
            )}
          </div>
        </form>
      </div>

      <aside aria-label="Prévia da mensagem" className="hidden lg:block">
        <div className="sticky top-28">
          <MessagePreview message={message} empty={!hasAnything} />
          <p className="mt-4 text-sm text-ivory-muted">
            Nada do que você escreve aqui é salvo ou enviado para o site. A mensagem só sai quando você envia pelo
            WhatsApp.
          </p>
        </div>
      </aside>
    </div>
  );
}

function MessagePreview({ message, empty }: { message: string; empty: boolean }) {
  if (empty) {
    return (
      <div className="flex min-h-[18rem] flex-col items-center justify-center rounded-2xl border border-dashed border-gold-dark/50 px-6 py-10 text-center">
        <span className="flex size-14 items-center justify-center icon-tile rounded-full">
          <MessageSquareText aria-hidden="true" className="size-7" />
        </span>
        <p className="label mt-4 text-[0.8rem] text-ivory">Sua mensagem aparece aqui</p>
        <p className="mt-2 max-w-[16rem] text-[0.95rem] text-ivory-muted">
          Escolha o serviço ao lado e o pedido vai se montando, linha por linha.
        </p>
      </div>
    );
  }
  return (
    <figure className="relative rounded-2xl bg-ivory p-5 text-black shadow-[0_18px_40px_-20px_rgb(0_0_0/0.8)]">
      <figcaption className="label flex items-center gap-2 border-b border-dashed border-line-light pb-3 text-[0.7rem] text-gold-ink">
        <WhatsAppIcon className="size-4 text-whatsapp" />
        Prévia da mensagem
      </figcaption>
      <p className="mt-3 whitespace-pre-line break-words text-[0.98rem] leading-relaxed">
        {message}
      </p>
    </figure>
  );
}
