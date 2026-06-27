import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "AI Builder OS",
  description: "AI项目资产管理系统 — 100项目 · 200工作流 · 100案例 · 600评测",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className="h-full antialiased" style={{
      ["--font-geist-sans" as string]: "Inter, ui-sans-serif, system-ui, -apple-system, sans-serif",
      ["--font-geist-mono" as string]: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    }}>
      <body className="min-h-full flex">
        <Sidebar />
        <main className="flex-1 md:ml-[260px] min-h-screen pt-14 md:pt-0">
          <div className="p-4 md:p-6 max-w-[1400px] mx-auto">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
