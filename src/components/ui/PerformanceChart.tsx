import { useState } from "react";
import { motion } from "framer-motion";

type Metric = "power" | "torque" | "acceleration";

const datasets: Record<Metric, { label: string; unit: string; points: number[] }> = {
  power: { label: "Power", unit: "HP", points: [120, 260, 410, 560, 700, 810, 860, 800] },
  torque: { label: "Torque", unit: "Nm", points: [180, 340, 500, 640, 720, 760, 730, 680] },
  acceleration: { label: "Acceleration", unit: "m/s²", points: [3.1, 4.8, 6.2, 7.4, 8.1, 7.6, 6.4, 5.2] },
};

const rpmLabels = ["1k", "2k", "3k", "4k", "5k", "6k", "7k", "8k"];

export function PerformanceChart() {
  const [metric, setMetric] = useState<Metric>("power");
  const data = datasets[metric];
  const max = Math.max(...data.points);

  const width = 560;
  const height = 220;
  const path = data.points
    .map((p, i) => {
      const x = (i / (data.points.length - 1)) * width;
      const y = height - (p / max) * (height - 20) - 10;
      return `${i === 0 ? "M" : "L"}${x},${y}`;
    })
    .join(" ");

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2" role="tablist" aria-label="Performance metric">
        {(Object.keys(datasets) as Metric[]).map((key) => (
          <button
            key={key}
            role="tab"
            aria-selected={metric === key}
            onClick={() => setMetric(key)}
            className={`px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] transition-colors ${
              metric === key ? "bg-[var(--color-rosso)] text-white" : "border border-white/20 text-zinc-400 hover:text-white"
            }`}
          >
            {datasets[key].label}
          </button>
        ))}
      </div>

      <div className="border border-white/10 bg-[var(--color-steel)] p-6">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full" role="img" aria-label={`${data.label} curve across RPM range`}>
          <defs>
            <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-rosso)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="var(--color-rosso)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0.25, 0.5, 0.75].map((f) => (
            <line key={f} x1="0" x2={width} y1={height * f} y2={height * f} stroke="rgba(255,255,255,0.06)" />
          ))}
          <motion.path
            key={metric + "-fill"}
            d={`${path} L${width},${height} L0,${height} Z`}
            fill="url(#chartFill)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          <motion.path
            key={metric}
            d={path}
            fill="none"
            stroke="var(--color-rosso-bright)"
            strokeWidth={2.5}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          />
        </svg>
        <div className="mt-3 flex justify-between text-[10px] uppercase tracking-[0.15em] text-zinc-500">
          {rpmLabels.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </div>
        <p className="mt-2 text-right text-xs text-zinc-400">
          Peak {data.label.toLowerCase()}: <span className="font-semibold text-white">{max} {data.unit}</span>
        </p>
      </div>
    </div>
  );
}
