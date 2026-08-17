import { useEffect, useRef, useState } from "react";

// Tracks whether an element is (near) the viewport, so callers can pause
// expensive work (e.g. a WebGL render loop) while it's scrolled off-screen.
export function useInView({ rootMargin = "200px" } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return [ref, inView];
}
