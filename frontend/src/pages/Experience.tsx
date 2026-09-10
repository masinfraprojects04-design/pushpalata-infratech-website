import { motion } from "motion/react";
import { TIMELINE, PARTNERS, IMG } from "@/lib/data";
import { Reveal, PageHero, Chapter, CTALink, Counter, Marquee } from "@/components/site/Shared";
import { CertifiedRecord } from "@/components/site/CertifiedRecord";

function Timeline() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <Chapter no="01" label="2014 — Present" />
      <Reveal>
        <h2 className="mt-8 max-w-2xl font-heading text-3xl font-extrabold uppercase leading-[1.05] tracking-tight text-ink sm:text-5xl">
          The Road to <span className="text-ember">EPC</span>
        </h2>
      </Reveal>
      <div className="relative mt-16 max-w-3xl">
        <span className="absolute left-[7px] top-2 h-full w-px bg-ink/15" />
        <div className="space-y-12">
          {TIMELINE.map((t, i) => (
            <div key={t.year + t.title} className="relative pl-12">
              <motion.span
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45 }}
                className={`absolute left-0 top-1.5 h-4 w-4 rounded-full border-4 ${
                  t.marker ? "border-ember bg-ember/30" : "border-forest bg-paper"
                }`}
              />
              <Reveal delay={0.05}>
                <span className={`font-mono text-xs uppercase tracking-[0.3em] ${t.marker ? "text-ember" : "text-muted-foreground"}`}>
                  {t.year}
                </span>
                <h3 className="mt-2 font-heading text-xl font-extrabold uppercase tracking-tight text-ink sm:text-2xl">
                  {t.title}
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink/60 sm:text-base">{t.desc}</p>
              </Reveal>
              {i === TIMELINE.length - 3 && (
                <Reveal delay={0.1}>
                  <div className="mt-6 overflow-hidden rounded-2xl border-4 border-forest">
                    <img src={IMG.stringingTensioner} alt="Field execution team" className="h-56 w-full object-cover" loading="lazy" />
                  </div>
                </Reveal>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Numbers() {
  const stats = [
    { label: "Established", value: 2014, suffix: "" },
    { label: "Highest Voltage", value: 765, suffix: " kV" },
    { label: "Project Manpower", value: 3000, suffix: "*", prefix: "Up to " },
    { label: "Transmission Execution Experience", value: 1500, suffix: "+ km*" },
  ];
  return (
    <section className="cad-grid bg-forest py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div>
                <p className="font-heading text-4xl font-extrabold tracking-tight text-paper sm:text-5xl">
                  {s.prefix}
                  <Counter to={s.value} plain={s.label === "Established"} />
                  <span className="text-ember">{s.suffix}</span>
                </p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-paper/50">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 font-mono text-[10px] uppercase tracking-widest text-paper/40">
          * Management-provided figures
        </p>
      </div>
    </section>
  );
}

function PartnerStrip() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <Chapter no="03" label="Selected Project Partners / Clients / Contractors" />
      <Reveal>
        <h2 className="mt-8 max-w-2xl font-heading text-3xl font-extrabold uppercase leading-[1.05] tracking-tight text-ink sm:text-4xl">
          Organizations We Have <span className="text-ember">Executed With</span>
        </h2>
      </Reveal>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {PARTNERS.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.07}>
            <div className="flex h-full flex-col justify-between rounded-2xl border border-ink/10 bg-white p-7">
              <p className="font-heading text-lg font-extrabold leading-snug tracking-tight text-ink">{p.name}</p>
              <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.25em] text-ember">{p.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <p className="mt-6 max-w-3xl font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em] text-muted-foreground">
        Displayed where supported by company records. Labels reflect documented engagement roles and do not
        imply a direct contractual relationship beyond those established.
      </p>
    </section>
  );
}

export default function Experience() {
  return (
    <main data-testid="experience-page">
      <PageHero
        eyebrow="Our Experience"
        title="A Decade on Record"
        description="From 765 kV subcontract execution in 2014 to full EPC delivery today — a timeline built project by project."
        img={IMG.towerErectionProgress}
      />
      <Timeline />
      <Marquee
        dark
        items={["Rajasthan", "Gujarat", "Maharashtra", "Madhya Pradesh", "Assam", "Karnataka", "765 kV", "400 kV", "220 kV", "HTLS Stringing", "Tower Erection", "33/11 kV Substation"]}
      />
      <Numbers />
      <CertifiedRecord no="02" />
      <PartnerStrip />
      <section className="bg-sand/60 py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 sm:px-8 lg:flex-row lg:items-center">
          <h2 className="max-w-xl font-heading text-2xl font-extrabold uppercase leading-tight tracking-tight text-ink sm:text-4xl">
            Put this experience on your project
          </h2>
          <CTALink to="/contact" testId="experience-contact-cta">Contact Us</CTALink>
        </div>
      </section>
    </main>
  );
}
