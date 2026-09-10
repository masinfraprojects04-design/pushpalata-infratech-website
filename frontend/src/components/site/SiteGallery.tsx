import { Reveal, Chapter } from "@/components/site/Shared";

export function SiteGallery({
  no,
  items,
  label = "Photos From Site",
  light = false,
}: {
  no: string;
  items: { img: string; caption: string }[];
  label?: string;
  light?: boolean;
}) {
  return (
    <section data-testid="site-gallery" className={light ? "cad-grid bg-forest py-24 sm:py-32" : "bg-white py-24 sm:py-32"}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Chapter no={no} label={label} light={light} />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {items.map((g, i) => (
            <Reveal key={g.img} delay={0.06 * i} className={i < 2 ? "lg:col-span-3" : "lg:col-span-2"}>
              <figure data-testid={`site-gallery-${i}`} className="group relative overflow-hidden rounded-2xl">
                <img
                  src={g.img}
                  alt={g.caption}
                  loading="lazy"
                  className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${i < 2 ? "h-72 sm:h-80" : "h-64"}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                <figcaption className="absolute bottom-4 left-4 right-4 font-mono text-[10px] uppercase leading-snug tracking-[0.22em] text-paper">
                  {g.caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
