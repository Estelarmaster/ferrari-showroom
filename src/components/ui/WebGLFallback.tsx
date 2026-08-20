import { useState } from "react";
import { flagshipVehicle } from "../../data/vehicles";
import { Button } from "./Button";

export function WebGLFallback({ onRetry }: { onRetry?: () => void }) {
  const [retrying, setRetrying] = useState(false);

  const handleRetry = () => {
    setRetrying(true);
    setTimeout(() => {
      setRetrying(false);
      onRetry ? onRetry() : window.location.reload();
    }, 600);
  };

  return (
    <div className="flex h-full min-h-[60vh] w-full flex-col items-center justify-center gap-4 bg-black px-6 text-center">
      <svg viewBox="0 0 240 100" className="h-24 w-auto text-white/20" fill="none" aria-hidden="true">
        <path d="M10 70 Q20 45 55 40 L90 25 Q120 15 150 25 L185 40 Q215 45 230 70 L225 78 L15 78 Z" stroke="currentColor" strokeWidth="2" />
        <circle cx="55" cy="78" r="14" stroke="currentColor" strokeWidth="2" />
        <circle cx="185" cy="78" r="14" stroke="currentColor" strokeWidth="2" />
      </svg>
      <h2 className="font-display text-2xl tracking-widest text-white">3D EXPERIENCE UNAVAILABLE</h2>
      <p className="max-w-sm text-sm text-zinc-400">
        Unable to load the vehicle visualization. Your browser or device may not support WebGL.
      </p>
      <p className="max-w-sm text-xs text-zinc-600">{flagshipVehicle.name} — {flagshipVehicle.tagline}</p>
      <Button onClick={handleRetry} disabled={retrying}>{retrying ? "Retrying..." : "Retry"}</Button>
    </div>
  );
}
