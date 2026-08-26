import * as THREE from "three";
import { GameOptions } from "./gameOptions";

// Ball class extends THREE.Mesh
export class Ball extends THREE.Mesh {
  constructor() {
    const material = new THREE.MeshStandardMaterial({
      color: GameOptions.ballColor,
    });

    const geometry = new THREE.SphereGeometry(GameOptions.ballRadius);

    super(geometry, material);

    this.castShadow = true;
    this.position.set(0, 2, GameOptions.platformRadius - GameOptions.ballRadius);
    this.velocity = 0;
  }

  // apply gravity and update vertical position
  update(delta) {
    this.velocity -= GameOptions.gravity * delta;
    this.position.y += this.velocity * delta;
  }

  // make the ball bounce
  bounce() {
    this.velocity = GameOptions.bounceImpulse;
  }
}
