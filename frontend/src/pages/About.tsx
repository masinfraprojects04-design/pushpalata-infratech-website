import { IMG, VALUES, DIRECTORS, CORPORATE, CONTACT } from "@/lib/data";
import { Reveal, PageHero, Chapter, CTALink, Eyebrow } from "@/components/site/Shared";
import { Certifications } from "@/components/site/Certifications";
import { ShieldCheck, Target, Eye, Users, DraftingCompass, FileCheck2, Building2 } from "lucide-react";

function Story() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <Chapter no="01" label="Our Story" />
      <div className="mt-8 grid items-start gap-14 lg:grid-cols-2">
        <div>
          <Reveal>
            <h2 className="font-heading text-3xl font-extrabold uppercase leading-[1.05] tracking-tight text-ink sm:text-5xl">
              From Field Execution to <span className="text-ember">Full EPC</span> Capability
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-7 space-y-4 text-base leading-relaxed text-ink/70">
              <p>
                Pushpalata Infratech Private Limited was established in 2014 and has developed extensive
                practical experience in transmission-line execution through projects undertaken as a
                subcontractor and execution partner.
              </p>
              <p>
                Over the years, the company has contributed to high-voltage transmission infrastructure works
                including foundation, tower erection, stringing and related field activities.
              </p>
              <p>
                Today, Pushpalata Infratech is expanding its capabilities into full EPC execution, combining
                field execution experience with project coordination, civil works, erection, stringing,
                testing and commissioning activities.
              </p>
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
              <p className="mt-2 text-sm text-ink/60">
                Subcontractor / Execution Partner across major high-voltage transmission projects in Rajasthan,
                Gujarat and Madhya Pradesh.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="relative overflow-hidden rounded-2xl bg-forest p-8">
              <div className="cad-grid absolute inset-0" />
              <div className="relative">
                <span className="font-mono text-xs tracking-[0.3em] text-ember">2025 – Present</span>
                <h3 className="mt-3 font-heading text-xl font-extrabold uppercase tracking-tight text-paper">
                  Full EPC Expansion
                </h3>
                <p className="mt-2 text-sm text-paper/65">
                  Integrated transmission-line EPC execution — beginning with a 35 km 765 kV D/C project in
                  Karnataka.
                </p>
              </div>
              <span className="absolute -right-6 -top-6 h-24 w-24 rotate-45 bg-ember/90" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function MissionVision() {
  const cards = [
    {
      icon: Target,
      title: "Mission",
      body: "To deliver reliable transmission and infrastructure execution through safe working practices, quality workmanship, engineering support and disciplined project management, while continuously expanding our capabilities toward integrated EPC delivery.",
    },
    {
      icon: Eye,
      title: "Vision",
      body: "To become a trusted transmission and power-infrastructure EPC company, recognized for strong field execution, safety, quality and dependable project delivery across India.",
    },
  ];
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Chapter no="02" label="Mission, Vision & Values" />
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.1}>
              <div className="h-full rounded-2xl border border-ink/10 bg-paper p-9">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-ember">
                  <c.icon className="h-6 w-6 text-white" />
                </span>
                <h3 className="mt-6 font-heading text-2xl font-extrabold uppercase tracking-tight text-ink">
                  {c.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-ink/70">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.15}>
          <div className="mt-5 rounded-2xl bg-forest p-9">
            <h3 className="font-heading text-xl font-extrabold uppercase tracking-tight text-paper">Our Values</h3>
            <div className="mt-6 flex flex-wrap gap-3">
              {VALUES.map((v) => (
                <span
                  key={v}
                  className="rounded-full border border-paper/20 px-5 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-paper/80"
                >
                  {v}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function People() {
  const disciplines = [
    "Engineering", "Civil", "Erection", "Stringing", "QA/QC", "Safety", "Survey",
    "Project Management", "Site Supervision", "Skilled Workforce",
  ];
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <Chapter no="03" label="Our People & Organization" />
      <div className="mt-8 grid items-start gap-12 lg:grid-cols-2">
        <div>
          <Reveal>
            <h2 className="font-heading text-3xl font-extrabold uppercase leading-[1.05] tracking-tight text-ink sm:text-4xl">
              A Workforce Built for <span className="text-ember">Transmission Execution</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-ink/70">
              Project manpower strength can scale according to project requirements — up to 3,000 project
              manpower (management-provided figure), mobilized across engineering, erection, stringing and
              site disciplines.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {disciplines.map((d) => (
                <div key={d} className="rounded-xl border border-ink/10 bg-white px-4 py-3.5 text-center">
                  <span className="font-heading text-sm font-bold uppercase tracking-wide text-forest">{d}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.12}>
          <div className="overflow-hidden rounded-2xl border-4 border-forest">
            <img src={IMG.foundationToolbox} alt="Site execution team in safety PPE" className="h-80 w-full object-cover" loading="lazy" />
            <p className="bg-forest px-4 py-2 font-mono text-[10px] uppercase tracking-[0.3em] text-paper/60">
              Site execution team • PPE-compliant works
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Engineering() {
  const items = [
    { icon: DraftingCompass, title: "Transmission Line Engineering", desc: "Profile engineering and tower scheduling support" },
    { icon: FileCheck2, title: "PLS-CADD / PLS Profile", desc: "Industry-standard line design workflows" },
    { icon: Target, title: "Survey / GIS Workflows", desc: "Route survey, alignment and corridor data" },
    { icon: Users, title: "Project Planning & Management", desc: "Scheduling, coordination and progress control" },
    { icon: ShieldCheck, title: "Digital Documentation", desc: "Quality records and site documentation systems" },
    { icon: Building2, title: "Site Coordination", desc: "Multi-front execution and contractor coordination" },
  ];
  return (
    <section className="cad-grid bg-forest py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Chapter no="04" label="Engineering & Technology" light />
        <Reveal>
          <h2 className="mt-8 max-w-2xl font-heading text-3xl font-extrabold uppercase leading-[1.05] tracking-tight text-paper sm:text-4xl">
            Engineering-Led <span className="text-ember">Delivery</span>
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={(i % 3) * 0.08}>
              <div className="h-full rounded-2xl border border-paper/12 bg-forest-2 p-7 transition-colors duration-300 hover:border-ember/50">
                <it.icon className="h-7 w-7 text-ember" />
                <h3 className="mt-5 font-heading text-base font-extrabold uppercase tracking-wide text-paper">
                  {it.title}
                </h3>
                <p className="mt-2 text-sm text-paper/60">{it.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CorporateInfo() {
  const badges = ["Private Limited Company", "GST Registered", "Udyam Registered", "EPFO Registered"];
  const rows = [
    { label: "Incorporated", value: CORPORATE.incorporated },
    { label: "CIN", value: CORPORATE.cin },
    { label: "GSTIN", value: CORPORATE.gstin },
    { label: "Udyam", value: CORPORATE.udyam },
    { label: "EPFO Code", value: CORPORATE.epfo },
  ];
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <Chapter no="05" label="Corporate Information" />
      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div>
          <Reveal>
            <h2 className="font-heading text-2xl font-extrabold uppercase tracking-tight text-ink sm:text-3xl">
              Registered & Compliant
            </h2>
            <div className="mt-7 space-y-px overflow-hidden rounded-xl border border-ink/10">
              {rows.map((r) => (
                <div key={r.label} className="flex items-center justify-between gap-4 bg-white px-6 py-4">
                  <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                    {r.label}
                  </span>
                  <span className="font-mono text-sm font-medium text-ink">{r.value}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="mt-6 flex flex-wrap gap-3">
              {badges.map((b) => (
                <span
                  key={b}
                  className="flex items-center gap-2 rounded-full bg-forest px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-paper"
                >
                  <ShieldCheck className="h-3.5 w-3.5 text-ember" />
                  {b}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
        <div>
          <Reveal delay={0.08}>
            <h2 className="font-heading text-2xl font-extrabold uppercase tracking-tight text-ink sm:text-3xl">
              Board of Directors
            </h2>
            <div className="mt-7 space-y-4">
              {DIRECTORS.map((d) => (
                <div
                  key={d}
                  className="flex items-center gap-5 rounded-2xl border border-ink/10 bg-white p-6"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-forest font-heading text-base font-extrabold text-paper">
                    {d.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                  </span>
                  <div>
                    <p className="font-heading text-lg font-extrabold tracking-tight text-ink">{d}</p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-ember">Director</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <main>
      <PageHero
        eyebrow="About Us — Established 2014"
        title="A Decade on the Line"
        description="Over a decade of industry experience in transmission-line execution — now expanding into full EPC delivery for high-voltage power infrastructure."
        img={IMG.towerErectedCrew}
      />
      <Story />
      <MissionVision />
      <People />
      <Engineering />
      <CorporateInfo />
      <Certifications no="06" />
      <section className="bg-sand/60 py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 sm:px-8 lg:flex-row lg:items-center">
          <div>
            <Eyebrow>Work With Us</Eyebrow>
            <h2 className="mt-4 font-heading text-2xl font-extrabold uppercase tracking-tight text-ink sm:text-4xl">
              Discuss your next transmission project
            </h2>
          </div>
          <CTALink to="/contact" testId="about-contact-cta">Contact Us</CTALink>
        </div>
      </section>
    </main>
  );
}
