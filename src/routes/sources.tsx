import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, Bookmark, FileText, Search, X } from "lucide-react";
import { AppShell, Select } from "@/components/app/AppShell";
import { Button } from "@/components/ui/button";
import { recordActivity } from "@/lib/demo-activity";

export const Route = createFileRoute("/sources")({
  head: () => ({ meta: [
    { title: "Knowledge Base — IP-SAKTI" },
    { name: "description", content: "Search laws, regulations, patents and guidance behind IP-SAKTI answers." },
    { property: "og:title", content: "Knowledge Base — IP-SAKTI" },
    { property: "og:description", content: "Traceable sources for Ayurveda IP and regulatory research." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: SourcesPage,
});

const DOCS = [
  { title: "The Patents Act, 1970", authority: "Government of India", jurisdiction: "India", type: "Law", year: "1970", language: "English", url: "https://ipindia.gov.in/" },
  { title: "Drugs and Cosmetics Act, 1940", authority: "Government of India", jurisdiction: "India", type: "Law", year: "1940", language: "English", url: "https://cdsco.gov.in/" },
  { title: "Traditional Knowledge Digital Library", authority: "CSIR", jurisdiction: "India", type: "Database", year: "—", language: "Multiple", url: "https://www.tkdl.res.in/" },
  { title: "Ministry of AYUSH — Regulatory resources", authority: "Ministry of AYUSH", jurisdiction: "India", type: "Guidance", year: "—", language: "English", url: "https://ayush.gov.in/" },
  { title: "WIPO Treaty on IP, Genetic Resources and Associated TK", authority: "WIPO", jurisdiction: "International (WIPO)", type: "Treaty", year: "2024", language: "English", url: "https://www.wipo.int/" },
  { title: "Dietary Supplement Health and Education Act", authority: "US FDA", jurisdiction: "United States", type: "Law", year: "1994", language: "English", url: "https://www.fda.gov/" },
  { title: "Directive 2004/24/EC — Traditional herbal medicinal products", authority: "European Union", jurisdiction: "European Union", type: "Law", year: "2004", language: "English", url: "https://eur-lex.europa.eu/" },
];
const opts = (k: keyof typeof DOCS[number]) => ["All", ...Array.from(new Set(DOCS.map(d => d[k])))];

const DESC: Record<string, string> = {
  "The Patents Act, 1970": "India's primary patent statute, including patentability criteria and exclusions such as Section 3(p) on traditional knowledge.",
  "Drugs and Cosmetics Act, 1940": "Governs manufacture, sale and licensing of drugs in India, including Ayurveda, Siddha and Unani (ASU) medicines.",
  "Traditional Knowledge Digital Library": "A defensive database of traditional medicine formulations used by patent offices to prevent misappropriation.",
  "Ministry of AYUSH — Regulatory resources": "Official guidance, notifications and schemes relating to AYUSH products and practice.",
  "WIPO Treaty on IP, Genetic Resources and Associated TK": "International treaty introducing patent disclosure requirements for genetic resources and associated traditional knowledge.",
  "Dietary Supplement Health and Education Act": "US law defining dietary supplements and the framework under which many herbal products are marketed.",
  "Directive 2004/24/EC — Traditional herbal medicinal products": "EU simplified registration procedure for traditional herbal medicinal products.",
};

function SourcesPage() {
  const [q, setQ] = useState("");
  const [fl, setFl] = useState({ jurisdiction: "All", type: "All", authority: "All", year: "All", language: "All" });
  const [open, setOpen] = useState<typeof DOCS[number] | null>(null);
  const list = useMemo(() => { const s = q.toLowerCase(); return DOCS.filter(d => (d.title + " " + d.authority + " " + (DESC[d.title] ?? "")).toLowerCase().includes(s) && (Object.keys(fl) as (keyof typeof fl)[]).every(k => fl[k] === "All" || d[k] === fl[k])); }, [q, fl]);
  const f = (k: keyof typeof fl, label: string) => <Select label={label} options={opts(k)} value={fl[k]} onChange={v => setFl(p => ({ ...p, [k]: v }))} />;

  return <AppShell title="Knowledge Base" subtitle="Trusted sources behind every answer.">
    <div className="panel p-5">
      <div className="relative"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><input className="field pl-9" value={q} onChange={e => setQ(e.target.value)} placeholder="Search laws, regulations, patents and guidance..." /></div>
      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-5">{f("jurisdiction", "JURISDICTION")}{f("type", "DOCUMENT TYPE")}{f("authority", "AUTHORITY")}{f("year", "YEAR")}{f("language", "LANGUAGE")}</div>
    </div>
    {open && <div className="panel mt-6 p-5 fade-in" key={open.title}>
      <div className="flex items-start justify-between gap-4"><div><p className="micro-label text-gold">SOURCE DETAIL</p><h3 className="mt-2 font-medium">{open.title}</h3></div><button aria-label="Close" onClick={() => setOpen(null)}><X className="size-4" /></button></div>
      <p className="mt-3 text-sm text-muted-foreground">{DESC[open.title]}</p>
      <dl className="mt-4 grid grid-cols-2 gap-2 text-xs text-muted-foreground sm:grid-cols-5"><div><dt className="micro-label">AUTHORITY</dt><dd>{open.authority}</dd></div><div><dt className="micro-label">JURISDICTION</dt><dd>{open.jurisdiction}</dd></div><div><dt className="micro-label">TYPE</dt><dd>{open.type}</dd></div><div><dt className="micro-label">YEAR</dt><dd>{open.year}</dd></div><div><dt className="micro-label">LANGUAGE</dt><dd>{open.language}</dd></div></dl>
      <div className="mt-4 flex flex-wrap items-center gap-4"><Button asChild variant="link" className="px-0"><a href={open.url} target="_blank" rel="noreferrer">Visit official website <ArrowRight /></a></Button><Button variant="glass" size="sm" onClick={() => recordActivity("sources", open.title)}><Bookmark /> Save source</Button><span className="text-[11px] text-muted-foreground">Reference summary for the prototype — document text is not retrieved live.</span></div>
    </div>}
    <p className="micro-label mt-6">{list.length} DOCUMENTS</p>
    {list.length === 0 && <div className="panel mt-3 p-8 text-center text-sm text-muted-foreground">No documents match your search.</div>}
    <div className="mt-3 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{list.map(d => <article key={d.title} className="panel flex flex-col p-5 fade-in">
      <FileText className="size-5 text-primary" /><h3 className="mt-3 font-medium leading-snug">{d.title}</h3>
      <dl className="mt-4 grid grid-cols-2 gap-2 text-xs text-muted-foreground"><div><dt className="micro-label">AUTHORITY</dt><dd>{d.authority}</dd></div><div><dt className="micro-label">JURISDICTION</dt><dd>{d.jurisdiction}</dd></div><div><dt className="micro-label">TYPE</dt><dd>{d.type}</dd></div><div><dt className="micro-label">YEAR</dt><dd>{d.year}</dd></div></dl>
      <Button variant="link" className="mt-auto justify-start px-0 pt-4" onClick={() => { setOpen(d); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Open Source <ArrowRight /></Button>
    </article>)}</div>
  </AppShell>;
}
