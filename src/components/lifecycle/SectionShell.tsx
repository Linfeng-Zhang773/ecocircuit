import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface Props {
  id: string;
  index: number;
  kicker: string;
  title: string;
  description: string;
  children: ReactNode;
}

export function SectionShell({ id, index, kicker, title, description, children }: Props) {
  return (
    <section id={id} className="relative mx-auto max-w-7xl px-6 py-28 md:py-36">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mb-14 flex items-end justify-between gap-8"
      >
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-neon">
            <span className="font-mono">0{index}</span>
            <span className="h-px w-10 bg-neon/50" />
            <span>{kicker}</span>
          </div>
          <h2 className="mt-5 text-4xl font-semibold md:text-6xl">
            {title}
          </h2>
          <p className="mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
            {description}
          </p>
        </div>
        <div className="hidden font-mono text-[10px] uppercase tracking-widest text-muted-foreground md:block">
          chapter / {index} of 5
        </div>
      </motion.div>
      {children}
    </section>
  );
}

export function StatCard({
  value,
  label,
  hint,
}: {
  value: string;
  label: string;
  hint?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass rounded-2xl p-5 transition hover:border-neon/50 hover:neon-glow"
    >
      <div className="font-mono text-3xl font-semibold neon-text">{value}</div>
      <div className="mt-2 text-sm text-foreground">{label}</div>
      {hint && <div className="mt-1 text-xs text-muted-foreground">{hint}</div>}
    </motion.div>
  );
}