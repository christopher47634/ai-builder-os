# AI Builder OS — 资产审计报告

> 审计日期：2026-06-27
> 审计范围：6 个桌面资产目录
> 目标：评估每个资产的内容质量、可整合模块、数据提取需求和已知问题

---

## 一、资产逐项审计

---

### 1. AI项目资产库v1

**路径**: `/mnt/c/Users/25128/Desktop/AI项目资产库v1/`
**文件数量**: 24 个 .md 文件
**总大小**: 1.7 MB
**数据规模**: 100 个项目 × ~50 字段 × 20 个分类方向

**内容质量评估**: ✅ 可用（高质量结构化内容）

**关键发现**:
- 每个项目包含 47 个标准化字段（项目名称、一句话定位、目标用户、痛点、AI介入点、核心功能、MVP范围、V1范围、用户流程、页面结构、数据来源、技术架构、前端建议、后端建议、数据库设计、API设计、风险点、测试方案、部署方案等）
- 七维度评分（简历价值、商业价值、技术成长、接单价值、可开发性、差异化、可复用性）已完整，0-10分制
- 排序文件（z01）提供 5 种维度排序：按简历价值、商业价值、技术成长、接单价值、可开发性
- Top20 文件（z02）筛选了综合评分最高的项目

**能贡献给 AI Builder OS 的模块**:
- **项目浏览器页面**（核心数据源）
- **项目推荐引擎**（多维度排序和筛选）
- **项目详情页**（47 字段完整展示）
- **项目对比功能**（七维度雷达图对比）

**需要结构化提取的字段清单**:
- 项目ID、名称、分类、难度（D）、均分
- 七维度评分：简历价值、商业价值、技术成长、接单价值、可开发性、差异化、可复用性
- 一句话定位、目标用户、痛点、AI介入点
- 核心功能、MVP范围、V1范围、不做什么
- 用户流程、页面结构
- 数据来源、数据结构、是否需要RAG/Agent/工具调用/多模态
- 技术架构、前端/后端/数据库建议
- API设计、关键算法、风险点、幻觉控制方案
- 测试方案、评估指标、部署方案
- 开发难度、预计开发周期、商业价值、收费方式
- 竞品、差异化
- 简历写法、作品集展示方式
- 低配/标准/高配实现方案
- Mock Mode方案、可复用组件、可复用Prompt

**已知问题**:
- ⚠️ 项目 56-100 的部分字段为空（标注为 0⭐ 或 "-"），尤其是医疗健康类（15_）的接单价值全为 "-"
- ⚠️ 部分项目的"一句话定位"字段为空（如 Agent 类的多个项目）
- ⚠️ D（难度）字段部分为 0，语义不明确（是未评分还是最低难度？）

**与其他资产的重叠**:
- 与 V-warfare-system 的 02_AI接单产品库 部分项目重叠（如 AI客服Bot、RAG知识库）
- 与 ai-workflow-templates 部分工作流方向重叠（如客服自动化、内容生成）

---

### 2. V-warfare-system

**路径**: `/mnt/c/Users/25128/Desktop/V-warfare-system/`
**文件数量**: 15 个 .md 文件（含 3 个 audit_report）
**总大小**: 896 KB
**数据规模**: 14 个接单产品、12 类客户画像、100 个客户模拟案例、完整 SOP

**内容质量评估**: ✅ 可用（高质量实战内容，结构化程度中等）

**关键发现**:
- **02_AI接单产品库.md**: 14 个标准化接单产品，每个含产品名称、报价区间、交付周期、难度、目标客户、交付内容、定价策略、防翻车方案、Demo形式、销售话术
- **03_客户画像与销售话术.md**: 12 类客户画像，每类含：最可能付钱的事、AI误解、切入策略、首条私信模板、首次电话流程、预算判断、报价策略、催单话术、成交话术
- **100_客户模拟案例库.md**: 100 个完整案例，每个含 9 个模块：客户画像、客户原话、需求拆解、沟通策略、报价方案、成交话术、交付方案、风险控制、复盘。总计 5546 行，312KB
- **04_交付SOP.md**: 完整的接单交付流程：首次沟通→需求确认→定金→开发→验收→尾款→售后。含需求确认表模板、定金规则、付款规则、项目排期模板
- **05_AI产品经理面试库.md**: 2334 行，203KB 的面试准备材料（自我介绍、项目讲解、行为面试题、案例分析）
- **06_AI产品案例库.md**: 50+ AI 产品案例分析，每个含用户、痛点、AI介入点、功能设计、MVP方案、商业价值、面试讲法
- **01_个人能力地图.md**: V 的技能盘点和定价策略

**能贡献给 AI Builder OS 的模块**:
- **接单产品库页面**（14 个产品 + 定价 + 话术）
- **客户案例库页面**（100 个案例 + 筛选 + 匹配）
- **话术生成器**（基于客户类型的销售话术推荐）
- **报价方案生成器**（基于产品+案例的自动报价）
- **SOP 流程看板**（交付流程可视化）
- **需求接单表单**（结构化需求收集）

**需要结构化提取的字段清单**:
- **ServiceProduct**: id, name, priceRange, deliveryDays, difficulty, targetCustomers, deliverables, pricing{basic,standard,premium}, salesPitch, riskPoints, antiRisk, demoApproach
- **CustomerCase**: id, customerType, name, age, location, industry, description, painPoint, willingness, budget, difficulty, quote{low,standard,high,recommended}, product, deliveryDays, communicationTips, closingScript, riskPoints, keyLearning
- **CustomerProfile**: id, type, willingToPayFor[], aiMisconceptions[], approach, firstMessage, firstCallSteps[], budgetIndicators[], pricingStrategy, closingTactics[]
- **TalkScript**: 话术模板（首条私信、首次电话、报价、催单、成交）按客户类型组织
- **DeliverySOP**: firstContact, depositRules, paymentRules, projectSchedule
- **RiskRule**: 风险等级评估规则、防翻车方案

**已知问题**:
- ⚠️ 100_客户模拟案例库.md 中只有前 35 个案例有完整内容（第一批），后续案例（36-100）的具体内容需要验证是否完整
- ⚠️ 部分文件内容重复度高（03_客户画像与 100_案例库 的客户类型重叠）
- ⚠️ audit_report 文件是批量审计报告，非核心数据

**与其他资产的重叠**:
- 与 ai-clientops-copilot 的数据文件完全重叠（clientops-copilot 的 JSON 数据就是从这些 MD 提取的）
- 与 AI项目资产库v1 的项目方向部分重叠

---

### 3. ai-workflow-templates

**路径**: `/mnt/c/Users/25128/Desktop/ai-workflow-templates/`
**文件数量**: 23 个文件（1 JSON + 21 MD + 1 HTML）
**总大小**: 3.1 MB
**数据规模**: 200 个工作流模板 × 15+ 字段

**内容质量评估**: ✅ 可用（高质量结构化 JSON + 详细 MD 说明）

**关键发现**:
- **data.json** (10546 行, 1.1MB): 包含全部 200 个工作流的结构化数据，按 20 个分类组织
- 每个工作流包含 15+ 字段：id, name, category, targetUser, painPoint, input, output, trigger, steps[], tools[], apis[], promptTemplate, humanCheckpoints, automationBoundary, errorHandling, privacyRisk, timeSaved, pricing, demoApproach, productionApproach, reusableModules[], difficulty, industry[], businessValue
- 20 个分类：邮件自动化、日程管理、文档处理、表格数据、客服自动化、销售自动化、招聘管理、运营自动化、电商运营、内容生产、短视频制作、学术阅读、金融信息、项目管理、数据分析、本地商家、小公司行政、知识库、社媒运营、个人效率
- 每个 MD 分类文件包含 10 个工作流的详细说明（比 JSON 更详细）

**能贡献给 AI Builder OS 的模块**:
- **工作流模板库页面**（200 个模板的浏览和筛选）
- **工作流详情页**（执行步骤、工具链、Prompt 模板、成本估算）
- **工作流与项目关联**（哪些项目可以用哪些工作流实现）
- **工作流可行性评估**（difficulty + businessValue 组合排序）

**需要结构化提取的字段清单**:
- data.json 已经是结构化 JSON，可直接使用
- WorkflowTemplate: id, name, category, targetUser, painPoint, input, output, trigger, steps, tools, apis, promptTemplate, humanCheckpoints, automationBoundary, errorHandling, privacyRisk, timeSaved, pricing, demoApproach, productionApproach, reusableModules, difficulty, industry, businessValue

**已知问题**:
- ⚠️ data.json 是单一 JSON 文件（1.1MB），首次加载较大，需要按需加载或拆分
- ⚠️ 部分工作流的 promptTemplate 字段较长（含完整 Prompt），需要前端截断显示
- ⚠️ difficulty 字段是中文（"入门"/"中级"/"高级"），需要映射为数值

**与其他资产的重叠**:
- 与 V-warfare-system 的接单产品在"客服自动化"、"内容生成"方向有重叠
- 与 AI项目资产库v1 的部分项目方向重叠（如 RAG、客服、数据分析）

---

### 4. ai-eval-bench

**路径**: `/mnt/c/Users/25128/Desktop/ai-eval-bench/`
**文件数量**: 50+ 文件（含 node_modules、dist、dashboard）
**总大小**: 121 MB（主要是 node_modules 和 dashboard/node_modules）
**数据规模**: 6 个评估套件 × 3 个测试用例/套件 = 18 条测试用例（CLI 跑出的）

**内容质量评估**: ✅ 可用（完整的 TypeScript 项目，可复用 Provider 架构）

**关键发现**:
- **完整的 TypeScript 评估框架**：CLI + Provider + Scorer + Evaluator + Reporter 五层架构
- **6 个评估套件**: rag, multiturn, tool, hallucination, safety, malicious
- **7 个评分维度**: correctness, groundedness, safety, instruction_following, completeness, tool_use_accuracy, hallucination_risk
- **11 种错误分类**: hallucination, missing_evidence, wrong_tool_call, unsafe_compliance, over_refusal, under_refusal, incomplete_answer, irrelevant_answer, privacy_leak, prompt_injection_failure, none
- **OpenAI Provider 已实现**: 基于 fetch 的 OpenAI-compatible provider，支持自定义 baseURL/apiKey/model
- **Mock Provider**: 离线测试用，无需 API Key
- **Dashboard**: 基于 Vite + React + Tailwind 的可视化仪表盘，已 build 到 dist/
- **data/ 目录**: 6 个 JSON 文件，每个约 1500-2500 行，包含完整的测试用例
- **reports/**: 已有 latest.json 和 latest.md 报告（18 个测试用例结果）
- **报告格式**: JSON + Markdown + CSV 三种格式

**能贡献给 AI Builder OS 的模块**:
- **评测模块页面**（查看评估结果、按套件筛选、分数分布）
- **Provider 接口设计参考**（OpenAI-compatible provider 可直接复用）
- **评分维度和错误分类体系**（可复用到项目评估）
- **测试用例浏览器**（600 条测试用例的结构化浏览）

**需要结构化提取的字段清单**:
- TestCase: id, scenario_name, user_input, background_knowledge, standard_answer, wrong_answer_example, scoring_rubric, information_to_retrieve, information_not_to_invent, risk_points, pass_criteria, failure_analysis, fix_suggestions
- EvalResult: test_case_id, suite, scenario_name, model_output, standard_answer, scores{dimensions, weighted_score, pass, weights}, errors[], latency_ms, passed
- EvalSuiteSummary: total, passed, pass_rate, avg_score

**已知问题**:
- ⚠️ data/ 目录下的 JSON 文件只有 18 条测试用例（每个套件 3 条），而非 README 中声称的 600 条
- ⚠️ Dashboard 和 CLI 的数据是独立的，Dashboard 读取 public/data/latest.json
- ⚠️ Mock Provider 返回的是固定文本，不是真正的模拟响应
- ⚠️ dist/ 目录已编译，可以直接复用 TypeScript 类型定义

**与其他资产的重叠**:
- 无直接重叠，是独立的评估工具
- 其 Provider 架构可被 AI Builder OS 复用

---

### 5. ai-clientops-copilot

**路径**: `/mnt/c/Users/25128/Desktop/ai-clientops-copilot/`
**文件数量**: 50+ 文件（含 .next build、node_modules）
**总大小**: 343 MB（主要是 node_modules 和 .next cache）
**数据规模**: 7 个页面、4 个 JSON 数据文件

**内容质量评估**: ✅ 可用（可运行的 Next.js 项目，UI 完整，数据已结构化）

**关键发现**:
- **Next.js 14 App Router 项目**：已 build，可直接 npm run dev
- **7 个页面**:
  1. `/` — Dashboard（案例统计、产品列表、客户分布）
  2. `/cases` — 案例库（100 个案例的筛选和详情展开）
  3. `/scripts` — 销售话术库（12 类客户画像 + 切入策略/首次沟通/成交话术/SOP 流程）
  4. `/proposal` — 报价方案生成（选择产品+案例→生成报价）
  5. `/intake` — 需求接单表单（5 步表单：基本信息→需求→技术→交付→预算）
  6. `/delivery` — 交付管理
  7. `/resume` — 简历/作品集展示
- **4 个 JSON 数据文件**（已结构化）:
  - `customerProfiles.json` — 12 类客户画像
  - `products.json` — 14 个接单产品
  - `cases.json` — ~100 个客户案例（结构化版）
  - `sop.json` — 交付 SOP（定金规则、付款规则、项目排期）
- **TypeScript 类型定义**（src/types/index.ts）: Product, CaseStudy, CustomerProfile, SOPData, IntakeFormData
- **分析工具函数**（src/lib/analysis.ts）: analyzeRisk, matchProducts, calculateROI, generateProposalSummary
- **UI 组件**: Sidebar 导航、ThemeProvider 暗色模式、shadcn/ui 风格

**能贡献给 AI Builder OS 的模块**:
- **直接复用的页面**: Dashboard、Cases、Scripts、Proposal、Intake
- **直接复用的数据**: 4 个 JSON 文件 + TypeScript 类型定义
- **直接复用的 UI 模式**: 侧边栏导航、暗色模式、卡片布局、筛选器
- **直接复用的工具函数**: 风险评估、ROI 计算、产品匹配

**需要结构化提取的字段清单**:
- 已经是 JSON 格式，字段已在 src/types/index.ts 中定义

**已知问题**:
- ⚠️ 项目体积巨大（343MB），主要是 node_modules（Next.js 14 + 依赖）
- ⚠️ 没有 README.md 和 PRD.md（文件为空或不存在）
- ⚠️ `/delivery` 和 `/resume` 页面的具体内容需要进一步检查
- ⚠️ 所有页面都是客户端渲染（'use client'），没有 SSG/SSR
- ⚠️ cases.json 只有约 100 条，与 V-warfare-system 的 100_客户模拟案例库.md 对应，但字段经过了结构化处理（丢失了"客户原话"、"需求拆解"等长文本字段）

**与其他资产的重叠**:
- 与 V-warfare-system 的数据完全重叠（JSON 数据就是从 MD 提取的）
- 与 ClientOps-HTML 的 UI 完全重叠（HTML 是这个项目的静态导出）

---

### 6. ClientOps-HTML

**路径**: `/mnt/c/Users/25128/Desktop/ClientOps-HTML/`
**文件数量**: 38 个文件（6 个 HTML + 静态资源）
**总大小**: 1.1 MB
**数据规模**: 与 ai-clientops-copilot 相同（静态导出版）

**内容质量评估**: ⚠️ 可参考（是 ai-clientops-copilot 的静态导出，无需单独整合）

**关键发现**:
- 是 ai-clientops-copilot 的 `next export` 静态版本
- 包含 6 个页面：index（Dashboard）、cases、scripts、proposal、intake、delivery、resume
- 每个页面有 .html 和 .txt 两个版本
- 包含 _next/ 静态资源（JS、CSS）

**能贡献给 AI Builder OS 的模块**:
- 仅作为参考，不直接复用（源码在 ai-clientops-copilot 中）

**已知问题**:
- ⚠️ 是静态导出，功能受限（无动态数据、无 API 调用）
- ⚠️ 与 ai-clientops-copilot 完全重复

**与其他资产的重叠**:
- 与 ai-clientops-copilot 100% 重叠

---

## 二、信息架构（最终产品的页面树）

```
AI Builder OS
├── 🏠 首页/仪表盘 (Dashboard)
│   ├── 核心指标卡片（项目数、工作流数、案例数、产品数）
│   ├── 快速入口（各模块 Top 5）
│   └── 最近更新/推荐
│
├── 📦 AI 项目库 (Projects)
│   ├── 项目列表（20 个分类 Tab + 搜索 + 排序 + 筛选）
│   ├── 项目详情页（47 字段完整展示）
│   ├── 七维度雷达图对比
│   └── 项目推荐（按场景/目标排序）
│
├── 🔧 工作流模板库 (Workflows)
│   ├── 模板列表（20 个分类 + 搜索 + 筛选）
│   ├── 模板详情页（步骤、工具链、Prompt、成本）
│   └── 工作流与项目关联
│
├── 💼 接单工作台 (Freelance)
│   ├── 产品库（14 个接单产品 + 定价）
│   ├── 客户案例库（100 个案例 + 筛选）
│   ├── 销售话术库（12 类客户画像 + 话术模板）
│   ├── 报价方案生成器
│   ├── 需求接单表单
│   └── 交付 SOP 看板
│
├── 🧪 AI 评测 (Eval)
│   ├── 评测结果总览（通过率、分数分布）
│   ├── 套件详情（6 个套件的测试用例）
│   ├── 测试用例浏览器
│   └── Provider 配置
│
├── 📊 数据分析 (Analytics)
│   ├── 项目维度分析（分类分布、难度分布、评分分布）
│   ├── 工作流维度分析（分类分布、工具使用频率）
│   └── 接单维度分析（客户类型分布、产品热度、报价统计）
│
└── ⚙️ 设置 (Settings)
    ├── OpenAI Provider 配置（API Key、Base URL、Model）
    ├── Mock Mode 开关
    └── 数据导入/导出
```

---

## 三、数据流图

```
┌─────────────────────┐     ┌─────────────────────┐     ┌─────────────────────┐
│  AI项目资产库v1      │     │  V-warfare-system    │     │  ai-workflow-        │
│  (24 MD files)       │     │  (15 MD files)       │     │  templates           │
│  100 projects        │     │  100 cases           │     │  (1 JSON + 21 MD)    │
│  7-dim scores        │     │  12 profiles         │     │  200 workflows       │
└─────────┬───────────┘     └─────────┬───────────┘     └─────────┬───────────┘
          │                           │                           │
          ▼                           ▼                           ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                        ETL: 结构化提取 + 清洗                               │
│  - MD → JSON 转换（正则 + 手动校验）                                        │
│  - 字段标准化（难度: 文字→数字, 评分: 统一 0-10）                            │
│  - ID 生成（基于项目名/案例名的 slug）                                       │
│  - 交叉引用建立（项目 ↔ 工作流 ↔ 产品）                                     │
└─────────────────────────────────┬───────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                        /data/ 目录（本地 JSON 文件）                         │
│                                                                             │
│  projects.json          workflows.json         customerCases.json           │
│  customerProfiles.json  serviceProducts.json   evalSuites.json              │
│  sop.json               riskRules.json         talkScripts.json             │
│  deliverySOPs.json                                                            │
└─────────────────────────────────┬───────────────────────────────────────────┘
                                  │
          ┌───────────────────────┼───────────────────────┐
          ▼                       ▼                       ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────────────────┐
│  Next.js SSG    │  │  Client-side    │  │  API Routes (Optional)          │
│  静态生成页面    │  │  动态交互       │  │  /api/eval (评测运行)            │
│  - 项目列表     │  │  - 筛选/排序    │  │  /api/generate (方案生成)        │
│  - 工作流列表   │  │  - 对比/推荐    │  │  /api/provider (LLM 调用)       │
│  - 案例列表     │  │  - 生成方案     │  │                                 │
└─────────────────┘  └─────────────────┘  └─────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                        OpenAI-Compatible Provider                           │
│  (Mock Mode by default, optional live API)                                  │
│  - 话术生成                                                                │
│  - 报价方案生成                                                            │
│  - 项目推荐                                                                │
│  - 评测运行                                                                │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 四、优先级排序

### P0 — 第一阶段（核心功能，必须先做）

| 模块 | 数据源 | 说明 |
|------|--------|------|
| Dashboard 首页 | 所有 JSON | 核心入口，展示统计和快速导航 |
| AI 项目浏览器 | projects.json (100 个项目) | 最大最有价值的数据资产 |
| 工作流模板库 | workflows.json (200 个模板) | 第二大资产，结构化程度最高 |
| 数据 Schema 定义 | TypeScript types | 所有页面的数据基础 |

### P1 — 第二阶段（接单功能）

| 模块 | 数据源 | 说明 |
|------|--------|------|
| 接单产品库 | serviceProducts.json | 14 个产品，可直接复用 ai-clientops-copilot |
| 客户案例库 | customerCases.json | 100 个案例，可直接复用 ai-clientops-copilot |
| 销售话术库 | talkScripts.json + customerProfiles.json | 可直接复用 ai-clientops-copilot |
| 报价方案生成器 | products.json + cases.json | 可直接复用 ai-clientops-copilot |

### P2 — 第三阶段（高级功能）

| 模块 | 数据源 | 说明 |
|------|--------|------|
| 需求接单表单 | 表单数据 → JSON | 可直接复用 ai-clientops-copilot |
| 交付 SOP 看板 | deliverySOPs.json | 可直接复用 ai-clientops-copilot |
| AI 评测模块 | evalSuites.json + Provider | 可复用 ai-eval-bench 架构 |
| 数据分析页 | 所有 JSON | 聚合分析 |

### P3 — 第四阶段（增强功能）

| 模块 | 数据源 | 说明 |
|------|--------|------|
| 项目-工作流关联 | projects + workflows | 建立交叉引用 |
| OpenAI Provider 集成 | 评测 + 生成 | 连接真实 LLM |
| 项目推荐引擎 | projects + 七维度评分 | 智能推荐 |

---

## 五、关键决策摘要

1. **数据提取策略**: AI项目资产库v1 的 MD 文件需要编写 ETL 脚本提取为 JSON；V-warfare-system 的数据已被 ai-clientops-copilot 提取为 JSON，可直接复用
2. **代码复用策略**: ai-clientops-copilot 的页面代码、TypeScript 类型、工具函数可大量复用，但需要重构为统一的 Next.js 项目
3. **评测模块策略**: ai-eval-bench 的 Provider 架构和评分体系可复用，但 Dashboard 需要重写以适配统一 UI
4. **数据文件策略**: 所有 JSON 文件放在 /data/ 目录，使用 Next.js 静态导入（import from JSON），无需后端数据库

## 六、风险

| 风险 | 影响 | 缓解措施 |
|------|------|----------|
| AI项目资产库v1 的 MD→JSON 提取可能丢失字段 | 项目数据不完整 | 编写验证脚本，对比 MD 和 JSON 字段数 |
| 100_客户案例库的后 65 个案例可能不完整 | 案例库质量不一致 | 逐一验证，标记不完整案例 |
| ai-eval-bench 的测试用例只有 18 条（非 600 条） | 评测功能展示有限 | 优先展示已有数据，后续扩展 |
| ai-clientops-copilot 体积 343MB | 开发环境占用大 | 只复用 src/ 和 data/，不复制 node_modules |
| 所有数据都是 Mock/静态数据 | 无法演示真实 AI 功能 | Mock Mode 默认可运行，Provider 接口设计为可插拔 |
