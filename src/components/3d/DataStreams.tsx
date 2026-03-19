import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { seededNoise } from "../../utils/portalUtils";

const STREAM_COUNT = 120;

type StreamPt = {
  r: number;
  a: number;
  y: number;
  s: number;
  o: number;
};

const STREAM_PTS: StreamPt[] = Array.from({ length: STREAM_COUNT }, (_, i) => ({
  r: 1.3 + seededNoise(i * 1.11 + 0.1) * 6.5,
  a: seededNoise(i * 1.73 + 0.2) * Math.PI * 2,
  y: -1 + seededNoise(i * 2.03 + 0.3) * 3.5,
  s: 0.2 + seededNoise(i * 2.61 + 0.4) * 0.8,
  o: seededNoise(i * 3.17 + 0.5) * Math.PI * 2,
}));

export function DataStreams() {
  const ref = useRef<THREE.InstancedMesh>(null);
  const dummy = useRef(new THREE.Object3D());

  useFrame((state) => {
    const mesh = ref.current;
    if (!mesh) return;

    const t = state.clock.elapsedTime;
    STREAM_PTS.forEach((p, i) => {
      const a = p.a + t * (0.12 + p.s * 0.08);
      dummy.current.position.set(
        Math.cos(a) * p.r,
        p.y + Math.sin(t * 1.3 + p.o) * 0.18,
        Math.sin(a) * p.r,
      );
      dummy.current.rotation.set(0, -a, 0);
      dummy.current.scale.set(0.02, 0.12 + Math.sin(t * 2 + p.o) * 0.04, 0.02);
      dummy.current.updateMatrix();
      mesh.setMatrixAt(i, dummy.current.matrix);
    });

    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, STREAM_COUNT]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#9be8ff" transparent opacity={0.85} />
    </instancedMesh>
  );
}
