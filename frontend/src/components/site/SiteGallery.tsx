import { Maximize2 } from "lucide-react";
import { Reveal, Chapter } from "@/components/site/Shared";
import { useLightbox, type LightboxItem } from "@/components/site/Lightbox";

export function SiteGallery({
  no,
  items,
  label = "Photos From Site",
  light = false,
}: {
  no: string;
  items: readonly LightboxItem[];
  label?: string;
  light?: boolean;
}) {
  const lb = useLightbox(items);
  return (
    <section data-testid="site-gallery" className={light ? "cad-grid bg-forest py-24 sm:py-32" : "bg-white py-24 sm:py-32"}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Chapter no={no} label={label} light={light} />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {items.map((g, i) => (
            <Reveal key={g.img} delay={0.06 * (i % 6)} className={i % 5 < 2 ? "lg:col-span-3" : "lg:col-span-2"}>
              <GalleryTile item={g} tall={i % 5 < 2} testId={`site-gallery-${i}`} onOpen={() => lb.open(i)} />
            </Reveal>
          ))}
        </div>
        <p className={`mt-6 font-mono text-[10px] uppercase tracking-[0.2em] ${light ? "text-paper/40" : "text-ink/40"}`}>
          Tap any photo to view full-screen
        </p>
      </div>
      {lb.node}
    </section>
  );
}

export function GalleryTile({
  item,
  tall = false,
  testId,
  onOpen,
  heightClass,
}: {
  item: LightboxItem;
  tall?: boolean;
  testId: string;
  onOpen: () => void;
  heightClass?: string;
}) {
  return (
    <figure
      data-testid={testId}
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onOpen()}
      className="group relative cursor-zoom-in overflow-hidden rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-ember"
    >
      <img
        src={item.img}
        alt={item.caption}
        loading="lazy"
        className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${heightClass ?? (tall ? "h-72 sm:h-80" : "h-64")}`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
      <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-paper/15 text-paper opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
        <Maximize2 className="h-4 w-4" />
      </span>
      <figcaption className="absolute bottom-4 left-4 right-4 font-mono text-[10px] uppercase leading-snug tracking-[0.22em] text-paper">
        {item.caption}
      </figcaption>
    </figure>
  );
}
