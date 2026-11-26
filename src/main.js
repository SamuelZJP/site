import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import Home from './pages/Home.vue'
import Project from './pages/Project.vue'
import './style.css'

let homeY = null // 离开首页时的滚动位置

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/projects/:id', component: Project, props: true },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  // 浏览器前进/后退用浏览器记下的位置；从项目页回到首页时，回到离开首页时的位置
  scrollBehavior: (to, from, saved) => {
    if (saved) return saved
    if (to.path === '/' && homeY !== null) return { top: homeY }
    return { top: 0 }
  },
})

router.beforeEach((to, from) => {
  if (from.path === '/' && to.path !== '/') homeY = window.scrollY
})

createApp(App).use(router).mount('#app')
