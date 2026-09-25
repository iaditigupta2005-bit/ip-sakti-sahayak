import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Bookmark, Bot, FileSearch, MessageSquare, Search, ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/app/AppShell";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [
    { title: "Dashboard — IP-SAKTI Sahayak" },
    { name: "description", content: "Your IP-SAKTI workspace: quick actions and recent activity." },
    { property: "og:title", content: "Dashboard — IP-SAKTI" },
    { property: "og:description", content: "Quick access to AI guidance, prior-art search and compliance." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Dashboard,
});

const actions = [
  { label: "Ask AI", to: "/assistant", icon: Bot, text: "Multilingual IP guidance" },
  { label: "Search Prior Art", to: "/prior-art", icon: FileSearch, text: "Patents and research" },
  { label: "Check Compliance", to: "/compliance", icon: ShieldCheck, text: "Regulatory roadmap" },
] as const;
const recent = [
  { label: "Recent questions", icon: MessageSquare, to: "/assistant" },
  { label: "Recent searches", icon: Search, to: "/prior-art" },
  { label: "Saved sources", icon: Bookmark, to: "/sources" },
] as const;

function Dashboard() {
  return <AppShell title="Welcome back" subtitle="Pick up where you left off.">
    <div className="grid gap-4 md:grid-cols-3">{actions.map(({ label, to, icon: Icon, text }) => <Link key={to} to={to} className="feature-card group !min-h-0 !p-5"><span className="feature-icon"><Icon /></span><h3 className="mt-5 font-medium">{label}</h3><p className="mt-1 text-sm text-muted-foreground">{text}</p><ArrowRight className="mt-4 size-4 text-primary transition-transform group-hover:translate-x-1" /></Link>)}</div>
    <h2 className="mt-10 text-lg font-medium">Recent activity</h2>
    <div className="mt-4 grid gap-4 md:grid-cols-3">{recent.map(({ label, icon: Icon, to }) => <div key={label} className="panel p-5"><div className="flex items-center gap-2"><Icon className="size-4 text-gold" /><p className="micro-label">{label.toUpperCase()}</p></div><p className="mt-4 text-sm text-muted-foreground">Nothing here yet.</p><Link to={to} className="mt-3 inline-flex items-center gap-1 text-sm text-primary hover:underline">Get started <ArrowRight className="size-3.5" /></Link></div>)}</div>
  </AppShell>;
}
