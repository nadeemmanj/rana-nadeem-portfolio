// ============================================================
// data/portfolio.js — SINGLE SOURCE OF TRUTH for the portfolio.
// ALL section components read from here. NO hardcoded portfolio
// content in components (only structural labels like "Read More").
// Lines marked ✏️ EDIT are where Rana Nadeem personalizes his data.
// ============================================================

export const profile = {
  name: "Rana Nadeem",
  firstName: "Rana",
  lastName: "Nadeem",
  roles: ["Full-Stack Developer", "MERN Stack Developer", "Next.js Developer", "Generative AI Developer"],
  tagline:
    "Blending code with creativity — I build modern, responsive web apps with the MERN stack and Next.js.",
  description:
    "Aspiring full-stack developer from Lahore, Pakistan, learning by building real projects. I work with the MERN stack and Next.js, and I'm exploring AI-powered applications — chatbots, agents and LLM tools.",
  // ✏️ EDIT: apna real email yahan likho
  email: "babanadeem284@gmail.com",
  // ✏️ EDIT: apna real phone number yahan likho
  phone: "+92 318 0443543",
  location: "Lahore, Pakistan",
  // ✏️ EDIT: apne real GitHub / LinkedIn profile links lagao
  github: "https://github.com/nadeemmanj",
  linkedin: "https://www.linkedin.com/in/rana-nadeem-tech/",
  // ✏️ EDIT: Facebook / Instagram links (ya "#" rehne do agar nahi hain)
  facebook: "#",
  instagram: "#",
};

export const stats = [
  // ✏️ EDIT: numbers apne hisaab se badlo
  { value: "8+", label: "Projects Built" },
  { value: "12+", label: "Technologies Explored" },
  { value: "100%", label: "Learning Commitment" },
];

export const about = {
  eyebrow: "LET ME INTRODUCE MYSELF",
  heading: "About Me",
  paragraphs: [
    "I'm Rana Nadeem, an aspiring full-stack web developer from Lahore, Pakistan. I learn best by building — every concept I study turns into a real project, from small games to full e-commerce apps.",
    "Right now I'm focused on the MERN stack and Next.js, and I'm diving into the world of AI: chatbots, AI agents, and LLM-powered applications. My goal is simple — become a confident, job-ready developer who ships real things.",
  ],
  pullQuote:
    "My strength isn't just writing code — it's understanding how things work and building them right.",
};

export const aboutExtended = {
  heading: "More About Me",
  paragraphs: [
    "My journey started with HTML, CSS and JavaScript, and grew into React, Node.js, Express and MongoDB. Along the way I built a weather app, a task manager, games, and a Mango Store e-commerce application — each one teaching me something new about real-world development.",
    "I've also explored authentication flows, REST APIs, CORS issues, deployment debugging on Vercel, and tools like NextAuth, Firebase and MongoDB Atlas. I don't just copy solutions — I debug, break things, and understand why they work.",
    "These days, most of my curiosity goes toward AI: how LLMs work, how agents use tools, and how to build useful AI-powered products with JavaScript. This portfolio itself is part of that journey.",
  ],
  highlight: "Currently learning: AI agents, RAG, and the Vercel AI SDK.",
};

export const experience = [
  {
    title: "Self-Directed Learning & Project Building",
    org: "Independent",
    period: "2024 — Present",
    location: "Remote",
    description:
      "Learning full-stack development (MERN + Next.js) through hands-on projects: e-commerce app, REST APIs, auth flows, Vercel deployments. Now exploring AI agents and LLM-powered applications.",
  },
  // ✏️ EDIT: Jab internship ya freelance kaam mile to yahan add karna.
  // Sirf REAL experience likho — fake jobs kabhi mat likho.
];

export const services = [
  {
    icon: "💻",
    title: "Frontend Development",
    description:
      "Clean, responsive interfaces with React and Next.js — pixel-aware layouts that work on every device.",
    details:
      "I build component-based UIs with React and Next.js, styled with Tailwind CSS. Focus areas: responsive layouts, reusable components, smooth animations, and accessibility basics. Every page is tested on mobile, tablet and desktop sizes.",
  },
  {
    icon: "🛠️",
    title: "MERN Development",
    description:
      "Full-stack apps with MongoDB, Express, React and Node — from database schema to deployed product.",
    details:
      "End-to-end MERN builds: REST API design with Express, Mongoose data models, JWT-based auth flows, and React frontends that consume them. I handle the full cycle — plan, build, test, debug and deploy on Vercel/Render.",
  },
  {
    icon: "🤖",
    title: "AI Integration",
    description:
      "Chatbots and AI features powered by LLM APIs — bringing smart interactions into web apps.",
    details:
      "I'm learning to integrate LLM APIs (like Gemini) into real products: chatbots, smart assistants and agent-style workflows. I understand prompts, tokens, context windows and API costs — and I build with free tiers first.",
  },
  {
  icon: "🎨",
  title: "UI/UX Design",
  description:
    "Clean, user-friendly interfaces designed in Figma — layouts that look good and feel easy to use.",
  details:
    "I design interfaces in Figma before building them: wireframes, layouts, colors and spacing that match the brand. Focus areas: simple navigation, readable typography, consistent components, and mobile-first layouts. Every design is made to be buildable — no fancy mockups that can't become real websites.",
},
];

export const skills = {
  // yeh 4 "Technical Skills" mein dikhenge
  technical: [
    { name: "HTML", level: 90 },
    { name: "CSS", level: 90 },
    { name: "JavaScript", level: 80 },
    { name: "Tailwind CSS", level: 85 },
  ],
  // yeh "More" expand par dikhenge
  technicalMore: [
    { name: "ReactJS", level: 80 },
    { name: "NextJS", level: 75 },
    { name: "NodeJS", level: 75 },
    { name: "ExpressJS", level: 70 },
    { name: "MongoDB", level: 65 },
    { name: "REST APIs", level: 75 },
    { name: "Git & GitHub", level: 80 },
    { name: "Figma", level: 60 },
    { name: "Generative AI", level: 65 },
  ],
  professional: [
    { name: "Team Work", level: 70 },
    { name: "Creativity", level: 85 },
    { name: "Project Management", level: 80 },
    { name: "Communication", level: 88 },
  ],
};

export const projects = [
  // Pehle 6 "featured" dikhenge, baqi "More Projects" mein.
  // ✏️ EDIT: liveUrl / githubUrl mein apne real links lagao (abhi "#" placeholder hai)
  {
    slug: "shopora",
    title: "Shopora",
    emoji: "🛒",
    description:
      "Full-stack e-commerce store — products, cart, checkout, orders, admin dashboard and Stripe payments (Next.js + MongoDB).",
    categories: ["NEXTJS", "MERN"],
    liveUrl: "https://shopora-store-virid.vercel.app/",
    githubUrl: "https://github.com/nadeemmanj/shopora-store",
  },
  {
    slug: "techpulse-blog",
    title: "TechPulse Blog",
    emoji: "📰",
    description:
      "Blog platform with admin panel — write, edit and publish articles with categories and a featured carousel (Next.js + MongoDB).",
    categories: ["NEXTJS", "MERN"],
    liveUrl: "https://techpulse-blog-rho.vercel.app/",
    githubUrl: "https://github.com/nadeemmanj/techpulse-blog",
  },
  {
    slug: "mango-store",
    title: "Mango Store",
    emoji: "🥭",
    description:
      "E-commerce web app with product listings, cart functionality and a clean responsive UI.",
    categories: ["MERN"],
    liveUrl: "https://mango-store-admin.vercel.app/",
    githubUrl: "https://github.com/nadeemmanj/mango-store-admin",
  },
  {
  slug: "bella-roma",
  title: "Bella Roma AI Chatbot",
  emoji: "🍝",
  description:
    "AI restaurant assistant — answers menu questions, shares opening hours and books tables automatically (Gemini function calling).",
  categories: ["AI"],
  liveUrl: "https://bella-roma-ai-chatbot.vercel.app/",
  githubUrl: "https://github.com/nadeemmanj/bella-roma-ai-chatbot",
},
  {
    slug: "task-manager",
    title: "Task Manager",
    emoji: "✅",
    description:
      "Full CRUD task manager with add, edit, delete and persistent storage.",
    categories: ["REACTJS"],
    liveUrl: "https://task-manager-app-six-phi.vercel.app/",
    githubUrl: "https://github.com/nadeemmanj/TASK-MANAGER-APP",
  },
  {
    slug: "portfolio-website",
    title: "Portfolio Website",
    emoji: "💼",
    description: "This very portfolio — Next.js, Tailwind CSS, blue particle theme.",
    categories: ["NEXTJS"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    slug: "weather-app",
    title: "Weather App",
    emoji: "🌤️",
    description:
      "Live weather app using a public API — search any city for temperature and conditions.",
    categories: ["API", "JAVASCRIPT"],
    liveUrl: "https://nadeemmanj.github.io/Weather-App/",
    githubUrl: "https://github.com/nadeemmanj/Weather-App",
  },
  {
    slug: "shopnest",
    title: "ShopNest",
    emoji: "🛍️",
    description:
      "E-commerce storefront with product search, categories, deals and cart — fashion, electronics, home and beauty.",
    categories: ["MERN"],
    liveUrl: "https://shopnest-commerce.vercel.app/",
    githubUrl: "https://github.com/nadeemmanj/shopnest-commerce",
  },
  {
    slug: "apex-athletics",
    title: "APEX Athletics",
    emoji: "🏋️",
    description:
      "Sports club & academy landing page — bold hero, programs, trainers and free trial booking.",
    categories: ["LANDING"],
    liveUrl: "https://apex-sports-page.vercel.app/",
    githubUrl: "https://github.com/nadeemmanj/apex-sports-page",
  },
  {
    slug: "flowboard",
    title: "FlowBoard",
    emoji: "📊",
    description:
      "SaaS landing page for a project management tool — hero, features and dashboard preview with a clean modern UI.",
    categories: ["LANDING"],
    liveUrl: "https://flowboard-software-page.vercel.app/",
    githubUrl: "https://github.com/nadeemmanj/flowboard-software-page",
  },
  {
    slug: "my-tasks",
    title: "My Tasks",
    emoji: "📋",
    description:
      "Productivity task app with add/search, total/active/done counters and a clean dark UI.",
    categories: ["REACTJS"],
    liveUrl: "https://nadeemmanj.github.io/Todo-List-App/",
    githubUrl: "https://github.com/nadeemmanj/Todo-List-App",
  },
  {
    slug: "tic-tac-toe",
    title: "Tic-Tac-Toe",
    emoji: "⭕",
    description: "Classic game with win detection, score tracking and a polished UI.",
    categories: ["JAVASCRIPT"],
    liveUrl: "https://nadeemmanj.github.io/Tic-Tac-Toe-Game/",
    githubUrl: "https://github.com/nadeemmanj/Tic-Tac-Toe-Game",
  },
  {
    slug: "guess-the-number",
    title: "Guess the Number",
    emoji: "🔢",
    description: "Number-guessing game with attempt counter, hints and difficulty levels.",
    categories: ["JAVASCRIPT"],
    liveUrl: "https://nadeemmanj.github.io/Guess-Number-Game/",
    githubUrl: "https://github.com/nadeemmanj/Guess-Number-Game",
  },
  {
    slug: "quiz-app",
    title: "Simple Quiz",
    emoji: "❓",
    description:
      "Quiz app with multiple-choice questions, instant right/wrong feedback and a Next button.",
    categories: ["JAVASCRIPT"],
    liveUrl: "https://nadeemmanj.github.io/Quiz-App/",
    githubUrl: "https://github.com/nadeemmanj/Quiz-App",
  },
];

export const certificates = [
  // ✏️ EDIT: apne real certificates yahan likho
  { title: "Full-Stack Web Development", issuer: "TEVTA College,Lahore", date: "2024" },
  { title: "Generative AI", issuer: "Beyond Tahir Academy", date: "2026" },
  { title: "RAG", issuer: "Beyond Tahir Academy", date: "2026" },
  { title: "Computer Application & Office Professional", issuer: "Vocational College", date: "2025" },
];

export const socials = [
  // ✏️ EDIT: links profile se aate hain — yahan sirf label/icon badlo agar chaho
  { label: "GitHub", href: profile.github, icon: "🐙" },
  { label: "LinkedIn", href: profile.linkedin, icon: "💼" },
  { label: "Facebook", href: profile.facebook, icon: "📘" },
  { label: "Instagram", href: profile.instagram, icon: "📸" },
];

// Chat widget FAQ: user ke sawal ke keywords match hon to yeh jawab dikhao
export const chatFaq = [
  {
    question: "What are his skills?",
    keywords: ["skill", "technology", "tech", "stack", "seekha", "aata"],
    answer:
      "Rana Nadeem works with HTML, CSS, JavaScript, React, Next.js, Node.js, Express, MongoDB and Tailwind CSS. He's strongest in frontend and growing fast in full-stack MERN development.",
  },
  {
    question: "What services does he offer?",
    keywords: ["service", "offer", "kaam", "freelance"],
    answer:
      "Services: Frontend Development, MERN Development, AI Integration (chatbots), and Responsive Web Design. Open to internships, junior roles and freelance projects.",
  },
  {
    question: "What is his experience?",
    keywords: ["experience", "job", "kaam kiya", "tajarba"],
    answer:
      "He's an aspiring developer learning through real projects since 2024 — e-commerce apps, REST APIs, auth flows and deployments. No fake titles here: every skill is backed by something he actually built.",
  },
  {
    question: "How can I contact him?",
    keywords: ["contact", "email", "phone", "rabta", "hire"],
    answer:
      "You can reach Rana Nadeem via the contact form below, or email at your-email@gmail.com. He's based in Lahore, Pakistan (PKT timezone).",
  },
  {
    question: "What projects has he built?",
    keywords: ["project", "portfolio", "banaya", "built"],
    answer:
      "Featured projects: Mango Store (e-commerce), Weather App, Task Manager, QuoteBox (built by an AI agent team!), Tic-Tac-Toe and more. Check the Portfolio section for live demos.",
  },
];
