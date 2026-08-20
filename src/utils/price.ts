import { caliperOptions, exteriorColors, interiorOptions, optionsPackagePrice, wheelOptions } from "../data/configOptions";
import type { CarConfig } from "../store/useStore";

export function priceBreakdown(basePrice: number, config: CarConfig) {
  const color = exteriorColors.find((c) => c.id === config.color) ?? exteriorColors[0];
  const wheel = wheelOptions.find((w) => w.id === config.wheel) ?? wheelOptions[0];
  const caliper = caliperOptions.find((c) => c.id === config.caliper) ?? caliperOptions[0];
  const interior = interiorOptions.find((i) => i.id === config.interior) ?? interiorOptions[0];

  const lines = [
    { label: "Base Vehicle", value: basePrice },
    { label: `Exterior — ${color.label}`, value: color.price },
    { label: `Wheels — ${wheel.label}`, value: wheel.price },
    { label: `Brake Calipers — ${caliper.label}`, value: caliper.price },
    { label: `Interior — ${interior.label}`, value: interior.price },
    { label: "Options Package", value: optionsPackagePrice },
  ];

  const total = lines.reduce((sum, l) => sum + l.value, 0);
  return { lines, total };
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}
