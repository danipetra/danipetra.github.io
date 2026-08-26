import * as THREE from "three";
import { gsap } from "gsap";
import { GameOptions } from "./gameOptions";

// Shared resources: color/count never change at runtime, so every platform
// reuses the same instances instead of allocating new ones each time.
// (fadeAndRemove clones a mesh's material before mutating it, so these
// shared instances are never touched by the fade-to-white effect.)
const platformMaterials = GameOptions.platformColors.map(
  (color) => new THREE.MeshStandardMaterial({ color })
);
const gapMaterial = new THREE.MeshStandardMaterial({
  color: GameOptions.gapColor,
  transparent: true,
  opacity: GameOptions.gapOpacity,
});
const spikeGeometry = new THREE.ConeGeometry(GameOptions.spikeRadius, GameOptions.spikeHeight);
const spikeMaterial = new THREE.MeshStandardMaterial({ color: GameOptions.spikeColor });

// Platform class extends THREE.Group
export class Platform extends THREE.Group {
  constructor(posY, hasSpikes) {
    super();

    this.spikes = [];
    // cylinder + gap have geometry unique to this platform (dispose on removal);
    // spikes share a single static geometry across the whole game (never dispose it)
    this.uniqueGeometryMeshes = [];

    // choose a random rotation angle around the column
    const angle = hasSpikes ? Math.random() * Math.PI * 2 : -Math.PI / 2;

    const material =
      platformMaterials[Math.floor(Math.random() * platformMaterials.length)];

    // angular length of the platform arc
    this.thetaLength = hasSpikes
      ? GameOptions.minThetaLength +
        Math.random() * (GameOptions.maxThetaLength - GameOptions.minThetaLength)
      : Math.PI;

    // curved surface of the platform
    const cylinderGeometry = new THREE.CylinderGeometry(
      GameOptions.platformRadius,
      GameOptions.platformRadius,
      GameOptions.platformHeight,
      32,
      1,
      false,
      0,
      this.thetaLength
    );

    const cylinder = new THREE.Mesh(cylinderGeometry, material);
    cylinder.castShadow = true;
    cylinder.receiveShadow = true;
    this.add(cylinder);
    this.uniqueGeometryMeshes.push(cylinder);

    // gap, where the ball should land
    const gapGeometry = new THREE.CylinderGeometry(
      GameOptions.platformRadius,
      GameOptions.platformRadius,
      GameOptions.platformHeight,
      32,
      1,
      false,
      this.thetaLength,
      Math.PI * 2 - this.thetaLength
    );

    const gap = new THREE.Mesh(gapGeometry, gapMaterial);
    // it's meant to read as an opening, not a solid surface — no shadow casting
    gap.receiveShadow = true;
    this.add(gap);
    this.uniqueGeometryMeshes.push(gap);

    if (hasSpikes) {
      const spikeStep = Math.PI / 16;
      for (
        let angleSpike = Math.PI / 60;
        angleSpike < this.thetaLength - Math.PI / 60;
        angleSpike += spikeStep
      ) {
        if (Math.random() < GameOptions.spikeProbability) {
          const spike = new THREE.Mesh(spikeGeometry, spikeMaterial);

          // random between -2 and +2 degrees in radians
          const jitter = (Math.random() * 4 - 2) * (Math.PI / 180);
          const finalAngle = angleSpike + jitter;

          spike.position.x =
            Math.cos(-finalAngle + Math.PI / 2) *
            (GameOptions.platformRadius - GameOptions.ballRadius);
          spike.position.z =
            Math.sin(-finalAngle + Math.PI / 2) *
            (GameOptions.platformRadius - GameOptions.ballRadius);
          spike.position.y = GameOptions.platformHeight / 2 + GameOptions.spikeHeight / 2;

          spike.castShadow = true;
          spike.receiveShadow = true;

          this.add(spike);
          this.spikes.push(spike);
        }
      }
    }

    this.position.y = posY;
    this.rotation.y = angle;
  }

  // fade out and remove the platform, tracking the tween so it can be killed on dispose
  fadeAndRemove(parentGroup, tweenRegistry) {
    // clone before mutating: cylinder/gap/spike materials are shared across
    // platforms, so whitening them in place would flash every other platform
    // (and every spike in the game) white too
    this.children.forEach((child) => {
      child.material = child.material.clone();
      child.material.color.set(0xffffff);
    });

    const tween = gsap.to(this.position, {
      y: this.position.y + 5,
      duration: 1,
      ease: "power2.out",
      onComplete: () => {
        parentGroup.remove(this);
        tweenRegistry?.delete(tween);

        // this platform is gone for good: free the material clones made above,
        // plus the geometry that's unique to this platform (cylinder/gap).
        // Spikes share one static geometry across the whole game — never dispose it.
        this.children.forEach((child) => child.material.dispose());
        this.uniqueGeometryMeshes.forEach((mesh) => mesh.geometry.dispose());
      },
    });

    tweenRegistry?.add(tween);
  }
}
