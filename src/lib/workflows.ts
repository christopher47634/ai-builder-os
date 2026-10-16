import type { WorkflowTemplate } from "@/types";

/** 列表页需要的精简字段（完整数据约 1MB，详情按需加载） */
export type WorkflowSummary = Pick<
  WorkflowTemplate,
  "id" | "name" | "category" | "targetUser" | "painPoint" | "difficulty" | "businessValue"
>;

export function summarizeWorkflow(w: WorkflowTemplate): WorkflowSummary {
  return {
    id: w.id,
    name: w.name,
    category: w.category,
    targetUser: w.targetUser,
    painPoint: w.painPoint,
    difficulty: w.difficulty,
    businessValue: w.businessValue,
  };
}
