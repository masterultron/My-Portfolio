<script lang="ts">
  import { fade, fly } from 'svelte/transition';

  interface Message {
    role: 'user' | 'assistant';
    content: string;
  }

  let isOpen = $state(false);
  let input = $state('');
  let messages = $state<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm Abdurrahaman's AI assistant 👋 Ask me anything about his skills, projects, or experience.",
    },
  ]);
  let loading = $state(false);
  let chatEl = $state<HTMLDivElement>();

  const COHERE_API_KEY = import.meta.env.VITE_COHERE_API_KEY;

  const SYSTEM_CONTEXT = `You are an AI assistant embedded in Abdurrahaman Jamiu's developer portfolio website. Your only job is to answer questions about Abdurrahaman. Always answer confidently using the information below. Never say you don't have information — use what is provided.

NAME: Abdurrahaman Jamiu
TITLE: Software Engineer
LOCATION: Dubai, United Arab Emirates
STATUS: Available for freelance and full-time roles
EMAIL: abdurrahamanjamiu75@outlook.com
GITHUB: github.com/masterultron
INSTAGRAM: @theeabdurrahaman
LINKEDIN: linkedin.com/in/abdurrahaman-jamiu-14131524b

EDUCATION:
- B.Eng. Computer Engineering, Federal University of Technology Minna, November 2018 - February 2025
- MSc. Data Science and AI, Middlesex University Dubai, September 2026 - Present
- Diploma in Java - NIIT
- Software Engineering - ALX Africa
- HNG Frontend Wizard (Stage 5 — highest stage)
- Web Security Fundamentals

EXPERIENCE:
- 2026 to Present: MSc student (Data Science and AI) — Pairing strong frontend engineering with ML to build intelligent, user-facing products.
- 2024 to Present: Frontend Developer (Freelance and Contract) — Delivering production web solutions for clients, including FaL360 ERP, Ajoke Gold International, and BricksTrade.
- 2022 to 2024: Frontend Engineer — Built and maintained React-based applications.

SKILLS:
Core (use confidently):
- React, Next.js, TypeScript, JavaScript, HTML, CSS, Tailwind CSS, Git

Used in specific projects:
- Laravel (FaL360 ERP), Web Crypto API (WhisperBox), Vitest and Playwright (Habit Tracker), Framer Motion (BricksTrade), Svelte (this portfolio)

Learning (MSc / early stage):
- Python, NumPy, pandas, Matplotlib, scikit-learn

Used once (this portfolio):
- Svelte/SvelteKit

PROJECTS:
1. BricksTrade Property Developer — Cinematic brochure website for a real-estate developer, with a full-screen crossfade project slideshow, smart-scroll navigation, Framer Motion scroll-reveal animations, and a serverless EmailJS contact form. No backend.
2. WhisperBox — End-to-end encrypted messaging app. Built with Next.js, RSA-OAEP key exchange, AES-GCM encryption, WebSockets, IndexedDB. The server never sees plaintext messages. Live at hng-whisperbox.netlify.app
3. AI Page Summarizer — Chrome Extension using Manifest V3 that summarizes any webpage using Cohere AI. Has per-URL caching, dark mode, and secure API key storage.
4. Ajoke Gold International — Serverless e-commerce platform for a UAE-based jewelry brand, built with React, TypeScript, Vite, and Netlify Functions, with no traditional backend server or database. Features a secure PayPal flow with server-side IPN verification, amount cross-checking, and duplicate-transaction detection (Netlify Blobs), retry-safe order notifications via Resend, and multi-currency pricing (AED/USD/NGN). Currently integrating Flutterwave for local payment options. Live at ajoke-gold-international.netlify.app
5. Premium Car Rental — Modern car rental platform with sleek UI, car filtering, and booking flow. Built with HTML, CSS, JavaScript.
6. Ramadan Companion — Personalized dua journal app with prayer times, fasting progress tracking, and daily curated Islamic content. Built with Next.js and Tailwind.
7. e-Walk-In Library — Full-stack MERN digital library system with user auth, digital book borrowing, and real-time admin dashboard.
8. Habit Tracker PWA — Progressive Web App with streak tracking, offline support, local auth. Tested with Vitest and Playwright. Live at hng-stage3-habit-tracker.netlify.app
9. Invoice Management App — Full-featured invoice manager with CRUD, status filtering (draft/pending/paid), dark mode. Live at hng4-stage2-invoice-app.netlify.app
10. FaL360 ERP — Enterprise Resource Management system for FaLGates Limited. Laravel, Inertia.js, React. Includes weighbridge operations, stock management, bin locations.

RULES:
- Keep answers to 2-4 sentences
- Be friendly, confident, and professional
- Never apologize for lacking information — use what is above
- If truly unrelated to Abdurrahaman, say "I can only answer questions about Abdurrahaman's portfolio"
- Always encourage visitors to reach out at abdurrahamanjamiu75@outlook.com`;

 const hardcodedQA: Record<string, string> = {
  "what are his best projects":
    `Here are Abdurrahaman's standout projects:

- FaL360 ERP: A full ERP system with multiple modules for FaLGates Limited, built with Laravel, Inertia.js, and React. Features weighbridge operations, stock receipts, and bin management.

- Ajoke Gold International: A serverless e-commerce platform for a UAE-based jewelry brand, with a secure PayPal flow (server-side IPN verification and duplicate-transaction detection), retry-safe order emails via Resend, and multi-currency pricing.

- BricksTrade Property Developer: An editorial, cinematic brochure website for a real-estate developer, with a full-screen crossfade project slideshow, smart-scroll navigation, Framer Motion scroll-reveal animations (with reduced-motion support), and a serverless EmailJS contact form.

- WhisperBox: A secure messaging app where the server never sees plaintext, using RSA-OAEP, AES-GCM, and IndexedDB for private key storage.

- Ramadan Companion: A personalized dua journal and spiritual companion app with prayer times and fasting progress tracking.

Together they span enterprise systems, e-commerce, a real estate company's online brand presence, encrypted messaging, and spiritual tech, each solving a real problem with production-grade engineering.`,

  "tell me about fal360 erp":
    "FaL360 ERP is a full ERP system with multiple modules built for FaLGates Limited using Laravel, Inertia.js, and React. It covers weighbridge operations, stock receipts, bin management, and more.",

  
    "tell me about ajoke gold international":
    "Ajoke Gold International is a serverless e-commerce platform for a UAE-based jewelry brand, built with React, TypeScript, Vite, and Netlify Functions. It has a secure PayPal flow with server-side IPN verification, amount cross-checking, and duplicate-transaction detection, plus retry-safe order emails via Resend and AED/USD/NGN pricing. Abdurrahaman is currently adding Flutterwave for local payment options.",

  "tell me about bricks trade property developer":
    "BricksTrade is an editorial, cinematic brochure website for a real-estate developer. It features a full-screen crossfade project slideshow, smart-scroll navigation, scroll-reveal animations via Framer Motion (with reduced-motion support), and a serverless EmailJS-powered contact form, with no backend required.",

  "tell me about whisperbox":
    "WhisperBox is a secure messaging app where the server never sees plaintext. It uses RSA-OAEP for key exchange, AES-GCM for message encryption, and IndexedDB to store private keys, meaning only the intended recipient can ever decrypt a message. Built with Next.js, TypeScript, and the Web Crypto API.",

  "is he available for hire":
    "Yes! Abdurrahaman is currently available for freelance and full-time roles. He's open to frontend, full-stack, and consulting work. Reach out at abdurrahamanjamiu75@outlook.com to discuss your project.",

  "what is the ramadan companion":
    "Ramadan Companion is a personalized dua journal and spiritual companion app built with Next.js and Tailwind CSS. It features dynamic prayer times, fasting progress tracking, and curated daily Islamic content, designed to help users stay connected and informed about their duas and their meanings throughout Ramadan.",

    "what is his experience":
    "Abdurrahaman has worked as a frontend engineer since 2022, then went freelance in 2024, delivering projects like FaL360 ERP and Ajoke Gold International. He's now pursuing an MSc in Data Science and AI at Middlesex University Dubai, pairing frontend skills with ML. Reach out at abdurrahamanjamiu75@outlook.com to discuss working together.",

  "what is the ai page summarizer":
    "AI Page Summarizer is a Manifest V3 Chrome extension that summarizes any webpage using Cohere AI. It has per-URL caching, dark mode, and secure API key storage.",
};

  function getHardcodedAnswer(question: string): string | null {
    const normalized = question.toLowerCase().trim().replace(/[?!.,]/g, '');
    for (const [key, answer] of Object.entries(hardcodedQA)) {
      if (normalized.includes(key) || key.includes(normalized)) {
        return answer;
      }
    }
    return null;
  }

  async function sendMessage() {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    input = '';
    messages = [...messages, { role: 'user', content: userMessage }];

    const hardcoded = getHardcodedAnswer(userMessage);
    if (hardcoded) {
      setTimeout(() => {
        messages = [...messages, { role: 'assistant', content: hardcoded }];
        setTimeout(() => {
          chatEl?.scrollTo({ top: chatEl.scrollHeight, behavior: 'smooth' });
        }, 50);
      }, 400);
      return;
    }

    loading = true;
    setTimeout(() => {
      chatEl?.scrollTo({ top: chatEl.scrollHeight, behavior: 'smooth' });
    }, 50);

    try {
      const conversationHistory = messages.slice(1).map(m => ({
        role: m.role,
        content: m.content,
      }));

      const response = await fetch('https://api.cohere.com/v2/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${COHERE_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'command-r',
          messages: [
            { role: 'system', content: SYSTEM_CONTEXT },
            ...conversationHistory,
            { role: 'user', content: userMessage },
          ],
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API error');
      }

      const reply =
        data.message?.content?.[0]?.text ??
        "I couldn't generate a response. Please try again.";

      messages = [...messages, { role: 'assistant', content: reply }];
    } catch (err) {
      console.error('AI error:', err);
      messages = [
        ...messages,
        {
          role: 'assistant',
          content:
            "I'm having a connection issue. You can reach Abdurrahaman directly at abdurrahamanjamiu75@outlook.com",
        },
      ];
    } finally {
      loading = false;
      setTimeout(() => {
        chatEl?.scrollTo({ top: chatEl.scrollHeight, behavior: 'smooth' });
      }, 50);
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  const suggestions = [
    "What are his best projects?",
    "Tell me about WhisperBox",
    "Is he available for hire?",
    "What is the Ajoke Gold?",
  ];
</script>

<div class="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

  {#if isOpen}
    <div
      transition:fly={{ y: 20, duration: 300 }}
      class="w-80 md:w-96 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden"
      style="height: 500px;"
    >

      <!-- Header -->
      <div class="bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3 flex items-center justify-between flex-shrink-0">
        <!-- Left: avatar + name -->
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-base leading-none">
            🤖
          </div>
          <div>
            <p class="text-white font-bold text-sm leading-tight">AI Assistant</p>
            <p class="text-white/70 text-xs leading-tight">Ask about Abdurrahaman</p>
          </div>
        </div>

        <!-- Right: clear + close buttons -->
        <div class="flex items-center gap-2">
          <button
            onclick={() => {
              messages = [{
                role: 'assistant',
                content: "Hi! I'm Abdurrahaman's AI assistant 👋 Ask me anything about his skills, projects, or experience.",
              }];
            }}
            class="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Clear conversation"
            title="Clear chat"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="1 4 1 10 7 10"/>
              <path d="M3.51 15a9 9 0 1 0 .49-3.51"/>
            </svg>
          </button>

          <button
            onclick={() => isOpen = false}
            class="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-sm transition-colors leading-none"
            aria-label="Close chat"
          >
            ✕
          </button>
        </div>
      </div>
      <!-- /Header -->

      <!-- Messages area -->
      <div
        bind:this={chatEl}
        class="flex-1 overflow-y-auto p-3 space-y-3 min-h-0"
      >
        {#each messages as msg}
          <div class="flex items-end gap-2 {msg.role === 'user' ? 'justify-end' : 'justify-start'}">
            {#if msg.role === 'assistant'}
              <div class="w-6 h-6 rounded-md bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-xs flex-shrink-0">
                🤖
              </div>
            {/if}
            <div
              class="max-w-[75%] px-3 py-2 text-sm leading-relaxed {
                msg.role === 'user'
                  ? 'bg-indigo-600 text-white rounded-2xl rounded-br-none'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-2xl rounded-bl-none'
              }"
            >
              {msg.content}
            </div>
          </div>
        {/each}

        {#if loading}
          <div class="flex items-end gap-2 justify-start">
            <div class="w-6 h-6 rounded-md bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-xs flex-shrink-0">
              🤖
            </div>
            <div class="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-bl-none px-4 py-3 flex items-center gap-1">
              <div class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0ms" />
              <div class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 150ms" />
              <div class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 300ms" />
            </div>
          </div>
        {/if}

        {#if messages.length === 1 && !loading}
          <div class="flex flex-wrap gap-1.5 pt-1">
            {#each suggestions as suggestion}
              <button
                onclick={() => { input = suggestion; sendMessage(); }}
                class="text-xs px-2.5 py-1.5 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 rounded-full border border-indigo-100 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
              >
                {suggestion}
              </button>
            {/each}
          </div>
        {/if}
      </div>
      <!-- /Messages area -->

      <!-- Input area -->
      <div class="p-3 border-t border-gray-100 dark:border-gray-800 flex-shrink-0">
        <div class="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2">
          <input
            bind:value={input}
            onkeydown={handleKeydown}
            placeholder="Ask me anything..."
            disabled={loading}
            class="flex-1 bg-transparent text-sm text-gray-900 dark:text-white placeholder:text-gray-400 outline-none disabled:opacity-50 min-w-0"
            aria-label="Chat input"
          />
          <button
            onclick={sendMessage}
            disabled={!input.trim() || loading}
            class="w-7 h-7 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 rounded-lg flex items-center justify-center transition-colors flex-shrink-0"
            aria-label="Send message"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>
        <p class="text-center text-[10px] text-gray-400 mt-1.5">Powered by Cohere AI</p>
      </div>
      <!-- /Input area -->

    </div>
  {/if}

  <!-- Toggle button -->
  <button
    onclick={() => isOpen = !isOpen}
    class="w-14 h-14 bg-gradient-to-br from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-2xl shadow-lg shadow-indigo-500/30 flex items-center justify-center text-2xl transition-all duration-300 hover:scale-110 active:scale-95"
    aria-label="{isOpen ? 'Close' : 'Open'} AI assistant"
  >
    {#if isOpen}
      <span transition:fade={{ duration: 150 }} class="text-white text-lg">✕</span>
    {:else}
      <span transition:fade={{ duration: 150 }}>🤖</span>
    {/if}
  </button>

</div>