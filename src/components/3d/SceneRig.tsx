import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { PortalRing } from "./PortalRing";
import { MonolithField } from "./MonolithField";
import { DataStreams } from "./DataStreams";
import { Dust } from "./Dust";
import { FloorGrid } from "./FloorGrid";

export function SceneRig() {
  const g = useRef<THREE.Group>(null);

  useFrame((state, dt) => {
    if (!g.current) return;
    const x = state.pointer.x * 0.35;
    const y = state.pointer.y * 0.2;
    g.current.rotation.y = THREE.MathUtils.lerp(g.current.rotation.y, x, 0.06);
    g.current.rotation.x = THREE.MathUtils.lerp(g.current.rotation.x, -y, 0.06);
    g.current.position.y = THREE.MathUtils.lerp(
      g.current.position.y,
      state.pointer.y * 0.15,
      0.04,
    );
    g.current.rotation.z += dt * 0.03;
  });

  return (
    <group ref={g}>
      <PortalRing />
      <MonolithField />
      <DataStreams />
      <Dust />
      <FloorGrid />
    </group>
  );
}
