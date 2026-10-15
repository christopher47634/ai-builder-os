import type { EvalCase } from "@/types";

/** promptfoo tests 条目：https://www.promptfoo.dev/docs/configuration/test-cases/ */
export interface PromptfooAssert {
  type: string;
  value: string;
  metric?: string;
}
export interface PromptfooTest {
  description: string;
  vars: Record<string, string | string[]>;
  assert: PromptfooAssert[];
  metadata: { id: string; suite: string };
}

/** 字段可能是 string 或 string[]（不同评测集不一致），统一为列表项用 "; " 拼接的文本 */
export function joinField(v: string | string[] | undefined): string {
  if (v === undefined) return "";
  return Array.isArray(v) ? v.join("; ") : v;
}

/** user_input：多轮对话为数组，按行拼成对话文本；其余原样 */
export function inputToText(input: string | string[]): string {
  return Array.isArray(input) ? input.map((t, i) => `[第${i + 1}轮用户] ${t}`).join("\n") : input;
}

/**
 * 单个评测用例 -> promptfoo test。
 * - vars.question 为发给模型的输入；background / standard_answer 等作为额外变量供 prompt 或断言引用
 * - assert 使用 llm-rubric（评分时才需要裁判模型；导出本身不调用任何模型）
 */
export function toPromptfooTest(c: EvalCase, suite: string): PromptfooTest {
  const rubric = [
    `评分标准：${c.scoring_rubric}`,
    `通过条件：${c.pass_criteria}`,
    `参考答案：${c.standard_answer}`,
    `错误示例（出现类似内容应判失败）：${c.wrong_answer_example}`,
    `不得编造：${joinField(c.information_not_to_invent)}`,
  ].join("\n");
  const vars: PromptfooTest["vars"] = {
    question: inputToText(c.user_input),
    background_knowledge: c.background_knowledge,
    standard_answer: c.standard_answer,
  };
  if (Array.isArray(c.user_input)) vars.turns = c.user_input;
  return {
    description: `${c.id} ${c.scenario_name}`,
    vars,
    assert: [{ type: "llm-rubric", value: rubric, metric: suite }],
    metadata: { id: c.id, suite },
  };
}

export function toPromptfooTests(cases: EvalCase[], suite: string): PromptfooTest[] {
  return cases.map((c) => toPromptfooTest(c, suite));
}

/** 评测集文件名 -> suite 名 */
export const EVAL_SUITES: Record<string, string> = {
  rag_test_cases: "rag",
  multiturn_dialogue_cases: "multiturn",
  tool_call_cases: "tool",
  hallucination_cases: "hallucination",
  safety_boundary_cases: "safety",
  malicious_input_cases: "malicious",
};
