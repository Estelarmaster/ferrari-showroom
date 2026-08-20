import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useStore } from "../../store/useStore";

export function ToastContainer() {
  const toasts = useStore((s) => s.toasts);

  return (
    <div className="pointer-events-none fixed bottom-6 left-1/2 z-[90] flex -translate-x-1/2 flex-col items-center gap-2" role="status" aria-live="polite">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2 border border-white/10 bg-black/90 px-5 py-3 text-sm text-white shadow-2xl backdrop-blur"
          >
            <CheckCircle2 size={16} className="text-[var(--color-rosso-bright)]" />
            {t.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
