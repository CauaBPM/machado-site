type Props = {
  id?: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
};

export function SectionHeading({ id, eyebrow, title, subtitle, align = "left", tone = "dark" }: Props) {
  const center = align === "center";
  return (
    <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2
        id={id}
        className={`display mt-3 text-[2rem] sm:text-[2.6rem] lg:text-[3rem] ${tone === "light" ? "text-kraft" : "text-wood"}`}
      >
        {title}
      </h2>
      {subtitle ? (
        <p className={`mt-4 max-w-2xl ${center ? "mx-auto" : ""} ${tone === "light" ? "text-kraft/80" : "text-muted"}`}>
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
