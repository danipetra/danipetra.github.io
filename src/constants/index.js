const navLinks = [
  {
    name: "Work",
    link: "#work",
  },
  {
    name: "Experience",
    link: "#experience",
  },
  {
    name: "Skills",
    link: "#skills",
  },
];

const words = [
  { text: "Ideas", imgPath: "/images/ideas.svg" },
  { text: "Concepts", imgPath: "/images/concepts.svg" },
  { text: "Designs", imgPath: "/images/designs.svg" },
  { text: "Code", imgPath: "/images/code.svg" },
  { text: "Ideas", imgPath: "/images/ideas.svg" },
  { text: "Concepts", imgPath: "/images/concepts.svg" },
  { text: "Designs", imgPath: "/images/designs.svg" },
  { text: "Code", imgPath: "/images/code.svg" },
];

const counterItems = [
  { value: 4, suffix: "+", label: "Years of Experience" },
  { value: 15, suffix: "+", label: "Completed Projects" },
  { value: 10, suffix: "+", label: "Games & Interactive Experiences" },
  { value: 8, suffix: "+", label: "Mastered Technologies" },
];

const techStackImgs = [
  {
    name: "Javascript & Typescript Developer",
    imgPath: "/images/logos/node.png",
  },
  {
    name: "React",
    imgPath: "/images/logos/react.png",
  },
  {
    name: "Angular",
    imgPath: "/images/logos/angular.svg",
  },
  {
    name: "Pixi.js",
    imgPath: "/images/logos/pixijs.png",
  },
  {
    name: "Three.js & Interaction",
    imgPath: "/images/logos/three.png",
  },
  {
    name: "Unity & C#",
    imgPath: "/images/logos/unity.png",
  },
  {
    name: "Unreal Engine & C++",
    imgPath: "/images/logos/unrealengine.png",
  },
  {
    name: "Laravel & PHP",
    imgPath: "/images/logos/laravel.png",
  },
  {
    name: "Git & GitHub",
    imgPath: "/images/logos/git.svg",
  },
  {
    name: "GSAP",
    imgPath: "/images/logos/gsap.svg",
  },
];

const techStackIcons = [
  {
    name: "Javascript Developer",
    modelPath: "/models/node-transformed.glb",
    scale: 5,
    rotation: [0, -Math.PI / 2, 0],
  },
  {
    name: "React Developer",
    modelPath: "/models/react_logo-transformed.glb",
    scale: 1,
    rotation: [0, 0, 0],
  },
  {
    name: "Python Developer",
    modelPath: "/models/python-transformed.glb",
    scale: 0.8,
    rotation: [0, 0, 0],
  },
  {
    name: "Interactive Developer",
    modelPath: "/models/three.js-transformed.glb",
    scale: 0.05,
    rotation: [0, 0, 0],
  },
  {
    name: "Git and Gitlab",
    modelPath: "/models/git-svg-transformed.glb",
    scale: 0.05,
    rotation: [0, -Math.PI / 4, 0],
  },
];

const expCards = [
  {
    review: "Daniele brought creativity and technical expertise to the team, significantly improving our frontend performance. His work has been invaluable in delivering faster experiences.",
    imgPath: "/images/exp1.png",
    logoPath: "/images/logo1.png",
    title: "Frontend Engineer",
    date: "January 2025 - Present",
    responsibilities: [
      "Developed and maintained responsive websites and web apps using JavaScript, Laravel, and PHP.",
      "Integrated and configured third-party tools such as Google Analytics, Iubenda, reCAPTCHA, and Bootstrap to enhance functionality and compliance.",
      "Worked closely with designers to ensure pixel-perfect UI implementation and high-quality user experiences across devices.",
      "Improved website performance and accessibility following modern SEO and UX best practices."
    ],
  },
  {
    review: "Daniele’s contributions to Docker's web applications have been outstanding. He approaches challenges with a problem-solving mindset.",
    imgPath: "/images/exp2.png",
    logoPath: "/images/logo2.png",
    title: "Frontend Game Developer",
    date: "May 2023 - December 2024",
    responsibilities: [
      "Worked on the development and optimization of online slot games built with Javascript and PixiJS for desktop and mobile platforms.",
      "Worked on MySlots, a customizable slot game built with React and PixiJS, allowing full customization of reels, gameplay, and visuals through an intuitive UI.",
      "Collaborated with game designers, artists, and backend developers to implement gameplay logic, UI/UX animations, audio and smooth visual effects using Howler, Pixi-Spine, Gimp and custom shaders.",
      "Collaboration within an international team using Agile/Scrum methodology (Jira, Confluence, Git).",
    ],
  },
  {
    review: "Daniele’s work on Appwrite’s mobile app brought a high level of quality and efficiency. He delivered solutions that enhanced our mobile experience & meet our product goals.",
    imgPath: "/images/exp3.png",
    logoPath: "/images/logo3.png",
    title: "Frontend Developer",
    date: "November 2022 - May 2023",
    responsibilities: [
      "Developed and maintained video-related product features using Python, Flask, C, and FFmpeg, focusing on performance and video processing automation.",
      "Designed and implemented an interactive 2D data visualization web app built with Angular, G6 Engine, and JavaScript, enabling real-time exploration of complex datasets.",
      "Coordinated with the product team to implement features based on feedback.",
    ],
  },
];

const socialImgs = [
  {
    name: "linkedin",
    imgPath: "/images/linkedin.png",
    link: "https://www.linkedin.com/in/daniele-petracca-58684a165",
  },
  {
    name: "git",
    imgPath: "/images/git.png",
    link: "https://github.com/danipetra"
  },
  {
    name: "insta",
    imgPath: "/images/insta.png",
    link: "https://www.instagram.com/daniele.petracca/",
  },
  {
    name: "fb",
    imgPath: "/images/fb.png",
    link: "https://www.facebook.com/daniele.petracca.9/",
  },
  {
    name: "spotify",
    imgPath: "/images/spotify.png",
    link: "https://open.spotify.com/user/ssmgujjptxdcsvoid540oppzv?si=ccd533e77c164277"
  },
];

const workFilters = ["All", "Configurators", "Games", "Visualization", "AI"];

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

export {
  words,
  counterItems,
  expCards,
  socialImgs,
  techStackIcons,
  techStackImgs,
  navLinks,
  workFilters,
  projects,
};
