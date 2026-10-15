// 校验 src/data 下所有 JSON：JSON Schema（ajv）+ 语义检查。任一问题则退出码 1。
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import Ajv from "ajv";
import { duplicateIds, checkQuotes, checkProjectScores, checkEvalCases } from "../src/lib/dataChecks.ts";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => JSON.parse(readFileSync(resolve(root, p), "utf8"));

// [数据文件, schema 文件, 语义检查]
export const DATASETS = [
  ["src/data/customer-cases.json", "schemas/customer-cases.schema.json", (d) => checkQuotes(d)],
  ["src/data/customerProfiles.json", "schemas/customer-profiles.schema.json"],
  ["src/data/products.json", "schemas/products.schema.json"],
  ["src/data/projects.json", "schemas/projects.schema.json", (d) => checkProjectScores(d)],
  ["src/data/sop.json", "schemas/sop.schema.json"],
  ["src/data/workflows.json", "schemas/workflows.schema.json"],
  ...["hallucination_cases", "malicious_input_cases", "multiturn_dialogue_cases", "rag_test_cases", "safety_boundary_cases", "tool_call_cases"].map(
    (n) => [`src/data/eval/${n}.json`, `schemas/eval/${n}.schema.json`, (d) => checkEvalCases(d)]
  ),
];

const ajv = new Ajv({ allErrors: true, strict: true });
let failures = 0;
for (const [dataPath, schemaPath, semantic] of DATASETS) {
  const data = read(dataPath);
  const validate = ajv.compile(read(schemaPath));
  const problems = [];
  if (!validate(data)) {
    for (const e of validate.errors.slice(0, 20)) {
      const m = e.instancePath.match(/^\/(\d+)/);
      const item = m && Array.isArray(data) ? data[+m[1]]?.id : undefined;
      problems.push(`schema ${item !== undefined ? `[id=${item}] ` : ""}${e.instancePath || "/"} ${e.message}${e.params?.additionalProperty ? ` (${e.params.additionalProperty})` : ""}`);
    }
    if (validate.errors.length > 20) problems.push(`... 另有 ${validate.errors.length - 20} 条 schema 错误`);
  }
  if (Array.isArray(data)) for (const id of duplicateIds(data)) problems.push(`重复 id: ${id}`);
  if (semantic) problems.push(...semantic(data));
  console.log(`${problems.length ? "FAIL" : "ok  "} ${dataPath}${Array.isArray(data) ? ` (${data.length})` : ""}`);
  for (const p of problems) console.log(`     - ${p}`);
  failures += problems.length;
}
if (failures) {
  console.error(`\n数据校验失败：${failures} 个问题`);
  process.exit(1);
}
console.log("\n全部数据文件校验通过");
