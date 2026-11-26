<script setup>
// 架构图：人格（生理 + 意志 + 记忆）在左，护栏是唯一的边界，世界在右。
const physiology = ['心跳', '困倦', '精力', '情绪消退', '睡眠巩固', '遗忘']
const will = ['说话', '等待', '戳一戳', '看群聊', '记住', '去睡']
</script>

<template>
  <figure class="arch">
    <svg class="wide" viewBox="0 0 920 440" role="img" aria-label="Anima 架构：规则只存在于外部护栏；她的行为出去、消息进来都要经过护栏；心跳等生理过程在她体内运转，护栏碰不到。">
      <defs>
        <marker id="ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" class="ah" />
        </marker>
        <marker id="ar-warm" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" class="ah-warm" />
        </marker>
      </defs>

      <!-- 人格 -->
      <rect x="16" y="28" width="520" height="384" rx="18" class="persona" />
      <text x="40" y="60" class="h">她 · 人格</text>
      <text x="124" y="60" class="sub">插件内部只允许两种东西</text>

      <!-- 生理 -->
      <rect x="40" y="80" width="206" height="196" rx="12" class="card" />
      <text x="60" y="108" class="h2">生理</text>
      <text x="60" y="126" class="sub">身体自己运转，谁也控制不了</text>
      <g v-for="(t, i) in physiology" :key="t">
        <rect :x="60 + (i % 2) * 88" :y="142 + Math.floor(i / 2) * 40" width="80" height="28" rx="14" class="chip" :class="{ 'chip--key': t === '心跳' }" />
        <text :x="100 + (i % 2) * 88" :y="161 + Math.floor(i / 2) * 40" class="chip-t" :class="{ 'chip-t--key': t === '心跳' }" text-anchor="middle">{{ t }}</text>
      </g>

      <!-- 意志 -->
      <rect x="306" y="80" width="206" height="196" rx="12" class="card" />
      <text x="326" y="108" class="h2">意志</text>
      <text x="326" y="126" class="sub">她选择做的事</text>
      <g v-for="(t, i) in will" :key="t">
        <rect :x="326 + (i % 2) * 88" :y="142 + Math.floor(i / 2) * 40" width="80" height="28" rx="14" class="chip" />
        <text :x="366 + (i % 2) * 88" :y="161 + Math.floor(i / 2) * 40" class="chip-t" text-anchor="middle">{{ t }}</text>
      </g>

      <!-- 心跳唤醒意志 -->
      <line x1="246" y1="156" x2="304" y2="156" class="flow-key" marker-end="url(#ar-warm)" />
      <text x="275" y="146" class="lbl-key" text-anchor="middle">唤醒</text>

      <!-- 记忆 -->
      <rect x="40" y="296" width="472" height="92" rx="12" class="card" />
      <text x="60" y="324" class="h2">记忆</text>
      <text x="60" y="342" class="sub">带来源的长期记忆</text>
      <g v-for="(t, i) in ['想起来', '睡眠中巩固', '慢慢遗忘']" :key="t">
        <rect :x="224 + i * 96" :y="322" width="88" height="28" rx="14" class="chip" />
        <text :x="268 + i * 96" :y="341" class="chip-t" text-anchor="middle">{{ t }}</text>
      </g>
      <line x1="143" y1="276" x2="143" y2="294" class="flow" marker-end="url(#ar)" />
      <line x1="409" y1="294" x2="409" y2="278" class="flow" marker-end="url(#ar)" />

      <!-- 护栏 -->
      <rect x="584" y="28" width="128" height="384" rx="18" class="guard" />
      <text x="648" y="60" class="h h--warm" text-anchor="middle">护栏</text>
      <text x="648" y="78" class="sub" text-anchor="middle">规则只在这里</text>
      <g v-for="(t, i) in ['白名单', '审批', 'token 预算', '暂停']" :key="t">
        <rect x="602" :y="200 + i * 40" width="92" height="28" rx="14" class="chip chip--guard" />
        <text x="648" :y="219 + i * 40" class="chip-t" text-anchor="middle">{{ t }}</text>
      </g>

      <!-- 世界 -->
      <rect x="760" y="92" width="144" height="58" rx="12" class="world" />
      <text x="832" y="118" class="h2" text-anchor="middle">QQ</text>
      <text x="832" y="136" class="sub" text-anchor="middle">私聊 · 群聊</text>
      <rect x="760" y="166" width="144" height="58" rx="12" class="world" />
      <text x="832" y="192" class="h2" text-anchor="middle">B 站</text>
      <text x="832" y="210" class="sub" text-anchor="middle">只读浏览</text>
      <rect x="760" y="330" width="144" height="58" rx="12" class="world" />
      <text x="832" y="356" class="h2" text-anchor="middle">主人</text>
      <text x="832" y="374" class="sub" text-anchor="middle">Web 管理面板</text>

      <!-- 出去的行为 -->
      <line x1="512" y1="112" x2="582" y2="112" class="flow" marker-end="url(#ar)" />
      <text x="547" y="104" class="lbl" text-anchor="middle">行为</text>
      <line x1="712" y1="112" x2="758" y2="112" class="flow" marker-end="url(#ar)" />
      <text x="735" y="104" class="lbl" text-anchor="middle">放行</text>
      <line x1="712" y1="186" x2="758" y2="186" class="flow" marker-end="url(#ar)" />
      <text x="735" y="178" class="lbl" text-anchor="middle">浏览</text>
      <!-- 进来的消息 -->
      <line x1="758" y1="134" x2="714" y2="134" class="flow flow--in" marker-end="url(#ar)" />
      <line x1="582" y1="134" x2="514" y2="134" class="flow flow--in" marker-end="url(#ar)" />
      <text x="547" y="152" class="lbl" text-anchor="middle">消息</text>
      <!-- 主人调规则 -->
      <line x1="758" y1="359" x2="714" y2="359" class="flow" marker-end="url(#ar)" />
      <text x="736" y="351" class="lbl" text-anchor="middle">调规则</text>
    </svg>

    <!-- 手机：竖版。世界在上，护栏居中，人格在下 -->
    <svg class="tall" viewBox="0 0 360 770" role="img" aria-label="Anima 架构（竖版）：世界与她之间只隔着护栏">
      <defs>
        <marker id="ar-m" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" class="ah" />
        </marker>
        <marker id="ar-warm-m" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" class="ah-warm" />
        </marker>
      </defs>

      <!-- 世界 -->
      <g v-for="(w, i) in [['QQ', '私聊 · 群聊'], ['B 站', '只读浏览'], ['主人', 'Web 管理面板']]" :key="w[0]">
        <rect :x="10 + i * 118" y="10" width="104" height="56" rx="12" class="world" />
        <text :x="62 + i * 118" y="34" class="h2" text-anchor="middle">{{ w[0] }}</text>
        <text :x="62 + i * 118" y="54" class="sub" text-anchor="middle">{{ w[1] }}</text>
      </g>
      <line x1="48" y1="98" x2="48" y2="69" class="flow" marker-end="url(#ar-m)" />
      <text x="42" y="88" class="lbl" text-anchor="end">放行</text>
      <line x1="76" y1="69" x2="76" y2="98" class="flow flow--in" marker-end="url(#ar-m)" />
      <text x="82" y="88" class="lbl">消息</text>
      <line x1="180" y1="98" x2="180" y2="69" class="flow" marker-end="url(#ar-m)" />
      <text x="186" y="88" class="lbl">浏览</text>
      <line x1="298" y1="69" x2="298" y2="98" class="flow" marker-end="url(#ar-m)" />
      <text x="304" y="88" class="lbl">调规则</text>

      <!-- 护栏 -->
      <rect x="10" y="102" width="340" height="96" rx="16" class="guard" />
      <text x="26" y="138" class="h h--warm">护栏</text>
      <text x="26" y="160" class="sub">规则只在这里</text>
      <g v-for="(t, i) in ['白名单', '审批', 'token 预算', '暂停']" :key="'g' + t">
        <rect :x="150 + (i % 2) * 98" :y="118 + Math.floor(i / 2) * 36" width="90" height="28" rx="14" class="chip chip--guard" />
        <text :x="195 + (i % 2) * 98" :y="137 + Math.floor(i / 2) * 36" class="chip-t" text-anchor="middle">{{ t }}</text>
      </g>
      <line x1="150" y1="232" x2="150" y2="201" class="flow" marker-end="url(#ar-m)" />
      <text x="142" y="221" class="lbl" text-anchor="end">行为</text>
      <line x1="210" y1="201" x2="210" y2="232" class="flow flow--in" marker-end="url(#ar-m)" />
      <text x="218" y="221" class="lbl">消息</text>

      <!-- 人格 -->
      <rect x="10" y="236" width="340" height="524" rx="16" class="persona" />
      <text x="26" y="266" class="h">她 · 人格</text>
      <text x="112" y="266" class="sub">插件内部只允许两种东西</text>

      <rect x="26" y="282" width="296" height="134" rx="12" class="card" />
      <text x="42" y="308" class="h2">生理</text>
      <text x="86" y="308" class="sub">身体自己运转，谁也控制不了</text>
      <g v-for="(t, i) in physiology" :key="'p' + t">
        <rect :x="42 + (i % 3) * 92" :y="324 + Math.floor(i / 3) * 40" width="84" height="28" rx="14" class="chip" :class="{ 'chip--key': t === '心跳' }" />
        <text :x="84 + (i % 3) * 92" :y="343 + Math.floor(i / 3) * 40" class="chip-t" :class="{ 'chip-t--key': t === '心跳' }" text-anchor="middle">{{ t }}</text>
      </g>

      <line x1="84" y1="418" x2="84" y2="446" class="flow-key" marker-end="url(#ar-warm-m)" />
      <text x="94" y="437" class="lbl-key">唤醒</text>

      <rect x="26" y="450" width="296" height="134" rx="12" class="card" />
      <text x="42" y="476" class="h2">意志</text>
      <text x="86" y="476" class="sub">她选择做的事</text>
      <g v-for="(t, i) in will" :key="'w' + t">
        <rect :x="42 + (i % 3) * 92" :y="492 + Math.floor(i / 3) * 40" width="84" height="28" rx="14" class="chip" />
        <text :x="84 + (i % 3) * 92" :y="511 + Math.floor(i / 3) * 40" class="chip-t" text-anchor="middle">{{ t }}</text>
      </g>

      <!-- 生理 → 记忆（右侧通道），记忆 → 意志 -->
      <path d="M322,350 H338 V666 H324" class="flow" marker-end="url(#ar-m)" />
      <line x1="180" y1="616" x2="180" y2="587" class="flow" marker-end="url(#ar-m)" />

      <rect x="26" y="620" width="296" height="124" rx="12" class="card" />
      <text x="42" y="646" class="h2">记忆</text>
      <text x="86" y="646" class="sub">带来源的长期记忆</text>
      <g v-for="(t, i) in ['想起来', '睡眠中巩固', '慢慢遗忘']" :key="'r' + t">
        <rect :x="42 + i * 92" y="662" width="84" height="28" rx="14" class="chip" />
        <text :x="84 + i * 92" y="681" class="chip-t" text-anchor="middle">{{ t }}</text>
      </g>
    </svg>
    <figcaption>规则只存在于护栏：她的行为出去、消息进来都要经过它，主人也只能调整它。心跳、困倦这些生理过程在她体内运转，护栏碰不到——卸掉护栏，她照样生活。</figcaption>
  </figure>
</template>

<style scoped>
.arch { margin: 14px 0 0; background: var(--surface); border: 1px solid var(--line); border-radius: 12px; padding: 18px 18px 14px; }
svg { width: 100%; height: auto; display: block; font-family: inherit; }
.persona { fill: #f3f6fb; stroke: #dbe3ef; }
.card { fill: #ffffff; stroke: #e1e6ee; }
.guard { fill: #fbf3e6; stroke: #ecd6b1; }
.world { fill: #ffffff; stroke: var(--line); }
.h { font-size: 17px; font-weight: 700; fill: var(--text); }
.h--warm { fill: #8a5300; }
.h2 { font-size: 15px; font-weight: 700; fill: var(--text); }
.sub { font-size: 11.5px; fill: var(--muted); }
.chip { fill: #f1f4f8; stroke: none; }
.chip--key { fill: #fbe9d4; }
.chip--guard { fill: #ffffff; stroke: #ecd6b1; }
.chip-t { font-size: 12.5px; fill: #36414a; }
.chip-t--key { fill: #8a5300; font-weight: 600; }
.flow { stroke: #8f99a3; stroke-width: 1.6; fill: none; }
.flow--in { stroke-dasharray: 4 3; }
.flow-key { stroke: #c27a12; stroke-width: 1.8; }
.ah { fill: #8f99a3; }
.ah-warm { fill: #c27a12; }
.lbl { font-size: 11.5px; fill: var(--muted); }
.lbl-key { font-size: 11.5px; fill: #8a5300; font-weight: 600; }
figcaption { font-size: 13px; color: var(--muted); margin-top: 10px; }
.tall { display: none; }
@media (max-width: 640px) {
  .arch { padding: 12px 10px 10px; }
  .wide { display: none; }
  .tall { display: block; }
  .tall .h { font-size: 18px; }
  .tall .h2 { font-size: 16px; }
  .tall .sub { font-size: 12.5px; }
  .tall .chip-t { font-size: 13px; }
  .tall .lbl, .tall .lbl-key { font-size: 12px; }
  figcaption { font-size: 12.5px; padding: 0 4px; }
}
</style>
