import { Suspense, useEffect, useState } from "react";
import { ErrorBoundary } from "./ErrorBoundary";
import { GLTFCarModel } from "./GLTFCarModel";
import { ProceduralCar } from "./ProceduralCar";
import type { CarConfig } from "../../store/useStore";

interface Props {
  config: CarConfig;
  castShadow?: boolean;
}

const MODEL_URL = "/models/car.glb";

/**
 * GLTFLoader failures on a missing/invalid file surface as unhandled
 * rejections rather than render-phase throws, so an ErrorBoundary alone
 * can't catch them. We preflight the URL and only attempt useGLTF when a
 * real binary model is actually present at /public/models/car.glb.
 */
function useModelAvailability(url: string) {
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(url, { method: "HEAD" })
      .then((res) => {
        if (cancelled) return;
        const type = res.headers.get("content-type") ?? "";
        setAvailable(res.ok && !type.includes("text/html"));
      })
      .catch(() => {
        if (!cancelled) setAvailable(false);
      });
    return () => {
      cancelled = true;
    };
  }, [url]);

  return available;
}

export function CarModel({ config, castShadow = true }: Props) {
  const modelAvailable = useModelAvailability(MODEL_URL);

  if (!modelAvailable) return <ProceduralCar config={config} />;

  return (
    <ErrorBoundary fallback={<ProceduralCar config={config} />}>
      <Suspense fallback={<ProceduralCar config={config} />}>
        <GLTFCarModel config={config} castShadow={castShadow} />
      </Suspense>
    </ErrorBoundary>
  );
}
