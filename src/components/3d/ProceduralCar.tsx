import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { exteriorColors, wheelOptions, caliperOptions, interiorOptions } from "../../data/configOptions";
import type { CarConfig } from "../../store/useStore";

function useLerpedColor(hex: string) {
  const color = useRef(new THREE.Color(hex));
  const target = useMemo(() => new THREE.Color(hex), [hex]);
  useFrame((_, delta) => {
    color.current.lerp(target, Math.min(1, delta * 4));
  });
  return color;
}

function Wheel({
  position,
  wheelId,
  caliperHex,
}: {
  position: [number, number, number];
  wheelId: string;
  caliperHex: string;
}) {
  const spokeCount = wheelId === "racing" ? 8 : wheelId === "sport" ? 5 : wheelId === "classic" ? 5 : 6;
  const rimColor = wheelId === "carbon" ? "#1a1a1c" : wheelId === "racing" ? "#d8d8da" : wheelId === "classic" ? "#e8e8ea" : "#c9c9cc";
  const spokes = useMemo(() => Array.from({ length: spokeCount }, (_, i) => (i / spokeCount) * Math.PI * 2), [spokeCount]);
  const calRef = useRef(new THREE.Color(caliperHex));
  const calTarget = useMemo(() => new THREE.Color(caliperHex), [caliperHex]);
  useFrame((_, delta) => calRef.current.lerp(calTarget, Math.min(1, delta * 4)));

  return (
    <group position={position}>
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.42, 0.42, 0.32, 24]} />
        <meshStandardMaterial color="#111113" roughness={0.85} metalness={0.1} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.27, 0.27, 0.34, 24]} />
        <meshStandardMaterial color={rimColor} roughness={0.25} metalness={0.85} />
      </mesh>
      {spokes.map((angle, i) => (
        <mesh key={i} rotation={[0, 0, Math.PI / 2]} position={[0, Math.cos(angle) * 0.13, Math.sin(angle) * 0.13]}>
          <boxGeometry args={[0.3, 0.05, 0.05]} />
          <meshStandardMaterial color={rimColor} metalness={0.9} roughness={0.2} />
        </mesh>
      ))}
      <mesh rotation={[0, 0, Math.PI / 2]} position={[0.02, 0, 0]}>
        <cylinderGeometry args={[0.14, 0.14, 0.1, 16]} />
        <meshStandardMaterial color={calRef.current} roughness={0.4} metalness={0.3} />
      </mesh>
    </group>
  );
}

interface ProceduralCarProps {
  config: CarConfig;
}

export function ProceduralCar({ config }: ProceduralCarProps) {
  const colorHex = exteriorColors.find((c) => c.id === config.color)?.hex ?? "#c40000";
  const caliperHex = caliperOptions.find((c) => c.id === config.caliper)?.hex ?? "#c40000";
  const interiorHex = interiorOptions.find((c) => c.id === config.interior)?.hex ?? "#161616";
  const wheelId = wheelOptions.find((w) => w.id === config.wheel)?.id ?? "sport";

  const bodyColor = useLerpedColor(colorHex);
  const cabinColor = useLerpedColor(interiorHex);

  const bodyMatRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const cabinMatRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(() => {
    if (bodyMatRef.current) bodyMatRef.current.color.copy(bodyColor.current);
    if (cabinMatRef.current) cabinMatRef.current.color.copy(cabinColor.current);
  });

  const wheelPositions: [number, number, number][] = [
    [1.05, -0.05, 1.55],
    [-1.05, -0.05, 1.55],
    [1.05, -0.05, -1.5],
    [-1.05, -0.05, -1.5],
  ];

  return (
    <group position={[0, 0.35, 0]} name="ferrari-car">
      {/* Lower chassis */}
      <mesh castShadow receiveShadow position={[0, -0.08, 0]}>
        <boxGeometry args={[1.94, 0.42, 4.2]} />
        <meshPhysicalMaterial ref={bodyMatRef} color={colorHex} roughness={0.18} metalness={0.55} clearcoat={1} clearcoatRoughness={0.08} />
      </mesh>

      {/* Nose taper */}
      <mesh castShadow position={[0, -0.05, 2.15]}>
        <boxGeometry args={[1.6, 0.32, 0.55]} />
        <meshPhysicalMaterial color={colorHex} roughness={0.18} metalness={0.55} clearcoat={1} />
      </mesh>

      {/* Cabin / greenhouse */}
      <mesh castShadow position={[0, 0.42, -0.15]}>
        <boxGeometry args={[1.55, 0.5, 1.9]} />
        <meshPhysicalMaterial color="#0a0a0c" roughness={0.05} metalness={0.2} transparent opacity={0.85} />
      </mesh>

      {/* Interior hint visible through cabin */}
      <mesh position={[0, 0.18, -0.15]}>
        <boxGeometry args={[1.3, 0.16, 1.6]} />
        <meshStandardMaterial ref={cabinMatRef} color={interiorHex} roughness={0.7} metalness={0.05} />
      </mesh>

      {/* Rear spoiler */}
      <mesh castShadow position={[0, 0.62, -2.05]}>
        <boxGeometry args={[1.7, 0.06, 0.28]} />
        <meshStandardMaterial color="#0c0c0e" roughness={0.3} metalness={0.4} />
      </mesh>
      <mesh position={[0.75, 0.42, -2.05]}>
        <boxGeometry args={[0.06, 0.4, 0.2]} />
        <meshStandardMaterial color="#0c0c0e" roughness={0.4} />
      </mesh>
      <mesh position={[-0.75, 0.42, -2.05]}>
        <boxGeometry args={[0.06, 0.4, 0.2]} />
        <meshStandardMaterial color="#0c0c0e" roughness={0.4} />
      </mesh>

      {/* Headlights */}
      <mesh position={[0.68, -0.02, 2.42]}>
        <boxGeometry args={[0.34, 0.1, 0.05]} />
        <meshStandardMaterial color="#eaf6ff" emissive="#8fd6ff" emissiveIntensity={0.4} roughness={0.1} />
      </mesh>
      <mesh position={[-0.68, -0.02, 2.42]}>
        <boxGeometry args={[0.34, 0.1, 0.05]} />
        <meshStandardMaterial color="#eaf6ff" emissive="#8fd6ff" emissiveIntensity={0.4} roughness={0.1} />
      </mesh>

      {/* Taillights */}
      <mesh position={[0.7, 0.05, -2.08]}>
        <boxGeometry args={[0.3, 0.12, 0.04]} />
        <meshStandardMaterial color="#ff2b2b" emissive="#ff0000" emissiveIntensity={0.9} />
      </mesh>
      <mesh position={[-0.7, 0.05, -2.08]}>
        <boxGeometry args={[0.3, 0.12, 0.04]} />
        <meshStandardMaterial color="#ff2b2b" emissive="#ff0000" emissiveIntensity={0.9} />
      </mesh>

      {wheelPositions.map((pos, i) => (
        <Wheel key={i} position={pos} wheelId={wheelId} caliperHex={caliperHex} />
      ))}
    </group>
  );
}
