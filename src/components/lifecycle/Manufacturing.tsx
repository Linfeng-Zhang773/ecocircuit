import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SectionShell, StatCard, GlossaryTerm, InfoBlock } from "./SectionShell";

const STEPS = [
  { id: "wafer", name: "Wafer slicing", energy: 12, water: 800, detail: "Pure silicon ingots are sliced into 300mm wafers under nitrogen atmosphere." },
  { id: "litho", name: "Photolithography", energy: 38, water: 1200, detail: "EUV machines etch billions of transistors using 13.5nm light." },
  { id: "dope", name: "Doping & etching", energy: 22, water: 600, detail: "Ion implantation and plasma etch sculpt 3D transistor geometry." },
  { id: "pack", name: "Packaging", energy: 8, water: 200, detail: "Dies are encased in ceramic / polymer, micro-bonded to substrate." },
  { id: "test", name: "Test & burn-in", energy: 14, water: 100, detail: "Every chip is stress-tested at extreme temperatures." },
];

const TPUS = [
  { id: "v4i", name: "TPU v4i", mfg: 285, embodied: 386 },
  { id: "v5e", name: "TPU v5e", mfg: 285, embodied: 402 },
  { id: "v4", name: "TPU v4", mfg: 513, embodied: 693 },
  { id: "v6e", name: "TPU v6e", mfg: 523, embodied: 692 },
  { id: "v5p", name: "TPU v5p", mfg: 796, embodied: 1010 },
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
  const [gen, setGen] = useState(4);
  const tpu = TPUS[gen];

  return (
    <SectionShell
      id="manufacturing"
      index={2}
      kicker="Section 02 · Manufacturing"
      title="Turning Materials into Hardware"
      description="A single fab consumes roughly 38 million litres of ultra-pure water a day. In 2020 Taiwan's chip sector used more electricity than the whole island generated from renewables, on a grid still ~45% coal."
    >
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Pipeline */}
        <div className="lg:col-span-3 glass rounded-3xl p-6">
          <div className="flex items-center justify-between text-xs uppercase tracking-widest text-muted-foreground">
            <span>Fab pipeline · click a step</span>
            <span className="font-mono text-neon">online</span>
          </div>

          <div className="mt-6 relative">
            <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-neon/40 to-transparent" />
            <div className="relative grid grid-cols-5 gap-2">
              {STEPS.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setActive(i)}
                  className={`relative flex flex-col items-center gap-3 rounded-xl p-3 transition ${active === i ? "bg-neon/10 neon-border" : "hover:bg-surface-2"
                    }`}
                >
                  <div
                    className={`grid h-12 w-12 place-items-center rounded-lg font-mono text-sm ${active === i ? "bg-neon text-primary-foreground neon-glow" : "bg-surface-2 text-neon"
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
            <div className="text-xs uppercase tracking-widest text-neon">Per-chip footprint · Google TPU LCA</div>
            <h3 className="mt-2 text-xl font-semibold">{tpu.name}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {TPUS.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => setGen(i)}
                  className={`rounded-full px-3 py-1.5 text-xs font-mono transition ${gen === i ? "bg-neon text-primary-foreground neon-glow" : "bg-surface-2 text-neon hover:bg-neon/10"
                    }`}
                >
                  {t.name}
                </button>
              ))}
            </div>
            <div className="mt-5 flex items-end justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Manufacturing CO₂e</div>
                <div className="text-3xl neon-text font-mono">{tpu.mfg}<span className="text-sm"> kg</span></div>
              </div>
              <div className="text-right">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">6-yr embodied</div>
                <div className="text-xl font-mono">{tpu.embodied.toLocaleString()} kg</div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <StatCard value="63%" label="Global IC foundry output" hint="Taiwan, 2021" />
            <StatCard value="70.6M m³" label="TSMC water use, 2015–20" hint="+108% in 6 years" />
          </div>
        </div>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <InfoBlock title="Scale & Market Concentration" citations={[2, 3, 11]}>
          <p>The global semiconductor market reached <strong>$550 billion</strong> in 2021, growing 26.2% year-over-year, with wafer fabrication alone accounting for $107.5 billion. AI accelerator hardware is one of the fastest-growing segments: peak FLOPs in Google's TPU line climbed roughly <strong>7× between TPU v4i (2020) and v6e (2024)</strong>, while manufacturing emissions per chip grew 1.5 to 4× higher than earlier literature had assumed.</p>
          <p>As electricity grids get cleaner, manufacturing's share of a chip's total lifetime emissions grows. In a hypothetical 90% carbon-free energy scenario, operational and embodied emissions would each make up roughly <strong>half</strong> of lifetime emissions. This means reducing manufacturing emissions is as important as running data centers on clean power, and harder because no single company can solve it alone.</p>
        </InfoBlock>

        <InfoBlock title="Taiwan: The World's Chip Floor" citations={[2, 11]}>
          <p>Taiwan produced <strong>63% of global IC foundry output</strong> in 2021, and <GlossaryTerm term="TSMC" definition="Taiwan Semiconductor Manufacturing Company, the world's largest dedicated chip foundry. As of mid-2025 it holds ~67.6% of global foundry revenue." />'s market share has since risen to ~67.6% (mid-2025). This geographic concentration means environmental burdens are also concentrated in a small, densely populated territory. Taiwan's energy mix in 2020 was 45.3% coal and only 5.9% renewables, yet the electronics subsector consumed 50.73 TWh that year, more than three times Taiwan's total renewable electricity generation.</p>
          <p>Water stress is equally acute. TSMC's water consumption grew <strong>108% between 2015 and 2020</strong>, reaching 70.6 million cubic metres. TSMC factories draw ~10.3% of the daily supply from local reservoirs. During the 2020–2021 drought, TSMC trucked in hundreds of water tankers to keep fabs running while national household water restrictions were imposed across the island.</p>
        </InfoBlock>

        <InfoBlock title="Emissions Are Growing, Not Shrinking" citations={[1, 3]}>
          <p>Newer AI chips are <strong>more carbon-intensive in absolute terms</strong>, even as computational efficiency improves. The TPU v5p emits 796 kg CO₂e in manufacturing, nearly 2.8× the TPU v4i's 285 kg. <GlossaryTerm term="Memory" definition="HBM (High Bandwidth Memory) and DRAM modules attached to AI accelerators. Memory accounts for ~38% of total manufacturing CO₂e in Google's TPU analysis, often overlooked compared to the chip itself." /> accounts for ~38% of total manufacturing emissions; the TPU v6e's higher footprint partly reflects a 3× increase in host DRAM, from 512 GB to 1,536 GB.</p>
          <p>Fabrication also uses <GlossaryTerm term="perfluorocarbon gases" definition="PFCs including SF₆, NF₃, CF₄, and CHF₃, used for chip etching and chamber cleaning. These are potent greenhouse gases with global warming potentials thousands of times higher than CO₂. If not abated, they vent to the atmosphere." /> (SF₆, NF₃, CF₄) for etching and chamber cleaning. Even with improved abatement, from 95% to 99% efficiency, electricity-related Scope 2 emissions grow as semiconductor demand expands. As grids decarbonize, manufacturing's share of a chip's lifetime footprint will only increase, making supply-chain decarbonization critical.</p>
        </InfoBlock>
      </div>

      <div className="mt-6">
        <InfoBlock title="Mitigation Pathways" citations={[1, 4]}>
          <p><GlossaryTerm term="Compute Carbon Intensity" definition="CCI, measured in grams of CO₂ equivalent per ExaFLOP. Tracks how much carbon it costs to run a given amount of computation. Lower is better. Improved 3× from TPU v4i to v6e in just 4 years." /> (CCI) improved 3× from TPU v4i to v6e over four years. Combined hardware improvements, 90% carbon-free energy, and software gains could plausibly deliver <strong>~20× reduction in carbon per AI workload</strong>. Nanofiltration membranes achieve over 97% rejection of <GlossaryTerm term="PFAS" definition="Per- and polyfluoroalkyl substances, 'forever chemicals' used in semiconductor etching. They persist in water and soil for centuries and are linked to cancer, immune disruption, and developmental harm in communities near fabs." /> from semiconductor fabrication wastewater, with 90% water recovery at pilot scale. Google's Zero Waste to Landfill strategy targets material recovery, which can offset embodied emissions by up to 4% in closed-loop systems.</p>
          <p>Policy interventions could include: mandating environmental impact assessments before new fab construction; requiring disclosure of <em>location-based</em> emissions data (rather than headquarters-level totals, which obscure the true footprint of coal-heavy grids like Taiwan's); and international cooperation to decarbonize the entire semiconductor supply chain, not just the companies that sell the finished chips.</p>
        </InfoBlock>
      </div>
    </SectionShell>
  );
}
