import { describe, it, expect } from "vitest";
import { runMockEval, mulberry32, type MockSuiteInput } from "@/lib/mockEval";

const mkSuite = (id: string, n: number): MockSuiteInput => ({
  id,
  name: id,
  data: Array.from({ length: n }, (_, i) => ({ id: `${id}-${i}`, scenario_name: `s${i}` })),
});

describe("runMockEval", () => {
  it("不就地修改传入的共享数组顺序", () => {
    const suites = [mkSuite("a", 50), mkSuite("b", 50)];
    const before = suites.map((s) => s.data.map((c) => c.id));
    runMockEval(suites);
    runMockEval(suites, 1);
    expect(suites.map((s) => s.data.map((c) => c.id))).toEqual(before);
  });
  it("同一种子结果完全可复现，不同种子不同", () => {
    const suites = [mkSuite("a", 100), mkSuite("b", 100)];
    expect(runMockEval(suites, 7)).toEqual(runMockEval(suites, 7));
    expect(runMockEval(suites, 7)).not.toEqual(runMockEval(suites, 8));
  });
  it("passed + failed = total，失败用例不重复且不超过 5 条/失败数", () => {
    for (const r of runMockEval([mkSuite("a", 100), mkSuite("tiny", 2)])) {
      expect(r.passed + r.failed).toBe(r.total);
      expect(r.failedCases.length).toBeLessThanOrEqual(Math.min(5, r.failed));
      expect(new Set(r.failedCases.map((c) => c.id)).size).toBe(r.failedCases.length);
    }
  });
  it("mulberry32 取值在 [0,1)", () => {
    const r = mulberry32(1);
    for (let i = 0; i < 1000; i++) { const v = r(); expect(v).toBeGreaterThanOrEqual(0); expect(v).toBeLessThan(1); }
  });
});
