# AI Builder OS

> 一个面向 AI 产品经理、AI 应用工程师和自由职业 AI 服务商的综合工作台。
> 它把「项目库、客户接单、工作流模板、AI 评测、作品集包装」放到一个系统里，帮助你从想做什么、怎么卖、怎么交付、怎么证明能力这几件事上形成闭环。

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)
![License](https://img.shields.io/badge/License-MIT-green)

在线演示：[https://christopher47634.github.io/ai-builder-os/](https://christopher47634.github.io/ai-builder-os/)

---

## 大白话：这个项目有什么用？

如果你正在学 AI、做 AI 项目、准备 AI 产品经理面试，或者想接一些 AI 自动化小单，最容易卡住的不是「会不会调用模型」，而是下面这些问题：

- 我到底该做什么项目，哪个项目更适合写简历？
- 客户说「帮我做个 AI 工具」，我怎么判断他真实想要什么？
- 我该怎么报价，怎么写交付范围，怎么防止无限改需求？
- 工作流自动化那么多场景，我能不能快速找到可以复用的方案？
- 我做的 RAG / Agent / AI 应用，怎么评估它是不是靠谱？
- 最后怎么把这些东西讲成一个像样的作品集项目？

**AI Builder OS 就是把这些问题集中到一个工作台里。**

你可以把它理解成一个「AI 项目作战台」：

- 想找项目：去看 100 个 AI 项目库。
- 想接客户：输入客户原话，系统给你拆需求、估风险、出报价和 SOW。
- 想做自动化：从 200 个工作流模板里搜方案、看工具、复制 Prompt。
- 想评估模型：看 600 条 AI Eval 测试用例，理解 RAG、幻觉、安全、工具调用这些评测维度。
- 想写简历/作品集：系统已经整理了中英文简历 bullet、STAR 面试讲法、演示脚本和截图。

它不是一个只展示 UI 的空壳，而是一个把多份真实资料整理成结构化数据后做出来的可运行产品。

---

## 项目截图

### 总览 Dashboard

![Dashboard](screenshots/01-dashboard.png)

### AI 项目库

![AI Projects](screenshots/02-projects.png)

### 客户接单分析

![Client Intake](screenshots/03-intake.png)

### 工作流模板库

![Workflows](screenshots/04-workflows.png)

### AI Eval Bench

![Eval](screenshots/05-eval.png)

### 作品集页面

![Portfolio](screenshots/06-portfolio.png)

### 移动端适配

![Mobile Dashboard](screenshots/08-mobile-dashboard.png)

---

## 核心数据

这个项目的核心不是页面数量，而是数据整合。当前系统内置了 1,000 条核心结构化数据：

| 数据模块 | 数量 | 作用 |
| --- | ---: | --- |
| AI 项目库 | 100 | 用来筛选适合开发、接单、写简历的 AI 项目 |
| 客户接单案例 | 100 | 用来训练客户沟通、报价、交付和风险判断 |
| 工作流模板 | 200 | 用来快速生成自动化方案、Prompt 和交付蓝图 |
| AI 评测用例 | 600 | 覆盖 RAG、多轮对话、工具调用、幻觉、安全、恶意输入 |

另外还有：

- 14 个 AI 服务产品包
- 12 个客户画像
- 项目交付 SOP
- 简历文案、作品集文案、演示脚本、部署说明、验收报告

---

## 7 个核心页面

| 页面 | 路由 | 主要功能 |
| --- | --- | --- |
| Dashboard | `/` | 看整体数据、Top 推荐、快捷入口 |
| AI 项目库 | `/projects` | 搜索、筛选、排序 100 个 AI 项目，生成简历/MVP/作品集文案 |
| 客户接单 | `/intake` | 输入客户原话，分析客户类型、真实需求、报价、风险和 SOW |
| 工作流模板 | `/workflows` | 搜索 200 个自动化工作流，查看工具、API、Prompt、实现方案 |
| AI Eval Bench | `/eval` | 展示 600 条评测用例和 6 类评测维度，支持 Mock 评测展示 |
| 作品集包装 | `/portfolio` | 生成中文/英文简历 bullet、STAR 面试讲法、README 文案 |
| 验收状态 | `/status` | 展示数据源、模块状态、启动命令、Mock 边界和升级路线 |

---

## 技术栈

| 层级 | 技术 |
| --- | --- |
| 前端框架 | Next.js 16 App Router |
| 语言 | TypeScript strict mode |
| 样式 | Tailwind CSS v4 |
| 数据 | 本地 JSON 文件 |
| 构建 | 静态生成，适合部署到 Vercel |
| 运行方式 | 默认离线运行，不需要 API Key |

项目默认不依赖外部数据库、不依赖真实 LLM API、不需要后端服务。

---

## 当前真实能力与 Mock 边界

为了避免夸大，这里把真实能力和 Mock 能力说清楚。

| 功能 | 当前状态 | 说明 |
| --- | --- | --- |
| 项目库搜索/筛选 | 真实功能 | 基于本地 100 个项目数据 |
| 客户接单分析 | 规则引擎 | 能做基础判断，但不是 LLM 深度理解 |
| 工作流搜索/筛选 | 真实功能 | 基于 200 个工作流模板 |
| Prompt 复制 | 真实功能 | 可直接复制模板内容 |
| Eval 展示 | 真实数据 | 600 条用例来自结构化数据 |
| Eval 运行 | Mock 演示 | 当前不是调用真实模型打分 |
| OpenAI Provider | 预留接口/路线 | 还没有真正接入真实 API |
| 简历/作品集生成 | 模板生成 | 基于已有数据和固定模板生成 |

一句话：**这是一个完整可运行的作品集级 AI 工作台，但不是已经接入真实模型服务的生产级 SaaS。**

---

## 本地运行

### 环境要求

- Node.js 18+
- npm 9+

### 安装和启动

```bash
git clone https://github.com/christopher47634/ai-builder-os.git
cd ai-builder-os
npm install
npm run dev
```

浏览器打开：

```text
http://localhost:3000
```

### 构建

```bash
npm run build
npm run start
```

### GitHub Pages 自动部署

这个仓库已经内置 GitHub Actions workflow。推送到 `main` 后，会自动构建静态站点并发布到：

```text
https://christopher47634.github.io/ai-builder-os/
```

### 部署到 Vercel

```bash
npx vercel
```

也可以把 GitHub 仓库连接到 Vercel，使用默认 Next.js 部署流程。Vercel 部署需要本机或平台账号完成登录授权。

---

## 目录结构

```text
ai-builder-os/
├── src/
│   ├── app/                    # 7 个页面
│   ├── components/             # 通用组件
│   ├── data/                   # 结构化 JSON 数据
│   │   ├── projects.json
│   │   ├── customer-cases.json
│   │   ├── workflows.json
│   │   └── eval/
│   └── types/                  # TypeScript 类型定义
├── screenshots/                # 项目截图
├── docs/                       # 架构、数据结构、整合审计
├── scripts/                    # 数据提取脚本
├── README.md
├── FINAL_DELIVERY.md
├── QA_REPORT.md
├── DEMO_SCRIPT.md
├── RESUME_BULLETS.md
└── DEPLOYMENT_GUIDE.md
```

---

## 可以怎么用它？

### 1. 当作品集项目

这个项目可以展示你不只是会写页面，而是能完成：

- 数据整理
- 产品规划
- 信息架构
- 前端开发
- 类型建模
- AI 评测理解
- 商业化场景设计
- 项目验收和交付包装

### 2. 当 AI 产品经理面试材料

可以重点讲：

- 为什么把项目库、客户、工作流、评测整合到一起
- 数据怎么建模
- 为什么现在采用规则引擎和 Mock Eval
- 如果接真实 LLM，下一步怎么做
- 这个系统如何帮助 AI 服务商减少沟通和交付成本

### 3. 当接单训练工具

它可以帮助你练习：

- 怎么识别客户真实需求
- 怎么判断客户值不值得接
- 怎么报价
- 怎么写交付范围
- 怎么设置验收标准
- 怎么提前规避项目失控

### 4. 当 AI 自动化方案库

工作流模块里有 200 个模板，可以用于：

- 找自动化项目灵感
- 生成 n8n / Make / Zapier 实现思路
- 复制 Prompt 模板
- 做客户方案初稿

---

## 简历写法示例

### 中文版

> 独立设计并开发 AI Builder OS，一个面向 AI 产品工程师的综合工作台，将 100 个 AI 项目、100 个客户案例、200 个工作流模板和 600 条 AI 评测用例整合为 1,000 条结构化数据，构建项目筛选、客户接单、工作流检索、AI Eval 展示和作品集包装等 7 个核心模块。

### English Version

> Built AI Builder OS, a Next.js + TypeScript workbench for AI product engineers, consolidating 1,000 structured entries across project discovery, client intake, workflow automation, and AI evaluation into seven interactive modules.

---

## 5 分钟演示建议

1. 打开 Dashboard，说明这个系统整合了 4 类数据。
2. 进入 `/projects`，展示如何筛选高价值 AI 项目。
3. 进入 `/intake`，输入一段客户原话，展示需求拆解、报价和 SOW。
4. 进入 `/workflows`，搜索一个工作流，展示 Prompt 和工具链。
5. 进入 `/eval`，解释 600 条测试用例覆盖哪些 AI 风险。
6. 最后进入 `/portfolio`，展示简历和面试讲法如何生成。

---

## 下一步路线

- [ ] 接入真实 OpenAI-compatible Provider
- [ ] 把客户接单分析从规则引擎升级为 LLM + 规则混合引擎
- [ ] 增加 localStorage / IndexedDB 保存用户输入
- [ ] 增加 SOW / 报价单 PDF 导出
- [ ] 增加更完整的无障碍属性
- [ ] 增加中英文切换
- [ ] 部署到 Vercel 并补充在线演示链接

---

## 许可证

MIT License. 详见 [LICENSE](LICENSE)。
