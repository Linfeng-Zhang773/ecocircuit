import { useState } from "react";
import { motion } from "framer-motion";
import { SectionShell, GlossaryTerm } from "./SectionShell";

const CHOICES = [
  {
    id: "cf",
    title: "90% carbon-free fabs",
    tag: "about 20x potential cut",
    impact: 40,
    label: "Clean grids + hardware + software gains could cut carbon per AI workload ~20×",
    tagTerms: [] as { term: string; def: string }[],
    explanation: "Taiwan's grid is only ~6% renewable energy while its fabs produce 63% of global IC output. Moving to 90% carbon-free energy, combined with hardware and software efficiency gains, could achieve a ~20x reduction in carbon per AI workload, per Google's TPU lifecycle analysis.",
  },
  {
    id: "soft",
    title: "Smaller, smarter models",
    tag: "3× CCI gain",
    impact: 25,
    label: "Compute-carbon-intensity improved 3× from TPU v4i to v6e",
    tagTerms: [{ term: "CCI", def: "Compute Carbon Intensity: grams of CO₂ equivalent emitted per ExaFLOP of computation. Lower is better. Improved 3x from TPU v4i (2020) to v6e (2024)." }],
    explanation: "Compute Carbon Intensity (CCI) measures gCO₂e per ExaFLOP. It improved 3x from TPU v4i to v6e in just 4 years, showing efficiency gains can partially decouple AI growth from emissions. Memory accounts for ~38% of manufacturing emissions, so smaller, more efficient models directly reduce this.",
  },
  {
    id: "water",
    title: "Nanofiltration of fab water",
    tag: "97% PFAS removed",
    impact: 20,
    label: "90% water recovery at pilot scale",
    tagTerms: [{ term: "PFAS", def: "Per- and polyfluoroalkyl substances: 'forever chemicals' used in chip etching processes. They persist in water and soil for centuries and are linked to cancer, immune disruption, and developmental harm." }],
    explanation: "Taiwan's fabs consume ~10% of local daily reservoir water. TSMC's water use grew 108% from 2015–2020. Nanofiltration membranes remove >97% of PFAS (toxic 'forever chemicals') from fab wastewater and recover 90% of water for reuse, critical for Taiwan's drought-stressed regions.",
  },
  {
    id: "epr",
    title: "Extended producer responsibility",
    tag: "binding e-waste rules",
    impact: 15,
    label: "Hold makers responsible; halt exports to weak-regulation states",
    tagTerms: [{ term: "EPR", def: "Extended Producer Responsibility: a policy framework that holds manufacturers financially liable for the end-of-life disposal of their products, preventing companies from externalizing costs onto society or poorer nations." }],
    explanation: "Only 22.3% of e-waste is formally recycled. Rich nations often export 'recycled' electronics to Ghana, Nigeria, and India where workers acid-strip and burn components in unsafe conditions. EPR laws force manufacturers to fund and be accountable for end-of-life hardware recovery.",
  },
];

const POLICIES = [
  { name: "US Dodd-Frank Act", year: "2010" },
  { name: "EU Conflict Minerals Reg.", year: "2017/821" },
  { name: "EU Due Diligence Directive", year: "2022" },
  { name: "Transparency Initiative (EITI)", year: "ongoing" },
];

export function Reflection({ onRestart }: { onRestart?: () => void }) {
  const [picked, setPicked] = useState<string[]>([]);
  const [showScore, setShowScore] = useState(false);
  const score = picked.reduce(
    (a, id) => a + (CHOICES.find((c) => c.id === id)?.impact ?? 0),
    0,
  );

  return (
    <SectionShell
      id="reflection"
      index={5}
      kicker="Section 05 · Solutions"
      title="What Can We Actually Do?"
      description="AI is here. The question is whether the next decade of compute is extractive or circular. Pick the futures you'd back."
    >
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <div className="grid gap-4 sm:grid-cols-2">
            {CHOICES.map((c) => {
              const on = picked.includes(c.id);
              return (
                <button
                  key={c.id}
                  onClick={() =>
                    !showScore &&
                    setPicked((p) =>
                      p.includes(c.id) ? p.filter((x) => x !== c.id) : [...p, c.id],
                    )
                  }
                  className={`group relative overflow-visible rounded-2xl p-6 text-left transition ${
                    showScore
                      ? on
                        ? "neon-border bg-neon/10 neon-glow cursor-default"
                        : "glass opacity-40 cursor-default"
                      : on
                      ? "neon-border bg-neon/10 neon-glow"
                      : "glass hover:border-neon/40"
                  }`}
                >
                  <div className="absolute right-4 top-4 grid h-7 w-7 place-items-center rounded-full border border-neon/40 text-xs">
                    {on ? "on" : "+"}
                  </div>
                  <div className="text-xs uppercase tracking-widest text-neon flex flex-wrap items-center gap-1">
                    {c.tagTerms.length > 0 ? (
                      <>
                        {c.tag.split(c.tagTerms[0].term).map((part, i) => (
                          i === 0 ? (
                            <span key={i}>{part}</span>
                          ) : (
                            <span key={i}>
                              <GlossaryTerm term={c.tagTerms[0].term} definition={c.tagTerms[0].def} />
                              {part}
                            </span>
                          )
                        ))}
                      </>
                    ) : c.tag}
                  </div>
                  <h4 className="mt-2 text-lg font-semibold">{c.title}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{c.label}</p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="glass-strong rounded-3xl p-6">
            <div className="text-xs uppercase tracking-widest text-neon">your sustainability score</div>
            {showScore ? (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                <div className="mt-4 flex items-end gap-2">
                  <div className="font-mono text-6xl neon-text">{Math.min(100, score)}</div>
                  <div className="mb-2 text-muted-foreground">/ 100</div>
                </div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-surface-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, score)}%` }}
                    className="h-full bg-gradient-to-r from-neon to-toxic"
                  />
                </div>
                <div className="mt-3 text-xs text-muted-foreground">
                  {score === 0 && "Pick at least one future."}
                  {score > 0 && score < 50 && "A start. Every percent counts."}
                  {score >= 50 && score < 80 && "Solid combined approach."}
                  {score >= 80 && "Circular future unlocked. Share it."}
                </div>
                <div className="mt-5 space-y-3">
                  <div className="text-[10px] uppercase tracking-widest text-neon/70">what each choice means</div>
                  {CHOICES.map((c) => {
                    const selected = picked.includes(c.id);
                    return (
                      <div
                        key={c.id}
                        className={`rounded-xl p-3 text-xs ${selected ? "border border-neon/20 bg-neon/5" : "border border-white/5 bg-surface-2/30 opacity-60"}`}
                      >
                        <div className={`font-mono font-semibold mb-1 ${selected ? "text-neon" : "text-muted-foreground"}`}>
                          {selected ? "Selected:" : "Not selected:"} {c.title}
                        </div>
                        <p className="text-muted-foreground leading-relaxed">{c.explanation}</p>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ) : (
              <div className="mt-4">
                <div className="text-sm text-muted-foreground mb-4">
                  {picked.length === 0
                    ? "Select at least one future to see your score."
                    : `${picked.length} future${picked.length > 1 ? "s" : ""} selected. Ready to calculate.`}
                </div>
                <button
                  onClick={() => setShowScore(true)}
                  disabled={picked.length === 0}
                  className="w-full rounded-xl bg-neon/20 border border-neon/40 px-4 py-3 text-sm font-semibold text-neon transition hover:bg-neon/30 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Calculate Score
                </button>
              </div>
            )}
          </div>

          <div className="glass rounded-3xl p-6">
            <div className="text-xs uppercase tracking-widest text-neon">policy levers</div>
            <div className="mt-1 text-sm">Existing rules aimed at the supply chain</div>
            <div className="mt-4 space-y-3">
              {POLICIES.map((p) => (
                <div key={p.name} className="flex items-center justify-between gap-3 text-xs">
                  <span className="text-foreground/90">{p.name}</span>
                  <span className="shrink-0 font-mono text-neon">{p.year}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-20 text-center"
      >
        <div className="mx-auto max-w-2xl glass-strong rounded-3xl p-10 scanlines relative overflow-hidden">
          <div className="text-xs uppercase tracking-[0.3em] text-neon">final transmission</div>
          <h3 className="mt-4 text-3xl font-semibold leading-tight md:text-5xl">
            AI has a physical cost. <br />
            <span className="text-gradient-neon">Understanding it is the first step.</span>
          </h3>
          <div className="mt-8 flex justify-center gap-3">
            <button className="rounded-full bg-neon px-6 py-3 text-sm font-semibold text-primary-foreground neon-glow">
              Share the exhibit
            </button>
            <button
              onClick={onRestart}
              className="rounded-full border border-neon/40 px-6 py-3 text-sm hover:bg-neon/10"
            >
              Restart journey
            </button>
          </div>
        </div>
      </motion.div>
    </SectionShell>
  );
}
