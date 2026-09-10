import { useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Upload, FileText, X, ArrowUpRight } from "lucide-react";
import { ApiError } from "@/lib/api";
import { CONTACT } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const fieldClass = "h-12 rounded-xl border-ink/15 bg-white px-4 text-sm focus-visible:ring-ember/40";
const labelClass = "mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-paper/60";
const ACCEPT = ".pdf,.doc,.docx";
const MAX_BYTES = 5 * 1024 * 1024;

interface FormState {
  name: string;
  email: string;
  phone: string;
  discipline: string;
  experience: string;
  location: string;
  message: string;
}

const EMPTY: FormState = { name: "", email: "", phone: "", discipline: "", experience: "", location: "", message: "" };

async function submitApplication(form: FormState, resume: File) {
  const fd = new FormData();
  Object.entries(form).forEach(([k, v]) => fd.append(k, v));
  fd.append("resume", resume);
  const res = await fetch("/api/applications", { method: "POST", body: fd });
  if (!res.ok) throw new ApiError(res.status, await res.json().catch(() => null));
  return res.json();
}

export function ApplicationForm({ disciplines }: { disciplines: string[] }) {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [resume, setResume] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const mutation = useMutation({
    mutationFn: () => submitApplication(form, resume!),
    onSuccess: () => {
      toast.success("Application received. Our team will contact shortlisted candidates.");
      setForm(EMPTY);
      setResume(null);
    },
    onError: (err) => {
      const detail = err instanceof ApiError && typeof (err.body as { detail?: unknown })?.detail === "string"
        ? (err.body as { detail: string }).detail
        : `Could not submit right now — please email your resume to ${CONTACT.email}.`;
      toast.error(detail);
    },
  });

  const set = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const pickFile = (file: File | undefined) => {
    if (!file) return;
    if (file.size > MAX_BYTES) return toast.error("Resume must be smaller than 5 MB.");
    if (!/\.(pdf|docx?)$/i.test(file.name)) return toast.error("Resume must be a PDF, DOC or DOCX file.");
    setResume(file);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resume) return toast.error("Please attach your resume.");
    mutation.mutate();
  };

  return (
    <form onSubmit={submit} className="rounded-2xl bg-forest p-8 sm:p-12" data-testid="career-application-form">
      <h3 className="font-heading text-2xl font-extrabold uppercase tracking-tight text-paper sm:text-3xl">Apply Online</h3>
      <p className="mt-3 text-sm text-paper/60">Attach your resume — shortlisted candidates are contacted as project requirements open up.</p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="app-name" className={labelClass}>Full Name *</Label>
          <Input id="app-name" data-testid="application-name-input" required value={form.name} onChange={set("name")} className={fieldClass} placeholder="Your full name" />
        </div>
        <div>
          <Label htmlFor="app-email" className={labelClass}>Email *</Label>
          <Input id="app-email" data-testid="application-email-input" type="email" required value={form.email} onChange={set("email")} className={fieldClass} placeholder="you@example.com" />
        </div>
        <div>
          <Label htmlFor="app-phone" className={labelClass}>Phone *</Label>
          <Input id="app-phone" data-testid="application-phone-input" required value={form.phone} onChange={set("phone")} className={fieldClass} placeholder="+91 ..." />
        </div>
        <div>
          <Label htmlFor="app-discipline" className={labelClass}>Discipline *</Label>
          <select
            id="app-discipline"
            data-testid="application-discipline-select"
            required
            value={form.discipline}
            onChange={set("discipline")}
            className="h-12 w-full rounded-xl border border-ink/15 bg-white px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ember/40"
          >
            <option value="">Select discipline</option>
            {disciplines.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="app-exp" className={labelClass}>Experience</Label>
          <Input id="app-exp" data-testid="application-experience-input" value={form.experience} onChange={set("experience")} className={fieldClass} placeholder="e.g. 6 years, 400 kV stringing" />
        </div>
        <div>
          <Label htmlFor="app-location" className={labelClass}>Current Location</Label>
          <Input id="app-location" data-testid="application-location-input" value={form.location} onChange={set("location")} className={fieldClass} placeholder="City, State" />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="app-message" className={labelClass}>Message</Label>
          <Textarea id="app-message" data-testid="application-message-input" value={form.message} onChange={set("message")} rows={3} className="rounded-xl border-ink/15 bg-white px-4 py-3 text-sm focus-visible:ring-ember/40" placeholder="Anything else we should know" />
        </div>
        <div className="sm:col-span-2">
          <Label className={labelClass}>Resume (PDF / DOC / DOCX, max 5 MB) *</Label>
          <input ref={fileRef} type="file" accept={ACCEPT} className="hidden" data-testid="application-resume-input" onChange={(e) => pickFile(e.target.files?.[0])} />
          {resume ? (
            <div data-testid="application-resume-selected" className="flex items-center justify-between gap-4 rounded-xl border border-ember/40 bg-white px-4 py-3">
              <span className="flex min-w-0 items-center gap-3 text-sm text-ink">
                <FileText className="h-5 w-5 shrink-0 text-ember" />
                <span className="truncate">{resume.name}</span>
                <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-ink/50">{Math.ceil(resume.size / 1024)} KB</span>
              </span>
              <button type="button" aria-label="Remove resume" data-testid="application-resume-remove" onClick={() => setResume(null)} className="text-ink/50 transition-colors hover:text-ember">
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              data-testid="application-resume-dropzone"
              onClick={() => fileRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => { e.preventDefault(); pickFile(e.dataTransfer.files?.[0]); }}
              className="flex w-full flex-col items-center gap-2 rounded-xl border border-dashed border-paper/30 bg-forest-2 px-4 py-8 text-center transition-colors hover:border-ember"
            >
              <Upload className="h-6 w-6 text-ember" />
              <span className="text-sm font-medium text-paper">Click to upload or drag & drop</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper/45">PDF, DOC, DOCX · up to 5 MB</span>
            </button>
          )}
        </div>
      </div>
      <button
        type="submit"
        data-testid="application-submit-button"
        disabled={mutation.isPending}
        className="group mt-8 inline-flex items-center gap-2.5 rounded-full bg-ember px-9 py-4 font-heading text-sm font-bold uppercase tracking-wider text-white transition-[background-color,transform,opacity] duration-300 hover:-translate-y-0.5 hover:bg-ember-2 disabled:opacity-60"
      >
        {mutation.isPending ? "Uploading…" : "Submit Application"}
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </button>
    </form>
  );
}
