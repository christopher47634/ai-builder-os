# AGENTS.md

给人和 AI 编码代理的仓库约定。本仓库是 Next.js（TSX）前端 + 约 37k 行 JSON 数据，数据是核心资产。

## 常用命令

```bash
npm ci
npm run validate:data     # JSON Schema + 语义检查，改任何 src/data 文件后必跑
npm run typecheck         # tsc --noEmit
npm test                  # vitest
npm run export:promptfoo  # 评测集 -> promptfoo tests（不调用模型）
npm run build             # 加 GITHUB_PAGES=true 得到静态导出（out/）
```

提交前这些都要通过；CI（`.github/workflows/ci.yml`）执行同样的步骤，`pages.yml` 负责部署 GitHub Pages。

## 数据文件

| 数据 | Schema | 说明 |
| --- | --- | --- |
| `src/data/projects.json` | `schemas/projects.schema.json` | 100 个 AI 项目，id 形如 `01-001` |
| `src/data/workflows.json` | `schemas/workflows.schema.json` | 200 个工作流模板 |
| `src/data/customer-cases.json` | `schemas/customer-cases.schema.json` | 100 个客户案例 |
| `src/data/customerProfiles.json` / `products.json` / `sop.json` | `schemas/*.schema.json` | 画像、服务产品、SOP |
| `src/data/eval/*_cases.json` | `schemas/eval/*.schema.json` | 6 类评测用例，各 100 条 |

### 贡献约定

1. **改数据先改（或确认）Schema**：新增字段必须同步更新对应 `schemas/*.schema.json`（schema 设了 `additionalProperties: false`，未声明的字段会校验失败），并更新 `src/types/index.ts`。
2. **id 唯一且格式固定**：projects `NN-NNN`（前两位等于 `categoryIndex`）；workflows `<类别>-NN`；customer-cases 为正整数；评测用例 `<前缀>_NNN`（`hall_` `malice_` `dialog_` `rag_` `safety_` `tool_`）。
3. **数值与枚举**：
   - 客户案例 `quote` 必须满足 `low <= standard <= high`，且 `recommended` 是三档之一；`difficulty` 取 `低/中等/偏麻烦/高`；`age` 未知填 0。
   - 项目 `difficulty` 为 1-5（0 = 源文档未评级，尽量补上）；`scores` 七项 0-10，`avgScore` 必须等于七项均值（容差 0.06）。
   - 工作流 `difficulty` 取 `入门/中级/高级`，`businessValue` 取 `高/中/低`。
4. **评测用例**：每条必须有 `scenario_name`、`user_input`、`standard_answer`、`wrong_answer_example`、`scoring_rubric`、`pass_criteria` 等全部字段，`user_input` 不得与同集其它用例重复。多轮对话（multiturn）的 `user_input` 是字符串数组；`information_to_retrieve` / `information_not_to_invent` / `risk_points` 在 hallucination、malicious_input、safety_boundary 中是数组，在 rag、tool_call、multiturn 中是字符串——保持各集原有形态。
5. **格式**：JSON 用 2 空格缩进、UTF-8，不要引入尾随逗号或注释；不要手工大段重排整个文件，保持 diff 小。大文件（projects/workflows）建议用脚本改并只提交真实变更。
6. **数据真实性**：客户案例、报价、评测用例是示例/合成数据，不含真实个人信息；不要提交真实姓名、手机号、密钥或 `.env`。
7. `scripts/extract-*.py` 是从 Markdown 源文档抽取数据的一次性脚本；源文档不在本仓库。直接修改 JSON 后不要再无脑重跑脚本，否则会覆盖人工修正。

### 编辑器提示

`.vscode/settings.json` 已把每个数据文件映射到对应 Schema，VS Code 会实时提示错误。根为数组的 JSON 无法内嵌 `$schema` 字段，所以用这种外部映射而不改数据文件。

## 评测与 promptfoo

`npm run export:promptfoo` 把 `src/data/eval/*.json` 转成 promptfoo tests（`vars` + `llm-rubric` 断言），输出到 `promptfoo/generated/`（已 gitignore）。`promptfoo/promptfooconfig.yaml` 默认用 `echo` provider，不需要密钥；要真实评测，换成真实 provider 后在 `promptfoo/` 目录执行 `npx promptfoo eval`。**CI 不会调用任何模型。**

## 代码

- 可测试的纯逻辑放在 `src/lib/`（页面组件只做展示）；对应测试放 `tests/`。
- 页面使用 `@/` 别名；新增数据处理函数请同时加 vitest 用例。
- 不要改动 `pages.yml` 的 `GITHUB_PAGES=true` 构建方式和 `next.config.ts` 的 basePath 逻辑。
