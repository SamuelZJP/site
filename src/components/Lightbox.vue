<script setup>
// 通用图片查看器：点图片以外的任何地方关闭；右上角关闭按钮；左右两侧大点击区切换；Esc / ← / → 键盘操作。
import { computed, onBeforeUnmount, onMounted } from 'vue'

const props = defineProps({
  items: { type: Array, required: true }, // [{ src, caption }]
  index: { type: Number, default: 0 },
  title: { type: String, default: '' },
})
const emit = defineEmits(['close', 'update:index'])

const many = computed(() => props.items.length > 1)
const current = computed(() => props.items[props.index] ?? props.items[0])
const go = (d) => {
  const n = props.items.length
  emit('update:index', (props.index + d + n) % n)
}
const onKey = (e) => {
  if (e.key === 'Escape') emit('close')
  else if (many.value && e.key === 'ArrowRight') go(1)
  else if (many.value && e.key === 'ArrowLeft') go(-1)
}
onMounted(() => { window.addEventListener('keydown', onKey); document.body.style.overflow = 'hidden' })
onBeforeUnmount(() => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' })
</script>

<template>
  <div class="lb" role="dialog" aria-modal="true" :aria-label="title || current.caption" @click="emit('close')">
    <button type="button" class="lb__close" aria-label="关闭" @click.stop="emit('close')">
      <span aria-hidden="true">✕</span><span class="lb__close-t">关闭</span>
    </button>

    <button v-if="many" type="button" class="lb__nav lb__nav--prev" aria-label="上一张" @click.stop="go(-1)">
      <span aria-hidden="true">‹</span>
    </button>
    <button v-if="many" type="button" class="lb__nav lb__nav--next" aria-label="下一张" @click.stop="go(1)">
      <span aria-hidden="true">›</span>
    </button>

    <div class="lb__stage">
      <img :key="current.src" :src="current.src" :alt="current.caption" class="lb__img" @click.stop />
      <p class="lb__cap" @click.stop>
        <span>{{ title ? `${title} · ` : '' }}{{ current.caption }}</span>
        <span v-if="many" class="lb__count">{{ index + 1 }} / {{ items.length }}</span>
      </p>
    </div>
  </div>
</template>

<style scoped>
.lb { position: fixed; inset: 0; z-index: 80; background: rgba(18, 21, 25, .88); display: flex; align-items: center; justify-content: center; padding: 64px 96px 24px; cursor: zoom-out; }
/* 舞台本身不拦截点击：图片和说明以外的区域点击都会落到背景上关闭 */
.lb__stage { pointer-events: none; display: flex; flex-direction: column; align-items: center; max-width: 100%; max-height: 100%; }
.lb__img, .lb__cap { pointer-events: auto; cursor: default; }
.lb__img { display: block; max-width: min(1200px, 100%); max-height: calc(100vh - 140px); object-fit: contain; border-radius: 6px; background: #fff; box-shadow: 0 12px 48px rgba(0, 0, 0, .4); }
.lb__cap { margin: 12px 0 0; display: flex; gap: 14px; align-items: baseline; color: #e3e7ea; font-size: 14px; text-align: center; }
.lb__count { color: #9aa3ad; font-variant-numeric: tabular-nums; }

.lb__close { position: fixed; top: 14px; right: 16px; display: inline-flex; align-items: center; gap: 6px; height: 40px; padding: 0 16px; font: inherit; font-size: 14px; color: #fff; background: rgba(255, 255, 255, .14); border: 0; border-radius: 999px; cursor: pointer; }
.lb__close span:first-child { font-size: 16px; }
.lb__close:hover { background: rgba(255, 255, 255, .26); }

.lb__nav { position: fixed; top: 64px; bottom: 24px; width: 84px; display: flex; align-items: center; justify-content: center; border: 0; background: transparent; color: #fff; cursor: pointer; }
.lb__nav span { width: 56px; height: 56px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 34px; line-height: 1; background: rgba(255, 255, 255, .14); transition: background .15s; }
.lb__nav:hover span { background: rgba(255, 255, 255, .3); }
.lb__nav--prev { left: 0; }
.lb__nav--next { right: 0; }

@media (max-width: 640px) {
  .lb { padding: 60px 8px 16px; }
  .lb__nav { top: auto; bottom: 16px; height: 64px; width: 50%; }
  .lb__nav span { width: 48px; height: 48px; font-size: 28px; background: rgba(255, 255, 255, .2); }
  .lb__img { max-height: calc(100vh - 200px); }
  .lb__stage { margin-bottom: 64px; }
}
</style>
