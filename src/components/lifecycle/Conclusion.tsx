import { motion } from "framer-motion";

const FINDINGS = [
  {
    stage: "Material Extraction",
    icon: "⛏",
    text: "Relies on mining systems rooted in extractive capitalism and historical imperialism. Environmental burdens fall disproportionately on the Global South — communities with the least political power to resist them and the least economic benefit from AI.",
  },
  {
    stage: "Manufacturing",
    icon: "⚙",
    text: "Geographically concentrated in East and Southeast Asia, where electricity grids remain fossil-fuel dependent and water stress is intensifying. Although profits distribute globally, electricity demand, water consumption, and pollution risk fall only on communities near the fab.",
  },
  {
    stage: "Distribution",
    icon: "🌐",
    text: "A chip crosses ~70 international borders and travels 50,000+ km before use. Each crossing reflects a supply chain divide: extraction in the Global South, value capture in advanced economies — a pattern that mirrors centuries of colonial resource extraction.",
  },
  {
    stage: "E-Waste",
    icon: "♻",
    text: "E-waste from rapidly obsolete AI hardware flows from wealthy consumers and corporations to informal recycling systems in lower-income countries, where toxic exposures fall on workers and communities least protected by law.",
  },
];

const POLICY_DIRECTIONS = [
  "Binding international supply-chain standards with enforceable sanctions",
  "Extended Producer Responsibility (EPR) frameworks for AI hardware",
  "Resource nationalism to ensure extraction revenues benefit host communities",
  "Mandatory lifecycle emissions and waste disclosure — location-based, not just HQ-level",
  "Design requirements for hardware repairability, longevity, and disassembly",
];

export function Conclusion() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-neon mb-6">
          <span className="font-mono">06</span>
          <span className="h-px w-10 bg-neon/50" />
          <span>Conclusion</span>
        </div>

        <h2 className="text-4xl font-semibold md:text-5xl max-w-3xl leading-tight mb-6">
          The environmental footprint of AI is not reducible to data center electricity.
        </h2>

        <p className="text-base text-muted-foreground max-w-3xl leading-relaxed mb-14">
          As this exhibit has traced, AI hardware has a cradle-to-grave lifecycle in which every stage generates significant environmental harm — and that harm is systematically concentrated in the communities and countries that benefit least from AI's economic rewards.
        </p>

        {/* Per-stage findings */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-14">
          {FINDINGS.map((f, i) => (
            <motion.div
              key={f.stage}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-2xl p-6"
            >
              <div className="text-2xl mb-3">{f.icon}</div>
              <div className="text-xs uppercase tracking-widest text-neon mb-2">{f.stage}</div>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Policy section */}
        <div className="glass rounded-3xl p-8 mb-10">
          <div className="text-xs uppercase tracking-widest text-neon mb-4">Policy Responses & the Path Forward</div>
          <p className="text-sm text-foreground/85 leading-relaxed mb-6">
            Policy responses exist but remain inadequate. Voluntary supply chain due diligence, transparency initiatives, and corporate sustainability commitments have not reversed the fundamental dynamics of extractive capitalism that structure these harms. The following directions represent more promising — though politically difficult — paths toward a circular and equitable AI hardware economy:
          </p>
          <ul className="space-y-3">
            {POLICY_DIRECTIONS.map((d, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex items-start gap-3 text-sm text-foreground/85"
              >
                <span className="shrink-0 mt-0.5 font-mono text-neon text-xs">→</span>
                {d}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Closing statement */}
        <div className="glass-strong rounded-3xl p-8 border border-neon/20">
          <p className="text-base text-foreground/90 leading-relaxed">
            <span className="text-neon font-semibold">Policy responses exist but remain inadequate.</span> Voluntary supply chain due diligence, transparency initiatives, and corporate sustainability commitments have not reversed the fundamental dynamics of extractive capitalism that structure these harms. Binding international standards, extended producer responsibility, resource nationalism, and mandatory lifecycle emissions disclosure represent more promising — though politically difficult — directions forward.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
