"use client";
import { useState, useMemo } from "react";
import { AIProject } from "@/types";
import projectsData from "@/data/projects.json";

const projects = projectsData as AIProject[];

const categories = [...new Set(projects.map((p) => p.category))].sort();

export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("all");
  const [diffFilter, setDiffFilter] = useState(0);
  const [sortBy, setSortBy] = useState("avgScore");
  const [selectedProject, setSelectedProject] = useState<AIProject | null>(null);
  const [generatedContent, setGeneratedContent] = useState("");
  const [generatedType, setGeneratedType] = useState("");
  const PAGE_SIZE = 20;
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let list = [...projects];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.oneliner?.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }
    if (catFilter !== "all") list = list.filter((p) => p.category === catFilter);
    if (diffFilter > 0) list = list.filter((p) => p.difficulty === diffFilter);

    const sortKeys: Record<string, (p: AIProject) => number> = {
      avgScore: (p) => p.avgScore || 0,
      resumeValue: (p) => p.scores?.resumeValue || 0,
      businessValue: (p) => p.scores?.businessValue || 0,
      techGrowth: (p) => p.scores?.techGrowth || 0,
      freelanceValue: (p) => p.scores?.freelanceValue || 0,
    };
    const fn = sortKeys[sortBy] || sortKeys.avgScore;
    list.sort((a, b) => fn(b) - fn(a));
    return list;
  }, [search, catFilter, diffFilter, sortBy]);

  const generateResume = (p: AIProject) => {
    setGeneratedType("简历 Bullet");
    setGeneratedContent(`【中文简历】
• 开发了${p.name}（${p.englishName || p.category}），${p.oneliner}，采用${p.techStack?.frontend || 'React'} + ${p.techStack?.backend || 'Python'}技术栈，实现${p.mvpScope?.slice(0, 3).join('、') || '核心功能'}

【英文简历】
• Developed ${p.name} (${p.category}), ${p.oneliner?.slice(0, 80)}..., leveraging ${p.techStack?.frontend || 'React'} and ${p.techStack?.backend || 'Python'}

【STAR 面试讲法】
Situation: 在AI应用开发项目中，需要解决${p.painPoints?.slice(0, 2).join('、')}的问题
Task: 设计并实现${p.name}，目标是${p.oneliner?.slice(0, 40)}
Action: 使用${p.techStack?.frontend || 'Next.js'}构建前端，${p.techStack?.backend || 'Python'}实现后端AI逻辑，${p.needsRAG ? '集成RAG检索增强生成' : '设计核心算法'}，${p.mvpScope?.slice(0, 2).join('和') || '完成MVP开发'}
Result: 成功交付可演示的产品原型，覆盖${p.coreFeatures?.length || 3}个核心功能，${p.avgScore >= 7.5 ? '获得高分评价' : '验证了技术可行性'}`);
  };

  const generateMVP = (p: AIProject) => {
    setGeneratedType("MVP 开发计划");
    setGeneratedContent(`【${p.name} MVP 开发计划】

📋 项目定位: ${p.oneliner}

🎯 MVP 功能范围:
${p.mvpScope?.map((f: string, i: number) => `  ${i + 1}. ${f}`).join('\n') || '  1. 核心功能实现\n  2. 基础UI界面\n  3. API对接'}

🛠 技术栈:
  前端: ${p.techStack?.frontend || 'Next.js + Tailwind'}
  后端: ${p.techStack?.backend || 'FastAPI + Python'}
  数据库: ${p.techStack?.database || 'PostgreSQL'}

⏰ 预计周期: ${p.estimatedDuration || '1-2周'}

⚠️ 关键风险:
${p.risks?.slice(0, 3).map((r: string) => `  • ${r}`).join('\n') || '  • 数据质量问题\n  • API限制\n  • 用户体验'}

📦 交付物:
  1. 可运行的Web应用
  2. 源代码 (GitHub)
  3. 部署链接 (Vercel)
  4. 演示视频
  5. README文档`);
  };

  const generatePortfolio = (p: AIProject) => {
    setGeneratedType("作品集介绍");
    setGeneratedContent(`【${p.name} — 作品集展示文案】

## 项目概述
${p.oneliner}

## 解决的问题
${p.painPoints?.slice(0, 3).join('\n') || '针对特定行业的AI应用需求'}

## 核心功能
${p.coreFeatures?.slice(0, 5).map((f: string) => `- ${f}`).join('\n') || '- 智能化处理\n- 用户友好界面\n- 数据驱动决策'}

## 技术亮点
- ${p.needsRAG ? 'RAG检索增强生成技术' : 'AI模型集成'}
- ${p.needsAgent ? 'Agent自主决策架构' : '规则引擎+AI混合方案'}
- ${p.techStack?.frontend || 'React'} + ${p.techStack?.backend || 'Python'} 全栈开发

## GitHub README
\`\`\`
# ${p.name}
${p.oneliner}

## 功能特性
${p.coreFeatures?.slice(0, 4).map((f: string) => `- ✅ ${f}`).join('\n') || '- ✅ 核心功能'}

## 快速开始
\`\`\`bash
npm install && npm run dev
\`\`\`

## 技术栈
- Frontend: ${p.techStack?.frontend || 'Next.js'}
- Backend: ${p.techStack?.backend || 'FastAPI'}
- Database: ${p.techStack?.database || 'PostgreSQL'}
\`\`\``);
  };

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold">AI 项目库</h1>
        <p className="text-sm opacity-50">{projects.length} 个项目 · 20 个方向 · 七维度评分</p>
      </div>

      {/* Filters */}
      <div className="glass-card p-4 flex flex-wrap gap-3 items-center">
        <input
          className="input-glass flex-1 min-w-[200px]"
          placeholder="搜索项目名、定位、分类..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
        />
        <select className="input-glass" value={catFilter} onChange={(e) => { setCatFilter(e.target.value); setPage(1); }}>
          <option value="all">全部分类</option>
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select className="input-glass" value={diffFilter} onChange={(e) => { setDiffFilter(Number(e.target.value)); setPage(1); }}>
          <option value={0}>全部难度</option>
          {[1, 2, 3, 4, 5].map((d) => <option key={d} value={d}>{d}⭐</option>)}
        </select>
        <select className="input-glass" value={sortBy} onChange={(e) => { setSortBy(e.target.value); setPage(1); }}>
          <option value="avgScore">按综合评分</option>
          <option value="resumeValue">按简历价值</option>
          <option value="businessValue">按商业价值</option>
          <option value="techGrowth">按技术成长</option>
          <option value="freelanceValue">按接单价值</option>
        </select>
        <span className="text-xs opacity-50">{filtered.length} 个结果{totalPages > 1 ? ` · 第 ${page}/${totalPages} 页` : ""}</span>
      </div>

      {/* Project Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {paged.map((p) => (
          <div key={p.id} className="glass-card p-4 cursor-pointer" onClick={() => { setSelectedProject(p); setGeneratedContent(""); }}>
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold truncate">{p.name}</h3>
                <p className="text-xs opacity-50">{p.category}</p>
              </div>
              <span className="badge badge-blue ml-2">{p.avgScore?.toFixed(1)}</span>
            </div>
            <p className="text-xs opacity-70 mb-3 line-clamp-2">{p.oneliner}</p>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs">难度: {"⭐".repeat(p.difficulty || 0)}</span>
              {p.needsRAG && <span className="badge badge-green">RAG</span>}
              {p.needsAgent && <span className="badge badge-purple">Agent</span>}
              {p.needsMultimodal && <span className="badge badge-orange">多模态</span>}
            </div>
            {/* Score bars */}
            <div className="grid grid-cols-2 gap-x-3 gap-y-1">
              {[
                { label: "简历", val: p.scores?.resumeValue },
                { label: "商业", val: p.scores?.businessValue },
                { label: "技术", val: p.scores?.techGrowth },
                { label: "接单", val: p.scores?.freelanceValue },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-1">
                  <span className="text-[10px] opacity-40 w-6">{s.label}</span>
                  <div className="flex-1 score-bar">
                    <div className="score-bar-fill bg-[var(--accent)]" style={{ width: `${((s.val || 0) / 10) * 100}%` }} />
                  </div>
                  <span className="text-[10px] font-mono w-4 text-right">{s.val || 0}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button className="btn-secondary text-xs" disabled={page <= 1} onClick={() => setPage(page - 1)}>← 上一页</button>
          <span className="text-xs opacity-50">第 {page} / {totalPages} 页</span>
          <button className="btn-secondary text-xs" disabled={page >= totalPages} onClick={() => setPage(page + 1)}>下一页 →</button>
        </div>
      )}

      {/* Detail Modal */}
      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-lg font-bold">{selectedProject.name}</h2>
                <p className="text-xs opacity-50">{selectedProject.category} · ID: {selectedProject.id}</p>
              </div>
              <button onClick={() => setSelectedProject(null)} className="text-xl opacity-50 hover:opacity-100">✕</button>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <h3 className="font-semibold text-[var(--accent)] mb-1">一句话定位</h3>
                <p className="opacity-80">{selectedProject.oneliner}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-[var(--accent)] mb-1">目标用户</h3>
                  <ul className="opacity-80 space-y-1">
                    {selectedProject.targetUsers?.map((u: string, i: number) => <li key={i}>• {u}</li>)}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--accent)] mb-1">技术需求</h3>
                  <div className="flex flex-wrap gap-1">
                    {selectedProject.needsRAG && <span className="badge badge-green">RAG</span>}
                    {selectedProject.needsAgent && <span className="badge badge-purple">Agent</span>}
                    {selectedProject.needsToolCalling && <span className="badge badge-blue">工具调用</span>}
                    {selectedProject.needsMultimodal && <span className="badge badge-orange">多模态</span>}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-[var(--accent)] mb-1">七维度评分</h3>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "简历价值", val: selectedProject.scores?.resumeValue },
                    { label: "商业价值", val: selectedProject.scores?.businessValue },
                    { label: "技术成长", val: selectedProject.scores?.techGrowth },
                    { label: "接单价值", val: selectedProject.scores?.freelanceValue },
                    { label: "可开发性", val: selectedProject.scores?.developability },

                  ].map((s) => (
                    <div key={s.label} className="flex items-center gap-2">
                      <span className="text-xs w-16 opacity-60">{s.label}</span>
                      <div className="flex-1 score-bar">
                        <div className="score-bar-fill bg-[var(--accent)]" style={{ width: `${((s.val || 0) / 10) * 100}%` }} />
                      </div>
                      <span className="text-xs font-mono w-6 text-right">{s.val || 0}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-[var(--accent)] mb-1">痛点</h3>
                <p className="opacity-80 whitespace-pre-line">{selectedProject.painPoints?.join('\n')}</p>
              </div>

              <div>
                <h3 className="font-semibold text-[var(--accent)] mb-1">核心功能</h3>
                <ul className="opacity-80 space-y-1">
                  {selectedProject.coreFeatures?.map((f: string, i: number) => <li key={i}>• {f}</li>)}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-[var(--accent)] mb-1">技术栈</h3>
                <div className="opacity-80 space-y-1">
                  <p>前端: {selectedProject.techStack?.frontend || "未指定"}</p>
                  <p>后端: {selectedProject.techStack?.backend || "未指定"}</p>
                  <p>数据库: {selectedProject.techStack?.database || "未指定"}</p>
                </div>
              </div>

              {/* Generate buttons */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-[var(--card-border)]">
                <button className="btn-primary" onClick={() => generateResume(selectedProject)}>📝 生成简历 Bullet</button>
                <button className="btn-primary" onClick={() => generateMVP(selectedProject)}>📋 生成 MVP 计划</button>
                <button className="btn-primary" onClick={() => generatePortfolio(selectedProject)}>🎨 生成作品集介绍</button>
              </div>

              {/* Generated content */}
              {generatedContent && (
                <div className="glass-card p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-[var(--accent-green)]">{generatedType}</h3>
                    <button className="btn-secondary text-xs" onClick={() => { navigator.clipboard.writeText(generatedContent); }}>📋 复制</button>
                  </div>
                  <pre className="text-xs opacity-80 whitespace-pre-wrap font-mono">{generatedContent}</pre>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
