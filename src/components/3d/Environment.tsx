import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Environment as EnvironmentMap, Lightformer, MeshReflectorMaterial } from "@react-three/drei";
import * as THREE from "three";
import type { LightingMode } from "../../data/configOptions";
import { useLightingPreset } from "./Lighting";

/**
 * Procedural (fully local, no HDRI file) light-formers so metallic/clearcoat
 * car paint has something to reflect. Without scene.environment, PBR
 * metalness renders near-black under direct lights alone.
 */
export function Environment({ mode, shadows = true }: { mode: LightingMode; shadows?: boolean }) {
  const preset = useLightingPreset(mode);
  const { scene } = useThree();
  const bgColor = useRef(new THREE.Color(preset.bg));
  const targetColor = new THREE.Color(preset.bg);

  useFrame((_, delta) => {
    bgColor.current.lerp(targetColor, Math.min(1, delta * 3));
    scene.background = bgColor.current;
    scene.fog = new THREE.Fog(bgColor.current, 8, 24);
  });

  return (
    <group>
      <EnvironmentMap resolution={64} frames={1}>
        <Lightformer intensity={3} color="white" position={[0, 6, -6]} scale={[12, 12, 1]} />
        <Lightformer intensity={2} color="white" position={[-6, 3, 4]} rotation={[0, Math.PI / 2, 0]} scale={[10, 10, 1]} />
        <Lightformer intensity={2} color="white" position={[6, 3, 4]} rotation={[0, -Math.PI / 2, 0]} scale={[10, 10, 1]} />
        <Lightformer intensity={1.2} color="white" position={[0, 3, 8]} rotation={[0, Math.PI, 0]} scale={[12, 6, 1]} />
      </EnvironmentMap>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.55, 0]} receiveShadow={shadows}>
        <planeGeometry args={[40, 40]} />
        <MeshReflectorMaterial
          blur={[200, 50]}
          resolution={512}
          mixBlur={1}
          mixStrength={45}
          roughness={0.9}
          depthScale={1}
          minDepthThreshold={0.85}
          color="#050505"
          metalness={0.6}
        />
      </mesh>
      <mesh position={[0, 4, -12]} rotation={[0, 0, 0]}>
        <planeGeometry args={[60, 20]} />
        <meshBasicMaterial color="#050505" transparent opacity={0.4} />
      </mesh>
    </group>
  );
}
