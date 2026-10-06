<script lang="ts">
  import { onMount, tick } from 'svelte';

  interface Line {
    type: 'input' | 'output' | 'error' | 'success';
    text: string;
  }

  let input = $state('');
  let lines = $state<Line[]>([]);
  let terminalEl = $state<HTMLDivElement>();
  let inputEl = $state<HTMLInputElement>();
  let history = $state<string[]>([]);
  let historyIndex = $state(-1);

  const commands: Record<string, () => string | string[]> = {
    help: () => [
      '┌─────────────────────────────────────┐',
      '│  Available Commands                 │',
      '├─────────────────────────────────────┤',
      '│  about      → About me              │',
      '│  skills     → My tech stack         │',
      '│  projects   → My projects           │',
      '│  contact    → Contact info          │',
      '│  experience → Work experience       │',
      '│  education  → Education             │',
      '│  clear      → Clear terminal        │',
      '│  help       → Show this menu        │',
      '└─────────────────────────────────────┘',
    ],
    about: () => [
      'About Me',
      '──────────────────────────────────────',
      'Name    : Abdurrahaman Jamiu',
      'Title   : Frontend Engineer',
      'Location: Abuja, Nigeria',
      'Status  : Available for work ',
      '',
      'I build immersive web experiences with modern tools. Passionate about performance, accessibility, security, and beautiful UIs.',
    ],
    skills: () => [
      '⚡ Tech Stack',
      '──────────────────────────────────────',
      '▸ Frontend  : React, Svelte, Next.js',
      '▸ Styling   : Tailwind, GSAP, Framer',
      '▸ Backend   : Node.js, Laravel',
      '▸ Database  : PostgreSQL, SQLite',
      '▸ Security  : Web Crypto API, JWT',
      '▸ Testing   : Vitest, Playwright',
      '▸ Tools     : Git, Docker, Vite',
    ],
    projects: () => [
      '🚀 Projects',
      '──────────────────────────────────────',
      '1. WhisperBox — E2EE Messaging App',
      '2. AI Page Summarizer — Chrome Ext',
      '3. Ajoke Gold — Luxury E-Commerce',
      '4. Habit Tracker — PWA',
      '5. Invoice App — Management Tool',
      '6. FaL360 — Enterprise ERP Module',
      '',
      'Type "open <number>" to view project',
    ],
    contact: () => [
      '📬 Contact',
      '──────────────────────────────────────',
      'Email    : abdurrahamanjamiu75@outlook.com',
      'GitHub   : github.com/masterultron',
      'Instagram: @theeabdurrahaman.dev',
      'LinkedIn : linkedin.com/in/abdurrahaman-jamiu-14131524b',
      '',
      '→ Open to freelance & full-time roles',
    ],
    experience: () => [
  '💼 Experience',
  '──────────────────────────────────────',
  'Aug 2025 - Present',
  '  Frontend Developer @ FaLGates (Tech Division)',
  '  • Rebuilt corporate site using React.js for responsiveness',
  '  • Developing ERP modules to streamline operations',
  '  • Optimizing system performance & UI/UX design',
  '',
  'Feb 2025 - Present',
  '  Web Dev & SEO @ Luxiar Construction Ltd',
  '  • Enhancing site speed, mobile UX, and performance',
  '  • Technical SEO & keyword research implementation',
  '',
  'Feb 2025 - Apr 2025',
  '  IT Personnel @ Hausba, Abuja',
  '  • Managed 1000+ product records & Zoho learning platform',
  '',
  'Jan 2024 - Aug 2024',
  '  Lead Front-end Developer @ FundusAi',
  '  • Designed AI-driven healthcare interfaces',
  '  • Led development of responsive UI components',
  '',
  'Oct 2023 - Feb 2024',
  '  Engineer Intern @ Galaxy Backbone',
  '  • Supported network configuration & site surveys',
  '  • Enterprise networking with routers & access points',
  '',
  'Oct 2022 - Nov 2022',
  '  Java Instructor @ 3logy Limited',
  '  • Taught Java programming & supervised practical projects',
  '',
  'Feb 2022 - Mar 2022',
  '  IT Personnel @ Nasfat Model School',
  '  • Built automated Excel-based school fees system'
],
    education: () => [
  'Education',
  '──────────────────────────────────────',
  
  'UNDERGRAD',
  'B.Eng. Computer Engineering (November 2018 – February 2025)',
  'Federal University of Technology, Minna',
  'Grade: Second Class Upper Honors',
  '',
  'Thesis:',
  '  The Development of a Vehicle Assailant Detection System',
  '  for Emergency Response',
  '',
  'Modules:',
  '  Machine Learning, Control Systems, Automation, Embedded Systems',
  '',


  'POSTGRADUATE',
  'MSc. Data Science and AI (September 2026 -  Present)',
  'Middlesex University Dubai',
  '',
  'Thesis:',
  'In Progress...',
  '',
  'Modules:',
  '  Machine Learning and AI Algorithms, Ethics, Privacy, and Security in Data Science and AI, Applied Data Science Life Cycle',
  '',


  'Certifications:',
  '▸ Software Engineering - ALX',
  '▸ HNG Frontend Wizard (Stage 5)',
  '▸ Diploma in Java - NIIT',
  '▸ Web Security Fundamentals',
],
    clear: () => {
      lines = [];
      return '';
    },
    whoami: () => 'Abdurrahaman — Software engineer and Aspiring Data Scientist/Analyst',
    date: () => new Date().toString(),
    pwd: () => '/home/Abdurrahaman/portfolio',
    ls: () => ['about.txt', 'projects/', 'skills.json', 'resume.pdf', 'contact.md'],
  };

  function processCommand(cmd: string) {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    history = [cmd, ...history.slice(0, 49)];
    historyIndex = -1;

    lines = [...lines, { type: 'input', text: `$ ${cmd}` }];

    const [base, ...args] = trimmed.split(' ');

    if (base === 'open' && args[0]) {
      const num = parseInt(args[0]);
      if (num >= 1 && num <= 6) {
        lines = [...lines, { type: 'success', text: `→ Opening project ${num}...` }];
        setTimeout(() => {
          document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
        }, 500);
        return;
      }
    }

    if (base === 'sudo') {
      lines = [...lines, { type: 'error', text: 'Permission denied — nice try 😄' }];
      return;
    }

    const handler = commands[base];
    if (handler) {
      const result = handler();
      if (result) {
        const outputs = Array.isArray(result) ? result : [result];
        outputs.forEach(text => {
          if (text) lines = [...lines, { type: 'output', text }];
        });
      }
    } else if (trimmed) {
      lines = [...lines, {
        type: 'error',
        text: `Command not found: ${base}. Type 'help' for available commands.`
      }];
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      processCommand(input);
      input = '';
      tick().then(() => {
        terminalEl?.scrollTo({ top: terminalEl.scrollHeight, behavior: 'smooth' });
      });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        historyIndex++;
        input = history[historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        input = history[historyIndex];
      } else {
        historyIndex = -1;
        input = '';
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const cmds = Object.keys(commands);
      const match = cmds.find(c => c.startsWith(input.toLowerCase()));
      if (match) input = match;
    }
  }

  onMount(() => {
    const bootLines: Line[] = [
      { type: 'success', text: 'Welcome to Abdurrahaman Portfolio Terminal v1.0.0' },
      { type: 'output', text: '──────────────────────────────────────────────' },
      { type: 'output', text: 'Type "help" to see available commands.' },
      { type: 'output', text: '' },
    ];

    bootLines.forEach((line, i) => {
      setTimeout(() => {
        lines = [...lines, line];
      }, i * 200);
    });
  });
</script>

<section id="terminal" class="py-24 bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center">
  <div class="w-full max-w-6xl mx-auto px-6 flex flex-col items-center">
    
    <div class="text-center mb-12">
      <span class="text-indigo-500 font-semibold text-sm uppercase tracking-widest">Interactive</span>
      <h2 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mt-2">
        Terminal
      </h2>
      <p class="text-gray-500 dark:text-gray-500 mt-4 max-w-lg mx-auto">
        Explore my portfolio through an interactive terminal. Type <code class="text-indigo-500 bg-indigo-50 dark:bg-indigo-950/50 px-2 py-0.5 rounded">help</code> to get started.
      </p>
    </div>

    <!-- Terminal window -->
    <div class="w-full bg-gray-900 dark:bg-gray-950 rounded-3xl overflow-hidden shadow-2xl border border-gray-700 dark:border-gray-800">
      <!-- Title bar -->
      <div class="bg-gray-800 dark:bg-gray-900 px-6 py-4 flex items-center gap-2 border-b border-gray-700">
        <div class="flex gap-2">
          <div class="w-3.5 h-3.5 rounded-full bg-red-500 shadow-inner" />
          <div class="w-3.5 h-3.5 rounded-full bg-yellow-500 shadow-inner" />
          <div class="w-3.5 h-3.5 rounded-full bg-green-500 shadow-inner" />
        </div>
        <span class="ml-4 text-gray-400 text-sm font-mono tracking-tight">portfolio — bash</span>
        <span class="ml-auto text-xs text-gray-600 font-mono">1280x720</span>
      </div>

      <!-- Terminal body -->
      <div
        bind:this={terminalEl}
        class="px-8 md:px-12 py-8 font-mono text-sm md:text-base h-[500px] md:h-[600px] overflow-y-auto space-y-2 cursor-text scrollbar-thin scrollbar-thumb-gray-700"
        onclick={() => inputEl?.focus()}
        onkeydown={(e) => { if(e.key === 'Enter') inputEl?.focus() }}
        role="presentation"
      >
        {#each lines as line}
          <div class="{
            line.type === 'input' ? 'text-indigo-400' :
            line.type === 'error' ? 'text-red-400' :
            line.type === 'success' ? 'text-green-400' :
            'text-gray-300'
          } leading-relaxed whitespace-pre-wrap break-all">
            {line.text}
          </div>
        {/each}

        <!-- Input line -->
        <div class="flex items-center gap-3 text-indigo-400">
          <span class="flex-shrink-0">
            <span class="text-green-400">Abdurrahaman</span>
            <span class="text-gray-500">@</span>
            <span class="text-blue-400">portfolio</span>
            <span class="text-gray-500">:~$</span>
          </span>
          <input
            bind:this={inputEl}
            bind:value={input}
            onkeydown={handleKeydown}
            class="flex-1 bg-transparent outline-none text-gray-200 caret-indigo-400 min-w-0"
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            aria-label="Terminal input"
          />
        </div>
      </div>
    </div>

    <p class="text-center text-sm text-gray-400 dark:text-gray-600 mt-8">
      💡 Pro tip: Use ↑↓ arrows for history, Tab for autocomplete
    </p>
  </div>
</section>