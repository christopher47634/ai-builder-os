// 仅在服务端（构建期）使用：从数据文件汇总数量，避免把大 JSON 打进客户端 bundle，也避免文案里写死数字。
import projects from "@/data/projects.json";
import workflows from "@/data/workflows.json";
import cases from "@/data/customer-cases.json";
import rag from "@/data/eval/rag_test_cases.json";
import multiturn from "@/data/eval/multiturn_dialogue_cases.json";
import tool from "@/data/eval/tool_call_cases.json";
import halluc from "@/data/eval/hallucination_cases.json";
import safety from "@/data/eval/safety_boundary_cases.json";
import malicious from "@/data/eval/malicious_input_cases.json";

export function getSiteStats() {
  const evalTotal = rag.length + multiturn.length + tool.length + halluc.length + safety.length + malicious.length;
  return { projects: projects.length, workflows: workflows.length, cases: cases.length, evalTotal };
}

export function getSiteSummary(): string {
  const s = getSiteStats();
  return `${s.projects}项目 · ${s.workflows}工作流 · ${s.cases}案例 · ${s.evalTotal}评测`;
}
