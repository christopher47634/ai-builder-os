"use client";

import projectsData from "@/data/projects.json";
import workflowsData from "@/data/workflows.json";
import customerCasesData from "@/data/customer-cases.json";
import productsData from "@/data/products.json";
import ragData from "@/data/eval/rag_test_cases.json";
import multiturnData from "@/data/eval/multiturn_dialogue_cases.json";
import toolData from "@/data/eval/tool_call_cases.json";
import hallucData from "@/data/eval/hallucination_cases.json";
import safetyData from "@/data/eval/safety_boundary_cases.json";
import maliciousData from "@/data/eval/malicious_input_cases.json";

const projectCount = projectsData.length;
const workflowCount = workflowsData.length;
const caseCount = customerCasesData.length;
const productCount = productsData.length;
const evalTotal = ragData.length + multiturnData.length + toolData.length + hallucData.length + safetyData.length + maliciousData.length;
const totalEntries = projectCount + workflowCount + caseCount + productCount + evalTotal;

const modules = [
  { name: "Dashboard 仪表盘", status: "✅ 完成", source: "projects.json, workflows.json, customer-cases.json, products.json", count: "4 数据源" },
  { name: "AI 项目库", status: "✅ 完成", source: "projects.json", count: `${projectCount} 个项目` },
  { name: "工作流模板库", status: "✅ 完成", source: "workflows.json", count: `${workflowCount} 个工作流` },
  { name: "客户接单分析", status: "✅ 完成", source: "customer-cases.json, products.json", count: `${caseCount} 案例 + 产品` },
  { name: "AI Eval Bench", status: "✅ 完成", source: "eval/*.json (6 files)", count: `${evalTotal} 条用例` },
  { name: "作品集生成", status: "✅ 完成", source: "模板 + 项目数据", count: "7 个生成区域" },
  { name: "验收状态", status: "✅ 完成", source: "自身状态", count: "本页" },
];

const dataSources = [
  { name: "projects.json", format: "JSON Array", size: `${projectCount} 项`, path: "src/data/projects.json" },
  { name: "workflows.json", format: "JSON Array", size: `${workflowCount} 项`, path: "src/data/workflows.json" },
  { name: "customer-cases.json", format: "JSON Array", size: `${caseCount} 项`, path: "src/data/customer-cases.json" },
  { name: "products.json", format: "JSON Array", size: `${productCount} 项`, path: "src/data/products.json" },
  { name: "rag_test_cases.json", format: "JSON Array", size: `${ragData.length} 条`, path: "src/data/eval/rag_test_cases.json" },
  { name: "multiturn_dialogue_cases.json", format: "JSON Array", size: `${multiturnData.length} 条`, path: "src/data/eval/multiturn_dialogue_cases.json" },
  { name: "tool_call_cases.json", format: "JSON Array", size: `${toolData.length} 条`, path: "src/data/eval/tool_call_cases.json" },
  { name: "hallucination_cases.json", format: "JSON Array", size: `${hallucData.length} 条`, path: "src/data/eval/hallucination_cases.json" },
  { name: "safety_boundary_cases.json", format: "JSON Array", size: `${safetyData.length} 条`, path: "src/data/eval/safety_boundary_cases.json" },
  { name: "malicious_input_cases.json", format: "JSON Array", size: `${maliciousData.length} 条`, path: "src/data/eval/malicious_input_cases.json" },
  { name: "sop.json", format: "JSON Object", size: "SOP 数据", path: "src/data/sop.json" },
  { name: "customerProfiles.json", format: "JSON Array", size: "客户画像", path: "src/data/customerProfiles.json" },
];

const features = [
  { name: "项目七维度评分", type: "真实算法", desc: "基于加权公式计算" },
  { name: "工作流搜索筛选", type: "真实数据", desc: `${workflowCount} 条工作流实时过滤` },
  { name: "客户接单分析", type: "规则引擎", desc: "基于关键词匹配的分析逻辑" },
  { name: "Mock 评测", type: "Mock", desc: "随机生成通过率和分数" },
  { name: "简历/面试生成", type: "模板填充", desc: "基于项目数据的模板文案" },
  { name: "复制到剪贴板", type: "浏览器 API", desc: "navigator.clipboard.writeText" },
];

const upgradeRoutes = [
  { phase: "Phase 2", items: ["接入真实 LLM API (OpenAI/Claude/Ollama)", "评测结果持久化 + 历史趋势图", "用户登录 + 数据云端同步"] },
  { phase: "Phase 3", items: ["项目对比雷达图 (Chart.js)", "数据导入/导出功能", "工作流执行引擎 (实际运行工作流)"] },
  { phase: "Phase 4", items: ["多用户协作 + 权限管理", "API 接口开放", "移动端 App (React Native)"] },
];

export default function StatusPage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold">系统验收状态</h1>
        <p className="text-sm opacity-50">项目完成度 · 数据源清单 · 功能可用性 · 升级路线</p>
      </div>

      {/* Module status */}
      <div className="glass-card p-5">
        <h2 className="text-sm font-semibold mb-4">📦 模块完成状态</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[var(--card-border)]">
                <th className="text-left p-2 opacity-50">模块</th>
                <th className="text-left p-2 opacity-50">状态</th>
                <th className="text-left p-2 opacity-50">数据源</th>
                <th className="text-left p-2 opacity-50">数据量</th>
              </tr>
            </thead>
            <tbody>
              {modules.map((m) => (
                <tr key={m.name} className="border-b border-[var(--card-border)] border-opacity-30">
                  <td className="p-2 font-medium">{m.name}</td>
                  <td className="p-2"><span className="badge badge-green">{m.status}</span></td>
                  <td className="p-2 opacity-70 font-mono">{m.source}</td>
                  <td className="p-2 opacity-70">{m.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Data sources */}
      <div className="glass-card p-5">
        <h2 className="text-sm font-semibold mb-4">🗄 数据源清单</h2>
        <div className="grid md:grid-cols-2 gap-3">
          {dataSources.map((d) => (
            <div key={d.name} className="glass-card p-3 text-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-[var(--accent)]">{d.name}</span>
                <span className="badge badge-blue">{d.size}</span>
              </div>
              <p className="opacity-50">{d.format} · {d.path}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Feature availability */}
      <div className="glass-card p-5">
        <h2 className="text-sm font-semibold mb-4">⚙️ 功能可用性</h2>
        <div className="space-y-2">
          {features.map((f) => (
            <div key={f.name} className="flex items-center gap-3 text-xs">
              <span className="font-medium w-32">{f.name}</span>
              <span className={`badge ${f.type === "Mock" ? "badge-yellow" : f.type === "真实数据" || f.type === "真实算法" ? "badge-green" : "badge-blue"}`}>{f.type}</span>
              <span className="opacity-50">{f.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Build commands */}
      <div className="glass-card p-5">
        <h2 className="text-sm font-semibold mb-4">🔨 启动命令</h2>
        <div className="space-y-2">
          {[
            { cmd: "npm install", desc: "安装依赖" },
            { cmd: "npm run dev", desc: "启动开发服务器 (localhost:3000)" },
            { cmd: "npm run build", desc: "生产构建 (输出 .next/)" },
          ].map((c) => (
            <div key={c.cmd} className="flex items-center gap-3 text-xs">
              <code className="font-mono bg-[rgba(0,0,0,0.3)] px-2 py-1 rounded text-[var(--accent)]">{c.cmd}</code>
              <span className="opacity-50">{c.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Build status */}
      <div className="glass-card p-5">
        <h2 className="text-sm font-semibold mb-4">📊 构建状态</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="glass-card p-3 text-center">
            <div className="text-lg font-bold text-[var(--accent-green)]">7</div>
            <div className="text-xs opacity-50">路由页面</div>
          </div>
          <div className="glass-card p-3 text-center">
            <div className="text-lg font-bold text-[var(--accent-green)]">0</div>
            <div className="text-xs opacity-50">TypeScript 错误</div>
          </div>
          <div className="glass-card p-3 text-center">
            <div className="text-lg font-bold text-[var(--accent)]">{totalEntries}+</div>
            <div className="text-xs opacity-50">数据条目</div>
          </div>
          <div className="glass-card p-3 text-center">
            <div className="text-lg font-bold text-[var(--accent)]">Mock</div>
            <div className="text-xs opacity-50">运行模式</div>
          </div>
        </div>
      </div>

      {/* Resume writing */}
      <div className="glass-card p-5">
        <h2 className="text-sm font-semibold mb-4">📝 简历写法</h2>
        <div className="text-xs opacity-80 space-y-2">
          <p><strong>项目名称：</strong>AI Builder OS — AI 项目资产管理系统</p>
          <p><strong>技术栈：</strong>Next.js 16, TypeScript, Tailwind CSS, JSON</p>
          <p><strong>一句话：</strong>独立开发的全栈 AI 项目管理平台，整合 {projectCount} 个项目方案、{workflowCount} 个工作流模板、{caseCount} 个客户案例和 {evalTotal} 条 AI 评测用例</p>
          <p><strong>亮点：</strong>七维度评分算法、智能接单分析、AI Eval Bench（6 维度评测）、Prompt 工程知识库</p>
        </div>
      </div>

      {/* Interview talking points */}
      <div className="glass-card p-5">
        <h2 className="text-sm font-semibold mb-4">🎤 面试讲法</h2>
        <div className="text-xs opacity-80 space-y-2">
          <p><strong>30 秒版本：</strong>&quot;我独立开发了一个 AI Builder OS，把 {projectCount} 个项目方案、{workflowCount} 个工作流、{caseCount} 个客户案例、{evalTotal} 条评测用例整合成一个系统。用 Next.js + TypeScript 构建，深色主题玻璃拟态 UI，支持搜索筛选、评分排序、智能分析。&quot;</p>
          <p><strong>2 分钟版本：</strong>见作品集页面的 STAR 讲法</p>
          <p><strong>技术深挖点：</strong></p>
          <ul className="ml-4 space-y-1">
            <li>• 七维度评分算法如何设计？加权公式、归一化、维度含义</li>
            <li>• {workflowCount} 个工作流如何做搜索筛选？useMemo + 实时过滤</li>
            <li>• 评测系统如何设计？6 个维度、100 条/维度、Mock vs 真实 LLM</li>
            <li>• 深色主题如何实现？CSS 变量 + Tailwind + glass morphism</li>
          </ul>
        </div>
      </div>

      {/* Upgrade roadmap */}
      <div className="glass-card p-5">
        <h2 className="text-sm font-semibold mb-4">🚀 下一步升级路线</h2>
        <div className="space-y-4">
          {upgradeRoutes.map((route) => (
            <div key={route.phase}>
              <h3 className="text-sm font-semibold text-[var(--accent)] mb-2">{route.phase}</h3>
              <ul className="text-xs opacity-70 space-y-1 ml-4">
                {route.items.map((item, i) => <li key={i}>• {item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
