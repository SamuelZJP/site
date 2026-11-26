<script setup>
// LoreNook 架构图：浏览器 → 后端（两套核心机制只点名）→ 外部模型与生图服务；底部是部署。
// 机制只点名，不画内部流程。
const chips = ['SSE 流式输出', '预设 · QuickJS 沙箱', '账号与数据隔离']
</script>

<template>
  <figure class="arch">
    <svg class="wide" viewBox="0 0 920 400" role="img" aria-label="LoreNook 架构：浏览器中的 Vue 3 前端通过 HTTP 与 SSE 连接 FastAPI 后端；后端以分层记忆和状态变量为核心，数据存于 SQLite；外部连接大模型 API 与 ComfyUI 生图服务；部署使用 Caddy 与 Systemd。">
      <defs>
        <marker id="ln-ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" class="ah" />
        </marker>
      </defs>

      <!-- 浏览器 -->
      <rect x="16" y="118" width="150" height="84" rx="12" class="world" />
      <text x="91" y="152" class="h2" text-anchor="middle">浏览器</text>
      <text x="91" y="172" class="sub" text-anchor="middle">Vue 3 单页应用</text>

      <!-- 后端 -->
      <rect x="220" y="24" width="480" height="300" rx="18" class="core" />
      <text x="244" y="56" class="h">后端 · FastAPI</text>
      <text x="370" y="56" class="sub">Python 3.12</text>

      <rect x="244" y="76" width="208" height="100" rx="12" class="card card--key" />
      <text x="264" y="110" class="h2 key">分层记忆</text>
      <text x="264" y="132" class="sub">负责「发生过什么」</text>
      <text x="264" y="154" class="note">长对话不失忆</text>

      <rect x="468" y="76" width="208" height="100" rx="12" class="card card--key" />
      <text x="488" y="110" class="h2 key">状态变量</text>
      <text x="488" y="132" class="sub">负责「他此刻是什么样」</text>
      <text x="488" y="154" class="note">角色前后一致</text>

      <g v-for="(t, i) in chips" :key="t">
        <rect :x="244 + i * 148" y="196" width="136" height="30" rx="15" class="chip" />
        <text :x="312 + i * 148" y="216" class="chip-t" text-anchor="middle">{{ t }}</text>
      </g>

      <rect x="244" y="248" width="432" height="52" rx="10" class="store" />
      <text x="460" y="279" class="chip-t" text-anchor="middle">SQLite · SQLAlchemy 2.0 · Alembic 迁移</text>

      <!-- 外部服务 -->
      <rect x="760" y="76" width="144" height="58" rx="12" class="world" />
      <text x="832" y="102" class="h2" text-anchor="middle">大模型 API</text>
      <text x="832" y="120" class="sub" text-anchor="middle">文本生成</text>
      <rect x="760" y="160" width="144" height="58" rx="12" class="world" />
      <text x="832" y="186" class="h2" text-anchor="middle">ComfyUI</text>
      <text x="832" y="204" class="sub" text-anchor="middle">插图生成 · GPU</text>

      <!-- 连线 -->
      <line x1="166" y1="150" x2="218" y2="150" class="flow" marker-end="url(#ln-ar)" />
      <text x="192" y="142" class="lbl" text-anchor="middle">HTTP</text>
      <line x1="218" y1="172" x2="168" y2="172" class="flow flow--in" marker-end="url(#ln-ar)" />
      <text x="192" y="190" class="lbl" text-anchor="middle">SSE</text>
      <line x1="700" y1="105" x2="758" y2="105" class="flow" marker-end="url(#ln-ar)" />
      <line x1="700" y1="189" x2="758" y2="189" class="flow" marker-end="url(#ln-ar)" />

      <!-- 部署 -->
      <rect x="16" y="344" width="888" height="40" rx="10" class="deploy" />
      <text x="40" y="369" class="h3">部署</text>
      <text x="460" y="369" class="sub" text-anchor="middle">Caddy 反向代理 · Systemd 守护 · 定时数据库备份 · 已备案服务器</text>
    </svg>

    <!-- 手机：竖版，自上而下 -->
    <svg class="tall" viewBox="0 0 360 660" role="img" aria-label="LoreNook 架构（竖版）">
      <defs>
        <marker id="ln-ar-m" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" class="ah" />
        </marker>
      </defs>
      <rect x="80" y="10" width="200" height="56" rx="12" class="world" />
      <text x="180" y="34" class="h2" text-anchor="middle">浏览器</text>
      <text x="180" y="54" class="sub" text-anchor="middle">Vue 3 单页应用</text>

      <line x1="160" y1="68" x2="160" y2="108" class="flow" marker-end="url(#ln-ar-m)" />
      <text x="150" y="93" class="lbl" text-anchor="end">HTTP</text>
      <line x1="200" y1="108" x2="200" y2="70" class="flow flow--in" marker-end="url(#ln-ar-m)" />
      <text x="210" y="93" class="lbl">SSE</text>

      <rect x="10" y="112" width="340" height="350" rx="16" class="core" />
      <text x="26" y="142" class="h">后端 · FastAPI</text>
      <text x="166" y="142" class="sub">Python 3.12</text>

      <rect x="26" y="158" width="150" height="96" rx="12" class="card card--key" />
      <text x="40" y="186" class="h2 key">分层记忆</text>
      <text x="40" y="208" class="sub">发生过什么</text>
      <text x="40" y="232" class="note">长对话不失忆</text>
      <rect x="184" y="158" width="150" height="96" rx="12" class="card card--key" />
      <text x="198" y="186" class="h2 key">状态变量</text>
      <text x="198" y="208" class="sub">他此刻是什么样</text>
      <text x="198" y="232" class="note">角色前后一致</text>

      <g v-for="(t, i) in chips" :key="'m' + t">
        <rect x="26" :y="270 + i * 38" width="308" height="30" rx="15" class="chip" />
        <text x="180" :y="290 + i * 38" class="chip-t" text-anchor="middle">{{ t }}</text>
      </g>
      <rect x="26" y="392" width="308" height="52" rx="10" class="store" />
      <text x="180" y="423" class="chip-t" text-anchor="middle">SQLite · SQLAlchemy 2.0 · Alembic</text>

      <line x1="90" y1="462" x2="90" y2="498" class="flow" marker-end="url(#ln-ar-m)" />
      <line x1="270" y1="462" x2="270" y2="498" class="flow" marker-end="url(#ln-ar-m)" />
      <rect x="10" y="502" width="160" height="62" rx="12" class="world" />
      <text x="90" y="530" class="h2" text-anchor="middle">大模型 API</text>
      <text x="90" y="550" class="sub" text-anchor="middle">文本生成</text>
      <rect x="190" y="502" width="160" height="62" rx="12" class="world" />
      <text x="270" y="530" class="h2" text-anchor="middle">ComfyUI</text>
      <text x="270" y="550" class="sub" text-anchor="middle">插图生成 · GPU</text>

      <rect x="10" y="584" width="340" height="66" rx="10" class="deploy" />
      <text x="26" y="612" class="h3">部署</text>
      <text x="76" y="612" class="sub">Caddy 反向代理 · Systemd 守护</text>
      <text x="76" y="634" class="sub">定时数据库备份 · 已备案服务器</text>
    </svg>
    <figcaption>两套核心机制只在这里点名：分层记忆管「发生过什么」，状态变量管「他此刻是什么样」。</figcaption>
  </figure>
</template>

<style scoped>
.arch { margin: 0; background: var(--surface); border: 1px solid var(--line); border-radius: 12px; padding: 18px 18px 14px; }
svg { width: 100%; height: auto; display: block; font-family: inherit; }
.core { fill: #f3f5fb; stroke: #dbe1f0; }
.card { fill: #ffffff; stroke: #e1e6ee; }
.card--key { stroke: #b9c4ea; }
.world { fill: #ffffff; stroke: var(--line-strong); }
.store { fill: #ffffff; stroke: #e1e6ee; stroke-dasharray: 4 3; }
.deploy { fill: #f6f5f1; stroke: var(--line); }
.h { font-size: 17px; font-weight: 700; fill: var(--text); }
.h2 { font-size: 15px; font-weight: 700; fill: var(--text); }
.h3 { font-size: 13px; font-weight: 600; fill: var(--text); }
.key { fill: var(--accent); }
.sub { font-size: 12px; fill: var(--muted); }
.note { font-size: 11.5px; fill: var(--faint); }
.chip { fill: #e9edf6; }
.chip-t { font-size: 12.5px; fill: #36414a; }
.flow { stroke: #8f99a3; stroke-width: 1.6; fill: none; }
.flow--in { stroke-dasharray: 4 3; }
.ah { fill: #8f99a3; }
.lbl { font-size: 11px; fill: var(--muted); }
figcaption { font-size: 13px; color: var(--muted); margin-top: 10px; }
.tall { display: none; }
@media (max-width: 640px) {
  .arch { padding: 12px 10px 10px; }
  .wide { display: none; }
  .tall { display: block; }
  .tall .h { font-size: 18px; }
  .tall .h2 { font-size: 16px; }
  .tall .h3 { font-size: 14px; }
  .tall .sub { font-size: 13px; }
  .tall .note { font-size: 12.5px; }
  .tall .chip-t { font-size: 13.5px; }
  .tall .lbl { font-size: 12px; }
  figcaption { font-size: 12.5px; padding: 0 4px; }
}
</style>
