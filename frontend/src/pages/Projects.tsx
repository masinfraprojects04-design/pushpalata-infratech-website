import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, BadgeCheck } from "lucide-react";
import { PROJECTS, IMG, type ProjectCategory } from "@/lib/data";
import { Reveal, PageHero, Chapter, CTALink } from "@/components/site/Shared";

const FILTERS: { key: ProjectCategory | "all"; label: string }[] = [
  { key: "all", label: "All Projects" },
  { key: "epc", label: "Current EPC" },
  { key: "current", label: "Recent / Current Execution" },
  { key: "subcontract", label: "Subcontract / Execution Experience" },
];

const ROLE_STYLES: Record<ProjectCategory, string> = {
  epc: "bg-ember text-white",
  current: "bg-forest text-paper",
  subcontract: "bg-sand text-ink",
};

const ROLE_LABELS: Record<ProjectCategory, string> = {
  epc: "Full EPC",
  current: "Execution Partner",
  subcontract: "Subcontractor",
};

export default function Projects() {
  const [filter, setFilter] = useState<ProjectCategory | "all">("all");
  const list = PROJECTS.filter((p) => filter === "all" || p.category === filter);
  const groups: { key: ProjectCategory; title: string; sub: string }[] = [
    { key: "epc", title: "Current Flagship EPC Project", sub: "Direct full-EPC execution by Pushpalata Infratech" },
    { key: "current", title: "Recent Execution Experience", sub: "2024 – 2025 · tower erection and HTLS stringing as execution partner" },
    { key: "subcontract", title: "Subcontractor / Execution Experience", sub: "2014 – 2024 · projects executed under main contractors — not PIPL EPC contracts" },
  ];
  const sections = filter === "all"
    ? groups.map((g) => ({ ...g, items: PROJECTS.filter((p) => p.category === g.key) })).filter((g) => g.items.length)
    : [{ key: filter, title: groups.find((g) => g.key === filter)!.title, sub: groups.find((g) => g.key === filter)!.sub, items: list }];

  return (
    <main data-testid="projects-page">
      <PageHero
        eyebrow="Project Experience"
        title="Proven on Major Corridors"
        description="A clear record: historical subcontract execution experience and current direct EPC capability — labelled honestly."
        img={IMG.towerDusk}
      />

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <Chapter no="01" label="Portfolio" />
        <Reveal>
          <div className="mt-8 flex flex-wrap gap-3" data-testid="project-filters">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                type="button"
                data-testid={`project-filter-${f.key}`}
                onClick={() => setFilter(f.key)}
                className={`rounded-full border px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors duration-300 ${
                  filter === f.key
                    ? "border-ember bg-ember text-white"
                    : "border-ink/15 bg-white text-ink/70 hover:border-ember/50 hover:text-ember"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </Reveal>

        {sections.map((sec) => (
        <div key={sec.key} data-testid={`project-group-${sec.key}`} className="mt-14 first:mt-12">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-3 border-b border-ink/10 pb-4">
              <h2 className="font-heading text-xl font-extrabold uppercase tracking-tight text-ink sm:text-2xl">{sec.title}</h2>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/50">{sec.sub}</p>
            </div>
          </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sec.items.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 0.07}>
              <Link
                to={`/projects/${p.id}`}
                data-testid={`project-card-${p.id}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1.5 hover:border-ember/60 hover:shadow-[0_24px_70px_rgba(10,38,30,0.14)]"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest/80 to-transparent" />
                  <span
                    className={`absolute left-4 top-4 rounded-full px-3.5 py-1.5 font-mono text-[9px] font-medium uppercase tracking-[0.22em] ${ROLE_STYLES[p.category]}`}
                  >
                    {ROLE_LABELS[p.category]}
                  </span>
                  {p.voltage && (
                    <span className="absolute bottom-4 left-4 font-heading text-xl font-extrabold text-paper">
                      {p.voltage}
                    </span>
                  )}
                  {p.certificate && (
                    <span
                      data-testid={`project-certified-${p.id}`}
                      className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-paper/95 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-forest"
                    >
                      <BadgeCheck className="h-3 w-3 text-ember" /> {p.certificate.kind === "Undertaking" ? "Client Ref." : "Certified"}
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ember">
                    {p.location} • {p.period}
                  </span>
                  <h3 className="mt-2.5 font-heading text-base font-extrabold leading-snug tracking-tight text-ink">
                    {p.name}
                  </h3>
                  <p className="mt-2 text-xs text-ink/55">{p.role}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-5 font-mono text-[10px] uppercase tracking-[0.25em] text-forest group-hover:text-ember">
                    View Project
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        </div>
        ))}

        <Reveal>
          <p className="mt-12 max-w-3xl rounded-xl border-l-4 border-ember bg-white p-5 font-mono text-[11px] uppercase leading-relaxed tracking-[0.15em] text-ink/60">
            Historical projects are shown as subcontract / execution-partner experience. Only the New
            Narendra–Pune package is presented as full EPC. "Certified" marks projects backed by a client-issued
            experience certificate; quantities shown are taken directly from those certificates.
          </p>
        </Reveal>
      </section>

      <section className="bg-forest py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 sm:px-8 lg:flex-row lg:items-center">
          <h2 className="max-w-xl font-heading text-2xl font-extrabold uppercase leading-tight tracking-tight text-paper sm:text-4xl">
            Planning a 765 kV or 400 kV package?
          </h2>
          <CTALink to="/contact" testId="projects-contact-cta">Request a Project Discussion</CTALink>
        </div>
      </section>
    </main>
  );
}
