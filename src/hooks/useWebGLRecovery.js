import { useEffect } from "react";
import { useThree } from "@react-three/fiber";

// WebGL contexts can be lost at any time (GPU driver reset, context-limit pressure -
// notably common on laptops with hybrid/switchable graphics) and, without explicit
// handling, never recover: the canvas just stays blank forever. Call this from the
// DOM-tree component that owns the Canvas ref (outside the R3F tree) to opt into the
// browser's automatic restoration attempt and get notified once it succeeds.
export function useWebGLRecovery(canvasRef, onRestored) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleLost = (e) => e.preventDefault(); // opt in to restoration
    const handleRestored = () => onRestored?.();

    canvas.addEventListener("webglcontextlost", handleLost, false);
    canvas.addEventListener("webglcontextrestored", handleRestored, false);
    return () => {
      canvas.removeEventListener("webglcontextlost", handleLost);
      canvas.removeEventListener("webglcontextrestored", handleRestored);
    };
  }, [canvasRef, onRestored]);
}

// Fast/awkward viewport resizes (e.g. opening or resizing a docked DevTools panel,
// which can push the canvas through several intermediate sizes - including very
// small ones - in quick succession) can leave a WebGL canvas stuck on a stale or
// broken frame even though it never reports an actual context loss. Debounces on
// ResizeObserver and calls `onSettled` once the size stops changing, as a cheap
// extra safety net alongside useWebGLRecovery.
export function useResizeRecovery(targetRef, onSettled, debounceMs = 300) {
  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;

    let timeoutId;
    const observer = new ResizeObserver(() => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => onSettled?.(), debounceMs);
    });
    observer.observe(el);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [targetRef, onSettled, debounceMs]);
}

// Render inside <Canvas>. Forces a fresh render whenever `gen` changes (e.g. after a
// WebGL context restore) - a paused/idle scene would otherwise keep showing whatever
// was last (possibly invalid) in the buffer until the next unrelated invalidation.
export function useForceInvalidate(gen) {
  const invalidate = useThree((state) => state.invalidate);
  useEffect(() => {
    if (gen > 0) invalidate();
  }, [gen, invalidate]);
}
