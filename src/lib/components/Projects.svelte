<script lang="ts">

  import { base } from '$app/paths';

  import { projects } from '$lib/data/projects';

  import type { Project } from '$lib/data/projects';

  import { fade, fly } from 'svelte/transition';



  let activeFilter = $state('all');

  let selectedProject = $state<Project | null>(null);



  const filters = [

    { id: 'all', label: 'All Work' },

    { id: 'featured', label: 'Featured' },

    { id: 'web', label: 'Web' },

    { id: 'fullstack', label: 'Full Stack' },

    { id: 'tool', label: 'Tools' },

  ];



  let filtered = $derived(

    activeFilter === 'all'

      ? projects

      : activeFilter === 'featured'

      ? projects.filter(p => p.featured)

      : projects.filter(p => p.category === activeFilter)

  );

</script>

<svelte:window onkeydown={(e) => { if (e.key === 'Escape') selectedProject = null; }} />



<!-- Added 'items-center' and 'text-center' to parent to ensure total centralization -->

<section id="projects" class="bg-white dark:bg-[#0f172a] min-h-screen flex items-center justify-center py-24">

  <div class="w-full max-w-7xl mx-auto px-6 flex flex-col items-center">



    <!-- Header Section: Centralized text -->

    <div class="text-center mb-16">

      <span class="text-indigo-500 font-semibold text-sm uppercase tracking-[0.2em]">Selected Work</span>

      <h2 class="text-5xl md:text-6xl font-black text-slate-900 dark:text-white mt-2 leading-tight">

        Projects that <span class="gradient-text">ship & scale</span>

      </h2>

    </div>



    <!-- Filter Buttons: Adjusted px and whitespace to ensure full wrap -->

    <div class="flex flex-wrap justify-center gap-3 mb-20">

      {#each filters as filter}

        <button

          onclick={() => activeFilter = filter.id}

          class="px-8 py-2.5 rounded-full text-sm font-bold whitespace-nowrap w-max transition-all duration-300 {

            activeFilter === filter.id

              ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-500/20'

              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-slate-700'

          }"

        >

          {filter.label}

        </button>

      {/each}

    </div>



    <!-- Grid: Standardized columns for a clean card look -->

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full">

      {#each filtered as project (project.id)}

        <button

          class="group flex flex-col items-center text-center outline-none"

          onclick={() => selectedProject = project}

        >

          <!-- The Image "Card" -->

          <div class="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden mb-6 shadow-sm border border-slate-100 dark:border-slate-800 transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2 group-hover:border-indigo-200 dark:group-hover:border-indigo-900">

            <img 

              src="{base}{project.image}" 

              alt={project.title} 

              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"

            />

            <!-- Subtle Overlay on Hover -->

            <div class="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/10 transition-colors duration-500"></div>

          </div>



          <!-- Text Underneath -->

          <div class="px-4">

            <span class="text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-2 block">

              {project.category}

            </span>

            <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">

              {project.title}

            </h3>

            <p class="text-slate-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-2 max-w-xs mx-auto">

              {project.description}

            </p>

            

            <div class="mt-4 flex flex-wrap justify-center gap-2">

              {#each project.tech.slice(0, 3) as tech}

                <span class="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase border border-slate-200 dark:border-slate-800 px-2 py-0.5 rounded">

                  {tech}

                </span>

              {/each}

            </div>

          </div>

        </button>

      {/each}

    </div>

  </div>

</section>



{#if selectedProject}

  <div

    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm"

    onclick={() => selectedProject = null}

    onkeydown={(e) => { if (e.key === 'Escape') selectedProject = null; }}

    role="dialog"

    aria-modal="true"

    aria-label={selectedProject.title}

    tabindex="-1"

    transition:fade={{ duration: 200 }}

  >

    <!-- svelte-ignore a11y_click_events_have_key_events -->

    <div

      class="bg-white dark:bg-slate-900 rounded-[2.5rem] w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col"

      onclick={(e) => e.stopPropagation()}

      role="presentation"

      transition:fly={{ y: 40, duration: 400 }}

    >

      <div class="relative h-72 w-full">

        <img src="{base}{selectedProject.image}" alt={selectedProject.title} class="w-full h-full object-cover" />

        <button

            onclick={() => selectedProject = null}

            aria-label="Close project details"

            class="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md flex items-center justify-center transition-colors text-xl"

          >✕</button>

      </div>



      <div class="p-10 text-center flex flex-col items-center">

        <span class="text-xs text-indigo-500 font-black uppercase tracking-widest mb-2">{selectedProject.category}</span>

        <h2 class="text-4xl font-black text-slate-900 dark:text-white mb-6">{selectedProject.title}</h2>



        <p class="text-slate-600 dark:text-slate-400 leading-relaxed mb-8 text-lg max-w-xl">

          {selectedProject.longDescription}

        </p>



        <div class="flex gap-4 w-full max-w-md mt-4">

          {#if selectedProject.live}

            <a href={selectedProject.live} target="_blank" rel="noopener noreferrer" class="flex-1 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl text-center shadow-lg shadow-indigo-500/20 transition-all">

              Live Demo

            </a>

          {/if}

          {#if selectedProject.github}

            <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" class="flex-1 py-4 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-2xl text-center hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">

              GitHub

            </a>

          {/if}

        </div>

      </div>

    </div>

  </div>

{/if} 