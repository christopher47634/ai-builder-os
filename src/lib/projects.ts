import type { AIProject, ProjectScores } from "@/types";

/** 列表页需要的精简字段（完整数据 700KB+，详情按需加载） */
export interface ProjectSummary {
  id: string;
  name: string;
  category: string;
  oneliner: string;
  difficulty: number;
  avgScore: number | null;
  dataMissing: boolean;
  needsRAG: boolean;
  needsAgent: boolean;
  needsMultimodal: boolean;
  scores: Pick<ProjectScores, "resumeValue" | "businessValue" | "techGrowth" | "freelanceValue"> | null;
}

export function summarizeProject(p: AIProject): ProjectSummary {
  return {
    id: p.id,
    name: p.name,
    category: p.category,
    oneliner: p.oneliner,
    difficulty: p.difficulty,
    avgScore: p.avgScore,
    dataMissing: p.dataMissing,
    needsRAG: p.needsRAG,
    needsAgent: p.needsAgent,
    needsMultimodal: p.needsMultimodal,
    scores: p.scores
      ? {
          resumeValue: p.scores.resumeValue,
          businessValue: p.scores.businessValue,
          techGrowth: p.scores.techGrowth,
          freelanceValue: p.scores.freelanceValue,
        }
      : null,
  };
}

export interface ProjectFilter {
  search?: string;
  /** "all" 或空表示不过滤 */
  category?: string;
  /** 0 表示不过滤 */
  difficulty?: number;
  sortBy?: string;
}

const sortKeys: Record<string, (p: ProjectSummary) => number> = {
  avgScore: (p) => p.avgScore || 0,
  resumeValue: (p) => p.scores?.resumeValue || 0,
  businessValue: (p) => p.scores?.businessValue || 0,
  techGrowth: (p) => p.scores?.techGrowth || 0,
  freelanceValue: (p) => p.scores?.freelanceValue || 0,
};

/** 项目库的搜索 / 分类 / 难度过滤与排序（降序，未知排序键回退 avgScore）。不修改入参。 */
export function filterProjects<T extends ProjectSummary>(projects: T[], f: ProjectFilter = {}): T[] {
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
