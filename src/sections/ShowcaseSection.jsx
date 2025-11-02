import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const AppShowcase = () => {
  const sectionRef = useRef(null);
  const rydeRef = useRef(null);
  const libraryRef = useRef(null);
  const ycDirectoryRef = useRef(null);

  useGSAP(() => {
    // Animation for the main section
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5 }
    );

    // Animations for each app showcase
    const cards = [rydeRef.current, libraryRef.current, ycDirectoryRef.current];

    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          y: 50,
          opacity: 0,
        },
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
          <div ref={rydeRef} className="first-project-wrapper">
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
            <div className="project" ref={libraryRef}>
              <div className="image-wrapper">
                <img
                  src="/images/vr-vis.png"
                  alt="Library Management Platform"
                />
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

            <div className="project" ref={ycDirectoryRef}>
              <div className="image-wrapper">
                <img src="/images/pint-toss.png" alt="YC Directory App" />
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
      </div>
    </div>
  );
};

export default AppShowcase;