import { useState } from "react";
import { motion } from "framer-motion";
import { SectionShell, StatCard, GlossaryTerm, InfoBlock } from "./SectionShell";

const HOTSPOTS = [
  { id: "drc", name: "DR Congo", material: "Cobalt", x: 53, y: 58, impact: "70% of mined cobalt · ~half of reserves", danger: "high" },
  { id: "cn", name: "China", material: "Rare earths", x: 76, y: 42, impact: "Refines ~70% · holds ~40% of reserves", danger: "high" },
  { id: "in", name: "India", material: "Silica", x: 68, y: 49, impact: "Silica mining: 10–20% silicosis in workers", danger: "high" },
  { id: "id", name: "Indonesia", material: "Nickel", x: 80, y: 62, impact: "Among 4 nations = 80% of mining deforestation", danger: "high" },
  { id: "zm", name: "Zambia", material: "Copper", x: 54, y: 66, impact: "African Copperbelt: copper & cobalt", danger: "medium" },
  { id: "br", name: "Brazil", material: "Iron ore", x: 34, y: 64, impact: "Brumadinho dam collapse: 270 killed (2019)", danger: "high" },
];

const MATERIALS = [
  { id: "co", name: "Cobalt", part: "Batteries" },
  { id: "li", name: "Lithium", part: "Power cells" },
  { id: "si", name: "Silicon", part: "Wafer" },
  { id: "cu", name: "Copper", part: "Interconnects" },
];

const MATERIAL_DEFS: Record<string, string> = {
  co: "A silvery-blue metal critical for lithium-ion battery cathodes. ~70% of the world's cobalt is mined in the DRC, often under dangerous conditions with documented child labor and water contamination.",
  li: "A soft, reactive metal that enables high energy density in rechargeable cells. Brine extraction in Chile and Argentina consumes millions of liters of water in already arid regions.",
  si: "The second most abundant element in Earth's crust, but must be refined from silica (SiO₂) into ultra-pure wafers. Mining reduces soil organic carbon by 50–70% in extraction zones.",
  cu: "An excellent electrical conductor used for chip wiring and data center infrastructure. The African Copperbelt (DRC/Zambia) is a major source, but mining is linked to water contamination and land displacement.",
};

const PART_DEFS: Record<string, string> = {
  Batteries: "Rechargeable energy storage in devices and data center backup power. Modern lithium-ion batteries require cobalt, lithium, nickel, and manganese, all mined primarily in the Global South.",
  "Power cells": "Individual electrochemical units within a battery pack. Lithium-ion cells offer the best energy-to-weight ratio available, making lithium one of the most contested minerals in supply chains.",
  Wafer: "A thin, circular slice of ultra-pure silicon crystal (~1mm thick) on which hundreds of chips are etched using photolithography. One 300mm wafer can yield 400+ chips.",
  Interconnects: "Microscopic copper wires linking billions of transistors on a chip. Copper replaced aluminum in the late 1990s due to its lower electrical resistance and better performance at nanometer scales.",
};

const MATERIAL_EXPLANATIONS: Record<string, string> = {
  co: "Cobalt stabilizes lithium-ion battery cathodes, preventing overheating. The DRC produces 70% of global cobalt, and extraction is linked to child labor and severe water contamination in communities near mines.",
  li: "Lithium's electrochemical properties make it ideal for rechargeable cells. Chile and Argentina hold ~60% of known reserves in salt flat brines, where extraction consumes millions of liters of water in one of Earth's driest regions.",
  si: "Pure silicon wafers are the foundation of every chip. Refining silica causes measurable land degradation and workers in silica mines face silicosis rates of 10–20% and tuberculosis co-infection rates up to 40%.",
  cu: "Copper replaced aluminum for chip interconnects due to lower resistance. Global chip and server production drives massive copper demand, and the African Copperbelt often operates with weak environmental oversight.",
};

export function MaterialExtraction() {
  const [active, setActive] = useState(HOTSPOTS[0]);
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [draggedFrom, setDraggedFrom] = useState<string | null>(null);

  const isDone = Object.keys(matches).length === MATERIALS.length;
  const correctCount = isDone
    ? Object.entries(matches).filter(([id, part]) => MATERIALS.find((m) => m.id === id)?.part === part).length
    : 0;

  return (
    <SectionShell
      id="extraction"
      index={1}
      kicker="Section 01 · Material Extraction"
      title="The Beginning of AI Hardware's Environmental Footprint"
      description={<>Every AI model runs on minerals torn from the ground. <GlossaryTerm term="Cobalt" definition="A metal critical for battery cathodes. ~70% is mined in the DRC under dangerous, exploitative conditions." />, <GlossaryTerm term="lithium" definition="Powers rechargeable cells. Brine mining in Chile and Argentina drains millions of liters of water in arid regions." />, and <GlossaryTerm term="rare earths" definition="A group of 17 elements essential for magnets, semiconductors, and displays. China refines ~70% of global supply." /> travel thousands of kilometres before becoming silicon.</>}
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
              <svg viewBox="0 0 100 50" className="absolute inset-0 h-full w-full opacity-40">
                <defs>
                  <pattern id="dots" width="1.2" height="1.2" patternUnits="userSpaceOnUse">
                    <circle cx="0.6" cy="0.6" r="0.25" fill="oklch(0.85 0.22 145 / 0.5)" />
                  </pattern>
                </defs>
                <path d="M15,15 Q20,8 30,12 L35,20 L30,28 L20,30 Z" fill="url(#dots)" />
                <path d="M40,12 L55,10 L60,18 L55,28 L45,30 L42,22 Z" fill="url(#dots)" />
                <path d="M28,32 L36,30 L38,42 L30,46 L26,40 Z" fill="url(#dots)" />
                <path d="M62,14 L82,12 L88,22 L80,30 L66,28 Z" fill="url(#dots)" />
                <path d="M78,36 L88,34 L90,42 L82,46 Z" fill="url(#dots)" />
              </svg>
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

        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
          <StatCard value="60+" label="Minerals in one device" hint="modern AI hardware" />
          <StatCard value="14B t" label="Mining tailings / year" hint="global (GTR 2020)" />
          <StatCard value="270" label="Killed, Brumadinho dam" hint="Brazil, 2019" />
          <StatCard value="10–20%" label="Silicosis in silica miners" hint="India · S. Africa · China" />
        </div>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <InfoBlock title="Geographic Concentration & the Supply Chain Divide" citations={[1, 6]}>
          <p>The <GlossaryTerm term="DRC" definition="Democratic Republic of Congo, which holds ~50% of the world's cobalt reserves and produces 70% of mined cobalt. Despite this resource wealth, the DRC remains one of the world's poorest countries." /> holds half of the world's cobalt reserves and produces 70% of mined cobalt. China refines roughly 70% of global rare earth production and holds ~40% of reserves. These countries bear the full environmental and health costs of extraction while multinational corporations headquartered in the US, EU, and Japan capture most of the economic value. One study of African mining terms this <em>"extractive imperialism"</em>: foreign capital externalizes environmental costs onto African landscapes and communities who are made to subsidize the wealth of transnational businesses.</p>
          <p>A chip's components cross international borders approximately 70 times and travel over 50,000 km before reaching a data center. Ore mined in Africa is shipped to China for refining, then sold as battery chemicals to tech firms across the West. This supply chain divide mirrors centuries of colonial resource extraction. The DRC, despite its mineral wealth, remains poverty-stricken.</p>
        </InfoBlock>

        <InfoBlock title="Tailings, Disasters & Deforestation" citations={[5, 6]}>
          <p>Mining produces more than <strong>14 billion metric tons of tailings per year</strong>: fine residues containing cyanide compounds, flotation chemicals, and heavy metals. In 2019, Brazil's Brumadinho iron ore tailings dam collapsed, killing 270 people and contaminating rivers across a wide region. In 2014, Canada's Mount Polley copper mine released 25 million cubic metres of tailings into nearby lakes and rivers, altering riverbeds and displacing communities.</p>
          <p>Indonesia, Brazil, Ghana, and Suriname account for <strong>80% of deforestation caused by industrial mining demand</strong>. In Brazil, illegal mines intentionally burn forest on Indigenous lands for access, producing pollution at two to four times above WHO recommendations and affecting tens of millions of people in the Amazon region. Indigenous communities face disproportionate health impacts due to pre-existing conditions and reduced healthcare access, worsening existing inequalities.</p>
        </InfoBlock>
      </div>

      <div className="mt-6">
        <InfoBlock title="Silica Mining, Worker Health & the Coming Mineral Crunch" citations={[6, 9, 10]}>
          <p>Silicon is the backbone of all AI chips, but refining silica into semiconductor-grade material comes at a serious environmental cost. In silica mining zones, soil organic carbon decreases by <strong>50–70%</strong> and vegetation cover drops ~65% compared to control sites. Washing and classifying silica ore requires 4,500–6,000 gallons of water per minute (6.5–8.6 million litres per day). Long-term workers face silicosis rates of <strong>10–20%</strong> and tuberculosis co-infection rates up to 40%. In India's Shankargarh region, 57 officially leased mines covering 206 acres were accompanied by illegal operations spanning more than 2,000 acres, producing barren wastelands and contaminated water.</p>
          <p>The mineral demand driven by AI is accelerating fast. By 2030, AI data centers are projected to account for approximately <strong>2% of global copper and silicon demand</strong>, over 3% for rare earth elements, and a significant <strong>11% of global gallium demand</strong>. This surge is shifting supply chain pressure from electric vehicles to AI infrastructure, with policymakers warning of potential shortages and intensified competition for resources that are already extracted under inequitable and environmentally destructive conditions.</p>
        </InfoBlock>
      </div>

      {/* Mini match game */}
      <div className="mt-10 glass rounded-3xl p-6">
        <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-widest text-neon">mini-game</div>
            <h3 className="mt-1 text-2xl font-semibold">Match raw materials to hardware systems</h3>
              <p className="mt-1 text-xs text-muted-foreground">Drag each material to its correct hardware system. Hover the names to learn more.</p>
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
            {MATERIALS.map((m) => {
              const wasMatched = !!matches[m.id];
              const isCorrect = matches[m.id] === m.part;
              return (
                <div
                  key={m.id}
                  draggable={!isDone}
                  onDragStart={() => setDraggedFrom(m.id)}
                  className={`rounded-xl border px-4 py-3 text-sm font-mono transition active:scale-95 ${
                    isDone && wasMatched
                      ? isCorrect
                        ? "border-neon bg-neon/10 text-neon opacity-60 cursor-default"
                        : "border-destructive bg-destructive/20 text-destructive-foreground opacity-60 cursor-default"
                      : wasMatched
                      ? "border-neon/30 bg-surface-2 opacity-30 cursor-default"
                      : "border-neon/30 bg-surface-2 cursor-grab"
                  }`}
                >
                  <GlossaryTerm term={m.name} definition={MATERIAL_DEFS[m.id]} />
                </div>
              );
            })}
          </div>
          <div className="space-y-3">
            {MATERIALS.map((m) => {
              const droppedId = Object.entries(matches).find(([, part]) => part === m.part)?.[0];
              const hasMatch = !!droppedId;
              const isCorrect = hasMatch && MATERIALS.find((mat) => mat.id === droppedId)?.part === m.part;
              return (
                <div
                  key={m.id}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => {
                    if (draggedFrom && !isDone)
                      setMatches((p) => ({ ...p, [draggedFrom]: m.part }));
                  }}
                  className={`rounded-xl border border-dashed px-4 py-3 text-sm transition ${
                    isDone && hasMatch
                      ? isCorrect
                        ? "border-neon bg-neon/10 text-neon"
                        : "border-destructive bg-destructive/20 text-destructive-foreground"
                      : hasMatch
                      ? "border-neon bg-neon/10 text-neon"
                      : "border-neon/30 text-muted-foreground"
                  }`}
                >
                  ▢ <GlossaryTerm term={m.part} definition={PART_DEFS[m.part]} />
                </div>
              );
            })}
          </div>
        </div>

        {isDone && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 space-y-3"
          >
            <div className="flex items-center gap-4 rounded-2xl bg-deep/60 px-6 py-4">
              <div className="font-mono text-4xl neon-text">{correctCount}/{MATERIALS.length}</div>
              <div>
                <div className="text-sm font-semibold">correct matches</div>
                <div className="text-xs text-muted-foreground">
                  {correctCount === MATERIALS.length ? "Perfect! All materials matched correctly." : `${MATERIALS.length - correctCount} incorrect. See explanations below.`}
                </div>
              </div>
            </div>
            <div className="text-xs uppercase tracking-widest text-neon mb-2 px-1">why each answer</div>
            {MATERIALS.map((m) => {
              const correct = matches[m.id] === m.part;
              return (
                <div
                  key={m.id}
                  className={`rounded-xl p-4 text-xs ${correct ? "border border-neon/20 bg-neon/5" : "border border-destructive/30 bg-destructive/5"}`}
                >
                  <div className="flex flex-wrap items-center gap-2 font-mono font-semibold mb-1">
                    <span className={correct ? "text-neon" : "text-destructive-foreground"}>
                      {correct ? "Correct:" : "Review:"} {m.name} to {m.part}
                    </span>
                    {!correct && matches[m.id] && (
                      <span className="text-muted-foreground font-normal">(you chose: {matches[m.id]})</span>
                    )}
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{MATERIAL_EXPLANATIONS[m.id]}</p>
                </div>
              );
            })}
          </motion.div>
        )}
      </div>
    </SectionShell>
  );
}
