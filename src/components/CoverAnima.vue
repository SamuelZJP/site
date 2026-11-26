<script setup>
// 首页 dsh-anima 封面：R7 真机测试的一天画成 24 小时表盘。数据全部来自 anima-r7.js。
import { body, events, sleep, fmt } from '../data/anima-r7.js'

const C = { x: 150, y: 130 }
const R = 92
const ang = (min) => ((min % 1440) / 1440) * Math.PI * 2 - Math.PI / 2 // 00:00 在正上方
const pt = (min, r = R) => [C.x + r * Math.cos(ang(min)), C.y + r * Math.sin(ang(min))]
function arc(from, to, r = R) {
  const [x1, y1] = pt(from, r)
  const [x2, y2] = pt(to, r)
  const large = to - from > 720 ? 1 : 0
  return `M${x1.toFixed(1)},${y1.toFixed(1)} A${r},${r} 0 ${large} 1 ${x2.toFixed(1)},${y2.toFixed(1)}`
}
const start = body[0].min - 1 // 08:45 接入
const hours = Array.from({ length: 24 }, (_, i) => i * 60)
const labels = [0, 6, 12, 18].map((h) => ({ h, p: pt(h * 60, R + 22) }))
const beats = events.heartbeat.map((m) => pt(m))
const msgs = events.message.map((m) => pt(m, R - 13))
const inits = events.initiate.map((e) => pt(e.min, R + 11))
</script>

<template>
  <svg viewBox="0 0 520 260" class="cover-svg" role="img" aria-label="dsh-anima 在 QQ 上的一天：24 小时表盘">
    <!-- 刻度 -->
    <circle :cx="C.x" :cy="C.y" :r="R" class="track" />
    <line v-for="m in hours" :key="m" :x1="pt(m, R + 3)[0]" :y1="pt(m, R + 3)[1]" :x2="pt(m, R + (m % 360 ? 6 : 9))[0]" :y2="pt(m, R + (m % 360 ? 6 : 9))[1]" class="tick" />
    <text v-for="l in labels" :key="l.h" :x="l.p[0]" :y="l.p[1] + 4" class="hour">{{ String(l.h).padStart(2, '0') }}</text>

    <!-- 醒着与睡着 -->
    <path :d="arc(start, sleep.from)" class="awake" />
    <path :d="arc(sleep.from, sleep.to)" class="sleep" />

    <!-- 心跳、收到消息、主动找人 -->
    <circle v-for="(b, i) in beats" :key="'b' + i" :cx="b[0]" :cy="b[1]" r="2.6" class="beat" />
    <circle v-for="(m, i) in msgs" :key="'m' + i" :cx="m[0]" :cy="m[1]" r="2" class="msg" />
    <circle v-for="(p, i) in inits" :key="'i' + i" :cx="p[0]" :cy="p[1]" r="2.6" class="init" />

    <!-- 表盘中心 -->
    <text :x="C.x" :y="C.y - 4" class="center-big">一天一夜</text>
    <text :x="C.x" :y="C.y + 15" class="center-sub">QQ 真机测试</text>

    <!-- 右侧注记 -->
    <g class="legend" transform="translate(300 74)">
      <text y="0" class="lg-title">{{ fmt(start) }} 接入</text>
      <text y="16" class="lg-sub">自己决定说话、休息和找人</text>
      <text y="54" class="lg-title">{{ fmt(sleep.from) }} 自己入睡</text>
      <text y="70" class="lg-sub">{{ fmt(sleep.to) }} 自己醒来</text>
      <g transform="translate(0 106)">
        <circle cx="4" cy="-4" r="2.6" class="beat" /><text x="13" y="0" class="lg-key">心跳</text>
        <circle cx="56" cy="-4" r="2" class="msg" /><text x="64" y="0" class="lg-key">收到消息</text>
        <circle cx="128" cy="-4" r="2.6" class="init" /><text x="137" y="0" class="lg-key">主动找人</text>
      </g>
    </g>
  </svg>
</template>

<style scoped>
.cover-svg { display: block; width: 100%; height: 100%; }
.track { fill: none; stroke: #e2dfd7; stroke-width: 1; }
.tick { stroke: #c9c5bb; stroke-width: 1; }
.hour { font-family: var(--num); font-size: 10px; fill: var(--faint); text-anchor: middle; }
.awake { fill: none; stroke: #b9b5ab; stroke-width: 3; stroke-linecap: round; }
.sleep { fill: none; stroke: #9aa8dc; stroke-width: 10; stroke-linecap: round; opacity: .55; }
.beat { fill: var(--accent); }
.msg { fill: #b9b5ab; }
.init { fill: none; stroke: var(--accent); stroke-width: 1.4; }
text { font-family: inherit; }
.center-big { font-size: 15px; font-weight: 600; fill: var(--text); text-anchor: middle; letter-spacing: .06em; }
.center-sub { font-size: 10.5px; fill: var(--muted); text-anchor: middle; }
.lg-title { font-family: inherit; font-size: 14px; font-weight: 600; fill: var(--text); }
.lg-sub { font-size: 11.5px; fill: var(--muted); }
.lg-key { font-size: 11px; fill: var(--muted); }
@media (max-width: 640px) {
  .lg-sub, .center-sub, .legend g { display: none; }
  .lg-title { font-size: 19px; }
  .center-big { font-size: 20px; }
  .hour { font-size: 14px; }
}
</style>
