import { useEffect, useRef, type ReactNode } from "react";
import { motion, animate, useInView } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p
      className={`font-mono text-[11px] sm:text-xs uppercase tracking-[0.35em] ${
        light ? "text-ember" : "text-ember"
      }`}
    >
      <span className="mr-3 inline-block h-px w-8 translate-y-[-3px] bg-ember align-middle" />
      {children}
    </p>
  );
}

export function MaskedLine({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <span className={`block overflow-hidden ${className ?? ""}`}>
      <motion.span
        className="block"
        initial={{ y: "112%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Counter({ to, className, plain = false }: { to: number; className?: string; plain?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = plain ? String(Math.round(v)) : Math.round(v).toLocaleString("en-IN");
      },
    });
    return () => controls.stop();
  }, [inView, to, plain]);
  return (
    <span ref={ref} className={className}>
      0
    </span>
  );
}

export function Marquee({ items, dark = false }: { items: string[]; dark?: boolean }) {
  const row = [...items, ...items];
  return (
    <div
      className={`overflow-hidden border-y py-6 sm:py-8 ${
        dark ? "border-paper/10 bg-forest-2" : "border-ink/10 bg-sand/60"
      }`}
      data-testid="editorial-marquee"
    >
      <div className="animate-marquee flex w-max items-center gap-8 whitespace-nowrap">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-8">
            <span
              className={`font-heading text-3xl font-extrabold uppercase tracking-tight sm:text-5xl ${
                i % 2 === 0
                  ? dark
                    ? "text-paper/90"
                    : "text-ink"
                  : dark
                    ? "text-outline-paper"
                    : "text-outline-ink"
              }`}
            >
              {item}
            </span>
            <span className="h-2.5 w-2.5 rotate-45 bg-ember" />
          </span>
        ))}
      </div>
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  img,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  img: string;
}) {
  return (
    <section className="cad-grid relative overflow-hidden bg-forest pt-36 pb-20 sm:pt-44 sm:pb-28">
      <div className="absolute inset-0">
        <img src={img} alt="" className="h-full w-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/80 to-forest/40" />
      </div>
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <MaskedLine>
          <Eyebrow light>{eyebrow}</Eyebrow>
        </MaskedLine>
        <h1 className="mt-5 font-heading text-4xl font-extrabold uppercase leading-[1.02] tracking-tight text-paper sm:text-6xl lg:text-7xl">
          <MaskedLine delay={0.1}>{title}</MaskedLine>
        </h1>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-6 max-w-2xl text-base text-paper/70 sm:text-lg"
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}

export function CTALink({
  to,
  children,
  variant = "solid",
  testId,
}: {
  to: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "outline-light";
  testId?: string;
}) {
  const base =
    "group inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 font-heading text-sm font-bold uppercase tracking-wider transition-[background-color,color,border-color,transform] duration-300 hover:-translate-y-0.5";
  const styles = {
    solid: "bg-ember text-white hover:bg-ember-2",
    outline: "border border-ink/25 text-ink hover:border-ember hover:text-ember",
    "outline-light": "border border-paper/30 text-paper hover:border-ember hover:text-ember",
  } as const;
  return (
    <Link to={to} data-testid={testId} className={`${base} ${styles[variant]}`}>
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}

export function ScrollHint() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.6, duration: 1 }}
      className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-paper/50">Scroll</span>
      <motion.span animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
        <ChevronDown className="h-5 w-5 text-ember" />
      </motion.span>
    </motion.div>
  );
}

export function Chapter({ no, label, light = false }: { no: string; label: string; light?: boolean }) {
  return (
    <div className="flex items-center gap-4">
      <span className="font-mono text-sm font-medium text-ember">{no}</span>
      <span className={`h-px w-10 ${light ? "bg-paper/25" : "bg-ink/20"}`} />
      <span
        className={`font-mono text-[11px] uppercase tracking-[0.35em] ${
          light ? "text-paper/60" : "text-muted-foreground"
        }`}
      >
        {label}
      </span>
    </div>
  );
}
