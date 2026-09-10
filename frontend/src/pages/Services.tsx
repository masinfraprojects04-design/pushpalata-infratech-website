import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SERVICES, IMG, VOLTAGES } from "@/lib/data";
import { Reveal, PageHero, Chapter, CTALink } from "@/components/site/Shared";
import { motion } from "motion/react";

function VoltageStrip() {
  return (
    <section className="bg-forest py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Chapter no="02" label="Voltage Capability" light />
        <Reveal>
          <h2 className="mt-6 max-w-2xl font-heading text-2xl font-extrabold uppercase tracking-tight text-paper sm:text-4xl">
            Experience Across Multiple Voltage Levels
          </h2>
          <p className="mt-4 max-w-2xl text-sm text-paper/65 sm:text-base">
            Project execution capabilities span a broad range of transmission voltage levels, with experience
            extending up to 765 kV.
          </p>
        </Reveal>
        <div className="mt-10 flex flex-wrap gap-3">
          {VOLTAGES.map((v, i) => (
            <motion.span
              key={v}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className={`rounded-full border px-6 py-2.5 font-heading text-sm font-extrabold tracking-wide ${
                i === VOLTAGES.length - 1
                  ? "border-ember bg-ember text-white"
                  : "border-paper/20 text-paper/80"
              }`}
            >
              {v}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Services() {
  return (
    <main>
      <PageHero
        eyebrow="Our Core Services"
        title="Full-Cycle Transmission Execution"
        description="From survey and foundations to stringing, testing and commissioning — eight disciplines, one execution standard."
        img={IMG.towerInsulatorsSky}
      />
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <Chapter no="01" label="What We Deliver" />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {SERVICES.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 2) * 0.08}>
              <Link
                to={`/services/${s.slug}`}
                data-testid={`services-page-card-${s.slug}`}
                className="group grid h-full overflow-hidden rounded-2xl border border-ink/10 bg-white transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-ember/60 hover:shadow-[0_24px_70px_rgba(10,38,30,0.14)] sm:grid-cols-5"
              >
                <div className="relative h-44 overflow-hidden sm:h-full sm:col-span-2">
                  <img
                    src={s.img}
                    alt={s.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-lg bg-ember">
                    <s.icon className="h-5 w-5 text-white" />
                  </span>
                </div>
                <div className="flex flex-col p-7 sm:col-span-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ember">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 font-heading text-xl font-extrabold uppercase leading-snug tracking-tight text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/60">{s.short}</p>
                  <span className="mt-5 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-forest group-hover:text-ember">
                    View Capability
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <VoltageStrip />
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-8 rounded-2xl bg-forest p-10 sm:p-14 lg:flex-row lg:items-center">
          <h2 className="max-w-xl font-heading text-2xl font-extrabold uppercase leading-tight tracking-tight text-paper sm:text-4xl">
            Need a scope-specific execution plan?
          </h2>
          <CTALink to="/contact" testId="services-contact-cta">Request a Project Discussion</CTALink>
        </div>
      </section>
    </main>
  );
}
