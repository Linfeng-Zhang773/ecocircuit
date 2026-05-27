import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const SECTIONS = [
  { id: "extraction", label: "Extraction" },
  { id: "manufacturing", label: "Manufacturing" },
  { id: "distribution", label: "Distribution" },
  { id: "ewaste", label: "E-Waste" },
  { id: "reflection", label: "Reflection" },
];

export function ProgressNav() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState<string>("extraction");
  const [visited, setVisited] = useState<Set<string>>(new Set());

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const p = h.scrollTop / (h.scrollHeight - h.clientHeight);
      setProgress(Math.min(1, Math.max(0, p)));
      let current = active;
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.4) current = s.id;
      }
      setActive(current);
      setVisited((prev) => new Set(prev).add(current));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [active]);

  const pct = Math.round((visited.size / SECTIONS.length) * 100);

  return (
    <>
      {/* Top progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-transparent">
        <motion.div
          className="h-full bg-gradient-to-r from-neon via-toxic to-neon neon-glow"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Side rail */}
      <aside className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 md:block">
        <div className="glass-strong rounded-2xl p-4">
          <div className="mb-3 text-[9px] uppercase tracking-widest text-neon text-center">
            journey · {pct}%
          </div>
          <ul className="space-y-3">
            {SECTIONS.map((s, i) => {
              const on = active === s.id;
              const done = visited.has(s.id);
              return (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="group flex items-center gap-3"
                  >
                    <span
                      className={`relative grid h-6 w-6 place-items-center rounded-full border text-[9px] font-mono transition ${
                        on
                          ? "border-neon bg-neon text-primary-foreground neon-glow"
                          : done
                          ? "border-neon/60 text-neon"
                          : "border-muted-foreground/40 text-muted-foreground"
                      }`}
                    >
                      {done && !on ? "✓" : i + 1}
                    </span>
                    <span
                      className={`text-[11px] opacity-0 transition group-hover:opacity-100 ${
                        on ? "opacity-100 text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {s.label}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
          {pct === 100 && (
            <div className="mt-4 rounded-lg bg-neon/15 px-2 py-1 text-center text-[9px] uppercase tracking-widest text-neon">
              ★ complete
            </div>
          )}
        </div>
      </aside>
    </>
  );
}