// 把 src/data/eval/*.json 导出为 promptfoo tests 格式（vars / assert）。
// 用法：npm run export:promptfoo [-- --out promptfoo/generated]
// 只做文件转换，不调用任何模型。
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { EVAL_SUITES, toPromptfooTests } from "../src/lib/promptfoo.ts";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outIdx = process.argv.indexOf("--out");
const outDir = resolve(root, outIdx > 0 ? process.argv[outIdx + 1] : "promptfoo/generated");
mkdirSync(outDir, { recursive: true });

let total = 0;
for (const [file, suite] of Object.entries(EVAL_SUITES)) {
  const cases = JSON.parse(readFileSync(resolve(root, "src/data/eval", `${file}.json`), "utf8"));
  const tests = toPromptfooTests(cases, suite);
  writeFileSync(resolve(outDir, `${suite}.tests.json`), JSON.stringify(tests, null, 2) + "\n");
  total += tests.length;
  console.log(`${suite}: ${tests.length} tests`);
}
console.log(`exported ${total} tests -> ${outDir}`);
