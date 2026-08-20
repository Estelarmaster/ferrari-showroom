import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PanelRightClose, PanelRightOpen, X } from "lucide-react";
import { useStore } from "../../store/useStore";
import { CarScene } from "../3d/CarScene";
import { ConfiguratorPanel } from "./ConfiguratorPanel";

export function FullscreenConfigurator() {
  const isOpen = useStore((s) => s.isConfiguratorOpen);
  const closeConfigurator = useStore((s) => s.closeConfigurator);
  const [panelOpen, setPanelOpen] = useState(true);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex flex-col bg-black lg:flex-row"
          role="dialog"
          aria-modal="true"
          aria-label="Fullscreen configurator"
        >
          <div className="relative flex-1">
            <CarScene showHotspots={false} />
            <div className="absolute left-4 top-4 flex gap-2">
              <button
                onClick={closeConfigurator}
                aria-label="Close configurator"
                className="flex h-10 w-10 items-center justify-center border border-white/20 bg-black/60 text-white backdrop-blur"
              >
                <X size={18} />
              </button>
              <button
                onClick={() => setPanelOpen((v) => !v)}
                aria-label={panelOpen ? "Hide panel" : "Show panel"}
                className="hidden h-10 w-10 items-center justify-center border border-white/20 bg-black/60 text-white backdrop-blur lg:flex"
              >
                {panelOpen ? <PanelRightClose size={18} /> : <PanelRightOpen size={18} />}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {panelOpen && (
              <motion.aside
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 40, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="w-full overflow-y-auto border-t border-white/10 bg-[var(--color-steel)] p-6 lg:h-full lg:w-[26rem] lg:border-l lg:border-t-0"
              >
                <ConfiguratorPanel compact />
              </motion.aside>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
