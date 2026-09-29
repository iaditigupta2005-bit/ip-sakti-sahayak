import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUp, FileCheck2, MessageSquare, Plus, Sparkles } from "lucide-react";
import { AppShell, JURISDICTIONS, Select } from "@/components/app/AppShell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/assistant")({
  head: () => ({ meta: [
    { title: "AI Assistant — IP-SAKTI Sahayak" },
    { name: "description", content: "Ask multilingual intellectual-property and regulatory questions about Ayurveda." },
    { property: "og:title", content: "AI Assistant — IP-SAKTI" },
    { property: "og:description", content: "Evidence-grounded Ayurveda IP intelligence." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: AssistantPage,
});

const LANGS = ["English", "हिन्दी", "தமிழ்", "తెలుగు", "বাংলা", "मराठी"] as const;
const SUGGESTED = [
  "Can I patent an Ayurvedic herbal formulation?",
  "What does Section 3(p) of the Patents Act cover?",
  "How is traditional knowledge protected internationally?",
  "What licence do I need to manufacture Ayurvedic medicine?",
];
type DemoSource = { title: string; authority: string };
type Msg = { role: "user" | "ai"; text: string; sources?: DemoSource[] };

const DEMO: Record<string, { answer: string; sources: DemoSource[] }> = {
  "Can I patent an Ayurvedic herbal formulation?": {
    answer:
      "Patentability of an Ayurvedic herbal formulation depends on factors such as novelty, inventive step, and applicable exclusions under Indian patent law. Traditional knowledge and the nature of the formulation may also affect patentability.\n\nFor an actual assessment, the relevant patent provisions and applicable AYUSH/traditional-knowledge guidelines should be reviewed.",
    sources: [
      { title: "Patents Act, 1970", authority: "IP India" },
      { title: "Guidelines for Examination of AYUSH Related Inventions", authority: "IP India" },
      { title: "Guidelines for Processing of Patent Applications relating to Traditional Knowledge and Biological Material", authority: "IP India" },
    ],
  },
  "What does Section 3(p) of the Patents Act cover?": {
    answer:
      "Section 3(p) of the Patents Act, 1970 excludes from patentability an invention which, in effect, is traditional knowledge or an aggregation or duplication of known properties of traditionally known component or components.\n\nIn practice, this means that a claim resting on traditional knowledge — or on a mere arrangement of known Ayurvedic ingredients — is likely to be refused, while a genuine technical advance over such knowledge may still be examined on its merits.",
    sources: [
      { title: "Patents Act, 1970 — Section 3(p)", authority: "IP India" },
      { title: "Manual of Patent Office Practice and Procedure", authority: "IP India" },
      { title: "Guidelines for Examination of AYUSH Related Inventions", authority: "IP India" },
    ],
  },
  "How is traditional knowledge protected internationally?": {
    answer:
      "Internationally, traditional knowledge is addressed through a mix of instruments: the Nagoya Protocol on access and benefit-sharing, WIPO's ongoing work on genetic resources and traditional knowledge, and defensive databases such as the Traditional Knowledge Digital Library (TKDL) that help patent offices refuse invalid claims.\n\nProtection therefore tends to be preventive and documentation-based rather than a single global registration system.",
    sources: [
      { title: "WIPO — Traditional Knowledge", authority: "WIPO" },
      { title: "Traditional Knowledge Digital Library (TKDL)", authority: "Government of India" },
      { title: "Nagoya Protocol on Access and Benefit-sharing", authority: "CBD Secretariat" },
    ],
  },
  "What licence do I need to manufacture Ayurvedic medicine?": {
    answer:
      "Manufacturing Ayurvedic medicines in India generally requires a licence from the State Licensing Authority under the Drugs and Cosmetics Act, 1940 and the Drugs and Cosmetics Rules, 1945, along with compliance with Schedule T good manufacturing practices for ASU drugs.\n\nProduct-specific labelling, listing and certification requirements under AYUSH export schemes may also apply depending on the market.",
    sources: [
      { title: "Drugs and Cosmetics Rules, 1945", authority: "Ministry of Health & Family Welfare" },
      { title: "Schedule T — Good Manufacturing Practices for ASU Drugs", authority: "Ministry of AYUSH" },
      { title: "AYUSH Regulatory Resources", authority: "Ministry of AYUSH" },
    ],
  },
};

const FALLBACK = {
  answer:
    "Prototype mode: this question isn't covered by the demonstration script yet, so no substantive answer is generated. A connected knowledge service would ground the answer in cited public sources for the selected language and jurisdiction.",
  sources: [] as DemoSource[],
};

function AssistantPage() {
  const [lang, setLang] = useState<string>(LANGS[0]);
  const [jur, setJur] = useState<string>(JURISDICTIONS[0]);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [history, setHistory] = useState<string[]>([]);

  const ask = (q: string) => {
    const text = q.trim(); if (!text) return;
    const demo = DEMO[text] ?? FALLBACK;
    setMsgs(m => [...m, { role: "user", text }, { role: "ai", text: demo.answer, sources: demo.sources }]);
    setHistory(h => [text, ...h.filter(x => x !== text)].slice(0, 8));
    setInput("");
  };

  return <AppShell title="How can I help?" subtitle="Ask about patents, trademarks and Ayurveda regulations."
    actions={<Button variant="glass" onClick={() => setMsgs([])}><Plus /> New chat</Button>}>
    <div className="grid gap-5 xl:grid-cols-[220px_1fr]">
      <aside className="panel p-4">
        <p className="micro-label">HISTORY</p>
        {history.length === 0 ? <p className="mt-3 text-xs text-muted-foreground">No conversations yet.</p> :
          <ul className="mt-3 space-y-1">{history.map(h => <li key={h}><button onClick={() => setInput(h)} className="side-link w-full text-left"><MessageSquare className="size-3.5 shrink-0" /><span className="truncate">{h}</span></button></li>)}</ul>}
      </aside>
      <section className="panel flex min-h-[560px] flex-col">
        <div className="grid gap-3 border-b border-border p-4 sm:grid-cols-2">
          <Select label="LANGUAGE" options={LANGS} value={lang} onChange={setLang} />
          <Select label="JURISDICTION" options={JURISDICTIONS} value={jur} onChange={setJur} />
        </div>
        <div className="flex-1 space-y-4 p-5">
          {msgs.length === 0 ? <div className="grid gap-3 sm:grid-cols-2">{SUGGESTED.map(s => <button key={s} onClick={() => ask(s)} className="feature-card !min-h-0 text-left text-sm !p-4"><Sparkles className="mb-2 size-4 text-gold" />{s}</button>)}</div> :
            msgs.map((m, i) => m.role === "user"
              ? <div key={i} className="ml-auto w-fit max-w-[80%] rounded-lg bg-secondary px-4 py-3 text-sm fade-in">{m.text}</div>
              : <div key={i} className="fade-in space-y-3"><div className="answer-block"><div className="mb-1.5 flex items-center gap-2"><Sparkles className="size-3.5 text-gold" /><span className="micro-label text-gold">IP-SAKTI</span><span className="ml-auto text-[10px] text-muted-foreground">Prototype response</span></div>{m.text.split("\n\n").map((p, j) => <p key={j}>{p}</p>)}</div>
                  {m.sources && m.sources.length > 0 && <div>
                    <p className="micro-label mb-2">SOURCES</p>
                    <div className="grid gap-2 sm:grid-cols-3">
                      {m.sources!.map(s => (
                        <div key={s.title} className="panel flex items-center gap-2 p-3 text-xs text-muted-foreground">
                          <FileCheck2 className="size-4 shrink-0 text-primary" />
                          <span className="truncate">{s.title} — {s.authority}</span>
                          <span className="ml-auto shrink-0 text-[10px]">prototype</span>
                        </div>
                      ))}
                    </div>
                  </div>}</div>)}

        </div>
        <form onSubmit={e => { e.preventDefault(); ask(input); }} className="flex gap-2 border-t border-border p-4">
          <input className="field" value={input} onChange={e => setInput(e.target.value)} placeholder="Ask about patents, trademarks, Ayurveda regulations..." />
          <Button type="submit" variant="hero" size="icon" aria-label="Send"><ArrowUp /></Button>
        </form>
      </section>
    </div>
  </AppShell>;
}
