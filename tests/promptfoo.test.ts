import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { parse } from "yaml";
import { EVAL_SUITES, inputToText, joinField, toPromptfooTest, toPromptfooTests } from "@/lib/promptfoo";
import type { EvalCase } from "@/types";

const load = (f: string) =>
  JSON.parse(readFileSync(resolve(__dirname, `../src/data/eval/${f}.json`), "utf8")) as EvalCase[];

describe("promptfoo 导出", () => {
  it("joinField / inputToText 处理 string 与 string[]", () => {
    expect(joinField(["a", "b"])).toBe("a; b");
    expect(joinField("x")).toBe("x");
    expect(joinField(undefined)).toBe("");
    expect(inputToText("hi")).toBe("hi");
    expect(inputToText(["a", "b"])).toBe("[第1轮用户] a\n[第2轮用户] b");
  });
  it("单个用例转换为 vars/assert 结构", () => {
    const [c] = load("rag_test_cases");
    const t = toPromptfooTest(c, "rag");
    expect(t.description).toBe(`${c.id} ${c.scenario_name}`);
    expect(t.vars.question).toBe(c.user_input);
    expect(t.vars.background_knowledge).toBe(c.background_knowledge);
    expect(t.assert).toHaveLength(1);
    expect(t.assert[0].type).toBe("llm-rubric");
    expect(t.assert[0].value).toContain(c.scoring_rubric);
    expect(t.assert[0].value).toContain(c.pass_criteria);
    expect(t.metadata).toEqual({ id: c.id, suite: "rag" });
  });
  it("多轮对话额外提供 vars.turns", () => {
    const [c] = load("multiturn_dialogue_cases");
    const t = toPromptfooTest(c, "multiturn");
    expect(t.vars.turns).toEqual(c.user_input);
    expect(String(t.vars.question)).toContain("[第1轮用户]");
  });
  it("六个评测集全部可转换，数量与源数据一致，JSON 可序列化", () => {
    let total = 0;
    for (const [file, suite] of Object.entries(EVAL_SUITES)) {
      const cases = load(file);
      const tests = toPromptfooTests(cases, suite);
      expect(tests).toHaveLength(cases.length);
      expect(new Set(tests.map((t) => t.metadata.id)).size).toBe(cases.length);
      expect(JSON.parse(JSON.stringify(tests))).toEqual(tests);
      total += tests.length;
    }
    expect(total).toBe(600);
  });
  it("promptfooconfig.yaml 可解析，且引用的 tests 文件与导出文件名一致", () => {
    const cfg = parse(readFileSync(resolve(__dirname, "../promptfoo/promptfooconfig.yaml"), "utf8"));
    expect(cfg.providers).toEqual(["echo"]);
    const refs = (cfg.tests as string[]).map((s) => s.replace("file://generated/", "")).sort();
    expect(refs).toEqual(Object.values(EVAL_SUITES).map((s) => `${s}.tests.json`).sort());
  });
});
