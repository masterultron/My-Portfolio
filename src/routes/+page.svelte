<script lang="ts">
  import AIAssistant from '$lib/components/AIAssistant.svelte';
  import Navbar from '$lib/components/Navbar.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import Skills from '$lib/components/Skills.svelte';
  import Projects from '$lib/components/Projects.svelte';
  import Terminal from '$lib/components/Terminal.svelte';
  import Contact from '$lib/components/Contact.svelte';
  import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
  <title>Abdurrahaman Jamiu — Frontend Engineer</title>
  <meta name="description" content="Frontend engineer building immersive web experiences with React, Svelte, and modern tools." />
  <meta property="og:title" content="Abdurrahaman Jamiu — Frontend Engineer" />
  <meta property="og:description" content="Portfolio of a Frontend Engineer specializing in React, Svelte, and modern web technologies." />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
</svelte:head>

<div class="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">
  <a href="#main-content" class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-indigo-600 focus:text-white focus:rounded-lg">
    Skip to main content
  </a>

  <Navbar />

  <main id="main-content">
    <Hero />
    <Skills />
    <Projects />
    <Terminal />
    <Contact />
  </main>

  <Footer />
  <AIAssistant />
</div>