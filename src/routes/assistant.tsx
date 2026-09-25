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
type Msg = { role: "user" | "ai"; text: string };

function AssistantPage() {
  const [lang, setLang] = useState<string>(LANGS[0]);
  const [jur, setJur] = useState<string>(JURISDICTIONS[0]);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [history, setHistory] = useState<string[]>([]);

  const ask = (q: string) => {
    const text = q.trim(); if (!text) return;
    setMsgs(m => [...m, { role: "user", text }, { role: "ai", text: `Preview mode: the knowledge service isn't connected yet, so no answer is generated. Once connected, answers for ${jur} in ${lang} will appear here with citations.` }]);
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
              : <div key={i} className="fade-in space-y-3"><div className="answer-block"><div className="mb-1.5 flex items-center gap-2"><Sparkles className="size-3.5 text-gold" /><span className="micro-label text-gold">IP-SAKTI</span></div>{m.text}</div>
                  <div><p className="micro-label mb-2">SOURCES</p><div className="grid gap-2 sm:grid-cols-3">{["Patent law", "AYUSH guidance", "WIPO reference"].map(s => <div key={s} className="panel flex items-center gap-2 p-3 text-xs text-muted-foreground"><FileCheck2 className="size-4 text-primary" />{s}<span className="ml-auto text-[10px]">pending</span></div>)}</div></div></div>)}
        </div>
        <form onSubmit={e => { e.preventDefault(); ask(input); }} className="flex gap-2 border-t border-border p-4">
          <input className="field" value={input} onChange={e => setInput(e.target.value)} placeholder="Ask about patents, trademarks, Ayurveda regulations..." />
          <Button type="submit" variant="hero" size="icon" aria-label="Send"><ArrowUp /></Button>
        </form>
      </section>
    </div>
  </AppShell>;
}
