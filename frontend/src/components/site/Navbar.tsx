import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Zap, ArrowUpRight } from "lucide-react";

const LINKS = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Projects", to: "/projects" },
  { label: "EPC Capabilities", to: "/epc-capabilities" },
  { label: "Quality & HSE", to: "/quality-hse" },
  { label: "Our Experience", to: "/experience" },
  { label: "Careers", to: "/careers" },
  { label: "Contact", to: "/contact" },
];

function Logo({ light }: { light: boolean }) {
  return (
    <Link to="/" data-testid="nav-logo" className="flex items-center gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-ember">
        <Zap className="h-5 w-5 text-white" />
      </span>
      <span className="leading-none">
        <span
          className={`block font-heading text-base font-extrabold tracking-tight sm:text-lg ${
            light ? "text-paper" : "text-ink"
          }`}
        >
          PUSHPALATA
        </span>
        <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.3em] text-ember">
          Infratech Pvt. Ltd.
        </span>
      </span>
    </Link>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const light = !scrolled && !open;

  return (
    <>
      <header
        data-testid="site-header"
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-500 ${
          scrolled
            ? "border-b border-ink/10 bg-paper/90 shadow-[0_8px_40px_rgba(10,38,30,0.08)] backdrop-blur-xl"
            : "border-b border-transparent bg-gradient-to-b from-forest/70 to-transparent"
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between px-5 transition-[height] duration-500 sm:px-8 ${
            scrolled ? "h-16" : "h-24"
          }`}
        >
          <Logo light={light} />
          <nav className="hidden items-center gap-5 xl:flex" data-testid="desktop-nav">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                data-testid={`nav-link-${l.label.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                className={({ isActive }) =>
                  `font-mono text-[10.5px] uppercase tracking-[0.18em] transition-colors duration-300 ${
                    isActive ? "text-ember" : light ? "text-paper/80 hover:text-paper" : "text-ink/70 hover:text-ink"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              data-testid="nav-cta-button"
              className={`hidden items-center gap-2 rounded-full bg-ember px-5 py-2.5 font-heading text-xs font-bold uppercase tracking-wider text-white transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-ember-2 sm:inline-flex ${
                scrolled ? "" : ""
              }`}
            >
              Request a Project Discussion
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <button
              type="button"
              data-testid="mobile-menu-button"
              aria-label="Open menu"
              onClick={() => setOpen((v) => !v)}
              className={`flex h-11 w-11 items-center justify-center rounded-full border transition-colors xl:hidden ${
                light ? "border-paper/30 text-paper" : "border-ink/20 text-ink"
              }`}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="cad-grid fixed inset-0 z-40 flex flex-col justify-center bg-forest px-8 pt-24"
            data-testid="mobile-menu"
          >
            <nav className="flex flex-col gap-1">
              {LINKS.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.45 }}
                >
                  <NavLink
                    to={l.to}
                    data-testid={`mobile-nav-link-${l.label.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                    className={({ isActive }) =>
                      `block border-b border-paper/10 py-3.5 font-heading text-2xl font-extrabold uppercase tracking-tight transition-colors ${
                        isActive ? "text-ember" : "text-paper hover:text-ember"
                      }`
                    }
                  >
                    <span className="mr-4 font-mono text-xs text-ember">{String(i + 1).padStart(2, "0")}</span>
                    {l.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="mt-8"
            >
              <Link
                to="/contact"
                data-testid="mobile-nav-cta-button"
                className="inline-flex items-center gap-2 rounded-full bg-ember px-7 py-4 font-heading text-sm font-bold uppercase tracking-wider text-white"
              >
                Request a Project Discussion
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
