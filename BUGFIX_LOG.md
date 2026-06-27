# Bug Fix Log — AI Builder OS

## 2026-06-27 验收修复

### P0 — 数据缺失（已修复）

**P0-01: projects.json 核心字段全空**
- 问题：100个项目的 targetUsers, coreFeatures, mvpScope, painPoints, techStack 全为空
- 原因：提取脚本未正确解析 Markdown 中的列表和嵌套字段
- 修复：重写 extract-projects.py，增加对列表字段和嵌套对象的解析
- 验证：修复后 targetUsers 95%、coreFeatures 100%、painPoints 95% 非空

**P0-02: customer-cases.json 核心字段全空**
- 问题：100个客户案例的 name, customerQuote, closingScript 全为空
- 原因：提取脚本未正确解析 Markdown 中的字段
- 修复：重写 extract-customers.py，增加对所有字段的提取
- 验证：修复后 customerQuote 100%、closingScript 100%、riskPoints 100% 非空

### P1 — Build 失败（已修复）

**P1-01: Google Fonts 网络请求失败**
- 问题：Next.js 构建时 fetch Geist/Geist Mono 字体失败
- 原因：WSL 环境无法访问 Google Fonts
- 修复：移除 next/font/google，改用系统字体栈
- 验证：build 通过

**P1-02: TypeScript 类型不匹配**
- 问题：painPoints 在数据中是 string[] 但类型定义为 string
- 原因：数据重新提取后结构变化，类型未同步更新
- 修复：更新 types/index.ts 中 painPoints 为 string[]，修复页面中的 .join() 调用
- 验证：build 零错误

### P2 — 代码质量（已修复）

**P2-01: 26处 any 类型**
- 修复：全部替换为具体类型（AIProject[], CustomerCase[] 等）

**P2-02: Dashboard 使用 <a href> 而非 <Link>**
- 修复：替换为 Next.js Link 组件

**P2-03: 项目库无分页**
- 修复：添加 PAGE_SIZE=20 分页

**P2-04: Workflows 复制按钮全局状态**
- 修复：改为 per-card 状态（copiedId）

**P2-05: Status 页硬编码数据计数**
- 修复：改为动态计算

**P2-06: 数据计数不一致**
- 问题：声称 1,126 条，实际 1,000 条
- 修复：修正所有文档中的数字
