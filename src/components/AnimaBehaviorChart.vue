<script setup>
import { ref } from 'vue'
import { behaviors } from '../data/anima-r7.js'

const W = 900
const L = 168
const R = 48
const rowH = 26
const max = Math.max(...behaviors.map((b) => b.count))
const w = (n) => (n / max) * (W - L - R)
const H = behaviors.length * rowH + 8
const hover = ref(null)
</script>

<template>
  <div class="viz">
    <div class="viz__head">
      <strong>她一天里做了什么</strong>
      <span>全天自主调用的行为次数 · 共 {{ behaviors.reduce((s, b) => s + b.count, 0) }} 次</span>
    </div>
    <div class="scroll"><svg :viewBox="`0 0 ${W} ${H}`" role="img" aria-label="R7 全天行为次数">
      <g v-for="(b, i) in behaviors" :key="b.name" @mouseenter="hover = b" @mouseleave="hover = null">
        <title>{{ b.name }} · {{ b.count }} 次</title>
        <rect x="0" :y="i * rowH" :width="W" :height="rowH" class="hit" />
        <text :x="L - 12" :y="i * rowH + 17" class="label" text-anchor="end">{{ b.label }}</text>
        <rect :x="L" :y="i * rowH + 6" :width="Math.max(w(b.count), 4)" height="14" rx="4" class="bar" :class="{ 'bar--hover': hover === b }" />
        <text :x="L + w(b.count) + 8" :y="i * rowH + 17" class="value">{{ b.count }}<tspan v-if="b.note" class="note"> · {{ b.note }}</tspan></text>
      </g>
    </svg></div>
    <p class="viz__foot">「说话」只能通过显式的 qq_say；模型自己的输出不会被自动转发。全天 0 次被护栏拒绝。</p>
  </div>
</template>

<style scoped>
.viz { background: var(--surface); border: 1px solid var(--line); border-radius: 10px; padding: 16px 18px 12px; margin-top: 18px; }
.viz__head { display: flex; flex-wrap: wrap; gap: 4px 12px; align-items: baseline; margin-bottom: 8px; }
.viz__head span { font-size: 13px; color: var(--muted); }
svg { width: 100%; height: auto; display: block; }
.hit { fill: transparent; }
.label { fill: var(--text); font-size: 13px; }
.code { fill: var(--muted); font-size: 11px; font-family: ui-monospace, monospace; }
.bar { fill: var(--accent); opacity: .85; }
.bar--hover { opacity: 1; }
.value { fill: var(--text); font-size: 12px; }
.note { fill: var(--muted); }
.viz__foot { font-size: 12px; color: var(--muted); margin: 6px 0 0; }
@media (max-width: 640px) {
  .viz { padding: 14px 12px 10px; }
  .scroll { overflow-x: auto; -webkit-overflow-scrolling: touch; margin: 0 -12px; padding: 0 12px; }
  .scroll svg { min-width: 620px; }
}
</style>
