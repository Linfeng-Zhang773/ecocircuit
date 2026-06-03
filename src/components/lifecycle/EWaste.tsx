import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionShell, StatCard } from "./SectionShell";

const ITEMS = [
  { id: "phone", name: "Smartphone", bin: "recycle" },
  { id: "battery", name: "Li-ion battery", bin: "hazard" },
  { id: "gpu", name: "Old GPU", bin: "recycle" },
  { id: "cable", name: "Charging cable", bin: "recycle" },
  { id: "screen", name: "CRT monitor", bin: "hazard" },
  { id: "board", name: "Motherboard", bin: "recycle" },
];

const BINS = [
  { id: "recycle", label: "Recyclable", color: "neon" },
  { id: "hazard", label: "Hazardous", color: "toxic" },
];

export function EWaste() {
  const [items, setItems] = useState(ITEMS);
  const [sorted, setSorted] = useState<Record<string, string[]>>({ recycle: [], hazard: [] });
  const [drag, setDrag] = useState<string | null>(null);

  const correct = Object.entries(sorted).reduce((acc, [bin, ids]) => {
    return acc + ids.filter((id) => ITEMS.find((i) => i.id === id)?.bin === bin).length;
  }, 0);

  return (
    <SectionShell
      id="ewaste"
      index={4}
      kicker="Chapter 04 · Afterlife"
      title="The mountain we keep building."
      description="62 million tons of e-waste leave our pockets and racks every year. Less than a quarter is formally recycled — the rest leaks heavy metals into soil and water."
    >
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Landfill visual */}
        <div className="lg:col-span-2 glass rounded-3xl p-6 relative overflow-hidden">
          <div className="text-xs uppercase tracking-widest text-toxic">global landfill</div>
          <h3 className="mt-2 text-2xl font-semibold">Toxic horizon</h3>
          <div className="relative mt-6 h-64 overflow-hidden rounded-2xl bg-deep">
            <div className="absolute inset-0 grid-bg opacity-30" />
            {Array.from({ length: 40 }).map((_, i) => {
              const left = (i * 37) % 100;
              const size = 16 + ((i * 13) % 28);
              const bottom = ((i * 7) % 50);
              return (
                <div
                  key={i}
                  className="absolute rounded-sm border border-neon/40 bg-surface-2"
                  style={{
                    left: `${left}%`,
                    bottom: `${bottom}%`,
                    width: size,
                    height: size,
                    transform: `rotate(${(i * 23) % 60 - 30}deg)`,
                    boxShadow: `0 0 ${4 + (i % 4) * 3}px oklch(0.82 0.22 120 / 0.4)`,
                  }}
                />
              );
            })}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-deep to-transparent" />
            {/* Toxic drips */}
            {[20, 55, 78].map((l, i) => (
              <motion.div
                key={l}
                className="absolute w-1 rounded-full bg-toxic/70"
                style={{ left: `${l}%`, top: 0, height: 20 }}
                animate={{ y: [0, 200], opacity: [0.8, 0] }}
                transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.7 }}
              />
            ))}
          </div>
          <div className="mt-4 flex gap-3 text-xs">
            <div className="flex-1 rounded-lg bg-deep/60 p-3">
              <div className="text-toxic font-mono text-lg">22.3%</div>
              <div className="text-muted-foreground">formally recycled</div>
            </div>
            <div className="flex-1 rounded-lg bg-deep/60 p-3">
              <div className="text-toxic font-mono text-lg">77.7%</div>
              <div className="text-muted-foreground">leaks / dumped</div>
            </div>
          </div>
        </div>

        {/* Sorting game */}
        <div className="lg:col-span-3 glass rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-widest text-neon">mini-game</div>
              <h3 className="mt-1 text-2xl font-semibold">Sort the e-waste</h3>
            </div>
            <div className="text-right text-xs text-muted-foreground">
              correct
              <div className="text-2xl font-mono neon-text">{correct}/{ITEMS.length}</div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-[1fr_2fr]">
            <div className="flex flex-wrap content-start gap-2 rounded-2xl border border-dashed border-neon/30 bg-deep/40 p-3 min-h-[12rem]">
              <AnimatePresence>
                {items.map((it) => (
                  <motion.div
                    key={it.id}
                    layout
                    exit={{ opacity: 0, scale: 0.8 }}
                    draggable
                    onDragStart={() => setDrag(it.id)}
                    className="cursor-grab rounded-lg border border-neon/40 bg-surface-2 px-3 py-2 text-xs font-mono active:scale-95"
                  >
                    ⚡ {it.name}
                  </motion.div>
                ))}
              </AnimatePresence>
              {items.length === 0 && (
                <div className="m-auto text-xs text-neon">all sorted ✓</div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3">
              {BINS.map((b) => (
                <div
                  key={b.id}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => {
                    if (!drag) return;
                    setSorted((p) => ({ ...p, [b.id]: [...p[b.id], drag] }));
                    setItems((p) => p.filter((i) => i.id !== drag));
                    setDrag(null);
                  }}
                  className={`min-h-[12rem] rounded-2xl border-2 border-dashed p-4 transition ${
                    b.color === "neon"
                      ? "border-neon/40 hover:border-neon"
                      : "border-toxic/40 hover:border-toxic"
                  }`}
                >
                  <div className={`text-xs uppercase tracking-widest ${b.color === "neon" ? "text-neon" : "text-toxic"}`}>
                    {b.label}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {sorted[b.id].map((id) => {
                      const it = ITEMS.find((i) => i.id === id);
                      const right = it?.bin === b.id;
                      return (
                        <span
                          key={id}
                          className={`rounded px-2 py-1 text-[10px] font-mono ${
                            right ? "bg-neon/20 text-neon" : "bg-destructive/30 text-destructive-foreground"
                          }`}
                        >
                          {it?.name} {right ? "✓" : "✗"}
                        </span>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard value="62 Mt" label="Global e-waste / year" hint="2022 (ITU/UNITAR)" />
        <StatCard value="22.3%" label="Formally recycled" hint="the rest dumped or burned" />
        <StatCard value="5–7 yr" label="Typical laptop lifespan" hint="enterprise AI HW replaced faster" />
        <StatCard value="Pb · Hg · Cd" label="Toxins from informal recycling" hint="open burning & acid stripping" />
      </div>
    </SectionShell>
  );
}