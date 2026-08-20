import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { LightingMode } from "../../data/configOptions";

interface Preset {
  key: string;
  ambient: number;
  keyColor: string;
  keyIntensity: number;
  rimColor: string;
  rimIntensity: number;
  fillIntensity: number;
  bg: string;
}

const presets: Record<LightingMode, Preset> = {
  showroom: { key: "showroom", ambient: 0.35, keyColor: "#ffffff", keyIntensity: 2.4, rimColor: "#8fd6ff", rimIntensity: 1.6, fillIntensity: 0.5, bg: "#0a0a0a" },
  daylight: { key: "daylight", ambient: 0.7, keyColor: "#fff6e6", keyIntensity: 3.2, rimColor: "#cfe8ff", rimIntensity: 1.2, fillIntensity: 1.1, bg: "#8fa6bd" },
  sunset: { key: "sunset", ambient: 0.4, keyColor: "#ff9a52", keyIntensity: 2.6, rimColor: "#ff3d3d", rimIntensity: 1.8, fillIntensity: 0.6, bg: "#361a1a" },
  night: { key: "night", ambient: 0.12, keyColor: "#7fa8ff", keyIntensity: 1.2, rimColor: "#3a5aff", rimIntensity: 1.4, fillIntensity: 0.15, bg: "#020204" },
  racing: { key: "racing", ambient: 0.25, keyColor: "#ff2b2b", keyIntensity: 2.8, rimColor: "#ffffff", rimIntensity: 2.2, fillIntensity: 0.4, bg: "#120404" },
};

export function useLightingPreset(mode: LightingMode) {
  return useMemo(() => presets[mode], [mode]);
}

export function Lighting({ mode, shadows = true }: { mode: LightingMode; shadows?: boolean }) {
  const preset = useLightingPreset(mode);
  const ambientRef = useRef<THREE.AmbientLight>(null);
  const keyRef = useRef<THREE.DirectionalLight>(null);
  const rimRef = useRef<THREE.DirectionalLight>(null);
  const fillRef = useRef<THREE.PointLight>(null);

  const keyColor = useMemo(() => new THREE.Color(preset.keyColor), [preset.keyColor]);
  const rimColor = useMemo(() => new THREE.Color(preset.rimColor), [preset.rimColor]);

  useFrame((_, delta) => {
    const t = Math.min(1, delta * 3);
    if (ambientRef.current) ambientRef.current.intensity = THREE.MathUtils.lerp(ambientRef.current.intensity, preset.ambient, t);
    if (keyRef.current) {
      keyRef.current.intensity = THREE.MathUtils.lerp(keyRef.current.intensity, preset.keyIntensity, t);
      keyRef.current.color.lerp(keyColor, t);
    }
    if (rimRef.current) {
      rimRef.current.intensity = THREE.MathUtils.lerp(rimRef.current.intensity, preset.rimIntensity, t);
      rimRef.current.color.lerp(rimColor, t);
    }
    if (fillRef.current) fillRef.current.intensity = THREE.MathUtils.lerp(fillRef.current.intensity, preset.fillIntensity, t);
  });

  return (
    <>
      <ambientLight ref={ambientRef} intensity={preset.ambient} />
      <directionalLight
        ref={keyRef}
        position={[4, 6, 4]}
        intensity={preset.keyIntensity}
        color={preset.keyColor}
        castShadow={shadows}
        shadow-mapSize={[512, 512]}
        shadow-bias={-0.0005}
      />
      <directionalLight ref={rimRef} position={[-5, 3, -5]} intensity={preset.rimIntensity} color={preset.rimColor} />
      <pointLight ref={fillRef} position={[0, 2, 3]} intensity={preset.fillIntensity} color="#ffffff" />
    </>
  );
}
