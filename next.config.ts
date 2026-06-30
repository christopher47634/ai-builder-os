import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const repoName = "ai-builder-os";

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
