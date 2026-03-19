import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface MonolithFieldProps {
  isDark?: boolean;
}

export function MonolithField({ isDark = true }: MonolithFieldProps) {
  const g = useRef<THREE.Group>(null);
  const items = useMemo(() => {
    const list: Array<{
      pos: [number, number, number];
      rot: [number, number, number];
      h: number;
      w: number;
    }> = [];

    for (let i = 0; i < 18; i++) {
      const a = (i / 18) * Math.PI * 2;
      const r = 4.6 + (i % 3) * 1.2;
      list.push({
        pos: [Math.cos(a) * r, -0.35 + (i % 4) * 0.08, Math.sin(a) * r],
        rot: [0, -a, 0],
        h: 1.5 + (i % 5) * 0.55,
        w: 0.28 + (i % 3) * 0.05,
      });
    }

    return list;
  }, []);

  useFrame((state) => {
    if (!g.current) return;
    g.current.rotation.y = state.clock.elapsedTime * 0.04;
  });

  return (
    <group ref={g}>
      {items.map((it, i) => (
        <mesh key={i} position={it.pos} rotation={it.rot} castShadow>
          <boxGeometry args={[it.w, it.h, it.w]} />
          <meshStandardMaterial
            color={
              isDark
                ? i % 2 === 0
                  ? "#0b1430"
                  : "#101a40"
                : i % 2 === 0
                  ? "#e2e8f0"
                  : "#cbd5e1"
            }
            emissive={
              isDark
                ? i % 3 === 0
                  ? "#1f5eff"
                  : "#0a1535"
                : i % 3 === 0
                  ? "#3b82f6"
                  : "#94a3b8"
            }
            emissiveIntensity={isDark ? (i % 3 === 0 ? 1.2 : 0.2) : 0.3}
            metalness={0.65}
            roughness={0.22}
          />
        </mesh>
      ))}
    </group>
  );
}
