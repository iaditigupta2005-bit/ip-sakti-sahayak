import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Bot, FileCheck2, FileSearch, Languages, Leaf, Menu, ShieldCheck, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import networkImage from "@/assets/ip-sakti-network.jpg";

const navItems = [
  ["Home", "/"], ["AI Assistant", "/assistant"], ["Prior-Art", "/prior-art"],
  ["Compliance", "/compliance"], ["Knowledge Base", "/sources"],
] as const;

function Brand() {
  return <Link to="/" className="flex items-center gap-3" aria-label="IP-SAKTI home">
    <span className="brand-mark"><Leaf className="size-5" /></span>
    <span className="leading-none"><strong className="block text-[15px] tracking-[0.15em]">IP-SAKTI</strong><span className="mt-1 block text-[10px] tracking-[0.24em] text-muted-foreground">Sahayak</span></span>
  </Link>;
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const u = () => setScrolled(window.scrollY > 24); u(); window.addEventListener("scroll", u, { passive: true }); return () => window.removeEventListener("scroll", u); }, []);
  return <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "nav-scrolled" : ""}`}>
    <nav className="page-shell flex h-20 items-center justify-between" aria-label="Primary navigation">
      <Brand />
      <div className="hidden items-center gap-7 lg:flex">{navItems.map(([label, to]) => <Link key={label} to={to} className="nav-link">{label}</Link>)}</div>
      <div className="hidden items-center gap-5 lg:flex">
        <Link to="/login" className="nav-link">Login</Link>
        <Button asChild variant="hero" size="lg"><Link to="/assistant">Launch Assistant <ArrowRight /></Link></Button>
      </div>
      <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
    </nav>
    {open && <div className="mobile-menu lg:hidden"><div className="page-shell flex flex-col gap-1 py-4">{navItems.map(([label, to]) => <Link key={label} to={to} onClick={() => setOpen(false)} className="rounded-md px-4 py-3 text-sm text-muted-foreground hover:bg-accent hover:text-foreground">{label}</Link>)}<Link to="/login" onClick={() => setOpen(false)} className="rounded-md px-4 py-3 text-sm text-muted-foreground hover:bg-accent hover:text-foreground">Login</Link><Button asChild variant="hero" className="mt-3"><Link to="/assistant">Launch Assistant <ArrowRight /></Link></Button></div></div>}
  </header>;
}

function AssistantPreview() {
  return <div className="intelligence-card mx-auto w-full max-w-md lg:mr-0">
    <div className="flex items-center justify-between border-b border-border/70 px-5 py-4"><div className="flex items-center gap-2.5"><span className="status-pulse" /><span className="text-sm font-medium">IP-SAKTI Assistant</span></div><Bot className="size-4 text-primary" /></div>
    <div className="space-y-4 p-5">
      <div className="ml-auto w-fit max-w-[85%] rounded-lg bg-secondary px-4 py-3 text-sm">Can I protect my Ayurvedic formulation?</div>
      <div className="answer-block"><div className="mb-1.5 flex items-center gap-2"><Sparkles className="size-3.5 text-gold" /><span className="micro-label text-gold">AI</span></div>Potential IP pathways identified.</div>
      <div className="flex flex-wrap gap-2">{["Patent", "Trademark", "Prior Art"].map(t => <span key={t} className="source-chip">{t}</span>)}</div>
      <Link to="/assistant" className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline">View Assistant <ArrowRight className="size-3.5" /></Link>
    </div>
  </div>;
}

const caps = [
  { tag: "Ask", text: "Multilingual AI", icon: Languages, to: "/assistant" },
  { tag: "Verify", text: "Source citations", icon: FileCheck2, to: "/sources" },
  { tag: "Protect", text: "Prior-art discovery", icon: FileSearch, to: "/prior-art" },
  { tag: "Comply", text: "Regulatory guidance", icon: ShieldCheck, to: "/compliance" },
] as const;

export function LandingPage() {
  return <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
    <Navbar />
    <main>
      <section className="hero-section relative overflow-hidden pt-20">
        <img src={networkImage} width={1920} height={1080} alt="Abstract knowledge network" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="hero-overlay absolute inset-0" />
        <div className="page-shell relative grid min-h-[680px] items-center gap-14 py-20 lg:grid-cols-[1.1fr_.9fr]">
          <div className="animate-rise">
            <div className="hero-badge"><Sparkles className="size-3.5" /> AI FOR AYURVEDA IP &amp; REGULATORY INTELLIGENCE</div>
            <h1 className="mt-7 text-5xl font-medium leading-[1.05] sm:text-6xl">Protect <span className="gradient-text">Ayurveda.</span><br />Power <span className="gradient-text">Innovation.</span></h1>
            <p className="mt-6 max-w-lg text-base text-muted-foreground sm:text-lg">Source-cited AI guidance for intellectual property and regulatory pathways.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row"><Button asChild variant="hero" size="xl"><Link to="/assistant">Launch Assistant <ArrowRight /></Link></Button><Button asChild variant="glass" size="xl"><Link to="/dashboard">Explore Platform</Link></Button></div>
          </div>
          <AssistantPreview />
        </div>
      </section>
      <section className="border-y border-border bg-surface-deep"><div className="page-shell grid grid-cols-2 gap-px py-10 lg:grid-cols-4">
        {caps.map(({ tag, text, icon: Icon, to }) => <Link key={tag} to={to} className="group flex items-center gap-3 rounded-md p-4 transition-colors hover:bg-accent"><span className="feature-icon"><Icon /></span><div><p className="text-[11px] tracking-[0.2em] text-gold uppercase">{tag}</p><p className="text-sm">{text}</p></div></Link>)}
      </div></section>
      <section className="py-20 text-center"><h2 className="text-3xl font-medium">Ready to explore?</h2><Button asChild variant="hero" size="xl" className="mt-7"><Link to="/assistant">Launch IP-SAKTI <ArrowRight /></Link></Button></section>
    </main>
    <footer className="border-t border-border"><div className="page-shell flex flex-col gap-3 py-8 text-xs text-muted-foreground sm:flex-row sm:justify-between"><span>© IP-SAKTI Sahayak · Smart India Hackathon</span><span>Research assistance only — not legal advice.</span></div></footer>
  </div>;
}
