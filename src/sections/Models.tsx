import { motion } from "framer-motion";
import { vehicles } from "../data/vehicles";
import { VehicleCard } from "../components/ui/VehicleCard";

export function Models() {
  return (
    <section id="collection" className="bg-black px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 max-w-2xl"
        >
          <p className="kicker">Our Range</p>
          <h2 className="mt-2 font-display text-4xl text-white sm:text-5xl">THE FERRARI COLLECTION</h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {vehicles.map((v, i) => (
            <VehicleCard key={v.id} vehicle={v} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
