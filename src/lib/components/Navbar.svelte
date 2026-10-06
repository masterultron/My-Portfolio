<script lang="ts">
  import { theme } from '$lib/stores/theme';
  import { onMount } from 'svelte';
  import { slide } from 'svelte/transition';
  import Sun from '~icons/lucide/sun';
  import Moon from '~icons/lucide/moon';

  // Svelte 5 State Runes
  let scrolled = $state(false);
  let menuOpen = $state(false);

  const navLinks = [
    { href: '#hero', label: 'Home' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#terminal', label: 'Terminal' },
    { href: '#contact', label: 'Contact' },
  ];

  onMount(() => {
    const handleScroll = () => {
      // Toggle background and padding based on scroll position
      scrolled = window.scrollY > 20;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  });

  function handleNav(href: string) {
    menuOpen = false;
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }
</script>

<nav
  class="fixed top-0 left-0 right-0 z-[100] transition-all duration-300 {scrolled
    ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-md shadow-lg border-b border-slate-200/50 dark:border-slate-800/50 py-3'
    : 'bg-transparent py-6'}"
>
  <div class="max-w-6xl mx-auto px-6 flex items-center justify-between">
    <a
      href="#hero"
      onclick={(e) => { e.preventDefault(); handleNav('#hero'); }}
      class="text-xl font-bold gradient-text"
    >
      Abdurrahaman 
    </a>

    <!-- Desktop Menu -->
    <div class="hidden md:flex items-center gap-8">
      {#each navLinks as link}
        <a
          href={link.href}
          onclick={(e) => { e.preventDefault(); handleNav(link.href); }}
          class="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
        >
          {link.label}
        </a>
      {/each}

      <button
        onclick={() => theme.toggle()}
        class="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        aria-label="Toggle theme"
      >
        {#if $theme === 'dark'}
          <Sun class="w-5 h-5 text-slate-700 dark:text-slate-300" />
        {:else}
          <Moon class="w-5 h-5 text-slate-700 dark:text-slate-300" />
        {/if}
      </button>
    </div>

    <!-- Mobile Controls -->
    <div class="flex items-center gap-3 md:hidden">
      <button
        onclick={() => theme.toggle()}
        class="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center"
        aria-label="Toggle theme"
      >
        {#if $theme === 'dark'}
          <Sun class="w-5 h-5 text-slate-700 dark:text-slate-300" />
        {:else}
          <Moon class="w-5 h-5 text-slate-700 dark:text-slate-300" />
        {/if}
      </button>
      
      <button
        onclick={() => (menuOpen = !menuOpen)}
        class="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 flex flex-col items-center justify-center gap-1.5 relative"
        aria-label="Toggle menu"
      >
        <span class="w-5 h-0.5 bg-slate-700 dark:bg-slate-300 transition-all duration-300 {menuOpen ? 'rotate-45 translate-y-2' : ''}" />
        <span class="w-5 h-0.5 bg-slate-700 dark:bg-slate-300 transition-all duration-300 {menuOpen ? 'opacity-0' : ''}" />
        <span class="w-5 h-0.5 bg-slate-700 dark:bg-slate-300 transition-all duration-300 {menuOpen ? '-rotate-45 -translate-y-2' : ''}" />
      </button>
    </div>
  </div>

  <!-- Mobile Menu Dropdown -->
  {#if menuOpen}
    <div 
      transition:slide={{ duration: 300 }}
      class="md:hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-6 py-6 space-y-4 shadow-xl"
    >
      {#each navLinks as link}
        <a
          href={link.href}
          onclick={(e) => { e.preventDefault(); handleNav(link.href); }}
          class="block text-base font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-500 py-2 border-b border-slate-50 dark:border-slate-900 last:border-0"
        >
          {link.label}
        </a>
      {/each}
    </div>
  {/if}
</nav>