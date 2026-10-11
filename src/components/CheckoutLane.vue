<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

defineProps({
  baskets: { type: Array, required: true },
  openId: { type: String, default: null },
})
defineEmits(['open'])

// The belt only runs while the lane is on screen.
const belt = ref(null)
const running = ref(false)
let watcher
onMounted(() => {
  if (!('IntersectionObserver' in window)) return (running.value = true)
  watcher = new IntersectionObserver(([entry]) => (running.value = entry.isIntersecting))
  watcher.observe(belt.value)
})
onBeforeUnmount(() => watcher?.disconnect())
</script>

<template>
  <section id="checkout" class="lane" aria-labelledby="lane-title">
    <div class="lane-signs">
      <p class="font-display lane-chalkboard">Click a basket<br />to unpack it!</p>
    </div>

    <div ref="belt" class="belt" :class="{ running }">
      <ul class="belt-track">
        <!-- two copies so the loop is seamless; both are clickable, but the second is skipped by keyboard and screen readers -->
        <template v-for="copy in 2" :key="copy">
        <li v-for="basket in baskets" :key="`${copy}-${basket.id}`" class="belt-slot"
          :aria-hidden="copy === 2 ? 'true' : undefined">
          <button
            type="button"
            class="basket-btn"
            :tabindex="copy === 2 ? -1 : undefined"
            :aria-label="`Unpack the ${basket.category} basket (${basket.kind.toLowerCase()})`"
            :aria-pressed="basket.id === openId"
            @click="$emit('open', basket.id)"
          >
            <span class="basket-status">
              <span v-if="basket.id === openId" class="basket-tag">on the counter</span>
            </span>
            <span class="font-display basket-sign">{{ basket.category }}</span>
            <span class="basket-post" aria-hidden="true"></span>
            <span class="basket">
            <svg width="260" height="216" viewBox="0 0 260 216" aria-hidden="true"
              stroke-linejoin="round" stroke-linecap="round">
              <!-- items peeking over the rim, by category -->
              <g v-if="basket.id === 'skills'">
                <path d="M70 86 C62 40 92 14 128 18 C110 30 100 52 104 86 Z" fill="var(--banana)" stroke="var(--ink)" stroke-width="4" />
                <circle cx="162" cy="62" r="30" fill="var(--tomato)" stroke="var(--ink)" stroke-width="4" />
                <path d="M162 32 q10 -14 22 -10 q-6 12 -22 10 z" fill="var(--basket-green)" stroke="var(--ink)" stroke-width="3" />
              </g>
              <g v-else-if="basket.id === 'education'">
                <ellipse cx="104" cy="50" rx="22" ry="44" transform="rotate(-25 104 50)" fill="var(--eggplant)" stroke="var(--ink)" stroke-width="4" />
                <path d="M118 10 l12 -6 l2 14 z" fill="var(--basket-green)" stroke="var(--ink)" stroke-width="3" />
                <circle cx="168" cy="62" r="32" fill="#9FD08A" stroke="var(--ink)" stroke-width="4" />
                <path d="M168 36 v44 M168 56 l-14 -10 M168 66 l14 -10" fill="none" stroke="var(--ink)" stroke-width="3" />
              </g>
              <g v-else-if="basket.id === 'experience'">
                <rect x="82" y="22" width="52" height="70" rx="12" fill="var(--milk-blue)" stroke="var(--ink)" stroke-width="4" />
                <rect x="96" y="6" width="24" height="18" rx="4" fill="var(--tomato)" stroke="var(--ink)" stroke-width="3" />
                <rect x="148" y="48" width="62" height="38" rx="8" fill="var(--banana)" stroke="var(--ink)" stroke-width="4" />
                <circle cx="164" cy="62" r="3" fill="var(--ink)" /><circle cx="182" cy="70" r="3" fill="var(--ink)" /><circle cx="196" cy="60" r="3" fill="var(--ink)" />
              </g>
              <g v-else-if="basket.id === 'projects'">
                <path d="M80 92 L86 22 L96 30 L106 22 L116 30 L126 22 L136 30 L142 92 Z" fill="var(--tomato)" stroke="var(--ink)" stroke-width="4" />
                <circle cx="180" cy="62" r="28" fill="var(--wood)" stroke="var(--ink)" stroke-width="4" />
                <circle cx="172" cy="54" r="3.5" fill="var(--ink)" /><circle cx="188" cy="64" r="3.5" fill="var(--ink)" /><circle cx="176" cy="72" r="3.5" fill="var(--ink)" />
              </g>
              <!-- the basket -->
              <path d="M60 88 C60 8 200 8 200 88" fill="none" stroke="var(--basket-deep)" stroke-width="10" />
              <path d="M24 96 H236 L214 204 Q212 210 204 210 H56 Q48 210 46 204 Z" fill="var(--basket-green)" stroke="var(--basket-deep)" stroke-width="6" />
              <rect x="14" y="78" width="232" height="28" rx="14" fill="var(--basket-green)" stroke="var(--basket-deep)" stroke-width="6" />
              <g fill="var(--basket-deep)">
                <rect x="48" y="120" width="12" height="30" rx="6" /><rect x="68" y="120" width="12" height="30" rx="6" /><rect x="88" y="120" width="12" height="30" rx="6" />
                <rect x="52" y="162" width="12" height="28" rx="6" /><rect x="72" y="162" width="12" height="28" rx="6" />
                <rect x="160" y="120" width="12" height="30" rx="6" /><rect x="180" y="120" width="12" height="30" rx="6" /><rect x="200" y="120" width="12" height="30" rx="6" />
                <rect x="176" y="162" width="12" height="28" rx="6" /><rect x="196" y="162" width="12" height="28" rx="6" />
              </g>
              <circle cx="116" cy="144" r="7" fill="var(--ink)" /><circle cx="144" cy="144" r="7" fill="var(--ink)" />
              <path d="M114 166 Q130 182 146 166" fill="none" stroke="var(--ink)" stroke-width="5" />
            </svg>
            <img v-if="basket.sticker" class="sticker basket-sticker" :src="`/stickers/${basket.sticker}.webp`" alt="" aria-hidden="true" />
            </span>
          </button>
        </li>
        </template>
      </ul>
      <div class="belt-surface" aria-hidden="true"></div>
      <div class="belt-rollers" aria-hidden="true"></div>
    </div>
  </section>
</template>

<style scoped>
.lane { padding-top: 72px; }
.lane-signs {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 32px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;
}
.lane-banner {
  margin: 0;
  padding: 14px 28px;
  background: var(--sign-cream);
  border: 3px solid var(--ink);
  border-radius: var(--radius-sign);
  box-shadow: var(--shadow-doodle);
  font-size: 36px;
  line-height: 1.1;
}
.lane-chalkboard {
  margin: 0;
  padding: 18px 24px;
  background: var(--chalkboard);
  color: var(--chalk);
  border: 10px solid var(--wood);
  border-radius: var(--radius-sign);
  font-size: 22px;
  line-height: 1.2;
}
.belt { margin-top: 32px; overflow: hidden; }
.belt-track {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: flex-end;
  margin: 0;
  padding: 0;
  list-style: none;
  width: max-content;
}
/* track = 2 copies, so moving it by half loops exactly once, left to right */
@keyframes belt { from { transform: translateX(-50%); } to { transform: translateX(0); } }
@keyframes rollers { from { background-position: 0 0; } to { background-position: 48px 0; } }
.belt-track { animation: belt 48s linear infinite paused; }
/* ponytail: roller speed matches the belt only near 1440px wide; tie both to one GSAP tween if it bugs anyone */
.belt-rollers { animation: rollers 1.6s linear infinite paused; }
.belt.running .belt-track, .belt.running .belt-rollers { animation-play-state: running; }
.belt.running:hover .belt-track, .belt.running:hover .belt-rollers,
.belt.running:focus-within .belt-track, .belt.running:focus-within .belt-rollers { animation-play-state: paused; }
/* a quarter of the viewport each, so four baskets fill the lane */
.belt-slot { flex: 0 0 25vw; min-width: 260px; display: flex; justify-content: center; }
.basket-btn {
  padding: 0;
  border: none;
  background: transparent;
  color: var(--ink);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.basket-btn:focus-visible { outline: 3px solid var(--ink); outline-offset: 6px; border-radius: var(--radius-sign); }
.basket-sign {
  padding: 10px 24px;
  background: var(--sign-cream);
  border: 3px solid var(--ink);
  border-radius: var(--radius-sign);
  box-shadow: var(--shadow-doodle);
  font-size: 26px;
  line-height: 1;
}
.basket-post {
  display: block;
  width: 12px;
  height: 36px;
  background: var(--wood);
  border-left: 3px solid var(--ink);
  border-right: 3px solid var(--ink);
}
.basket { position: relative; display: block; margin-top: -20px; transition: transform 0.2s ease; }
.basket svg { display: block; }
.basket-sticker { top: -24px; right: -52px; width: 124px; transform: rotate(10deg); }
.basket-btn:hover .basket, .basket-btn:focus-visible .basket { transform: translateY(-12px) rotate(-2deg); }
.basket-status { height: 30px; margin-bottom: 8px; display: flex; align-items: center; }
.basket-tag {
  padding: 2px 12px;
  background: var(--paper);
  border: 3px solid var(--ink);
  border-radius: var(--radius-pill);
  font-size: 13px;
}
.belt-surface {
  height: 40px;
  margin-top: -34px;
  background: var(--belt);
  border-top: 4px solid var(--ink);
}
.belt-rollers {
  height: 44px;
  border-bottom: 4px solid var(--ink);
  background-color: #2A2A2C;
  background-image:
    radial-gradient(circle at 24px 22px, var(--belt) 0 5px, transparent 6px),
    radial-gradient(circle at 24px 22px, var(--roller) 0 13px, #5C5C60 13px 15px, transparent 16px);
  background-size: 48px 44px;
}
@media (prefers-reduced-motion: reduce) {
  .basket { transition: none; }
  .belt-track, .belt-rollers { animation: none; }
  .belt { overflow-x: auto; } /* still belt: let people scroll to every basket */
}
</style>
