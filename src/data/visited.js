// 记录访客在本浏览器里看过哪些项目（只存在 localStorage，不上传）
import { ref } from 'vue'

const KEY = 'portfolio-visited'
const read = () => {
  try { return new Set(JSON.parse(localStorage.getItem(KEY) || '[]')) } catch { return new Set() }
}
export const visited = ref(read())

export function markVisited(id) {
  if (visited.value.has(id)) return
  const next = new Set(visited.value)
  next.add(id)
  visited.value = next
  try { localStorage.setItem(KEY, JSON.stringify([...next])) } catch {}
}

// 其他标签页里看过的项目，同步到本标签页（首页的「已看过」会即时更新）
window.addEventListener('storage', (e) => { if (e.key === KEY) visited.value = read() })
