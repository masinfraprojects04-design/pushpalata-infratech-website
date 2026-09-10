import { IMG, CONTACT } from "@/lib/data";
import { Reveal, PageHero, Chapter } from "@/components/site/Shared";
import { Mail, MapPin, ArrowUpRight } from "lucide-react";

const CATEGORIES = [
  "Civil Engineering",
  "Transmission Line Engineering",
  "Tower Erection",
  "Stringing",
  "Survey",
  "QA/QC",
  "HSE",
  "Project Planning",
  "Site Management",
  "Skilled Workforce",
  "Administration",
];

const LOCATIONS = ["Bihar", "Karnataka", "Project locations across India, as required"];

export default function Careers() {
  return (
    <main data-testid="careers-page">
      <PageHero
        eyebrow="Careers"
        title="Build Your Career With Pushpalata Infratech"
        description="Join the teams erecting India's highest-voltage transmission corridors — from foundation crews to project engineers."
        img={IMG.crewOrange}
      />

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <Chapter no="01" label="Open Disciplines" />
        <div className="mt-8 grid items-start gap-12 lg:grid-cols-2">
          <div>
            <Reveal>
              <h2 className="font-heading text-3xl font-extrabold uppercase leading-[1.05] tracking-tight text-ink sm:text-4xl">
                Grow With a Company Moving Into <span className="text-ember">Full EPC</span>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-ink/70">
                We hire across engineering, execution and site disciplines. Project manpower scales with
                awarded work — if you build transmission lines, there is a place for you here.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-8 flex flex-wrap gap-3">
                {CATEGORIES.map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-ink/15 bg-white px-5 py-2.5 font-heading text-sm font-bold uppercase tracking-wide text-forest transition-colors hover:border-ember/60 hover:text-ember"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="mt-10">
                <h3 className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                  Work Locations
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {LOCATIONS.map((l) => (
                    <li key={l} className="flex items-center gap-2.5 text-sm text-ink/75">
                      <MapPin className="h-4 w-4 text-ember" /> {l}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <div className="rounded-2xl bg-forest p-9 sm:p-12">
              <div className="cad-grid absolute" />
              <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-ember">
                <Mail className="h-7 w-7 text-white" />
              </span>
              <h3 className="mt-7 font-heading text-2xl font-extrabold uppercase tracking-tight text-paper">
                Send Your Resume
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-paper/65">
                Email your resume with your discipline, experience and current location. Shortlisted
                candidates are contacted as project requirements open up.
              </p>
              <a
                href={`mailto:${CONTACT.email}?subject=Career%20Application%20—%20Pushpalata%20Infratech`}
                data-testid="careers-resume-button"
                className="group mt-8 inline-flex items-center gap-2.5 rounded-full bg-ember px-8 py-4 font-heading text-sm font-bold uppercase tracking-wider text-white transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-ember-2"
              >
                Send Your Resume
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.2em] text-paper/45">
                {CONTACT.email}
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
