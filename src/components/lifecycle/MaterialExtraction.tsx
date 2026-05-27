import { useState } from "react";
import { motion } from "framer-motion";
import { SectionShell, StatCard } from "./SectionShell";

const HOTSPOTS = [
  { id: "drc", name: "DR Congo", material: "Cobalt", x: 53, y: 58, impact: "70% of global cobalt", danger: "high" },
  { id: "cl", name: "Chile", material: "Lithium", x: 28, y: 72, impact: "Salt flat brine extraction", danger: "high" },
  { id: "cn", name: "China", material: "Rare earths", x: 76, y: 42, impact: "85% of refining", danger: "medium" },
  { id: "au", name: "Australia", material: "Silicon / Lithium", x: 82, y: 70, impact: "Largest hard-rock Li source", danger: "medium" },
  { id: "id", name: "Indonesia", material: "Nickel", x: 78, y: 60, impact: "Rainforest clearance", danger: "high" },
  { id: "br", name: "Brazil", material: "Niobium", x: 36, y: 64, impact: "Strategic capacitor metal", danger: "low" },
];

const MATERIALS = [
  { id: "co", name: "Cobalt", part: "Batteries" },
  { id: "li", name: "Lithium", part: "Power cells" },
  { id: "si", name: "Silicon", part: "Wafer" },
  { id: "cu", name: "Copper", part: "Interconnects" },
];

export function MaterialExtraction() {
  const [active, setActive] = useState(HOTSPOTS[0]);
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [draggedFrom, setDraggedFrom] = useState<string | null>(null);

  return (
    <SectionShell
      id="extraction"
      index={1}
      kicker="Chapter 01 · Earth"
      title="Where your chip is born."
      description="Every model runs on minerals torn from the ground. Cobalt, lithium, silicon and a dozen rare earths travel thousands of kilometres before becoming silicon."
    >
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Map */}
        <div className="lg:col-span-3 glass rounded-3xl p-6 relative overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-20" />
          <div className="relative">
            <div className="flex items-center justify-between text-xs uppercase tracking-widest text-muted-foreground">
              <span>Global extraction map</span>
              <span className="font-mono text-neon">live · 06 hotspots</span>
            </div>
            <div className="relative mt-4 aspect-[2/1] w-full rounded-2xl border border-neon/10 bg-deep/40">
              {/* Stylized continents */}
              <svg viewBox="0 0 100 50" className="absolute inset-0 h-full w-full opacity-40">
                <defs>
                  <pattern id="dots" width="1.2" height="1.2" patternUnits="userSpaceOnUse">
                    <circle cx="0.6" cy="0.6" r="0.25" fill="oklch(0.85 0.22 145 / 0.5)" />
                  </pattern>
                </defs>
                {/* Rough continent shapes */}
                <path d="M15,15 Q20,8 30,12 L35,20 L30,28 L20,30 Z" fill="url(#dots)" />
                <path d="M40,12 L55,10 L60,18 L55,28 L45,30 L42,22 Z" fill="url(#dots)" />
                <path d="M28,32 L36,30 L38,42 L30,46 L26,40 Z" fill="url(#dots)" />
                <path d="M62,14 L82,12 L88,22 L80,30 L66,28 Z" fill="url(#dots)" />
                <path d="M78,36 L88,34 L90,42 L82,46 Z" fill="url(#dots)" />
              </svg>
              {/* Trade lines */}
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 50" preserveAspectRatio="none">
                {HOTSPOTS.map((h) => (
                  <line
                    key={h.id}
                    x1={h.x}
                    y1={h.y / 2}
                    x2="50"
                    y2="25"
                    stroke="oklch(0.85 0.22 145 / 0.25)"
                    strokeWidth="0.15"
                    strokeDasharray="0.5 0.5"
                  >
                    <animate attributeName="stroke-dashoffset" from="0" to="-10" dur="6s" repeatCount="indefinite" />
                  </line>
                ))}
              </svg>
              {HOTSPOTS.map((h) => (
                <button
                  key={h.id}
                  onClick={() => setActive(h)}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${h.x}%`, top: `${h.y}%` }}
                  aria-label={h.name}
                >
                  <span className="relative flex h-3 w-3 items-center justify-center">
                    <span className={`absolute inset-0 rounded-full ${active.id === h.id ? "bg-neon" : "bg-neon/70"} animate-ping`} />
                    <span className={`relative h-3 w-3 rounded-full ${active.id === h.id ? "bg-neon neon-glow" : "bg-neon/80"}`} />
                  </span>
                </button>
              ))}
              {/* Active label */}
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-4 left-4 glass-strong rounded-xl p-4 max-w-xs"
              >
                <div className="text-xs uppercase tracking-widest text-neon">{active.name}</div>
                <div className="mt-1 text-lg font-semibold">{active.material}</div>
                <div className="mt-1 text-xs text-muted-foreground">{active.impact}</div>
                <div className="mt-3 flex items-center gap-2 text-[10px] uppercase tracking-widest">
                  Impact
                  <span className={`rounded-full px-2 py-0.5 ${active.danger === "high" ? "bg-destructive/30 text-destructive-foreground" : active.danger === "medium" ? "bg-toxic/20 text-toxic" : "bg-neon/20 text-neon"}`}>
                    {active.danger}
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Stats column */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
          <StatCard value="40k+" label="Children in cobalt mines" hint="Amnesty Intl. estimates" />
          <StatCard value="500k L" label="Water per ton of lithium" hint="Salt flat evaporation" />
          <StatCard value="−83%" label="Local aquifer levels" hint="Atacama, Chile" />
          <StatCard value="2.5kg" label="CO₂ per kg refined Co" hint="Smelting only" />
        </div>
      </div>

      {/* Mini match game */}
      <div className="mt-10 glass rounded-3xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-widest text-neon">mini-game</div>
            <h3 className="mt-1 text-2xl font-semibold">Match raw materials → chip parts</h3>
          </div>
          <button
            onClick={() => setMatches({})}
            className="text-xs text-muted-foreground hover:text-neon"
          >
            reset
          </button>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="space-y-3">
            {MATERIALS.map((m) => (
              <div
                key={m.id}
                draggable
                onDragStart={() => setDraggedFrom(m.id)}
                className={`cursor-grab rounded-xl border border-neon/30 bg-surface-2 px-4 py-3 text-sm font-mono transition active:scale-95 ${
                  matches[m.id] ? "opacity-30" : ""
                }`}
              >
                ⛏ {m.name}
              </div>
            ))}
          </div>
          <div className="space-y-3">
            {MATERIALS.map((m) => (
              <div
                key={m.id}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => {
                  if (draggedFrom)
                    setMatches((p) => ({ ...p, [draggedFrom]: m.part }));
                }}
                className={`rounded-xl border border-dashed px-4 py-3 text-sm transition ${
                  Object.values(matches).includes(m.part)
                    ? "border-neon bg-neon/10 text-neon"
                    : "border-neon/30 text-muted-foreground"
                }`}
              >
                ▢ {m.part}
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}