// Palette matches the portfolio's own theme tokens (see index.css @theme)
// for column/ball/gap, plus an all-red ramp for the platforms so the
// near-black spikes stay visible against every platform shade.
export const GameOptions = {
  columnRadius: 1, // column radius
  columnColor: 0x282732, // column color — theme black-200
  totalPlaftforms: 10, // total platforms in game
  platformGap: 3, // vertical gap between two platforms
  platformRadius: 3, // platform radius
  platformHeight: 1, // platform height
  minThetaLength: Math.PI * 1.5, // min theta length, minimum radians of the circular sector
  maxThetaLength: Math.PI * 1.85, // max theta length, maximum radians of the circular sector
  rotationSpeed: 6, // helix rotation speed (keyboard control)
  dragRotationSpeed: 0.012, // radians of rotation per pixel dragged (pointer control)
  backgroundColor: "#2b0f10", // arena background — dark oxblood red
  gapColor: 0x839cb5, // gap marker color — theme blue-50
  gapOpacity: 0.5, // gap is a traversable opening, rendered half-transparent
  ballRadius: 0.4, // ball radius
  ballColor: 0xd9ecff, // ball color — theme white-50, for contrast against the dark arena
  spikeRadius: 0.2, // spike radius
  spikeHeight: 0.6, // spike height
  spikeColor: 0x0e0e10, // spike color — theme black-100
  gravity: 10, // ball gravity
  bounceImpulse: 6, // ball bounce impulse
  spikeProbability: 0.25, // probability of a spike to appear, 0..1
  platformColors: [0x431515, 0x5c1a1a, 0x7a2323, 0x932c2c],
};
