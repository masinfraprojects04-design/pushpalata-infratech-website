import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import { SERVICES, CONTACT, CORPORATE } from "@/lib/data";

const QUICK_LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Projects", to: "/projects" },
  { label: "EPC Capabilities", to: "/epc-capabilities" },
  { label: "Quality & HSE", to: "/quality-hse" },
  { label: "Careers", to: "/careers" },
  { label: "Contact", to: "/contact" },
];

export default function Footer() {
  return (
    <footer className="cad-grid bg-forest text-paper" data-testid="site-footer">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-paper/20">
                <img src="/logo.png" alt="Pushpalata Infratech logo" className="h-10 w-10 object-contain" />
              </span>
              <span className="font-brand text-sm font-extrabold uppercase leading-tight tracking-tight sm:text-base">
                Pushpalata Infratech Private Limited
              </span>
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-paper/60">
              Transmission-line construction, tower erection, stringing, civil works and full EPC execution —
              engineering the power that moves India since 2014.
            </p>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.3em] text-ember">Quick Links</h3>
            <ul className="mt-5 space-y-2.5">
              {QUICK_LINKS.map((l) => (
                <li key={l.to + l.label}>
                  <Link
                    to={l.to}
                    data-testid={`footer-link-${l.label.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                    className="text-sm text-paper/65 transition-colors hover:text-ember"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.3em] text-ember">Services</h3>
            <ul className="mt-5 space-y-2.5">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    to={`/services/${s.slug}`}
                    data-testid={`footer-service-${s.slug}`}
                    className="text-sm text-paper/65 transition-colors hover:text-ember"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.3em] text-ember">Contact</h3>
            <ul className="mt-5 space-y-3 text-sm text-paper/65">
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-ember" />
                <span>
                  <a href={CONTACT.phone1Href} data-testid="footer-phone-1" className="block hover:text-ember">
                    {CONTACT.phone1}
                  </a>
                  <a href={CONTACT.phone2Href} data-testid="footer-phone-2" className="block hover:text-ember">
                    {CONTACT.phone2}
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-ember" />
                <a href={`mailto:${CONTACT.email}`} data-testid="footer-email" className="hover:text-ember">
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-ember" />
                <span>{CONTACT.officeBihar}</span>
              </li>
            </ul>
            <div className="mt-6 border-t border-paper/10 pt-5">
              <h4 className="font-mono text-[10px] uppercase tracking-[0.3em] text-paper/40">
                Corporate Information
              </h4>
              <p className="mt-3 font-mono text-[11px] leading-relaxed text-paper/50">
                CIN: {CORPORATE.cin}
                <br />
                GSTIN: {CORPORATE.gstin}
                <br />
                Udyam: {CORPORATE.udyam}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-paper/10 pt-7 sm:flex-row">
          <p className="text-xs text-paper/45">
            © {new Date().getFullYear()} Pushpalata Infratech Private Limited. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" data-testid="footer-privacy" className="text-xs text-paper/45 transition-colors hover:text-ember">
              Privacy Policy
            </Link>
            <Link to="/terms-and-conditions" data-testid="footer-terms" className="text-xs text-paper/45 transition-colors hover:text-ember">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
