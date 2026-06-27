# Resume Bullets — AI Builder OS

## 中文版

### 偏 AI 产品经理

1. **AI Builder OS 综合工作台**：独立设计面向 AI 产品工程师的综合工作台产品，整合 4 个异构数据源（100 AI 项目、100 客户案例、200 工作流模板、600 评测用例）为 1,000 条统一结构化数据，设计 7 页面信息架构覆盖项目发现、客户分析、方案生成、质量评测和作品集包装全流程。

2. **客户接单分析产品设计**：基于 100 个真实客户模拟案例（覆盖 12 种客户类型）设计规则引擎驱动的客户分析系统，输入客户原始描述输出三层需求分析（表面/真实/隐藏）、风险评估、产品包推荐、报价策略和 SOW 草案，将接单决策流程标准化。

3. **AI 评测体系设计**：设计并整合 600 条多维度 AI 评测基准（RAG 检索、多轮对话、工具调用、幻觉检测、安全边界、恶意输入 6 类 × 100 条），定义评测维度、通过标准和报告格式，预留 OpenAI-compatible Provider 接口支持 Mock 和真实 LLM 双模式。

### 偏 AI 应用工程

1. **全栈 AI 工作台开发**：使用 Next.js 16 App Router + TypeScript（strict mode，零 any 类型）+ Tailwind CSS 构建 7 页面综合工作台，实现静态生成、深色玻璃拟态主题、响应式侧边栏导航，1,000 条数据本地 JSON 加载，npm run build 零错误。

2. **结构化数据工程**：从 Markdown 文档、JSON 数据、TypeScript CLI 等 4 个异构数据源提取并统一 1,000 条结构化数据，编写 Python 提取脚本处理复杂嵌套字段（列表、对象、评分矩阵），定义完整 TypeScript 接口确保类型安全。

3. **前端规则引擎与模板生成**：实现纯前端客户分析规则引擎（关键词匹配 + 模式识别），不依赖外部 LLM；实现简历/作品集/SOW 文案模板生成系统，基于真实项目数据自动填充，支持一键复制。

### 偏创业/自由职业

1. **AI 接单工作台**：构建整合 100 个 AI 项目模板、100 个客户案例、200 个工作流方案和 600 条评测用例的综合工作台，覆盖从客户分析、方案匹配、报价策略到质量评估的接单全流程。

2. **客户分析与报价系统**：基于 100 个真实客户案例构建分析引擎，输入客户原话即可输出需求判断、风险评估、产品包推荐和报价策略，覆盖小公司老板、企业管理层、自由职业者等 12 种客户类型。

3. **AI 项目库与工作流目录**：整理 100 个可开发的 AI 项目（七维度评分体系）和 200 个自动化工作流模板，每个项目包含 MVP 范围、技术栈、部署方案和变现路径，每个工作流包含完整工具链和 Prompt 模板。

---

## English Version

### AI Product Manager Focus

1. **AI Builder OS Product Design**: Independently designed an integrated workbench for AI product engineers, integrating 4 heterogeneous data sources (100 AI projects, 100 client cases, 200 workflow templates, 600 eval cases) into 1,000 unified structured data entries, with a 7-page information architecture covering project discovery, client analysis, solution generation, quality assessment, and portfolio packaging.

2. **Client Intake Analysis System**: Designed a rule-based client analysis system trained on 100 simulated client cases across 12 client types, generating three-layer needs analysis (surface/real/hidden), risk assessment, product recommendations, pricing strategy, and SOW drafts from raw client descriptions.

3. **AI Evaluation Framework**: Designed and integrated 600 multi-dimensional AI evaluation benchmarks across 6 categories (RAG retrieval, multi-turn dialogue, tool calling, hallucination detection, safety boundaries, malicious input), defining evaluation dimensions, pass criteria, and report formats with OpenAI-compatible Provider interface for dual Mock/LLM modes.

### AI Application Engineering Focus

1. **Full-Stack AI Workbench**: Built a 7-page integrated workbench with Next.js 16 App Router, TypeScript (strict mode, zero `any` types), and Tailwind CSS, featuring static generation, dark glass-morphism theme, responsive sidebar navigation, and 1,000 data entries loaded from local JSON with zero external runtime dependencies.

2. **Structured Data Engineering**: Extracted and unified 1,000 structured data entries from 4 heterogeneous sources (Markdown docs, JSON data, TypeScript CLI, Next.js apps), writing Python extraction scripts for complex nested fields and defining complete TypeScript interfaces for type safety.

3. **Frontend Rule Engine & Template Generation**: Implemented a client-side rule engine (keyword matching + pattern recognition) for client analysis without external LLM dependencies; built template-based resume/portfolio/SOW generation system with real project data auto-fill and one-click copy.

### Freelance/Startup Focus

1. **AI Client Acquisition Workbench**: Built an integrated workbench combining 100 AI project templates, 100 client cases, 200 workflow solutions, and 600 eval test cases, covering the full client acquisition workflow from analysis to delivery.

2. **Client Analysis & Pricing Engine**: Constructed an analysis engine from 100 real client cases, outputting needs assessment, risk evaluation, product recommendations, and pricing strategy from client's raw message across 12 client types.

3. **AI Project Library & Workflow Catalog**: Curated 100 developable AI projects (7-dimension scoring) and 200 automation workflow templates, each with MVP scope, tech stack, deployment plan, and monetization path.

---

## 使用建议

| 场景 | 推荐版本 | 条数 |
|------|---------|------|
| AI 产品经理简历 | 偏 PM 版 3 条 | 3 |
| AI 工程师简历 | 偏工程版 3 条 | 3 |
| 自由职业/接单简历 | 偏创业版 3 条 | 3 |
| 作品集详细展示 | 全部 9 条 | 9 |
| LinkedIn About | 英文 PM 版第 1 条 | 1 |

## 注意事项

- 不要写"接入了 OpenAI API"，写"预留 OpenAI-compatible Provider 接口"
- 不要写"AI 驱动的客户分析"，写"规则引擎驱动的客户分析"
- 不要写"1,126 条数据"，写"1,000 条结构化数据"
- 不要写"600 条评测用例已运行"，写"600 条评测用例，支持 Mock 和 LLM 双模式"
