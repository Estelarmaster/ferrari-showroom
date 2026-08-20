import { motion } from "framer-motion";
import { ConfiguratorPanel } from "../components/ui/ConfiguratorPanel";
import { LazyCarScene } from "../components/3d/LazyCarScene";
import { useStore } from "../store/useStore";

export function Configurator() {
  const openConfigurator = useStore((s) => s.openConfigurator);

  return (
    <section id="configurator" className="bg-black px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="kicker">Build Yours</p>
            <h2 className="mt-2 font-display text-4xl text-white sm:text-5xl">CONFIGURE YOUR FERRARI</h2>
          </motion.div>
          <button
            onClick={openConfigurator}
            className="border border-white/30 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-white transition-colors hover:border-[var(--color-rosso)] hover:text-[var(--color-rosso-bright)]"
          >
            Enter Fullscreen Configurator
          </button>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div className="h-[28rem] border border-white/10 bg-[#050505]">
            <LazyCarScene showHotspots={false} shadows={false} dpr={[1, 1.5]} />
          </div>
          <ConfiguratorPanel />
        </div>
      </div>
    </section>
  );
}
