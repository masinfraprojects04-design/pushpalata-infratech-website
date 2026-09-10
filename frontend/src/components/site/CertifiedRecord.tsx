import { Link } from "react-router-dom";
import { BadgeCheck, ArrowUpRight } from "lucide-react";
import { CERTIFIED_RECORD } from "@/lib/data";
import { Reveal, Chapter, Counter } from "@/components/site/Shared";

export function CertifiedRecord({ no }: { no: string }) {
  return (
    <section data-testid="certified-record" className="cad-grid bg-forest py-24 text-paper sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Chapter no={no} label="Client-Certified Track Record" light />
        <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <h2 className="max-w-2xl font-heading text-3xl font-extrabold uppercase leading-[1.05] tracking-tight sm:text-5xl">
              Quantities Our Clients <span className="text-ember">Put in Writing</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-md text-sm leading-relaxed text-paper/60 sm:text-base">
              Experience certificates issued by Sterlite Power and Ashoka Buildcon, and client undertakings for Adani Transmission and LS Cable — quantities below are taken directly from those documents.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-paper/10 bg-paper/10 sm:grid-cols-2 lg:grid-cols-4">
          {CERTIFIED_RECORD.totals.map((t, i) => (
            <Reveal key={t.label} delay={i * 0.07}>
              <div data-testid={`certified-total-${i}`} className="h-full bg-forest-2 p-7">
                <p className="font-heading text-4xl font-extrabold tracking-tight text-paper sm:text-5xl">
                  <Counter to={t.value} />
                  <span className="text-ember">{t.suffix}</span>
                </p>
                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-paper/55">{t.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-8 overflow-x-auto rounded-2xl border border-paper/10">
            <table data-testid="certified-table" className="w-full min-w-[880px] text-left text-sm">
              <thead className="bg-forest-2 font-mono text-[10px] uppercase tracking-[0.25em] text-paper/55">
                <tr>
                  {["Client", "Project", "Erection", "Foundations", "Stringing", "Certified"].map((h) => (
                    <th key={h} className="px-5 py-4 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-paper/10">
                {CERTIFIED_RECORD.rows.map((r) => (
                  <tr key={r.id} data-testid={`certified-row-${r.id}`} className="transition-colors hover:bg-paper/5">
                    <td className="px-5 py-4 font-heading text-sm font-bold tracking-tight text-paper">{r.client}</td>
                    <td className="px-5 py-4 text-paper/80">
                      <Link to={`/projects/${r.id}`} className="group inline-flex items-start gap-1.5 hover:text-ember">
                        {r.project}
                        <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                      </Link>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 font-mono text-xs text-paper/80">{r.erection}</td>
                    <td className="whitespace-nowrap px-5 py-4 font-mono text-xs text-paper/80">{r.foundations}</td>
                    <td className="whitespace-nowrap px-5 py-4 font-mono text-xs text-paper/80">{r.stringing}</td>
                    <td className="whitespace-nowrap px-5 py-4">
                      <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-ember">
                        <BadgeCheck className="h-3.5 w-3.5" /> {r.date}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
        <p className="mt-6 max-w-3xl font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em] text-paper/40">
          Certified totals cover the three Sterlite Power packages only. Certificate copies are shared with clients on request.
        </p>
      </div>
    </section>
  );
}
