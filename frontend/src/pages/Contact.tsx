import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Phone, Mail, MapPin, Globe, MessageCircle } from "lucide-react";
import { apiPost } from "@/lib/api";
import { CONTACT, IMG } from "@/lib/data";
import { Reveal, PageHero, Chapter } from "@/components/site/Shared";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface EnquiryInput {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  project_type?: string;
  location?: string;
  requirement?: string;
  message: string;
}

interface Enquiry extends EnquiryInput {
  id: string;
  created_at: string;
}

const PROJECT_TYPES = [
  "Transmission Line EPC",
  "Tower Erection",
  "Re-Conductoring",
  "Stringing",
  "Foundation & Civil Works",
  "Substation Works",
  "Survey & Engineering",
  "Dismantling",
  "Other",
];

const EMPTY: EnquiryInput = {
  name: "",
  company: "",
  email: "",
  phone: "",
  project_type: "",
  location: "",
  requirement: "",
  message: "",
};

const fieldClass =
  "h-12 rounded-xl border-ink/15 bg-white px-4 text-sm focus-visible:ring-ember/40";

function OfficeCards() {
  const offices = [
    { title: "Registered Office", address: CONTACT.officeBihar },
    { title: "Karnataka Office", address: CONTACT.officeKarnataka },
  ];
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {offices.map((o, i) => (
        <Reveal key={o.title} delay={i * 0.08}>
          <div className="h-full rounded-2xl border border-ink/10 bg-white p-8" data-testid={`office-card-${i}`}>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ember">{o.title}</span>
            <h3 className="mt-3 font-heading text-lg font-extrabold tracking-tight text-ink">
              Pushpalata Infratech Private Limited
            </h3>
            <p className="mt-3 flex items-start gap-2.5 text-sm leading-relaxed text-ink/65">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-ember" />
              {o.address}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

function ReachStrip() {
  const items = [
    { icon: Phone, label: "Call Now", value: `${CONTACT.phone1} / ${CONTACT.phone2}`, href: CONTACT.phone1Href, testId: "contact-call-link" },
    { icon: MessageCircle, label: "WhatsApp", value: CONTACT.phone1, href: CONTACT.whatsapp, testId: "contact-whatsapp-link" },
    { icon: Mail, label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}`, testId: "contact-email-link" },
    { icon: Globe, label: "Website", value: CONTACT.website, href: "/", testId: "contact-website-link" },
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((it, i) => (
        <Reveal key={it.label} delay={i * 0.06}>
          <a
            href={it.href}
            data-testid={it.testId}
            className="group flex items-center gap-4 rounded-2xl border border-ink/10 bg-white p-5 transition-colors hover:border-ember/60"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-forest transition-colors group-hover:bg-ember">
              <it.icon className="h-5 w-5 text-paper" />
            </span>
            <span>
              <span className="block font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground">
                {it.label}
              </span>
              <span className="mt-1 block text-xs font-bold text-ink">{it.value}</span>
            </span>
          </a>
        </Reveal>
      ))}
    </div>
  );
}

function EnquiryForm() {
  const [form, setForm] = useState<EnquiryInput>(EMPTY);

  const mutation = useMutation({
    mutationFn: (body: EnquiryInput) => apiPost<Enquiry>("/enquiries", body),
    onSuccess: () => {
      toast.success("Enquiry received. Our team will get back to you shortly.");
      setForm(EMPTY);
    },
    onError: () => {
      toast.error(`Could not submit right now — please email ${CONTACT.email} or call ${CONTACT.phone1}.`);
    },
  });

  const set = (key: keyof EnquiryInput) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  return (
    <form onSubmit={submit} className="rounded-2xl bg-forest p-8 sm:p-12" data-testid="project-enquiry-form">
      <h2 className="font-heading text-2xl font-extrabold uppercase tracking-tight text-paper sm:text-3xl">
        Project Enquiry Form
      </h2>
      <p className="mt-3 text-sm text-paper/60">
        Share your requirement — scope, voltage level, location and timeline.
      </p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="enq-name" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-paper/60">Name *</Label>
          <Input id="enq-name" data-testid="enquiry-name-input" required value={form.name} onChange={set("name")} className={fieldClass} placeholder="Your full name" />
        </div>
        <div>
          <Label htmlFor="enq-company" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-paper/60">Company</Label>
          <Input id="enq-company" data-testid="enquiry-company-input" value={form.company} onChange={set("company")} className={fieldClass} placeholder="Organization name" />
        </div>
        <div>
          <Label htmlFor="enq-email" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-paper/60">Email *</Label>
          <Input id="enq-email" data-testid="enquiry-email-input" type="email" required value={form.email} onChange={set("email")} className={fieldClass} placeholder="you@company.com" />
        </div>
        <div>
          <Label htmlFor="enq-phone" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-paper/60">Phone</Label>
          <Input id="enq-phone" data-testid="enquiry-phone-input" value={form.phone} onChange={set("phone")} className={fieldClass} placeholder="+91 ..." />
        </div>
        <div>
          <Label htmlFor="enq-type" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-paper/60">Project Type</Label>
          <select
            id="enq-type"
            data-testid="enquiry-project-type-select"
            value={form.project_type}
            onChange={set("project_type")}
            className="h-12 w-full rounded-xl border border-ink/15 bg-white px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ember/40"
          >
            <option value="">Select project type</option>
            {PROJECT_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="enq-location" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-paper/60">Location</Label>
          <Input id="enq-location" data-testid="enquiry-location-input" value={form.location} onChange={set("location")} className={fieldClass} placeholder="Project state / corridor" />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="enq-req" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-paper/60">Approximate Requirement</Label>
          <Input id="enq-req" data-testid="enquiry-requirement-input" value={form.requirement} onChange={set("requirement")} className={fieldClass} placeholder="e.g. 40 km, 400 kV D/C, tower erection package" />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="enq-message" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-paper/60">Message *</Label>
          <Textarea id="enq-message" data-testid="enquiry-message-input" required value={form.message} onChange={set("message")} rows={5} className="rounded-xl border-ink/15 bg-white px-4 py-3 text-sm focus-visible:ring-ember/40" placeholder="Tell us about your project" />
        </div>
      </div>
      <button
        type="submit"
        data-testid="enquiry-submit-button"
        disabled={mutation.isPending}
        className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-ember px-9 py-4 font-heading text-sm font-bold uppercase tracking-wider text-white transition-[background-color,transform,opacity] duration-300 hover:-translate-y-0.5 hover:bg-ember-2 disabled:opacity-60"
      >
        {mutation.isPending ? "Submitting…" : "Submit Enquiry"}
      </button>
    </form>
  );
}

export default function Contact() {
  return (
    <main data-testid="contact-page">
      <PageHero
        eyebrow="Contact"
        title="Start a Project Discussion"
        description="Two offices, one execution standard. Reach the team directly or send a structured project enquiry."
        img={IMG.nightYard}
      />
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <Chapter no="01" label="Our Offices" />
        <div className="mt-10">
          <OfficeCards />
        </div>
        <div className="mt-6">
          <ReachStrip />
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <Reveal>
              <EnquiryForm />
            </Reveal>
          </div>
          <div className="lg:col-span-2">
            <Reveal delay={0.1}>
              <div className="h-full overflow-hidden rounded-2xl border border-ink/10 bg-white">
                <iframe
                  title="Registered Office — Khagaria, Bihar"
                  data-testid="contact-map"
                  src="https://www.google.com/maps?q=Pasraha,+Khagaria,+Bihar+851212,+India&output=embed"
                  className="h-[420px] w-full lg:h-full lg:min-h-[560px]"
                  loading="lazy"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
