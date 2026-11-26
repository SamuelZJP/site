// dsh-anima R7 真机测试（run r7-qq-11251644，2026-11-25 08:45 → 11-26 03:07）的原始数据摘录。
// 来源：R7 运行报告与活动日志。不含账号、token 或对话原文。

// 时间统一写成「距 11-25 00:00 的分钟数」，跨天的 03:05 记作 24*60 + 185。
const t = (hhmm, nextDay = false) => {
  const [h, m] = hhmm.split(':').map(Number)
  return (nextDay ? 24 * 60 : 0) + h * 60 + m
}

// 每次心跳时记录的身体状态（醒着的 15 次）
export const body = [
  ['08:46', 0.15, 0], ['09:46', 0.2, 0], ['10:46', 0.25, 0], ['11:46', 0.3, 0],
  ['12:44', 0.35, 0], ['13:41', 0.39, 0], ['14:36', 0.43, 0], ['15:30', 0.47, 0],
  ['16:23', 0.51, 0], ['17:14', 0.55, 0], ['18:04', 0.59, 0], ['18:53', 0.63, -0.17],
  ['19:41', 0.67, -0.14], ['20:28', 0.71, -0.11], ['21:15', 0.74, -0.1],
].map(([at, pressure, valence]) => ({ at, min: t(at), pressure, valence }))

export const events = {
  heartbeat: body.map((b) => b.min),
  message: [t('08:51'), t('08:53'), t('12:12'), t('03:06', true)],
  initiate: [
    { min: t('10:47'), what: '主动发消息' },
    { min: t('17:15'), what: '主动发消息' },
    { min: t('19:41'), what: '戳一戳' },
  ],
}

export const sleep = { from: t('21:15'), to: t('03:05', true) }
export const range = { from: t('08:30'), to: t('03:30', true) }

export const notes = [
  { min: t('14:36'), text: '记下一个习惯：安静的时候会默默数着上次有人说话过了多久，又忍住不连着打扰人' },
  { min: t('18:04'), text: '记录心情：一整天没什么消息，情绪转低（valence −0.2）' },
  { min: t('21:15'), text: '“白天空得很，人也累了。睡吧，明天再说。”' },
]

// 全天行为次数（她自己调用的工具）
export const behaviors = [
  { name: 'rest', label: '歇一会儿', count: 11 },
  { name: 'qq_say', label: '说话', count: 6 },
  { name: 'wait', label: '等待', count: 2 },
  { name: 'groups_glance', label: '看一眼群聊', count: 2 },
  { name: 'sleep', label: '睡觉', count: 2, note: '第二次被身体拒绝：还不困' },
  { name: 'self_note', label: '记下自己的习惯', count: 1 },
  { name: 'self_feel', label: '记录情绪', count: 1 },
  { name: 'qq_poke', label: '戳一戳', count: 1 },
  { name: 'memory_remember', label: '主动记住', count: 1 },
  { name: 'alarm_set', label: '设闹钟', count: 1 },
]

export const fmt = (min) => {
  const m = ((min % 1440) + 1440) % 1440
  return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`
}
