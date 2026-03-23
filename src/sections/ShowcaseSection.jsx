import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const AppShowcase = () => {
  const sectionRef = useRef(null);

  const chairRef = useRef(null);
  const boxConfigRef = useRef(null);
  const keyboardRef = useRef(null);
  // Second row 
  const gravityRef = useRef(null);
  const vrRef = useRef(null);
  const pintRef = useRef(null);
  // Third row
  const GraphRef = useRef(null);
  const FlappyIaRef = useRef(null);
  const BBRef = useRef(null);

  useGSAP(() => {
    // general fade in for the whole section
    gsap.fromTo(sectionRef.current, { opacity: 0 }, { opacity: 1, duration: 1.5 });

    const cards = [
      chairRef.current,
      boxConfigRef.current,
      keyboardRef.current,
      gravityRef.current,
      vrRef.current,
      pintRef.current,
      GraphRef.current,
      FlappyIaRef.current,
      BBRef.current
    ];

    cards.forEach((card, index) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3 * (index + 1),
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
          },
        }
      );
    });
    
  }, []);

  return (
    <div id="work" ref={sectionRef} className="app-showcase">
      <div className="w-full">
        <div className="showcaselayout xl:flex-row-reverse xl:flex-row-reverse mt-16 xl:mt-24">
          <div ref={boxConfigRef} className="first-project-wrapper">
            <div className="image-wrapper">
              <div className="media-wrapper">
                {/* Mobile: immagine */}
                <img
                  src="/images/projects/box-configurator.png"
                  alt="Box Configurator"
                  className="media mobile-only"
                />
                {/* Desktop/Tablet: video */}
                <video
                  className="media desktop-only"
                  src="/videos/projects/box-configurator.mp4"
                  muted
                  playsInline
                  preload="none"
                  poster="/images/projects/box-configurator.png"
                />
              </div>
            </div>
            <div className="text-content">
              <h2>Box Configurator</h2>
              <p className="text-white-50 md:text-xl">
                Developed a packaging configurator focused on real-time product customization,
                combining a 3D preview with a 2D dieline-based representation of the box.
                The project was structured to keep configuration state predictable and scalable,
                with a template-driven face mapping system designed to support different box formats.
                Main focus areas included interactive visualization, product configuration UX,
                clean frontend architecture and extensibility for future packaging templates.
              </p>
              <a
                href="https://github.com/danipetra/box-configurator" target="_blank"
                className="contact-btn group mt-4"
              >
                <div className="inner"><span>View repo</span></div>
              </a>
            </div>
          </div>

          <div className="project-list-wrapper overflow-hidden">
            <div className="project" ref={chairRef}>
              <div className="image-wrapper">
                <div className="media-wrapper">
                  {/* Mobile: immagine */}
                  <img
                    src="/images/projects/chair-configurator.png"
                    alt="Chair Configurator"
                    className="media mobile-only"
                  />
                  {/* Desktop/Tablet: video */}
                  <video
                    className="media desktop-only"
                    src="/videos/projects/chair-configurator.mp4"
                    muted
                    loop
                    playsInline
                    preload="none"
                    poster="/images/projects/chair-configurator.png"
                    controls
                  />
                </div>
              </div>
              <h2>Chair Configurator</h2>
              <p className="text-white-50 md:text-xl">
                Interactive 3D product configurator built to explore furniture customization in real time.
                The experience focuses on a clean and immediate user flow, allowing users to preview design
                variations directly in the viewport while changing visual and structural options.
                The project was useful to deepen product visualization logic, real-time rendering and
                frontend component organization for customizable e-commerce experiences.
              </p>
              <a target="_blank" href="https://github.com/danipetra/chair-custonization" className="contact-btn group mt-4">
                <div className="inner"><span>View repo</span></div>
              </a>
            </div>

            <div className="project" ref={keyboardRef}>
              <div className="image-wrapper">
                <div className="media-wrapper">
                  {/* Mobile: immagine */}
                  <img
                    src="/images/projects/keyboard-configurator.png"
                    alt="Keyboard Configurator"
                    className="media mobile-only"
                  />
                  {/* Desktop/Tablet: video */}
                  <video
                    className="media desktop-only"
                    src="/videos/projects/keyboard-configurator.mp4"
                    muted
                    playsInline
                    preload="none"
                    poster="/images/projects/keyboard-configurator.png" 
                    controls
                  />
                </div>
              </div>
              <h2>Keyboard Configurator</h2>
              <p className="text-white-50 md:text-xl">
                Interactive 3D keyboard configurator built to explore ergonomic and aesthetic customization in real time.
                The experience focuses on a clean and immediate user flow, allowing users to preview design
                variations directly in the viewport while changing visual and structural options.
                The project was useful to deepen product visualization logic, real-time rendering and
                frontend component organization for customizable e-commerce experiences.
              </p>
              <a
                target="_blank"
                href="https://github.com/danipetra/3d_shop"
                className="contact-btn group mt-4"
              >
                <div className="inner"><span>View repo</span></div>
              </a>
            </div>
          </div>
        </div> 
        
        {/* ---- Second row ---- */}
        <div className="showcaselayout">
          <div ref={gravityRef} className="first-project-wrapper">
            <div className="image-wrapper">
              <div className="media-wrapper">
                {/* Mobile: immagine */}
                <img
                  src="/images/projects/gravity-swap.png"
                  alt="Ryde App Interface"
                  className="media mobile-only"
                />
                {/* Desktop/Tablet: video */}
                <video
                  className="media desktop-only"
                  src="/videos/projects/gravity-swap.mp4"
                  muted
                  loop
                  playsInline
                  preload="none"
                  poster="/images/projects/gravity-swap.png"
                  controls
                />
              </div>
            </div>
            <div className="text-content">
              <h2>
                Gravity Swap
              </h2>
              <p className="text-white-50 md:text-xl">
                Designed, developed and published a 2D mobile game using Unity and C#, featuring dynamic gravity mechanics and procedural generation.
                Integrated Google Ads SDK for monetization and released on Android.
                Focused on gameplay balance, UX, and lightweight performance optimization.
              </p>
              <a href="/downloads/gravity-swap.apk" download
                className="contact-btn group mt-4"
              >
                <div className="inner"><span>Download APK</span></div>
              </a>
            </div>
          </div>

          <div className="project-list-wrapper overflow-hidden">
            <div className="project" ref={vrRef}>
              <div className="image-wrapper">
                  <div className="media-wrapper">
                    {/* Mobile: immagine */}
                    <img
                      src="/images/projects/vr-vis.png"
                      alt="Library Management Platform"
                      className="media mobile-only"
                    />
                    {/* Desktop/Tablet: video */}
                    <video
                      className="media desktop-only"
                      src="/videos/projects/vr-vis.mp4"
                      muted
                      loop
                      playsInline
                      preload="none"
                      poster="/images/projects/vr-vis.png"
                      controls
                    />
                  </div>
              </div>
              <h2>VRVis</h2>
              <p className="text-white-50 md:text-xl">
                For my thesis project, I combined my passion for Unity and game development with my background in data analysis and visualization. I built a VR application that visualizes network anomalies through force-directed graphs, focusing on interaction and anomaly detection.
                A custom Python RESTful API (Flask + pandas) handles the preprocessing and retrieval of network traffic data.
                  Main features:
                  Free player movement and camera control;
                  Interactive graph nodes;
                  Anomaly detection using MIDAS;
                  Community detection using Comuna;
                  Graph controls (rotation, resizing, etc.);
              </p>
            </div>

            <div className="project" ref={pintRef}>
              <div className="image-wrapper">
                <a
                  href="https://github.com/danipetra/Pint-Toss/tree/main/Scripts"
                  target="_blank"
                >
                  <div className="media-wrapper">
                    {/* Mobile: immagine */}
                    <img
                      src="/images/projects/pint-toss.png"
                      alt="YC Directory App"
                      className="media mobile-only"
                    />
                    {/* Desktop/Tablet: video */}
                    <video
                      className="media desktop-only"
                      src="/videos/projects/pint-toss.mp4"
                      muted
                      playsInline
                      preload="none"
                      poster="/images/projects/pint-toss.png"
                    />
                  </div>
                </a>
              </div>
              <h2>Pint Toss</h2>
              <p className="text-white-50 md:text-xl">
                I Realized a 3D arcade game in a 3 days game challenge. The game is builded for both mobile and PC. The new subjects I explored during this work were:
                  Platform independent controls, using the new Unity Input System;
                  3D line rendering and game objects trajectory prediction;
              </p>
              <a
                href="https://github.com/danipetra/Pint-Toss/tree/main/Scripts"
                className="contact-btn group mt-4"
              >
                <div className="inner"><span>View repo</span></div>
              </a>
            </div>
          </div>
        </div>

        {/* ---- Third row ---- */}
        <div className="showcaselayout xl:flex-row-reverse xl:flex-row-reverse mt-16 xl:mt-24">
          <div ref={BBRef} className="first-project-wrapper">
            <div className="image-wrapper">
              <div className="media-wrapper">
                {/* Mobile: immagine */}
                <img
                  src="/images/projects/block-breaker.png"
                  alt="BB"
                  className="media mobile-only"
                />
                {/* Desktop/Tablet: video */}
                <video
                  className="media desktop-only"
                  src="/videos/projects/block-breaker.mp4"
                  muted
                  playsInline
                  preload="none"
                  poster="/images/projects/block-breaker.png"
                />
              </div>
            </div>
            <div className="text-content">
              <h2>Block Breaker</h2>
              <p className="text-white-50 md:text-xl">
                Block Breaker was one of the first games I developed with Unity. It's a 2D game inspired by Arkanoid. Among the game systems developed there are:
                  -Scene management, with Start, Gameover and Levels Scenes.
                  -Audio management.
                  -Player Powerups System.
              </p>
              <a
                href="https://github.com/danipetra/Portfolio/tree/main/Unity/Block%20Breaker/_Scripts"
                className="contact-btn group mt-4"
              >
                <div className="inner"><span>View repo</span></div>
              </a>
            </div>
          </div>

          <div className="project-list-wrapper overflow-hidden">
            <div className="project" ref={GraphRef}>
              <div className="image-wrapper">
                <div className="media-wrapper">
                  {/* Mobile: immagine */}
                  <img
                    src="/images/projects/2d-graph-view.png"
                    alt="2D Graph Viewer"
                    className="media mobile-only"
                  />
                  {/* Desktop/Tablet: video */}
                  <video
                    className="media desktop-only"
                    src="/videos/projects/2d-graph-view.mp4"
                    muted
                    loop
                    playsInline
                    preload="none"
                    poster="/images/projects/2d-graph-view.png"
                    controls
                  />
                </div>
              </div>
              <h2>2D Graph Viewer</h2>
              <p className="text-white-50 md:text-xl">
                In collaboration with Dromic, I made a 2D visualization web application to show anomalies of network traffic, using G6, a Javascript visualization engine. 
                To recover network traffic data records before the rendering, I developed a Python Restful API, using pandas and flask. For the anomaly detection activity I used MIDAS, a C++ library.
              </p>
              {/* <a target="_blank" href="#" className="contact-btn group mt-4">
                <div className="inner"><span>View repo</span></div>
              </a> */}
            </div>

            <div className="project" ref={FlappyIaRef}>
              <div className="image-wrapper">
                <div className="media-wrapper">
                  {/* Mobile: immagine */}
                  <img
                    src="/images/projects/flappy-ia.png"
                    alt="Flappy Bird IA"
                    className="media mobile-only"
                  />
                  {/* Desktop/Tablet: video */}
                  <video
                    className="media desktop-only"
                    src="/videos/projects/flappy-ia.mp4"
                    muted
                    playsInline
                    preload="none"
                    poster="/images/projects/flappy-ia.png" 
                    controls
                  />
                </div>
              </div>
              <h2>Flappy Bird IA</h2>
              <p className="text-white-50 md:text-xl">
                I made an AI that plays a flappy bird clone game, using Javascript and the D3 library. 
                The AI combines agents using neural networks, with a genetic algrithm that creates better agents based on the best ones of each previous iteration.
              </p>
              <a
                target="_blank"
                href="https://github.com/danipetra/Flappy-Bird-IA"
                className="contact-btn group mt-4"
              >
                <div className="inner"><span>View repo</span></div>
              </a>
            </div>
          </div>
        </div> 

      </div>
    </div>
  );
};

export default AppShowcase;