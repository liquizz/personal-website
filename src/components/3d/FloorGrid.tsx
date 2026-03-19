import { useEffect, useRef } from "react";
import * as THREE from "three";
import { makeGridTexture } from "../../utils/portalUtils";

interface FloorGridProps {
  isDark?: boolean;
}

export function FloorGrid({ isDark = true }: FloorGridProps) {
  const texRef = useRef<THREE.CanvasTexture | null>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    texRef.current = makeGridTexture(256);
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.MeshStandardMaterial;
      mat.map = texRef.current;
      mat.needsUpdate = true;
    }
    return () => {
      texRef.current?.dispose();
      texRef.current = null;
    };
  }, []);

  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -1.2, 0]}
      receiveShadow
    >
      <planeGeometry args={[40, 40]} />
      <meshStandardMaterial
        color={isDark ? "#0a1228" : "#f1f5f9"}
        emissive={isDark ? "#14306d" : "#cbd5e1"}
        emissiveIntensity={isDark ? 0.35 : 0.1}
        metalness={0.12}
        roughness={0.8}
      />
    </mesh>
  );
}
