import * as THREE from "three";
import type { CameraView } from "../store/useStore";

export const cameraPresets: Record<CameraView, { position: [number, number, number]; target: [number, number, number]; fov: number }> = {
  front: { position: [0, 1.4, 6.2], target: [0, 0.6, 0], fov: 35 },
  side: { position: [6.4, 1.2, 0.4], target: [0, 0.5, 0], fov: 35 },
  rear: { position: [0, 1.5, -6.2], target: [0, 0.6, 0], fov: 35 },
  top: { position: [0.2, 6.5, 0.2], target: [0, 0, 0], fov: 40 },
  interior: { position: [1.3, 1.15, 0.15], target: [-0.1, 0.35, 0.1], fov: 42 },
};

export function getPresetVectors(view: CameraView) {
  const preset = cameraPresets[view];
  return {
    position: new THREE.Vector3(...preset.position),
    target: new THREE.Vector3(...preset.target),
    fov: preset.fov,
  };
}
