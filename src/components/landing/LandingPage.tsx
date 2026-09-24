import { Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  ArrowRight, Bot, Check, CheckCircle2, ChevronRight, CircleCheck,
  FileCheck2, FileSearch, Globe2, Languages, Leaf, Menu, Network,
  Search, ShieldCheck, Sparkles, Waypoints, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import networkImage from "@/assets/ip-sakti-network.jpg";

const navItems = [
  ["Home", "/"], ["AI Assistant", "/assistant"], ["Prior-Art", "/prior-art"],
  ["Compliance", "/compliance"], ["Knowledge Base", "/sources"],
] as const;

function SectionHeading({ eyebrow, title, text, center = false }: { eyebrow?: string; title: ReactNode; text?: string; center?: boolean }) {
  return <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
    {eyebrow && <p className="eyebrow">{eyebrow}</p>}
    <h2 className="section-title">{title}</h2>
    {text && <p className="section-copy">{text}</p>}
  </div>;
}

function Brand() {
  return <Link to="/" className="flex items-center gap-3" aria-label="IP-SAKTI home">
    <span className="brand-mark"><Leaf className="size-5" /></span>
    <span className="leading-none"><strong className="block text-[15px] tracking-[0.15em]">IP-SAKTI</strong><span className="mt-1 block text-[10px] tracking-[0.24em] text-muted-foreground">SAHAYAK</span></span>
  </Link>;
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const update = () => setScrolled(window.scrollY > 24); update(); window.addEventListener("scroll", update, { passive: true }); return () => window.removeEventListener("scroll", update); }, []);
  return <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "nav-scrolled" : ""}`}>
    <nav className="page-shell flex h-20 items-center justify-between" aria-label="Primary navigation">
      <Brand />
      <div className="hidden items-center gap-7 lg:flex">{navItems.map(([label, to]) => <Link key={label} to={to} className="nav-link">{label}</Link>)}</div>
      <Button asChild variant="hero" size="lg" className="hidden lg:inline-flex"><Link to="/assistant">Launch Assistant <ArrowRight /></Link></Button>
      <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
    </nav>
    {open && <div className="mobile-menu lg:hidden"><div className="page-shell flex flex-col gap-1 py-4">{navItems.map(([label, to]) => <Link key={label} to={to} onClick={() => setOpen(false)} className="rounded-md px-4 py-3 text-sm text-muted-foreground hover:bg-accent hover:text-foreground">{label}</Link>)}<Button asChild variant="hero" className="mt-3"><Link to="/assistant">Launch Assistant <ArrowRight /></Link></Button></div></div>}
  </header>;
}

const querySteps = ["Understanding query…", "Searching trusted sources…", "Checking jurisdiction: India"];
function IntelligencePanel() {
  return <div className="relative mx-auto w-full max-w-xl lg:mr-0">
    <div className="orbit orbit-one" /><div className="orbit orbit-two" />
    {[["Patent", "-left-5 top-28"], ["WIPO", "right-1 -top-5"], ["Ayurveda", "-right-8 bottom-24"], ["Prior Art", "left-8 -bottom-5"]].map(([label, pos]) => <span key={label} className={`floating-node ${pos}`}>{label}</span>)}
    <div className="intelligence-card">
      <div className="flex items-center justify-between border-b border-border/70 px-5 py-4"><div className="flex items-center gap-2.5"><span className="status-pulse" /><span className="text-sm font-medium">IP-SAKTI Intelligence</span></div><Bot className="size-4 text-primary" /></div>
      <div className="space-y-5 p-5 sm:p-6">
        <div><p className="micro-label">USER QUERY</p><p className="mt-2 text-[15px] text-foreground">“Can my Ashwagandha formulation be protected?”</p></div>
        <div className="space-y-2.5 rounded-md border border-border/60 bg-muted/30 p-3.5">{querySteps.map((step, i) => <div key={step} className="process-row" style={{ animationDelay: `${i * 0.7}s` }}><CircleCheck className="size-3.5 text-primary" /><span>{step}</span>{i === 2 && <span className="ml-auto">🇮🇳</span>}</div>)}</div>
        <div className="answer-block"><div className="mb-2 flex items-center gap-2"><Sparkles className="size-4 text-gold" /><span className="micro-label text-gold">EVIDENCE-BACKED ANSWER</span></div><p>Potential IP protection pathways may include patent protection where applicable, subject to novelty, inventive step and other legal requirements.</p></div>
        <div><p className="micro-label mb-2.5">SOURCES</p><div className="flex flex-wrap gap-2">{["Patent Law", "AYUSH guidance", "WIPO reference"].map(x => <span className="source-chip" key={x}><FileCheck2 className="size-3" />{x}</span>)}</div></div>
        <div className="flex flex-wrap gap-3 border-t border-border/60 pt-4 text-[10px] uppercase tracking-[0.14em] text-muted-foreground"><span>§3</span><span>§10</span><span className="flex items-center gap-1 text-primary"><Check className="size-3" /> Source verified</span></div>
      </div>
    </div>
  </div>;
}

export function Hero() {
  return <section className="hero-section relative overflow-hidden pt-20">
    <img src={networkImage} width={1920} height={1080} alt="Abstract knowledge network connecting legal documents and botanical intelligence" className="absolute inset-0 h-full w-full object-cover opacity-45" />
    <div className="hero-overlay absolute inset-0" />
    <div className="page-shell relative grid min-h-[820px] items-center gap-16 py-24 lg:grid-cols-[1.05fr_.95fr] lg:py-28">
      <div className="max-w-3xl animate-rise"><div className="hero-badge"><Sparkles className="size-3.5" /> AI-POWERED IP &amp; REGULATORY INTELLIGENCE</div>
        <h1 className="mt-7 text-5xl font-medium leading-[1.04] sm:text-6xl lg:text-[74px]">Protecting Ayurveda&apos;s <span className="gradient-text">Knowledge.</span><br />Powering Its <span className="gradient-text">Future.</span></h1>
        <p className="mt-7 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">IP-SAKTI Sahayak is a multilingual, source-cited AI assistant that helps Ayurveda innovators navigate intellectual property, prior-art discovery and regulatory requirements across national and international regimes.</p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row"><Button asChild variant="hero" size="xl"><Link to="/assistant">Ask IP-SAKTI <ArrowRight /></Link></Button><Button asChild variant="glass" size="xl"><a href="#platform">Explore the Platform</a></Button></div>
        <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs tracking-wide text-muted-foreground"><span>Source-grounded</span><span className="text-gold">•</span><span>Multilingual</span><span className="text-gold">•</span><span>Jurisdiction-aware</span></div>
      </div><IntelligencePanel />
    </div>
  </section>;
}

export function TrustStrip() { return <section className="trust-strip"><div className="page-shell flex flex-col items-center gap-5 py-7 lg:flex-row"><span className="micro-label shrink-0 text-gold">BUILT FOR</span><div className="h-px w-full bg-border lg:w-16" /><div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs tracking-wide text-muted-foreground lg:justify-start">{["Ayurveda Researchers", "Innovators & Startups", "IP Professionals", "Researchers", "Regulatory Teams"].map((x, i) => <span key={x} className="flex items-center gap-5">{i > 0 && <span className="hidden text-gold sm:inline">•</span>}{x}</span>)}</div></div></section>; }

export function ProblemSection() {
  const docs = ["Patent databases", "AYUSH frameworks", "Traditional knowledge", "Regulatory documents", "International IP", "Multiple languages"];
  return <section className="section-space" id="platform"><div className="page-shell grid items-center gap-16 lg:grid-cols-2"><SectionHeading eyebrow="THE CHALLENGE" title={<>The knowledge exists.<br /><span className="text-muted-foreground">Finding the right answer shouldn&apos;t be the problem.</span></>} text="Ayurveda innovators navigate a fragmented landscape of patent records, regulatory frameworks, traditional knowledge resources, and multiple languages." />
    <div className="convergence-grid">{docs.map((doc, i) => <div key={doc} className="document-node" style={{ animationDelay: `${i * .12}s` }}><FileCheck2 className="size-4" /><span>{doc}</span></div>)}<div className="central-node"><Waypoints className="size-6" /><strong>IP-SAKTI</strong></div><p className="col-span-full mt-3 text-center text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Fragmented Knowledge <ArrowRight className="mx-2 inline size-4 text-gold" /> Unified Intelligence</p></div>
  </div></section>;
}

const features = [
  { n:"01", tag:"ASK", title:"Multilingual AI Assistant", copy:"Ask questions naturally in English or Indian languages and receive contextual guidance.", icon: Languages },
  { n:"02", tag:"VERIFY", title:"Source-Cited Intelligence", copy:"Every important answer is grounded in retrieved documents with traceable citations and evidence.", icon: FileCheck2 },
  { n:"03", tag:"PROTECT", title:"Prior-Art Discovery", copy:"Search relevant patents and documents to identify potentially similar inventions and research.", icon: FileSearch },
  { n:"04", tag:"COMPLY", title:"Regulatory Guidance", copy:"Turn complex regulatory requirements into structured checklists and actionable next steps.", icon: ShieldCheck },
];
export function FeatureCards() { return <section className="section-space section-band"><div className="page-shell"><SectionHeading eyebrow="CORE CAPABILITIES" title="One intelligence layer for the entire IP journey." /><div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{features.map(({n,tag,title,copy,icon:Icon}) => <article className="feature-card group" key={tag}><div className="flex items-center justify-between"><span className="text-xs text-muted-foreground">{n}</span><span className="feature-icon"><Icon /></span></div><p className="mt-10 text-[10px] tracking-[0.2em] text-gold">{tag}</p><h3 className="mt-3 text-xl font-medium">{title}</h3><p className="mt-4 text-sm leading-7 text-muted-foreground">{copy}</p><ChevronRight className="mt-7 size-4 text-primary transition-transform group-hover:translate-x-1" /></article>)}</div></div></section>; }

const steps = [["01","Ask","User asks a question in natural language."],["02","Retrieve","The system searches relevant knowledge sources."],["03","Reason","The RAG engine analyzes the retrieved evidence."],["04","Cite","Relevant sources are attached to the answer."],["05","Act","User receives an actionable IP or regulatory roadmap."]];
export function HowItWorks() { return <section className="section-space"><div className="page-shell"><SectionHeading center eyebrow="HOW IT WORKS" title="From Question to Evidence. In Seconds." /><div className="workflow mt-16">{steps.map(([n,t,c],i)=><div className="workflow-step" key={n}><div className="step-node">{n}</div>{i < steps.length-1 && <div className="step-line"><span /></div>}<h3>{t}</h3><p>{c}</p></div>)}</div></div></section>; }

export function CitationPreview() { return <section className="section-space section-band"><div className="page-shell grid items-center gap-14 lg:grid-cols-[.85fr_1.15fr]"><SectionHeading eyebrow="SOURCE-CITED AI" title="AI you can trace back to the source." text="IP-SAKTI is designed around evidence-grounded responses. Instead of presenting unsupported answers, the system retrieves relevant documents and connects generated guidance to its underlying sources." /><div className="citation-window"><div className="window-bar"><span/><span/><span/><p>RESPONSE / EVIDENCE</p></div><div className="p-6 sm:p-8"><p className="micro-label">AI RESPONSE</p><blockquote className="mt-4 border-l border-primary pl-5 text-lg leading-8">“Your formulation may require further assessment against applicable patentability and regulatory requirements.”</blockquote><p className="micro-label mb-3 mt-8">EVIDENCE</p>{[["Patent document","Section 3 — Eligibility"],["Regulatory guidance","Chapter 4 — Requirements"],["WIPO reference","Traditional Knowledge"]].map(([a,b],i)=><div className="evidence-row" key={a}><span className="evidence-number">0{i+1}</span><FileCheck2 className="size-4 text-primary"/><div><strong>{a}</strong><p>{b}</p></div><span className="citation-pip"/></div>)}<Button asChild variant="link" className="mt-5 px-0"><Link to="/sources">View evidence <ArrowRight /></Link></Button></div></div></div></section>; }

export function JurisdictionSection() { const places=[["IN","India","IP + AYUSH + Traditional Knowledge"],["US","United States","Patent + regulatory pathway"],["EU","European Union","IP + applicable regulatory framework"]]; return <section className="jurisdiction section-space overflow-hidden"><div className="network-globe"><Globe2 /></div><div className="page-shell relative"><SectionHeading center eyebrow="GLOBAL CONTEXT" title="One question. Different jurisdictions." text="Compare relevant frameworks without losing the context of your invention."/><div className="mt-14 grid gap-4 md:grid-cols-3">{places.map(([code,name,desc])=><article className="jurisdiction-card group" key={code}><div className="flex items-center justify-between"><span className="country-code">{code}</span><Network className="size-5 text-muted-foreground transition-colors group-hover:text-primary"/></div><h3>{name}</h3><p>{desc}</p><div className="network-line"><span/></div></article>)}</div></div></section>; }

export function PriorArtPreview() { return <section className="section-space section-band"><div className="page-shell"><div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]"><SectionHeading eyebrow="PRIOR-ART DISCOVERY" title="Discover what already exists." text="Search patents and research literature through a structured evidence lens—not a black box."/><div className="search-console"><div className="grid gap-3 sm:grid-cols-[1fr_auto]"><div className="search-input"><Search/><span>Ashwagandha + Brahmi herbal formulation</span></div><Button asChild variant="hero"><Link to="/prior-art">Search Prior Art</Link></Button></div><div className="mt-7"><p className="micro-label mb-4">POTENTIALLY RELEVANT DOCUMENTS</p>{[["Patent A",87],["Patent B",74],["Research Document C",63]].map(([name,val])=><div className="result-row" key={name}><FileSearch className="size-4"/><span>{name}</span><div className="similarity-bar"><span style={{width:`${val}%`}}/></div><strong>{val}%</strong></div>)}<p className="mt-4 text-[11px] text-muted-foreground">Similarity is a research signal, not a legal conclusion.</p></div></div></div><Button asChild variant="link" className="mt-8 px-0"><Link to="/prior-art">Explore Prior-Art Search <ArrowRight /></Link></Button></div></section>; }

export function CompliancePreview() { const checks=[[true,"Product classification"],[true,"Applicable framework"],[true,"Documentation"],[false,"Labelling information"],[false,"Regulatory verification"]] as const; return <section className="section-space"><div className="page-shell grid items-center gap-14 lg:grid-cols-2"><div className="dashboard"><div className="dashboard-head"><div><p className="micro-label">PRODUCT</p><h3>Ayurvedic Herbal Formulation</h3></div><ShieldCheck className="size-7 text-primary"/></div><div className="grid grid-cols-2 gap-3 border-b border-border p-5"><span className="status available">● Information available</span><span className="status verify">● Verification required</span></div><div className="p-5">{checks.map(([done,label])=><div className="check-row" key={label}>{done ? <CheckCircle2 className="text-primary"/> : <span className="warning-mark">!</span>}<span>{label}</span><span className="ml-auto text-xs text-muted-foreground">{done ? "Mapped" : "Review"}</span></div>)}</div></div><div><SectionHeading eyebrow="COMPLIANCE ROADMAP" title="Turn regulations into an actionable roadmap." text="Translate complex regulatory requirements into clear, structured steps while preserving the source context behind each action."/><Button asChild variant="hero" size="lg" className="mt-8"><Link to="/compliance">Check Compliance <ArrowRight /></Link></Button></div></div></section>; }

export function ImpactSection() { return <section className="section-space section-band"><div className="page-shell"><SectionHeading center eyebrow="PURPOSE-BUILT IMPACT" title="Built for the people advancing Ayurveda."/><div className="mt-14 grid grid-cols-2 border-l border-t border-border lg:grid-cols-4">{["Researchers","Innovators","IP Professionals","Regulatory Teams"].map((x,i)=><div className="impact-cell" key={x}><span>0{i+1}</span><h3>{x}</h3></div>)}</div></div></section>; }

export function FinalCTA() { return <section className="relative overflow-hidden py-28 sm:py-36"><img src={networkImage} loading="lazy" width={1920} height={1080} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30"/><div className="hero-overlay absolute inset-0"/><div className="page-shell relative text-center"><Sparkles className="mx-auto size-6 text-gold"/><h2 className="mx-auto mt-6 max-w-4xl text-4xl font-medium sm:text-6xl">Your innovation deserves more than a search box.</h2><p className="mt-6 text-lg tracking-[0.16em] text-muted-foreground">ASK. VERIFY. PROTECT. COMPLY.</p><div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row"><Button asChild variant="hero" size="xl"><Link to="/assistant">Launch IP-SAKTI <ArrowRight/></Link></Button><Button asChild variant="glass" size="xl"><Link to="/sources">Explore Knowledge Base</Link></Button></div></div></section>; }

export function Footer() { return <footer className="border-t border-border bg-surface-deep"><div className="page-shell py-12"><div className="grid gap-10 lg:grid-cols-[1fr_auto]"><div><Brand/><p className="mt-5 max-w-md text-sm leading-6 text-muted-foreground">Evidence-grounded intelligence for Ayurveda&apos;s IP and regulatory ecosystem.</p><p className="mt-5 text-[10px] tracking-[0.18em] text-gold">SMART INDIA HACKATHON PROJECT</p></div><nav className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm sm:grid-cols-5">{navItems.slice(1).map(([label,to])=><Link className="text-muted-foreground hover:text-foreground" key={label} to={to}>{label}</Link>)}</nav></div><div className="mt-12 border-t border-border pt-6 text-xs leading-6 text-muted-foreground">IP-SAKTI provides information and research assistance. It does not replace professional legal or regulatory advice.</div></div></footer>; }

export function LandingPage() {
  useEffect(() => { const nodes = document.querySelectorAll(".reveal"); const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add("revealed"); }), { threshold: .08 }); nodes.forEach(n => observer.observe(n)); return () => observer.disconnect(); }, []);
  return <div className="min-h-screen overflow-x-hidden bg-background text-foreground"><Navbar/><main><Hero/><TrustStrip/><div className="reveal"><ProblemSection/></div><div className="reveal"><FeatureCards/></div><div className="reveal"><HowItWorks/></div><div className="reveal"><CitationPreview/></div><div className="reveal"><JurisdictionSection/></div><div className="reveal"><PriorArtPreview/></div><div className="reveal"><CompliancePreview/></div><div className="reveal"><ImpactSection/></div><div className="reveal"><FinalCTA/></div></main><Footer/></div>;
}