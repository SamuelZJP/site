<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { projects } from '../data/profile.js'
import AnimaDayChart from '../components/AnimaDayChart.vue'
import AnimaBehaviorChart from '../components/AnimaBehaviorChart.vue'
import Lightbox from '../components/Lightbox.vue'
import AnimaArch from '../components/AnimaArch.vue'
import AnimaPhases from '../components/AnimaPhases.vue'
import LoreNookArch from '../components/LoreNookArch.vue'
import CoverDmpc from '../components/CoverDmpc.vue'
import CoverAnima from '../components/CoverAnima.vue'

const props = defineProps({ id: String })
const project = computed(() => projects.find((p) => p.id === props.id))
const others = computed(() => projects.filter((p) => p.id !== props.id))
const zoomed = ref(null) // 当前查看的截图下标

// 文案里的 **关键词** → <strong>；先转义，避免注入
const esc = (t) => t.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])
const rich = (t) => esc(t).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')

// 右下角悬浮按钮：滚动超过半屏才显示「回到顶部」
const scrolled = ref(false)
const onScroll = () => { scrolled.value = window.scrollY > window.innerHeight * 0.5 }
const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
onMounted(() => { window.addEventListener('scroll', onScroll, { passive: true }); onScroll() })
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
watch(() => props.id, () => { zoomed.value = null })
</script>

<template>
  <article v-if="project" class="wrap pj">
    <!-- 首屏：是什么 / 我做了什么 / 结果 -->
    <header class="pj__head">
      <h1>{{ project.name }}</h1>
      <p class="pj__lead">{{ project.summary }}</p>
      <ul class="pj__brief">
        <li v-for="b in project.brief" :key="b">{{ b }}</li>
      </ul>

      <div v-if="project.metrics" class="pj__stats">
        <div v-for="m in project.metrics" :key="m.label" class="pj__stat">
          <strong>{{ m.value }}</strong>
          <span>{{ m.label }}</span>
        </div>
      </div>

      <div v-if="project.actions" class="pj__actions">
        <a v-if="project.actions.primary" :href="project.actions.primary.href" target="_blank" rel="noopener" class="btn btn--primary">{{ project.actions.primary.label }} ↗</a>
        <a v-for="l in project.actions.links || []" :key="l.href" :href="l.href" target="_blank" rel="noopener" class="btn">{{ l.label }} ↗</a>
        <p v-if="project.actions.note" class="pj__note">{{ project.actions.note }}</p>
      </div>
    </header>

    <!-- 截图：一大两小 -->
    <div v-if="project.shots?.length" class="shots">
      <button v-for="(s, si) in project.shots" :key="s.src" type="button" class="shots__item" :class="{ 'shots__item--main': si === 0 }" @click="zoomed = si">
        <span class="shots__img"><img :src="s.src" :alt="s.caption" :loading="si ? 'lazy' : 'eager'" :style="s.pos ? { objectPosition: s.pos } : null" /></span>
        <span class="shots__cap">{{ s.caption }}</span>
      </button>
    </div>
    <p v-if="project.shotsNote" class="shots__note">{{ project.shotsNote }}</p>

    <!-- 正文：左标题、右内容 -->
    <section v-for="(s, si) in project.sections" :key="si" class="sec2">
      <h2 class="sec2__title">{{ s.title }}</h2>
      <div class="sec2__body">
        <p v-for="(para, i) in s.body || []" :key="i" v-html="rich(para)"></p>
        <dl v-if="s.items" class="kv">
          <template v-for="it in s.items" :key="it.k">
            <dt>{{ it.k }}</dt>
            <dd v-html="rich(it.v)"></dd>
          </template>
        </dl>
        <div v-if="s.metrics" class="pj__stats pj__stats--inline">
          <div v-for="m in s.metrics" :key="m.label" class="pj__stat">
            <strong>{{ m.value }}</strong>
            <span>{{ m.label }}</span>
          </div>
        </div>
        <LoreNookArch v-if="s.chart === 'lorenook-arch'" />
        <AnimaArch v-if="s.chart === 'anima-arch'" />
        <AnimaPhases v-if="s.chart === 'anima-phases'" />
        <AnimaDayChart v-if="s.chart === 'anima-day'" />
        <AnimaBehaviorChart v-if="s.chart === 'anima-behaviors'" />
        <figure v-if="s.figure" class="fig">
          <img :src="s.figure.src" :alt="s.figure.caption" loading="lazy" />
          <figcaption>{{ s.figure.caption }}</figcaption>
        </figure>
        <p v-if="s.link" class="sec2__link"><a :href="s.link.href" target="_blank" rel="noopener">{{ s.link.label }} ↗</a></p>
      </div>
    </section>

    <section class="sec2">
      <h2 class="sec2__title">技术栈</h2>
      <div class="sec2__body">
        <ul class="stack">
          <li v-for="t in project.stack" :key="t">{{ t }}</li>
        </ul>
      </div>
    </section>

    <!-- 其他项目：首页同款小卡 -->
    <section class="others">
      <h2>其他项目</h2>
      <div class="others__grid">
        <RouterLink v-for="o in others" :key="o.id" :to="`/projects/${o.id}`" class="ocard">
          <span class="ocard__cover">
            <CoverDmpc v-if="o.home?.art === 'dmpc'" />
            <CoverAnima v-else-if="o.home?.art === 'anima'" />
            <img v-else :src="o.home?.cover || o.shots?.[0]?.src" :alt="o.name" loading="lazy" />
          </span>
          <span class="ocard__body">
            <strong>{{ o.name }}</strong>
            <span>{{ o.type }} · {{ o.period }}</span>
          </span>
        </RouterLink>
      </div>
    </section>

    <nav class="float-nav" aria-label="页面导航">
      <button type="button" class="float-btn" :class="{ 'is-hidden': !scrolled }" :tabindex="scrolled ? 0 : -1" aria-label="回到顶部" @click="toTop">
        <span aria-hidden="true">↑</span><span class="float-btn__t">顶部</span>
      </button>
      <RouterLink to="/" class="float-btn" aria-label="回到首页">
        <span aria-hidden="true">⌂</span><span class="float-btn__t">首页</span>
      </RouterLink>
    </nav>
    <Lightbox v-if="zoomed !== null" v-model:index="zoomed" :items="project.shots" :title="project.name" @close="zoomed = null" />
  </article>
  <div v-else class="wrap"><p>没有这个项目。</p><RouterLink to="/">返回首页</RouterLink></div>
</template>

<style scoped>
.pj { padding-top: 64px; }

/* 首屏 */
.pj__head h1 { font-size: 40px; letter-spacing: .02em; margin: 0 0 14px; }
.pj__lead { font-size: 17px; color: var(--muted); max-width: 680px; margin: 0 0 18px; line-height: 1.75; }
.pj__brief { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; row-gap: 4px; font-size: 14.5px; }
.pj__brief li { display: inline-flex; align-items: center; }
.pj__brief li + li::before { content: ''; width: 1px; height: 12px; background: var(--line-strong); margin: 0 14px; }
.pj__brief li:first-child { font-weight: 600; }

.pj__stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 0 32px; margin: 32px 0 0; }
.pj__stat { display: flex; flex-direction: column; gap: 6px; padding: 16px 0 0; border-top: 1px solid var(--text); }
.pj__stat strong { font-family: var(--num); font-size: 34px; font-weight: 600; line-height: 1; letter-spacing: -.01em; }
.pj__stat span { font-size: 13px; color: var(--muted); line-height: 1.5; }
.pj__stats--inline { margin: 18px 0 22px; gap: 0 24px; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); }
.pj__stats--inline .pj__stat { border-top-color: var(--line-strong); }
.pj__stats--inline .pj__stat strong { font-size: 26px; }

.pj__actions { display: flex; flex-wrap: wrap; align-items: center; gap: 10px 12px; margin-top: 32px; }
.btn { display: inline-flex; align-items: center; height: 38px; padding: 0 16px; border-radius: 8px; font-size: 14px; color: var(--text); border: 1px solid var(--line-strong); background: var(--surface); transition: border-color .2s, color .2s, transform .2s; }
.btn:hover { text-decoration: none; border-color: var(--accent); color: var(--accent); }
.btn--primary { background: var(--text); color: #fff; border-color: var(--text); }
.btn--primary:hover { background: var(--accent); border-color: var(--accent); color: #fff; }
.pj__note { flex-basis: 100%; margin: 2px 0 0; font-size: 13px; color: var(--faint); }

/* 截图 */
.shots { display: grid; grid-template-columns: 2fr 1fr; grid-template-rows: 1fr 1fr; gap: 14px; margin-top: 48px; }
.shots__item { display: flex; flex-direction: column; min-height: 0; padding: 0; border: 1px solid var(--line); border-radius: 12px; overflow: hidden; background: var(--surface); cursor: zoom-in; font: inherit; text-align: left; transition: border-color .2s, box-shadow .25s; }
.shots__item:hover { border-color: var(--line-strong); box-shadow: 0 12px 30px -18px rgba(28, 27, 25, .35); }
.shots__item--main { grid-row: 1 / 3; }
.shots__img { flex: 1; min-height: 0; overflow: hidden; background: #f1efe9; }
.shots__item--main .shots__img { aspect-ratio: 16 / 9; }
.shots__img img { display: block; width: 100%; height: 100%; object-fit: cover; object-position: top left; transition: transform .5s ease; }
.shots__item:hover img { transform: scale(1.015); }
.shots__cap { display: block; font-size: 12.5px; color: var(--muted); padding: 8px 12px; border-top: 1px solid var(--line); }
.shots__note { font-size: 13px; color: var(--faint); margin: 10px 0 0; }

/* 正文两栏 */
.sec2 { display: grid; grid-template-columns: 180px minmax(0, 1fr); gap: 32px; margin-top: 64px; padding-top: 22px; border-top: 1px solid var(--line); }
.sec2__title { position: sticky; top: 76px; align-self: start; margin: 0; font-size: 17px; font-weight: 650; letter-spacing: .04em; }
.sec2__body > p { margin: 0 0 12px; max-width: 680px; font-size: 15.5px; line-height: 1.85; }
.sec2__body :deep(strong) { font-weight: 650; color: var(--text); }
.sec2__link { margin-top: 12px; font-size: 14px; }

.kv { display: grid; grid-template-columns: 64px minmax(0, 1fr); margin: 0; max-width: 720px; }
.kv dt { font-size: 13px; color: var(--faint); padding: 13px 0; border-bottom: 1px solid var(--line); letter-spacing: .06em; }
.kv dd { margin: 0; padding: 11px 0; border-bottom: 1px solid var(--line); font-size: 15px; line-height: 1.75; color: var(--muted); }
.kv dt:first-of-type, .kv dd:first-of-type { padding-top: 2px; }

.fig { margin: 18px 0 0; background: var(--surface); border: 1px solid var(--line); border-radius: 12px; padding: 14px; }
.fig img { width: 100%; height: auto; max-height: 520px; object-fit: contain; display: block; }
.fig figcaption { font-size: 13px; color: var(--muted); margin-top: 8px; }
.sec2__body > :deep(figure) + :deep(figure), .sec2__body > :deep(figure) + .fig { margin-top: 16px; }

.stack { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 8px; }
.stack li { font-size: 13px; padding: 3px 11px; border-radius: 6px; border: 1px solid var(--line-strong); color: var(--muted); }

/* 其他项目 */
.others { margin-top: 88px; padding-top: 26px; border-top: 1px solid var(--text); }
.others h2 { margin: 0 0 20px; font-size: 18px; font-weight: 650; letter-spacing: .04em; }
.others__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.ocard { display: flex; flex-direction: column; background: var(--surface); border: 1px solid var(--line); border-radius: 12px; overflow: hidden; color: inherit; transition: transform .25s ease, box-shadow .25s ease, border-color .25s; }
.ocard:hover { text-decoration: none; transform: translateY(-3px); border-color: var(--line-strong); box-shadow: 0 14px 30px -18px rgba(28, 27, 25, .3); }
.ocard__cover { display: block; aspect-ratio: 2 / 1; background: #f1efe9; border-bottom: 1px solid var(--line); overflow: hidden; padding: 0; }
.ocard__cover img { display: block; width: 100%; height: 100%; object-fit: cover; object-position: top left; filter: saturate(.45) contrast(.94); opacity: .82; transition: filter .4s, opacity .4s; }
.ocard:hover .ocard__cover img { filter: none; opacity: 1; }
.ocard__cover :deep(svg) { padding: 4px 6px; }
.ocard__body { display: flex; flex-direction: column; gap: 2px; padding: 14px 16px 16px; }
.ocard__body strong { font-size: 15.5px; }
.ocard__body span { font-size: 12.5px; color: var(--faint); }

@media (max-width: 820px) {
  .sec2 { grid-template-columns: minmax(0, 1fr); gap: 12px; margin-top: 48px; }
  .sec2__title { position: static; }
  .others__grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 640px) {
  .pj { padding-top: 36px; }
  .pj__head h1 { font-size: 30px; }
  .pj__lead { font-size: 15.5px; }
  .pj__brief li + li::before { display: none; }
  .pj__brief { column-gap: 14px; font-size: 14px; }
  .pj__stats { grid-template-columns: 1fr 1fr; gap: 20px 18px; margin-top: 24px; }
  .pj__stat strong { font-size: 26px; }
  .shots { grid-template-columns: 1fr; grid-template-rows: none; }
  .shots__item--main { grid-row: auto; }
  .shots__item:not(.shots__item--main) .shots__img { aspect-ratio: 16 / 9; }
  .kv { grid-template-columns: 52px minmax(0, 1fr); }
  .others__grid { grid-template-columns: 1fr; }
}
</style>
