import { useState } from "react";
import { motion } from "framer-motion";
import { SectionShell, StatCard } from "./SectionShell";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const DATA = [
  { name: "Air", co2: 2.1 },
  { name: "Ocean", co2: 0.4 },
  { name: "Truck", co2: 1.2 },
  { name: "Rail", co2: 0.3 },
];

const ROUTES = [
  { from: [76, 42], to: [38, 30], label: "Taiwan → EU" },
  { from: [76, 42], to: [22, 38], label: "Taiwan → US" },
  { from: [22, 38], to: [38, 30], label: "US → EU" },
  { from: [76, 42], to: [80, 70], label: "Taiwan → AU" },
];

export function Distribution() {
  const [distance, setDistance] = useState(8000);
  const footprint = ((distance / 1000) * 0.6).toFixed(2);

  return (
    <SectionShell
      id="distribution"
      index={3}
      kicker="Chapter 03 · Logistics"
      title="Atoms moving the bits."
      description="Packed, palleted, flown. A single GPU may cross four continents before it lights up a data centre rack."
    >
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3 glass rounded-3xl p-6 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs uppercase tracking-widest text-muted-foreground">
            <span>Live trade routes</span>
            <span className="font-mono text-neon">04 corridors</span>
          </div>
          <div className="relative mt-4 aspect-[2/1] rounded-2xl border border-neon/10 bg-deep/40 overflow-hidden">
            <svg viewBox="0 0 100 50" className="absolute inset-0 h-full w-full opacity-30">
              <path d="M15,15 Q20,8 30,12 L35,20 L30,28 L20,30 Z" fill="oklch(0.85 0.22 145 / 0.3)" />
              <path d="M40,12 L55,10 L60,18 L55,28 L45,30 L42,22 Z" fill="oklch(0.85 0.22 145 / 0.3)" />
              <path d="M28,32 L36,30 L38,42 L30,46 L26,40 Z" fill="oklch(0.85 0.22 145 / 0.3)" />
              <path d="M62,14 L82,12 L88,22 L80,30 L66,28 Z" fill="oklch(0.85 0.22 145 / 0.3)" />
              <path d="M78,36 L88,34 L90,42 L82,46 Z" fill="oklch(0.85 0.22 145 / 0.3)" />
            </svg>
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 50" preserveAspectRatio="none">
              {ROUTES.map((r, i) => {
                const [x1, y1] = r.from;
                const [x2, y2] = r.to;
                const cx = (x1 + x2) / 2;
                const cy = Math.min(y1, y2) / 2 - 8;
                const d = `M${x1},${y1 / 2} Q${cx},${cy} ${x2},${y2 / 2}`;
                return (
                  <g key={i}>
                    <path d={d} fill="none" stroke="oklch(0.85 0.22 145 / 0.4)" strokeWidth="0.2" strokeDasharray="0.6 0.4" />
                    <circle r="0.5" fill="oklch(0.95 0.22 145)">
                      <animateMotion dur={`${4 + i}s`} repeatCount="indefinite" path={d} />
                    </circle>
                  </g>
                );
              })}
            </svg>
            <div className="absolute bottom-4 right-4 glass-strong rounded-xl p-3 text-[10px] uppercase tracking-widest">
              <div className="text-neon mb-1">corridors</div>
              {ROUTES.map((r) => (
                <div key={r.label} className="text-muted-foreground">· {r.label}</div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="glass rounded-3xl p-6">
            <div className="text-xs uppercase tracking-widest text-neon">Footprint calculator</div>
            <h3 className="mt-2 text-lg font-semibold">Ship a 2kg device {distance.toLocaleString()} km</h3>
            <input
              type="range"
              min={500}
              max={20000}
              step={500}
              value={distance}
              onChange={(e) => setDistance(Number(e.target.value))}
              className="mt-5 w-full accent-[color:var(--neon)]"
            />
            <motion.div
              key={footprint}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mt-4 text-4xl neon-text font-mono"
            >
              {footprint} <span className="text-sm">kg CO₂e</span>
            </motion.div>
          </div>

          <div className="glass rounded-3xl p-6">
            <div className="text-xs uppercase tracking-widest text-neon">kg CO₂e per ton-km</div>
            <div className="mt-3 h-44">
              <ResponsiveContainer>
                <BarChart data={DATA}>
                  <CartesianGrid stroke="oklch(0.50 0.10 150 / 0.2)" vertical={false} />
                  <XAxis dataKey="name" stroke="oklch(0.70 0.04 150)" fontSize={11} />
                  <YAxis stroke="oklch(0.70 0.04 150)" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      background: "oklch(0.18 0.025 160)",
                      border: "1px solid oklch(0.85 0.22 145 / 0.4)",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Bar dataKey="co2" fill="oklch(0.85 0.22 145)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard value="3.4Mt" label="Packaging waste / yr" hint="Consumer electronics" />
        <StatCard value="42 days" label="Avg. sea transit" hint="Asia → Europe" />
        <StatCard value="11×" label="Air vs ocean CO₂" />
        <StatCard value="68%" label="Plastic in packaging" />
      </div>
    </SectionShell>
  );
}