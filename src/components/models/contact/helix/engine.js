import * as THREE from "three";
import { gsap } from "gsap";
import { GameOptions } from "./gameOptions";
import { Platform } from "./platform";
import { Ball } from "./ball";

const MAX_PIXEL_RATIO = 1.5; // matches the cap used by the other 3D scenes on the site

function disposeObject3D(root) {
  root.traverse((obj) => {
    if (obj.geometry) obj.geometry.dispose();
    if (obj.material) {
      const materials = Array.isArray(obj.material) ? obj.material : [obj.material];
      materials.forEach((m) => m.dispose());
    }
  });
}

// Creates and runs a self-contained Helix Jump instance scoped to `container`,
// instead of the original full-window/document.body setup.
export function createHelixGame(container, scoreElement) {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    50,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.set(0, 4, 12);
  camera.lookAt(0, -2, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setClearColor(GameOptions.backgroundColor, 1);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, MAX_PIXEL_RATIO));
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.domElement.className = "block w-full h-full";
  container.appendChild(renderer.domElement);

  // WebGL contexts can be lost at any time (GPU driver reset, context-limit pressure —
  // notably common on laptops with hybrid/switchable graphics); opt in to the browser's
  // automatic restoration attempt. Unlike the R3F scenes elsewhere on the site, this loop
  // renders unconditionally every frame while visible (no on-demand frameloop), so once
  // the context is restored the next tick just works again — no manual invalidate needed.
  const onContextLost = (e) => e.preventDefault();
  renderer.domElement.addEventListener("webglcontextlost", onContextLost, false);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
  scene.add(ambientLight);

  const light = new THREE.PointLight(0xffffff, 40);
  light.position.set(5, 10, 7.5);
  light.castShadow = true;
  scene.add(light);

  const columnGeometry = new THREE.CylinderGeometry(
    GameOptions.columnRadius,
    GameOptions.columnRadius,
    50
  );
  const columnMaterial = new THREE.MeshStandardMaterial({
    color: GameOptions.columnColor,
  });
  const column = new THREE.Mesh(columnGeometry, columnMaterial);
  column.receiveShadow = true;
  scene.add(column);

  const platformGroup = new THREE.Group();
  scene.add(platformGroup);

  const platformGraveyard = new THREE.Group();
  scene.add(platformGraveyard);

  function buildPlatforms() {
    for (let i = 0; i < GameOptions.totalPlaftforms; i++) {
      const platform = new Platform(GameOptions.platformGap * -i, i > 0);
      platformGroup.add(platform);
    }
  }
  buildPlatforms();

  const ball = new Ball();
  scene.add(ball);

  // --- controls: keyboard (when the canvas has focus) + pointer drag (mouse/touch) ---
  const keys = {};
  let dragRotation = 0; // accumulated rotation from pointer dragging this frame
  let isDragging = false;

  const onKeyDown = (e) => {
    const key = e.key.toLowerCase();
    if (!keys[key]) keys[key] = Date.now();
  };
  const onKeyUp = (e) => {
    keys[e.key.toLowerCase()] = false;
  };

  const onPointerDown = (e) => {
    isDragging = true;
    renderer.domElement.setPointerCapture(e.pointerId);
    container.classList.replace("cursor-grab", "cursor-grabbing");
    container.focus();
  };
  const onPointerMove = (e) => {
    if (!isDragging) return;
    dragRotation += -e.movementX * GameOptions.dragRotationSpeed;
  };
  const endDrag = (e) => {
    isDragging = false;
    container.classList.replace("cursor-grabbing", "cursor-grab");
    if (e && renderer.domElement.hasPointerCapture?.(e.pointerId)) {
      renderer.domElement.releasePointerCapture(e.pointerId);
    }
  };

  container.addEventListener("keydown", onKeyDown);
  container.addEventListener("keyup", onKeyUp);
  renderer.domElement.addEventListener("pointerdown", onPointerDown);
  renderer.domElement.addEventListener("pointermove", onPointerMove);
  renderer.domElement.addEventListener("pointerup", endDrag);
  renderer.domElement.addEventListener("pointercancel", endDrag);
  renderer.domElement.addEventListener("pointerleave", endDrag);

  // --- resize: track the container, not the window ---
  const resizeObserver = new ResizeObserver(() => {
    const { clientWidth, clientHeight } = container;
    if (clientWidth === 0 || clientHeight === 0) return;
    camera.aspect = clientWidth / clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(clientWidth, clientHeight);
  });
  resizeObserver.observe(container);

  // --- visibility: stop rendering when the game is scrolled off-screen or the tab is hidden ---
  let isVisible = true;
  const intersectionObserver = new IntersectionObserver(
    ([entry]) => {
      isVisible = entry.isIntersecting;
    },
    { threshold: 0.01 }
  );
  intersectionObserver.observe(container);

  const onVisibilityChange = () => {
    if (!document.hidden) clock.getDelta(); // avoid a huge delta jump after being backgrounded
  };
  document.addEventListener("visibilitychange", onVisibilityChange);

  const clock = new THREE.Clock();
  const spikeTip = new THREE.Vector3(); // reused every frame to avoid per-spike allocation
  let gameOver = false;
  let score = 0;
  let rafId = null;
  let resetTimeoutId = null;
  const activeTweens = new Set();

  function setScore(value) {
    score = value;
    if (scoreElement) scoreElement.textContent = String(score);
  }

  function resetGame() {
    setScore(0);
    gameOver = false;

    ball.position.set(0, 2, GameOptions.platformRadius - GameOptions.ballRadius);
    ball.velocity = 0;

    camera.position.set(0, 4, 12);
    camera.lookAt(0, -2, 0);

    column.position.y = 0;

    platformGroup.clear();
    buildPlatforms();
    platformGroup.rotation.y = 0;
    platformGraveyard.rotation.y = 0;

    ball.material.color.set(GameOptions.ballColor);
  }

  function handleGameOver(spikeTip) {
    gameOver = true;

    const cameraTween = gsap.to(camera.position, {
      z: ball.position.z + 4,
      x: spikeTip.x > 0 ? ball.position.x + 4 : ball.position.x - 4,
      y: ball.position.y,
      duration: 2,
      ease: "power2.out",
      onUpdate: () => {
        camera.lookAt(ball.position.x, ball.position.y, ball.position.z);
      },
    });
    activeTweens.add(cameraTween);

    const colorTween = gsap.to(ball.material.color, {
      r: 1,
      g: 0,
      b: 0,
      duration: 2,
    });
    activeTweens.add(colorTween);

    resetTimeoutId = setTimeout(() => {
      resetTimeoutId = null;
      resetGame();
    }, 3000);
  }

  function update() {
    rafId = requestAnimationFrame(update);

    if (!isVisible || document.hidden) {
      clock.getDelta(); // keep delta from accumulating while paused
      return;
    }

    if (gameOver) {
      renderer.render(scene, camera);
      return;
    }

    const delta = Math.min(clock.getDelta(), 0.1);

    const topPlatform = platformGroup.children[0];
    const currentCameraY = camera.position.y;
    const targetY = topPlatform.position.y + 4;

    camera.position.y = THREE.MathUtils.lerp(currentCameraY, targetY, 0.03);
    camera.lookAt(
      0,
      THREE.MathUtils.lerp(currentCameraY - 6, topPlatform.position.y - 2, 0.03),
      0
    );

    light.position.y = camera.position.y + 6;

    let rotateDirection = 0;
    if (keys["a"] && !keys["d"]) {
      rotateDirection = 1;
    } else if (keys["d"] && !keys["a"]) {
      rotateDirection = -1;
    } else if (keys["d"] && keys["a"]) {
      rotateDirection = keys["a"] > keys["d"] ? 1 : -1;
    }

    const keyboardRotation = rotateDirection * GameOptions.rotationSpeed * delta;
    const totalRotation = keyboardRotation + dragRotation;
    dragRotation = 0;

    platformGroup.rotation.y += totalRotation;
    platformGraveyard.rotation.y += totalRotation;

    ball.update(delta);

    const topmostPlatform = platformGroup.children[0];

    for (const spike of topmostPlatform.spikes) {
      spikeTip.set(0, GameOptions.spikeHeight / 2, 0);
      spike.localToWorld(spikeTip);

      const distanceToTip = spikeTip.distanceTo(ball.position);

      if (distanceToTip < GameOptions.ballRadius * 0.9) {
        handleGameOver(spikeTip);
        renderer.render(scene, camera);
        return;
      }
    }

    if (ball.velocity < 0) {
      const impactPoint =
        topmostPlatform.position.y + GameOptions.platformHeight / 2 + GameOptions.ballRadius;

      if (ball.position.y < impactPoint) {
        const startAngle =
          ((topmostPlatform.rotation.y + platformGroup.rotation.y) % (Math.PI * 2) +
            Math.PI * 2) %
          (Math.PI * 2);
        const endAngle =
          ((startAngle + topmostPlatform.thetaLength) % (Math.PI * 2) + Math.PI * 2) %
          (Math.PI * 2);

        if (startAngle < endAngle) {
          platformGroup.remove(topmostPlatform);
          platformGraveyard.add(topmostPlatform);
          topmostPlatform.fadeAndRemove(platformGraveyard, activeTweens);

          column.position.y -= GameOptions.platformGap;

          const lastPlatform = platformGroup.children[platformGroup.children.length - 1];
          const newY = lastPlatform.position.y - GameOptions.platformGap;
          const newPlatform = new Platform(newY, true);
          platformGroup.add(newPlatform);

          setScore(score + 1);
        } else {
          ball.position.y = impactPoint;
          ball.bounce();
        }
      }
    }

    renderer.render(scene, camera);
  }

  update();

  function dispose() {
    cancelAnimationFrame(rafId);
    if (resetTimeoutId) clearTimeout(resetTimeoutId);
    activeTweens.forEach((tween) => tween.kill());
    activeTweens.clear();
    gsap.killTweensOf(camera.position);
    gsap.killTweensOf(ball.material.color);

    resizeObserver.disconnect();
    intersectionObserver.disconnect();
    document.removeEventListener("visibilitychange", onVisibilityChange);

    container.removeEventListener("keydown", onKeyDown);
    container.removeEventListener("keyup", onKeyUp);
    renderer.domElement.removeEventListener("pointerdown", onPointerDown);
    renderer.domElement.removeEventListener("pointermove", onPointerMove);
    renderer.domElement.removeEventListener("pointerup", endDrag);
    renderer.domElement.removeEventListener("pointercancel", endDrag);
    renderer.domElement.removeEventListener("pointerleave", endDrag);
    renderer.domElement.removeEventListener("webglcontextlost", onContextLost);

    disposeObject3D(scene);
    renderer.dispose();
    if (renderer.domElement.parentNode === container) {
      container.removeChild(renderer.domElement);
    }
  }

  return { dispose };
}
