import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@react-three/drei";
import { useStore } from "../../store/useStore";

export function Loader() {
  const { progress, active } = useProgress();
  const loaded = useStore((s) => s.loaded);
  const setLoaded = useStore((s) => s.setLoaded);
  const setLoadProgress = useStore((s) => s.setLoadProgress);

  const pct = Math.round(progress);

  useEffect(() => {
    setLoadProgress(pct);
    if (!active && pct >= 100 && !loaded) {
      const t = setTimeout(() => setLoaded(true), 500);
      return () => clearTimeout(t);
    }
    if (!active && !loaded) {
      const t = setTimeout(() => setLoaded(true), 900);
      return () => clearTimeout(t);
    }
  }, [active, pct, loaded, setLoaded, setLoadProgress]);

  return (
    <AnimatePresence>
      {!loaded && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black"
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
        >
          <motion.h1
            className="font-display text-4xl tracking-[0.3em] text-white sm:text-6xl"
            initial={{ opacity: 0, letterSpacing: "0.6em" }}
            animate={{ opacity: 1, letterSpacing: "0.3em" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            FERRARI
          </motion.h1>
          <p className="kicker mt-4">Loading Experience</p>

          <div className="mt-10 h-px w-64 overflow-hidden bg-white/10 sm:w-96">
            <motion.div
              className="h-full bg-[var(--color-rosso)]"
              initial={{ width: "0%" }}
              animate={{ width: `${pct}%` }}
              transition={{ ease: "easeOut", duration: 0.3 }}
            />
          </div>
          <p className="mt-4 font-display text-2xl text-white tabular-nums">{pct}%</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
