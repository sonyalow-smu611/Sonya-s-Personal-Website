<script setup>
import CornerSticker from './CornerSticker.vue'
const props = defineProps({ contact: { type: Object, required: true } })
const rows = [
  { label: 'EMAIL', href: `mailto:${props.contact.email}` },
  { label: 'LINKEDIN', href: props.contact.linkedin },
  { label: 'GITHUB', href: props.contact.github },
]
</script>

<template>
  <footer id="receipt" class="receipt-wrap">
    <div class="receipt">
      <div class="edge edge-top" aria-hidden="true"></div>
      <div class="paper">
        <div class="rcpt-row">
          <span class="receipt-label">RECEIPT</span>
          <span class="receipt-no">Contact me: 9009 4742</span>
        </div>
        <div class="masthead">
          <p class="font-display shop-name">sonya's</p>

        </div>
        <hr />
        <p class="thanks">THANKS FOR SHOPPING</p>
        <hr />
        <div class="lines">
          <p class="customer">SONYA LOW</p>
          <a v-for="row in rows" :key="row.label" :href="row.href" class="line">
            <span>{{ row.label }}</span><span class="leader" aria-hidden="true"></span><span>{{ row.href }}</span>
          </a>
        </div>
        <hr />
        <p class="rcpt-row total"><span>TOTAL:</span><span>$19.06</span></p>
        <div class="barcode" aria-hidden="true"></div>
        <p class="font-display thank-you">Thank you!</p>
        <p class="rcpt-row small"><span>SONYA LOW YA XUAN</span></p>
      </div>
      <div class="edge edge-bottom" aria-hidden="true"></div>
    </div>
  </footer>
</template>

<style scoped>
.receipt-wrap { padding: 104px 0 96px; }
.receipt-sticker { top: -118px; right: -56px; width: clamp(140px, 14vw, 200px); transform: rotate(-9deg); font-size: clamp(20px, 2vw, 28px); }
.receipt { position: relative; width: 80vw; margin: 0 auto; filter: drop-shadow(3px 4px 0 var(--ink)); }
.edge { height: 14px; background-size: 20px 14px; background-repeat: repeat-x; }
.edge-top { background-image: linear-gradient(-45deg, var(--paper) 10px, transparent 0), linear-gradient(45deg, var(--paper) 10px, transparent 0); background-position: left bottom; }
.edge-bottom { background-image: linear-gradient(-135deg, var(--paper) 10px, transparent 0), linear-gradient(135deg, var(--paper) 10px, transparent 0); background-position: left top; }
.paper {
  background-color: var(--paper);
  background-image: radial-gradient(rgba(31, 58, 43, 0.12) 1px, transparent 1.5px);
  background-size: 6px 6px;
  padding: 32px clamp(20px, 6vw, 88px) 36px;
  font-family: var(--font-receipt);
  font-weight: 700;
  display: flex;
  flex-direction: column;
  gap: 22px;
}
.paper p { margin: 0; }
.paper hr { margin: 0; border: 0; border-top: 4px dashed var(--ink); opacity: 1; }
.rcpt-row { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: baseline; gap: 8px 24px; }
.receipt-label { font-family: var(--font-body); font-weight: 800; font-size: 28px; letter-spacing: 0.04em; color: var(--tomato-text); }
.receipt-no { font-family: var(--font-body); font-weight: 800; font-size: 24px; }
.masthead { display: flex; flex-direction: column; align-items: center; gap: 10px; text-align: center; }
.shop-name { font-size: clamp(48px, 7vw, 72px); line-height: 0.95; color: var(--tomato-text); }
.tagline { font-size: 15px; }
.thanks { text-align: center; font-size: 20px; letter-spacing: 0.2em; }
.lines { display: flex; flex-direction: column; gap: 4px; font-size: 18px; }
.customer { margin-bottom: 6px !important; }
.line { min-height: 44px; display: flex; align-items: center; gap: 12px; color: var(--ink); text-decoration: none; }
.line:hover .leader { border-bottom-style: solid; }
.leader { flex: 1 1 auto; border-bottom: 4px dotted var(--ink); transform: translateY(6px); }
.total { font-size: clamp(20px, 2.4vw, 28px); }
.barcode {
  align-self: center;
  width: min(560px, 100%);
  height: 84px;
  margin-top: 8px;
  background-image: repeating-linear-gradient(90deg, var(--ink) 0 3px, transparent 3px 5px, var(--ink) 5px 6px, transparent 6px 9px, var(--ink) 9px 13px, transparent 13px 15px, var(--ink) 15px 16px, transparent 16px 20px);
}
.thank-you { text-align: center; font-size: clamp(44px, 6vw, 64px); line-height: 1; color: var(--tomato-text); }
.small { font-size: 13px; }
</style>
