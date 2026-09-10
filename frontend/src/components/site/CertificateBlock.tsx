import { BadgeCheck, Download, Maximize2 } from "lucide-react";
import type { Project } from "@/lib/data";
import { Reveal } from "@/components/site/Shared";
import { useLightbox } from "@/components/site/Lightbox";

type Cert = NonNullable<Project["certificate"]>;

export function CertificateBlock({ cert, name }: { cert: Cert; name: string }) {
  const caption = `${cert.kind} — ${cert.issuer} (${cert.date})`;
  const lb = useLightbox(cert.image ? [{ img: cert.image, caption }] : []);
  return (
    <Reveal delay={0.1}>
      <div data-testid="project-certificate" className="mt-6 grid gap-6 rounded-2xl border border-ember/40 bg-ember/5 p-6 sm:grid-cols-[auto_1fr] sm:items-center">
        {cert.image && (
          <button
            type="button"
            onClick={() => lb.open(0)}
            data-testid="certificate-preview"
            aria-label="View certificate full-screen"
            className="group relative w-28 shrink-0 overflow-hidden rounded-lg border border-ink/10 bg-white shadow-md"
          >
            <img src={cert.image} alt={`${cert.kind} for ${name}`} loading="lazy" className="aspect-[1/1.414] w-full object-cover object-top" />
            <span className="absolute inset-0 flex items-center justify-center bg-ink/50 opacity-0 transition-opacity group-hover:opacity-100">
              <Maximize2 className="h-5 w-5 text-paper" />
            </span>
          </button>
        )}
        <div>
          <span className="inline-flex items-center gap-2 font-heading text-sm font-extrabold uppercase tracking-tight text-forest">
            <BadgeCheck className="h-5 w-5 text-ember" /> {cert.kind}
          </span>
          <p className="mt-2 text-sm text-ink/70">
            Issued by <strong className="text-ink">{cert.issuer}</strong>
          </p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/50">Ref {cert.ref} · {cert.date}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {cert.image && (
              <button
                type="button"
                onClick={() => lb.open(0)}
                data-testid="certificate-view-button"
                className="inline-flex items-center gap-2 rounded-full border border-forest/30 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-forest transition-colors hover:border-ember hover:text-ember"
              >
                <Maximize2 className="h-3.5 w-3.5" /> View Scan
              </button>
            )}
            {cert.file && (
              <a
                href={cert.file}
                download
                data-testid="certificate-download-button"
                className="inline-flex items-center gap-2 rounded-full bg-forest px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-paper transition-colors hover:bg-ember"
              >
                <Download className="h-3.5 w-3.5" /> Download PDF
              </a>
            )}
          </div>
        </div>
      </div>
      {lb.node}
    </Reveal>
  );
}
