import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";
import { getPresetVectors } from "../../hooks/useCamera";
import type { CameraView } from "../../store/useStore";

interface Props {
  view: CameraView;
  autoRotate: boolean;
  resetToken: number;
  enableZoom?: boolean;
}

export function CameraController({ view, autoRotate, resetToken, enableZoom = true }: Props) {
  const controls = useRef<OrbitControlsImpl>(null);
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3());
  const targetLook = useRef(new THREE.Vector3());
  const targetFov = useRef(35);

  useEffect(() => {
    const preset = getPresetVectors(view);
    targetPos.current.copy(preset.position);
    targetLook.current.copy(preset.target);
    targetFov.current = preset.fov;
  }, [view, resetToken]);

  useFrame((_, delta) => {
    const t = Math.min(1, delta * 2.2);
    camera.position.lerp(targetPos.current, t);
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov.current, t);
      camera.updateProjectionMatrix();
    }
    if (controls.current) {
      controls.current.target.lerp(targetLook.current, t);
      controls.current.update();
    }
  });

  return (
    <OrbitControls
      ref={controls}
      enablePan={view !== "interior"}
      enableZoom={enableZoom}
      minDistance={2.2}
      maxDistance={12}
      minPolarAngle={0.15}
      maxPolarAngle={Math.PI / 2.05}
      autoRotate={autoRotate}
      autoRotateSpeed={1.4}
      enableDamping
      dampingFactor={0.08}
    />
  );
}
