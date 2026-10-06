<script lang="ts">
  import { onMount } from 'svelte';
  import { fly, fade } from 'svelte/transition';

  // Svelte 5 State Runes
  let visible = $state(false);
  let typewriterText = $state('');
  let canvasEl: HTMLCanvasElement | undefined = $state();
  let mouseX = $state(0);
  let mouseY = $state(0);

  const roles = [
  'Software Engineer',
  'Frontend Engineer',
  'Creative Developer',
  'Data Science & AI Student',
];

  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typewrite() {
    const current = roles[roleIndex];
    if (!deleting) {
      typewriterText = current.slice(0, ++charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(typewrite, 2000);
        return;
      }
    } else {
      typewriterText = current.slice(0, --charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }
    setTimeout(typewrite, deleting ? 50 : 90);
  }

  function initCanvas() {
    if (!canvasEl) return;
    const canvas = canvasEl;
    const ctx = canvas.getContext('2d')!;
    let w = 0, h = 0;
    let particles: {
      x: number; y: number; ox: number; oy: number;
      vx: number; vy: number; size: number; hue: number;
    }[] = [];

    const resize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
      createParticles();
    };

    const createParticles = () => {
      particles = Array.from({ length: 150 }, () => {
        const x = Math.random() * w;
        const y = Math.random() * h;
        return { 
          x, y, ox: x, oy: y, 
          vx: 0, vy: 0, 
          size: Math.random() * 1.5 + 0.5, 
          hue: Math.random() * 60 + 220 
        };
      });
    };

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const repel = dist < 120;

        if (repel) {
          const force = (120 - dist) / 120;
          p.vx -= (dx / dist) * force * 2;
          p.vy -= (dy / dist) * force * 2;
        }

        p.vx += (p.ox - p.x) * 0.02;
        p.vy += (p.oy - p.y) * 0.02;
        p.vx *= 0.9;
        p.vy *= 0.9;
        p.x += p.vx;
        p.y += p.vy;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 70%, 70%, 0.6)`;
        ctx.fill();
      });

      particles.forEach((a, i) => {
        particles.slice(i + 1, i + 6).forEach(b => {
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 70) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(99,102,241,${0.12 * (1 - d / 70)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animId = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);
    return () => { 
      cancelAnimationFrame(animId); 
      window.removeEventListener('resize', resize); 
    };
  }

  function handleMouseMove(e: MouseEvent) {
    const rect = canvasEl?.getBoundingClientRect();
    if (rect) {
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    }
  }

  onMount(() => {
    visible = true;
    setTimeout(typewrite, 800);
    const cleanup = initCanvas();
    return cleanup;
  });
</script>

<section
  id="hero"
  role="region"
  aria-label="Interactive Hero Landing"
  class="relative min-h-screen flex items-center overflow-hidden mesh-gradient noise bg-slate-950"
  onmousemove={handleMouseMove}
>
  <canvas
    bind:this={canvasEl}
    class="absolute inset-0 w-full h-full"
    aria-hidden="true"
  ></canvas>

  <div class="relative z-10 w-full max-w-7xl mx-auto px-6 pt-24 pb-12">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center justify-items-center min-h-[80vh]">

      <!-- Left: Text content -->
      <div class="flex flex-col items-center lg:items-start text-center lg:text-left">
        {#if visible}
          <!-- Availability badge -->
          <div
            in:fly={{ y: 20, duration: 700, delay: 200 }}
            class="inline-flex items-center gap-2.5 glass rounded-full px-4 py-2 mb-8 border border-white/10"
          >
            <span class="relative flex h-2.5 w-2.5">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span class="text-sm text-slate-300 font-medium">Open to opportunities</span>
          </div>

          <!-- Main heading -->
          <h1
            in:fly={{ y: 20, duration: 700, delay: 400 }}
            class="text-5xl md:text-7xl xl:text-8xl font-black text-white leading-[0.95] tracking-tight mb-6"
          >
            Building<br />
            <span class="gradient-text">digital</span><br />
            experiences
          </h1>

          <!-- Typewriter -->
          <div
            in:fly={{ y: 20, duration: 700, delay: 600 }}
            class="flex items-center justify-center lg:justify-start gap-3 mb-6"
          >
            <span class="w-8 h-px bg-indigo-500"></span>
            <span class="text-xl md:text-2xl text-indigo-400 font-semibold font-mono">
              {typewriterText}<span class="cursor-blink"></span>
            </span>
          </div>

          <!-- Description -->
          <p
            in:fly={{ y: 20, duration: 700, delay: 800 }}
            class="text-lg text-slate-400 max-w-lg leading-relaxed mb-10 mx-auto lg:mx-0"
          >
            I craft immersive web experiences where design meets engineering. I build with React, Next.js, TypeScript, and Tailwind CSS to turn client ideas into fast, polished products that people enjoy using.
          </p>

          <!-- CTAs -->
          <div
            in:fly={{ y: 20, duration: 700, delay: 1000 }}
            class="flex flex-wrap justify-center lg:justify-start gap-4 mb-12"
          >
            <a
              href="#projects"
              onclick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }}
              class="group relative px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl transition-all duration-300 hover:scale-105 overflow-hidden shadow-lg shadow-indigo-500/25"
            >
              <span class="relative z-10">View Projects</span>
              <div class="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            
            <!-- GET IN TOUCH BUTTON -->
            <a
              href="#contact"
              onclick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              class="px-8 py-4 glass text-white font-bold rounded-2xl hover:bg-white/10 transition-all duration-300 hover:scale-105 border border-white/20"
            >
              Get In Touch
            </a>

            <!-- CV DOWNLOAD BUTTON -->
            <a
              href="/resume.pdf" 
              download="Abdurrahaman_Jamiu_CV.pdf"
              target="_blank"
              class="px-8 py-4 glass text-white font-bold rounded-2xl hover:bg-white/10 transition-all duration-300 hover:scale-105 border border-white/20 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download CV
            </a>
          </div>

          <!-- Stats -->
          <div
            in:fade={{ duration: 700, delay: 1200 }}
            class="flex items-center justify-center lg:justify-start gap-8"
          >
            {#each [
              { value: '7+', label: 'Projects Built' },
              { value: '5', label: 'HNG Stages' },
              { value: '100%', label: 'Passion' },
            ] as stat}
              <div class="text-center">
                <div class="text-2xl font-black text-white">{stat.value}</div>
                <div class="text-xs text-slate-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            {/each}
          </div>
        {/if}
      </div>

      <!-- Right: Visual card stack -->
      {#if visible}
        <div
          in:fly={{ x: 50, duration: 900, delay: 600 }}
          class="hidden lg:flex items-center justify-center relative"
        >
          <div class="relative w-80 h-80">
            <div class="absolute top-0 right-0 glass rounded-2xl p-5 w-44 animate-float-slow border border-white/10">
              <div class="text-2xl mb-2">⚛️</div>
              <div class="text-sm font-bold text-white">React</div>
              <div class="text-xs text-slate-400">Expert Level</div>
              <div class="mt-2 h-1 bg-slate-700 rounded-full">
                <div class="h-1 bg-indigo-500 rounded-full w-[95%]"></div>
              </div>
            </div>
            <div class="absolute bottom-8 left-0 glass rounded-2xl p-5 w-44 animate-float-medium border border-white/10">
              <div class="text-2xl mb-2">🔥</div>
              <div class="text-sm font-bold text-white">Svelte</div>
              <div class="text-xs text-slate-400">Advanced</div>
              <div class="mt-2 h-1 bg-slate-700 rounded-full">
                <div class="h-1 bg-purple-500 rounded-full w-[80%]"></div>
              </div>
            </div>
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 glass rounded-2xl p-5 w-40 animate-float-fast border border-white/10">
              <div class="text-2xl mb-2">🔐</div>
              <div class="text-sm font-bold text-white">Security</div>
              <div class="text-xs text-slate-400">E2EE Expert</div>
              <div class="mt-2 h-1 bg-slate-700 rounded-full">
                <div class="h-1 bg-emerald-500 rounded-full w-[85%]"></div>
              </div>
            </div>
          </div>
        </div>
      {/if}
    </div>
  </div>

  <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500">
    <div class="w-5 h-8 border border-slate-600 rounded-full flex justify-center pt-1.5">
      <div class="w-0.5 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
    </div>
  </div>
</section>

<style>
  @keyframes float-slow {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-12px); }
  }
  @keyframes float-medium {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
  }
  @keyframes float-fast {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-16px); }
  }
  .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
  .animate-float-medium { animation: float-medium 4s ease-in-out infinite 1s; }
  .animate-float-fast { animation: float-fast 5s ease-in-out infinite 2s; }
  
  .glass {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }

  .gradient-text {
    background: linear-gradient(to right, #6366f1, #a855f7, #ec4899);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .cursor-blink {
    display: inline-block;
    width: 2px;
    height: 1em;
    background-color: currentColor;
    margin-left: 2px;
    animation: blink 1s step-end infinite;
  }

  @keyframes blink {
    from, to { opacity: 1; }
    50% { opacity: 0; }
  }
</style>