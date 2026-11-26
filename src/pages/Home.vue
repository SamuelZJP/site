<script setup>
import { computed } from 'vue'
import { profile, projects } from '../data/profile.js'
import Honors from '../components/Honors.vue'
import CoverDmpc from '../components/CoverDmpc.vue'
import CoverAnima from '../components/CoverAnima.vue'
import Timeline from '../components/Timeline.vue'

const shown = computed(() => projects.filter((p) => p.home))
const featured = computed(() => shown.value.find((p) => p.home.featured))
const rest = computed(() => shown.value.filter((p) => !p.home.featured))
</script>

<template>
  <section class="hero wrap">
    <p class="eyebrow">{{ profile.role }}</p>
    <h1 class="hero__name">{{ profile.name }}</h1>
    <ul class="facts">
      <li v-for="f in profile.facts" :key="f">{{ f }}</li>
    </ul>
    <p class="lead">{{ profile.intro }}</p>
    <ul class="tags">
      <li v-for="t in profile.tags" :key="t">{{ t }}</li>
    </ul>
  </section>

  <!-- 项目 -->
  <section id="projects" class="wrap sec">
    <header class="sec__head"><span class="sec__no">01</span><h2>项目</h2></header>

    <RouterLink v-if="featured" :to="`/projects/${featured.id}`" class="pcard pcard--feature">
      <div class="pcard__body">
        <p class="pcard__kicker">{{ featured.kicker }}</p>
        <h3>{{ featured.name }}</h3>
        <p class="pcard__summary">{{ featured.summary }}</p>
        <div class="stat">
          <strong>{{ featured.home.value }}</strong>
          <span>{{ featured.home.label }}</span>
        </div>
        <div class="pcard__foot">
          <span class="access">{{ featured.access.label }}</span>
        </div>
      </div>
      <div class="pcard__cover">
        <img :src="featured.home.cover" :alt="featured.name" />
      </div>
    </RouterLink>

    <div class="pgrid">
      <RouterLink v-for="p in rest" :key="p.id" :to="`/projects/${p.id}`" class="pcard">
        <div class="pcard__cover pcard__cover--art">
          <CoverDmpc v-if="p.home.art === 'dmpc'" />
          <CoverAnima v-else-if="p.home.art === 'anima'" />
          <img v-else-if="p.home.cover" :src="p.home.cover" :alt="p.name" loading="lazy" />
        </div>
        <div class="pcard__body">
          <p class="pcard__kicker">{{ p.kicker }}</p>
          <h3>{{ p.name }}</h3>
          <p class="pcard__summary">{{ p.summary }}</p>
          <div class="stat">
            <strong>{{ p.home.value }}</strong>
            <span>{{ p.home.label }}</span>
          </div>
          <div class="pcard__foot">
            <span class="access">{{ p.access.label }}</span>
          </div>
        </div>
      </RouterLink>
    </div>
  </section>

  <!-- 经历 -->
  <section id="experience" class="wrap sec">
    <header class="sec__head"><span class="sec__no">02</span><h2>经历</h2></header>
    <Timeline :data="profile.timeline" />
  </section>

  <!-- 荣誉 -->
  <section id="honors" class="wrap sec">
    <header class="sec__head"><span class="sec__no">03</span><h2>荣誉</h2></header>
    <Honors :honors="profile.honors" :featured="4" />
  </section>
</template>

<style scoped>
/* 首屏 */
.hero { padding: 96px 32px 24px; }
.hero__name { font-size: 52px; letter-spacing: .04em; margin: 0 0 18px; }
.facts { list-style: none; margin: 0 0 22px; padding: 0; display: flex; flex-wrap: wrap; row-gap: 4px; font-size: 15px; color: var(--text); }
.facts li { display: inline-flex; align-items: center; }
.facts li + li::before { content: ''; width: 1px; height: 12px; background: var(--line-strong); margin: 0 14px; }
.facts li:nth-child(n + 3) { font-weight: 600; }
.lead { max-width: 640px; font-size: 16px; }

/* 分区标题 */
.sec { margin-top: 72px; }
.sec__head { display: flex; align-items: baseline; gap: 14px; padding-bottom: 14px; border-bottom: 1px solid var(--text); margin-bottom: 28px; }
.sec__head h2 { margin: 0; font-size: 22px; font-weight: 650; letter-spacing: .04em; }
.sec__no { font-family: var(--num); font-size: 13px; color: var(--faint); letter-spacing: .08em; }

/* 项目卡 */
.pcard { display: flex; flex-direction: column; background: var(--surface); border: 1px solid var(--line); border-radius: 14px; overflow: hidden; color: inherit; transition: transform .25s ease, box-shadow .25s ease, border-color .25s; }
.pcard:hover { text-decoration: none; transform: translateY(-3px); border-color: var(--line-strong); box-shadow: 0 14px 36px -18px rgba(28, 27, 25, .28); }
.pcard__body { display: flex; flex-direction: column; padding: 24px 26px 22px; flex: 1; }
.pcard__kicker { margin: 0 0 6px; font-size: 12.5px; color: var(--faint); letter-spacing: .02em; }
.pcard h3 { margin: 0 0 10px; font-size: 21px; line-height: 1.35; }
.pcard__summary { margin: 0 0 20px; color: var(--muted); font-size: 14.5px; line-height: 1.75; flex: 1; }
.pcard__cover { position: relative; background: #f1efe9; overflow: hidden; }
/* 截图退后：降饱和、略降对比，再半透明地融进暖灰底；悬停时恢复 */
.pcard__cover img { display: block; width: 100%; height: 100%; object-fit: cover; filter: saturate(.45) contrast(.94); opacity: .82; transition: filter .5s ease, opacity .5s ease, transform .6s ease; }
.pcard:hover .pcard__cover img { filter: none; opacity: 1; transform: scale(1.015); }
.pcard__cover--art { padding: 6px 10px; }
.pcard__cover--art :deep(svg) { transition: opacity .4s ease; opacity: .88; }
.pcard:hover .pcard__cover--art :deep(svg) { opacity: 1; }

.stat { display: flex; align-items: baseline; gap: 12px; padding: 14px 0; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); margin-bottom: 16px; }
.stat strong { font-family: var(--num); font-size: 26px; font-weight: 600; line-height: 1; color: var(--text); letter-spacing: -.01em; white-space: nowrap; }
.stat span { font-size: 13px; color: var(--muted); }

.pcard__foot { display: flex; justify-content: space-between; align-items: center; gap: 12px; font-size: 13px; }
.access { color: var(--muted); display: inline-flex; align-items: center; gap: 8px; }
.access::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: var(--accent); opacity: .55; flex: none; }

.pcard--feature { display: grid; grid-template-columns: 1fr 1fr; margin-bottom: 20px; }
.pcard--feature .pcard__body { padding: 34px 34px 28px; }
.pcard--feature h3 { font-size: 26px; }
.pcard--feature .stat strong { font-size: 30px; }
.pcard--feature .pcard__cover { border-left: 1px solid var(--line); min-height: 340px; }
.pcard--feature .pcard__cover img { object-position: center 42%; }
/* 左缘渐隐进卡片白底，图不再和文字分成两半 */
.pcard--feature .pcard__cover::after { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, var(--surface) 0%, rgba(255,255,255,0) 22%); pointer-events: none; }

.pgrid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.pgrid .pcard__cover { aspect-ratio: 2 / 1; border-bottom: 1px solid var(--line); }

@media (max-width: 820px) {
  .pcard--feature { grid-template-columns: 1fr; }
  .pcard--feature .pcard__cover { order: -1; border-left: 0; border-bottom: 1px solid var(--line); min-height: 0; aspect-ratio: 16 / 9; }
  .pcard--feature .pcard__cover::after { display: none; }
  .pgrid { grid-template-columns: 1fr; }
}
@media (max-width: 640px) {
  .hero { padding: 56px 16px 8px; }
  .hero__name { font-size: 38px; }
  .facts { font-size: 14px; column-gap: 14px; }
  .facts li + li::before { display: none; }
  .sec { margin-top: 56px; }
  .pcard__body, .pcard--feature .pcard__body { padding: 20px; }
}
</style>
