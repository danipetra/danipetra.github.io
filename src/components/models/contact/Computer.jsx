import { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

export function Computer({ refreshShadow, recoveryGen, ...props }) {
  const { nodes, materials } = useGLTF(
    "/models/computer-optimized-transformed.glb"
  );
  const gl = useThree((state) => state.gl);
  const invalidate = useThree((state) => state.invalidate);

  // The scene never animates, so the shadow map doesn't need to be recomputed every
  // frame — only once per visible session. Re-running this whenever the scene becomes
  // visible again (rather than once forever) means a shadow that got invalidated while
  // the canvas was paused off-screen always gets a fresh, correct recompute on return,
  // instead of staying stuck on whatever last happened to be in the GPU buffer.
  // `recoveryGen` (bumped after a WebGL context restore, see useWebGLRecovery.js) is
  // in the dependency list for the same reason: a restored context needs the shadow
  // map rebuilt too, not just a resumed-from-pause one.
  useEffect(() => {
    if (!refreshShadow) return;
    gl.shadowMap.autoUpdate = false;
    gl.shadowMap.needsUpdate = true;
    invalidate();
  }, [refreshShadow, recoveryGen, gl, invalidate]);

  return (
    <group {...props} dispose={null}>
      <group position={[-4.005, 67.549, 58.539]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube000_ComputerDesk_0001_1.geometry}
          material={materials["ComputerDesk.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube000_ComputerDesk_0001_2.geometry}
          material={materials["FloppyDisk.001"]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models/computer-optimized-transformed.glb");

export default Computer;
