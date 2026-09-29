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
const CHECKLIST = [
  { label: "Product classification", status: "Applicable" }, { label: "Applicable regulatory framework", status: "Applicable" },
  { label: "Manufacturing requirements", status: "Review" }, { label: "Labelling / packaging review", status: "Review" },
  { label: "Ingredient / formulation review", status: "Needs verification" }, { label: "Intellectual property considerations", status: "Review" },
  { label: "Traditional knowledge considerations", status: "Needs verification" },
];
const CONSIDERATIONS: Record<string, string[]> = {
  India: ["ASU drugs are regulated under the Drugs and Cosmetics Act, 1940 and Rules, 1945.", "Manufacturing typically requires a State Licensing Authority licence and Schedule T GMP.", "Classical formulations should reference an authoritative text listed in the First Schedule."],
  "United States": ["Ayurvedic products are often marketed as dietary supplements under DSHEA.", "Structure/function claims must avoid disease-treatment claims.", "Heavy-metal testing and cGMP (21 CFR Part 111) should be reviewed."],
  "European Union": ["Directive 2004/24/EC offers a simplified registration for traditional herbal medicinal products.", "Evidence of traditional use (typically 30 years, 15 in the EU) may be required.", "Food-supplement routes have separate national rules."],
  "International (WIPO)": ["Requirements depend on each target country's national regulator.", "Access and benefit-sharing obligations may apply under the Nagoya Protocol.", "Traditional-knowledge disclosure rules may affect IP filings."],
};
const SOURCES: Record<string, string[]> = {
  India: ["Drugs and Cosmetics Act, 1940", "Schedule T (ASU GMP)", "Ministry of AYUSH resources"],
  "United States": ["DSHEA, 1994", "21 CFR Part 111", "US FDA guidance"],
  "European Union": ["Directive 2004/24/EC", "EMA HMPC monographs"],
  "International (WIPO)": ["WIPO GRATK Treaty", "Nagoya Protocol"],
};

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

    {done && <section className="mt-8 fade-in"><div className="flex flex-wrap items-center gap-3"><h2 className="text-xl font-medium">Compliance Overview</h2><span className="source-chip">Prototype guidance · not legal or regulatory advice</span></div>
      <div className="panel mt-4 p-5"><p className="micro-label">OVERALL ASSESSMENT</p><p className="mt-2 text-sm"><span className="text-gold">Review recommended</span> — <span className="text-muted-foreground">{f.name || "This product"} ({f.category}) appears to fall under the traditional-medicine framework for {f.jurisdiction}. Several items need verification before any regulatory filing.</span></p></div>
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <div className="panel p-5"><p className="micro-label">COMPLIANCE CHECKLIST</p>{CHECKLIST.map(c => <div className="check-row" key={c.label}>{c.status === "Applicable" ? <CheckCircle2 className="text-primary" /> : <TriangleAlert className="size-4 text-gold" />}<span>{c.label}</span><span className="ml-auto text-xs text-muted-foreground">{c.status}</span></div>)}</div>
        <div className="space-y-5">
          <div className="panel p-5"><p className="micro-label">INFORMATION STATUS</p>{checks.map(c => <div className="check-row" key={c.label}>{c.ok ? <CheckCircle2 className="text-primary" /> : <TriangleAlert className="size-4 text-gold" />}<span>{c.label}</span><span className="ml-auto text-xs text-muted-foreground">{c.ok ? "Available" : "Needs verification"}</span></div>)}</div>
          <div className="panel p-5"><p className="micro-label">REGULATORY CONSIDERATIONS</p><ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">{(CONSIDERATIONS[f.jurisdiction] ?? CONSIDERATIONS.India).map(t => <li key={t}>{t}</li>)}</ul></div>
          <div className="panel p-5"><p className="micro-label mb-3">SOURCES</p><div className="flex flex-wrap gap-2">{(SOURCES[f.jurisdiction] ?? SOURCES.India).map(s => <span key={s} className="source-chip"><FileCheck2 className="size-3" />{s}</span>)}</div></div>
          <div className="panel p-5"><p className="micro-label">SUGGESTED NEXT STEPS</p><ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm text-muted-foreground"><li>Confirm product classification with the relevant licensing authority.</li><li>Prepare a complete ingredient and source-reference dossier.</li><li>Review label claims against permitted indications.</li><li>Run a prior-art and traditional-knowledge check before any IP filing.</li></ol></div>
        </div>
      </div>
    </section>}
  </AppShell>;
}
