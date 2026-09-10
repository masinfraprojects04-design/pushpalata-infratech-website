import { motion } from "motion/react";
import { EPC_STEPS, IMG, PROJECTS, VOLTAGES } from "@/lib/data";
import { Reveal, PageHero, Chapter, CTALink } from "@/components/site/Shared";
import { Link } from "react-router-dom";

function EpcTimeline() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <Chapter no="01" label="EPC Process Framework" />
      <Reveal>
        <h2 className="mt-8 max-w-3xl font-heading text-3xl font-extrabold uppercase leading-[1.05] tracking-tight text-ink sm:text-5xl">
          Survey to <span className="text-ember">Commissioning</span>
        </h2>
        <p className="mt-5 max-w-2xl text-base text-ink/65">
          This framework represents the company's current full EPC capability. Historical subcontract projects
          are not described as full EPC.
        </p>
      </Reveal>
      <div className="relative mt-16">
        <span className="absolute left-6 top-0 h-full w-px bg-ink/15 sm:left-1/2" />
        <div className="space-y-10">
          {EPC_STEPS.map((s, i) => {
            const left = i % 2 === 0;
            return (
              <div key={s.title} className="relative flex sm:items-center">
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="absolute left-6 z-10 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border-4 border-paper bg-ember sm:left-1/2"
                >
                  <s.icon className="h-5 w-5 text-white" />
                </motion.span>
                <Reveal
                  delay={0.1}
                  className={`ml-16 w-full sm:ml-0 sm:w-1/2 ${left ? "sm:pr-16" : "sm:ml-auto sm:pl-16"}`}
                >
                  <div className="rounded-2xl border border-ink/10 bg-white p-7 transition-colors duration-300 hover:border-ember/50">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ember">
                      Step {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-2 font-heading text-lg font-extrabold uppercase tracking-tight text-ink">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink/60">{s.desc}</p>
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CapabilityNote() {
  const flagship = PROJECTS[0];
  return (
    <section className="cad-grid bg-forest py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Chapter no="02" label="Framework in Action" light />
        <div className="mt-10 grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <h2 className="font-heading text-2xl font-extrabold uppercase leading-tight tracking-tight text-paper sm:text-4xl">
              Currently Applied: 765 kV D/C New Narendra (GIS) – Pune (GIS), Package-1
            </h2>
            <p className="mt-5 text-base leading-relaxed text-paper/65">
              The full framework is live on a 35 km 765 kV double-circuit transmission line in Karnataka —
              service order effective 11 November 2025, reference AP1/0 to AP14/0.
            </p>
            <div className="mt-7 flex flex-wrap gap-2.5">
              {["Survey", "Soil Investigation", "Foundation", "Tower Erection", "Stringing", "Earthing", "Testing", "Commissioning"].map(
                (s) => (
                  <span
                    key={s}
                    className="rounded-full border border-paper/20 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-paper/75"
                  >
                    {s}
                  </span>
                )
              )}
            </div>
            <div className="mt-9">
              <Link
                to={`/projects/${flagship.id}`}
                data-testid="epc-flagship-link"
                className="group inline-flex items-center gap-2.5 rounded-full bg-ember px-7 py-3.5 font-heading text-sm font-bold uppercase tracking-wider text-white transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-ember-2"
              >
                View Flagship Project
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="relative">
              <div className="absolute -right-3 -top-3 h-16 w-16 border-r-4 border-t-4 border-ember" />
              <img
                src={IMG.corridor}
                alt="765 kV corridor in execution"
                className="aspect-[4/3] w-full rounded-xl object-cover"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <div className="mt-16 flex flex-wrap items-center gap-3 border-t border-paper/10 pt-10">
            <span className="mr-2 font-mono text-[10px] uppercase tracking-[0.3em] text-paper/45">
              Voltage range experience:
            </span>
            {VOLTAGES.map((v) => (
              <span key={v} className="font-heading text-sm font-extrabold text-paper/85">
                {v}
                <span className="ml-3 text-ember">/</span>
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function EpcCapabilities() {
  return (
    <main data-testid="epc-capabilities-page">
      <PageHero
        eyebrow="EPC Capabilities"
        title="Integrated EPC Delivery"
        description="An execution framework built from a decade of field experience — now delivered as integrated EPC from survey through commissioning."
        img={IMG.sunsetPost}
      />
      <EpcTimeline />
      <CapabilityNote />
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-8 rounded-2xl bg-ember p-10 sm:p-14 lg:flex-row lg:items-center">
          <h2 className="max-w-xl font-heading text-2xl font-extrabold uppercase leading-tight tracking-tight text-white sm:text-4xl">
            Evaluate us for your next EPC package
          </h2>
          <CTALink to="/contact" variant="outline-light" testId="epc-contact-cta">
            Request a Project Discussion
          </CTALink>
        </div>
      </section>
    </main>
  );
}
