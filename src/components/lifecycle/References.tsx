import { motion } from "framer-motion";

const REFS = [
  {
    id: 1,
    authors: "Schneider, M., Xu, H., Benecke, G., Patterson, D., Huang, N., Ranganathan, P., & Elsworth, G.",
    year: "2025",
    title: "Life-cycle emissions of AI hardware: A cradle-to-grave approach and generational trends",
    source: "Google Research",
    url: null,
  },
  {
    id: 2,
    authors: "Roussilhe, G., Pirson, T., Xhonneux, A., & Bol, D.",
    year: "2022",
    title: "From silicon shield to carbon lock-in? The environmental footprint of electronic components manufacturing in Taiwan (2015–2020)",
    source: "Preprint",
    url: null,
  },
  {
    id: 3,
    authors: "Ruberti, M.",
    year: "2023",
    title: "The chip manufacturing industry: Environmental impacts and eco-efficiency analysis",
    source: "Science of the Total Environment",
    url: null,
  },
  {
    id: 4,
    authors: "Griffin, J., Bellona, C., & Strathmann, T.",
    year: "2024",
    title: "Rejection of PFAS and priority co-contaminants in semiconductor fabrication wastewater by nanofiltration membranes",
    source: "Water Research",
    url: null,
  },
  {
    id: 5,
    authors: "Global Tailings Review",
    year: "2020",
    title: "Towards zero harm: A compendium of papers",
    source: "Towards Zero Harm Initiative",
    url: "https://globaltailingsreview.org",
  },
  {
    id: 6,
    authors: "Sovacool, B. K., et al.",
    year: "2024",
    title: "From mining to e-waste: The environmental and climate justice implications of the electronics hardware life cycle",
    source: "Annual Review of Environment and Resources",
    url: null,
  },
  {
    id: 7,
    authors: "World Health Organization",
    year: "2023",
    title: "Electronic waste (e-waste)",
    source: "WHO Fact Sheets",
    url: "https://www.who.int/news-room/fact-sheets/detail/electronic-waste-(e-waste)",
  },
  {
    id: 8,
    authors: "Global E-Waste Monitor",
    year: "2024",
    title: "The global e-waste monitor 2024",
    source: "ITU/UNITAR",
    url: "https://ewastemonitor.info/the-global-e-waste-monitor-2024/",
  },
  {
    id: 9,
    authors: "Lannelongue, L., et al.",
    year: "2024",
    title: "Carbon footprint of AI hardware and infrastructure",
    source: "Nature Computational Science",
    url: "https://www.nature.com/articles/s43588-024-00712-6",
  },
  {
    id: 10,
    authors: "Singh, P., & Verma, R.",
    year: "2020",
    title: "Impact of silica mining on environment",
    source: "Journal of Geography and Regional Planning, 13(2), 45–57",
    url: null,
  },
  {
    id: 11,
    authors: "TrendForce",
    year: "2025",
    title: "2Q25 foundry revenue surges 14.6% to record high; TSMC's market share hits 70%",
    source: "TrendForce Press Release",
    url: "https://www.trendforce.com",
  },
];

export function References() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-neon mb-8">
          <span className="font-mono">06</span>
          <span className="h-px w-10 bg-neon/50" />
          <span>Sources</span>
        </div>
        <h2 className="text-3xl font-semibold mb-2">References</h2>

        <div className="space-y-3">
          {REFS.map((r) => (
            <motion.div
              key={r.id}
              id={`ref-${r.id}`}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: r.id * 0.03 }}
              className="glass rounded-xl px-5 py-4 flex gap-4 items-start"
            >
              <span className="shrink-0 font-mono text-sm text-neon/70 w-6 pt-0.5">[{r.id}]</span>
              <div className="text-sm leading-relaxed">
                <span className="text-foreground/80">{r.authors} ({r.year}). </span>
                {r.url ? (
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neon hover:underline"
                  >
                    {r.title}
                  </a>
                ) : (
                  <em className="text-foreground/90">{r.title}</em>
                )}
                <span className="text-muted-foreground">. {r.source}.</span>
                {r.url && (
                  <span className="ml-2 text-xs text-muted-foreground font-mono break-all">{r.url}</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
