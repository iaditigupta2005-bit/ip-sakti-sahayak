import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { BookOpen, Bot, FileSearch, LayoutDashboard, Leaf, Menu, ShieldCheck, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const items = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  { label: "AI Assistant", to: "/assistant", icon: Bot },
  { label: "Prior-Art", to: "/prior-art", icon: FileSearch },
  { label: "Compliance", to: "/compliance", icon: ShieldCheck },
  { label: "Knowledge Base", to: "/sources", icon: BookOpen },
] as const;

function SideNav({ onNavigate }: { onNavigate?: () => void }) {
  return <nav className="flex flex-col gap-1" aria-label="Workspace navigation">
    {items.map(({ label, to, icon: Icon }) => <Link key={to} to={to} onClick={onNavigate} className="side-link"><Icon className="size-4" />{label}</Link>)}
  </nav>;
}

function Brand() {
  return <Link to="/" className="flex items-center gap-3" aria-label="IP-SAKTI home">
    <span className="brand-mark"><Leaf className="size-4" /></span>
    <span className="leading-none"><strong className="block text-[14px] tracking-[0.15em]">IP-SAKTI</strong><span className="mt-1 block text-[10px] tracking-[0.24em] text-muted-foreground">SAHAYAK</span></span>
  </Link>;
}

export function AppShell({ title, subtitle, children, actions }: { title: string; subtitle?: string; children: ReactNode; actions?: ReactNode }) {
  const [open, setOpen] = useState(false);
  return <div className="min-h-screen bg-background text-foreground lg:grid lg:grid-cols-[250px_1fr]">
    <aside className="sticky top-0 hidden h-screen flex-col border-r border-border bg-surface-deep p-5 lg:flex">
      <Brand />
      <div className="mt-10"><SideNav /></div>
      <p className="mt-auto text-[11px] leading-5 text-muted-foreground">Research assistance only. Not legal or regulatory advice.</p>
    </aside>
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-surface-deep/90 px-4 backdrop-blur lg:hidden">
      <Brand />
      <Button variant="ghost" size="icon" aria-label="Toggle menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
    </header>
    {open && <div className="border-b border-border bg-surface-deep p-4 lg:hidden"><SideNav onNavigate={() => setOpen(false)} /></div>}
    <main className="min-w-0 px-4 py-8 sm:px-8 lg:px-12 lg:py-10">
      <div className="mx-auto max-w-6xl fade-in">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div><p className="eyebrow">IP-SAKTI WORKSPACE</p><h1 className="mt-2 text-3xl font-medium sm:text-4xl">{title}</h1>{subtitle && <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>}</div>
          {actions}
        </div>
        <div className="mt-8">{children}</div>
      </div>
    </main>
  </div>;
}

export function Select({ label, options, value, onChange }: { label: string; options: readonly string[]; value?: string; onChange?: (v: string) => void }) {
  return <label className="block"><span className="micro-label">{label}</span>
    <select className="field mt-1.5" value={value} onChange={e => onChange?.(e.target.value)}>{options.map(o => <option key={o} className="bg-card">{o}</option>)}</select>
  </label>;
}

export const JURISDICTIONS = ["India", "United States", "European Union", "International (WIPO)"] as const;
