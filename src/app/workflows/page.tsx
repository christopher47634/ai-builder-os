"use client";
import { useState, useMemo } from "react";
import { WorkflowTemplate } from "@/types";
import workflowsData from "@/data/workflows.json";

const workflows = workflowsData as WorkflowTemplate[];
const categories = [...new Set(workflows.map((w) => w.category))].sort();
const difficulties = [...new Set(workflows.map((w) => w.difficulty))].filter(Boolean).sort();

const PAGE_SIZE = 20;

export default function WorkflowsPage() {
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("all");
  const [diffFilter, setDiffFilter] = useState("all");
  const [bizFilter, setBizFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let list = [...workflows];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((w) =>
        w.name?.toLowerCase().includes(q) ||
        w.painPoint?.toLowerCase().includes(q) ||
        w.category?.toLowerCase().includes(q) ||
        w.targetUser?.toLowerCase().includes(q)
      );
    }
    if (catFilter !== "all") list = list.filter((w) => w.category === catFilter);
    if (diffFilter !== "all") list = list.filter((w) => w.difficulty === diffFilter);
    if (bizFilter !== "all") list = list.filter((w) => w.businessValue === bizFilter);
    return list;
  }, [search, catFilter, diffFilter, bizFilter]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const copyPrompt = (id: string, template: string) => {
    navigator.clipboard.writeText(template || "");
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold">工作流模板库</h1>
        <p className="text-sm opacity-50">{workflows.length} 个工作流 · {categories.length} 个类别 · 搜索筛选 + 详情展开</p>
      </div>

      {/* Filters */}
      <div className="glass-card p-4 flex flex-wrap gap-3 items-center">
        <input
          className="input-glass flex-1 min-w-[200px]"
          placeholder="搜索工作流名称、痛点、类别..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
        />
        <select className="input-glass" value={catFilter} onChange={(e) => { setCatFilter(e.target.value); setPage(1); }}>
          <option value="all">全部类别</option>
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select className="input-glass" value={diffFilter} onChange={(e) => { setDiffFilter(e.target.value); setPage(1); }}>
          <option value="all">全部难度</option>
          {difficulties.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
        <select className="input-glass" value={bizFilter} onChange={(e) => { setBizFilter(e.target.value); setPage(1); }}>
          <option value="all">全部商业价值</option>
          {["高", "中", "低"].map((b) => <option key={b} value={b}>{b}</option>)}
        </select>
        <span className="text-xs opacity-50">{filtered.length} 个结果</span>
      </div>

      {/* Workflow cards */}
      <div className="space-y-3">
        {paged.map((w) => (
          <div key={w.id} className="glass-card">
            <div
              className="p-4 cursor-pointer"
              onClick={() => setExpanded(expanded === w.id ? null : w.id)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold">{w.name}</h3>
                  <p className="text-xs opacity-50">{w.category} · {w.targetUser?.split("\n")[0]?.replace(/^- /, "")}</p>
                </div>
                <div className="flex gap-2 ml-2">
                  {w.businessValue && <span className={`badge ${w.businessValue === "高" ? "badge-green" : w.businessValue === "中" ? "badge-blue" : "badge-yellow"}`}>{w.businessValue}</span>}
                  {w.difficulty && <span className="badge badge-purple">{w.difficulty}</span>}
                  <span className="text-xs opacity-30">{expanded === w.id ? "▲" : "▼"}</span>
                </div>
              </div>
              <p className="text-xs opacity-70 line-clamp-2">{w.painPoint}</p>
            </div>

            {/* Expanded details */}
            {expanded === w.id && (
              <div className="border-t border-[var(--card-border)] p-4 space-y-4 text-sm">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-[var(--accent)] mb-1">📥 输入</h4>
                    <p className="opacity-80 whitespace-pre-line text-xs">{w.input}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--accent)] mb-1">📤 输出</h4>
                    <p className="opacity-80 whitespace-pre-line text-xs">{w.output}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--accent)] mb-1">⚡ 触发条件</h4>
                    <p className="opacity-80 text-xs">{w.trigger}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--accent)] mb-1">⏱ 预计节省时间</h4>
                    <p className="opacity-80 text-xs">{w.timeSaved}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-[var(--accent)] mb-1">📋 步骤</h4>
                  <ol className="opacity-80 text-xs space-y-1">
                    {(w.steps || []).map((s: string, i: number) => <li key={i}>{i + 1}. {s}</li>)}
                  </ol>
                </div>

                <div className="flex flex-wrap gap-4">
                  <div>
                    <h4 className="font-semibold text-[var(--accent)] mb-1">🛠 工具</h4>
                    <div className="flex flex-wrap gap-1">
                      {(w.tools || []).map((t: string, i: number) => <span key={i} className="badge badge-blue">{t}</span>)}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--accent)] mb-1">🔌 API</h4>
                    <div className="flex flex-wrap gap-1">
                      {(w.apis || []).map((a: string, i: number) => <span key={i} className="badge badge-green">{a}</span>)}
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-[var(--accent)] mb-1">🛡 人工检查点</h4>
                    <p className="opacity-80 text-xs">{w.humanCheckpoints}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--accent)] mb-1">🔒 隐私风险</h4>
                    <p className="opacity-80 text-xs">{w.privacyRisk}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--accent)] mb-1">🚧 自动化边界</h4>
                    <p className="opacity-80 text-xs">{w.automationBoundary}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--accent)] mb-1">⚠️ 错误处理</h4>
                    <p className="opacity-80 text-xs">{w.errorHandling}</p>
                  </div>
                </div>

                {w.promptTemplate && (
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-[var(--accent)]">🤖 Prompt 模板</h4>
                      <button
                        className="btn-secondary text-xs"
                        onClick={() => copyPrompt(w.id, w.promptTemplate)}
                      >
                        {copiedId === w.id ? "✅ 已复制" : "📋 复制 Prompt"}
                      </button>
                    </div>
                    <pre className="glass-card p-3 text-xs opacity-80 whitespace-pre-wrap font-mono max-h-[200px] overflow-y-auto">{w.promptTemplate}</pre>
                  </div>
                )}

                <div className="flex flex-wrap gap-4 text-xs opacity-60">
                  <span>💰 定价: {w.pricing}</span>
                  <span>🎬 Demo: {w.demoApproach}</span>
                  <span>🚀 生产: {w.productionApproach}</span>
                </div>

                {w.reusableModules?.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-[var(--accent)] mb-1">♻️ 可复用模块</h4>
                    <div className="flex flex-wrap gap-1">
                      {w.reusableModules.map((m: string, i: number) => <span key={i} className="badge badge-purple">{m}</span>)}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            className="btn-secondary text-xs"
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
          >
            ← 上一页
          </button>
          <span className="text-xs opacity-50">
            第 {page} / {totalPages} 页
          </span>
          <button
            className="btn-secondary text-xs"
            disabled={page >= totalPages}
            onClick={() => setPage(page + 1)}
          >
            下一页 →
          </button>
        </div>
      )}
    </div>
  );
}
