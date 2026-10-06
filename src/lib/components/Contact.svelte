<script lang="ts">
  import Mail from '~icons/lucide/mail';
  import Check from '~icons/lucide/check';
  import ArrowRight from '~icons/lucide/arrow-right';
  import GitHub from '~icons/simple-icons/github';
  import LinkedIn from '~icons/simple-icons/linkedin';
  import Instagram from '~icons/simple-icons/instagram';

  // Svelte 5 State Runes
  let name = $state('');
  let email = $state('');
  let message = $state('');
  let status = $state<'idle' | 'sending' | 'success' | 'error'>('idle');
  let errors = $state<Record<string, string>>({});

  function validate() {
    errors = {};
    if (!name.trim()) errors.name = 'Name is required';
    if (!email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Invalid email';
    if (!message.trim()) errors.message = 'Message is required';
    else if (message.trim().length < 10) errors.message = 'Message too short';
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    if (!validate()) return;

    status = 'sending';
    await new Promise(r => setTimeout(r, 1500));

    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.open(`mailto:abdurrahamanjamiu75@outlook.com?subject=${subject}&body=${body}`);

    status = 'success';
    name = ''; email = ''; message = '';
    setTimeout(() => status = 'idle', 4000);
  }
</script>

<section id="contact" class="py-24 bg-white dark:bg-slate-950 flex flex-col items-center justify-center">
  <div class="w-full max-w-4xl mx-auto px-6"> <!-- Increased max-width for a broader look -->
    <div class="text-center mb-16">
  <span class="text-indigo-500 font-semibold text-sm uppercase tracking-widest block text-center">
    Get In Touch
  </span>
  <h2 class="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mt-2 text-center">
    Let's Work Together
  </h2>
  <p class="text-slate-500 dark:text-slate-400 mt-4 max-w-xl mx-auto text-lg text-center">
    Have a project in mind? Drop me a message and I'll get back to you within 24 hours.
  </p>
</div>

    <div class="flex flex-col items-center gap-16">
      
      <form
        onsubmit={handleSubmit}
        class="w-full mx-auto space-y-8 bg-slate-50 dark:bg-slate-900/50 p-10 md:p-14 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm"
        novalidate
      >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="space-y-3">
            <label for="name" class="block text-base font-bold text-slate-700 dark:text-slate-300 ml-1">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              bind:value={name}
              placeholder="Abdurrahaman Jamiu"
              class="w-full px-6 py-5 bg-white dark:bg-slate-950 border-2 rounded-2xl text-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all {errors.name ? 'border-red-400' : 'border-slate-200 dark:border-slate-800'}"
            />
            {#if errors.name}
              <p class="text-red-500 text-sm mt-1 ml-1">{errors.name}</p>
            {/if}
          </div>

          <div class="space-y-3">
            <label for="email" class="block text-base font-bold text-slate-700 dark:text-slate-300 ml-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              bind:value={email}
              placeholder="jamiu@example.com"
              class="w-full px-6 py-5 bg-white dark:bg-slate-950 border-2 rounded-2xl text-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all {errors.email ? 'border-red-400' : 'border-slate-200 dark:border-slate-800'}"
            />
            {#if errors.email}
              <p class="text-red-500 text-sm mt-1 ml-1">{errors.email}</p>
            {/if}
          </div>
        </div>

        <div class="space-y-3">
          <label for="message" class="block text-base font-bold text-slate-700 dark:text-slate-300 ml-1">
            Message
          </label>
          <textarea
            id="message"
            bind:value={message}
            rows="6"
            placeholder="Tell me about your project..."
            class="w-full px-6 py-5 bg-white dark:bg-slate-950 border-2 rounded-2xl text-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all resize-none {errors.message ? 'border-red-400' : 'border-slate-200 dark:border-slate-800'}"
          ></textarea>
          {#if errors.message}
            <p class="text-red-500 text-sm mt-1 ml-1">{errors.message}</p>
          {/if}
        </div>

        <button
          type="submit"
          disabled={status === 'sending' || status === 'success'}
          class="w-full py-5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 text-white text-xl font-black rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 shadow-2xl shadow-indigo-500/40"
        >
          {#if status === 'sending'}
            <div class="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
            Sending...
          {:else if status === 'success'}
            <Check class="w-6 h-6" />
            <span>Message Sent</span>
          {:else}
            <span>Send Message</span>
            <ArrowRight class="w-6 h-6" />
          {/if}
        </button>
      </form>

      <!-- Social Links -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full max-w-4xl">
        {#each [
          { label: 'Email', value: 'MAIL', href: 'mailto:abdurrahamanjamiu75@outlook.com', icon: Mail },
          { label: 'LinkedIn', value: 'LinkedIn', href: 'https://www.linkedin.com/in/abdurrahaman-jamiu-14131524b/', icon: LinkedIn },
          { label: 'Instagram', value: 'Instagram', href: 'https://www.instagram.com/theeabdurrahaman.dev?igsh=M3l2eHIyMWtra2hn&utm_source=qr', icon: Instagram },
          { label: 'GitHub', value: 'GitHub', href: 'https://github.com/masterultron', icon: GitHub },
        ] as item}
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            class="flex flex-col items-center text-center gap-3 p-6 bg-slate-50 dark:bg-slate-900/30 rounded-[2rem] hover:bg-white dark:hover:bg-slate-800 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700 group hover:shadow-xl"
          >
            <item.icon class="w-8 h-8 mb-1 text-slate-600 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
            <div>
              <p class="text-[10px] text-slate-400 uppercase tracking-widest font-black mb-1">{item.label}</p>
              <p class="text-base text-slate-700 dark:text-slate-300 font-bold group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {item.value}
              </p>
            </div>
          </a>
        {/each}
      </div>

    </div>
  </div>
</section>