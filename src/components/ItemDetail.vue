<script setup>
import { computed } from 'vue'

const props = defineProps({ item: { type: Object, required: true } })
const links = computed(() => props.item.links.filter((l) => l.href)) // no URL yet = not shown
</script>

<template>
  <article class="item-detail">
    <div class="detail-head">
      <span class="font-display">Scanned item</span>
    </div>
    <img v-if="item.image" class="detail-image" :src="`/photos/${item.image}`" :alt="item.title" />
    <h3 class="detail-title">{{ item.title }}</h3>
    <p class="detail-meta">{{ item.meta }}</p>
    <p class="detail-body">{{ item.body }}</p>
    <div v-if="links.length" class="detail-links">
      <a v-for="link in links" :key="link.label" :href="link.href" class="detail-link">{{ link.label }} ↗</a>
    </div>
  </article>
</template>

<style scoped>
.item-detail { display: flex; flex-direction: column; gap: 14px; }
.detail-head { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; padding-bottom: 12px; border-bottom: 3px dashed var(--ink-muted); font-size: 24px; }
/* whole photo, never cropped; tall ones are capped and centred */
.detail-image { width: 100%; height: auto; max-height: 520px; object-fit: contain; background: #fff; border: 3px solid var(--ink); border-radius: var(--radius-sign); }
.detail-title { margin: 0; font-size: 24px; line-height: 1.25; }
.detail-meta { margin: 0; font-size: 14px; color: var(--ink-muted); }
.detail-body { margin: 0; font-size: 16px; line-height: 24px; }
.detail-links { display: flex; flex-wrap: wrap; gap: 10px; padding-top: 14px; border-top: 3px dashed var(--ink-muted); }
.detail-link {
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  padding: 0 16px;
  background: var(--paper);
  color: var(--ink);
  border: 3px solid var(--ink);
  border-radius: var(--radius-sign);
  text-decoration: none;
  font-size: 14px;
}
</style>
