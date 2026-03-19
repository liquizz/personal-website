import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { makeDustGeometry } from "../../utils/portalUtils";

export function Dust() {
  const ref = useRef<THREE.Points>(null);
  const geoRef = useRef<THREE.BufferGeometry | null>(null);
  const n = 3200;

  useEffect(() => {
    geoRef.current = makeDustGeometry(n);
    if (ref.current) ref.current.geometry = geoRef.current;
    return () => {
      geoRef.current?.dispose();
      geoRef.current = null;
    };
  }, [n]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={ref}>
      <pointsMaterial
        size={0.045}
        sizeAttenuation
        transparent
        opacity={0.8}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexColors
      />
    </points>
  );
}
