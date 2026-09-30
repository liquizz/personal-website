import { Canvas } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
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
import { useDevicePerformance } from "../../hooks/useDevicePerformance";

const CHROMATIC_OFFSET = new THREE.Vector2(0.0008, 0.0012);

interface PortalSceneProps {
  isDark?: boolean;
  /** When false the render loop is paused (e.g. the hero is scrolled out of view). */
  active?: boolean;
}

export function PortalScene({ isDark = true, active = true }: PortalSceneProps) {
  const deviceCapabilities = useDevicePerformance();
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const bgColor = isDark ? "#02050d" : "#f0f4f8";
  const fogColor = isDark ? "#02050d" : "#f0f4f8";
  const ambientIntensity = isDark ? 0.2 : 0.8;
  const directionalIntensity = isDark ? 1.6 : 1.0;
  const directionalColor = isDark ? "#bfe8ff" : "#ffffff";
  const bloomIntensity = isDark ? 1.2 : 0.5;
  const vignetteDarkness = isDark ? 0.75 : 0.3;
  const enableShadows = deviceCapabilities.tier !== "low";

  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        shadows={enableShadows}
        frameloop={!active ? "never" : reducedMotion ? "demand" : "always"}
        gl={{ antialias: !deviceCapabilities.enablePostProcessing, powerPreference: "high-performance" }}
        dpr={deviceCapabilities.tier === "low" ? 1 : [1, 1.5]}
      >
        <color attach="background" args={[bgColor]} />
        <fog attach="fog" args={[fogColor, 10, 28]} />

        <PerspectiveCamera makeDefault position={[0, 1.6, 8.5]} fov={42} />

        <ambientLight intensity={ambientIntensity} />
        <directionalLight
          position={[5, 8, 4]}
          intensity={directionalIntensity}
          color={directionalColor}
          castShadow={enableShadows}
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

        <SceneRig isDark={isDark} deviceCapabilities={deviceCapabilities} />

        {/* Locally rendered environment map: no multi-MB HDR download and no
            third-party request that can block (or break) the whole scene. */}
        <Environment resolution={64} frames={1}>
          <color attach="background" args={[isDark ? "#05070f" : "#9aa7b8"]} />
          <Lightformer
            form="rect"
            intensity={isDark ? 1.2 : 3}
            color={isDark ? "#7fa6ff" : "#ffffff"}
            position={[0, 6, 0]}
            rotation-x={Math.PI / 2}
            scale={[12, 12, 1]}
          />
          <Lightformer
            form="rect"
            intensity={isDark ? 0.6 : 1.5}
            color={isDark ? "#3b5bd6" : "#e6efff"}
            position={[-6, 1, -2]}
            rotation-y={Math.PI / 2}
            scale={[8, 3, 1]}
          />
          <Lightformer
            form="rect"
            intensity={isDark ? 0.6 : 1.5}
            color={isDark ? "#3b5bd6" : "#fff4e0"}
            position={[6, 1, 2]}
            rotation-y={-Math.PI / 2}
            scale={[8, 3, 1]}
          />
        </Environment>

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          maxPolarAngle={Math.PI * 0.62}
          minPolarAngle={Math.PI * 0.35}
        />

        {deviceCapabilities.enablePostProcessing && (
          <EffectComposer multisampling={4}>
            <Bloom
              intensity={bloomIntensity}
              luminanceThreshold={0.12}
              luminanceSmoothing={0.85}
              mipmapBlur
            />
            <ChromaticAberration
              offset={CHROMATIC_OFFSET}
              modulationOffset={0}
              radialModulation={false}
            />
            <Vignette eskil={false} offset={0.16} darkness={vignetteDarkness} />
          </EffectComposer>
        )}
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
