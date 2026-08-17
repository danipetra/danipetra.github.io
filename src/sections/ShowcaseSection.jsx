import { useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TitleHeader from "../components/TitleHeader";
import { useGSAP } from "@gsap/react";
import { workFilters as filters, projects } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS_PER_PAGE = 9;

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