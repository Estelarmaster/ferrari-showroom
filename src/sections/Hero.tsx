import { motion } from "framer-motion";
import { RotateCw, RefreshCw } from "lucide-react";
import { CarScene } from "../components/3d/CarScene";
import { useStore } from "../store/useStore";
import type { CameraView } from "../store/useStore";

const views: { id: CameraView; label: string }[] = [
  { id: "front", label: "Front" },
  { id: "side", label: "Side" },
  { id: "rear", label: "Rear" },
  { id: "top", label: "Top" },
  { id: "interior", label: "Interior" },
];

export function Hero() {
  const cameraView = useStore((s) => s.cameraView);
  const setCameraView = useStore((s) => s.setCameraView);
  const autoRotate = useStore((s) => s.autoRotate);
  const toggleAutoRotate = useStore((s) => s.toggleAutoRotate);
  const resetCamera = useStore((s) => s.resetCamera);
  const openConfigurator = useStore((s) => s.openConfigurator);

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden bg-black">
      <div className="absolute inset-0">
        <CarScene enableZoom={false} />
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-24 flex flex-col items-center text-center">
        <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }} className="kicker">
          Beyond Performance
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-2 px-4 font-display text-4xl tracking-wide text-white sm:text-6xl lg:text-7xl"
        >
          BORN TO PERFORM
        </motion.h1>
      </div>

      <div className="pointer-events-auto absolute inset-x-0 bottom-8 flex flex-col items-center gap-6 px-4">
        <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Camera views">
          {views.map((v) => (
            <button
              key={v.id}
              onClick={() => setCameraView(v.id)}
              aria-pressed={cameraView === v.id}
              className={`px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] backdrop-blur transition-colors ${
                cameraView === v.id ? "bg-[var(--color-rosso)] text-white" : "border border-white/20 bg-black/30 text-zinc-300 hover:text-white"
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={toggleAutoRotate}
            aria-pressed={autoRotate}
            className={`flex items-center gap-2 border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] transition-colors ${
              autoRotate ? "border-[var(--color-rosso)] text-[var(--color-rosso-bright)]" : "border-white/20 text-zinc-300 hover:text-white"
            }`}
          >
            <RotateCw size={13} /> Auto Rotate
          </button>
          <button
            onClick={resetCamera}
            className="flex items-center gap-2 border border-white/20 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-zinc-300 transition-colors hover:text-white"
          >
            <RefreshCw size={13} /> Reset View
          </button>
          <button
            onClick={openConfigurator}
            className="bg-[var(--color-rosso)] px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-white transition-colors hover:bg-[var(--color-rosso-bright)]"
          >
            Enter Configurator
          </button>
        </div>
      </div>
    </section>
  );
}
