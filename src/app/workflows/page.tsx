import type { WorkflowTemplate } from "@/types";
import { summarizeWorkflow } from "@/lib/workflows";
import workflowsData from "@/data/workflows.json";
import WorkflowsClient from "./WorkflowsClient";

// 服务端组件：构建期把 1MB 的完整数据压成列表摘要，完整详情由客户端展开时按需加载
const summaries = (workflowsData as unknown as WorkflowTemplate[]).map(summarizeWorkflow);

export default function WorkflowsPage() {
  return <WorkflowsClient workflows={summaries} />;
}
