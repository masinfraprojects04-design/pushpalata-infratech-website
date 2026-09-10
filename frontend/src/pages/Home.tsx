import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import { IMG, SERVICES, PROJECTS, VOLTAGES, PARTNERS } from "@/lib/data";
import { Reveal, MaskedLine, Counter, Marquee, CTALink, ScrollHint, Chapter } from "@/components/site/Shared";
import { FieldVideo } from "@/components/site/FieldVideo";

const KPIS = [
  { label: "Established", value: 2014, suffix: "" },
  { label: "Highest Voltage", value: 765, suffix: " kV" },
  { label: "Current Full EPC Project", value: 35, suffix: " km" },
  { label: "Project Manpower", prefix: "Up to ", value: 3000, suffix: "*" },
  { label: "Line Executed as Subcontractor", value: 1500, suffix: "+ km" },
];

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], [0, 260]);
  const scale = useTransform(scrollY, [0, 900], [1.08, 1.22]);

  return (
    <section className="relative flex h-[100svh] min-h-[660px] items-center overflow-hidden bg-forest" data-testid="hero-section">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img src={IMG.towerErectedCrew} alt="765 kV transmission tower erected by Pushpalata Infratech" className="h-full w-full object-cover object-[center_35%]" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-forest via-forest/78 to-forest/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-forest via-transparent to-forest/60" />
      <div className="cad-grid absolute inset-0" />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
        <MaskedLine>
          <p className="font-mono text-[11px] uppercase tracking-[0.4em] text-ember sm:text-xs" data-testid="hero-eyebrow">
            Power Transmission • Infrastructure • EPC
          </p>
        </MaskedLine>
        <h1 className="mt-6 font-heading font-extrabold uppercase leading-[0.98] tracking-tight text-paper">
          <MaskedLine delay={0.15} className="text-4xl sm:text-6xl lg:text-[5.2rem]">
            Engineering the Power
          </MaskedLine>
          <MaskedLine delay={0.3} className="text-4xl sm:text-6xl lg:text-[5.2rem]">
            <span className="text-ember">That Moves</span> India
          </MaskedLine>
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55 }}
          className="mt-6 font-mono text-[11px] uppercase tracking-[0.3em] text-paper/60"
        >
          Pushpalata Infratech Private Limited — Transmission Infrastructure & EPC Execution
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="mt-4 max-w-xl text-base leading-relaxed text-paper/75 sm:text-lg"
        >
          Built on more than a decade of transmission-line execution experience, Pushpalata Infratech is
          expanding from specialized field execution into full EPC delivery for high-voltage power
          infrastructure.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.85 }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <CTALink to="/services" testId="hero-explore-services-button">Explore Our Services</CTALink>
          <CTALink to="/projects" variant="outline-light" testId="hero-view-projects-button">View Our Projects</CTALink>
          <Link
            to="/contact"
            data-testid="hero-project-discussion-link"
            className="group inline-flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-wider text-ember transition-colors hover:text-paper"
          >
            Start a Project Discussion
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
      <ScrollHint />
    </section>
  );
}

function KpiStrip() {
  return (
    <section className="relative z-10 mx-auto -mt-24 max-w-7xl px-5 sm:px-8" data-testid="kpi-strip">
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 shadow-[0_24px_80px_rgba(10,38,30,0.18)] sm:grid-cols-3 lg:grid-cols-5">
        {KPIS.map((k, i) => (
          <Reveal key={k.label} delay={i * 0.08} className="bg-white">
            <div className="flex h-full flex-col justify-between gap-5 p-6 sm:p-7">
              <span className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.22em] text-muted-foreground">
                {k.label}
              </span>
              <span className="font-heading text-3xl font-extrabold tracking-tight text-forest sm:text-4xl">
                {"prefix" in k && k.prefix}
                <Counter to={k.value} plain={k.label === "Established"} />
                <span className="text-ember">{k.suffix}</span>
              </span>
            </div>
          </Reveal>
        ))}
      </div>
      <p className="mt-3 text-right font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        * Management-provided figures
      </p>
    </section>
  );
}

function AboutPreview() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <Chapter no="01" label="Who We Are" />
      <div className="mt-8 grid items-start gap-14 lg:grid-cols-2">
        <div>
          <Reveal>
            <h2 className="font-heading text-3xl font-extrabold uppercase leading-[1.05] tracking-tight text-ink sm:text-5xl">
              From Field Execution to <span className="text-ember">Full EPC</span> Capability
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 text-base leading-relaxed text-ink/70 sm:text-lg">
              Pushpalata Infratech Private Limited was established in 2014 and has developed extensive
              practical experience in transmission-line execution through projects undertaken as a
              subcontractor and execution partner.
            </p>
            <p className="mt-4 text-base leading-relaxed text-ink/70">
              Over the years, the company has contributed to high-voltage transmission infrastructure works
              including foundation, tower erection, stringing and related field activities. Today, Pushpalata
              Infratech is expanding its capabilities into full EPC execution, combining field execution
              experience with project coordination, civil works, erection, stringing, testing and
              commissioning activities.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-9">
              <CTALink to="/about" testId="about-preview-cta">Discover Our Journey</CTALink>
            </div>
          </Reveal>
        </div>
        <div className="flex flex-col gap-5">
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-ink/12 bg-white p-8">
              <span className="font-mono text-xs tracking-[0.3em] text-muted-foreground">2014 – 2025</span>
              <h3 className="mt-3 font-heading text-xl font-extrabold uppercase tracking-tight text-ink">
                Specialized Execution Experience
              </h3>
              <p className="mt-2 text-sm text-ink/60">Subcontractor / Execution Partner</p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="relative overflow-hidden rounded-2xl bg-forest p-8">
              <div className="cad-grid absolute inset-0" />
              <div className="relative">
                <span className="font-mono text-xs tracking-[0.3em] text-ember">2025 – Present</span>
                <h3 className="mt-3 font-heading text-xl font-extrabold uppercase tracking-tight text-paper">
                  Full EPC Expansion
                </h3>
                <p className="mt-2 text-sm text-paper/65">Integrated transmission-line EPC execution</p>
              </div>
              <span className="absolute -right-6 -top-6 h-24 w-24 rotate-45 bg-ember/90" />
            </div>
          </Reveal>
          <Reveal delay={0.28}>
            <div className="overflow-hidden rounded-2xl border-4 border-forest">
              <img src={IMG.towerInsulatorsSky} alt="High-voltage transmission tower" className="h-52 w-full object-cover" loading="lazy" />
              <p className="bg-forest px-4 py-2 font-mono text-[10px] uppercase tracking-[0.3em] text-paper/60">
                765 kV class line corridor
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ServicesGrid() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Chapter no="02" label="Our Core Services" />
        <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <h2 className="max-w-xl font-heading text-3xl font-extrabold uppercase leading-[1.05] tracking-tight text-ink sm:text-5xl">
              Execution Across the <span className="text-ember">Full Line Cycle</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <CTALink to="/epc-capabilities" variant="outline" testId="view-all-capabilities-button">
              View All Capabilities
            </CTALink>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 4) * 0.07}>
              <Link
                to={`/services/${s.slug}`}
                data-testid={`service-card-${s.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-ink/10 bg-paper p-7 transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:border-ember/60 hover:shadow-[0_20px_60px_rgba(10,38,30,0.12)]"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest transition-colors duration-300 group-hover:bg-ember">
                  <s.icon className="h-6 w-6 text-paper" />
                </span>
                <h3 className="mt-6 font-heading text-lg font-extrabold uppercase leading-snug tracking-tight text-ink">
                  {s.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/60">{s.short}</p>
                <span className="mt-6 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-ember">
                  Explore
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function VoltageBand() {
  return (
    <section className="cad-grid bg-forest py-24 sm:py-32" data-testid="voltage-band">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Chapter no="04" label="Transmission Voltage Capability" light />
        <Reveal>
          <h2 className="mt-8 max-w-3xl font-heading text-3xl font-extrabold uppercase leading-[1.05] tracking-tight text-paper sm:text-5xl">
            Experience Across <span className="text-ember">Multiple Voltage Levels</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-2xl text-base text-paper/65">
            Project execution capabilities span a broad range of transmission voltage levels, with experience
            extending up to 765 kV.
          </p>
        </Reveal>
        <div className="mt-16 flex items-end justify-between gap-3 sm:gap-6">
          {VOLTAGES.map((v, i) => {
            const top = i === VOLTAGES.length - 1;
            return (
              <Reveal key={v} delay={i * 0.08} className="flex-1">
                <div className="flex flex-col items-center gap-4">
                  <span
                    className={`font-heading text-sm font-extrabold tracking-tight sm:text-2xl ${
                      top ? "text-ember" : "text-paper/85"
                    }`}
                  >
                    {v}
                  </span>
                  <div className="flex h-36 w-full items-end sm:h-48">
                    <motion.div
                      initial={{ height: 0 }}
                      whileInView={{ height: `${26 + i * 15}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                      className={`w-full rounded-t-md ${
                        top ? "bg-ember shadow-[0_0_40px_rgba(255,85,0,0.45)]" : "bg-forest-3"
                      }`}
                    />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
        <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.25em] text-paper/40">
          Experience up to 765 kV across project scopes — EPC capability as per awarded scope
        </p>
      </div>
    </section>
  );
}

function FlagshipProject() {
  const p = PROJECTS[0];
  return (
    <section className="bg-forest-2 py-24 sm:py-32" data-testid="flagship-project">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Chapter no="05" label="Current Flagship EPC Project" light />
        <div className="mt-10 grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative">
              <div className="absolute -left-3 -top-3 h-16 w-16 border-l-4 border-t-4 border-ember" />
              <div className="absolute -bottom-3 -right-3 h-16 w-16 border-b-4 border-r-4 border-ember" />
              <img
                src={p.img}
                alt="765 kV transmission line corridor"
                className="aspect-[4/3] w-full rounded-xl object-cover"
                loading="lazy"
              />
              <span className="absolute left-4 top-4 rounded-full bg-ember px-4 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.25em] text-white">
                Current Flagship EPC Project
              </span>
            </div>
          </Reveal>
          <div>
            <Reveal>
              <h2 className="font-heading text-2xl font-extrabold uppercase leading-tight tracking-tight text-paper sm:text-4xl">
                765 kV D/C New Narendra (GIS) – Pune (GIS) Transmission Line
              </h2>
              <p className="mt-3 font-mono text-xs uppercase tracking-[0.3em] text-ember">Package-1 • Karnataka</p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-paper/15 bg-paper/15">
                {p.highlights.map((h) => (
                  <div key={h.label} className="bg-forest p-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper/45">{h.label}</p>
                    <p className="mt-1.5 font-heading text-lg font-extrabold text-paper">{h.value}</p>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 text-sm leading-relaxed text-paper/65">
                Scope includes survey, soil investigation, tower foundation, erection with extensions and stubs,
                stringing, earthing, benching, protection works, painting, testing and commissioning. Service
                order effective 11 November 2025 — reference AP1/0 to AP14/0.
              </p>
              <div className="mt-8">
                <CTALink to={`/projects/${p.id}`} testId="flagship-view-project-button">View Project</CTALink>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Partners() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <Chapter no="06" label="Selected Project Partners" />
      <Reveal>
        <h2 className="mt-8 max-w-2xl font-heading text-3xl font-extrabold uppercase leading-[1.05] tracking-tight text-ink sm:text-5xl">
          Trusted on <span className="text-ember">Major Corridors</span>
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
        Labels reflect documented engagement roles and do not imply a direct contractual relationship beyond
        those established.
      </p>
    </section>
  );
}

function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-ember" data-testid="cta-band">
      <div className="cad-grid absolute inset-0 opacity-60" />
      <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-8 px-5 py-20 sm:px-8 sm:py-24 lg:flex-row lg:items-center lg:justify-between">
        <Reveal>
          <h2 className="max-w-2xl font-heading text-3xl font-extrabold uppercase leading-[1.05] tracking-tight text-white sm:text-5xl">
            Have a transmission project to discuss?
          </h2>
          <p className="mt-4 max-w-xl text-base text-white/85">
            From tower erection packages to full 765 kV EPC execution — talk to our team about scope, schedule
            and delivery.
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <Link
            to="/contact"
            data-testid="cta-band-contact-button"
            className="group inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 font-heading text-sm font-bold uppercase tracking-wider text-forest shadow-[0_12px_30px_rgba(0,0,0,0.15)] transition-[transform,background-color,color] duration-300 hover:-translate-y-0.5 hover:bg-forest hover:text-paper"
          >
            Start a Project Discussion
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main>
      <Hero />
      <KpiStrip />
      <AboutPreview />
      <Marquee
        items={[
          "765 kV Transmission",
          "Tower Erection",
          "Stringing",
          "Foundation & Civil",
          "Re-Conductoring",
          "Substation Works",
          "Survey & Engineering",
          "Full EPC Execution",
        ]}
      />
      <ServicesGrid />
      <FieldVideo id="stringing" no="03" />
      <VoltageBand />
      <FlagshipProject />
      <Partners />
      <CtaBand />
    </main>
  );
}
