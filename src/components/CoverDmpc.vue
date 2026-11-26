<script setup>
// 首页 D-MPC 封面：伪 3D（等轴测）三层堆叠——感知 → 预测 → 决策。只点名机制，不展开流程。
const cx = 150
const w = 190 // 顶面菱形宽
const h = 64 // 顶面菱形高
const t = 9 // 板厚
const layers = [
  { y: 62, no: '01', title: '感知', sub: '温湿度 · CO₂ · TVOC · 光照 · 人数' },
  { y: 132, no: '02', title: '预测', sub: 'Transformer · INT8 · 树莓派 5', core: true },
  { y: 202, no: '03', title: '决策', sub: '可微 MPC · 梯度优化控制序列' },
]
const top = (y) => `${cx},${y - h / 2} ${cx + w / 2},${y} ${cx},${y + h / 2} ${cx - w / 2},${y}`
const left = (y) => `${cx - w / 2},${y} ${cx},${y + h / 2} ${cx},${y + h / 2 + t} ${cx - w / 2},${y + t}`
const right = (y) => `${cx},${y + h / 2} ${cx + w / 2},${y} ${cx + w / 2},${y + t} ${cx},${y + h / 2 + t}`
// 顶面上的小网格点，增加一点「器件」质感
const dots = (y) => {
  const out = []
  for (let i = -2; i <= 2; i++) for (let j = -1; j <= 1; j++) {
    out.push([cx + (i - j) * 17, y + (i + j) * 5.6])
  }
  return out
}
</script>

<template>
  <svg viewBox="0 0 520 260" class="cover-svg" role="img" aria-label="D-MPC 三层结构：感知、预测、决策">
    <!-- 层间虚线 -->
    <line :x1="cx" :y1="layers[0].y + h / 2 + t" :x2="cx" :y2="layers[2].y - h / 2" class="link" />
    <g v-for="l in [...layers].reverse()" :key="l.no">
      <polygon :points="left(l.y)" :class="['side-l', { core: l.core }]" />
      <polygon :points="right(l.y)" :class="['side-r', { core: l.core }]" />
      <polygon :points="top(l.y)" :class="['face', { core: l.core }]" />
      <circle v-for="(d, i) in dots(l.y)" :key="i" :cx="d[0]" :cy="d[1]" r="1.6" :class="['dot', { core: l.core }]" />
    </g>
    <!-- 引线与标签 -->
    <g v-for="l in layers" :key="'t' + l.no">
      <line :x1="cx + w / 2 + 6" :y1="l.y" x2="300" :y2="l.y" class="leader" />
      <text x="308" :y="l.y - 4" class="no">{{ l.no }}</text>
      <text x="332" :y="l.y - 3" :class="['title', { core: l.core }]">{{ l.title }}</text>
      <text x="308" :y="l.y + 15" class="sub">{{ l.sub }}</text>
    </g>
  </svg>
</template>

<style scoped>
.cover-svg { display: block; width: 100%; height: 100%; }
.face { fill: #fbfaf7; stroke: #b9b5ab; stroke-width: 1; }
.side-l { fill: #e6e3dc; stroke: #b9b5ab; stroke-width: 1; }
.side-r { fill: #d9d5cc; stroke: #b9b5ab; stroke-width: 1; }
.face.core { fill: #eef1fa; stroke: #7d8fcf; }
.side-l.core { fill: #d5dcf1; stroke: #7d8fcf; }
.side-r.core { fill: #c3cceb; stroke: #7d8fcf; }
.dot { fill: #c9c5bb; }
.dot.core { fill: #8797d4; }
.link { stroke: #b9b5ab; stroke-dasharray: 3 4; }
.leader { stroke: #c9c5bb; stroke-width: 1; }
text { font-family: inherit; }
.no { font-family: var(--num); font-size: 10.5px; fill: var(--faint); letter-spacing: .08em; }
.title { font-size: 14px; font-weight: 600; fill: var(--text); }
.title.core { fill: var(--accent); }
.sub { font-size: 11.5px; fill: var(--muted); }
/* 手机上图被缩到约 0.65 倍：只留编号与层名，字放大 */
@media (max-width: 640px) {
  .sub { display: none; }
  .title { font-size: 22px; }
  .no { font-size: 15px; }
}
</style>
