import type { AIProject } from "@/types";

export interface ProjectFilter {
  search?: string;
  /** "all" 或空表示不过滤 */
  category?: string;
  /** 0 表示不过滤 */
  difficulty?: number;
  sortBy?: string;
}

const sortKeys: Record<string, (p: AIProject) => number> = {
  avgScore: (p) => p.avgScore || 0,
  resumeValue: (p) => p.scores?.resumeValue || 0,
  businessValue: (p) => p.scores?.businessValue || 0,
  techGrowth: (p) => p.scores?.techGrowth || 0,
  freelanceValue: (p) => p.scores?.freelanceValue || 0,
};

/** 项目库的搜索 / 分类 / 难度过滤与排序（降序，未知排序键回退 avgScore）。不修改入参。 */
export function filterProjects(projects: AIProject[], f: ProjectFilter = {}): AIProject[] {
  let list = [...projects];
  if (f.search) {
    const q = f.search.toLowerCase();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.oneliner?.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }
  if (f.category && f.category !== "all") list = list.filter((p) => p.category === f.category);
  if (f.difficulty && f.difficulty > 0) list = list.filter((p) => p.difficulty === f.difficulty);
  const fn = sortKeys[f.sortBy ?? "avgScore"] || sortKeys.avgScore;
  list.sort((a, b) => fn(b) - fn(a));
  return list;
}
