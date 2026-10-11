<script setup>
import CornerSticker from './CornerSticker.vue'
defineProps({ contact: { type: Object, required: true } })
</script>

<template>
  <section id="top" class="hero shop-box">
    <img class="hero-aisle" src="/aisle.webp" alt="" />
    <CornerSticker class="hero-sticker" src="/stickers/burst-blank.webp" text="hand-picked just for you!" />

    <header class="hero-header">
      <a href="#top" class="hero-logo" aria-label="sonya's space — back to top">
        <svg width="60" height="52" viewBox="0 0 60 52" fill="none" stroke="currentColor" stroke-width="3"
          stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M3 5h8l6 28h30l6-20H14" /><path d="M19 23h31" /><path d="M26 13l2 20M37 13l-1 20" />
          <circle cx="22" cy="44" r="4" /><circle cx="44" cy="44" r="4" />
        </svg>
      </a>
    </header>

    <div class="hero-body">
      <h1 class="hero-title">Sonya's</h1>
      <p class="hero-intro">
        Year 2 Information Systems @ SMU. Majoring in product development. I build AI agents, RAG pipelines and full-stack web apps. 
      </p>
      <nav class="hero-links" aria-label="Contact">
        <a class="shop-btn" href="/resume.pdf">Resume</a>
      </nav>
    </div>

    <div class="hero-cue">
      <span>scroll to checkout</span>
      <svg class="cue-arrow" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M12 5v14M5 12l7 7 7-7" />
      </svg>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
  min-height: 680px;
  display: flex;
  flex-direction: column;
  margin: var(--space-3);
}
.hero-aisle {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 40%;
  opacity: 0.35;
}
.hero-header { position: relative; padding: 20px 32px; }
.hero-logo { display: inline-flex; padding: 6px; border-radius: var(--radius-sign); color: var(--ink); }
.hero-body {
  position: relative;
  flex: 1 1 auto;
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 32px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 22px;
  text-align: center;
  isolation: isolate; /* keeps the text glow above the aisle photo */
}
/* soft cream glow hugging the title and the intro, so they stay readable over the photo */
.hero-title, .hero-intro { position: relative; }
.hero-title::before, .hero-intro::before {
  content: '';
  position: absolute;
  inset: -10px -22px;
  z-index: -1;
  background: var(--paper);
  border-radius: 32px;
  filter: blur(16px);
}
.hero-badge {
  margin: 0;
  padding: 6px 16px;
  background: var(--sign-cream);
  border: 3px solid var(--ink);
  border-radius: var(--radius-sign);
  box-shadow: var(--shadow-doodle);
  font-size: 14px;
}
.hero-title { margin: 0; font-size: clamp(56px, 9vw, 96px); line-height: 0.95; }
.hero-intro { margin: 0; max-width: 640px; font-size: 19px; line-height: 28px; }
.hero-links { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; }
.shop-btn {
  min-height: 48px;
  display: inline-flex;
  align-items: center;
  padding: 0 18px;
  background: var(--paper);
  color: var(--ink);
  border: 3px solid var(--ink);
  border-radius: var(--radius-sign);
  box-shadow: var(--shadow-doodle);
  text-decoration: none;
}
.shop-btn-primary { background: var(--basket-deep); color: var(--paper); }
.shop-btn:hover { transform: translate(-1px, -1px); }
.shop-btn-primary:hover { color: var(--paper); }
.hero-cue {
  position: relative;
  padding: 8px 0 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  font-size: 14px;
}
.hero-cue span { background: var(--paper); padding: 2px 10px; border-radius: var(--radius-pill); }
.cue-arrow { animation: bob 1.6s ease-in-out infinite; }
@keyframes bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(6px); } }
@media (prefers-reduced-motion: reduce) { .cue-arrow { animation: none; } }
.hero-sticker { top: 96px; right: 5vw; width: clamp(150px, 16vw, 230px); transform: rotate(8deg); font-size: clamp(17px, 1.7vw, 24px); }
</style>
