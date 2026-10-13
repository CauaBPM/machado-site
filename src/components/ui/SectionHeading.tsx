type Props = {
  id?: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  /** "dark": seção preta/grafite (padrão). "light": seção marfim. */
  tone?: "dark" | "light";
};

export function SectionHeading({ id, eyebrow, title, subtitle, align = "left", tone = "dark" }: Props) {
  const center = align === "center";
  const light = tone === "light";
  return (
    <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className={`display mt-4 text-[1.85rem] sm:text-[2.4rem] lg:text-[2.75rem] ${light ? "text-black" : "text-ivory"}`}>
        {title}
      </h2>
      {/* Linha dourada fina abaixo do título */}
      <div aria-hidden="true" className={`gold-rule mt-5 w-20 ${center ? "mx-auto" : ""}`} />
      {subtitle ? (
        <p className={`mt-5 max-w-2xl ${center ? "mx-auto" : ""} ${light ? "text-ink-muted" : "text-ivory-muted"}`}>{subtitle}</p>
      ) : null}
    </div>
  );
}
