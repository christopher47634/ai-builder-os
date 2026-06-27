"use client";
import { useState, useMemo } from "react";
import { CustomerCase, ServiceProduct } from "@/types";
import customerCasesData from "@/data/customer-cases.json";
import productsData from "@/data/products.json";

const cases = customerCasesData as CustomerCase[];
const products = productsData as ServiceProduct[];

interface AnalysisResult {
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

function analyzeCustomer(text: string): AnalysisResult {
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

export default function IntakePage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [caseSearch, setCaseSearch] = useState("");
  const [caseTypeFilter, setCaseTypeFilter] = useState("all");
  const [selectedCase, setSelectedCase] = useState<CustomerCase | null>(null);

  const caseTypes = [...new Set(cases.map((c) => c.customerType))].filter(Boolean).sort();

  const filteredCases = useMemo(() => {
    let list = [...cases];
    if (caseSearch) {
      const q = caseSearch.toLowerCase();
      list = list.filter((c) =>
        c.name?.toLowerCase().includes(q) ||
        c.customerType?.toLowerCase().includes(q) ||
        c.surfaceNeed?.toLowerCase().includes(q) ||
        c.customerQuote?.toLowerCase().includes(q)
      );
    }
    if (caseTypeFilter !== "all") list = list.filter((c) => c.customerType === caseTypeFilter);
    return list;
  }, [caseSearch, caseTypeFilter]);

  const handleAnalyze = () => {
    if (!input.trim()) return;
    setResult(analyzeCustomer(input));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold">客户接单分析</h1>
        <p className="text-sm opacity-50">输入客户原话 → AI 分析需求、匹配产品、生成报价</p>
      </div>

      {/* Input */}
      <div className="glass-card p-5">
        <h2 className="text-sm font-semibold mb-3">📝 输入客户原话</h2>
        <textarea
          className="input-glass w-full h-28 resize-none mb-3"
          placeholder='例如: "我想做一个AI客服，能自动回复客户问题，大概多少钱？"'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="btn-primary" onClick={handleAnalyze}>🔍 分析客户需求</button>
      </div>

      {/* Analysis Result */}
      {result && (
        <div className="glass-card p-5">
          <h2 className="text-sm font-semibold mb-4 text-[var(--accent-green)]">📊 分析结果</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-semibold text-[var(--accent)] mb-2">基础判断</h3>
              <div className="space-y-2">
                <div className="flex justify-between"><span className="opacity-60">客户类型</span><span className="badge badge-blue">{result.customerType}</span></div>
                <div className="flex justify-between"><span className="opacity-60">接单评分</span><span className={`badge ${result.score >= 60 ? 'badge-green' : result.score >= 40 ? 'badge-yellow' : 'badge-red'}`}>{result.score}/100</span></div>
                <div className="flex justify-between"><span className="opacity-60">是否值得接</span><span className={`badge ${result.worthTaking ? 'badge-green' : 'badge-red'}`}>{result.worthTaking ? '✅ 值得接' : '⚠️ 需谨慎'}</span></div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-[var(--accent)] mb-2">隐藏风险</h3>
              <ul className="space-y-1">
                {result.hiddenRisks.map((r: string, i: number) => <li key={i} className="opacity-80">⚠️ {r}</li>)}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-[var(--accent)] mb-2">推荐产品</h3>
              {result.matchedProducts.map((p: ServiceProduct) => (
                <div key={p.id} className="glass-card p-3 mb-2">
                  <div className="font-medium">{p.name}</div>
                  <div className="text-xs opacity-50">¥{p.priceRange} · {p.deliveryDays}</div>
                  <div className="text-xs opacity-70 mt-1">{p.salesPitch?.slice(0, 80)}</div>
                </div>
              ))}
            </div>
            <div>
              <h3 className="font-semibold text-[var(--accent)] mb-2">报价建议</h3>
              <p className="opacity-80">{result.quoteSuggestion}</p>
            </div>
            <div className="md:col-span-2">
              <h3 className="font-semibold text-[var(--accent)] mb-2">第一轮沟通问题</h3>
              <ul className="space-y-1">
                {result.firstQuestions.map((q: string, i: number) => <li key={i} className="opacity-80">{q}</li>)}
              </ul>
            </div>
            <div className="md:col-span-2">
              <h3 className="font-semibold text-[var(--accent)] mb-2">微信回复话术</h3>
              <div className="glass-card p-3 text-xs opacity-80">{result.wechatReply}</div>
            </div>
            <div className="md:col-span-2">
              <h3 className="font-semibold text-[var(--accent)] mb-2">SOW 草案</h3>
              <pre className="glass-card p-3 text-xs opacity-80 whitespace-pre-wrap">{result.sowDraft}</pre>
            </div>
          </div>
        </div>
      )}

      {/* Customer Cases Browser */}
      <div className="glass-card p-5">
        <h2 className="text-sm font-semibold mb-3">📚 客户案例库 ({cases.length} 个案例)</h2>
        <div className="flex flex-wrap gap-3 mb-4">
          <input
            className="input-glass flex-1 min-w-[200px]"
            placeholder="搜索客户名、行业、原话..."
            value={caseSearch}
            onChange={(e) => setCaseSearch(e.target.value)}
          />
          <select className="input-glass" value={caseTypeFilter} onChange={(e) => setCaseTypeFilter(e.target.value)}>
            <option value="all">全部类型</option>
            {caseTypes.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <span className="text-xs opacity-50 self-center">{filteredCases.length} 个结果</span>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[500px] overflow-y-auto">
          {filteredCases.slice(0, 60).map((c) => (
            <div key={c.id} className="glass-card p-3 cursor-pointer" onClick={() => setSelectedCase(c)}>
              <div className="flex items-start justify-between mb-1">
                <span className="text-sm font-medium truncate">{c.name || `案例${c.id}`}</span>
                <span className={`badge ${c.worthTaking ? 'badge-green' : 'badge-yellow'} ml-2 text-[10px]`}>{c.difficulty}</span>
              </div>
              <div className="text-xs opacity-50 mb-1">{c.customerType} · {c.location}</div>
              {c.customerQuote && <p className="text-xs opacity-70 line-clamp-2">"{c.customerQuote}"</p>}
              {c.quote?.recommended > 0 && <div className="text-xs text-[var(--accent-green)] mt-1">推荐报价: ¥{c.quote.recommended}</div>}
            </div>
          ))}
        </div>
      </div>

      {/* Case Detail Modal */}
      {selectedCase && (
        <div className="modal-overlay" onClick={() => setSelectedCase(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-lg font-bold">{selectedCase.name || `案例 ${selectedCase.id}`}</h2>
                <p className="text-xs opacity-50">{selectedCase.customerType} · {selectedCase.location} · {selectedCase.age}岁</p>
              </div>
              <button onClick={() => setSelectedCase(null)} className="text-xl opacity-50 hover:opacity-100">✕</button>
            </div>
            <div className="space-y-4 text-sm">
              {selectedCase.customerQuote && (
                <div>
                  <h3 className="font-semibold text-[var(--accent)] mb-1">💬 客户原话</h3>
                  <p className="opacity-80 italic">"{selectedCase.customerQuote}"</p>
                </div>
              )}
              {selectedCase.surfaceNeed && (
                <div>
                  <h3 className="font-semibold text-[var(--accent)] mb-1">📋 需求拆解</h3>
                  <p className="opacity-80">表面需求: {selectedCase.surfaceNeed}</p>
                  {selectedCase.realNeed && <p className="opacity-80">真实需求: {selectedCase.realNeed}</p>}
                </div>
              )}
              {selectedCase.closingScript && (
                <div>
                  <h3 className="font-semibold text-[var(--accent)] mb-1">💰 报价方案</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="glass-card p-2 text-center"><div className="text-xs opacity-50">低价</div><div className="font-mono">¥{selectedCase.quote?.low}</div></div>
                    <div className="glass-card p-2 text-center"><div className="text-xs opacity-50">标准</div><div className="font-mono text-[var(--accent)]">¥{selectedCase.quote?.standard}</div></div>
                    <div className="glass-card p-2 text-center"><div className="text-xs opacity-50">高价</div><div className="font-mono">¥{selectedCase.quote?.high}</div></div>
                    <div className="glass-card p-2 text-center"><div className="text-xs opacity-50">推荐</div><div className="font-mono text-[var(--accent-green)]">¥{selectedCase.quote?.recommended}</div></div>
                  </div>
                </div>
              )}
              {selectedCase.closingScript && (
                <div>
                  <h3 className="font-semibold text-[var(--accent)] mb-1">🗣 成交话术</h3>
                  <p className="opacity-80 whitespace-pre-line">{selectedCase.closingScript.slice(0, 300)}</p>
                </div>
              )}
              {selectedCase.biggestRisk && (
                <div>
                  <h3 className="font-semibold text-[var(--accent)] mb-1">⚠️ 风险控制</h3>
                  <p className="opacity-80">最大翻车点: {selectedCase.biggestRisk}</p>
                </div>
              )}
              {selectedCase.keyLearning && (
                <div>
                  <h3 className="font-semibold text-[var(--accent)] mb-1">📖 复盘学习</h3>
                  <p className="opacity-80">{selectedCase.keyLearning}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
