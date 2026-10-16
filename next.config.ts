import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
// 仓库名从 GITHUB_REPOSITORY（owner/repo，Actions 自带）推导，本地默认 ai-builder-os
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] || "ai-builder-os";

const nextConfig: NextConfig = {
  ...(isGitHubPages
    ? {
        output: "export" as const,
        basePath: `/${repoName}`,
        assetPrefix: `/${repoName}/`,
        trailingSlash: true,
        images: {
          unoptimized: true,
        },
      }
    : {}),
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
