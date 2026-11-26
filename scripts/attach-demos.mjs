// 把可交互的前端演示（各自仓库的构建产物）复制到 dist/demos/ 下。citybrain 只放截图，不上线演示
import { cpSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

// 默认按本机目录结构查找；在别处构建时用环境变量指定，例如
//   SMARTHOME_DEMO_DIST=/path/to/smarthome-frontend/dist npm run build
const projects = resolve(import.meta.dirname, '../../../..')
const demos = {
  smarthome: process.env.SMARTHOME_DEMO_DIST || `${projects}/SmartHomeEnvControl/smarthome-frontend/dist`,
}

for (const [name, from] of Object.entries(demos)) {
  if (!existsSync(from)) {
    console.error(`缺少 ${name} 的构建产物：${from}（先在该仓库 showcase 分支上构建，或用 SMARTHOME_DEMO_DIST 指定）`)
    process.exit(1)
  }
  cpSync(from, resolve(import.meta.dirname, `../dist/demos/${name}`), { recursive: true })
  console.log(`demos/${name} ← ${from}`)
}
