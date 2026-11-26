# 项目作品集网站

周嘉鹏的个人项目作品集：首页 + 四个项目案例页。纯静态站点，Vite + Vue 3 构建。

## 目录

```
src/
  data/profile.js     全站文案与数据（个人信息、经历时间线、项目、荣誉）
  data/anima-r7.js    dsh-anima 真机测试的数据摘录
  pages/              Home.vue 首页，Project.vue 项目页
  components/         架构图、封面图、时间线、图表、灯箱
public/img/           截图、论文图、证书
scripts/attach-demos.mjs  构建后把可交互演示复制到 dist/demos/
```

改文案只需要动 `src/data/profile.js`。

## 本地开发

```bash
npm ci
npm run dev        # http://localhost:5175
```

## 构建

D-MPC 项目页的「打开前端演示」指向 `/demos/smarthome/`，它来自另一个仓库（SmartHomeEnvControl 的 `showcase` 分支）的前端构建产物。先构建它：

```bash
cd ../SmartHomeEnvControl/smarthome-frontend && npx vite build
```

再构建本站，脚本会把演示复制到 `dist/demos/smarthome/`：

```bash
npm run build
```

演示不在默认位置时，用环境变量指定：

```bash
SMARTHOME_DEMO_DIST=/path/to/smarthome-frontend/dist npm run build
```

找不到演示产物时构建会报错退出，避免上线一个打不开的演示链接。

本地预览构建结果：

```bash
npm run preview    # http://localhost:4175
```

## 部署

产物是 `dist/` 下的纯静态文件，路由使用 hash 模式，不需要服务端改写规则。Caddy 示例：

```
portfolio.cryingstray.cn {
    root * /srv/portfolio
    file_server
    encode gzip
    @demos path /demos/*
    header @demos X-Robots-Tag "noindex, nofollow"
}
```

把 `dist/` 同步到服务器：

```bash
rsync -av --delete dist/ user@server:/srv/portfolio/
```
