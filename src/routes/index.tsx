import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/lifecycle/Hero";
import { MaterialExtraction } from "@/components/lifecycle/MaterialExtraction";
import { Manufacturing } from "@/components/lifecycle/Manufacturing";
import { Distribution } from "@/components/lifecycle/Distribution";
import { EWaste } from "@/components/lifecycle/EWaste";
import { Reflection } from "@/components/lifecycle/Reflection";
import { ProgressNav } from "@/components/lifecycle/ProgressNav";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Silicon Footprint — The hidden cost of AI hardware" },
      { name: "description", content: "An interactive exhibit on the environmental life cycle of AI hardware — from raw earth to e-waste." },
      { property: "og:title", content: "Silicon Footprint — The hidden cost of AI hardware" },
      { property: "og:description", content: "Explore extraction, fabrication, distribution and e-waste behind the chips powering AI." },
    ],
  }),
  component: Index,
});

function Index() {
  const [sessionKey, setSessionKey] = useState(0);

  const start = () => {
    document.getElementById("extraction")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleRestart = () => {
    setSessionKey((k) => k + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <ProgressNav key={`nav-${sessionKey}`} />
      <Hero onStart={start} />
      <MaterialExtraction key={`ext-${sessionKey}`} />
      <Manufacturing key={`mfg-${sessionKey}`} />
      <Distribution key={`dist-${sessionKey}`} />
      <EWaste key={`ew-${sessionKey}`} />
      <Reflection key={`ref-${sessionKey}`} onRestart={handleRestart} />
      <footer className="border-t border-neon/10 py-10 text-center text-xs text-muted-foreground">
        <div className="font-mono uppercase tracking-widest">silicon footprint · interactive exhibit · v1.0</div>
        <div className="mt-2">Figures from &quot;The Hidden Costs of AI: Hardware Production &amp; Supply Chains&quot; · UCSD, 2026</div>
      </footer>
    </main>
  );
}
