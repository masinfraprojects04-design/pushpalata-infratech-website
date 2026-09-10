import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar, Zap, Check } from "lucide-react";
import { PROJECTS } from "@/lib/data";
import { Reveal, PageHero, CTALink } from "@/components/site/Shared";

const CATEGORY_LABEL: Record<string, string> = {
  epc: "Current Full EPC Project",
  current: "Recent / Current Execution Experience",
  subcontract: "Subcontract / Execution Experience",
};

export default function ProjectDetail() {
  const { id } = useParams();
  const project = PROJECTS.find((p) => p.id === id);
  if (!project) return <Navigate to="/projects" replace />;
  const others = PROJECTS.filter((p) => p.id !== id && p.category === project.category).slice(0, 3);

  return (
    <main data-testid="project-detail-page">
      <PageHero eyebrow={CATEGORY_LABEL[project.category]} title={project.name} img={project.img} />

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-14 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Reveal>
              <div className="grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
                {project.highlights.map((h) => (
                  <div key={h.label} className="bg-white p-6">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                      {h.label}
                    </p>
                    <p className="mt-2 font-heading text-lg font-extrabold tracking-tight text-forest">
                      {h.value}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 rounded-2xl border border-ink/10 bg-white p-6">
                <span className="flex items-center gap-2 text-sm text-ink/70">
                  <MapPin className="h-4 w-4 text-ember" /> {project.location}
                </span>
                <span className="flex items-center gap-2 text-sm text-ink/70">
                  <Calendar className="h-4 w-4 text-ember" /> {project.period}
                </span>
                {project.voltage && (
                  <span className="flex items-center gap-2 text-sm text-ink/70">
                    <Zap className="h-4 w-4 text-ember" /> {project.voltage}
                    {project.lineType ? ` • ${project.lineType}` : ""}
                  </span>
                )}
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <h2 className="mt-12 font-heading text-xl font-extrabold uppercase tracking-tight text-ink">
                Scope of Work
              </h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {project.scope.map((s) => (
                  <li key={s} className="flex items-start gap-3 rounded-xl border border-ink/10 bg-white p-4">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ember">
                      <Check className="h-3 w-3 text-white" />
                    </span>
                    <span className="text-sm leading-relaxed text-ink/75">{s}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            {project.note && (
              <Reveal delay={0.16}>
                <p className="mt-8 rounded-xl border-l-4 border-ember bg-sand/60 p-5 text-sm leading-relaxed text-ink/70">
                  {project.note}
                </p>
              </Reveal>
            )}
          </div>

          <div>
            <Reveal delay={0.1}>
              <div className="overflow-hidden rounded-2xl border-4 border-forest">
                <img src={project.img} alt={project.name} className="h-64 w-full object-cover" loading="lazy" />
              </div>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="mt-6 rounded-2xl bg-forest p-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ember">Role</p>
                <p className="mt-2 font-heading text-lg font-extrabold leading-snug text-paper">{project.role}</p>
                <div className="mt-6">
                  <CTALink to="/contact" testId="project-detail-cta">Discuss a Similar Project</CTALink>
                </div>
              </div>
            </Reveal>
            {others.length > 0 && (
              <Reveal delay={0.2}>
                <h3 className="mt-10 font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                  Related Projects
                </h3>
                <ul className="mt-4 space-y-2">
                  {others.map((o) => (
                    <li key={o.id}>
                      <Link
                        to={`/projects/${o.id}`}
                        data-testid={`project-detail-related-${o.id}`}
                        className="block rounded-xl border border-ink/10 bg-white px-5 py-4 transition-colors hover:border-ember/50"
                      >
                        <span className="font-heading text-sm font-bold leading-snug text-ink">{o.name}</span>
                        <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.2em] text-ember">
                          {o.location} • {o.period}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
            <Link
              to="/projects"
              data-testid="project-detail-back-link"
              className="mt-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-ember"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> All Projects
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
