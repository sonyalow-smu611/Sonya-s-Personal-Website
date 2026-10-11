<script setup>
// A blank sticker with a short line written on it. `area` = where the text sits on that sticker (CSS inset).
defineProps({
  src: { type: String, required: true },
  text: { type: String, required: true },
  area: { type: String, default: '22% 18%' },
})
</script>

<template>
  <div class="sticker corner-sticker" aria-hidden="true">
    <img :src="src" alt="" />
    <span class="font-display corner-text" :style="{ inset: area }">{{ text }}</span>
  </div>
</template>

<style scoped>
img { display: block; width: 100%; }
.corner-text {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  line-height: 1;
  color: var(--ink);
}
@media (max-width: 719.98px) { .corner-sticker { display: none; } }
</style>
