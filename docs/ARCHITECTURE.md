# AI Builder OS — 产品架构与页面规格

> 版本: v1.0
> 日期: 2026-06-27
> 目标: 定义技术栈、目录结构、7 个页面规格、数据策略和部署方案

---

## 一、技术栈选择

### 选择: Next.js 14 + TypeScript + Tailwind CSS + 本地 JSON

**理由**:

| 维度 | Next.js 14 (选择) | Vite + React (备选) |
|------|-------------------|---------------------|
| SSG 支持 | 原生支持 generateStaticParams | 需要 react-snap 或 vite-ssg |
| 数据导入 | 原生支持 JSON import + SSG | 需要手动配置 |
| 路由 | App Router 文件系统路由 | 需要 react-router-dom |
| SEO | 内置 head 管理 | 需要 react-helmet |
| 已有代码 | ai-clientops-copilot 已用 Next.js 14 | ai-eval-bench dashboard 用 Vite |
| 构建产物 | 可导出为纯静态 HTML | 同样支持 |
| 生态 | 更大的中文社区和文档 | 较小 |

**结论**: 选择 Next.js 14 App Router，因为：
1. 已有 ai-clientops-copilot 的 Next.js 代码可直接复用
2. App Router 原生支持 JSON 数据的静态导入
3. `output: 'export'` 可导出为纯静态站点，无需 Node.js 服务器
4. Tailwind CSS 已在 ai-clientops-copilot 中配置好

### 核心依赖

```json
{
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "lucide-react": "^1.21.0"
  },
  "devDependencies": {
    "typescript": "^5.6.0",
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.5.0",
    "autoprefixer": "^10.5.0"
  }
}
```

---

## 二、目录结构

```
ai-builder-os/
├── docs/                          # 本文档目录
│   ├── integration_audit.md
│   ├── DATA_SCHEMA.md
│   └── ARCHITECTURE.md
│
├── src/
│   ├── app/                       # Next.js App Router 页面
│   │   ├── layout.tsx             # 全局布局（侧边栏 + 主内容区）
│   │   ├── page.tsx               # 首页/仪表盘
│   │   ├── globals.css            # 全局样式（Tailwind）
│   │   ├── projects/
│   │   │   ├── page.tsx           # 项目列表页
│   │   │   └── [id]/
│   │   │       └── page.tsx       # 项目详情页
│   │   ├── workflows/
│   │   │   ├── page.tsx           # 工作流列表页
│   │   │   └── [id]/
│   │   │       └── page.tsx       # 工作流详情页
│   │   ├── freelance/
│   │   │   ├── page.tsx           # 接单工作台首页
│   │   │   ├── products/
│   │   │   │   └── page.tsx       # 接单产品库
│   │   │   ├── cases/
│   │   │   │   └── page.tsx       # 客户案例库
│   │   │   ├── scripts/
│   │   │   │   └── page.tsx       # 销售话术库
│   │   │   ├── proposal/
│   │   │   │   └── page.tsx       # 报价方案生成
│   │   │   ├── intake/
│   │   │   │   └── page.tsx       # 需求接单表单
│   │   │   └── sop/
│   │   │       └── page.tsx       # 交付 SOP 看板
│   │   ├── eval/
│   │   │   ├── page.tsx           # 评测结果总览
│   │   │   └── [suite]/
│   │   │       └── page.tsx       # 套件详情
│   │   ├── analytics/
│   │   │   └── page.tsx           # 数据分析页
│   │   └── settings/
│   │       └── page.tsx           # 设置页
│   │
│   ├── components/                # 共享组件
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx        # 侧边栏导航
│   │   │   ├── Header.tsx         # 顶部栏
│   │   │   └── ThemeProvider.tsx  # 暗色模式
│   │   ├── ui/                    # 基础 UI 组件（可从 shadcn/ui 复制）
│   │   │   ├── Card.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Tabs.tsx
│   │   │   ├── SearchInput.tsx
│   │   │   ├── FilterBar.tsx
│   │   │   └── StatCard.tsx
│   │   ├── charts/                # 图表组件
│   │   │   ├── RadarChart.tsx     # 七维度雷达图
│   │   │   ├── BarChart.tsx       # 柱状图
│   │   │   └── PieChart.tsx       # 饼图
│   │   └── domain/                # 领域组件
│   │       ├── ProjectCard.tsx    # 项目卡片
│   │       ├── WorkflowCard.tsx   # 工作流卡片
│   │       ├── CaseCard.tsx       # 案例卡片
│   │       ├── ScoreDisplay.tsx   # 分数展示
│   │       └── QuoteGenerator.tsx # 报价生成器
│   │
│   ├── data/                      # JSON 数据文件
│   │   ├── projects.json          # 100 个 AI 项目
│   │   ├── workflows.json         # 200 个工作流模板
│   │   ├── customerCases.json     # 100 个客户案例
│   │   ├── customerProfiles.json  # 12 类客户画像
│   │   ├── serviceProducts.json   # 14 个接单产品
│   │   ├── evalReport.json        # 评测报告
│   │   ├── deliverySOP.json       # 交付 SOP
│   │   ├── talkScripts.json       # 话术模板
│   │   └── riskRules.json         # 风险规则
│   │
│   ├── types/                     # TypeScript 类型定义
│   │   └── index.ts               # 所有接口定义（从 DATA_SCHEMA.md 复制）
│   │
│   ├── lib/                       # 工具函数
│   │   ├── analysis.ts            # 风险评估、ROI 计算、产品匹配
│   │   ├── filter.ts              # 筛选和排序逻辑
│   │   ├── search.ts              # 全文搜索
│   │   └── provider.ts            # OpenAI-compatible Provider
│   │
│   ├── hooks/                     # 自定义 Hooks
│   │   ├── useSearch.ts           # 搜索 Hook
│   │   ├── useFilter.ts           # 筛选 Hook
│   │   └── useTheme.ts            # 主题 Hook
│   │
│   └── utils/                     # 通用工具
│       ├── cn.ts                  # className 合并工具
│       └── constants.ts           # 常量定义
│
├── scripts/                       # ETL 脚本
│   └── extract-projects.ts       # 从 MD 提取项目数据为 JSON
│
├── public/                        # 静态资源
│   └── favicon.ico
│
├── next.config.js                 # Next.js 配置
├── tailwind.config.ts             # Tailwind 配置
├── tsconfig.json                  # TypeScript 配置
├── postcss.config.js              # PostCSS 配置
├── package.json
└── README.md
```

---

## 三、7 个页面详细规格

### 页面 1: 首页/仪表盘 (Dashboard)

**路由**: `/`

**数据源**:
- `projects.json` — 项目总数、分类分布
- `workflows.json` — 工作流总数、分类分布
- `customerCases.json` — 案例总数
- `serviceProducts.json` — 产品总数

**核心组件**:
- `StatCard` × 4 — 项目数、工作流数、案例数、产品数
- `BarChart` — 项目分类分布（20 个分类的项目数柱状图）
- `RadarChart` — Top 5 项目的七维度雷达图对比
- 快速入口卡片 — 各模块 Top 3 推荐

**交互**:
- 点击统计卡片 → 跳转到对应模块列表页
- 点击项目名称 → 跳转到项目详情页
- 暗色/亮色模式切换

**筛选条件**: 无

**生成功能**: 无

**数据加载策略**: SSG（构建时生成静态 HTML）

---

### 页面 2: AI 项目库 (Projects)

**路由**: `/projects`

**数据源**:
- `projects.json` — 100 个项目的完整数据

**核心组件**:
- `SearchInput` — 全文搜索（搜索项目名、定位、功能）
- `FilterBar` — 筛选栏：分类 Tab + 难度滑块 + 评分范围 + RAG/Agent/多模态复选框
- `Tabs` — 20 个分类 Tab（RAG、Agent、工作流、金融、教育...）+ "全部" Tab
- `ProjectCard` × N — 项目卡片列表（名称、分类、难度、均分、一句话定位、七维度小条）
- 排序下拉菜单 — 按均分/简历价值/商业价值/技术成长/接单价值/可开发性 排序

**交互**:
- 输入搜索词 → 实时过滤项目列表
- 点击分类 Tab → 筛选该分类项目
- 调整难度滑块 → 筛选对应难度项目
- 切换排序维度 → 列表重新排序
- 点击项目卡片 → 跳转到项目详情页 `/projects/[id]`
- 勾选多个项目 → 底部出现"对比"按钮 → 打开雷达图对比弹窗

**筛选条件**:
- 分类（20 个分类）
- 难度（1-5 星）
- 均分范围（0-10）
- 需要 RAG（是/否）
- 需要 Agent（是/否）
- 需要多模态（是/否）
- 排序维度（7 种排序）

**生成功能**: 无

**数据加载策略**: SSG（100 个项目的页面在构建时全部生成）

---

### 页面 3: 工作流模板库 (Workflows)

**路由**: `/workflows`

**数据源**:
- `workflows.json` — 200 个工作流模板

**核心组件**:
- `SearchInput` — 全文搜索
- `FilterBar` — 分类 Tab + 难度筛选 + 商业价值筛选 + 适用行业筛选
- `WorkflowCard` × N — 工作流卡片（名称、分类、难度、商业价值、工具列表、预计节省时间）
- 工作流详情弹窗/侧边栏 — 完整步骤、工具链、Prompt 模板、定价建议

**交互**:
- 搜索 → 实时过滤
- 分类 Tab → 筛选
- 点击卡片 → 展开详情（可选：弹窗或跳转到 `/workflows/[id]`）
- 筛选条件组合过滤

**筛选条件**:
- 分类（20 个分类）
- 难度（入门/中级/高级）
- 商业价值（高/中/低）
- 适用行业（标签筛选）

**生成功能**: 无

**数据加载策略**: SSG（200 个工作流在构建时全部生成，使用分页或虚拟滚动优化性能）

---

### 页面 4: 接单工作台 (Freelance)

**路由**: `/freelance`（子路由见下方）

#### 4a. 接单产品库 `/freelance/products`

**数据源**: `serviceProducts.json` — 14 个产品

**核心组件**:
- `ProductCard` × N — 产品卡片（名称、价格区间、交付天数、难度、是否适合第一单）
- 产品详情展开 — 交付内容、定价方案、风险点、防翻车方案、销售话术

**交互**:
- 按难度/价格/是否适合第一单排序
- 点击产品 → 展开详情
- "适合第一单"高亮标签

#### 4b. 客户案例库 `/freelance/cases`

**数据源**: `customerCases.json` — 100 个案例

**核心组件**:
- `SearchInput` — 搜索客户名/行业/痛点
- `FilterBar` — 客户类型筛选 + 行业筛选 + 预算范围筛选
- `CaseCard` × N — 案例卡片（客户名、行业、产品、推荐报价、风险等级）
- 案例详情展开 — 完整 9 模块（客户画像、原话、需求拆解、沟通策略、报价、成交话术、交付方案、风险控制、复盘）

**交互**:
- 搜索 → 实时过滤
- 客户类型 Tab → 筛选
- 点击案例 → 展开详情
- 风险等级标签颜色（绿/黄/红）

#### 4c. 销售话术库 `/freelance/scripts`

**数据源**: `customerProfiles.json` + `talkScripts.json`

**核心组件**:
- 客户画像网格 — 12 类客户画像卡片
- 话术 Tab 切换 — 切入策略 / 首次沟通 / 成交话术 / SOP 流程
- 话术展示区 — 选中客户类型后展示对应话术

**交互**:
- 点击客户画像卡片 → 加载该类型的话术
- Tab 切换 → 展示不同维度的话术
- 一键复制话术

#### 4d. 报价方案生成 `/freelance/proposal`

**数据源**: `serviceProducts.json` + `customerCases.json`

**核心组件**:
- 产品选择列表
- 案例选择列表
- 报价方案生成区 — 选中产品+案例后，自动生成报价方案

**交互**:
- 选择产品 → 高亮
- 选择参考案例 → 高亮
- 点击"生成方案" → 展示完整报价方案（产品描述、定价、交付周期、风险评估、ROI 分析）

#### 4e. 需求接单表单 `/freelance/intake`

**数据源**: 表单数据 → 本地状态（可选存入 localStorage）

**核心组件**:
- 多步表单 — 5 步：基本信息 → 需求描述 → 技术要求 → 交付要求 → 预算与备注
- 步骤进度条
- 表单验证

**交互**:
- 下一步/上一步
- 表单验证（必填字段）
- 提交后展示需求摘要

#### 4f. 交付 SOP 看板 `/freelance/sop`

**数据源**: `deliverySOP.json`

**核心组件**:
- 看板视图 — 7 个阶段（需求确认 → 方案设计 → 开发搭建 → 测试调试 → 部署上线 → 验收交接 → 售后支持）
- 阶段卡片 — 每个阶段的任务列表和天数
- 定金规则表
- 付款规则表

**交互**:
- 点击阶段 → 展开任务详情
- 定金/付款规则表格展示

**数据加载策略**: SSG（所有数据静态导入）

---

### 页面 5: AI 评测 (Eval)

**路由**: `/eval`

**数据源**:
- `evalReport.json` — 评测报告（18 个测试用例结果）

**核心组件**:
- `StatCard` × 4 — 总用例数、通过率、平均分、失败数
- `BarChart` — 按套件的通过率柱状图
- `PieChart` — 错误类型分布饼图
- 套件列表 — 6 个套件的卡片（通过率、平均分）
- 测试用例表格 — 可按套件筛选、按分数排序

**交互**:
- 点击套件卡片 → 跳转到 `/eval/[suite]` 展示该套件的测试用例
- 表格排序和筛选
- 点击测试用例 → 展开详情（模型输出、标准答案、分数、错误分类）

**筛选条件**:
- 套件（rag, multiturn, tool, hallucination, safety, malicious）
- 通过/失败
- 分数范围

**生成功能**: 无（评测运行需要 CLI，不在前端执行）

**数据加载策略**: SSG

---

### 页面 6: 数据分析 (Analytics)

**路由**: `/analytics`

**数据源**:
- `projects.json` — 项目数据聚合
- `workflows.json` — 工作流数据聚合
- `customerCases.json` — 案例数据聚合
- `serviceProducts.json` — 产品数据聚合

**核心组件**:
- 项目维度分析:
  - 分类分布饼图（20 个分类的项目数）
  - 难度分布柱状图
  - 评分分布直方图
  - 七维度均值雷达图
- 工作流维度分析:
  - 分类分布饼图
  - 难度分布柱状图
  - 工具使用频率排名（Top 10 工具）
  - 商业价值分布
- 接单维度分析:
  - 客户类型分布饼图
  - 产品热度排名
  - 报价分布直方图
  - 行业分布

**交互**:
- Tab 切换三个维度
- 图表 hover 展示详细数据

**生成功能**: 无

**数据加载策略**: SSG（构建时计算聚合数据）

---

### 页面 7: 设置 (Settings)

**路由**: `/settings`

**数据源**: 本地状态（localStorage）

**核心组件**:
- Provider 配置表单 — API Key、Base URL、Model、Temperature
- Mock Mode 开关
- 主题切换
- 数据导入/导出按钮

**交互**:
- 表单输入 → 保存到 localStorage
- Mock Mode 开关 → 切换数据源（Mock / Live）
- 导出 → 下载所有数据为 JSON
- 导入 → 上传 JSON 文件覆盖本地数据

**生成功能**: 无

**数据加载策略**: 客户端

---

## 四、数据加载策略

### 总体策略: SSG 为主，客户端交互为辅

| 数据类型 | 加载方式 | 说明 |
|----------|----------|------|
| 项目列表/详情 | SSG (generateStaticParams) | 100 个项目，构建时全部生成 |
| 工作流列表/详情 | SSG | 200 个工作流，构建时全部生成 |
| 案例/产品/话术 | SSG (JSON import) | 静态导入 JSON 文件 |
| 评测报告 | SSG (JSON import) | 静态导入 JSON 文件 |
| 搜索/筛选/排序 | 客户端 (useMemo) | 在已加载的数据上做客户端过滤 |
| 表单数据 | 客户端 (useState) | 纯客户端状态 |
| 设置 | 客户端 (localStorage) | 纯客户端持久化 |

### JSON 导入方式

```typescript
// 直接导入 JSON（Next.js 原生支持）
import projects from '@/data/projects.json';
import workflows from '@/data/workflows.json';
import customerCases from '@/data/customerCases.json';

// 类型断言
import type { AIProject, WorkflowTemplate, CustomerCase } from '@/types';
const typedProjects = projects as AIProject[];
```

### 大文件优化

- `workflows.json`（~1.1MB）: 使用动态 import 或按分类拆分为多个文件
- 首次加载只加载列表页需要的字段（id, name, category, difficulty, businessValue），详情页再加载完整数据

---

## 五、Mock Mode 设计

### 原则: Mock Mode 是默认模式，零配置即可运行

**实现方式**:

```typescript
// src/lib/provider.ts

import type { Provider, ProviderResponse, OpenAIProviderOptions } from '@/types';

/** Mock Provider — 返回预设文本，无需 API Key */
class MockProvider implements Provider {
  readonly name = 'mock';

  async complete(prompt: string, systemPrompt?: string): Promise<ProviderResponse> {
    // 模拟延迟
    await new Promise(r => setTimeout(r, 200 + Math.random() * 300));

    return {
      text: `[Mock Response] 基于您的输入 "${prompt.slice(0, 50)}..."，这是一个模拟回复。配置 OpenAI Provider 以获取真实 AI 响应。`,
      latency_ms: 200 + Math.floor(Math.random() * 300),
    };
  }
}

/** OpenAI-compatible Provider — 对接真实 API */
class OpenAICompatibleProvider implements Provider {
  readonly name: string;
  private baseURL: string;
  private apiKey: string;
  private model: string;
  private temperature: number;
  private max_tokens: number;

  constructor(opts: OpenAIProviderOptions) {
    this.name = `openai(${opts.model})`;
    this.baseURL = opts.baseURL.replace(/\/+$/, '');
    this.apiKey = opts.apiKey;
    this.model = opts.model;
    this.temperature = opts.temperature ?? 0.3;
    this.max_tokens = opts.max_tokens ?? 2048;
  }

  async complete(prompt: string, systemPrompt?: string): Promise<ProviderResponse> {
    const start = Date.now();
    const messages: Array<{ role: string; content: string }> = [];
    if (systemPrompt) messages.push({ role: 'system', content: systemPrompt });
    messages.push({ role: 'user', content: prompt });

    const resp = await fetch(`${this.baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: this.model,
        messages,
        temperature: this.temperature,
        max_tokens: this.max_tokens,
      }),
    });

    if (!resp.ok) throw new Error(`OpenAI API error ${resp.status}: ${await resp.text()}`);
    const data = await resp.json();
    return {
      text: data.choices[0]?.message?.content ?? '',
      usage: data.usage,
      latency_ms: Date.now() - start,
    };
  }
}

/** 创建 Provider — 根据设置返回 Mock 或 OpenAI */
export function createProvider(mockMode: boolean, opts?: OpenAIProviderOptions): Provider {
  if (mockMode || !opts?.apiKey) return new MockProvider();
  return new OpenAICompatibleProvider(opts);
}
```

**使用场景**:
- 报价方案生成 — Mock Mode 返回模板化的报价文本
- 话术推荐 — Mock Mode 返回已有话术的组合
- 项目推荐 — Mock Mode 基于七维度评分排序（无需 LLM）
- 评测运行 — Mock Mode 返回预设的评测结果

---

## 六、OpenAI-compatible Provider 接口设计

### 接口规范

```typescript
// 沿用 ai-eval-bench 的 Provider 接口
export interface Provider {
  readonly name: string;
  complete(prompt: string, systemPrompt?: string): Promise<ProviderResponse>;
}

export interface ProviderResponse {
  text: string;
  usage?: { prompt_tokens: number; completion_tokens: number; total_tokens: number };
  latency_ms: number;
}

export interface OpenAIProviderOptions {
  baseURL: string;    // 默认: https://api.openai.com/v1
  apiKey: string;     // 用户配置
  model: string;      // 默认: gpt-4o
  temperature?: number; // 默认: 0.3
  max_tokens?: number;  // 默认: 2048
}
```

### 支持的 LLM 提供商

任何兼容 OpenAI Chat Completions API 的提供商都可以使用：

| 提供商 | baseURL 示例 |
|--------|-------------|
| OpenAI | https://api.openai.com/v1 |
| DeepSeek | https://api.deepseek.com/v1 |
| 月之暗面 (Moonshot) | https://api.moonshot.cn/v1 |
| 智谱 (Zhipu) | https://open.bigmodel.cn/api/paas/v4 |
| 本地 Ollama | http://localhost:11434/v1 |
| 本地 LM Studio | http://localhost:1234/v1 |

### 配置方式

1. **设置页面**: 用户在 `/settings` 页面输入 API Key、Base URL、Model
2. **localStorage**: 配置保存在浏览器 localStorage 中
3. **环境变量**: 构建时可通过 `.env.local` 设置默认值

---

## 七、构建和部署策略

### 开发模式

```bash
# 安装依赖
npm install

# 启动开发服务器（Mock Mode 默认开启）
npm run dev

# 访问
open http://localhost:3000
```

### 生产构建

```bash
# 静态导出（推荐，可部署到任何静态托管）
npm run build

# 输出目录: out/
# 可直接部署到: Vercel, Netlify, GitHub Pages, Cloudflare Pages, 本地 Nginx
```

### next.config.js 配置

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // 静态导出，无需 Node.js 服务器
  images: {
    unoptimized: true,  // 静态导出需要禁用图片优化
  },
  // 如果工作流 JSON 太大，可以考虑拆分
  // experimental: {
  //   optimizePackageImports: ['lucide-react'],
  // },
};

module.exports = nextConfig;
```

### 部署选项

| 方式 | 命令 | 适用场景 |
|------|------|----------|
| Vercel | `vercel deploy` | 最简单，自动 CI/CD |
| Netlify | 拖拽 `out/` 目录 | 免费静态托管 |
| GitHub Pages | 推送到 gh-pages 分支 | 免费，适合开源 |
| 本地 Nginx | `cp -r out/* /var/www/html/` | 离线使用 |
| 本地预览 | `npx serve out` | 本地测试 |

---

## 八、Windows/WSL 兼容方案

### 问题

AI Builder OS 开发在 WSL 环境中，数据资产在 Windows 文件系统 (`/mnt/c/Users/...`)。

### 方案

1. **项目目录**: 在 WSL 文件系统中创建项目 (`~/ai-builder-os/`)，避免 `/mnt/c/` 的性能问题
2. **数据复制**: 使用 ETL 脚本将 Windows 桌面上的资产数据提取为 JSON，复制到项目的 `src/data/` 目录
3. **开发服务器**: 在 WSL 中运行 `npm run dev`，通过 `http://localhost:3000` 在 Windows 浏览器中访问
4. **文件路径**: 所有代码中的路径使用相对路径或 `@/` 别名，不使用绝对路径
5. **换行符**: `.gitattributes` 中设置 `* text=auto`，避免 CRLF/LF 问题

### ETL 脚本

```bash
# 从 Windows 桌面资产提取数据到项目目录
npx tsx scripts/extract-projects.ts

# 输入: /mnt/c/Users/25128/Desktop/AI项目资产库v1/*.md
# 输出: src/data/projects.json
```

### 热重载

WSL 中的 Next.js 开发服务器支持热重载，Windows 浏览器会自动刷新。如果遇到文件监听问题：

```bash
# 在 .env.local 中设置
CHOKIDAR_USEPOLLING=true
```

---

## 九、关键决策摘要

| 决策 | 选择 | 理由 |
|------|------|------|
| 框架 | Next.js 14 App Router | 已有代码可复用，SSG 原生支持 |
| 样式 | Tailwind CSS | 已在 ai-clientops-copilot 中配置好 |
| 数据存储 | 本地 JSON 文件 | 无需后端，Mock Mode 零配置 |
| 数据加载 | SSG 为主 | 首屏快，SEO 友好 |
| LLM Provider | OpenAI-compatible 接口 | 兼容所有主流 LLM 提供商 |
| Mock Mode | 默认开启 | 零配置可运行，无需 API Key |
| 部署 | 静态导出 (output: 'export') | 可部署到任何静态托管 |
| 图表 | 内联 SVG 或 lightweight-charts | 避免引入大型图表库 |
| 组件库 | 自建基础组件 (shadcn/ui 风格) | 控制包大小，避免外部依赖 |

## 十、风险

| 风险 | 影响 | 缓解措施 |
|------|------|----------|
| workflows.json 1.1MB 首次加载慢 | 用户体验差 | 按分类拆分文件，使用动态 import |
| 200 个工作流的 SSG 生成时间长 | 构建慢 | 使用 ISR 或分页 |
| 雷达图组件实现复杂 | 开发周期长 | 使用简单的 SVG 内联实现 |
| Mock Provider 返回内容太假 | 演示效果差 | 设计更好的 Mock 响应模板 |
| WSL 文件监听不稳定 | 热重载失效 | 使用 CHOKIDAR_USEPOLLING |
