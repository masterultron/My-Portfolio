export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  category: 'web' | 'mobile' | 'tool' | 'fullstack';
  live?: string;
  github?: string;
  image: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: 'solar-sizer',
    title: 'The Solar Sizer',
    description: 'Solar sizing and quoting tool for Nigerian installers, built on NASA satellite data',
    longDescription: 'A web app that helps solar installers in Nigeria size off-grid systems correctly and quote customers in minutes. Installers pick appliances from a 47-item Nigerian catalogue; the app sizes panels, batteries, inverter and charge controller for the worst month using 10 years of NASA POWER satellite data, then generates a PDF quote in naira. A day-by-day simulation over 3,653 days showed that sizing on the sunniest month leaves 13% of demand unmet, against 0.8% for the app\'s design. Now being field-tested with an installer in Kaduna.',
    tech: ['Python', 'Streamlit', 'pandas', 'NASA POWER API', 'fpdf2', 'Matplotlib'],
    category: 'tool',
    live: 'https://the-solar-sizer-ng.streamlit.app/',
    github: 'https://github.com/masterultron/kaduna-solar-sizer',
    image: '/projects/solar-sizer.png',
    featured: true,
  },
  {
    id: 'nasibi',
    title: 'Nasibi: AI Concierge (Demo Website)',
    description: 'Multilingual real-estate concierge, first deployed on a demo property website',
    longDescription: 'Nasibi is a website concierge for real-estate companies. It was first built and used on Aurum Estates, a demo luxury property website (not a real company). It speaks English, Arabic (full right-to-left layout) and French, helps visitors search properties, answers Golden Visa questions, books viewings, captures leads and hands conversations to human agents through an agent inbox. Next: support for the world\'s major languages and a multi-tenant LLM service with tool use and streamed replies, so it can be embedded on any client site.',
    tech: ['JavaScript', 'Three.js', 'HTML', 'CSS', 'i18n / RTL'],
    category: 'web',
    live: 'https://legacy-property-demo-site.netlify.app/',
    image: '/projects/nasibi.png',
    featured: true,
  },

  {
    id: 'brickstrade',
    title: 'BricksTrade Property Developer',
    description: 'Cinematic real-estate brochure site with crossfade slideshow',
    longDescription: 'An editorial, cinematic brochure website for a real-estate developer, featuring a full-screen crossfade project slideshow, smart-scroll navigation, scroll-reveal animations via Framer Motion (with reduced-motion support), and a serverless EmailJS-powered contact form — no backend required.',
    tech: ['React', 'TypeScript', 'Vite', 'Tailwind', 'Framer Motion', 'Wouter', 'EmailJS'],
    category: 'web',
    live: 'https://www.brickstrade.com.ng',
    github:  'https://github.com/masterultron/BricksTrade',
    image: '/projects/brickstrade.png',
    featured: true,
  },

  {
    id: 'ajoke-gold',
    title: 'Ajoke Gold International',
    description: 'Serverless luxury jewelry e-commerce with verified PayPal payments',
    longDescription: 'A full-stack, serverless e-commerce platform for a UAE-based jewelry brand. Features server-side PayPal IPN verification with real-time amount cross-checking and duplicate-transaction detection, and retry-safe order notifications via Resend — all with zero traditional backend or database.',
    tech: ['React', 'TypeScript', 'Vite', 'Netlify Functions', 'Netlify Blobs', 'PayPal API', 'Resend', 'Tailwind'],
    category: 'fullstack',
    live: 'https://www.ajokegoldinternational.com',
    github: 'https://github.com/masterultron/AjokeGold',
    image: '/projects/ajoke-gold.png',
    featured: true,
  },
  {
    id: 'whisperbox',
    title: 'WhisperBox',
    description: 'End-to-end encrypted messaging app with Web Crypto API',
    longDescription: 'A secure messaging application where the server never sees plaintext. Built with Next.js, RSA-OAEP key exchange, AES-GCM encryption, and IndexedDB for private key storage.',
    tech: ['Next.js', 'TypeScript', 'Web Crypto API', 'WebSocket', 'IndexedDB'],
    category: 'fullstack',
    live: 'https://covert-whisperbox.netlify.app',
    github: 'https://github.com/masterultron/WhisperBox',
    image: '/projects/whisperbox.png',
    featured: true,
  },
  {
    id: 'fal360',
    title: 'FaL360 ERP',
    description: 'Enterprise Resource Management Laravel + Inertia',
    longDescription: 'A full ERP system with multiple modules for FaLGates Limited built with Laravel, Inertia.js, and React. Features weighbridge operations, stock receipts, bin management.',
    tech: ['Laravel', 'React', 'Inertia.js', 'TypeScript', 'Tailwind'],
    category: 'fullstack',
    live: 'https://360.falgates.com',
    github: 'https://github.com/falgatesops-maker/Fal360-Backend',
    image: '/projects/fal360.png',
    featured: false,
  },
  {
    id: 'ai-summarizer',
    title: 'AI Page Summarizer',
    description: 'Chrome extension that summarizes any webpage using AI',
    longDescription: 'A Manifest V3 Chrome extension that extracts page content and summarizes it using Google Gemini. Features caching, dark mode, and secure API key storage.',
    tech: ['Chrome Extension', 'JavaScript', 'Google Gemini', 'Manifest V3'],
    category: 'tool',
    github: 'https://github.com/masterultron/AI-Page-Summarizer',
    image: '/projects/ai-summarizer.png',
    featured: true,
  },
  {
    id: 'ejidezee-gold',
    title: 'Ejidezee Gold International',
    description: 'Serverless luxury jewelry e-commerce with verified PayPal payments',
    longDescription: 'A full-stack, serverless e-commerce platform for a UAE-based jewelry brand. Features server-side PayPal IPN verification with real-time amount cross-checking and duplicate-transaction detection, retry-safe order notifications via Resend, and a self-service Decap CMS letting a non-technical store owner manage a 200+ item catalog with image uploads — all with zero traditional backend or database.',
    tech: ['React', 'TypeScript', 'Vite', 'Netlify Functions', 'Netlify Blobs', 'PayPal API', 'Decap CMS', 'Resend'],
    category: 'fullstack',
    live: 'https://www.ejidezeegoldinternational.com.ng',
    image: '/projects/ejidezee.png',
    featured: true,
  },
   {
    id: 'ramadan-companion',
    title: 'My Ramadan Companion',
    description: 'Personalized dua journal to help you stay connected and know your duas and the meanings during ramadan.',
    longDescription: 'A comprehensive spiritual companion app built with Next.js and Tailwind CSS. Features dynamic prayer times, progress tracking for fasting, and curated daily content.',
    tech: ['Next.js', 'React', 'Tailwind', 'TypeScript'],
    category: 'web',
    live: 'https://my-ramadan-companion.netlify.app',
    github: 'https://github.com/masterultron/my-ramadan-companion',
    image: '/projects/ramadan.png',
    featured: true,
  },

];