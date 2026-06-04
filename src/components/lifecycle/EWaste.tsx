import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionShell, StatCard, GlossaryTerm, InfoBlock } from "./SectionShell";

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

const ITEM_DEFS: Record<string, string> = {
  phone: "Contains 60+ minerals including gold, silver, cobalt, and rare earths. Certified e-waste recyclers can recover these metals — but only 22.3% of global e-waste ever reaches formal recycling.",
  battery: "Li-ion batteries use cobalt, lithium, nickel, and manganese. Flammable electrolytes and toxic metals make them strictly regulated hazardous waste requiring specialized handling.",
  gpu: "AI companies replace GPUs every 2–4 years due to performance competition. A single data center refresh can discard thousands of units simultaneously — industrial-scale e-waste.",
  cable: "Contains copper wire, aluminum shielding, and various plastics. When discarded in landfills, copper leaches into soil and non-biodegradable plastics persist for centuries.",
  screen: "CRT (cathode ray tube) monitors contain 1.5–4 kg of lead in the glass panel, plus mercury and cadmium — making them among the most hazardous e-waste items.",
  board: "Contains recoverable gold (connectors), silver (solder), and copper (traces), but also lead solder and brominated flame retardants (BFRs) that require careful certified handling.",
};

const ITEM_EXPLANATIONS: Record<string, string> = {
  phone: "Smartphones are recyclable e-waste — certified facilities recover gold, silver, cobalt, and other metals. Remove and separately handle the battery, which is hazardous. Most phones end up in landfills or informal overseas recycling due to weak collection systems.",
  battery: "Li-ion batteries are hazardous waste — their cobalt and flammable lithium electrolytes pose fire and contamination risks. Improper disposal leaches toxic metals into groundwater and soil, affecting communities near dump sites.",
  gpu: "GPUs go to certified e-waste recyclers who recover gold, silver, and copper. AI's rapid hardware cycle means millions are discarded yearly — a systemic waste problem driven by planned obsolescence and performance competition.",
  cable: "Cables are recyclable — the copper is valuable and recoverable. Despite this, most end up in landfills. The copper slowly leaches into soil while the plastic sheathing persists for centuries.",
  screen: "CRT monitors are hazardous — the glass alone contains up to 4 kg of lead. Informal 'recycling' via acid stripping or open burning releases lead and cadmium into the environment, causing serious harm to workers and nearby communities in low-income countries.",
  board: "Motherboards go to certified e-waste recyclers for gold, silver, and copper recovery. They contain lead solder and brominated flame retardants (BFRs) — formal certified recycling is critical to prevent toxic exposure.",
};

export function EWaste() {
  const [items, setItems] = useState(ITEMS);
  const [sorted, setSorted] = useState<Record<string, string[]>>({ recycle: [], hazard: [] });
  const [drag, setDrag] = useState<string | null>(null);

  const isDone = items.length === 0;

  const correct = Object.entries(sorted).reduce((acc, [bin, ids]) => {
    return acc + ids.filter((id) => ITEMS.find((i) => i.id === id)?.bin === bin).length;
  }, 0);

  const handleReset = () => {
    setItems(ITEMS);
    setSorted({ recycle: [], hazard: [] });
    setDrag(null);
  };

  return (
    <SectionShell
      id="ewaste"
      index={4}
      kicker="Section 04 · E-Waste"
      title="The End of AI Hardware's Life Cycle"
      description={<>62 million tons of <GlossaryTerm term="e-waste" definition="Electronic waste — discarded devices, components, and infrastructure. Includes GPUs, phones, cables, batteries, and server equipment. Only 22.3% is formally recycled globally." /> leave our pockets and racks every year. Less than a quarter is formally recycled — the rest leaks heavy metals into soil and water.</>}
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
              <p className="mt-1 text-xs text-muted-foreground">Drag each item to the correct bin. Hover names to learn more.</p>
            </div>
            <div className="flex items-center gap-4">
              {isDone && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-right text-xs text-muted-foreground"
                >
                  correct
                  <div className="text-2xl font-mono neon-text">{correct}/{ITEMS.length}</div>
                </motion.div>
              )}
              <button
                onClick={handleReset}
                className="text-xs text-muted-foreground hover:text-neon"
              >
                reset
              </button>
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
                    ⚡ <GlossaryTerm term={it.name} definition={ITEM_DEFS[it.id]} />
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
                            isDone
                              ? right
                                ? "bg-neon/20 text-neon"
                                : "bg-destructive/30 text-destructive-foreground"
                              : "bg-surface-2 text-muted-foreground"
                          }`}
                        >
                          {it?.name} {isDone ? (right ? "✓" : "✗") : ""}
                        </span>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {isDone && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 space-y-2"
            >
              <div className="text-xs uppercase tracking-widest text-neon px-1">why each item belongs there</div>
              {ITEMS.map((it) => {
                const placedInBin = Object.entries(sorted).find(([, ids]) => ids.includes(it.id))?.[0];
                const correct = placedInBin === it.bin;
                const binLabel = BINS.find((b) => b.id === it.bin)?.label;
                return (
                  <div
                    key={it.id}
                    className={`rounded-xl p-3 text-xs ${correct ? "border border-neon/20 bg-neon/5" : "border border-destructive/30 bg-destructive/5"}`}
                  >
                    <div className="flex flex-wrap items-center gap-2 font-mono font-semibold mb-1">
                      <span className={correct ? "text-neon" : "text-destructive-foreground"}>
                        {correct ? "✓" : "✗"} {it.name} → {binLabel}
                      </span>
                      {!correct && placedInBin && (
                        <span className="text-muted-foreground font-normal">(you chose: {BINS.find((b) => b.id === placedInBin)?.label})</span>
                      )}
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{ITEM_EXPLANATIONS[it.id]}</p>
                  </div>
                );
              })}
            </motion.div>
          )}
        </div>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <InfoBlock title="Toxic Materials & the Recycling Myth" citations={[6, 7, 8]}>
          <p>AI hardware contains <GlossaryTerm term="lead" definition="A heavy metal used in solder on circuit boards. Causes neurological damage, especially in children. Banned from many consumer products in the EU under RoHS, but still present in older hardware." />, mercury, cadmium, <GlossaryTerm term="brominated flame retardants" definition="BFRs are added to circuit boards and plastic casings to reduce fire risk. When burned during informal recycling, they release toxic dioxins and furans that accumulate in human tissue." />, and rare earth metals. When improperly recycled or burned, these substances leak into soil, air, and water. A substantial portion of 'recycled' electronics from wealthy countries is exported to Ghana, Nigeria, and India, where workers — including children — disassemble devices by hand using <GlossaryTerm term="acid stripping" definition="A recycling method where circuit boards are dissolved in acid baths to recover gold and copper. Produces highly toxic waste streams that contaminate nearby water sources when unregulated." /> and open burning in unsafe conditions.</p>
          <p>Even when companies certify hardware as 'recycled,' this does not guarantee responsible handling. The WHO identifies informal e-waste recycling as a major source of toxic chemical exposure. Rich countries and corporations externalize disposal costs onto poorer countries with cheaper labor and weaker enforcement — the same structural pattern seen throughout the AI hardware supply chain.</p>
        </InfoBlock>

        <InfoBlock title="Planned Obsolescence & the AI Upgrade Cycle" citations={[8, 9]}>
          <p>Unlike a consumer laptop that can last 5–7 years, enterprise AI hardware is replaced every <strong>2–4 years</strong> as companies compete for GPU and TPU performance. A single data center refresh can discard thousands of hardware units simultaneously — true industrial-scale waste, distinct from consumer electronics. AI models increasingly require faster processors, more memory bandwidth, and denser infrastructure, making longevity economically undesirable for operators.</p>
          <p>The AI e-waste stream includes <GlossaryTerm term="GPUs" definition="Graphics Processing Units — the primary hardware used to train and run AI models. A single GPU cluster for large language model training may contain thousands of units, all replaced on short cycles." />, CPUs, storage drives, networking equipment, power supply systems, server racks, cooling electronics, backup battery systems, and printed circuit boards. Unlike a smartphone, these are industrial assets — one data center refresh generates the equivalent e-waste of tens of thousands of consumer devices simultaneously.</p>
        </InfoBlock>
      </div>

      <div className="mt-6">
        <InfoBlock title="Policy Responses & Potential Solutions" citations={[6, 7, 8]}>
          <p>Solutions to AI e-waste require structural intervention, not just individual recycling choices. Key approaches include: <strong>Extended Producer Responsibility (EPR)</strong> laws that hold manufacturers financially liable for end-of-life hardware; binding international rules to stop the export of e-waste to countries with weaker environmental enforcement; designing hardware explicitly for disassembly, repair, and component recovery; and mandating that companies publicly disclose the lifecycle waste footprint of their AI infrastructure.</p>
          <p>The <GlossaryTerm term="EU WEEE Directive" definition="Waste Electrical and Electronic Equipment Directive — EU legislation requiring member states to collect and recycle e-waste. Sets targets for collection rates and restricts hazardous substances in electronics sold in the EU." /> and similar national frameworks create minimum standards, but enforcement outside wealthy nations remains weak. The WHO calls for urgent global cooperation on e-waste given the severe health consequences — particularly for children in informal recycling communities who face exposure to lead, mercury, cadmium, and dioxins from open burning and acid stripping.</p>
        </InfoBlock>
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
