import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SectionShell, StatCard } from "./SectionShell";

const STEPS = [
  { id: "wafer", name: "Wafer slicing", energy: 12, water: 800, detail: "Pure silicon ingots are sliced into 300mm wafers under nitrogen atmosphere." },
  { id: "litho", name: "Photolithography", energy: 38, water: 1200, detail: "EUV machines etch billions of transistors using 13.5nm light." },
  { id: "dope", name: "Doping & etching", energy: 22, water: 600, detail: "Ion implantation and plasma etch sculpt 3D transistor geometry." },
  { id: "pack", name: "Packaging", energy: 8, water: 200, detail: "Dies are encased in ceramic / polymer, micro-bonded to substrate." },
  { id: "test", name: "Test & burn-in", energy: 14, water: 100, detail: "Every chip is stress-tested at extreme temperatures." },
];

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const dur = 1200;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return (
    <span className="font-mono">
      {n.toLocaleString()}
      {suffix}
    </span>
  );
}

export function Manufacturing() {
  const [active, setActive] = useState(0);
  const [energy, setEnergy] = useState(50);

  const yearlyEmissions = Math.round(energy * 12.4);

  return (
    <SectionShell
      id="manufacturing"
      index={2}
      kicker="Chapter 02 · Fab"
      title="Inside the clean room."
      description="A modern fab consumes more power than a small city and more ultra-pure water than 30,000 homes. One wafer, thousands of process steps."
    >
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Pipeline */}
        <div className="lg:col-span-3 glass rounded-3xl p-6">
          <div className="flex items-center justify-between text-xs uppercase tracking-widest text-muted-foreground">
            <span>Fab pipeline · click a step</span>
            <span className="font-mono text-neon">● online</span>
          </div>

          <div className="mt-6 relative">
            <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-neon/40 to-transparent" />
            <div className="relative grid grid-cols-5 gap-2">
              {STEPS.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setActive(i)}
                  className={`relative flex flex-col items-center gap-3 rounded-xl p-3 transition ${
                    active === i ? "bg-neon/10 neon-border" : "hover:bg-surface-2"
                  }`}
                >
                  <div
                    className={`grid h-12 w-12 place-items-center rounded-lg font-mono text-sm ${
                      active === i ? "bg-neon text-primary-foreground neon-glow" : "bg-surface-2 text-neon"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="text-center text-[11px] leading-tight">{s.name}</div>
                </button>
              ))}
            </div>
          </div>

          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 rounded-2xl bg-deep/60 p-6"
          >
            <div className="text-xs uppercase tracking-widest text-neon">{STEPS[active].name}</div>
            <p className="mt-2 text-sm text-foreground/90">{STEPS[active].detail}</p>
            <div className="mt-5 grid grid-cols-2 gap-4">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Energy</div>
                <div className="mt-1 text-2xl neon-text">
                  <Counter value={STEPS[active].energy} suffix=" kWh" />
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(STEPS[active].energy / 50) * 100}%` }}
                    className="h-full bg-gradient-to-r from-neon to-toxic"
                  />
                </div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Water</div>
                <div className="mt-1 text-2xl neon-text">
                  <Counter value={STEPS[active].water} suffix=" L" />
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(STEPS[active].water / 1200) * 100}%` }}
                    className="h-full bg-gradient-to-r from-chart-4 to-neon"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sliders / stats */}
        <div className="lg:col-span-2 space-y-4">
          <div className="glass rounded-3xl p-6">
            <div className="text-xs uppercase tracking-widest text-neon">Simulator</div>
            <h3 className="mt-2 text-xl font-semibold">Run a fab at {energy}% capacity</h3>
            <input
              type="range"
              min={10}
              max={100}
              value={energy}
              onChange={(e) => setEnergy(Number(e.target.value))}
              className="mt-5 w-full accent-[color:var(--neon)]"
            />
            <div className="mt-4 flex items-end justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Annual CO₂e</div>
                <div className="text-3xl neon-text font-mono">{yearlyEmissions.toLocaleString()}<span className="text-sm"> kt</span></div>
              </div>
              <div className="text-right">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">≈ flights NYC→LON</div>
                <div className="text-xl font-mono">{Math.round(yearlyEmissions * 2.3).toLocaleString()}</div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <StatCard value="100MW" label="Single fab draw" hint="Continuous" />
            <StatCard value="9 nines" label="Water purity needed" hint="99.9999999%" />
          </div>
        </div>
      </div>
    </SectionShell>
  );
}