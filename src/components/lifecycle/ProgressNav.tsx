import { useEffect, useState, useRef } from "react";
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
  const [active, setActive] = useState<string>("");
  const [visited, setVisited] = useState<Set<string>>(new Set());
  const [minimized, setMinimized] = useState(false);

  const readyRef = useRef(false);
  const prevScrollYRef = useRef(0);
  // Full-viewport constraint container
  const constraintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrollY = h.scrollTop;

      const p = scrollY / (h.scrollHeight - h.clientHeight);
      setProgress(Math.min(1, Math.max(0, p)));

      if (!readyRef.current) {
        if (scrollY < 10) {
          readyRef.current = true;
          prevScrollYRef.current = scrollY;
        } else {
          prevScrollYRef.current = scrollY;
          return;
        }
      }

      const goingDown = scrollY > prevScrollYRef.current;
      prevScrollYRef.current = scrollY;

      let current = "";
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top < window.innerHeight * 0.4) current = s.id;
      }
      if (current) setActive(current);

      if (goingDown && current) {
        setVisited((prev) => {
          if (prev.has(current)) return prev;
          return new Set(prev).add(current);
        });
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

      {/* Full-viewport drag boundary (invisible) */}
      <div
        ref={constraintRef}
        className="fixed inset-0 z-30 pointer-events-none"
      />

      {/* Draggable side nav */}
      <motion.aside
        drag
        dragMomentum={false}
        dragElastic={0}
        dragConstraints={constraintRef}
        whileDrag={{ scale: 1.04, opacity: 0.85 }}
        className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 md:block"
        style={{ cursor: "grab" }}
        whileTap={{ cursor: "grabbing" }}
      >
        <div className="glass-strong rounded-2xl select-none overflow-hidden">
          {/* Header row — always visible, drag target */}
          <div className="flex items-center justify-between gap-3 px-4 py-3">
            <div className="flex items-center gap-2">
              {/* Drag handle */}
              <span
                className="text-muted-foreground/50 text-base leading-none"
                title="drag to reposition"
              >
                ⠿
              </span>
              <span className="text-[9px] uppercase tracking-widest text-neon font-mono">
                journey · {pct}%
              </span>
            </div>
            {/* Minimize / expand toggle */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMinimized((v) => !v);
              }}
              className="text-muted-foreground/60 hover:text-neon transition-colors text-xs leading-none"
              title={minimized ? "expand" : "minimize"}
            >
              {minimized ? "▸" : "▾"}
            </button>
          </div>

          {/* Collapsible body */}
          <motion.div
            initial={false}
            animate={minimized ? { height: 0, opacity: 0 } : { height: "auto", opacity: 1 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div className="px-4 pb-4">
              <ul className="space-y-3">
                {SECTIONS.map((s, i) => {
                  const on = active === s.id;
                  const done = visited.has(s.id);
                  return (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="group flex items-center gap-3"
                        onClick={(e) => e.stopPropagation()}
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
          </motion.div>
        </div>
      </motion.aside>
    </>
  );
}
