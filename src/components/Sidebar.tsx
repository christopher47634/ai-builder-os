"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/", label: "仪表盘", icon: "📊" },
  { href: "/projects", label: "AI 项目库", icon: "📦" },
  { href: "/workflows", label: "工作流模板", icon: "🔧" },
  { href: "/intake", label: "客户接单分析", icon: "💼" },
  { href: "/eval", label: "AI Eval Bench", icon: "🧪" },
  { href: "/portfolio", label: "作品集与简历", icon: "📝" },
  { href: "/status", label: "最终验收", icon: "✅" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-[260px] min-h-screen border-r border-[var(--card-border)] bg-[var(--sidebar-bg)] backdrop-blur-xl fixed left-0 top-0 z-40">
        <div className="p-5 border-b border-[var(--card-border)]">
          <h1 className="text-lg font-bold text-[var(--accent)]">AI Builder OS</h1>
          <p className="text-xs text-[var(--foreground)] opacity-50 mt-1">100项目 · 200工作流 · 100案例 · 600评测</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-item ${isActive(item.href) ? "active" : ""}`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm">{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-[var(--card-border)]">
          <div className="text-xs text-[var(--foreground)] opacity-40">
            Mock Mode · 数据来自本地JSON
          </div>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-[var(--sidebar-bg)] backdrop-blur-xl border-b border-[var(--card-border)] p-3">
        <div className="flex items-center justify-between">
          <h1 className="text-base font-bold text-[var(--accent)]">AI Builder OS</h1>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-xl p-1 opacity-70 hover:opacity-100"
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>
        {mobileOpen && (
          <nav className="mt-2 space-y-1 pb-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`nav-item text-sm ${isActive(item.href) ? "active" : ""}`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        )}
      </div>
    </>
  );
}
