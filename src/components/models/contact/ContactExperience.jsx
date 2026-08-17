import { useCallback, useState } from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import Computer from "./Computer";
import { useInView } from "../../../hooks/useInView";
import {
  useWebGLRecovery,
  useResizeRecovery,
} from "../../../hooks/useWebGLRecovery";

// FIXME: intermittently, the desk model renders once (with its orange background)
// and then goes solid white with a broken-image-style icon in the corner - reported
// to happen more often right after a page reload while already scrolled to #contact,
// and possibly correlated with the DevTools inspector being open / the window being
// resized narrower. useWebGLRecovery + useResizeRecovery below were added as the most
// plausible fix (WebGL context loss is a known trigger for exactly this symptom, and
// is common on laptops with hybrid/switchable graphics), and are confirmed to recover
// correctly from an actual forced context loss/restore cycle - but the original bug
// could not be reproduced on demand (slow/fast scroll, reload-while-in-section, rapid
// multi-step resize down to mobile width, all tested in headless Chromium without
// triggering it), so treat this as mitigated, not confirmed fixed. If it recurs, check
// whether `webglcontextlost` actually fires when it happens (that would confirm/rule
// out this theory) before investigating further.
const ContactExperience = () => {
  const [canvasRef, inView] = useInView();
  const [recoveryGen, setRecoveryGen] = useState(0);
  const bumpRecovery = useCallback(() => setRecoveryGen((g) => g + 1), []);
  useWebGLRecovery(canvasRef, bumpRecovery);
  useResizeRecovery(canvasRef, bumpRecovery);

  return (
    <Canvas
      ref={canvasRef}
      shadows
      camera={{ position: [0, 3, 7], fov: 45 }}
      dpr={[1, 1.5]}
      frameloop={inView ? "always" : "never"}
    >
      <ambientLight intensity={0.5} color="#fff4e6" />

      <directionalLight position={[5, 5, 3]} intensity={2.5} color="#ffd9b3" />

      <directionalLight
        position={[5, 9, 1]}
        castShadow
        intensity={2.5}
        color="#ffd9b3"
      />

      <OrbitControls
        enableZoom={false}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 2}
      />

      <group scale={[1, 1, 1]}>
        <mesh
          receiveShadow
          position={[0, -1.5, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[30, 30]} />
          <meshStandardMaterial color="#a46b2d" />
        </mesh>
      </group>

      <group scale={0.03} position={[0, -1.49, -2]} castShadow>
        <Computer refreshShadow={inView} recoveryGen={recoveryGen} />
      </group>
    </Canvas>
  );
};

export default ContactExperience;
