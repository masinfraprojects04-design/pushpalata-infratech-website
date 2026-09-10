import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import { SERVICES } from "@/lib/data";
import { Reveal, PageHero, CTALink } from "@/components/site/Shared";

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return <Navigate to="/services" replace />;
  const others = SERVICES.filter((s) => s.slug !== slug).slice(0, 4);

  return (
    <main data-testid="service-detail-page">
      <PageHero eyebrow="Service Capability" title={service.title} description={service.short} img={service.img} />
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-14 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Reveal>
              <p className="text-lg leading-relaxed text-ink/75">{service.intro}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-12 font-heading text-xl font-extrabold uppercase tracking-tight text-ink">
                Scope Highlights
              </h2>
              <ul className="mt-6 space-y-4">
                {service.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-4 rounded-xl border border-ink/10 bg-white p-5">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ember">
                      <Check className="h-3.5 w-3.5 text-white" />
                    </span>
                    <span className="text-sm leading-relaxed text-ink/75">{pt}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-10 rounded-xl border-l-4 border-ember bg-sand/60 p-5 font-mono text-[11px] uppercase leading-relaxed tracking-[0.15em] text-ink/60">
                Scope executed as per awarded contract. Details available on request.
              </p>
            </Reveal>
          </div>
          <div>
            <Reveal delay={0.1}>
              <div className="rounded-2xl bg-forest p-8">
                <h3 className="font-heading text-lg font-extrabold uppercase tracking-tight text-paper">
                  Discuss This Capability
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-paper/65">
                  Share your line parameters, voltage level and schedule — our team will respond with an
                  execution approach.
                </p>
                <div className="mt-6">
                  <CTALink to="/contact" testId="service-detail-cta">Start a Project Discussion</CTALink>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.18}>
              <h3 className="mt-10 font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                Other Services
              </h3>
              <ul className="mt-4 space-y-2">
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link
                      to={`/services/${o.slug}`}
                      data-testid={`service-detail-related-${o.slug}`}
                      className="group flex items-center justify-between rounded-xl border border-ink/10 bg-white px-5 py-4 transition-colors hover:border-ember/50"
                    >
                      <span className="font-heading text-sm font-bold uppercase tracking-wide text-ink group-hover:text-ember">
                        {o.title}
                      </span>
                      <o.icon className="h-4 w-4 text-ember" />
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                to="/services"
                data-testid="service-detail-back-link"
                className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-ember"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> All Services
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
