<template>
  <section id="faq" class="py-12 sm:py-20 border-b border-border">
    <div class="max-w-6xl mx-auto px-6 sm:px-6">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <!-- Left Column - Section Header (Sticky) -->
        <div class="lg:col-span-4">
          <div class="lg:sticky lg:top-24">
        <div class="inline-flex items-center gap-2 px-3 py-1 border border-primary/20 bg-primary/5 text-primary text-xs font-semibold tracking-wide uppercase mb-6 hover:bg-primary/10 transition-colors">
          <Icon name="i-heroicons-question-mark-circle" class="h-4 w-4 text-primary" />
          <span class="text-sm font-medium">FAQ</span>
        </div>
        <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Frequently Asked
          <span class="bg-linear-to-r from-primary via-teal-500 to-cyan-500 bg-clip-text text-transparent">Questions</span>        
        </h2>
        <p class="text-base text-muted-foreground">
          Everything you need to know about LinkNest
        </p>
          </div>
      </div>

        <!-- Right Column - FAQ Accordion -->
        <div class="lg:col-span-8">
      <UAccordion :items="faqs" class="flex flex-col">
        <template #item="{ item }">
          <p class="text-sm text-muted-foreground mb-4 leading-relaxed">{{ item.answer }}</p>
        </template>
      </UAccordion>
        </div>
      </div>
    </div>
  </section>
</template>


<script setup lang="ts">
const faqs = [
  {
    label: 'How does LinkNest automatically fetch link metadata?',
    answer: 'LinkNest uses Open Graph protocol and meta tags to automatically extract information like title, description, thumbnail, and site name from any URL. Simply paste a link, and we handle the rest.',
    slot: 'item'
  },
  {
    label: 'How does the auto-categorization work?',
    answer: 'Our smart categorization system analyzes the URL structure, domain, and content metadata to automatically sort links into relevant categories like Development, Design, Social Media, News, and more. You can also create custom categories.',
    slot: 'item'
  },
  {
    label: 'Is LinkNest free to use?',
    answer: 'Yes! LinkNest offers a generous free tier that includes unlimited link storage, auto-categorization, and all core features. Premium plans with advanced features are available for power users.',
    slot: 'item'
  },
  {
    label: 'Can I organize links without manual input?',
    answer: 'Absolutely! That\'s the core philosophy of LinkNest. Just paste or drag-drop your links, and everything else happens automatically - metadata fetching, categorization, and beautiful display.',
    slot: 'item'
  },
  {
    label: 'Is my data secure?',
    answer: 'Yes, security is our top priority. All data is encrypted, stored securely in PostgreSQL, and we never share your information with third parties. You have full control over your data.',
    slot: 'item'
  },
  {
    label: 'Can I export my links?',
    answer: 'Yes, you can export your entire link collection in various formats including JSON, CSV, and HTML. We believe your data should always be portable.',
    slot: 'item'
  },
  {
    label: 'Does LinkNest work on mobile devices?',
    answer: 'Yes! LinkNest is fully responsive and works seamlessly on all devices - desktop, tablet, and mobile. You can access and manage your links from anywhere.',
    slot: 'item'
  },
  {
    label: 'Can I share my link collections?',
    answer: 'Yes, you can create public or private collections and share them with others via a simple link. Perfect for team collaboration or curating resources.',
    slot: 'item'
  }
]
</script>
