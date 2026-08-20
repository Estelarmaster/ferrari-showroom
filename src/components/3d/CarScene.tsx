import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { useStore } from "../../store/useStore";
import { CarModel } from "./CarModel";
import { CameraController } from "./CameraController";
import { Lighting } from "./Lighting";
import { Environment } from "./Environment";
import { Hotspot, carHotspots } from "./Hotspot";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface Props {
  showHotspots?: boolean;
  interactive?: boolean;
  enableZoom?: boolean;
  shadows?: boolean;
  dpr?: [number, number];
}

export function CarScene({
  showHotspots = true,
  interactive = true,
  enableZoom = true,
  shadows = true,
  dpr = [1, 1.5],
}: Props) {
  const config = useStore((s) => s.config);
  const cameraView = useStore((s) => s.cameraView);
  const autoRotate = useStore((s) => s.autoRotate);
  const cameraResetToken = useStore((s) => s.cameraResetToken);
  const lightingMode = useStore((s) => s.lightingMode);
  const setCursorLabel = useStore((s) => s.setCursorLabel);
  const isTouchDevice = useStore((s) => s.isTouchDevice);
  const reducedMotion = useReducedMotion();

  return (
    <Canvas
      shadows={shadows}
      dpr={dpr}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 1.4, 6.2], fov: 35, near: 0.1, far: 60 }}
      onPointerEnter={() => !isTouchDevice && setCursorLabel("ROTATE")}
      onPointerLeave={() => setCursorLabel(null)}
    >
      <Suspense fallback={null}>
        <Environment mode={lightingMode} shadows={shadows} />
        <Lighting mode={lightingMode} shadows={shadows} />
        <CarModel config={config} castShadow={shadows} />
        {showHotspots && carHotspots.map((h) => <Hotspot key={h.id} data={h} />)}
        {interactive && (
          <CameraController
            view={cameraView}
            autoRotate={autoRotate && !reducedMotion}
            resetToken={cameraResetToken}
            enableZoom={enableZoom}
          />
        )}
      </Suspense>
    </Canvas>
  );
}
