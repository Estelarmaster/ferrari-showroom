import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const hotspots = [
  { id: "engine", label: "Engine", angle: 20, info: "6.5L naturally aspirated V12 delivering linear, ferocious power delivery to 9,500 RPM." },
  { id: "turbo", label: "Turbo", angle: 100, info: "Twin-turbo units on hybrid units spool near-instantly, eliminating traditional lag." },
  { id: "transmission", label: "Transmission", angle: 160, info: "8-speed dual-clutch gearbox shifts in milliseconds, tuned for both track and touring." },
  { id: "brakes", label: "Brakes", angle: 220, info: "Carbon-ceramic discs shed speed as urgently as the engine builds it." },
  { id: "exhaust", label: "Exhaust", angle: 300, info: "Titanium exhaust architecture tuned by ear across thousands of dyno hours." },
];

export function EngineSection() {
  const [active, setActive] = useState(hotspots[0].id);
  const activeData = hotspots.find((h) => h.id === active)!;

  return (
    <section className="bg-black px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 max-w-2xl">
          <p className="kicker">Powertrain</p>
          <h2 className="mt-2 font-display text-4xl text-white sm:text-5xl">THE HEART OF THE MACHINE</h2>
        </motion.div>

        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative mx-auto flex h-80 w-80 items-center justify-center">
            <motion.div
              className="absolute inset-0 rounded-full border border-white/10"
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            />
            <div className="flex h-40 w-40 items-center justify-center rounded-full border border-white/20 bg-gradient-to-br from-[#1c1c1e] to-black">
              <span className="font-display text-lg tracking-widest text-white/60">V12</span>
            </div>
            {hotspots.map((h) => {
              const rad = (h.angle * Math.PI) / 180;
              const x = 50 + Math.cos(rad) * 42;
              const y = 50 + Math.sin(rad) * 42;
              return (
                <button
                  key={h.id}
                  onClick={() => setActive(h.id)}
                  aria-pressed={active === h.id}
                  aria-label={h.label}
                  style={{ left: `${x}%`, top: `${y}%` }}
                  className={`absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all ${
                    active === h.id ? "scale-150 border-[var(--color-rosso-bright)] bg-[var(--color-rosso-bright)]" : "border-white/60 bg-[var(--color-rosso)]"
                  }`}
                />
              );
            })}
          </div>

          <div>
            <div className="mb-4 flex flex-wrap gap-2">
              {hotspots.map((h) => (
                <button
                  key={h.id}
                  onClick={() => setActive(h.id)}
                  aria-pressed={active === h.id}
                  className={`px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors ${
                    active === h.id ? "bg-[var(--color-rosso)] text-white" : "border border-white/20 text-zinc-400 hover:text-white"
                  }`}
                >
                  {h.label}
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-lg leading-relaxed text-zinc-300"
              >
                {activeData.info}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
