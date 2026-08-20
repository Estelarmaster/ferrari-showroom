import { Check } from "lucide-react";
import { exteriorColors, wheelOptions, caliperOptions, interiorOptions, lightingModes } from "../../data/configOptions";
import { useCarConfiguration } from "../../hooks/useCarConfiguration";
import { useStore } from "../../store/useStore";
import { formatCurrency } from "../../utils/price";
import { Button } from "./Button";

function Swatch({ selected, onClick, hex, label }: { selected: boolean; onClick: () => void; hex: string; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      aria-label={label}
      title={label}
      className={`relative h-9 w-9 rounded-full border-2 transition-transform hover:scale-110 ${
        selected ? "border-[var(--color-rosso-bright)]" : "border-white/20"
      }`}
      style={{ backgroundColor: hex }}
    >
      {selected && <Check size={14} className="absolute inset-0 m-auto text-white drop-shadow" />}
    </button>
  );
}

function OptionRow({ selected, onClick, label, sub, price }: { selected: boolean; onClick: () => void; label: string; sub?: string; price: number }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`flex w-full items-center justify-between border px-4 py-3 text-left transition-colors ${
        selected ? "border-[var(--color-rosso)] bg-[var(--color-rosso)]/10" : "border-white/10 hover:border-white/30"
      }`}
    >
      <span>
        <span className="block text-sm text-white">{label}</span>
        {sub && <span className="block text-xs text-zinc-500">{sub}</span>}
      </span>
      <span className="text-xs text-zinc-400">{price === 0 ? "Included" : `+${formatCurrency(price)}`}</span>
    </button>
  );
}

export function ConfiguratorPanel({ compact = false }: { compact?: boolean }) {
  const { config, setColor, setWheel, setCaliper, setInterior, breakdown } = useCarConfiguration();
  const lightingMode = useStore((s) => s.lightingMode);
  const setLightingMode = useStore((s) => s.setLightingMode);
  const saveConfiguration = useStore((s) => s.saveConfiguration);
  const addToast = useStore((s) => s.addToast);

  const handleShare = async () => {
    const params = new URLSearchParams(config as unknown as Record<string, string>);
    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      /* clipboard unavailable, still confirm to user */
    }
    addToast("Configuration link copied.");
  };

  return (
    <div className={`space-y-8 ${compact ? "" : "max-w-md"}`}>
      <section aria-labelledby="exterior-heading">
        <h4 id="exterior-heading" className="kicker mb-3">Exterior Color</h4>
        <div className="flex flex-wrap gap-3">
          {exteriorColors.map((c) => (
            <Swatch key={c.id} hex={c.hex} label={c.label} selected={config.color === c.id} onClick={() => setColor(c.id)} />
          ))}
        </div>
      </section>

      <section aria-labelledby="wheels-heading">
        <h4 id="wheels-heading" className="kicker mb-3">Wheels</h4>
        <div className="grid grid-cols-2 gap-2">
          {wheelOptions.map((w) => (
            <OptionRow key={w.id} label={w.label} sub={w.description} price={w.price} selected={config.wheel === w.id} onClick={() => setWheel(w.id)} />
          ))}
        </div>
      </section>

      <section aria-labelledby="brakes-heading">
        <h4 id="brakes-heading" className="kicker mb-3">Brake Calipers</h4>
        <div className="flex flex-wrap gap-3">
          {caliperOptions.map((c) => (
            <Swatch key={c.id} hex={c.hex} label={c.label} selected={config.caliper === c.id} onClick={() => setCaliper(c.id)} />
          ))}
        </div>
      </section>

      <section aria-labelledby="interior-heading">
        <h4 id="interior-heading" className="kicker mb-3">Interior</h4>
        <div className="flex flex-wrap gap-3">
          {interiorOptions.map((i) => (
            <Swatch key={i.id} hex={i.hex} label={i.label} selected={config.interior === i.id} onClick={() => setInterior(i.id)} />
          ))}
        </div>
      </section>

      <section aria-labelledby="lighting-heading">
        <h4 id="lighting-heading" className="kicker mb-3">Lighting</h4>
        <div className="flex flex-wrap gap-2">
          {lightingModes.map((m) => (
            <button
              key={m.id}
              onClick={() => setLightingMode(m.id)}
              aria-pressed={lightingMode === m.id}
              className={`px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors ${
                lightingMode === m.id ? "bg-[var(--color-rosso)] text-white" : "border border-white/20 text-zinc-400 hover:text-white"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </section>

      <section aria-labelledby="summary-heading" className="border-t border-white/10 pt-6">
        <h4 id="summary-heading" className="kicker mb-3">Summary</h4>
        <ul className="space-y-1 text-sm text-zinc-400">
          {breakdown.lines.map((l) => (
            <li key={l.label} className="flex justify-between">
              <span>{l.label}</span>
              <span className="text-zinc-300">{l.value === 0 ? "—" : formatCurrency(l.value)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex items-baseline justify-between border-t border-white/10 pt-4">
          <span className="kicker">Total</span>
          <span className="font-display text-2xl text-white">{formatCurrency(breakdown.total)}</span>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button onClick={() => saveConfiguration(breakdown.total)}>Save Configuration</Button>
          <Button variant="outline" onClick={handleShare}>Share</Button>
        </div>
      </section>
    </div>
  );
}
