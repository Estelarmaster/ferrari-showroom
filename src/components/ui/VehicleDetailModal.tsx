import { vehicles } from "../../data/vehicles";
import { formatCurrency } from "../../utils/price";
import { useStore } from "../../store/useStore";
import { Modal } from "./Modal";
import { CarScene } from "../3d/CarScene";
import { Button } from "./Button";

const specLabels: Record<string, string> = {
  year: "Year",
  engine: "Engine",
  power: "Power (HP)",
  torque: "Torque (Nm)",
  zeroToHundred: "0–100 km/h",
  topSpeed: "Top Speed (km/h)",
  weight: "Weight (kg)",
  transmission: "Transmission",
  drive: "Drive",
  fuel: "Fuel / Hybrid",
};

export function VehicleDetailModal() {
  const activeVehicleId = useStore((s) => s.activeVehicleId);
  const closeVehicleDetail = useStore((s) => s.closeVehicleDetail);
  const openConfigurator = useStore((s) => s.openConfigurator);
  const openTestDrive = useStore((s) => s.openTestDrive);

  const vehicle = vehicles.find((v) => v.id === activeVehicleId);
  if (!vehicle) return null;

  return (
    <Modal isOpen={!!vehicle} onClose={closeVehicleDetail} title={vehicle.name} size="xl">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="h-72 border border-white/10 bg-[#050505] lg:h-full">
          {vehicle.has3d ? (
            <CarScene showHotspots={false} shadows={false} dpr={[1, 1.5]} />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center">
              <svg viewBox="0 0 240 100" className="h-20 w-auto text-white/20" fill="none" aria-hidden="true">
                <path d="M10 70 Q20 45 55 40 L90 25 Q120 15 150 25 L185 40 Q215 45 230 70 L225 78 L15 78 Z" stroke="currentColor" strokeWidth="2" />
                <circle cx="55" cy="78" r="14" stroke="currentColor" strokeWidth="2" />
                <circle cx="185" cy="78" r="14" stroke="currentColor" strokeWidth="2" />
              </svg>
              <p className="kicker">3D preview available on the flagship model</p>
            </div>
          )}
        </div>

        <div>
          <p className="kicker">{vehicle.category}</p>
          <p className="mt-3 text-zinc-400">{vehicle.tagline}</p>

          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-y border-white/10 py-6">
            {Object.entries(specLabels).map(([key, label]) => (
              <div key={key}>
                <dt className="kicker text-[9px]">{label}</dt>
                <dd className="mt-1 text-sm font-semibold text-white">{vehicle.spec[key as keyof typeof vehicle.spec]}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 flex items-center justify-between">
            <div>
              <p className="kicker text-[9px]">Starting From</p>
              <p className="font-display text-2xl text-white">{formatCurrency(vehicle.priceFrom)}</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              onClick={() => {
                closeVehicleDetail();
                openConfigurator();
              }}
            >
              Configure
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                closeVehicleDetail();
                openTestDrive();
              }}
            >
              Request Test Drive
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
