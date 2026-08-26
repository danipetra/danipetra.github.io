import { useEffect, useRef } from "react";

import { createHelixGame } from "./helix/engine";
import { GameOptions } from "./helix/gameOptions";

const HelixExperience = () => {
  const containerRef = useRef(null);
  const scoreRef = useRef(null);

  useEffect(() => {
    const game = createHelixGame(containerRef.current, scoreRef.current);
    return () => game.dispose();
  }, []);

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      style={{ backgroundColor: GameOptions.backgroundColor }}
      className="relative w-full h-full outline-none touch-none cursor-grab"
    >
      <span
        ref={scoreRef}
        id="helix-score"
        className="absolute top-4 right-5 md:right-8 z-10 text-3xl md:text-5xl font-bold text-white-50 pointer-events-none select-none"
      >
        0
      </span>
      <span className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 text-xs uppercase tracking-[0.2em] text-white/40 pointer-events-none select-none whitespace-nowrap">
        Drag or use A / D to steer
      </span>
    </div>
  );
};

export default HelixExperience;
