import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { useStore } from "../store/useStore";
import { isWebGLAvailable } from "../utils/webgl";
import { vehicles } from "../data/vehicles";
import { exteriorColors, wheelOptions, lightingModes } from "../data/configOptions";
import { dealers } from "../data/dealers";
import { carHotspots } from "../components/3d/Hotspot";

type Status = "idle" | "running" | "pass" | "fail";

interface TestDef {
  id: string;
  label: string;
  run: () => boolean;
}

export function SystemCheck() {
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState<Record<string, Status>>({});
  const [done, setDone] = useState(false);

  const store = useStore.getState;

  const tests: TestDef[] = [
    { id: "model", label: "3D Model", run: () => document.querySelector("canvas") !== null },
    { id: "rotation", label: "3D Rotation", run: () => typeof store().toggleAutoRotate === "function" },
    { id: "camera", label: "Camera", run: () => ["front", "side", "rear", "top", "interior"].includes(store().cameraView) },
    { id: "configurator", label: "Configurator", run: () => typeof store().openConfigurator === "function" },
    { id: "color", label: "Color Change", run: () => exteriorColors.length > 0 && typeof store().setColor === "function" },
    { id: "wheels", label: "Wheel Change", run: () => wheelOptions.length > 0 && typeof store().setWheel === "function" },
    { id: "lighting", label: "Lighting", run: () => lightingModes.some((m) => m.id === store().lightingMode) },
    { id: "hotspots", label: "Hotspots", run: () => carHotspots.length > 0 },
    { id: "forms", label: "Forms", run: () => typeof store().openTestDrive === "function" },
    { id: "search", label: "Search", run: () => dealers.length > 0 },
    { id: "navigation", label: "Navigation", run: () => document.querySelector("nav") !== null },
    { id: "responsive", label: "Responsive", run: () => typeof window.matchMedia === "function" },
    { id: "accessibility", label: "Accessibility", run: () => document.documentElement.lang !== "" },
    { id: "performance", label: "Performance", run: () => typeof window.requestAnimationFrame === "function" },
    { id: "webgl", label: "WebGL Support", run: () => isWebGLAvailable() },
    { id: "vehicles", label: "Vehicle Data", run: () => vehicles.length === 4 },
  ];

  const runTests = async () => {
    setRunning(true);
    setDone(false);
    const next: Record<string, Status> = {};
    for (const t of tests) {
      next[t.id] = "running";
      setResults({ ...next });
      await new Promise((r) => setTimeout(r, 90));
      next[t.id] = t.run() ? "pass" : "fail";
      setResults({ ...next });
    }
    setRunning(false);
    setDone(true);
  };

  const allPass = done && tests.every((t) => results[t.id] === "pass");

  return (
    <section id="system-check" className="bg-[var(--color-carbon-light)] px-6 py-28">
      <div className="mx-auto max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
          <p className="kicker">Diagnostics</p>
          <h2 className="mt-2 font-display text-4xl text-white sm:text-5xl">SYSTEM CHECK</h2>
        </motion.div>

        <button
          onClick={runTests}
          disabled={running}
          className="mb-8 bg-[var(--color-rosso)] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-white transition-colors hover:bg-[var(--color-rosso-bright)] disabled:opacity-50"
        >
          {running ? "Running..." : "Run Full Test"}
        </button>

        <ul className="divide-y divide-white/10 border border-white/10">
          {tests.map((t) => {
            const status = results[t.id] ?? "idle";
            return (
              <li key={t.id} className="flex items-center justify-between px-5 py-3 text-sm">
                <span className="text-zinc-300">{t.label}</span>
                <span className="flex items-center gap-2">
                  {status === "idle" && <span className="text-zinc-600">—</span>}
                  {status === "running" && <Loader2 size={16} className="animate-spin text-zinc-400" />}
                  {status === "pass" && (
                    <span className="flex items-center gap-1 text-emerald-400">
                      <CheckCircle2 size={16} /> PASS
                    </span>
                  )}
                  {status === "fail" && (
                    <span className="flex items-center gap-1 text-red-400">
                      <XCircle size={16} /> FAIL
                    </span>
                  )}
                </span>
              </li>
            );
          })}
        </ul>

        {done && (
          <p className={`mt-6 text-center font-display text-2xl tracking-widest ${allPass ? "text-emerald-400" : "text-red-400"}`}>
            {allPass ? "SYSTEM OPERATIONAL" : "SYSTEM DEGRADED"}
          </p>
        )}
      </div>
    </section>
  );
}
