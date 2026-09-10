import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MessageCircle, X, Phone } from "lucide-react";
import { CONTACT } from "@/lib/data";

const MSG = encodeURIComponent("Hello Pushpalata Infratech, I would like to discuss a transmission project.");
const NUMBERS = [
  { label: CONTACT.phone1, href: `https://wa.me/919771666166?text=${MSG}`, id: "1" },
  { label: CONTACT.phone2, href: `https://wa.me/919771787713?text=${MSG}`, id: "2" },
];

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed bottom-6 right-5 z-[60] flex flex-col items-end gap-3 sm:bottom-8 sm:right-8">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            data-testid="whatsapp-popover"
            className="w-72 overflow-hidden rounded-2xl border border-ink/10 bg-paper shadow-[0_20px_60px_rgba(10,38,30,0.25)]"
          >
            <div className="bg-forest px-5 py-4">
              <p className="font-heading text-sm font-extrabold uppercase tracking-tight text-paper">Chat on WhatsApp</p>
              <p className="mt-1 text-xs text-paper/60">Typically replies within business hours</p>
            </div>
            <ul className="divide-y divide-ink/10">
              {NUMBERS.map((n) => (
                <li key={n.id}>
                  <a
                    href={n.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={`whatsapp-number-${n.id}`}
                    className="flex items-center gap-3 px-5 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-white hover:text-ember"
                  >
                    <Phone className="h-4 w-4 text-[#25D366]" />
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        type="button"
        aria-label={open ? "Close WhatsApp options" : "Chat on WhatsApp"}
        data-testid="whatsapp-float-button"
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_rgba(37,211,102,0.45)]"
      >
        {!open && <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40" />}
        {open ? <X className="relative h-6 w-6" /> : <MessageCircle className="relative h-7 w-7" />}
      </motion.button>
    </div>
  );
}
