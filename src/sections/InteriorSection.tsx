import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "../store/useStore";
import { LazyCarScene } from "../components/3d/LazyCarScene";

const cabinHotspots = [
  { id: "wheel", label: "Steering Wheel", info: "Formula-derived wheel with integrated manettino and shift lights." },
  { id: "dash", label: "Digital Cluster", info: "Fully digital instrumentation reconfigures per drive mode." },
  { id: "seats", label: "Seats", info: "Carbon-shell racing seats trimmed by hand in the selected interior finish." },
  { id: "infotainment", label: "Infotainment", info: "Passenger-side display keeps everyone connected to the drive." },
];

export function InteriorSection() {
  const setCameraView = useStore((s) => s.setCameraView);
  const cameraView = useStore((s) => s.cameraView);
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="bg-[var(--color-carbon-light)] px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="kicker">Cabin</p>
            <h2 className="mt-2 font-display text-4xl text-white sm:text-5xl">ENTER THE CABIN</h2>
          </div>
          <button
            onClick={() => setCameraView(cameraView === "interior" ? "front" : "interior")}
            className="border border-white/30 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-white transition-colors hover:border-[var(--color-rosso)] hover:text-[var(--color-rosso-bright)]"
          >
            {cameraView === "interior" ? "Exit Cabin View" : "Enter the Cabin"}
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="h-96 border border-white/10 bg-black">
            <LazyCarScene showHotspots={false} shadows={false} dpr={[1, 1.5]} />
          </div>

          <div className="space-y-2">
            {cabinHotspots.map((h) => (
              <div key={h.id} className="border border-white/10">
                <button
                  onClick={() => setActive(active === h.id ? null : h.id)}
                  aria-expanded={active === h.id}
                  className="flex w-full items-center justify-between px-4 py-3 text-left text-sm uppercase tracking-[0.15em] text-white"
                >
                  {h.label}
                  <span className="text-[var(--color-rosso-bright)]">{active === h.id ? "−" : "+"}</span>
                </button>
                <AnimatePresence>
                  {active === h.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="px-4 pb-4 text-sm text-zinc-400">{h.info}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
