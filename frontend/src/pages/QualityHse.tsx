import { IMG } from "@/lib/data";
import { Reveal, PageHero, Chapter, CTALink } from "@/components/site/Shared";
import { Certifications } from "@/components/site/Certifications";
import { ShieldCheck, HardHat, ClipboardCheck, HeartHandshake } from "lucide-react";

const PILLARS = [
  {
    icon: ShieldCheck,
    title: "Quality Management",
    body: "Focus on planned execution, inspection, documentation, workmanship and adherence to project specifications.",
  },
  {
    icon: HardHat,
    title: "HSE",
    body: "Safety-focused construction practices, PPE, work-at-height controls, lifting safety, site discipline and environmental responsibility.",
  },
  {
    icon: ClipboardCheck,
    title: "QA/QC",
    body: "Inspection planning, workmanship control, material verification, documentation, and testing & commissioning support.",
  },
  {
    icon: HeartHandshake,
    title: "Safety Culture",
    body: "Every project begins with the principle that safe execution is successful execution.",
  },
];

const GALLERY = [
  { img: IMG.crew, caption: "Safety briefings & PPE" },
  { img: IMG.lattice, caption: "Tower climbing & erection" },
  { img: IMG.substation, caption: "Inspection & supervision" },
  { img: IMG.lineDirt, caption: "Foundation quality checks" },
  { img: IMG.crewOrange, caption: "Site discipline" },
  { img: IMG.siteGate, caption: "Controlled site access" },
];

export default function QualityHse() {
  return (
    <main data-testid="quality-hse-page" className="bg-forest">
      <PageHero
        eyebrow="Quality & HSE"
        title="Safety. Quality. Responsibility."
        description="Disciplined execution is our licence to operate — on every foundation, every tower, every span."
        img={IMG.crew}
      />

      <section className="cad-grid bg-forest py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Chapter no="01" label="Our Commitments" light />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-paper/12 bg-forest-2 p-8 transition-colors duration-300 hover:border-ember/50">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-ember">
                    <p.icon className="h-6 w-6 text-white" />
                  </span>
                  <h3 className="mt-6 font-heading text-lg font-extrabold uppercase tracking-tight text-paper">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-paper/60">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.15}>
            <p className="mt-12 max-w-3xl border-l-4 border-ember pl-6 font-heading text-xl font-bold leading-relaxed text-paper/90 sm:text-2xl">
              "Every project begins with the principle that safe execution is successful execution."
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-forest-2 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Chapter no="02" label="From the Field" light />
          <Reveal>
            <h2 className="mt-8 max-w-2xl font-heading text-3xl font-extrabold uppercase leading-[1.05] tracking-tight text-paper sm:text-4xl">
              Safety in Practice
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {GALLERY.map((g, i) => (
              <Reveal key={g.caption} delay={(i % 3) * 0.07}>
                <figure className="group relative overflow-hidden rounded-2xl" data-testid={`hse-gallery-${i}`}>
                  <img
                    src={g.img}
                    alt={g.caption}
                    loading="lazy"
                    className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-transparent to-transparent" />
                  <figcaption className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.25em] text-paper">
                    {g.caption}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Certifications no="03" />

      <section className="bg-paper py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 sm:px-8 lg:flex-row lg:items-center">
          <h2 className="max-w-xl font-heading text-2xl font-extrabold uppercase leading-tight tracking-tight text-ink sm:text-4xl">
            Request our quality & HSE documentation
          </h2>
          <CTALink to="/contact" testId="hse-contact-cta">Contact Us</CTALink>
        </div>
      </section>
    </main>
  );
}
