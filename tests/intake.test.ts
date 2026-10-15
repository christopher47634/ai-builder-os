import { describe, it, expect } from "vitest";
import { analyzeCustomer } from "@/lib/intake";
import type { ServiceProduct } from "@/types";
import productsData from "@/data/products.json";

const products = productsData as ServiceProduct[];

describe("analyzeCustomer", () => {
  it("识别客户类型并加分", () => {
    const r = analyzeCustomer("我是公司老板，想做个AI客服bot", products);
    expect(r.customerType).toBe("小公司老板");
    expect(r.score).toBe(70); // 50 + 10(老板) + 10(AI)
    expect(r.worthTaking).toBe(true);
    expect(r.matchedProducts.length).toBeGreaterThan(0);
    expect(r.matchedProducts.every((p) => p.name.includes("客服"))).toBe(true);
  });
  it("预算偏低 + 低估复杂度会扣分并给出风险", () => {
    const r = analyzeCustomer("想要便宜的，很简单，几百块", products);
    expect(r.score).toBe(25);
    expect(r.worthTaking).toBe(false);
    expect(r.hiddenRisks).toContain("预算可能偏低");
    expect(r.hiddenRisks).toContain("客户低估项目复杂度");
  });
  it("无匹配产品时回退到前两个产品，报价提示需评估", () => {
    const r = analyzeCustomer("随便聊聊", products);
    expect(r.matchedProducts).toEqual(products.slice(0, 2));
    expect(r.quoteSuggestion).toBe("需要进一步评估后报价");
    expect(r.hiddenRisks).toEqual(["暂未发现明显风险"]);
  });
  it("分数限制在 0-100", () => {
    const hi = analyzeCustomer("创业 demo AI 预算充足 不在乎钱 尽快做", products);
    expect(hi.score).toBeLessThanOrEqual(100);
    expect(hi.score).toBeGreaterThanOrEqual(0);
  });
  it("报价建议取自首个匹配产品的 basic-premium", () => {
    const r = analyzeCustomer("要个客服问答bot", products);
    const p = r.matchedProducts[0];
    expect(r.quoteSuggestion).toBe(`建议报价: ¥${p.pricing.basic}-${p.pricing.premium}`);
  });
});
