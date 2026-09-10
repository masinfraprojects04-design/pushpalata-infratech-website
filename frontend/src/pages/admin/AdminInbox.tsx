import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Inbox, Briefcase, LogOut, Download, Mail, Phone, RefreshCw } from "lucide-react";
import { apiGet, apiPost } from "@/lib/api";
import { useAdmin } from "@/pages/admin/AdminLogin";

interface Enquiry {
  id: string;
  name: string;
  company?: string | null;
  email: string;
  phone?: string | null;
  project_type?: string | null;
  location?: string | null;
  requirement?: string | null;
  message: string;
  created_at: string;
}

interface Application {
  id: string;
  name: string;
  email: string;
  phone: string;
  discipline: string;
  experience?: string | null;
  location?: string | null;
  message?: string | null;
  resume_filename: string;
  resume_size: number;
  created_at: string;
}

type Tab = "enquiries" | "applications";

const fmt = (iso: string) =>
  new Date(iso).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

export default function AdminInbox() {
  const admin = useAdmin();
  const nav = useNavigate();
  const qc = useQueryClient();
  const [tab, setTab] = useState<Tab>("enquiries");

  const enquiries = useQuery({ queryKey: ["enquiries"], queryFn: () => apiGet<Enquiry[]>("/enquiries"), enabled: !!admin.data });
  const applications = useQuery({ queryKey: ["applications"], queryFn: () => apiGet<Application[]>("/applications"), enabled: !!admin.data });

  if (admin.isLoading) return <main className="min-h-screen bg-forest" />;
  if (admin.isError) return <Navigate to="/admin/login" replace />;

  const logout = async () => {
    await apiPost("/admin/auth/logout");
    qc.clear();
    nav("/admin/login", { replace: true });
  };

  const refresh = () => {
    void enquiries.refetch();
    void applications.refetch();
  };

  return (
    <main data-testid="admin-inbox-page" className="min-h-screen bg-paper pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ember">Team Inbox</p>
            <h1 className="mt-2 font-heading text-3xl font-extrabold uppercase tracking-tight text-ink sm:text-4xl">Enquiries & Applications</h1>
            <p className="mt-2 text-sm text-ink/55" data-testid="admin-user-email">Signed in as {admin.data?.email}</p>
          </div>
          <div className="flex items-center gap-3">
            <button type="button" onClick={refresh} data-testid="admin-refresh-button" className="inline-flex h-11 items-center gap-2 rounded-full border border-ink/15 px-5 font-mono text-[11px] uppercase tracking-[0.2em] text-ink transition-colors hover:border-ember hover:text-ember">
              <RefreshCw className={`h-3.5 w-3.5 ${enquiries.isFetching || applications.isFetching ? "animate-spin" : ""}`} /> Refresh
            </button>
            <button type="button" onClick={logout} data-testid="admin-logout-button" className="inline-flex h-11 items-center gap-2 rounded-full bg-forest px-5 font-mono text-[11px] uppercase tracking-[0.2em] text-paper transition-colors hover:bg-ember">
              <LogOut className="h-3.5 w-3.5" /> Logout
            </button>
          </div>
        </div>

        <div className="mt-10 flex gap-2 border-b border-ink/10" role="tablist">
          <TabBtn active={tab === "enquiries"} onClick={() => setTab("enquiries")} icon={<Inbox className="h-4 w-4" />} label="Enquiries" count={enquiries.data?.length} testId="admin-tab-enquiries" />
          <TabBtn active={tab === "applications"} onClick={() => setTab("applications")} icon={<Briefcase className="h-4 w-4" />} label="Applications" count={applications.data?.length} testId="admin-tab-applications" />
        </div>

        <div className="mt-8">
          {tab === "enquiries" ? (
            <List items={enquiries.data} loading={enquiries.isLoading} empty="No enquiries yet." testId="admin-enquiries-list">
              {(e) => (
                <Card key={e.id} testId={`enquiry-${e.id}`} title={e.name} sub={[e.company, e.project_type, e.location].filter(Boolean).join(" · ")} when={e.created_at} email={e.email} phone={e.phone}>
                  {e.requirement && <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ember">{e.requirement}</p>}
                  <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-ink/75">{e.message}</p>
                </Card>
              )}
            </List>
          ) : (
            <List items={applications.data} loading={applications.isLoading} empty="No applications yet." testId="admin-applications-list">
              {(a) => (
                <Card key={a.id} testId={`application-${a.id}`} title={a.name} sub={[a.discipline, a.experience, a.location].filter(Boolean).join(" · ")} when={a.created_at} email={a.email} phone={a.phone}>
                  {a.message && <p className="whitespace-pre-line text-sm leading-relaxed text-ink/75">{a.message}</p>}
                  <a
                    href={`/api/admin/applications/${a.id}/resume`}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={`resume-download-${a.id}`}
                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-ember px-5 py-2.5 font-heading text-xs font-bold uppercase tracking-wider text-white transition-[background-color,transform] hover:-translate-y-0.5 hover:bg-ember-2"
                  >
                    <Download className="h-3.5 w-3.5" /> {a.resume_filename} · {Math.ceil(a.resume_size / 1024)} KB
                  </a>
                </Card>
              )}
            </List>
          )}
        </div>
      </div>
    </main>
  );
}

function TabBtn({ active, onClick, icon, label, count, testId }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string; count?: number; testId: string }) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      data-testid={testId}
      onClick={onClick}
      className={`-mb-px inline-flex items-center gap-2 border-b-2 px-4 py-3 font-heading text-sm font-bold uppercase tracking-wider transition-colors ${
        active ? "border-ember text-ink" : "border-transparent text-ink/45 hover:text-ink"
      }`}
    >
      {icon} {label}
      {count !== undefined && <span className={`rounded-full px-2 py-0.5 font-mono text-[10px] ${active ? "bg-ember text-white" : "bg-ink/10 text-ink/60"}`}>{count}</span>}
    </button>
  );
}

function List<T>({ items, loading, empty, testId, children }: { items?: T[]; loading: boolean; empty: string; testId: string; children: (item: T) => React.ReactNode }) {
  if (loading) return <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/40">Loading…</p>;
  if (!items?.length) return <p data-testid={`${testId}-empty`} className="rounded-2xl border border-dashed border-ink/15 p-10 text-center text-sm text-ink/50">{empty}</p>;
  return <div data-testid={testId} className="grid gap-4">{items.map(children)}</div>;
}

function Card({ title, sub, when, email, phone, testId, children }: { title: string; sub?: string; when: string; email: string; phone?: string | null; testId: string; children: React.ReactNode }) {
  return (
    <article data-testid={testId} className="rounded-2xl border border-ink/10 bg-white p-6 transition-[border-color] hover:border-ember/40 sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-heading text-lg font-extrabold uppercase tracking-tight text-ink">{title}</h2>
          {sub && <p className="mt-1 text-sm text-ink/55">{sub}</p>}
        </div>
        <time className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/45">{fmt(when)}</time>
      </div>
      <div className="mt-4 flex flex-wrap gap-4 text-sm">
        <a href={`mailto:${email}`} className="inline-flex items-center gap-1.5 text-ink/70 hover:text-ember"><Mail className="h-3.5 w-3.5" /> {email}</a>
        {phone && <a href={`tel:${phone}`} className="inline-flex items-center gap-1.5 text-ink/70 hover:text-ember"><Phone className="h-3.5 w-3.5" /> {phone}</a>}
      </div>
      <div className="mt-4 border-t border-ink/10 pt-4">{children}</div>
    </article>
  );
}
