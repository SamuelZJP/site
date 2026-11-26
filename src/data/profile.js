// 站点全部文案集中在这里。

export const profile = {
  name: '周嘉鹏',
  role: 'Python 全栈 / AI 应用开发',
  // 名字下方的履历速览（页面上不加标题）
  facts: ['软件工程本科 · 2026 届', '上海财经大学浙江学院', 'GPA 3.9 · 专业第一', '国家奖学金', 'IEEE T-ASE 论文在审'],
  intro:
    '能独立把一个 AI 应用从模型接入、后端 API、数据库、前端页面一路做到公网部署；也做过把 Transformer 预测模型量化到树莓派上跑实时控制的科研项目。',
  tags: ['Python', 'FastAPI', 'Vue 3', '大模型应用', 'Linux 部署', 'Transformer · 边缘推理'],
  links: [
    { label: 'GitHub', href: 'https://github.com/SamuelZJP' },
  ],
  resumePdf: '/resume.pdf', // 公开版简历（不含联系方式与照片），由 JobHunting/resume/build 生成
  education: {
    school: '上海财经大学浙江学院',
    major: '软件工程 · 本科',
    period: '2022.09 – 2026.06',
    gpa: 'GPA 3.9 / 专业第一',
  },
  // 首页「经历」双轨时间线。月份写 'YYYY-MM'，end 为包含的最后一个月。
  timeline: {
    from: '2025-07',
    to: '2026-11',
    lanes: [
      {
        title: '科研',
        sub: 'D-MPC 智能家居环境控制',
        project: 'dmpc',
        rows: [[
          { from: '2025-07', to: '2025-08', label: '合作公司实验', tip: '科研实习：在导师的合作公司做实验' },
          { from: '2025-09', to: '2025-11', label: '校实验室', tip: '回校继续科研，协助导师指导实验室成员' },
          { from: '2025-12', to: '2026-02', label: '采集工厂数据', tip: '毕业实习期间，为补充实验采集工厂环境数据' },
          { from: '2026-03', to: '2026-06', label: '校实验室', tip: '返修后继续在校实验室做实验' },
          { from: '2026-07', to: '2026-10', label: '二审补充实验', tip: '在家庭、工厂、办公室三种环境中做消融与对比实验' },
          { from: '2026-11', to: '2026-11', label: '审稿中', pending: true },
        ]],
      },
      {
        title: '独立开发',
        sub: '科研之余',
        rows: [
          [
            { from: '2026-04', to: '2026-07', label: 'MAAS 记忆原型', project: 'lorenook' },
            { from: '2026-08', to: '2026-09', label: '重构为正式版', arrow: true },
            { from: '2026-10', to: '2026-11', label: 'LoreNook', project: 'lorenook' },
          ],
          [{ from: '2026-11', to: '2026-11', label: 'anima', project: 'anima' }],
        ],
      },
    ],
    milestones: [
      { at: '2025-10', label: '论文首投', sub: '推荐立项通过' },
      { at: '2025-12', label: '一审意见' },
      { at: '2026-03', label: '返修重投' },
      { at: '2026-06', label: '毕业', sub: '收到二审意见' },
      { at: '2026-10', label: '正式投递' },
    ],
    earlier: [
      { period: '2024.07 – 2024.08', role: '技术实习生', org: '数字金华技术运营有限公司', note: '金华「城市大脑」政务系统 Java 后端', project: 'citybrain' },
    ],
  },
  // 按含金量排序，前 4 项在首页高亮。certs 为证书图片（点击弹出查看），link 为外部证明。
  honors: [
    { title: '国家奖学金', meta: '2024–2025 学年 · 教育部', certs: ['/img/certs/national-scholarship.jpg'] },
    { title: '浙江省政府奖学金', meta: '2023–2024 学年 · 浙江省教育厅', certs: ['/img/certs/provincial-scholarship.jpg'] },
    { title: '省部级及以上科研项目培育项目推荐立项通过', meta: '2025 年度 · 上海财经大学浙江学院', link: { label: '立项名单公示', href: 'https://jwc.shufe-zj.edu.cn/info/1016/4083.htm' } },
    { title: 'IEEE T-ASE 论文在审', meta: '第二作者、通讯作者 · 已返修，审稿中', note: '可提供纸质手稿' },
    { title: '全国大学生数学竞赛三等奖', meta: '第十六届（非数学 B 类）· 中国数学会 · 2024', certs: ['/img/certs/math-contest.jpg'] },
    { title: '大学生算法大赛本科 B 组三等奖', meta: '2024 第三届 · 中国电子工业标准化技术协会', certs: ['/img/certs/algorithm-contest.jpg'] },
    { title: '校级优秀毕业论文', meta: '2026 届 · 上海财经大学浙江学院', certs: ['/img/certs/thesis.jpg'] },
    { title: '程序设计竞赛一等奖 ×2', meta: '校赛暨浙江省赛选拔赛 · 2024、2025', certs: ['/img/certs/programming-2024.jpg', '/img/certs/programming-2025.jpg'] },
    { title: '学习优秀一等奖学金', meta: '2023–2024 学年 · 校级', certs: ['/img/certs/academic-scholarship.jpg'] },
    { title: '三好学生', meta: '2023–2024 学年 · 校级', certs: ['/img/certs/merit-student.jpg'] },
    { title: '职业规划大赛一等奖', meta: '校赛暨浙江省赛选拔 · 2024', certs: ['/img/certs/career-planning.jpg'] },
  ],
}

// 项目。brief = 项目页标题下的概要（角色 / 时间 / 状态）；metrics = 首屏关键数字；
// actions = 主按钮、次要链接与一行说明；sections 正文里 **加粗** 会渲染成关键词，items 渲染成「左标签、右一句话」。
export const projects = [
  {
    id: 'lorenook',
    name: 'LoreNook · AI 对话应用',
    kicker: '独立全栈开发 · 2026.04 – 至今',
    type: '个人项目',
    period: '2026.04 – 至今',
    summary: '邀请制小圈子内测的 AI 对话应用，已公网上线。从记忆后端原型 MAAS 起步，重构为完整的全栈应用。',
    brief: ['独立全栈开发', '2026.04 – 至今', '已公网上线 · 邀请制内测'],
    stack: ['Python 3.12', 'FastAPI', 'SQLAlchemy 2.0', 'Alembic', 'SQLite', 'SSE', 'pytest', 'Vue 3', 'TanStack Query', 'Caddy', 'Systemd'],
    access: { kind: 'private', label: '在线体验链接按需发放' },
    home: { cover: '/img/shots/lorenook-1.jpg', value: '1 人', label: '从设计、前后端到上线部署独立完成', featured: true },
    metrics: [
      { value: '1 人', label: '从设计到上线部署独立完成' },
      { value: '800+', label: '自动化测试用例' },
    ],
    actions: {
      links: [
        { label: 'LoreNook 源码', href: 'https://github.com/SamuelZJP/LoreNook' },
        { label: 'MAAS 原型源码', href: 'https://github.com/SamuelZJP/MAAS' },
      ],
      note: '在线体验采用一次性链接（7 天内有效，首次打开后可用 60 分钟），面试时可提供。',
    },
    shots: [
      { src: '/img/shots/lorenook-2.jpg', caption: '对话页：右侧为结构化状态与生成插图', pos: 'top center' },
      { src: '/img/shots/lorenook-1.jpg', caption: '体验链接入口', pos: 'center' },
      { src: '/img/shots/lorenook-3.jpg', caption: '多角色对话与会话列表', pos: 'top center' },
    ],
    sections: [
      {
        title: '解决什么问题',
        body: [
          '让 AI 长期扮演一个角色，会遇到两个问题：一是**记不住**，几十轮之前的事很快被挤出上下文；二是**不像他**，聊久了心情、处境、关系对不上前文，不同角色也渐渐说成同一个腔调。',
          'LoreNook 用两套机制分别应对：**分层记忆**负责「发生过什么」，**状态变量**负责「他此刻是什么样」。',
        ],
      },
      {
        title: '架构',
        chart: 'lorenook-arch',
      },
      {
        title: '怎么做的',
        items: [
          { k: '原型', v: '先单独做了记忆后端 **MAAS**（2026.04 – 07，公开仓库），验证过的设计并入正式版。' },
          { k: '后端', v: '**FastAPI + SQLAlchemy 2.0 + SQLite**，Alembic 迁移，SSE 流式输出；多用户数据隔离。' },
          { k: '记忆', v: '**分层摘要 + 按需召回**，控制长对话的上下文长度。' },
          { k: '扩展', v: '用户自己写的提示词预设在 **QuickJS 沙箱**中运行。' },
          { k: '测试', v: '**800+** 个 pytest 用例，配合带故障注入的模拟后端。' },
          { k: '前端', v: '**Vue 3 + TanStack Query + CodeMirror 6**，接口类型由 OpenAPI 自动生成。' },
          { k: '部署', v: '**Systemd + Caddy** 反向代理，定时数据库备份；联动 ComfyUI 生图。' },
        ],
      },
    ],
  },
  {
    id: 'dmpc',
    name: 'D-MPC 智能家居环境控制',
    kicker: '科研实习 → 毕业设计 → 论文审稿中 · 2025.07 – 至今',
    type: '科研项目',
    period: '2025.07 – 至今',
    summary: '用 Transformer 预测室内环境与人数，以它为可微模型做模型预测控制，量化后部署在树莓派 5 上，在物理测试床上实测验证。',
    brief: ['科研实习 → 毕业设计', '2025.07 – 至今', 'IEEE T-ASE 论文审稿中'],
    stack: ['Transformer', '可微 MPC', 'INT8 量化', 'TFLite', 'Raspberry Pi 5', 'Vue 3', 'ECharts'],
    access: { kind: 'demo', label: '打开前端演示', href: './demos/smarthome/' },
    home: { art: 'dmpc', value: '18.5%', label: '相比调优 PID 能耗降低' },
    metrics: [
      { value: '18.5%', label: '能耗降低（对比调优 PID）' },
      { value: '≈21 ms', label: '树莓派 5 单次推理' },
      { value: '2.7%', label: '控制周期内的端侧算力占用' },
    ],
    actions: {
      primary: { label: '打开前端演示', href: './demos/smarthome/' },
      note: '演示数据在浏览器内模拟生成，不连接真实设备；上面的数字来自实验室测试床实测。',
    },
    shots: [
      { src: '/img/shots/smarthome-3.jpg', caption: '智能控制决策：手动 / PID / D-MPC' },
      { src: '/img/shots/smarthome-2.jpg', caption: '环境预测：历史值 + 未来 15 分钟' },
      { src: '/img/shots/smarthome-1.jpg', caption: '环境数据监测' },
    ],
    sections: [
      {
        title: '背景',
        body: [
          '2025 年暑期在导师的合作公司做科研实习，课题随后用于**毕业设计**、**IEEE T-ASE 投稿**（第二作者、通讯作者）和**省部级科研培育项目**申报（推荐立项通过，申请书与答辩由本人撰写）。实验与核心产出由本人独立完成。',
          '论文 2025.10 首投，按两轮审稿意见补充实验（家庭、工厂、办公室三种环境），2026.10 正式投递，目前审稿中。',
        ],
      },
      {
        title: '方法',
        items: [
          { k: '预测', v: '**Seq2Seq Transformer** 预测温湿度、CO₂、TVOC、光照和室内人数（未来 15 分钟），整体优于 LSTM / GRU / TCN 基线。' },
          { k: '控制', v: '把 Transformer 当作**可微的环境模型**，用梯度优化求解控制序列，兼顾舒适与节能。' },
          { k: '部署', v: '**INT8 量化**后跑在树莓派 5 上：单次预测约 21 ms，每个控制周期的端侧计算约 1.6 s。' },
        ],
        figure: { src: '/img/dmpc/dmpc_framework.png', caption: 'D-MPC 系统框架（论文图）' },
      },
      {
        title: '量化的代价',
        body: [
          '量化后人数预测 sMAPE 只上升 **0.48 个百分点**，温度、湿度、CO₂ 的误差反而略有下降。',
        ],
        figure: { src: '/img/dmpc/quantization_full_comparison.png', caption: 'FP32 与 INT8 模型在各预测目标上的误差对比' },
      },
    ],
  },
  {
    id: 'anima',
    name: 'dsh-anima 自主 AI Agent',
    kicker: '架构设计 + AI 协同开发 · 2026.11',
    type: '个人项目',
    period: '2026.11',
    summary: '一个会自己作息、有长期记忆、能在 QQ 和 B 站上自主活动的 AI Agent。本人负责架构与机制设计、规范文档和分阶段验收，代码由 AI 按规范生成。',
    brief: ['架构设计 + AI 协同开发', '2026.11', '面试时可现场演示（QQ 实机）'],
    stack: ['Agent 架构', '记忆巩固与遗忘', '安全护栏', 'Spec-Driven', 'OneBot v11', 'TypeScript monorepo'],
    access: { kind: 'live', label: '面试时可现场演示（QQ 实机）' },
    home: { art: 'anima', value: '24 h', label: '接入真实 QQ 自主运行' },
    metrics: [
      { value: '24 h', label: '接入真实 QQ 自主运行' },
      { value: '8 轮', label: '按规范分阶段推进并验收' },
    ],
    actions: {
      links: [{ label: '源码与设计文档', href: 'https://github.com/SamuelZJP/dsh-anima' }],
      note: '面试时可现场演示 QQ 实机',
    },
    shotsNote: '管理面板截图，来自开发用的演示平台（脚本角色、30 倍速时钟），不是真实聊天。',
    shots: [
      { src: '/img/shots/anima-1.jpg', caption: '状态：时钟、心跳、精力与情绪、预算' },
      { src: '/img/shots/anima-2.jpg', caption: '人格：她自己记下的自我认识' },
      { src: '/img/shots/anima-3.jpg', caption: '记忆：睡眠中巩固出的长期记忆' },
    ],
    sections: [
      {
        title: '架构',
        chart: 'anima-arch',
      },
      {
        title: '开发方式',
        body: [
          '**Spec-Driven**：先立宪法和设计文档，再分阶段推进。代码由 AI 按规范生成，我负责架构、机制设计与验收。',
        ],
        chart: 'anima-phases',
      },
      {
        title: '真实测试',
        body: [
          '2026-11-25 08:45 接入真实 QQ 账号，自由运行一天一夜，期间她的代码一行没改。',
        ],
        metrics: [
          { value: '9 / 9', label: '检查项全部通过' },
          { value: '19 次', label: '心跳，间隔 60 → 47 分钟' },
          { value: '5 h 50 min', label: '睡眠：21:15 自己入睡，03:05 自己醒来' },
          { value: '6%', label: '白天 token 用量占预算' },
        ],
        chart: 'anima-day',
      },
      {
        title: '她做了什么',
        chart: 'anima-behaviors',
      },
    ],
  },
  {
    id: 'citybrain',
    name: '金华城市大脑 · 实习项目',
    kicker: '数字金华技术运营有限公司 · 技术实习生 · 2024.07 – 2024.08',
    type: '实习',
    period: '2024.07 – 2024.08',
    summary: '参与金华「城市大脑」政务系统（Spring Cloud / RuoYi-Cloud）的 Java 后端开发，涉及接口开发、模块迁移、政务钉钉集成和大模型应用优化。',
    brief: ['技术实习生 · Java 后端', '2024.07 – 2024.08', '数字金华技术运营有限公司'],
    stack: ['Java', 'Spring Cloud', 'MyBatis', 'MySQL', '政务钉钉 SDK', 'Python 脚本'],
    access: { kind: 'shots', label: '项目截图' },
    metrics: [
      { value: '≈3 s', label: '大模型重复问题响应缩短' },
      { value: '1 周 → 1 小时', label: '大模型输出人工审查流程' },
    ],
    shotsNote: '截图来自原项目前端的离线演示版，数据均为虚构；界面非本人编写，本人负责的是后端部分。',
    shots: [
      { src: '/img/shots/citybrain-1.jpg', caption: '工作台' },
      { src: '/img/shots/citybrain-2.jpg', caption: '指标树维护' },
      { src: '/img/shots/citybrain-3.jpg', caption: '调用运行统计' },
    ],
    sections: [
      {
        title: '做了什么',
        items: [
          { k: '接口', v: '运动会、数改通问题建议等模块的**增删改查接口与 Excel 模板导入**，逐条插入改为批量插入。' },
          { k: '迁移', v: '完成数改通模块迁移和**政务钉钉 SDK** 集成。' },
          { k: '缓存', v: '缓存已有问答 ID 并复用结果，大模型重复问题的平均响应缩短**约 3 秒**。' },
          { k: '脚本', v: '用 Python 脚本自动比对大模型输出与标准答案，人工审查从**一周多缩短到一小时以内**。' },
        ],
      },
    ],
  },
]
