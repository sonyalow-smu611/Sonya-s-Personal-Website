<script setup>
import { computed, ref } from 'vue'
import { baskets as shopBaskets, contact as shopContact } from './data/shop.js'
import HeroBox from './components/HeroBox.vue'
import CheckoutLane from './components/CheckoutLane.vue'
import BaggingArea from './components/BaggingArea.vue'
import ReceiptFooter from './components/ReceiptFooter.vue'

// Fixtures in tests; the real shop data otherwise.
const props = defineProps({
  baskets: { type: Array, default: () => shopBaskets },
  contact: { type: Object, default: () => shopContact },
})

const openId = ref(props.baskets[0]?.id ?? null)
const openBasket = computed(() => props.baskets.find((b) => b.id === openId.value))
</script>

<template>
  <main>
    <HeroBox :contact="contact" />
    <CheckoutLane :baskets="baskets" :open-id="openId" @open="openId = $event" />
    <BaggingArea v-if="openBasket" :key="openBasket.id" :basket="openBasket" />
  </main>
  <ReceiptFooter :contact="contact" />
</template>
