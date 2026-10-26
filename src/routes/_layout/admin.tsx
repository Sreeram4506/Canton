import { useCallback, useEffect, useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Inbox, Loader2, LogOut, Megaphone, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Submission, SubmissionStatus } from "@/server/submissions";

export const Route = createFileRoute("/_layout/admin")({
  head: () => ({
    meta: [{ title: "Admin — Canton Auto" }, { name: "robots", content: "noindex, nofollow" }],
  }),
  component: AdminPage,
});

const STATUS_LABEL: Record<SubmissionStatus, string> = {
  new: "New",
  contacted: "Contacted",
  done: "Done",
};

async function api<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: { "content-type": "application/json", ...init?.headers },
  });
  const data = (await res.json().catch(() => ({}))) as T & { error?: string };
  if (!res.ok) throw new Error(data.error ?? "Request failed");
  return data;
}

function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    api<{ admin: boolean }>("/api/session")
      .then((d) => setAuthed(d.admin))
      .catch(() => setAuthed(false));
  }, []);

  if (authed === null) {
    return (
      <div className="grid min-h-[60vh] place-items-center pt-28">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return authed ? (
    <Dashboard onLogout={() => setAuthed(false)} />
  ) : (
    <Login onSuccess={() => setAuthed(true)} />
  );
}

function Login({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      await api("/api/session", { method: "POST", body: JSON.stringify({ password }) });
      onSuccess();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Login failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto grid min-h-[70vh] max-w-sm place-items-center px-4 pt-28">
      <form onSubmit={submit} className="w-full space-y-4 rounded-2xl border border-border p-6">
        <h1 className="font-display text-2xl font-extrabold">Admin login</h1>
        <div className="space-y-2">
          <Label htmlFor="admin-password">Password</Label>
          <Input
            id="admin-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="w-full" disabled={busy}>
          {busy ? "Signing in…" : "Sign in"}
        </Button>
      </form>
    </div>
  );
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const logout = async () => {
    await api("/api/session", { method: "DELETE" }).catch(() => {});
    onLogout();
  };

  return (
    <div className="mx-auto max-w-5xl px-4 pb-20 pt-28 sm:px-6 sm:pt-32">
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-display text-3xl font-extrabold">Admin</h1>
        <Button variant="outline" size="sm" onClick={logout}>
          <LogOut className="h-4 w-4" />
          Sign out
        </Button>
      </div>

      <Tabs defaultValue="submissions" className="mt-6">
        <TabsList>
          <TabsTrigger value="submissions">
            <Inbox className="mr-2 h-4 w-4" />
            Form submissions
          </TabsTrigger>
          <TabsTrigger value="banner">
            <Megaphone className="mr-2 h-4 w-4" />
            Banner
          </TabsTrigger>
        </TabsList>
        <TabsContent value="submissions" className="mt-6">
          <Submissions onExpired={onLogout} />
        </TabsContent>
        <TabsContent value="banner" className="mt-6">
          <BannerEditor onExpired={onLogout} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Submissions({ onExpired }: { onExpired: () => void }) {
  const [items, setItems] = useState<Submission[] | null>(null);

  const load = useCallback(async () => {
    try {
      setItems(await api<Submission[]>("/api/submissions"));
    } catch (err) {
      if (err instanceof Error && err.message === "Unauthorized") return onExpired();
      toast.error("Could not load submissions");
      setItems([]);
    }
  }, [onExpired]);

  useEffect(() => {
    void load();
  }, [load]);

  const setStatus = async (id: string, status: SubmissionStatus) => {
    setItems((prev) => prev?.map((s) => (s.id === id ? { ...s, status } : s)) ?? prev);
    try {
      await api(`/api/submissions/${id}`, { method: "PATCH", body: JSON.stringify({ status }) });
    } catch {
      toast.error("Could not update status");
      void load();
    }
  };

  const remove = async (id: string) => {
    if (!window.confirm("Delete this submission permanently?")) return;
    try {
      await api(`/api/submissions/${id}`, { method: "DELETE" });
      setItems((prev) => prev?.filter((s) => s.id !== id) ?? prev);
    } catch {
      toast.error("Could not delete");
    }
  };

  if (!items) return <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />;
  if (items.length === 0) {
    return <p className="text-muted-foreground">No form submissions yet.</p>;
  }

  return (
    <ul className="space-y-4">
      {items.map((s) => (
        <li key={s.id} className="rounded-2xl border border-border p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="font-display text-lg font-bold">{s.name}</p>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                {s.type === "appointment" ? "Appointment request" : "Callback request"} ·{" "}
                {new Date(s.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={s.status}
                onChange={(e) => void setStatus(s.id, e.target.value as SubmissionStatus)}
                aria-label="Status"
                className="rounded-md border border-input bg-background px-2 py-1.5 text-sm"
              >
                {(Object.keys(STATUS_LABEL) as SubmissionStatus[]).map((k) => (
                  <option key={k} value={k}>
                    {STATUS_LABEL[k]}
                  </option>
                ))}
              </select>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Delete submission"
                onClick={() => void remove(s.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <dl className="mt-4 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
            <Row label="Phone" value={s.phone} href={`tel:${s.phone}`} />
            <Row label="Email" value={s.email} href={`mailto:${s.email}`} />
            <Row label="Vehicle" value={s.vehicle} />
            <Row label="Service" value={s.service} />
            <Row label="Preferred date" value={s.preferredDate} />
            <Row label="Preferred time" value={s.preferredTime} />
          </dl>
          {s.message && (
            <p className="mt-4 whitespace-pre-wrap rounded-lg bg-muted/50 p-3 text-sm">
              {s.message}
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}

function Row({ label, value, href }: { label: string; value: string; href?: string }) {
  if (!value) return null;
  return (
    <div className="flex gap-2">
      <dt className="w-28 shrink-0 text-muted-foreground">{label}</dt>
      <dd className="min-w-0 break-words font-medium">
        {href ? (
          <a href={href} className="text-primary hover:underline">
            {value}
          </a>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}

function BannerEditor({ onExpired }: { onExpired: () => void }) {
  const [active, setActive] = useState(false);
  const [text, setText] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api<{ active: boolean; text: string }>("/api/banner")
      .then((b) => {
        setActive(b.active);
        setText(b.text);
      })
      .catch(() => toast.error("Could not load banner"))
      .finally(() => setLoaded(true));
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      await api("/api/banner", { method: "PUT", body: JSON.stringify({ active, text }) });
      toast.success(active ? "Banner is live on the site" : "Banner is hidden");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not save banner";
      if (message === "Unauthorized") return onExpired();
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  if (!loaded) return <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />;

  return (
    <div className="max-w-xl space-y-5 rounded-2xl border border-border p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-semibold">Show banner on the website</p>
          <p className="text-sm text-muted-foreground">
            Appears in a bar at the top of every page.
          </p>
        </div>
        <Switch checked={active} onCheckedChange={setActive} aria-label="Show banner" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="banner-text">Banner message</Label>
        <Input
          id="banner-text"
          value={text}
          maxLength={200}
          onChange={(e) => setText(e.target.value)}
          placeholder="Free battery test with any brake service this month"
        />
        <p className="text-xs text-muted-foreground">{text.length}/200</p>
      </div>
      {active && text && (
        <div className="brand-gradient rounded-md px-4 py-2 text-center text-xs font-bold text-primary-foreground">
          {text}
        </div>
      )}
      <Button onClick={() => void save()} disabled={saving}>
        {saving ? "Saving…" : "Save banner"}
      </Button>
    </div>
  );
}
