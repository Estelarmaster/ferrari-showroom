import { motion } from "framer-motion";
import { flagshipVehicle } from "../data/vehicles";
import { AnimatedNumber } from "../components/ui/AnimatedNumber";
import { PerformanceChart } from "../components/ui/PerformanceChart";

const stats = [
  { value: 1200, decimals: 0, label: "HP", key: "power" },
  { value: 2.15, decimals: 2, label: "0–100 KM/H", key: "accel" },
  { value: 350, decimals: 0, label: "KM/H", key: "top" },
  { value: 6, decimals: 0, label: "V6 HYBRID", key: "engine", noAnimate: true },
];

export function Performance() {
  return (
    <section id="performance" className="bg-[var(--color-carbon-light)] px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 max-w-2xl">
          <p className="kicker">{flagshipVehicle.name}</p>
          <h2 className="mt-2 font-display text-4xl text-white sm:text-5xl">ENGINEERED FOR PERFORMANCE</h2>
        </motion.div>

        <div className="mb-20 grid grid-cols-2 gap-8 border-y border-white/10 py-10 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.key} className="text-center">
              <p className="font-display text-5xl text-white sm:text-6xl">
                {s.noAnimate ? "V6" : <AnimatedNumber value={s.value} decimals={s.decimals} />}
              </p>
              <p className="kicker mt-2">{s.label}</p>
            </div>
          ))}
        </div>

        <PerformanceChart />
      </div>
    </section>
  );
}
