import { describe, it, expect } from "vitest";
import { duplicateIds, checkQuotes, checkProjectScores, checkEvalCases } from "@/lib/dataChecks";

describe("dataChecks", () => {
  it("duplicateIds", () => {
    expect(duplicateIds([{ id: 1 }, { id: 2 }, { id: 1 }])).toEqual(["1"]);
    expect(duplicateIds([{ id: "a" }, { id: "b" }])).toEqual([]);
  });
  it("checkQuotes 发现顺序错误与 recommended 不在档位", () => {
    const ok = { id: 1, quote: { low: 1, standard: 2, high: 3, recommended: 2 } };
    const bad = { id: 2, quote: { low: 1, standard: 5, high: 3, recommended: 4 } };
    expect(checkQuotes([ok])).toEqual([]);
    expect(checkQuotes([bad])).toHaveLength(2);
  });
  it("checkProjectScores 检查均值与 id 前缀", () => {
    const scores = { a: 6, b: 8 };
    expect(checkProjectScores([{ id: "03-001", categoryIndex: 3, scores, avgScore: 7 }])).toEqual([]);
    expect(checkProjectScores([{ id: "03-001", categoryIndex: 4, scores, avgScore: 9 }])).toHaveLength(2);
  });
  it("checkEvalCases 发现重复输入", () => {
    expect(checkEvalCases([{ id: "x_1", user_input: "q" }, { id: "x_2", user_input: "q" }])).toHaveLength(1);
    expect(checkEvalCases([{ id: "x_1", user_input: ["a"] }, { id: "x_2", user_input: ["b"] }])).toEqual([]);
  });
});
