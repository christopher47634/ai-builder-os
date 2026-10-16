import type { ServiceProduct } from "@/types";

export interface AnalysisResult {
  customerType: string;
  score: number;
  worthTaking: boolean;
  surfaceNeed: string;
  realNeed: string;
  hiddenRisks: string[];
  /** 关键词命中的产品；没有命中时为空数组 */
  matchedProducts: ServiceProduct[];
  /** 没有命中时给 UI 展示的通用入门参考（matchedProducts 为空时才有值），UI 须标明「未命中」 */
  fallbackProducts: ServiceProduct[];
  firstQuestions: string[];
  wechatReply: string;
  quoteSuggestion: string;
  sowDraft: string;
}

/** 客户类型规则：按顺序匹配，行业/身份词优先，「公司/老板」这类泛称兜底（避免「留学机构公司」被判成小公司老板）。不区分大小写。 */
const TYPE_RULES: { type: string; re: RegExp; score: number }[] = [
  { type: "留学机构", re: /留学|出国|文书|申请/i, score: 15 },
  { type: "教育培训机构", re: /培训|教育|课程|辅导/i, score: 10 },
  { type: "电商卖家", re: /电商|淘宝|拼多多|店铺|listing/i, score: 10 },
  { type: "自媒体团队", re: /自媒体|公众号|小红书|抖音|博主/i, score: 5 },
  { type: "游戏工作室", re: /游戏|工作室/i, score: 5 },
  { type: "创业团队", re: /创业|融资|demo|原型/i, score: 15 },
  { type: "小公司老板", re: /老板|老总|公司|工厂|企业/i, score: 10 },
];

// 否定词保护：「不简单」「不便宜」「不急」「不是预算充足」等不能按字面命中
const LOW_BUDGET = /(?<!不|不太|不算|不是)(便宜|省钱|免费|几百块|一千)/i;
const RICH_BUDGET = /(?<!不|不够|不是|没有)(预算充足|不在乎钱|尽快做)/i;
const URGENT = /(?<!不|不太|没那么|不是很)(急|赶|马上|这周)/i;
const UNDERESTIMATE = /(?<!不|不太|没那么|没有那么|并不)(简单|很快|几分钟)|不难/i;
const AI_WORDS = /\b(ai|rag|agent)\b|智能|自动化/i;

const PRODUCT_RULES: { re: RegExp; nameHas: string }[] = [
  { re: /客服|问答|\bbot\b/i, nameHas: "客服" },
  { re: /工作流|自动化/i, nameHas: "工作流" },
  { re: /详情页|图片|产品图/i, nameHas: "产品图" },
  { re: /原型|\bdemo\b|展示/i, nameHas: "原型" },
  { re: /知识库|文档|\brag\b/i, nameHas: "RAG" },
];

export function analyzeCustomer(text: string, products: ServiceProduct[]): AnalysisResult {
  let customerType = "未知";
  let score = 50;
  const risks: string[] = [];

  const typeRule = TYPE_RULES.find((r) => r.re.test(text));
  if (typeRule) { customerType = typeRule.type; score += typeRule.score; }

  if (LOW_BUDGET.test(text)) { risks.push("预算可能偏低"); score -= 15; }
  if (RICH_BUDGET.test(text)) { score += 20; }
  if (URGENT.test(text)) { risks.push("时间紧迫，需确认排期"); score -= 5; }

  if (UNDERESTIMATE.test(text)) { risks.push("客户低估项目复杂度"); score -= 10; }
  if (AI_WORDS.test(text)) { score += 10; }

  const matchedProducts = products
    .filter((p) => PRODUCT_RULES.some((r) => r.re.test(text) && p.name.includes(r.nameHas)))
    .slice(0, 3);
  const fallbackProducts = matchedProducts.length === 0 ? products.slice(0, 2) : [];

  const worthTaking = score >= 45;
  const first = matchedProducts[0];
  const needLabel = customerType !== "未知" ? `${customerType}的需求` : "项目";

  return {
    customerType,
    score: Math.min(100, Math.max(0, score)),
    worthTaking,
    surfaceNeed: text.slice(0, 100),
    realNeed: customerType !== "未知"
      ? `基于${customerType}的实际业务场景，需要进一步确认具体要解决的问题（规则推断，非模型理解）`
      : "客户类型未识别，需先沟通确认业务场景",
    hiddenRisks: risks.length > 0 ? risks : ["暂未发现明显风险"],
    matchedProducts,
    fallbackProducts,
    firstQuestions: [
      `"您目前的业务流程是怎样的？哪个环节最耗时？"`,
      `"您有现成的数据/资料吗？比如FAQ、文档、产品信息？"`,
      `"您期望的交付周期和预算大概是多少？"`,
      `"您之前有尝试过类似方案吗？效果如何？"`,
    ],
    wechatReply: `您好！感谢您的咨询。关于您提到的${needLabel}，我需要先了解一些细节才能给出准确方案。方便简单聊聊您的具体场景吗？`,
    quoteSuggestion: first ? `建议报价: ¥${first.pricing.basic}-${first.pricing.premium}` : "需要进一步评估后报价",
    sowDraft: `SOW 草案:
1. 需求确认与方案设计 (1-2天)
2. 开发与搭建 (${first?.deliveryDays || '3-7天'})
3. 测试与调试 (1-2天)
4. 部署与交付 (1天)
5. 培训与售后支持 (7天)`,
  };
}

/** 案例「是否值得接」的展示：true 绿 / false 黄 / null（原始资料无依据）用中性「未判定」 */
export function worthBadge(w: boolean | null | undefined): { label: string; cls: string } {
  if (w === true) return { label: "值得接", cls: "badge-green" };
  if (w === false) return { label: "需谨慎", cls: "badge-yellow" };
  return { label: "未判定", cls: "badge-neutral" };
}
