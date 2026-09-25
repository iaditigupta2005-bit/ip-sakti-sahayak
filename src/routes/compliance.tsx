import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, FileCheck2, TriangleAlert } from "lucide-react";
import { AppShell, JURISDICTIONS, Select } from "@/components/app/AppShell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/compliance")({
  head: () => ({ meta: [
    { title: "Regulatory Compliance — IP-SAKTI" },
    { name: "description", content: "Build a structured Ayurveda regulatory compliance roadmap step by step." },
    { property: "og:title", content: "Regulatory Compliance — IP-SAKTI" },
    { property: "og:description", content: "Structured Ayurveda regulatory guidance." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: CompliancePage,
});

const STEPS = ["Product", "Formulation", "Intended use", "Jurisdiction", "Generate"];

function CompliancePage() {
  const [step, setStep] = useState(0);
  const [f, setF] = useState({ name: "", category: "Classical Ayurvedic medicine", ingredients: "", use: "", jurisdiction: JURISDICTIONS[0] as string });
  const [done, setDone] = useState(false);
  const set = (k: keyof typeof f) => (v: string) => setF(p => ({ ...p, [k]: v }));

  const checks = [
    { ok: !!f.name, label: "Product name" }, { ok: true, label: "Product category" },
    { ok: !!f.ingredients, label: "Ingredient list" }, { ok: !!f.use, label: "Intended use" },
    { ok: false, label: "Labelling information" }, { ok: false, label: "Manufacturing licence" },
  ];

  return <AppShell title="Regulatory Compliance" subtitle="Answer five short steps to build your guidance overview.">
    <ol className="mb-6 grid grid-cols-5 gap-2">{STEPS.map((s, i) => <li key={s}><button onClick={() => setStep(i)} className="w-full text-left"><div className={`h-1 rounded-full ${i <= step ? "bg-primary" : "bg-border"}`} /><p className={`mt-2 hidden text-xs sm:block ${i === step ? "text-foreground" : "text-muted-foreground"}`}>{i + 1}. {s}</p></button></li>)}</ol>
    <div className="panel p-6 fade-in" key={step}>
      {step === 0 && <div className="grid gap-4 sm:grid-cols-2"><label><span className="micro-label">PRODUCT NAME</span><input className="field mt-1.5" value={f.name} onChange={e => set("name")(e.target.value)} placeholder="e.g. Ashwagandha Churna" /></label><Select label="CATEGORY" options={["Classical Ayurvedic medicine", "Proprietary Ayurvedic medicine", "Nutraceutical / supplement", "Cosmetic"]} value={f.category} onChange={set("category")} /></div>}
      {step === 1 && <label><span className="micro-label">INGREDIENTS / FORMULATION</span><textarea className="field mt-1.5 min-h-32" value={f.ingredients} onChange={e => set("ingredients")(e.target.value)} placeholder="List ingredients and proportions" /></label>}
      {step === 2 && <label><span className="micro-label">INTENDED USE</span><textarea className="field mt-1.5 min-h-32" value={f.use} onChange={e => set("use")(e.target.value)} placeholder="Describe the intended use and target users" /></label>}
      {step === 3 && <Select label="TARGET JURISDICTION" options={JURISDICTIONS} value={f.jurisdiction} onChange={set("jurisdiction")} />}
      {step === 4 && <div className="text-sm text-muted-foreground"><p>Review complete. Generate an overview for <span className="text-foreground">{f.name || "your product"}</span> in <span className="text-foreground">{f.jurisdiction}</span>.</p><Button variant="hero" size="lg" className="mt-5" onClick={() => setDone(true)}><Check /> Generate guidance</Button></div>}
      <div className="mt-6 flex justify-between"><Button variant="ghost" disabled={step === 0} onClick={() => setStep(s => s - 1)}><ArrowLeft /> Back</Button>{step < 4 && <Button variant="glass" onClick={() => setStep(s => s + 1)}>Next <ArrowRight /></Button>}</div>
    </div>

    {done && <section className="mt-8 fade-in"><h2 className="text-xl font-medium">Compliance Overview</h2>
      <div className="mt-4 grid gap-5 lg:grid-cols-2">
        <div className="panel p-5"><p className="micro-label">INFORMATION STATUS</p>{checks.map(c => <div className="check-row" key={c.label}>{c.ok ? <CheckCircle2 className="text-primary" /> : <TriangleAlert className="size-4 text-gold" />}<span>{c.label}</span><span className="ml-auto text-xs text-muted-foreground">{c.ok ? "Available" : "Verification required"}</span></div>)}</div>
        <div className="space-y-5">
          <div className="panel p-5"><p className="micro-label">RELEVANT REQUIREMENTS & DOCUMENTATION</p><p className="mt-3 text-sm text-muted-foreground">Requirement mapping for {f.jurisdiction} will appear once the regulatory source library is connected.</p></div>
          <div className="panel p-5"><p className="micro-label mb-3">SOURCES</p><div className="flex flex-wrap gap-2">{["AYUSH framework", "Drugs & Cosmetics rules", "Labelling guidance"].map(s => <span key={s} className="source-chip"><FileCheck2 className="size-3" />{s}</span>)}</div></div>
        </div>
      </div>
    </section>}
  </AppShell>;
}
