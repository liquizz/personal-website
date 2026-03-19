import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { PortalRing } from "./PortalRing";
import { MonolithField } from "./MonolithField";
import { DataStreams } from "./DataStreams";
import { Dust } from "./Dust";
import { FloorGrid } from "./FloorGrid";
import type { DeviceCapabilities } from "../../utils/deviceDetection";

interface SceneRigProps {
  isDark?: boolean;
  deviceCapabilities?: DeviceCapabilities;
}

export function SceneRig({ isDark = true, deviceCapabilities }: SceneRigProps) {
  const g = useRef<THREE.Group>(null);
  const lastFrameTime = useRef(0);

  useFrame((state, dt) => {
    if (!g.current) return;

    const animationFreq = deviceCapabilities?.animationFrequency ?? 1;
    const currentTime = state.clock.elapsedTime;

    if (animationFreq < 1) {
      if (currentTime - lastFrameTime.current > (1 / 60) / animationFreq) {
        lastFrameTime.current = currentTime;
      } else {
        return;
      }
    }

    const x = state.pointer.x * 0.35;
    const y = state.pointer.y * 0.2;
    g.current.rotation.y = THREE.MathUtils.lerp(g.current.rotation.y, x, 0.06 * animationFreq);
    g.current.rotation.x = THREE.MathUtils.lerp(g.current.rotation.x, -y, 0.06 * animationFreq);
    g.current.position.y = THREE.MathUtils.lerp(
      g.current.position.y,
      state.pointer.y * 0.15,
      0.04 * animationFreq,
    );
    g.current.rotation.z += dt * 0.03 * animationFreq;
  });

  return (
    <group ref={g}>
      <PortalRing isDark={isDark} deviceCapabilities={deviceCapabilities} />
      <MonolithField isDark={isDark} />
      <DataStreams isDark={isDark} deviceCapabilities={deviceCapabilities} />
      <Dust isDark={isDark} deviceCapabilities={deviceCapabilities} />
      <FloorGrid isDark={isDark} />
    </group>
  );
}
