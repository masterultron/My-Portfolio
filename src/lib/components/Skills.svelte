<script lang="ts">
  import { onMount } from 'svelte';
  import { skills, techTags } from '$lib/data/skills';
  import { fade, fly } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  import { cubicOut } from 'svelte/easing';

  let sectionEl: HTMLElement | undefined = $state();
  let visible = $state(false);
  let activeCategory = $state('all');

  const categories = ['all', 'frontend', 'backend', 'tools'];

  let filteredSkills = $derived(
    activeCategory === 'all' 
      ? skills 
      : skills.filter(s => s.category === activeCategory)
  );

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { 
        if (entry.isIntersecting) visible = true; 
      },
      { threshold: 0.1 }
    );
    
    if (sectionEl) observer.observe(sectionEl);
    return () => observer.disconnect();
  });
</script>

<!-- Added items-center to the section to force horizontal centering -->
<section
  id="skills"
  bind:this={sectionEl}
  class="min-h-screen flex flex-col items-center justify-center py-24 bg-gray-50 dark:bg-gray-900 overflow-hidden"
>
  <div class="w-full max-w-6xl mx-auto px-6 flex flex-col items-center">
    
    <!-- Header Section: text-center ensures the text itself is centered -->
    <div class="text-center mb-16">
      <span class="text-indigo-500 font-semibold text-sm uppercase tracking-widest">Expertise</span>
      <h2 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mt-2">
        Skills & Technologies
      </h2>
      <p class="text-gray-500 dark:text-gray-400 mt-4 max-w-xl mx-auto">
        Tools and technologies I use to bring ideas to life
      </p>
    </div>

    <!-- Filter Buttons: Added w-max and whitespace-nowrap to match your Projects section -->
    <div class="flex flex-wrap justify-center gap-3 mb-16">
      {#each categories as cat}
        <button
          onclick={() => activeCategory = cat}
          class="px-8 py-2.5 rounded-full text-sm font-bold capitalize transition-all duration-300 whitespace-nowrap w-max {
            activeCategory === cat
              ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-500/25'
              : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:border-indigo-500 border border-gray-200 dark:border-gray-700'
          }"
        >
          {cat}
        </button>
      {/each}
    </div>

    <!-- Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 w-full">
      {#each filteredSkills as skill, i (skill.name)}
        <div
          animate:flip={{ duration: 400 }}
          in:fly={{ y: 20, duration: 500, delay: i * 50 }}
          out:fade={{ duration: 200 }}
          class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all hover:shadow-lg"
        >
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-3">
              <span class="font-semibold text-gray-900 dark:text-white">{skill.name}</span>
            </div>
            <span class="text-sm font-bold text-indigo-500">{skill.level}%</span>
          </div>
          <div class="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              class="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
              style="width: {visible ? skill.level : 0}%"
            ></div>
          </div>
        </div>
      {/each}
    </div>

    <!-- Familiar Tags Section -->
    <div class="text-center w-full">
      <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-8">Also familiar with</h3>
      <div class="flex flex-wrap justify-center gap-3">
        {#each techTags as tag, i}
          <span
            in:fade={{ delay: 500 + (i * 30) }}
            class="px-6 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-sm font-medium text-gray-600 dark:text-gray-400 hover:border-indigo-400 hover:text-indigo-500 transition-all cursor-default shadow-sm"
          >
            {tag}
          </span>
        {/each}
      </div>
    </div>
  </div>
</section>