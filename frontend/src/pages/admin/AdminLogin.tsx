import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Lock, ArrowRight } from "lucide-react";
import { apiGet, apiPost, ApiError } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface AdminUser {
  id: string;
  email: string;
}

export const useAdmin = () =>
  useQuery({ queryKey: ["admin-me"], queryFn: () => apiGet<AdminUser>("/admin/auth/me"), retry: false, staleTime: 60_000 });

const field = "h-12 rounded-xl border-paper/15 bg-paper/5 px-4 text-sm text-paper placeholder:text-paper/30 focus-visible:ring-ember/50";

export default function AdminLogin() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const admin = useAdmin();

  const login = useMutation({
    mutationFn: () => apiPost<AdminUser>("/admin/auth/login", { email, password }),
    onSuccess: () => {
      toast.success("Welcome back");
      nav("/admin", { replace: true });
    },
    onError: (e) => {
      const d = e instanceof ApiError ? (e.body as { detail?: string })?.detail : undefined;
      toast.error(d ?? "Login failed");
    },
  });

  if (admin.data) return <Navigate to="/admin" replace />;

  return (
    <main data-testid="admin-login-page" className="cad-grid flex min-h-screen items-center justify-center bg-forest px-5 pt-24 pb-16">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login.mutate();
        }}
        className="w-full max-w-md rounded-2xl border border-paper/10 bg-forest-2 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:p-10"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-ember">
          <Lock className="h-6 w-6 text-white" />
        </span>
        <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-ember">Team Access</p>
        <h1 className="mt-2 font-heading text-3xl font-extrabold uppercase tracking-tight text-paper">Admin Inbox</h1>
        <p className="mt-2 text-sm text-paper/55">Enquiries and career applications in one place.</p>
        <div className="mt-8 space-y-5">
          <div>
            <Label htmlFor="admin-email" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-paper/60">Email</Label>
            <Input id="admin-email" data-testid="admin-email-input" type="email" required autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} className={field} />
          </div>
          <div>
            <Label htmlFor="admin-password" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-paper/60">Password</Label>
            <Input id="admin-password" data-testid="admin-password-input" type="password" required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className={field} />
          </div>
        </div>
        <button
          type="submit"
          data-testid="admin-login-button"
          disabled={login.isPending}
          className="group mt-8 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-ember px-8 py-4 font-heading text-sm font-bold uppercase tracking-wider text-white transition-[background-color,transform,opacity] duration-300 hover:-translate-y-0.5 hover:bg-ember-2 disabled:opacity-60"
        >
          {login.isPending ? "Signing in…" : "Sign In"}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </form>
    </main>
  );
}
