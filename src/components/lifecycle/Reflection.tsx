import { useState } from "react";
import { motion } from "framer-motion";
import { SectionShell } from "./SectionShell";

const CHOICES = [
  { id: "cf", title: "90% carbon-free fabs", tag: "≈20× potential cut", impact: 40, label: "Clean grids + hardware + software gains could cut carbon per AI workload ~20×" },
  { id: "soft", title: "Smaller, smarter models", tag: "3× CCI gain", impact: 25, label: "Compute-carbon-intensity improved 3× from TPU v4i to v6e" },
  { id: "water", title: "Nanofiltration of fab water", tag: "97% PFAS removed", impact: 20, label: "90% water recovery at pilot scale" },
  { id: "epr", title: "Extended producer responsibility", tag: "binding e-waste rules", impact: 15, label: "Hold makers responsible; halt exports to weak-regulation states" },
];

const POLICIES = [
  { name: "US Dodd-Frank Act", year: "2010" },
  { name: "EU Conflict Minerals Reg.", year: "2017/821" },
  { name: "EU Due Diligence Directive", year: "2022" },
  { name: "Transparency Initiative (EITI)", year: "ongoing" },
];

export function Reflection() {
  const [picked, setPicked] = useState<string[]>([]);
  const score = picked.reduce(
    (a, id) => a + (CHOICES.find((c) => c.id === id)?.impact ?? 0),
    0,
  );

  return (
    <SectionShell
      id="reflection"
      index={5}
      kicker="Chapter 05 · Future"
      title="What can we actually do?"
      description="AI is here. The question is whether the next decade of compute is extractive — or circular. Pick the futures you'd back."
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
                    setPicked((p) =>
                      p.includes(c.id) ? p.filter((x) => x !== c.id) : [...p, c.id],
                    )
                  }
                  className={`group relative overflow-hidden rounded-2xl p-6 text-left transition ${
                    on ? "neon-border bg-neon/10 neon-glow" : "glass hover:border-neon/40"
                  }`}
                >
                  <div className="absolute right-4 top-4 grid h-7 w-7 place-items-center rounded-full border border-neon/40 text-xs">
                    {on ? "✓" : "+"}
                  </div>
                  <div className="text-xs uppercase tracking-widest text-neon">{c.tag}</div>
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
            <div className="mt-4 flex items-end gap-2">
              <div className="font-mono text-6xl neon-text">{Math.min(100, score)}</div>
              <div className="mb-2 text-muted-foreground">/ 100</div>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-surface-2">
              <motion.div
                animate={{ width: `${Math.min(100, score)}%` }}
                className="h-full bg-gradient-to-r from-neon to-toxic"
              />
            </div>
            <div className="mt-3 text-xs text-muted-foreground">
              {score === 0 && "Pick at least one future."}
              {score > 0 && score < 50 && "A start — every percent counts."}
              {score >= 50 && score < 80 && "Solid combined approach."}
              {score >= 80 && "Circular future unlocked. Share it."}
            </div>
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
            <button className="rounded-full border border-neon/40 px-6 py-3 text-sm hover:bg-neon/10">
              Restart journey
            </button>
          </div>
        </div>
      </motion.div>
    </SectionShell>
  );
}