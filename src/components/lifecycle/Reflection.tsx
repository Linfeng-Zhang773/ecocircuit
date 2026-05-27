import { useState } from "react";
import { motion } from "framer-motion";
import { SectionShell } from "./SectionShell";

const CHOICES = [
  { id: "renew", title: "Renewable-powered fabs", impact: 30, label: "Solar + wind for chip fabs" },
  { id: "reuse", title: "Modular, repairable hardware", impact: 22, label: "Design for upgrade, not replacement" },
  { id: "recycle", title: "Closed-loop recycling", impact: 18, label: "Recover 95% of critical minerals" },
  { id: "model", title: "Smaller, smarter models", impact: 25, label: "Distillation beats brute force" },
];

const POLL = [
  { label: "Yes, urgently", v: 62 },
  { label: "Somewhat", v: 28 },
  { label: "Not sure", v: 10 },
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
                  <div className="text-xs uppercase tracking-widest text-neon">−{c.impact}% impact</div>
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
            <div className="text-xs uppercase tracking-widest text-neon">community poll</div>
            <div className="mt-1 text-sm">Should AI hardware emissions be disclosed?</div>
            <div className="mt-4 space-y-3">
              {POLL.map((p) => (
                <div key={p.label}>
                  <div className="flex items-center justify-between text-xs">
                    <span>{p.label}</span>
                    <span className="font-mono text-neon">{p.v}%</span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-surface-2">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${p.v}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1 }}
                      className="h-full bg-neon"
                    />
                  </div>
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