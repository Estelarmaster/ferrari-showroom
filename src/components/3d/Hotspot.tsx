import { Html } from "@react-three/drei";
import { useStore } from "../../store/useStore";

export interface HotspotData {
  id: string;
  label: string;
  position: [number, number, number];
  description: string;
}

export const carHotspots: HotspotData[] = [
  { id: "aero", label: "AERODYNAMICS", position: [0, 0.75, 1.2], description: "Active front flaps and underbody channels generate high-speed downforce without adding drag." },
  { id: "engine", label: "V12 ENGINE", position: [0.9, 0.55, -0.6], description: "A naturally aspirated powertrain engineered for immediate throttle response and a spine-tingling redline." },
  { id: "carbon", label: "CARBON FIBRE", position: [-0.95, 0.4, 0.4], description: "Autoclave-cured carbon fibre body panels shave critical kilograms from the chassis." },
  { id: "brakes", label: "BRAKING SYSTEM", position: [1.05, 0.05, 1.5], description: "Carbon-ceramic discs paired with track-tuned calipers for repeatable, fade-free stopping power." },
  { id: "suspension", label: "ACTIVE SUSPENSION", position: [-1.05, -0.05, -1.5], description: "Adaptive dampers read the road in real time, balancing comfort and cornering precision." },
];

export function Hotspot({ data }: { data: HotspotData }) {
  const activeHotspot = useStore((s) => s.activeHotspot);
  const setActiveHotspot = useStore((s) => s.setActiveHotspot);
  const isActive = activeHotspot === data.id;

  return (
    <Html position={data.position} center distanceFactor={8} zIndexRange={[10, 0]} occlude={false}>
      <button
        type="button"
        aria-label={`View details: ${data.label}`}
        aria-expanded={isActive}
        onClick={(e) => {
          e.stopPropagation();
          setActiveHotspot(isActive ? null : data.id);
        }}
        className="group relative flex items-center"
      >
        <span
          className={`h-3 w-3 rounded-full border transition-all ${
            isActive ? "scale-150 border-[var(--color-rosso-bright)] bg-[var(--color-rosso-bright)]" : "border-white/80 bg-[var(--color-rosso)] animate-pulse"
          }`}
        />
        {isActive && (
          <div className="absolute left-5 top-1/2 w-56 -translate-y-1/2 rounded-md border border-white/10 bg-black/90 p-3 text-left shadow-xl backdrop-blur">
            <p className="kicker mb-1 text-[var(--color-rosso-bright)]">{data.label}</p>
            <p className="text-xs leading-relaxed text-zinc-300">{data.description}</p>
          </div>
        )}
      </button>
    </Html>
  );
}
