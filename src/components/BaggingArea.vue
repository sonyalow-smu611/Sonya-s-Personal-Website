<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import CornerSticker from './CornerSticker.vue'
import ItemDetail from './ItemDetail.vue'

// Mounted with :key = basket id, so switching baskets starts again at the first item.
const props = defineProps({ basket: { type: Object, required: true } })
const picked = ref(0)
const detail = computed(() => props.basket.items[picked.value])

// Phones (below Bootstrap's md breakpoint) read details in a bottom sheet instead of beside the cards.
// A native <dialog> gives Escape-to-close and focus back to the item for free.
const phone = window.matchMedia?.('(max-width: 767.98px)')
const isPhone = ref(phone?.matches ?? false)
const syncPhone = (e) => (isPhone.value = e.matches)
onMounted(() => phone?.addEventListener('change', syncPhone))
onBeforeUnmount(() => phone?.removeEventListener('change', syncPhone))

const sheet = ref(null)
function pick(i) {
  picked.value = i
  if (isPhone.value) sheet.value?.showModal()
}
</script>

<template>
  <section id="bagging" class="bagging" aria-labelledby="bagging-title">
    <div class="shop-box bagging-box">
      <p class="bagging-kicker">Bagging area · {{ basket.kind }}</p>
      <h2 id="bagging-title" class="bagging-title">{{ basket.category }}</h2>
      <div class="bagging-layout">
        <TransitionGroup tag="ul" name="unpack" appear class="item-grid">
          <li v-for="(item, i) in basket.items" :key="item.name" :style="{ '--i': i }">
            <button type="button" class="item-card" :aria-pressed="i === picked" @click="pick(i)">
              <img v-if="item.sticker" class="sticker item-sticker" :src="`/stickers/${item.sticker}.webp`" alt="" aria-hidden="true" />
              <img v-if="item.art" class="item-art item-photo" :src="`/items/${item.art}.webp`" alt="" aria-hidden="true" />
              <span v-else class="item-art" aria-hidden="true"></span>
              <span class="font-display item-name">{{ item.name }}</span>
              <span class="item-title">{{ item.title }}</span>
              <span v-if="i === picked" class="item-tag">scanned</span>
            </button>
          </li>
        </TransitionGroup>

        <div v-if="detail && !isPhone" class="detail-panel" aria-live="polite">
          <ItemDetail :item="detail" />
        </div>
      </div>
    </div>

    <dialog v-if="isPhone" ref="sheet" class="sheet" aria-label="Scanned item" @click.self="sheet.close()">
      <div class="sheet-inner">
        <button type="button" class="sheet-close" aria-label="Close" @click="sheet.close()">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
        <ItemDetail v-if="detail" :item="detail" />
      </div>
    </dialog>
  </section>
</template>

<style scoped>
.bagging { padding: 64px var(--space-3) 0; }
.bagging-box { position: relative; max-width: 1200px; margin: 0 auto; padding: 48px clamp(20px, 4vw, 48px) 56px; }
.bagging-kicker { margin: 0 0 6px; font-size: 13px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--ink-muted); }
.bagging-title { margin: 0 0 28px; font-size: 48px; line-height: 1; }
.bagging-layout { display: flex; flex-wrap: wrap; gap: 32px; align-items: flex-start; }
.item-grid {
  flex: 1 1 520px;
  min-width: 0;
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 18px;
}
.item-card {
  position: relative;
  width: 100%;
  min-height: 184px;
  padding: 16px 12px;
  background: #fff;
  color: var(--ink);
  border: 3px solid var(--ink);
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-doodle);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  text-align: center;
  font: inherit;
}
.item-card:hover { transform: translate(-1px, -1px); }
.item-card:focus-visible { outline: 3px solid var(--ink); outline-offset: 4px; }
.bagging-sticker { top: -40px; right: 32px; width: 170px; transform: rotate(-6deg); font-size: 22px; }
.item-sticker { top: -26px; right: -20px; width: 92px; transform: rotate(9deg); }
.item-art { width: 72px; height: 72px; border: 3px dashed var(--ink-muted); border-radius: var(--radius-pill); background: var(--tile-pink); }
.item-photo { border: none; border-radius: 0; background: none; object-fit: contain; }
.item-name { font-size: 20px; line-height: 1.1; }
.item-title { font-size: 12px; line-height: 1.4; color: var(--ink-muted); }
.item-tag { padding: 1px 10px; border: 3px solid var(--tomato); border-radius: var(--radius-pill); font-size: 12px; }
.detail-panel {
  flex: 1 1 360px;
  min-width: 0;
  padding: 28px;
  background: #fff;
  border: 3px solid var(--ink);
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-doodle);
}

/* phone bottom sheet */
.sheet {
  width: 100%;
  max-width: 100%;
  max-height: 85vh;
  margin: auto 0 0;
  padding: 0;
  background: #fff;
  color: var(--ink);
  border: 4px solid var(--ink);
  border-bottom: 0;
  border-radius: var(--radius-basket) var(--radius-basket) 0 0;
}
.sheet::backdrop { background: rgba(31, 58, 43, 0.45); }
.sheet[open] { animation: sheet-up 0.25s ease-out; }
@keyframes sheet-up { from { transform: translateY(100%); } }
.sheet-inner { position: relative; padding: 28px 20px 32px; }
.sheet-close {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  background: var(--paper);
  color: var(--ink);
  border: 3px solid var(--ink);
  border-radius: var(--radius-pill);
}
.sheet-inner :deep(.detail-head) { padding-right: 52px; }
@media (prefers-reduced-motion: reduce) { .sheet[open] { animation: none; } }

/* unpacking: items pop in one after another */
.unpack-enter-active { transition: opacity 0.3s ease, transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); transition-delay: calc(var(--i) * 60ms); }
.unpack-enter-from { opacity: 0; transform: translateY(-24px) scale(0.85); }
@media (prefers-reduced-motion: reduce) {
  .unpack-enter-active { transition: opacity 0.3s ease; transition-delay: 0s; }
  .unpack-enter-from { transform: none; }
}
</style>
