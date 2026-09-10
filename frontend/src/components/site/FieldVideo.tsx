import { useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import { FIELD_VIDEO } from "@/lib/data";
import { Reveal, Chapter } from "@/components/site/Shared";

type Key = keyof typeof FIELD_VIDEO;

export function FieldVideo({ id, no, light = false }: { id: Key; no: string; light?: boolean }) {
  const v = FIELD_VIDEO[id];
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const el = ref.current;
    if (!el) return;
    if (el.paused) void el.play();
    else el.pause();
  };

  return (
    <section data-testid={`field-video-${id}`} className={light ? "cad-grid bg-forest py-24 sm:py-32" : "bg-white py-24 sm:py-32"}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Chapter no={no} label="Live From Our Sites" light={light} />
        <div className="mt-10 grid items-end gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-8">
            <div className="group relative overflow-hidden rounded-2xl bg-ink shadow-[0_30px_80px_rgba(10,38,30,0.25)]">
              <video
                ref={ref}
                data-testid="field-video-player"
                poster={v.poster}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                className="aspect-video w-full object-cover"
              >
                <source src={v.webm} type="video/webm" />
                <source src={v.src} type="video/mp4" />
              </video>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-ember px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-white">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" /> Site Footage
                  </span>
                  <p className="mt-3 font-heading text-lg font-extrabold uppercase tracking-tight text-paper sm:text-2xl">{v.title}</p>
                </div>
                <button
                  type="button"
                  onClick={toggle}
                  aria-label={playing ? "Pause video" : "Play video"}
                  data-testid="field-video-toggle"
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-paper/30 bg-paper/10 text-paper backdrop-blur transition-colors hover:bg-ember hover:border-ember"
                >
                  {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 translate-x-0.5" />}
                </button>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-4">
            <p className={`text-base leading-relaxed ${light ? "text-paper/70" : "text-ink/70"}`}>{v.caption}</p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {v.stills.map((s, i) => (
                <figure key={s.img} data-testid={`field-still-${i}`} className="group relative overflow-hidden rounded-xl">
                  <img src={s.img} alt={s.caption} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent px-3 pb-2.5 pt-8 font-mono text-[9px] uppercase leading-snug tracking-[0.18em] text-paper">
                    {s.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
