<script setup>
import { nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { profile } from './data/profile.js'
const year = new Date().getFullYear()
const router = useRouter()
const route = useRoute()
const anchors = [{ id: 'projects', label: '项目' }, { id: 'experience', label: '经历' }, { id: 'honors', label: '荣誉' }]
// 哈希路由下不能用 #锚点，改为先回首页再滚动
async function goTo(id) {
  const fromOther = route.path !== '/'
  if (fromOther) {
    await router.push('/')
    await nextTick()
    await new Promise((r) => setTimeout(r, 30)) // 等路由自己的「回到顶部」执行完
  }
  const el = document.getElementById(id)
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: fromOther ? 'auto' : 'smooth' })
}
</script>

<template>
  <header class="topbar">
    <div class="wrap topbar__inner">
      <div class="topbar__left">
        <RouterLink to="/" class="brand">{{ profile.name }}<span v-if="route.path === '/'" class="brand__sub">· 作品集</span></RouterLink>
        <RouterLink v-if="route.path !== '/'" to="/" class="home-link"><i aria-hidden="true">←</i>回到首页</RouterLink>
      </div>
      <nav>
        <button v-for="a in anchors" :key="a.id" type="button" class="nav-anchor" @click="goTo(a.id)">{{ a.label }}</button>
        <a v-for="l in profile.links" :key="l.href" :href="l.href" target="_blank" rel="noopener">{{ l.label }}</a>
        <a v-if="profile.resumePdf" :href="profile.resumePdf" target="_blank" rel="noopener">简历 PDF</a>
      </nav>
    </div>
  </header>
  <main>
    <RouterView />
  </main>
  <footer class="footer">
    <div class="wrap">
      <span>© {{ year }} {{ profile.name }}</span>
      <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener">浙ICP备2024110503号-1</a>
    </div>
  </footer>
</template>
