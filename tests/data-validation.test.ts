import { describe, it, expect } from "vitest";
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";

describe("数据校验脚本", () => {
  it("validate-data.mjs 对仓库数据通过", () => {
    const out = execFileSync(process.execPath, [resolve(__dirname, "../scripts/validate-data.mjs")], { encoding: "utf8" });
    expect(out).toContain("全部数据文件校验通过");
  }, 60000);
});
