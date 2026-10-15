/** Mock 评测：固定种子的伪随机，不调用任何模型，不修改入参数组。结果仅用于演示界面。 */

export interface MockCase { id: string; scenario_name: string }
export interface MockSuiteInput { id: string; name: string; data: MockCase[] }
export interface MockSuiteResult {
  suiteId: string;
  suiteName: string;
  total: number;
  passed: number;
  failed: number;
  passRate: string;
  avgScore: string;
  failedCases: { id: string; name: string; reason: string }[];
}

export const MOCK_SEED = 20261015;
const REASONS = ["幻觉输出", "检索失败", "格式错误", "安全违规", "工具调用超时"];

/** mulberry32：同一种子产生同一序列。 */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function runMockEval(suites: MockSuiteInput[], seed: number = MOCK_SEED): MockSuiteResult[] {
  const rand = mulberry32(seed);
  return suites.map((suite) => {
    const total = suite.data.length;
    const passRate = 0.75 + rand() * 0.2;
    const avgScore = 3.5 + rand() * 1.2;
    const passed = Math.floor(total * passRate);
    const failed = total - passed;
    // 复制后做 Fisher-Yates 洗牌，不改动共享数组
    const pool = [...suite.data];
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    const failedCases = pool.slice(0, Math.min(5, failed)).map((c) => ({
      id: c.id,
      name: c.scenario_name,
      reason: REASONS[Math.floor(rand() * REASONS.length)],
    }));
    return {
      suiteId: suite.id,
      suiteName: suite.name,
      total,
      passed,
      failed,
      passRate: ((passed / (total || 1)) * 100).toFixed(1),
      avgScore: avgScore.toFixed(2),
      failedCases,
    };
  });
}
