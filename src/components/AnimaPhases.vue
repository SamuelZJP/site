<script setup>
// R0–R7 阶段与提交日期（来自 dsh-anima 的 git 记录）
const phases = [
  ['R0', '11-14', '立宪法'],
  ['R1', '11-14', '规则移进护栏'],
  ['R2', '11-17', '只留意志与生理'],
  ['R3', '11-18', '接入 QQ'],
  ['R4', '11-24', '睡眠与心跳'],
  ['R5', '11-24', '记忆巩固'],
  ['R6', '11-24', '精力与需求'],
  ['R7', '11-26', '真机生活一天'],
]
</script>

<template>
  <div class="phases">
    <ol>
      <li v-for="([id, date, label], i) in phases" :key="id" :class="{ last: i === phases.length - 1 }">
        <span class="dot">{{ id }}</span>
        <span class="date">{{ date }}</span>
        <span class="label">{{ label }}</span>
      </li>
    </ol>
    <div class="loop">
      <span>写计划</span><i>→</i><span>AI 按规范实现</span><i>→</i><span>退出检查 + 演示</span><i>→</i><span>通过才进下一阶段</span>
    </div>
  </div>
</template>

<style scoped>
.phases { margin-top: 14px; background: var(--surface); border: 1px solid var(--line); border-radius: 12px; padding: 20px 18px 16px; }
ol { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(8, 1fr); position: relative; }
ol::before { content: ''; position: absolute; left: 6.25%; right: 6.25%; top: 17px; height: 2px; background: #dbe3ef; }
li { position: relative; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 4px; padding: 0 4px; }
.dot { width: 36px; height: 36px; border-radius: 50%; background: #fff; border: 2px solid var(--accent); color: var(--accent); font-size: 12px; font-weight: 700; display: flex; align-items: center; justify-content: center; position: relative; }
li.last .dot { background: var(--accent); color: #fff; }
.date { font-size: 11px; color: var(--muted); }
.label { font-size: 12.5px; line-height: 1.45; color: var(--text); }
.loop { margin-top: 18px; padding-top: 14px; border-top: 1px dashed var(--line); display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 6px 10px; font-size: 13px; color: var(--muted); }
.loop span { background: #f1f4f8; color: #36414a; padding: 3px 12px; border-radius: 999px; }
.loop i { font-style: normal; color: #9aa3ad; }
@media (max-width: 640px) {
  ol { grid-template-columns: repeat(4, 1fr); row-gap: 16px; }
  ol::before { display: none; }
}
</style>
