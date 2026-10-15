import { describe, it, expect } from "vitest";
import { filterProjects } from "@/lib/projects";
import type { AIProject } from "@/types";
import projectsData from "@/data/projects.json";

const mk = (o: Partial<AIProject>): AIProject =>
  ({ name: "n", category: "c", oneliner: "", difficulty: 3, avgScore: 5, scores: {}, ...o }) as AIProject;
const sample = [
  mk({ id: "a", name: "RAG 问答", category: "知识库", difficulty: 2, avgScore: 6, scores: { resumeValue: 9 } as AIProject["scores"] }),
  mk({ id: "b", name: "客服 Agent", category: "Agent类", difficulty: 3, avgScore: 8, scores: { resumeValue: 5 } as AIProject["scores"] }),
  mk({ id: "c", name: "周报", category: "Agent类", oneliner: "自动写rag周报", difficulty: 3, avgScore: 7 }),
];

describe("filterProjects", () => {
  it("默认按 avgScore 降序且不修改入参", () => {
    const copy = [...sample];
    expect(filterProjects(sample).map((p) => p.id)).toEqual(["b", "c", "a"]);
    expect(sample).toEqual(copy);
  });
  it("搜索不区分大小写，并匹配 name / oneliner / category", () => {
    expect(filterProjects(sample, { search: "rag" }).map((p) => p.id).sort()).toEqual(["a", "c"]);
    expect(filterProjects(sample, { search: "agent类" }).map((p) => p.id).sort()).toEqual(["b", "c"]);
  });
  it("分类与难度过滤；all/0 表示不过滤", () => {
    expect(filterProjects(sample, { category: "Agent类", difficulty: 3 })).toHaveLength(2);
    expect(filterProjects(sample, { category: "all", difficulty: 0 })).toHaveLength(3);
    expect(filterProjects(sample, { difficulty: 2 }).map((p) => p.id)).toEqual(["a"]);
  });
  it("按子分数排序，缺失分数按 0，未知排序键回退 avgScore", () => {
    expect(filterProjects(sample, { sortBy: "resumeValue" }).map((p) => p.id)).toEqual(["a", "b", "c"]);
    expect(filterProjects(sample, { sortBy: "nope" })[0].id).toBe("b");
  });
  it("真实数据：分类过滤结果只含该分类", () => {
    const all = projectsData as unknown as AIProject[];
    const cat = all[0].category;
    const r = filterProjects(all, { category: cat });
    expect(r.length).toBe(5);
    expect(r.every((p) => p.category === cat)).toBe(true);
  });
});
