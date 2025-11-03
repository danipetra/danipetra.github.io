import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const AppShowcase = () => {
  const sectionRef = useRef(null);
  
  const gravityRef = useRef(null);
  const vrRef = useRef(null);
  const pintRef = useRef(null);
  
  //TODO - nuovi ref per la seconda riga
  const smallARef = useRef(null);
  const smallBRef = useRef(null);
  const bigRightRef = useRef(null);

  useGSAP(() => {
  // fade-in generale della sezione
  gsap.fromTo(sectionRef.current, { opacity: 0 }, { opacity: 1, duration: 1.5 });

  const cards = [
    gravityRef.current,
    vrRef.current,
    pintRef.current,
    smallARef.current,
    smallBRef.current,
    bigRightRef.current
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
        <div className="showcaselayout">
          <div ref={gravityRef} className="first-project-wrapper">
            <div className="image-wrapper">
              <img src="/images/gravity-swap.png" alt="Ryde App Interface" />
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
            </div>
          </div>

          <div className="project-list-wrapper overflow-hidden">
            <div className="project" ref={vrRef}>
              <div className="image-wrapper">
                <a href="https://github.com/danipetra/Network-Graph-Visualization-VR" target="_blank"><img
                  src="/images/vr-vis.png"
                  alt="Library Management Platform"
                /></a>
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
                <a href="https://github.com/danipetra/Pint-Toss" target="_blank"><img src="/images/pint-toss.png" alt="YC Directory App" /></a>
              </div>
              <h2>Pint Toss</h2>
              <p className="text-white-50 md:text-xl">
                I Realized a 3D arcade game in a 2 weeks game challenge. The game is builded for both mobile and PC. The new subjects I explored during this work were:
                  Platform independent controls, using the new Unity Input System;
                  3D line rendering and game objects trajectory prediction;
              </p>
            </div>
          </div>
        </div>

        {/* ---- SECONDA RIGA SPECULARE ---- */}
        {/* <div className="showcaselayout xl:flex-row-reverse">
          <div ref={bigRightRef} className="first-project-wrapper">
            <div className="image-wrapper">
              <img src="/images/pint-toss.png" alt="Big Project" />
            </div>
            <div className="text-content">
              <h2>Big Project Right</h2>
              <p className="text-white-50 md:text-xl">
                Designed, developed and published a 2D mobile game using Unity and C#, featuring dynamic gravity mechanics and procedural generation.
                Integrated Google Ads SDK for monetization and released on Android.
                Focused on gameplay balance, UX, and lightweight performance optimization.
              </p>
              
            </div>
          </div>

          <div className="project-list-wrapper overflow-hidden">
            <div className="project" ref={smallARef}>
              <div className="image-wrapper">
                <img src="/images/pint-toss.png" alt="Small Project A" />
              </div>
              <h2>Small Project A</h2>
              <p className="text-white-50 md:text-xl">
                Breve descrizione del progetto piccolo A...
              </p>
              <a href="#" className="contact-btn group mt-4">
                <div className="inner"><span>View repo</span></div>
              </a>
            </div>

            <div className="project" ref={smallBRef}>
              <div className="image-wrapper">
                <img src="/images/pint-toss.png" alt="Small Project B" />
              </div>
              <h2>Small Project B</h2>
              <p className="text-white-50 md:text-xl">
                Breve descrizione del progetto piccolo B...
              </p>
              <a href="#" className="contact-btn group mt-4">
                <div className="inner"><span>View repo</span></div>
              </a>
            </div>
          </div>
        </div> */}

      </div>
    </div>
  );
};

export default AppShowcase;