/** JSON Schema 表达不了的跨字段语义检查。返回问题描述列表（空 = 通过）。 */

type Rec = Record<string, unknown>;

export function duplicateIds(items: Rec[]): string[] {
  const seen = new Set<unknown>();
  const dup: string[] = [];
  for (const it of items) {
    if (seen.has(it.id)) dup.push(String(it.id));
    seen.add(it.id);
  }
  return dup;
}

export function checkQuotes(cases: { id: number; quote: { low: number; standard: number; high: number; recommended: number } }[]): string[] {
  const out: string[] = [];
  for (const c of cases) {
    const q = c.quote;
    if (!(q.low <= q.standard && q.standard <= q.high)) out.push(`customer #${c.id}: quote 不满足 low<=standard<=high`);
    if (![q.low, q.standard, q.high].includes(q.recommended)) out.push(`customer #${c.id}: recommended 不在三档报价中`);
  }
  return out;
}

export function checkProjectScores(
  projects: { id: string; categoryIndex: number; dataMissing?: boolean; scores: Record<string, number | null> | null; avgScore: number | null }[]
): string[] {
  const out: string[] = [];
  for (const p of projects) {
    if (Number(p.id.slice(0, 2)) !== p.categoryIndex) out.push(`project ${p.id}: id 前缀与 categoryIndex ${p.categoryIndex} 不符`);
    if (p.dataMissing || p.scores === null) {
      if (p.scores !== null || p.avgScore !== null) out.push(`project ${p.id}: 数据缺失项目不得带评分`);
      continue;
    }
    const v = Object.values(p.scores).filter((x): x is number => typeof x === "number");
    if (v.length === 0 || p.avgScore === null) { out.push(`project ${p.id}: 非缺失项目必须有评分`); continue; }
    const avg = v.reduce((a, b) => a + b, 0) / v.length;
    if (Math.abs(avg - p.avgScore) > 0.06) out.push(`project ${p.id}: avgScore ${p.avgScore} 与 scores 均值 ${avg.toFixed(2)} 不符`);
  }
  return out;
}

export function checkEvalCases(cases: { id: string; user_input: string | string[] }[]): string[] {
  const out: string[] = [];
  const inputs = new Set<string>();
  for (const c of cases) {
    const k = JSON.stringify(c.user_input);
    if (inputs.has(k)) out.push(`eval ${c.id}: user_input 与前面用例重复`);
    inputs.add(k);
  }
  return out;
}
