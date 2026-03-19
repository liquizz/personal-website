import { Canvas } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Vignette,
} from "@react-three/postprocessing";
import { SceneRig } from "./SceneRig";
import * as THREE from "three";

interface PortalSceneProps {
  isDark?: boolean;
}

export function PortalScene({ isDark = true }: PortalSceneProps) {
  const bgColor = isDark ? "#02050d" : "#f0f4f8";
  const fogColor = isDark ? "#02050d" : "#f0f4f8";
  const ambientIntensity = isDark ? 0.2 : 0.8;
  const directionalIntensity = isDark ? 1.6 : 1.0;
  const directionalColor = isDark ? "#bfe8ff" : "#ffffff";
  const bloomIntensity = isDark ? 1.2 : 0.5;
  const vignetteDarkness = isDark ? 0.75 : 0.3;

  return (
    <div className="absolute inset-0 z-0">
      <Canvas shadows gl={{ antialias: true }} dpr={[1, 1.5]}>
        <color attach="background" args={[bgColor]} />
        <fog attach="fog" args={[fogColor, 10, 28]} />

        <PerspectiveCamera makeDefault position={[0, 1.6, 8.5]} fov={42} />

        <ambientLight intensity={ambientIntensity} />
        <directionalLight
          position={[5, 8, 4]}
          intensity={directionalIntensity}
          color={directionalColor}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight
          position={[0, 1.8, 0]}
          intensity={18}
          distance={12}
          color="#6aaeff"
        />
        <pointLight
          position={[0, 0.4, 0]}
          intensity={8}
          distance={8}
          color="#9de8ff"
        />

        <SceneRig isDark={isDark} />
        <Environment preset={isDark ? "night" : "city"} />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          maxPolarAngle={Math.PI * 0.62}
          minPolarAngle={Math.PI * 0.35}
        />

        <EffectComposer>
          <Bloom
            intensity={bloomIntensity}
            luminanceThreshold={0.12}
            luminanceSmoothing={0.85}
            mipmapBlur
          />
          <ChromaticAberration
            offset={new THREE.Vector2(0.0008, 0.0012)}
            modulationOffset={0}
            radialModulation={false}
          />
          <Vignette eskil={false} offset={0.16} darkness={vignetteDarkness} />
        </EffectComposer>
      </Canvas>

      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: "repeating-linear-gradient(to_bottom,rgba(255,255,255,0.08)_0px,rgba(255,255,255,0.08)_1px,transparent_2px,transparent_4px)",
        }}
      />
    </div>
  );
}
