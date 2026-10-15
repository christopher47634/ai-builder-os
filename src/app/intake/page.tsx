"use client";
import { useState, useMemo } from "react";
import { CustomerCase, ServiceProduct } from "@/types";
import customerCasesData from "@/data/customer-cases.json";
import { analyzeCustomer, type AnalysisResult } from "@/lib/intake";
import productsData from "@/data/products.json";

const cases = customerCasesData as CustomerCase[];
const products = productsData as ServiceProduct[];


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
    setResult(analyzeCustomer(input, products));
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
