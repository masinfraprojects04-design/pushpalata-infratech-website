import { Award } from "lucide-react";
import { CERTIFICATIONS } from "@/lib/data";
import { Reveal, Chapter } from "@/components/site/Shared";

export function Certifications({ no, light = false }: { no: string; light?: boolean }) {
  return (
    <section
      data-testid="certifications-section"
      className={light ? "cad-grid bg-forest py-24 sm:py-32" : "bg-white py-24 sm:py-32"}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Chapter no={no} label="Certifications & Compliance" light={light} />
        <Reveal>
          <h2
            className={`mt-8 max-w-3xl font-heading text-3xl font-extrabold uppercase leading-[1.05] tracking-tight sm:text-4xl ${
              light ? "text-paper" : "text-ink"
            }`}
          >
            Built on Systems You Can <span className="text-ember">Audit</span>
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CERTIFICATIONS.map((c, i) => (
            <Reveal key={c.code} delay={0.06 * i}>
              <article
                data-testid={`certification-card-${i}`}
                className={`group relative flex h-full flex-col rounded-2xl border p-7 transition-[transform,border-color] duration-500 hover:-translate-y-1 ${
                  light
                    ? "border-paper/10 bg-forest-2 hover:border-ember/50"
                    : "border-ink/10 bg-paper hover:border-ember/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ember">{c.code}</span>
                  <Award className={`h-5 w-5 ${light ? "text-paper/40" : "text-forest/40"} transition-colors group-hover:text-ember`} />
                </div>
                <h3
                  className={`mt-5 font-heading text-lg font-extrabold uppercase leading-tight tracking-tight ${
                    light ? "text-paper" : "text-ink"
                  }`}
                >
                  {c.title}
                </h3>
                <p className={`mt-3 text-sm leading-relaxed ${light ? "text-paper/60" : "text-ink/65"}`}>{c.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <p
          className={`mt-8 font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em] ${
            light ? "text-paper/40" : "text-ink/40"
          }`}
        >
          Certificate copies and audit documentation are shared with clients on request.
        </p>
      </div>
    </section>
  );
}
