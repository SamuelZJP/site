<script setup>
import { computed, ref } from 'vue'
import Lightbox from './Lightbox.vue'

const props = defineProps({ honors: Array, featured: { type: Number, default: 0 } })
const top = computed(() => props.honors.slice(0, props.featured))
const rest = computed(() => props.honors.slice(props.featured))
const open = ref(null) // 当前查看的荣誉
const index = ref(0)
const items = computed(() => (open.value?.certs ?? []).map((src, i, all) => ({ src, caption: all.length > 1 ? `证书 ${i + 1}` : '证书' })))
const show = (h) => { if (h.certs?.length) { open.value = h; index.value = 0 } }
</script>

<template>
  <div v-if="top.length" class="hl">
    <div v-for="h in top" :key="h.title" class="hl__item">
      <p class="hl__title">{{ h.title }}</p>
      <p class="hl__meta">{{ h.meta }}</p>
      <p class="hl__act">
        <button v-if="h.certs?.length" type="button" class="act" @click="show(h)">查看证书</button>
        <a v-else-if="h.link" class="act" :href="h.link.href" target="_blank" rel="noopener">{{ h.link.label }} ↗</a>
        <span v-else-if="h.note" class="note">{{ h.note }}</span>
      </p>
    </div>
  </div>

  <ul class="honor-list">
    <li v-for="h in rest" :key="h.title" class="honor">
      <span class="honor__body">
        <span class="honor__title">{{ h.title }}</span>
        <span class="honor__meta">{{ h.meta }}</span>
      </span>
      <button v-if="h.certs?.length" type="button" class="act" @click="show(h)">
        证书<template v-if="h.certs.length > 1"> ×{{ h.certs.length }}</template>
      </button>
      <a v-else-if="h.link" class="act" :href="h.link.href" target="_blank" rel="noopener">{{ h.link.label }} ↗</a>
      <span v-else-if="h.note" class="note">{{ h.note }}</span>
    </li>
  </ul>

  <Lightbox v-if="open" v-model:index="index" :items="items" :title="open.title" @close="open = null" />
</template>

<style scoped>
.hl { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; border: 1px solid var(--line); border-radius: 14px; background: var(--surface); margin-bottom: 28px; overflow: hidden; }
.hl__item { display: flex; flex-direction: column; padding: 22px 22px 18px; }
.hl__item + .hl__item { border-left: 1px solid var(--line); }
.hl__item p { margin: 0; }
.hl__title { font-size: 16.5px; font-weight: 650; line-height: 1.45; }
.hl__meta { font-size: 12.5px; color: var(--muted); margin-top: 6px !important; flex: 1; }
.hl__act { margin-top: 14px !important; font-size: 13px; }

.honor-list { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: 1fr 1fr; column-gap: 40px; }
.honor { display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid var(--line); }
.honor__body { flex: 1; min-width: 0; display: flex; flex-direction: column; }
.honor__title { font-size: 14.5px; color: var(--text); }
.honor__meta { font-size: 12.5px; color: var(--faint); }

.act { flex: none; font: inherit; font-size: 13px; color: var(--accent); background: none; border: 0; padding: 0; cursor: pointer; text-decoration: none; }
.act:hover { text-decoration: underline; text-underline-offset: 3px; }
.note { flex: none; font-size: 13px; color: var(--faint); }

@media (max-width: 820px) {
  .hl { grid-template-columns: 1fr 1fr; }
  .hl__item:nth-child(3) { border-left: 0; }
  .hl__item:nth-child(n + 3) { border-top: 1px solid var(--line); }
}
@media (max-width: 640px) { .honor-list { grid-template-columns: 1fr; } }
</style>
