import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { makePortalTexture, type PortalTextureResult } from "../../utils/portalUtils";

export function PortalRing() {
  const portalRef = useRef<PortalTextureResult | null>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const lastTextureUpdate = useRef(0);

  useEffect(() => {
    portalRef.current = makePortalTexture(512);
    return () => {
      portalRef.current?.tex.dispose();
      portalRef.current = null;
    };
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // Throttle texture updates to ~4x/sec for better performance
    if (t - lastTextureUpdate.current > 0.25) {
      portalRef.current?.draw(t);
      lastTextureUpdate.current = t;
    }

    if (coreRef.current && portalRef.current) {
      const mat = coreRef.current.material as THREE.MeshBasicMaterial;
      if (mat.map !== portalRef.current.tex) {
        mat.map = portalRef.current.tex;
        mat.needsUpdate = true;
      }
      coreRef.current.rotation.z = t * 0.08;
      coreRef.current.scale.setScalar(1 + Math.sin(t * 1.5) * 0.015);
    }
  });

  return (
    <group>
      <mesh position={[0, 0.45, 0]}>
        <torusGeometry args={[2.2, 0.06, 32, 220]} />
        <meshStandardMaterial
          color="#86d9ff"
          emissive="#4b8dff"
          emissiveIntensity={2.2}
          metalness={0.45}
          roughness={0.18}
        />
      </mesh>

      <mesh ref={coreRef} position={[0, 0.45, 0.01]}>
        <circleGeometry args={[1.8, 96]} />
        <meshBasicMaterial
          transparent
          opacity={0.95}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2;
        const x = Math.cos(a) * 2.2;
        const z = Math.sin(a) * 2.2;
        return (
          <Float
            key={i}
            speed={1 + i * 0.05}
            rotationIntensity={0.45}
            floatIntensity={0.45}
          >
            <mesh position={[x, 0.45, z]} rotation={[0, -a, 0]}>
              <boxGeometry args={[0.08, 1.2 + (i % 4) * 0.25, 0.08]} />
              <meshStandardMaterial
                color="#2e5dff"
                emissive="#2e5dff"
                emissiveIntensity={1.7}
                metalness={0.25}
                roughness={0.15}
              />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
}
