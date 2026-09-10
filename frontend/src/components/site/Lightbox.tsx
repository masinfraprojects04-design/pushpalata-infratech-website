import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export interface LightboxItem {
  img: string;
  caption: string;
}

export function useLightbox(items: readonly LightboxItem[]) {
  const [index, setIndex] = useState<number | null>(null);
  return {
    open: (i: number) => setIndex(i),
    node: <Lightbox items={items} index={index} onChange={setIndex} />,
  };
}

function Lightbox({
  items,
  index,
  onChange,
}: {
  items: readonly LightboxItem[];
  index: number | null;
  onChange: (i: number | null) => void;
}) {
  const open = index !== null;
  const count = items.length;
  const go = (d: number) => index !== null && onChange((index + d + count) % count);

  useEffect(() => {
    if (!open) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") onChange(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", key);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", key);
      document.body.style.overflow = "";
    };
  }, [open, index]);

  const item = index !== null ? items[index] : null;

  return createPortal(
    <AnimatePresence>
      {item && (
        <motion.div
          key="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          data-testid="lightbox"
          className="fixed inset-0 z-[80] flex flex-col bg-ink/95 backdrop-blur-sm"
          onClick={() => onChange(null)}
        >
          <div className="flex items-center justify-between px-5 py-4 sm:px-8">
            <span data-testid="lightbox-counter" className="font-mono text-[11px] uppercase tracking-[0.3em] text-paper/60">
              {String(index! + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </span>
            <Btn testId="lightbox-close" label="Close" onClick={() => onChange(null)}>
              <X className="h-5 w-5" />
            </Btn>
          </div>
          <div className="relative flex flex-1 items-center justify-center overflow-hidden px-4 pb-6 sm:px-20">
            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={item.img}
                src={item.img}
                alt={item.caption}
                data-testid="lightbox-image"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) go(1);
                  else if (info.offset.x > 60) go(-1);
                }}
                onClick={(e) => e.stopPropagation()}
                className="max-h-full max-w-full cursor-grab select-none rounded-xl object-contain shadow-[0_30px_100px_rgba(0,0,0,0.6)] active:cursor-grabbing"
              />
            </AnimatePresence>
            {count > 1 && (
              <>
                <div className="absolute left-3 top-1/2 -translate-y-1/2 sm:left-6">
                  <Btn testId="lightbox-prev" label="Previous" onClick={() => go(-1)}>
                    <ChevronLeft className="h-6 w-6" />
                  </Btn>
                </div>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 sm:right-6">
                  <Btn testId="lightbox-next" label="Next" onClick={() => go(1)}>
                    <ChevronRight className="h-6 w-6" />
                  </Btn>
                </div>
              </>
            )}
          </div>
          <p data-testid="lightbox-caption" className="px-5 pb-6 text-center font-mono text-[11px] uppercase tracking-[0.25em] text-paper/80 sm:px-8">
            {item.caption}
          </p>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

function Btn({ children, onClick, label, testId }: { children: ReactNode; onClick: () => void; label: string; testId: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      data-testid={testId}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-paper/20 bg-paper/10 text-paper transition-colors hover:border-ember hover:bg-ember"
    >
      {children}
    </button>
  );
}
