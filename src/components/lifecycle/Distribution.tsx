import { useState } from "react";
import { motion } from "framer-motion";
import { SectionShell, StatCard, GlossaryTerm, InfoBlock } from "./SectionShell";
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
  { name: "Taiwan IC", co2: 63 },
  { name: "TSMC", co2: 67.6 },
  { name: "China REE", co2: 70 },
  { name: "DRC Co", co2: 70 },
];

const ROUTES = [
  { from: [53, 58], to: [76, 42], label: "DR Congo → China" },
  { from: [76, 42], to: [22, 38], label: "China → US" },
  { from: [76, 42], to: [42, 26], label: "China → EU / Japan" },
  { from: [76, 42], to: [80, 64], label: "Taiwan → Asia hubs" },
];

export function Distribution() {
  const [distance, setDistance] = useState(50000);
  const crossings = Math.round((distance / 50000) * 70);

  return (
    <SectionShell
      id="distribution"
      index={3}
      kicker="Section 03 · Distribution"
      title="The Global Supply Chain"
      description="A single chip's components travel more than 50,000 km and cross borders roughly 70 times — ore mined in Africa, refined in Asia, sold to firms in the US, EU, and Japan."
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
            <div className="text-xs uppercase tracking-widest text-neon">Chip journey</div>
            <h3 className="mt-2 text-lg font-semibold">Components travel {distance.toLocaleString()} km</h3>
            <input
              type="range"
              min={5000}
              max={50000}
              step={1000}
              value={distance}
              onChange={(e) => setDistance(Number(e.target.value))}
              className="mt-5 w-full accent-[color:var(--neon)]"
            />
            <motion.div
              key={crossings}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mt-4 text-4xl neon-text font-mono"
            >
              ~{crossings} <span className="text-sm">border crossings</span>
            </motion.div>
          </div>

          <div className="glass rounded-3xl p-6">
            <div className="text-xs uppercase tracking-widest text-neon">Supply-chain concentration (%)</div>
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

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <InfoBlock title="Who Profits, Who Pays" citations={[1, 6, 9]}>
          <p>The raw material flow of AI hardware embodies a structural divide: extraction occurs in the <GlossaryTerm term="Global South" definition="A term for lower-income nations in Africa, Latin America, and Asia that bear disproportionate environmental and labor costs of electronics production while receiving minimal economic benefit." />, while high-value refining, manufacturing, and profits concentrate in advanced economies. Nearly all Congolese cobalt is shipped to China for processing — and Chinese firms supply most of the world's refined cobalt and gallium to US and European tech companies. The DRC, despite holding half the world's cobalt reserves, remains one of the world's poorest countries.</p>
          <p>This pattern reflects what researchers call <GlossaryTerm term="extractive capitalism" definition="An economic system in which profits are maximized for investors in wealthy countries while workers, ecosystems, and communities in resource-rich but politically weak countries bear the environmental and health costs." />: profits for investors in rich countries, costs externalized onto workers and ecosystems in poor ones. A single chip's components travel over 50,000 km and cross approximately 70 international borders — yet the communities bearing the environmental cost of each border crossing rarely share in the economic gain.</p>
        </InfoBlock>

        <InfoBlock title="Data Centers & the Water Crisis" citations={[1, 6]}>
          <p>By 2030, AI data centers are projected to drive approximately <strong>2% of global copper and silicon demand</strong>, over <strong>3% for rare earth elements</strong>, and a significant <strong>11% for gallium</strong> — accelerating pressure on supply chains already under severe environmental strain. Global data centers consumed roughly <strong>800 billion litres of water in 2023</strong>, with ~140 billion litres used onsite for cooling — stressing watersheds in already water-scarce regions like Texas, Arizona, and California.</p>
          <p>A modern semiconductor fab consumes roughly <strong>38 million litres of ultra-pure water per day</strong>. This is in addition to the water consumed during mining (silica ore processing alone requires 4,500–6,000 gallons per minute). The full lifecycle water footprint of AI hardware — from mine to data center — spans continents and falls disproportionately on communities in regions already facing climate-driven water scarcity.</p>
        </InfoBlock>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard value="50,000 km" label="One chip's journey" hint="before final use" />
        <StatCard value="~70" label="Border crossings / chip" hint="globalized supply chain" />
        <StatCard value="800B L" label="Data-center water, 2023" hint="~140B L onsite cooling" />
        <StatCard value="≈100%" label="Congolese cobalt → China" hint="for refining" />
      </div>
    </SectionShell>
  );
}