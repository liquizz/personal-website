import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function MonolithField() {
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
            color={i % 2 === 0 ? "#0b1430" : "#101a40"}
            emissive={i % 3 === 0 ? "#1f5eff" : "#0a1535"}
            emissiveIntensity={i % 3 === 0 ? 1.2 : 0.2}
            metalness={0.65}
            roughness={0.22}
          />
        </mesh>
      ))}
    </group>
  );
}
