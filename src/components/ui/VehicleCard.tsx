import { motion } from "framer-motion";
import type { Vehicle } from "../../data/vehicles";
import { formatCurrency } from "../../utils/price";
import { useStore } from "../../store/useStore";

export function VehicleCard({ vehicle, index }: { vehicle: Vehicle; index: number }) {
  const openVehicleDetail = useStore((s) => s.openVehicleDetail);
  const setCursorLabel = useStore((s) => s.setCursorLabel);
  const isTouchDevice = useStore((s) => s.isTouchDevice);

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden border border-white/10 bg-[var(--color-steel)]"
      onMouseEnter={() => !isTouchDevice && setCursorLabel("EXPLORE")}
      onMouseLeave={() => setCursorLabel(null)}
    >
      <div className="relative flex h-56 items-center justify-center overflow-hidden bg-gradient-to-br from-[#1c1c1e] to-[#050505]">
        <svg
          viewBox="0 0 240 100"
          className="h-24 w-auto text-white/25 transition-transform duration-700 ease-out group-hover:scale-110"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M10 70 Q20 45 55 40 L90 25 Q120 15 150 25 L185 40 Q215 45 230 70 L225 78 L15 78 Z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle cx="55" cy="78" r="14" stroke="currentColor" strokeWidth="2" />
          <circle cx="185" cy="78" r="14" stroke="currentColor" strokeWidth="2" />
        </svg>
        {vehicle.has3d && (
          <span className="absolute left-3 top-3 border border-[var(--color-rosso)] px-2 py-1 text-[9px] uppercase tracking-[0.2em] text-[var(--color-rosso-bright)]">
            3D Interactive
          </span>
        )}
      </div>

      <div className="space-y-4 p-6">
        <div>
          <p className="kicker">{vehicle.category}</p>
          <h3 className="mt-1 text-3xl text-white">{vehicle.name}</h3>
        </div>

        <dl className="grid grid-cols-3 gap-2 text-center">
          <div>
            <dt className="kicker text-[9px]">Power</dt>
            <dd className="mt-1 text-sm font-semibold text-white">{vehicle.spec.power} HP</dd>
          </div>
          <div>
            <dt className="kicker text-[9px]">0–100</dt>
            <dd className="mt-1 text-sm font-semibold text-white">{vehicle.spec.zeroToHundred}s</dd>
          </div>
          <div>
            <dt className="kicker text-[9px]">Top Speed</dt>
            <dd className="mt-1 text-sm font-semibold text-white">{vehicle.spec.topSpeed} km/h</dd>
          </div>
        </dl>

        <div className="flex items-center justify-between border-t border-white/10 pt-4">
          <div>
            <p className="kicker text-[9px]">From</p>
            <p className="text-sm font-semibold text-white">{formatCurrency(vehicle.priceFrom)}</p>
          </div>
          <button
            type="button"
            onClick={() => openVehicleDetail(vehicle.id)}
            className="border border-white/30 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-white transition-all group-hover:border-[var(--color-rosso)] group-hover:text-[var(--color-rosso-bright)]"
          >
            Explore
          </button>
        </div>
      </div>
    </motion.article>
  );
}
