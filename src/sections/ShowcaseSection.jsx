import { useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TitleHeader from "../components/TitleHeader";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const filters = ["All", "Configurators", "Games", "Visualization", "AI"];
const PROJECTS_PER_PAGE = 9;

const projects = [
  {
    title: "Fortune Wheel",
    description:
      "Standalone wheel-of-fortune mini-game built for a fullstack take-home challenge, structured as if the spin outcome came from a real backend even though it has none. Weighted-sector logic, async providers with simulated latency and errors, an escalating big-win finale, and a fully responsive layout tuned with CSS container queries.",
    image: "/images/projects/fortune-wheel.jpg",
    alt: "Fortune Wheel",
    category: "Games",
    tags: ["TypeScript", "PixiJS", "Vite"],
    repoUrl: "https://github.com/danipetra/fortune-wheel-game",
  },
  {
    title: "Drift",
    description:
      "1v1 card game prototype combining positional melee combat with free-target ranged attacks across a two-lane board. Fully data-driven cards and decks, GSAP-animated combat sequences, a branching endless Tower Climb mode, and local persistence for collection, deck building and leaderboards.",
    image: "/images/projects/drift-card-game.png",
    alt: "Drift",
    category: "Games",
    tags: ["TypeScript", "PixiJS", "GSAP"],
    repoUrl: "https://github.com/danipetra/Drift",
  },
  {
    title: "Box Configurator",
    description:
      "Packaging configurator focused on real-time product customization, combining a 3D preview with a 2D dieline-based representation. Built around a scalable template-driven face mapping system to support multiple box formats and keep state predictable and extensible.",
    image: "/images/projects/box-configurator.png",
    video: "/videos/projects/box-configurator.mp4",
    alt: "Box Configurator",
    category: "Configurators",
    tags: ["React", "Three.js", "JavaScript"],
    repoUrl: "https://github.com/danipetra/box-configurator",
  },
  {
    title: "Chair Configurator",
    description:
      "Interactive 3D furniture configurator designed to explore real-time customization through a clean and immediate user flow. Focused on product visualization, rendering logic and frontend organization for configurable e-commerce experiences.",
    image: "/images/projects/chair-configurator.png",
    video: "/videos/projects/chair-configurator.mp4",
    alt: "Chair Configurator",
    category: "Configurators",
    tags: ["React", "Three.js", "JavaScript"],
    repoUrl: "https://github.com/danipetra/chair-custonization",
  },
  {
    title: "Keyboard Configurator",
    description:
      "Interactive 3D keyboard configurator centered on ergonomic and aesthetic customization. Built to explore modular product selection, immediate visual feedback and a clearer UX for comparing variants and components.",
    image: "/images/projects/keyboard-configurator.png",
    video: "/videos/projects/keyboard-configurator.mp4",
    alt: "Keyboard Configurator",
    category: "Configurators",
    tags: ["React", "Three.js", "JavaScript"],
    repoUrl: "https://github.com/danipetra/3d_shop",
  },
  {
    title: "Gravity Swap",
    description:
      "2D mobile game developed and published with Unity and C#, featuring dynamic gravity mechanics and procedural generation. Includes Google Ads SDK integration, Android release, gameplay balancing and lightweight performance optimization.",
    image: "/images/projects/gravity-swap.png",
    video: "/videos/projects/gravity-swap.mp4",
    alt: "Gravity Swap",
    category: "Games",
    tags: ["Unity", "C#", "APK"],
    downloadUrl: "/downloads/gravity-swap.apk",
  },
  {
    title: "Pint Toss",
    description:
      "3D arcade game made in a 3-day challenge for both mobile and PC. Explores platform-independent controls with the new Unity Input System, 3D line rendering and trajectory prediction.",
    image: "/images/projects/pint-toss.png",
    video: "/videos/projects/pint-toss.mp4",
    alt: "Pint Toss",
    category: "Games",
    tags: ["Unity", "C#"],
    repoUrl: "https://github.com/danipetra/Pint-Toss/tree/main/Scripts",
  },
  {
    title: "Block Breaker",
    description:
      "One of my first Unity projects, inspired by Arkanoid. Includes scene flow management, audio handling and a player power-up system, useful for strengthening gameplay structure and game state logic.",
    image: "/images/projects/block-breaker.png",
    video: "/videos/projects/block-breaker.mp4",
    alt: "Block Breaker",
    category: "Games",
    tags: ["Unity", "C#"],
    repoUrl:
      "https://github.com/danipetra/Portfolio/tree/main/Unity/Block%20Breaker/_Scripts",
  },
  {
    title: "VRVis",
    description:
      "VR application built for my thesis to visualize network anomalies through force-directed graphs. Combines Unity interaction, anomaly detection and data preprocessing through a custom Python REST API.",
    image: "/images/projects/vr-vis.png",
    video: "/videos/projects/vr-vis.mp4",
    alt: "VRVis",
    category: "Visualization",
    tags: ["Unity", "C#", "Python", "Flask", "VR"],
    repoUrl: "https://github.com/danipetra/Network-Graph-Visualization-VR",
  },
  {
    title: "2D Graph Viewer",
    description:
      "2D web visualization tool for network traffic anomalies, developed with G6. Supported by a Python REST API for preprocessing and data retrieval, with MIDAS used for anomaly detection.",
    image: "/images/projects/2d-graph-view.png",
    video: "/videos/projects/2d-graph-view.mp4",
    alt: "2D Graph Viewer",
    category: "Visualization",
    tags: ["JavaScript", "Python", "Flask", "G6"],
  },
  {
    title: "Flappy Bird IA",
    description:
      "AI experiment for a Flappy Bird clone built in JavaScript and D3. Combines neural-network-driven agents with a genetic algorithm to evolve progressively better solutions across iterations.",
    image: "/images/projects/flappy-ia.png",
    video: "/videos/projects/flappy-ia.mp4",
    alt: "Flappy Bird IA",
    category: "AI",
    tags: ["JavaScript", "Neural Networks", "Genetic Algorithm"],
    repoUrl: "https://github.com/danipetra/Flappy-Bird-IA",
  },
];

const AppShowcase = () => {
  const sectionRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE)
  );

  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * PROJECTS_PER_PAGE;
    return filteredProjects.slice(start, start + PROJECTS_PER_PAGE);
  }, [filteredProjects, currentPage]);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  const goToPage = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    setCurrentPage(page);
    sectionRef.current
      ?.querySelector(".work-grid")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useGSAP(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.2 }
    );

    gsap.fromTo(
      ".work-filter-pill",
      { y: 16, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.06,
        ease: "power2.out",
      }
    );

    ScrollTrigger.batch(".work-card", {
      start: "top bottom-=80",
      onEnter: (elements) => {
        gsap.fromTo(
          elements,
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: "power2.out",
          }
        );
      },
      once: true,
    });
  }, [activeFilter, currentPage]);

  return (
    <section id="work" ref={sectionRef} className="app-showcase">
      <div className="w-full">
        <div className="work-header">

          <TitleHeader
          title=" A selection of my Latest Projects"
          sub="🔥 Selected Works"
        />
          
          <div className="work-filters">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={`work-filter-pill ${
                  activeFilter === filter ? "is-active" : ""
                }`}
                onClick={() => handleFilterChange(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="work-grid">
          {paginatedProjects.map((project) => (
            <article key={project.title} className="work-card">
              <div className="work-card-media">
                <div className="media-wrapper">
                  <img
                    src={project.image}
                    alt={project.alt}
                    className="media mobile-only"
                  />

                  {project.video ? (
                    <video
                      className="media desktop-only"
                      src={project.video}
                      muted
                      loop
                      playsInline
                      preload="none"
                      poster={project.image}
                    />
                  ) : (
                    <img
                      src={project.image}
                      alt={project.alt}
                      className="media desktop-only"
                    />
                  )}
                </div>
              </div>

              <div className="work-card-body">
                <div className="work-card-top">
                  <h3>{project.title}</h3>

                  <div className="work-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="work-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="work-description">{project.description}</p>

                <div className="work-actions">
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="contact-btn group"
                    >
                      <div className="inner">
                        <span>View repo</span>
                      </div>
                    </a>
                  )}

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="ghost-work-btn"
                    >
                      Live demo
                    </a>
                  )}

                  {project.downloadUrl && (
                    <a
                      href={project.downloadUrl}
                      download
                      className="ghost-work-btn"
                    >
                      Download APK
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="work-pagination">
            <button
              type="button"
              className="work-page-btn"
              disabled={currentPage === 1}
              onClick={() => goToPage(currentPage - 1)}
              aria-label="Previous page"
            >
              &lt;
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <button
                  key={page}
                  type="button"
                  className={`work-page-btn ${
                    currentPage === page ? "is-active" : ""
                  }`}
                  onClick={() => goToPage(page)}
                  aria-current={currentPage === page ? "page" : undefined}
                >
                  {page}
                </button>
              )
            )}

            <button
              type="button"
              className="work-page-btn"
              disabled={currentPage === totalPages}
              onClick={() => goToPage(currentPage + 1)}
              aria-label="Next page"
            >
              &gt;
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default AppShowcase;