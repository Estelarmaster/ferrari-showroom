import { useEffect, useMemo, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { exteriorColors } from "../../data/configOptions";
import type { CarConfig } from "../../store/useStore";

interface Props {
  config: CarConfig;
  castShadow?: boolean;
}

const FLOOR_Y = -0.55;

/**
 * Loads /public/models/car.glb when present. useGLTF caches and shares a
 * single scene graph across every consumer of the same URL — since three or
 * more <CarScene> instances (hero, configurator, interior) load it at once,
 * each would steal the shared Object3D from the others (an Object3D can only
 * live under one parent at a time). We clone the graph — and each mesh's
 * material, since per-instance color changes must not leak across scenes.
 */
export function GLTFCarModel({ config, castShadow = true }: Props) {
  const { scene } = useGLTF("/models/car.glb", true);
  const group = useRef<THREE.Group>(null);
  const colorHex = exteriorColors.find((c) => c.id === config.color)?.hex ?? "#c40000";
  const [groundOffset, setGroundOffset] = useState(0);

  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = Array.isArray(child.material) ? child.material.map((m) => m.clone()) : child.material.clone();
        child.castShadow = castShadow;
        child.receiveShadow = castShadow;
      }
    });
    return clone;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene, castShadow]);

  useEffect(() => {
    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh && /body|paint|carrocer/i.test(child.name)) {
        const mat = child.material as THREE.MeshStandardMaterial;
        if (mat && "color" in mat) mat.color.set(colorHex);
      }
    });
  }, [clonedScene, colorHex]);

  useEffect(() => {
    const box = new THREE.Box3().setFromObject(clonedScene);
    setGroundOffset(FLOOR_Y - box.min.y);
  }, [clonedScene]);

  return <primitive ref={group} object={clonedScene} position={[0, groundOffset, 0]} name="ferrari-car" />;
}
