<script setup>
// 首页「经历」：双轨时间线。宽屏是按月的甘特图，窄屏退化为列表。数据见 profile.timeline。
import { computed } from 'vue'

const props = defineProps({ data: Object })
const idx = (ym) => {
  const [y, m] = ym.split('-').map(Number)
  const [y0, m0] = props.data.from.split('-').map(Number)
  return (y - y0) * 12 + (m - m0)
}
const dot = (ym) => ym.replace('-', '.')
const months = computed(() => {
  const n = idx(props.data.to) + 1
  return Array.from({ length: n }, (_, i) => {
    const [y0, m0] = props.data.from.split('-').map(Number)
    const t = m0 - 1 + i
    return { i, y: y0 + Math.floor(t / 12), m: (t % 12) + 1 }
  })
})
const col = (from, to = from) => ({ gridColumn: `${idx(from) + 2} / ${idx(to) + 3}` })

// 行号：1 轴；之后每条轨道占若干行，科研轨道后面紧跟里程碑行
const layout = computed(() => {
  let r = 2
  const lanes = props.data.lanes.map((lane, li) => {
    const start = r
    const rows = lane.rows.map((items) => ({ items, row: r++ }))
    let ms = null
    if (li === 0) ms = r++
    return { ...lane, start, end: r, rows, ms }
  })
  return { lanes, earlier: r, total: r + 1 }
})
const period = (s) => (s.from === s.to ? dot(s.from) : `${dot(s.from)} – ${dot(s.to)}`)
</script>

<template>
  <!-- 宽屏：甘特图 -->
  <div class="tl-grid" :style="{ gridTemplateColumns: `112px repeat(${months.length}, minmax(0, 1fr))` }">
    <!-- 月份竖线与轴标签 -->
    <div v-for="mo in months" :key="'g' + mo.i" class="vline" :class="{ year: mo.m === 1 }" :style="{ gridColumn: mo.i + 2, gridRow: `1 / ${layout.earlier}` }"></div>
    <div v-for="mo in months" :key="'a' + mo.i" class="axis" :style="{ gridColumn: mo.i + 2, gridRow: 1 }">
      <span v-if="mo.i === 0 || mo.m === 1" class="axis__year">{{ mo.y }}</span>
      <span class="axis__m" :class="{ now: mo.i === months.length - 1 }">{{ mo.i === months.length - 1 ? '现在' : mo.m }}</span>
    </div>

    <template v-for="lane in layout.lanes" :key="lane.title">
      <div class="lane-title" :style="{ gridColumn: 1, gridRow: `${lane.start} / ${lane.end}` }">
        <strong>{{ lane.title }}</strong>
        <span>{{ lane.sub }}</span>
      </div>
      <template v-for="r in lane.rows" :key="r.row">
        <template v-for="s in r.items" :key="s.from + s.label">
        <!-- 承接箭头（如 MAAS → LoreNook） -->
        <div v-if="s.arrow" class="arrow" :style="{ ...col(s.from, s.to), gridRow: r.row }" :title="s.label">
          <span class="arrow__label">{{ s.label }}</span>
          <svg viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true"><line x1="2" y1="5" x2="92" y2="5" /></svg>
          <i class="arrow__head"></i>
        </div>
        <component
          v-else
          :is="s.project ? 'RouterLink' : 'div'"
          :to="s.project ? `/projects/${s.project}` : undefined"
          class="bar"
          :class="[lane.project ? 'bar--main' : 'bar--side', { 'bar--pending': s.pending, 'bar--one': s.from === s.to }]"
          :style="{ ...col(s.from, s.to), gridRow: r.row }"
          :title="s.tip ? `${period(s)} · ${s.tip}` : period(s)"
        >{{ s.label }}</component>
        </template>
      </template>
      <template v-if="lane.ms">
        <div v-for="m in data.milestones" :key="m.at" class="ms" :style="{ ...col(m.at), gridRow: lane.ms }">
          <i></i>
          <span class="ms__label">{{ m.label }}</span>
          <span v-if="m.sub" class="ms__sub">{{ m.sub }}</span>
          <span class="ms__date">{{ dot(m.at) }}</span>
        </div>
      </template>
    </template>

    <!-- 更早 -->
    <div class="lane-title lane-title--earlier" :style="{ gridColumn: 1, gridRow: layout.earlier }">
      <strong>更早</strong>
    </div>
    <div class="earlier" :style="{ gridColumn: `2 / -1`, gridRow: layout.earlier }">
      <component
        :is="e.project ? 'RouterLink' : 'div'"
        v-for="e in data.earlier"
        :key="e.period"
        :to="e.project ? `/projects/${e.project}` : undefined"
        class="earlier__item"
      >
        <span class="earlier__period">{{ e.period }}</span>
        <span class="earlier__role">{{ e.role }}</span>
        <span class="earlier__org">{{ e.org }} · {{ e.note }}</span>
        <span v-if="e.project" class="earlier__go">项目截图与职责<i>→</i></span>
      </component>
    </div>
  </div>

  <!-- 窄屏：列表 -->
  <div class="tl-list">
    <section v-for="lane in data.lanes" :key="lane.title" class="tl-list__lane">
      <h3>{{ lane.title }}<span>{{ lane.sub }}</span></h3>
      <ol>
        <li v-for="s in lane.rows.flat().filter((x) => !x.arrow)" :key="s.from + s.label">
          <span class="p">{{ period(s) }}</span>
          <RouterLink v-if="s.project" :to="`/projects/${s.project}`">{{ s.label }}</RouterLink>
          <span v-else>{{ s.label }}</span>
        </li>
      </ol>
      <p v-if="lane.project" class="tl-list__ms">
        <span v-for="m in data.milestones" :key="m.at">{{ dot(m.at) }} {{ m.label }}<template v-if="m.sub"> · {{ m.sub }}</template></span>
      </p>
    </section>
    <section class="tl-list__lane">
      <h3>更早</h3>
      <ol>
        <li v-for="e in data.earlier" :key="e.period">
          <span class="p">{{ e.period }}</span>
          <RouterLink v-if="e.project" :to="`/projects/${e.project}`">{{ e.role }} · {{ e.org }}</RouterLink>
        </li>
      </ol>
    </section>
  </div>
</template>

<style scoped>
.tl-grid { display: grid; row-gap: 10px; position: relative; }
.vline { border-left: 1px dashed var(--line); margin-bottom: -4px; pointer-events: none; }
.vline.year { border-left: 1px solid var(--line-strong); }
.axis { display: flex; flex-direction: column; justify-content: flex-end; padding: 0 0 6px 6px; min-height: 40px; font-family: var(--num); }
.axis__year { font-size: 12px; font-weight: 600; color: var(--text); }
.axis__m { font-size: 11px; color: var(--faint); }
.axis__m.now { color: var(--accent); font-family: inherit; font-weight: 600; }

.lane-title { display: flex; flex-direction: column; justify-content: center; padding-right: 12px; }
.lane-title strong { font-size: 15px; }
.lane-title span { font-size: 12px; color: var(--faint); }
.lane-title--earlier { justify-content: center; }
.lane-title--earlier strong { font-size: 13px; color: var(--muted); font-weight: 500; }

.bar { position: relative; z-index: 1; display: flex; align-items: center; height: 34px; margin: 0 2px; padding: 0 10px; border-radius: 6px; font-size: 12.5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: inherit; }
.bar--main { background: var(--accent-soft); color: var(--accent); font-weight: 500; }
/* 副线：磨砂玻璃 */
.bar--side {
  color: var(--text); font-weight: 500;
  background: linear-gradient(180deg, rgba(255, 255, 255, .82), rgba(255, 255, 255, .5));
  backdrop-filter: blur(10px) saturate(1.3); -webkit-backdrop-filter: blur(10px) saturate(1.3);
  border: 1px solid rgba(255, 255, 255, .9);
  box-shadow: 0 0 0 1px rgba(28, 27, 25, .06), 0 6px 18px -10px rgba(28, 27, 25, .35), inset 0 1px 0 rgba(255, 255, 255, .9);
  transition: transform .2s ease, box-shadow .2s ease, color .2s;
}
.bar--side::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: var(--accent); opacity: .5; margin-right: 8px; flex: none; }
.bar--side.bar--one::before { display: none; }
a.bar:hover { text-decoration: none; color: var(--accent); }
a.bar--side:hover { transform: translateY(-1px); box-shadow: 0 0 0 1px rgba(39, 67, 168, .25), 0 10px 22px -10px rgba(39, 67, 168, .4), inset 0 1px 0 rgba(255, 255, 255, .9); }

.arrow { position: relative; z-index: 1; display: flex; align-items: center; height: 34px; margin: 0 4px; }
.arrow svg { flex: 1; height: 10px; overflow: visible; }
.arrow line { stroke: var(--accent); stroke-width: 1.2; stroke-dasharray: 3 3; vector-effect: non-scaling-stroke; opacity: .7; }
.arrow__head { width: 0; height: 0; border-left: 7px solid var(--accent); border-top: 4px solid transparent; border-bottom: 4px solid transparent; opacity: .75; margin-left: -2px; flex: none; }
.arrow__label { position: absolute; left: 0; right: 0; top: -5px; text-align: center; font-size: 11px; color: var(--accent); white-space: nowrap; }
.bar--one { padding: 0 2px; justify-content: center; font-size: 12px; text-overflow: clip; }
.bar--pending { background: transparent; border: 1px dashed #9aa8dc; color: var(--accent); }

.ms { position: relative; z-index: 1; display: flex; flex-direction: column; align-items: center; text-align: center; white-space: nowrap; padding-top: 2px; margin-bottom: 8px; }
.ms i { width: 9px; height: 9px; border-radius: 50%; background: var(--surface); border: 2px solid var(--accent); margin-bottom: 4px; }
.ms__label { font-size: 12.5px; font-weight: 600; line-height: 1.35; }
.ms__sub { font-size: 12.5px; font-weight: 600; line-height: 1.35; }
.ms__date { font-family: var(--num); font-size: 10.5px; color: var(--faint); }

.earlier { position: relative; z-index: 1; border-top: 1px solid var(--line); padding-top: 4px; margin-top: 6px; background: var(--bg); }
.lane-title--earlier { border-top: 1px solid var(--line); padding-top: 12px; margin-top: 6px; }
.earlier__item { display: flex; align-items: center; gap: 14px; font-size: 14px; color: inherit; padding: 10px 14px; margin: 0 -14px; border-radius: 10px; transition: background .2s ease; }
a.earlier__item:hover { text-decoration: none; background: var(--surface); box-shadow: 0 0 0 1px var(--line); }
.earlier__go { margin-left: auto; display: inline-flex; align-items: center; gap: 8px; font-size: 13px; color: var(--accent); white-space: nowrap; }
.earlier__go i { font-style: normal; display: inline-flex; align-items: center; justify-content: center; width: 24px; height: 24px; border-radius: 50%; background: var(--accent-soft); transition: transform .2s ease; }
a.earlier__item:hover .earlier__go i { transform: translateX(3px); }
.earlier__period { font-family: var(--num); color: var(--muted); font-size: 13px; }
.earlier__role { font-weight: 600; }
.earlier__org { color: var(--muted); }

.tl-list { display: none; }
@media (max-width: 760px) {
  .tl-grid { display: none; }
  .tl-list { display: block; }
  .tl-list__lane + .tl-list__lane { margin-top: 24px; }
  .tl-list h3 { margin: 0 0 8px; font-size: 16px; }
  .tl-list h3 span { font-size: 12px; font-weight: 400; color: var(--faint); margin-left: 10px; }
  .tl-list ol { list-style: none; margin: 0; padding: 0; border-left: 2px solid var(--accent-soft); }
  .tl-list li { display: flex; gap: 12px; padding: 5px 0 5px 14px; font-size: 14px; }
  .tl-list .p { font-family: var(--num); color: var(--muted); font-size: 13px; min-width: 128px; }
  .tl-list__ms { display: flex; flex-direction: column; gap: 2px; margin: 10px 0 0; font-size: 12.5px; color: var(--muted); }
}
</style>
