import type { AIProject } from "@/types";
import { summarizeProject } from "@/lib/projects";
import projectsData from "@/data/projects.json";
import ProjectsClient from "./ProjectsClient";

// 服务端组件：构建期把 700KB+ 的完整数据压成列表摘要，完整详情由客户端点击时按需加载
const summaries = (projectsData as unknown as AIProject[]).map(summarizeProject);

export default function ProjectsPage() {
  return <ProjectsClient projects={summaries} />;
}
