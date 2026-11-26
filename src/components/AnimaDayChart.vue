<script setup>
import { computed, ref } from 'vue'
import { body, events, sleep, range, notes, fmt } from '../data/anima-r7.js'

const W = 900
const L = 104 // 左侧行标签宽度
const R = 20
const x = (min) => L + ((min - range.from) / (range.to - range.from)) * (W - L - R)

const A = { top: 34, bottom: 150 } // 睡眠压力 0..1
const B = { top: 178, bottom: 262 } // 情绪 -0.25..0.25
const yA = (v) => A.bottom - v * (A.bottom - A.top)
const yB = (v) => (B.top + B.bottom) / 2 - (v / 0.25) * ((B.bottom - B.top) / 2)
const rows = { heartbeat: 294, message: 318, initiate: 342 }
const axisY = 362

const path = (pts) => pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join('')
const pressurePath = path(body.map((b) => [x(b.min), yA(b.pressure)]))
const valencePath = path(body.map((b) => [x(b.min), yB(b.valence)]))

const ticks = []
for (let m = 9 * 60; m <= range.to; m += 180) ticks.push(m)

// 悬停：找离鼠标最近的时间点（身体采样 + 事件）
const points = [
  ...body.map((b) => ({ min: b.min, kind: 'body', b })),
  ...events.message.map((m) => ({ min: m, kind: 'message' })),
  ...events.initiate.map((e) => ({ min: e.min, kind: 'initiate', what: e.what })),
  { min: sleep.from, kind: 'sleep' },
  { min: sleep.to, kind: 'wake' },
]
const hover = ref(null)
const svg = ref(null)
function onMove(e) {
  const box = svg.value.getBoundingClientRect()
  const px = ((e.clientX - box.left) / box.width) * W
  let best = null
  for (const p of points) {
    const d = Math.abs(x(p.min) - px)
    if (!best || d < best.d) best = { ...p, d }
  }
  hover.value = best && best.d < 24 ? best : null
}
const tip = computed(() => {
  const h = hover.value
  if (!h) return null
  const note = notes.find((n) => Math.abs(n.min - h.min) < 2)
  const lines = []
  if (h.kind === 'body') {
    lines.push(`心跳 · 睡眠压力 ${h.b.pressure.toFixed(2)} · 情绪 ${h.b.valence.toFixed(2)}`)
  } else if (h.kind === 'message') lines.push('收到消息，立即回复')
  else if (h.kind === 'initiate') lines.push(`她自己决定${h.what}`)
  else if (h.kind === 'sleep') lines.push('自己去睡了')
  else if (h.kind === 'wake') lines.push('睡足后自己醒来')
  if (note) lines.push(note.text)
  return { time: fmt(h.min), lines, left: (x(h.min) / W) * 100 }
})
</script>

<template>
  <div class="viz">
    <div class="viz__head">
      <strong>一天里的身体与行为</strong>
      <span>R7 真机测试 · 2026-11-25 08:45 → 11-26 03:07 · 悬停查看每个时刻</span>
    </div>
    <p class="swipe">左右滑动查看全天 →</p>
    <div class="scroll"><div class="viz__plot">
      <svg ref="svg" :viewBox="`0 0 ${W} 382`" role="img" aria-label="R7 一天的睡眠压力、情绪与行为时间线" @mousemove="onMove" @mouseleave="hover = null">
        <!-- 睡眠时段 -->
        <rect :x="x(sleep.from)" :y="A.top - 14" :width="x(sleep.to) - x(sleep.from)" :height="axisY - A.top + 14" class="sleep" />
        <text :x="(x(sleep.from) + x(sleep.to)) / 2" :y="A.top + 4" class="sleep-label" text-anchor="middle">睡眠 5 小时 50 分</text>
        <text :x="(x(sleep.from) + x(sleep.to)) / 2" :y="A.top + 20" class="muted small" text-anchor="middle">自己入睡 · 自己醒来</text>

        <!-- 面板 A：睡眠压力 -->
        <text :x="0" :y="A.top + 4" class="row-label">睡眠压力</text>
        <text :x="0" :y="A.top + 20" class="muted small">0 – 1</text>
        <line v-for="v in [0, 0.5, 1]" :key="v" :x1="L" :x2="W - R" :y1="yA(v)" :y2="yA(v)" class="grid" />
        <text v-for="v in [0, 0.5, 1]" :key="'l' + v" :x="L - 8" :y="yA(v) + 4" class="muted small" text-anchor="end">{{ v }}</text>
        <path :d="pressurePath" class="line" />
        <circle v-for="b in body" :key="'p' + b.min" :cx="x(b.min)" :cy="yA(b.pressure)" r="3.5" class="dot" />
        <text :x="x(sleep.from) - 6" :y="yA(0.74) - 8" class="value" text-anchor="end">0.74 → 入睡</text>

        <!-- 面板 B：情绪 -->
        <text :x="0" :y="B.top + 4" class="row-label">情绪</text>
        <text :x="0" :y="B.top + 20" class="muted small">valence</text>
        <line :x1="L" :x2="W - R" :y1="yB(0)" :y2="yB(0)" class="zero" />
        <text :x="L - 8" :y="yB(0) + 4" class="muted small" text-anchor="end">0</text>
        <text :x="L - 8" :y="yB(-0.2) + 4" class="muted small" text-anchor="end">−0.2</text>
        <line :x1="L" :x2="W - R" :y1="yB(-0.2)" :y2="yB(-0.2)" class="grid" />
        <path :d="valencePath" class="line" />
        <circle v-for="b in body" :key="'v' + b.min" :cx="x(b.min)" :cy="yB(b.valence)" r="3.5" class="dot" />
        <text :x="x(18 * 60 + 53) + 8" :y="yB(-0.17) + 16" class="value">一整天没什么消息，心情转低</text>

        <!-- 事件条 -->
        <text :x="0" :y="rows.heartbeat + 4" class="row-label">心跳</text>
        <text :x="0" :y="rows.message + 4" class="row-label">收到消息</text>
        <text :x="0" :y="rows.initiate + 4" class="row-label">她主动找人</text>
        <line v-for="(yy, k) in rows" :key="'r' + k" :x1="L" :x2="W - R" :y1="yy" :y2="yy" class="grid" />
        <circle v-for="m in events.heartbeat" :key="'h' + m" :cx="x(m)" :cy="rows.heartbeat" r="4.5" class="ev ev--beat" />
        <circle v-for="m in events.message" :key="'m' + m" :cx="x(m)" :cy="rows.message" r="4.5" class="ev ev--msg" />
        <circle v-for="e in events.initiate" :key="'i' + e.min" :cx="x(e.min)" :cy="rows.initiate" r="4.5" class="ev ev--init" />
        <text :x="x(events.heartbeat[1]) + 4" :y="rows.heartbeat - 9" class="value small">间隔 60 分钟</text>
        <text :x="x(events.heartbeat[14]) - 4" :y="rows.heartbeat - 9" class="value small" text-anchor="end">缩短到 47 分钟</text>

        <!-- 时间轴 -->
        <line :x1="L" :x2="W - R" :y1="axisY" :y2="axisY" class="axis" />
        <text v-for="m in ticks" :key="'t' + m" :x="x(m)" :y="axisY + 16" class="muted small" text-anchor="middle">{{ fmt(m) }}</text>

        <!-- 悬停十字线 -->
        <line v-if="hover" :x1="x(hover.min)" :x2="x(hover.min)" :y1="A.top - 14" :y2="axisY" class="cross" />
      </svg>
      <div v-if="tip" class="tip" :style="{ left: `clamp(8px, calc(${tip.left}% - 140px), calc(100% - 288px))` }">
        <b>{{ tip.time }}</b>
        <p v-for="(l, i) in tip.lines" :key="i">{{ l }}</p>
      </div>
    </div></div>
    <p class="viz__foot">睡眠中还有 4 次心跳，未单独画出。数据来自运行日志与 R7 报告；图中只画事件发生的时刻，不含对话内容。</p>
  </div>
</template>

<style scoped>
.viz { background: var(--surface); border: 1px solid var(--line); border-radius: 10px; padding: 16px 18px 12px; margin-top: 18px; }
.viz__head { display: flex; flex-wrap: wrap; gap: 4px 12px; align-items: baseline; margin-bottom: 6px; }
.viz__head span { font-size: 13px; color: var(--muted); }
.viz__plot { position: relative; }
svg { width: 100%; height: auto; display: block; font-size: 13px; }
.row-label { fill: var(--text); font-size: 13px; font-weight: 600; }
.muted { fill: var(--muted); }
.small { font-size: 11px; }
.value { fill: var(--muted); font-size: 12px; }
.grid { stroke: #ececea; stroke-width: 1; }
.zero { stroke: #c9cbc8; stroke-width: 1; }
.axis { stroke: #c9cbc8; }
.line { fill: none; stroke: var(--accent); stroke-width: 2; stroke-linejoin: round; }
.dot { fill: var(--accent); stroke: var(--surface); stroke-width: 2; }
.ev { stroke: var(--surface); stroke-width: 2; }
.ev--beat { fill: var(--accent); }
.ev--msg { fill: #eb6834; }
.ev--init { fill: #1baf7a; }
.sleep { fill: #eef1f7; }
.sleep-label { fill: #3d5a8a; font-size: 13px; font-weight: 600; }
.cross { stroke: #9aa3ad; stroke-dasharray: 3 3; }
.tip { position: absolute; top: 0; width: 280px; background: #1d2327; color: #f3f4f2; border-radius: 8px; padding: 8px 10px; font-size: 12px; pointer-events: none; box-shadow: 0 4px 14px rgba(0,0,0,.18); }
.tip b { font-size: 13px; }
.tip p { margin: 2px 0 0; color: #d6dbe0; }
.viz__foot { font-size: 12px; color: var(--muted); margin: 6px 0 0; }
.swipe { display: none; }
@media (max-width: 640px) {
  .viz { padding: 14px 12px 10px; }
  .scroll { overflow-x: auto; -webkit-overflow-scrolling: touch; margin: 0 -12px; padding: 0 12px; }
  .viz__plot { min-width: 760px; }
  .swipe { display: block; font-size: 12px; color: var(--faint); margin: 0 0 6px; }
}
</style>
