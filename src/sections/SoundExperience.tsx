import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Zap, Square } from "lucide-react";
import { startEngine, revEngine, stopEngine } from "../utils/engineSound";
import { useStore } from "../store/useStore";

export function SoundExperience() {
  const engineState = useStore((s) => s.engineState);
  const setEngineState = useStore((s) => s.setEngineState);
  const [pulse, setPulse] = useState(0);

  const handleStart = () => {
    startEngine();
    setEngineState("running");
  };
  const handleRev = () => {
    if (engineState === "idle") return;
    revEngine();
    setEngineState("revving");
    setPulse((p) => p + 1);
    setTimeout(() => setEngineState("running"), 1100);
  };
  const handleStop = () => {
    stopEngine();
    setEngineState("idle");
  };

  return (
    <section className="bg-black px-6 py-28">
      <div className="mx-auto max-w-4xl text-center">
        <p className="kicker">Sound Design</p>
        <h2 className="mt-2 font-display text-4xl text-white sm:text-5xl">LISTEN TO THE MACHINE</h2>
        <p className="mx-auto mt-4 max-w-md text-sm text-zinc-500">
          Synthesized engine audio — press start to hear the powertrain idle, then rev it.
        </p>

        <div className="mx-auto mt-12 flex h-32 max-w-xl items-end justify-center gap-1">
          {Array.from({ length: 40 }).map((_, i) => (
            <motion.span
              key={i}
              className="w-1.5 rounded-full bg-[var(--color-rosso)]"
              animate={{
                height: engineState === "idle" ? 4 : engineState === "revving" ? 20 + ((i + pulse) % 7) * 12 : 8 + ((i + pulse) % 5) * 6,
              }}
              transition={{ duration: 0.25 }}
            />
          ))}
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <button
            onClick={handleStart}
            disabled={engineState !== "idle"}
            className="flex items-center gap-2 bg-[var(--color-rosso)] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-white transition-colors hover:bg-[var(--color-rosso-bright)] disabled:opacity-30"
          >
            <Play size={14} /> Start
          </button>
          <button
            onClick={handleRev}
            disabled={engineState === "idle"}
            className="flex items-center gap-2 border border-white/30 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-white transition-colors hover:border-[var(--color-rosso)] disabled:opacity-30"
          >
            <Zap size={14} /> Rev
          </button>
          <button
            onClick={handleStop}
            disabled={engineState === "idle"}
            className="flex items-center gap-2 border border-white/30 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-white transition-colors hover:border-white disabled:opacity-30"
          >
            <Square size={14} /> Stop
          </button>
        </div>
      </div>
    </section>
  );
}
