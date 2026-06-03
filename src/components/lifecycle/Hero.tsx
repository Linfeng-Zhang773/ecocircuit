import { motion } from "framer-motion";
import { Particles } from "./Particles";

export function Hero({ onStart }: { onStart: () => void }) {
  return (
    <section className="relative isolate flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <Particles density={70} />
      <div className="pointer-events-none absolute inset-0 circuit-bg" />

      {/* Rotating chip / globe */}
      <div className="pointer-events-none absolute right-[-10%] top-1/2 hidden -translate-y-1/2 md:block">
        <div className="relative h-[640px] w-[640px]">
          <div className="absolute inset-0 rounded-full border border-neon/20 animate-spin-slower" />
          <div className="absolute inset-10 rounded-full border border-neon/30 animate-spin-slow" />
          <div className="absolute inset-24 rounded-full border-2 border-dashed border-neon/40 animate-spin-slow" style={{ animationDirection: "reverse" }} />
          <div className="absolute inset-40 rounded-2xl glass-strong neon-glow flex items-center justify-center animate-float">
            <div className="grid grid-cols-6 gap-1 p-6">
              {Array.from({ length: 36 }).map((_, i) => (
                <div
                  key={i}
                  className="h-5 w-5 rounded-sm bg-neon/20"
                  style={{
                    boxShadow: `inset 0 0 6px oklch(0.85 0.22 145 / ${0.3 + (i % 3) * 0.2})`,
                    animation: `pulse-glow ${2 + (i % 4)}s ease-in-out infinite`,
                    animationDelay: `${i * 0.05}s`,
                  }}
                />
              ))}
            </div>
          </div>
          {/* Pins */}
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <div
              key={deg}
              className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon shadow-[0_0_12px_var(--neon)]"
              style={{ transform: `rotate(${deg}deg) translate(290px) rotate(-${deg}deg)` }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-6 md:mr-auto md:ml-[8%] md:px-0">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-neon"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-neon animate-pulse" />
          Interactive exhibit · v1.0
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-6 text-5xl font-semibold leading-[1.05] md:text-7xl"
        >
          AI Isn't Just <span className="text-gradient-neon">Digital.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 max-w-xl text-lg text-muted-foreground md:text-xl"
        >
          Explore the hidden environmental cost behind every chip, server, and
          model — from raw earth to e-waste.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <button
            onClick={onStart}
            className="group relative inline-flex items-center gap-3 rounded-full bg-neon px-7 py-3.5 text-sm font-semibold text-primary-foreground transition hover:scale-[1.03] neon-glow"
          >
            Start the Journey
            <span className="transition group-hover:translate-x-1">→</span>
          </button>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="h-px w-8 bg-neon/40" />
            5 chapters · ~4 min read · interactive
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-16 grid max-w-xl grid-cols-3 gap-3"
        >
          {[
            { v: "796 kg", l: "CO₂e to build one AI chip" },
            { v: "38M L", l: "water per chip fab, daily" },
            { v: "62 Mt", l: "global e-waste / year" },
          ].map((s) => (
            <div key={s.l} className="glass rounded-xl p-3">
              <div className="text-xl font-semibold neon-text font-mono">{s.v}</div>
              <div className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">
        <div className="flex flex-col items-center gap-2">
          <span>scroll</span>
          <span className="h-8 w-px bg-gradient-to-b from-neon to-transparent" />
        </div>
      </div>
    </section>
  );
}