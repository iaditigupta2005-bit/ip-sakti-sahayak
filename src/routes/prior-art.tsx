import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, FileSearch, Info, Search, X } from "lucide-react";
import { AppShell, JURISDICTIONS, Select } from "@/components/app/AppShell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/prior-art")({
  head: () => ({ meta: [
    { title: "Prior-Art Discovery — IP-SAKTI" },
    { name: "description", content: "Search relevant patents and documents related to your Ayurveda invention." },
    { property: "og:title", content: "Prior-Art Discovery — IP-SAKTI" },
    { property: "og:description", content: "Structured prior-art research for Ayurveda innovation." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: PriorArtPage,
});

type Doc = { title: string; number: string; jurisdiction: string; date: string; signal: "High" | "Medium" | "Low"; source: string };
const SAMPLE: Doc[] = [
  { title: "Sample: Herbal composition comprising Withania somnifera", number: "Awaiting source", jurisdiction: "India", date: "—", signal: "High", source: "Patent database" },
  { title: "Sample: Polyherbal formulation for cognitive support", number: "Awaiting source", jurisdiction: "International (WIPO)", date: "—", signal: "Medium", source: "WIPO PATENTSCOPE" },
  { title: "Sample: Research article on Bacopa monnieri extracts", number: "Awaiting source", jurisdiction: "United States", date: "—", signal: "Low", source: "Research literature" },
];
const W = { High: "80%", Medium: "55%", Low: "30%" };

function PriorArtPage() {
  const [q, setQ] = useState("");
  const [jur, setJur] = useState<string>("All");
  const [type, setType] = useState("All");
  const [results, setResults] = useState<Doc[] | null>(null);
  const [open, setOpen] = useState<Doc | null>(null);
  const run = () => { if (!q.trim()) return; setResults(SAMPLE.filter(d => jur === "All" || d.jurisdiction === jur)); };

  return <AppShell title="Prior-Art Discovery" subtitle="Search relevant patents and documents related to your invention.">
    <div className="panel p-5">
      <span className="micro-label">INVENTION DESCRIPTION</span>
      <textarea className="field mt-1.5 min-h-24" value={q} onChange={e => setQ(e.target.value)} placeholder="e.g. Ashwagandha and Brahmi formulation for stress relief…" />
      <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
        <Select label="JURISDICTION" options={["All", ...JURISDICTIONS]} value={jur} onChange={setJur} />
        <Select label="DOCUMENT TYPE" options={["All", "Patents", "Research papers", "Traditional knowledge"]} value={type} onChange={setType} />
        <Button variant="hero" size="lg" onClick={run} disabled={!q.trim()}><Search /> Search</Button>
      </div>
    </div>
    <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground"><Info className="size-3.5 text-gold" />Similarity results are research signals, not legal conclusions.</p>

    <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_360px]">
      <div className="space-y-3">
        {!results && <div className="panel p-10 text-center text-sm text-muted-foreground"><FileSearch className="mx-auto mb-3 size-6 text-primary" />Describe your invention to start a search.</div>}
        {results?.length === 0 && <div className="panel p-8 text-center text-sm text-muted-foreground">No documents match these filters.</div>}
        {results && results.length > 0 && <p className="micro-label">PREVIEW RESULTS · SOURCE CONNECTION PENDING</p>}
        {results?.map(d => <article key={d.title} className="panel p-5 fade-in">
          <p className="micro-label text-gold">POTENTIALLY RELEVANT DOCUMENT</p>
          <h3 className="mt-2 font-medium">{d.title}</h3>
          <dl className="mt-3 grid grid-cols-2 gap-2 text-xs text-muted-foreground sm:grid-cols-4">
            <div><dt className="micro-label">NUMBER</dt><dd>{d.number}</dd></div><div><dt className="micro-label">JURISDICTION</dt><dd>{d.jurisdiction}</dd></div>
            <div><dt className="micro-label">DATE</dt><dd>{d.date}</dd></div><div><dt className="micro-label">SIGNAL</dt><dd>{d.signal}</dd></div>
          </dl>
          <div className="mt-4 flex items-center gap-4"><div className="similarity-bar flex-1"><span style={{ width: W[d.signal] }} /></div><Button variant="link" className="px-0" onClick={() => setOpen(d)}>View Source <ArrowRight /></Button></div>
        </article>)}
      </div>
      <aside className="panel h-fit p-5 lg:sticky lg:top-8">
        <div className="flex items-center justify-between"><p className="micro-label">DOCUMENT VIEWER</p>{open && <button aria-label="Close" onClick={() => setOpen(null)}><X className="size-4" /></button>}</div>
        {open ? <div className="mt-4 space-y-3 text-sm"><h3 className="font-medium">{open.title}</h3><p className="text-muted-foreground">Source: {open.source}</p><p className="text-xs text-muted-foreground">Full text will load here once the document source is connected.</p></div>
          : <p className="mt-4 text-sm text-muted-foreground">Select a result to preview it here.</p>}
      </aside>
    </div>
  </AppShell>;
}
