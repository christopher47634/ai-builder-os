"use client";
import { useState } from "react";

interface Section {
  id: string;
  title: string;
  icon: string;
  content: string;
}

function generateSections(): Section[] {
  return [
    {
      id: "cn-resume",
      title: "中文简历 Bullets",
      icon: "🇨🇳",
      content: `• 独立设计并开发 AI Builder OS 全栈资产管理系统，整合 100 个 AI 项目方案、200 个工作流模板、100 个客户案例、600 条评测用例，采用 Next.js + TypeScript + Tailwind CSS 技术栈，实现深色主题玻璃拟态 UI

• 构建多维度 AI 项目评估体系，设计七维度评分算法（简历价值、商业价值、技术成长、接单价值、可开发性、差异化、可复用性），覆盖 20 个技术方向，辅助 AI 从业者高效选型

• 开发智能客户接单分析引擎，基于 100 个真实案例构建需求解析、风险评估、产品匹配和自动报价系统，支持输入客户原话即时生成 SOW 草案和成交话术

• 搭建 AI 评测基础设施（Eval Bench），设计 6 大维度 600 条测试用例（RAG、多轮对话、工具调用、幻觉检测、安全边界、恶意输入），兼容 OpenAI-compatible API，支持 Mock/真实 LLM 双模式

• 基于 200 个工作流模板构建 Prompt 工程知识库，覆盖邮件自动化、客户管理、内容生成等场景，每个工作流包含完整步骤、工具链、API 设计和可复用模块`,
    },
    {
      id: "en-resume",
      title: "英文简历 Bullets",
      icon: "🇺🇸",
      content: `• Architected and developed AI Builder OS, a full-stack asset management platform integrating 100 AI project blueprints, 200 workflow templates, 100 client cases, and 600 eval test cases using Next.js, TypeScript, and Tailwind CSS with dark-mode glassmorphism UI

• Designed a 7-dimension scoring algorithm for AI project evaluation (resume value, business value, tech growth, freelance value, developability, differentiation, reusability) covering 20 technology verticals to assist AI practitioners in project selection

• Built an intelligent client intake analysis engine powered by 100 real-world cases, featuring automated need parsing, risk assessment, product matching, and quote generation with SOW draft and closing script output

• Developed an AI evaluation benchmark (Eval Bench) with 600 test cases across 6 dimensions (RAG, multi-turn dialogue, tool calling, hallucination, safety, malicious input), compatible with OpenAI-compatible APIs and supporting mock/real LLM dual-mode operation

• Constructed a Prompt engineering knowledge base from 200 workflow templates spanning email automation, customer management, and content generation, each with complete step-by-step flows, tool chains, API designs, and reusable modules`,
    },
    {
      id: "star",
      title: "5 分钟面试讲法 (STAR)",
      icon: "🎤",
      content: `【Situation — 背景】
在 AI 应用开发快速发展的背景下，我发现很多 AI 从业者面临三个痛点：项目选择困难（不知道做什么）、接单效率低（不了解行情和定价）、缺乏系统化的评测和工作流模板。市面上虽然有很多零散资源，但没有一个统一的系统把这些资源整合起来。

【Task — 任务】
我决定构建一个"AI Builder 操作系统"——一个集项目库、工作流库、客户案例库、评测基准于一体的全栈平台，目标是让 AI 开发者能在一个系统里完成选项目、学工作流、接客户、跑评测的全流程。

【Action — 行动】
1. 数据工程：从原始 Markdown 文档中提取并结构化 100 个项目方案、200 个工作流、100 个客户案例、600 条评测用例
2. 系统设计：用 Next.js + TypeScript 构建 7 个功能页面，设计七维度评分算法
3. 核心功能：开发了智能接单分析（输入客户原话 → 风险评估 + 报价建议）、工作流搜索筛选、评测 Mock 系统
4. UI/UX：深色主题 + 玻璃拟态设计，响应式布局，移动端适配

【Result — 结果】
成功交付了一个包含 7 个页面、4 个数据源、1000+ 数据条目的完整系统，npm run build 零错误通过。该系统既是实用工具，也是展示全栈开发能力的作品集项目。`,
    },
    {
      id: "readme",
      title: "GitHub README",
      icon: "📄",
      content: `# 🚀 AI Builder OS

> AI 项目资产管理系统 — 为 AI 开发者打造的一站式工作台

## ✨ 功能特性

- 📦 **AI 项目库** — 100 个项目方案，七维度评分，20 个技术方向
- 🔧 **工作流模板** — 200 个自动化工作流，含 Prompt 模板和工具链
- 💼 **客户接单** — 100 个真实案例，智能需求分析 + 自动报价
- 🧪 **AI Eval Bench** — 600 条评测用例，6 大维度，OpenAI-compatible
- 📝 **作品集生成** — 一键生成简历 bullets、面试话术、README
- ✅ **验收看板** — 项目状态总览，构建状态检查

## 🛠 技术栈

- **Frontend**: Next.js 16 + TypeScript + Tailwind CSS
- **数据**: 本地 JSON（无需数据库）
- **样式**: 深色主题 + 玻璃拟态 (Glass Morphism)
- **部署**: 支持 Vercel / 任意静态托管

## 🚀 快速开始

\`\`\`bash
npm install
npm run dev      # 开发模式
npm run build    # 构建检查
\`\`\`

## 📊 数据规模

| 数据源 | 数量 | 说明 |
|--------|------|------|
| AI 项目 | 100 | 七维度评分、技术栈、MVP 计划 |
| 工作流模板 | 200 | Prompt 模板、工具链、步骤详解 |
| 客户案例 | 100 | 报价方案、成交话术、风险控制 |
| 评测用例 | 600 | RAG/对话/工具/幻觉/安全/恶意 |

## 📁 项目结构

\`\`\`
src/
├── app/          # 7 个页面（Next.js App Router）
├── data/         # JSON 数据文件
├── types/        # TypeScript 类型定义
└── components/   # 共享组件
\`\`\``,
    },
    {
      id: "portfolio",
      title: "作品集首页文案",
      icon: "🎨",
      content: `# AI Builder OS — 我的 AI 全栈作品

## 这是什么？

一个为 AI 开发者打造的一站式工作台，整合了项目选型、工作流模板、客户接单、AI 评测四大核心场景。

## 为什么做这个？

在做 AI 应用开发的过程中，我发现：
1. 选项目靠感觉，没有系统的评估框架
2. 接单凭经验，新入行者缺乏参考
3. 工作流散落各处，没有统一的模板库
4. AI 评测没有标准化的测试集

所以我把这些问题整合到一个系统中解决。

## 技术亮点

- 🏗 Next.js 16 App Router + TypeScript 全栈类型安全
- 🎨 深色玻璃拟态 UI，响应式设计
- 📊 七维度评分算法，100 个项目的量化评估
- 🤖 600 条 AI 评测用例，覆盖 6 大安全维度
- 💡 200 个工作流模板，含完整 Prompt 工程

## 数据说话

- 100 个 AI 项目方案
- 200 个自动化工作流
- 100 个客户案例
- 600 条评测用例
- 7 个功能页面
- 0 外部依赖（纯本地 JSON）`,
    },
    {
      id: "screenshots",
      title: "截图清单",
      icon: "📸",
      content: `建议截取以下截图用于作品集展示：

1. 🖥 Dashboard 全屏截图（深色主题 + 统计卡片 + 快捷入口）
2. 📦 AI 项目库 — 项目卡片网格 + 评分条
3. 📦 项目详情弹窗 — 七维度评分 + 技术栈
4. 🔧 工作流模板库 — 搜索筛选 + 卡片列表
5. 🔧 工作流详情展开 — Prompt 模板 + 步骤列表
6. 💼 客户接单分析 — 输入客户原话 + 分析结果
7. 💼 客户案例库 — 案例卡片网格
8. 🧪 AI Eval Bench — 6 类评测统计卡片
9. 🧪 Mock 评测结果 — 通过率 + 失败 Top 5
10. 📝 作品集生成 — 简历 Bullets + 面试话术
11. ✅ 验收状态 — 模块完成度表
12. 📱 移动端适配截图（竖屏展示）

截图建议：
- 使用 1440x900 或 1920x1080 分辨率
- 确保深色主题一致
- 可以标注重点功能区域
- 移动端截图用 iPhone 14 模拟器`,
    },
    {
      id: "demo",
      title: "5 分钟演示脚本",
      icon: "🎬",
      content: `【0:00-0:30】开场
"大家好，今天给大家展示我独立开发的 AI Builder OS。这是一个为 AI 开发者打造的一站式工作台，整合了 100 个项目方案、200 个工作流、100 个客户案例和 600 条评测用例。"

【0:30-1:30】Dashboard + 项目库
"先看 Dashboard，四个核心数据卡片一目了然。点击进入 AI 项目库，这里展示了 100 个项目，每个都有七维度评分。支持按分类、难度、评分排序和筛选。"（演示搜索和筛选）

【1:30-2:30】工作流 + 接单分析
"工作流模板库有 200 个工作流，点击展开可以看到完整的 Prompt 模板和步骤。"（演示展开详情 + 复制 Prompt）
"客户接单分析是最实用的功能——输入客户的原话，系统自动分析需求类型、评估风险、匹配产品、生成报价建议。"（演示输入分析）

【2:30-3:30】评测系统
"AI Eval Bench 包含 600 条评测用例，覆盖 RAG、多轮对话、工具调用、幻觉检测、安全边界、恶意输入六大维度。"（演示运行 Mock 评测）

【3:30-4:30】作品集 + 状态
"作品集页面可以一键生成中英文简历 bullets、STAR 面试话术、GitHub README。验收状态页面展示整个系统的模块完成度。"

【4:30-5:00】总结
"整个系统用 Next.js + TypeScript 构建，纯本地 JSON 数据，零外部依赖，npm run build 零错误。感谢观看！"`,
    },
  ];
}

export default function PortfolioPage() {
  const sections = generateSections();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold">作品集与简历生成</h1>
        <p className="text-sm opacity-50">基于项目数据自动生成简历 bullets、面试话术、README 文案</p>
      </div>

      <div className="space-y-4">
        {sections.map((section) => (
          <div key={section.id} className="glass-card p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-semibold flex items-center gap-2">
                <span>{section.icon}</span> {section.title}
              </h2>
              <button
                className="btn-secondary text-xs"
                onClick={() => copyToClipboard(section.id, section.content)}
              >
                {copiedId === section.id ? "✅ 已复制" : "📋 复制"}
              </button>
            </div>
            <pre className="text-xs opacity-80 whitespace-pre-wrap font-mono bg-[rgba(0,0,0,0.2)] rounded-lg p-4 max-h-[400px] overflow-y-auto">
              {section.content}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}
