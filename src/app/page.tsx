"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { AIProject, WorkflowTemplate } from "@/types";
import projects from "@/data/projects.json";
import workflows from "@/data/workflows.json";
import customerCases from "@/data/customer-cases.json";
import evalCases from "@/data/eval/rag_test_cases.json";
import products from "@/data/products.json";

const stats = [
  { label: "AI 项目", value: projects.length, icon: "📦", color: "blue", href: "/projects" },
  { label: "工作流模板", value: workflows.length, icon: "🔧", color: "green", href: "/workflows" },
  { label: "客户案例", value: customerCases.length, icon: "💼", color: "purple", href: "/intake" },
  { label: "接单产品", value: products.length, icon: "🛒", color: "orange", href: "/intake" },
];

export default function Dashboard() {
  const topProjects = useMemo(() => {
    return [...(projects as AIProject[])].sort((a, b) => (b.avgScore || 0) - (a.avgScore || 0)).slice(0, 5);
  }, []);

  const categoryStats = useMemo(() => {
    const cats: Record<string, number> = {};
    (projects as AIProject[]).forEach((p) => { cats[p.category] = (cats[p.category] || 0) + 1; });
    return Object.entries(cats).sort((a, b) => b[1] - a[1]).slice(0, 8);
  }, []);

  const topWorkflows = useMemo(() => {
    return [...(workflows as WorkflowTemplate[])].sort((a, b) => {
      const order: Record<string, number> = { "高": 3, "中": 2, "低": 1 };
      return (order[b.businessValue] || 0) - (order[a.businessValue] || 0);
    }).slice(0, 5);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">AI Builder OS</h1>
        <p className="text-sm opacity-60 mt-1">AI 项目资产管理系统 · 整合 4 个数据源 · Mock Mode 运行中</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className={`glass-card p-5 stat-glow-${s.color}`}>
            <div className="flex items-center gap-3">
              <span className="text-2xl">{s.icon}</span>
              <div>
                <div className="text-2xl font-bold text-[var(--accent)]">{s.value}</div>
                <div className="text-xs opacity-60">{s.label}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Top Projects + Categories */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top 5 Projects */}
        <div className="glass-card p-5">
          <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
            <span>🏆</span> Top 5 推荐项目
          </h2>
          <div className="space-y-3">
            {topProjects.map((p, i) => (
              <Link key={p.id} href="/projects" className="flex items-center gap-3 p-2 rounded-lg hover:bg-[rgba(56,189,248,0.05)] transition-colors">
                <span className="text-sm font-mono opacity-40 w-6">#{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{p.name}</div>
                  <div className="text-xs opacity-50 truncate">{p.category} · 难度 {p.difficulty}⭐</div>
                </div>
                <span className="badge badge-blue">{p.avgScore?.toFixed(1)}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Category Distribution */}
        <div className="glass-card p-5">
          <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
            <span>📊</span> 项目分类分布
          </h2>
          <div className="space-y-2">
            {categoryStats.map(([cat, count]) => (
              <div key={cat} className="flex items-center gap-3">
                <span className="text-xs w-28 truncate opacity-70">{cat}</span>
                <div className="flex-1 score-bar">
                  <div className="score-bar-fill bg-[var(--accent)]" style={{ width: `${(count / 5) * 100}%` }} />
                </div>
                <span className="text-xs font-mono w-6 text-right">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Workflows */}
      <div className="glass-card p-5">
        <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
          <span>⚡</span> Top 5 高价值工作流
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {topWorkflows.map((w) => (
            <Link key={w.id} href="/workflows" className="glass-card p-3 hover:border-[var(--accent)] transition-all">
              <div className="text-sm font-medium mb-1 truncate">{w.name}</div>
              <div className="text-xs opacity-50 mb-2">{w.category}</div>
              <div className="flex gap-2">
                <span className="badge badge-green">{w.businessValue}</span>
                <span className="badge badge-purple">{w.difficulty}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="glass-card p-5">
        <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
          <span>🚀</span> 快捷入口
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { href: "/projects", label: "浏览项目", icon: "📦" },
            { href: "/workflows", label: "工作流库", icon: "🔧" },
            { href: "/intake", label: "接单分析", icon: "💼" },
            { href: "/eval", label: "评测看板", icon: "🧪" },
            { href: "/portfolio", label: "简历生成", icon: "📝" },
            { href: "/status", label: "系统状态", icon: "✅" },
          ].map((item) => (
            <Link key={item.href} href={item.href} className="glass-card p-4 text-center hover:border-[var(--accent)] transition-all">
              <div className="text-2xl mb-2">{item.icon}</div>
              <div className="text-xs font-medium">{item.label}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
