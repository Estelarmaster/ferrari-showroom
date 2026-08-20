import { exteriorColors, wheelOptions, caliperOptions, interiorOptions } from "../../data/configOptions";
import { useStore } from "../../store/useStore";
import { formatCurrency } from "../../utils/price";
import { Modal } from "./Modal";

export function MyConfigsModal() {
  const isOpen = useStore((s) => s.isMyConfigsOpen);
  const closeMyConfigs = useStore((s) => s.closeMyConfigs);
  const savedConfigs = useStore((s) => s.savedConfigs);

  const labelFor = (list: { id: string; label: string }[], id: string) => list.find((o) => o.id === id)?.label ?? id;

  return (
    <Modal isOpen={isOpen} onClose={closeMyConfigs} title="My Configurations" size="lg">
      {savedConfigs.length === 0 ? (
        <p className="text-sm text-zinc-500">No configurations saved yet.</p>
      ) : (
        <ul className="space-y-3">
          {savedConfigs.map((c) => (
            <li key={c.id} className="border border-white/10 p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-white">{new Date(c.savedAt).toLocaleString()}</p>
                <p className="font-display text-lg text-white">{formatCurrency(c.total)}</p>
              </div>
              <p className="mt-2 text-xs text-zinc-400">
                {labelFor(exteriorColors, c.color)} · {labelFor(wheelOptions, c.wheel)} wheels · {labelFor(caliperOptions, c.caliper)} calipers · {labelFor(interiorOptions, c.interior)} interior
              </p>
            </li>
          ))}
        </ul>
      )}
    </Modal>
  );
}
