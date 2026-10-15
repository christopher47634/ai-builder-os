import type { ServiceProduct } from "@/types";

export interface AnalysisResult {
  customerType: string;
  score: number;
  worthTaking: boolean;
  surfaceNeed: string;
  realNeed: string;
  hiddenRisks: string[];
  matchedProducts: ServiceProduct[];
  firstQuestions: string[];
  wechatReply: string;
  quoteSuggestion: string;
  sowDraft: string;
}

export function analyzeCustomer(text: string, products: ServiceProduct[]): AnalysisResult {
  const lower = text.toLowerCase();
  let customerType = "未知";
  let score = 50;
  const risks: string[] = [];
  const recommendations: string[] = [];

  // Detect customer type
  if (/老板|老总|公司|工厂|企业/.test(text)) { customerType = "小公司老板"; score += 10; }
  else if (/留学|出国|文书|申请/.test(text)) { customerType = "留学机构"; score += 15; }
  else if (/培训|教育|课程|辅导/.test(text)) { customerType = "教育培训机构"; score += 10; }
  else if (/电商|淘宝|拼多多|店铺|listing/.test(text)) { customerType = "电商卖家"; score += 10; }
  else if (/自媒体|公众号|小红书|抖音|博主/.test(text)) { customerType = "自媒体团队"; score += 5; }
  else if (/游戏|工作室/.test(text)) { customerType = "游戏工作室"; score += 5; }
  else if (/创业|融资|demo|原型/.test(text)) { customerType = "创业团队"; score += 15; }

  // Detect budget signals
  if (/便宜|省钱|免费|几百块|一千/.test(text)) { risks.push("预算可能偏低"); score -= 15; }
  if (/预算充足|不在乎钱|尽快做/.test(text)) { score += 20; }
  if (/急|赶|马上|这周/.test(text)) { risks.push("时间紧迫，需确认排期"); score -= 5; }

  // Detect complexity
  if (/简单|很快|不难|几分钟/.test(text)) { risks.push("客户低估项目复杂度"); score -= 10; }
  if (/AI|智能|自动化|RAG|Agent/.test(text)) { score += 10; }

  // Find matching products
  const matchedProducts = products.filter((p) => {
    if (/客服|问答|bot/.test(lower) && p.name.includes("客服")) return true;
    if (/工作流|自动化/.test(lower) && p.name.includes("工作流")) return true;
    if (/详情页|图片|产品图/.test(lower) && p.name.includes("产品图")) return true;
    if (/原型|demo|展示/.test(lower) && p.name.includes("原型")) return true;
    if (/知识库|文档|rag/.test(lower) && p.name.includes("RAG")) return true;
    return false;
  }).slice(0, 3);

  if (matchedProducts.length === 0) {
    recommendations.push("建议先做需求确认，再匹配产品");
    recommendations.push("可以参考案例库中类似客户");
  }

  const worthTaking = score >= 45;

  return {
    customerType,
    score: Math.min(100, Math.max(0, score)),
    worthTaking,
    surfaceNeed: text.slice(0, 100),
    realNeed: `基于${customerType}的实际业务场景，需要AI解决方案提升效率`,
    hiddenRisks: risks.length > 0 ? risks : ["暂未发现明显风险"],
    matchedProducts: matchedProducts.length > 0 ? matchedProducts : products.slice(0, 2),
    firstQuestions: [
      `"您目前的业务流程是怎样的？哪个环节最耗时？"`,
      `"您有现成的数据/资料吗？比如FAQ、文档、产品信息？"`,
      `"您期望的交付周期和预算大概是多少？"`,
      `"您之前有尝试过类似方案吗？效果如何？"`,
    ],
    wechatReply: `您好！感谢您的咨询。关于您提到的${customerType ? '需求' : '项目'}，我需要先了解一些细节才能给出准确方案。方便简单聊聊您的具体场景吗？`,
    quoteSuggestion: matchedProducts[0] ? `建议报价: ¥${matchedProducts[0].pricing.basic}-${matchedProducts[0].pricing.premium}` : "需要进一步评估后报价",
    sowDraft: `SOW 草案:\n1. 需求确认与方案设计 (1-2天)\n2. 开发与搭建 (${matchedProducts[0]?.deliveryDays || '3-7天'})\n3. 测试与调试 (1-2天)\n4. 部署与交付 (1天)\n5. 培训与售后支持 (7天)`,
  };
}
