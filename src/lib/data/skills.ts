export interface Skill {
  name: string;
  level: number; // 0-100, drives the progress bar width
  category: 'frontend' | 'backend' | 'security' | 'tools' | 'ml';
}

export const skills: Skill[] = [
  // Frontend
  { name: 'React', level: 95, category: 'frontend' },
  { name: 'TypeScript', level: 90, category: 'frontend' },
  { name: 'Next.js', level: 88, category: 'frontend' },
  // { name: 'Svelte', level: 30, category: 'frontend' },
  { name: 'Tailwind CSS', level: 95, category: 'frontend' },

  // Backend
  { name: 'Node.js', level: 65, category: 'backend' },
  { name: 'Laravel', level: 60, category: 'backend' },
  { name: 'PostgreSQL', level: 55, category: 'backend' },

  // Security
  { name: 'Web Crypto API', level: 45, category: 'security' },

  // Tools
  { name: 'Git', level: 90, category: 'tools' },
  { name: 'Docker', level: 45, category: 'tools' },
  { name: 'Playwright', level: 45, category: 'tools' },

  // Machine Learning (MSc, still learning)
  { name: 'Python', level: 55, category: 'ml' },
  { name: 'NumPy', level: 45, category: 'ml' },
  { name: 'pandas', level: 45, category: 'ml' },
  { name: 'scikit-learn', level: 40, category: 'ml' },
];

export const techTags = [
  'React', 'Next.js', 'TypeScript', 'JavaScript',
  'Tailwind CSS', 'Node.js', 'Laravel', 'PostgreSQL', 'WebSockets',
  'Web Crypto API', 'PWA', 'Chrome Extensions', 'REST APIs', 'Git',
];