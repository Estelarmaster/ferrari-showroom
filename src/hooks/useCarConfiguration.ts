import { useMemo } from "react";
import { useStore } from "../store/useStore";
import { flagshipVehicle } from "../data/vehicles";
import { priceBreakdown } from "../utils/price";

export function useCarConfiguration() {
  const config = useStore((s) => s.config);
  const setColor = useStore((s) => s.setColor);
  const setWheel = useStore((s) => s.setWheel);
  const setCaliper = useStore((s) => s.setCaliper);
  const setInterior = useStore((s) => s.setInterior);

  const breakdown = useMemo(() => priceBreakdown(flagshipVehicle.priceFrom, config), [config]);

  return { config, setColor, setWheel, setCaliper, setInterior, breakdown };
}
