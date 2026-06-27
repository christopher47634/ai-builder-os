// ============================================================================
// AI Builder OS — Data Schema v1.0
// 生成日期: 2026-06-27
// 数据来源: AI项目资产库v1, V-warfare-system, ai-workflow-templates, ai-eval-bench
// 说明: 所有接口可直接复制到 TypeScript 项目中使用
// ============================================================================

// ---------------------------------------------------------------------------
// 1. AI Project — AI 项目（100 个项目，来自 AI项目资产库v1）
// ---------------------------------------------------------------------------

/** 七维度评分（每个维度 0-10 分） */
export interface ProjectScores {
  /** 简历价值：写在简历上的吸引力 */
  resumeValue: number;
  /** 商业价值：市场需求和变现潜力 */
  businessValue: number;
  /** 技术成长：学到新技术和深入理解的程度 */
  techGrowth: number;
  /** 接单价值：作为自由职业项目的适合度 */
  freelanceValue: number;
  /** 可开发性：独立完成的难度和可行性 */
  developability: number;
  /** 差异化：与市场现有方案的区分度 */
  differentiation: number;
  /** 可复用性：代码/架构/经验的复用潜力 */
  longTermReuse: number;
}

/** 项目技术栈建议 */
export interface TechStack {
  /** 前端技术建议 */
  frontend: string;
  /** 后端技术建议 */
  backend: string;
  /** 数据库建议 */
  database: string;
  /** 其他依赖 */
  others?: string[];
}

/** 项目实现方案 */
export interface ImplementationPlan {
  /** 低配版方案（1-3 天 Demo） */
  low: string;
  /** 标准版方案（1-2 周 MVP） */
  standard: string;
  /** 高配版方案（1-2 月产品） */
  high: string;
}

/** AI 项目完整数据模型 */
export interface AIProject {
  /** 唯一标识，格式: "{category_slug}-{序号}" 例如 "rag-001" */
  id: string;
  /** 项目名称 */
  name: string;
  /** 英文名/代号 */
  englishName?: string;
  /** 分类，如 "RAG企业知识库", "Agent类", "金融投研" 等 */
  category: string;
  /** 分类编号（01-20） */
  categoryIndex: number;
  /** 一句话定位 */
  oneliner: string;
  /** 开发难度 1-5 星 */
  difficulty: number;
  /** 七维度评分 */
  scores: ProjectScores;
  /** 综合均分（七维度加权平均） */
  avgScore: number;

  // --- 核心描述字段 ---
  /** 目标用户列表 */
  targetUsers: string[];
  /** 用户痛点描述 */
  painPoints: string;
  /** 传统方案的不足 */
  traditionalSolutionWeakness: string;
  /** AI 介入点 */
  aiIntervention: string;
  /** 核心功能列表 */
  coreFeatures: string[];
  /** MVP 功能范围 */
  mvpScope: string[];
  /** V1 功能范围 */
  v1Scope: string[];
  /** 不做什么 */
  outOfScope: string[];

  // --- 流程和结构 ---
  /** 用户流程（步骤列表） */
  userFlow: string[];
  /** 页面结构描述 */
  pageStructure: string;

  // --- 数据和技术 ---
  /** 数据来源 */
  dataSource: string[];
  /** 数据结构描述 */
  dataStructure: string;
  /** 是否需要 RAG */
  needsRAG: boolean;
  /** 是否需要 Agent */
  needsAgent: boolean;
  /** 是否需要工具调用 */
  needsToolCalling: boolean;
  /** 是否需要多模态 */
  needsMultimodal: boolean;
  /** 技术栈建议 */
  techStack: TechStack;
  /** API 设计 */
  apiDesign?: string;
  /** 关键算法/规则逻辑 */
  keyAlgorithms?: string;
  /** 数据库设计 */
  databaseDesign?: string;

  // --- Prompt ---
  /** 系统 Prompt 模板 */
  promptTemplate?: string;

  // --- 评估和风险 ---
  /** 风险点 */
  risks: string[];
  /** 幻觉控制方案 */
  hallucinationControl?: string;
  /** 测试方案 */
  testPlan?: string;
  /** 评估指标 */
  evaluationMetrics?: string[];
  /** 部署方案 */
  deploymentPlan?: string;

  // --- 商业 ---
  /** 开发难度文字描述 */
  difficultyDescription?: string;
  /** 预计开发周期 */
  estimatedDuration?: string;
  /** 商业价值评级 */
  businessValueRating?: '高' | '中' | '低';
  /** 可能的收费方式 */
  pricingModel?: string;
  /** 竞品列表 */
  competitors?: string[];
  /** 差异化说明 */
  differentiation?: string;

  // --- 简历和作品集 ---
  /** 简历写法建议 */
  resumeDescription?: string;
  /** 作品集展示方式 */
  portfolioDisplay?: string;

  // --- 实现方案 ---
  /** 三种实现方案 */
  implementation?: ImplementationPlan;

  // --- 复用 ---
  /** Mock Mode 方案 */
  mockModePlan?: string;
  /** 可复用组件列表 */
  reusableComponents?: string[];
  /** 可复用 Prompt */
  reusablePrompts?: string[];
  /** 可复用数据结构 */
  reusableDataStructures?: string;

  // --- 元数据 ---
  /** 来源文件 */
  sourceFile: string;
  /** 创建时间 */
  createdAt?: string;
  /** 最后更新时间 */
  updatedAt?: string;
}

// ---------------------------------------------------------------------------
// 2. Customer Case — 客户案例（100 个案例，来自 V-warfare-system）
// ---------------------------------------------------------------------------

/** 报价方案 */
export interface QuoteOption {
  /** 低价版 */
  low: number;
  /** 标准版 */
  standard: number;
  /** 高价版 */
  high: number;
  /** 推荐报价 */
  recommended: number;
}

/** 客户案例完整数据模型 */
export interface CustomerCase {
  /** 唯一标识 */
  id: number;
  /** 客户类型，如 "小公司老板", "留学机构" */
  customerType: string;
  /** 客户化名 */
  name: string;
  /** 年龄 */
  age: number;
  /** 所在城市 */
  location: string;
  /** 所在行业 */
  industry: string;
  /** 客户背景描述 */
  description: string;
  /** 客户痛点 */
  painPoint: string;
  /** 真实付费意愿 */
  willingness: string;
  /** 预算范围 */
  budget: string;
  /** 沟通难度 */
  difficulty: '低' | '中等' | '偏麻烦' | '高';
  /** 报价方案 */
  quote: QuoteOption;
  /** 推荐产品名称 */
  product: string;
  /** 交付天数 */
  deliveryDays: string;

  // --- 沟通策略 ---
  /** 沟通技巧 */
  communicationTips: string;
  /** 成交话术 */
  closingScript: string;

  // --- 风险和学习 ---
  /** 风险点列表 */
  riskPoints: string[];
  /** 关键学习 */
  keyLearning: string;

  // --- 扩展字段（来自 100_客户模拟案例库.md 的完整 9 模块结构） ---
  /** 客户原话 */
  customerQuote?: string;
  /** 表面需求 */
  surfaceNeed?: string;
  /** 真实需求 */
  realNeed?: string;
  /** 隐藏风险 */
  hiddenRisks?: string[];
  /** 是否值得接 */
  worthTaking?: boolean;
  /** 第一轮沟通问题 */
  firstRoundQuestions?: string[];
  /** 第二轮确认事项 */
  secondRoundConfirmations?: string[];
  /** 判断预算的方法 */
  budgetJudgmentMethod?: string;
  /** 判断麻烦客户的方法 */
  troubleCustomerSignals?: string[];
  /** 引导模糊需求的方法 */
  vagueNeedGuidance?: string;
  /** 报价理由 */
  quoteReasoning?: string;
  /** 额外收费项 */
  extraChargeItems?: string[];
  /** 应对太贵的话术 */
  tooExpensiveResponse?: string;
  /** 应对考虑一下的话术 */
  thinkingAboutItResponse?: string;
  /** 交付物列表 */
  deliverables?: string[];
  /** 验收标准 */
  acceptanceCriteria?: string;
  /** 最大翻车点 */
  biggestRisk?: string;
  /** 提前规避方法 */
  riskMitigation?: string;
  /** 合同条款建议 */
  contractTerms?: string[];
  /** 停止条件 */
  stopConditions?: string[];
  /** 训练能力 */
  skillDevelopment?: string;
  /** 类似客户处理建议 */
  similarCustomerAdvice?: string;
  /** 是否可变标准产品包 */
  canBecomeStandardProduct?: boolean;
  /** 标准产品包描述 */
  standardProductDescription?: string;
  /** 自我批判 */
  selfCritique?: string;
}

// ---------------------------------------------------------------------------
// 3. Workflow Template — 工作流模板（200 个模板，来自 ai-workflow-templates）
// ---------------------------------------------------------------------------

/** 工作流模板完整数据模型 */
export interface WorkflowTemplate {
  /** 唯一标识，格式: "{category_slug}-{序号}" 例如 "email-01" */
  id: string;
  /** 工作流名称 */
  name: string;
  /** 所属分类 */
  category: string;
  /** 目标用户描述 */
  targetUser: string;
  /** 原始痛点 */
  painPoint: string;
  /** 输入数据描述 */
  input: string;
  /** 输出结果描述 */
  output: string;
  /** 触发条件 */
  trigger: string;
  /** 执行步骤列表 */
  steps: string[];
  /** 需要的工具列表 */
  tools: string[];
  /** API 列表 */
  apis: string[];
  /** Prompt 模板 */
  promptTemplate: string;
  /** 人工检查点 */
  humanCheckpoints: string;
  /** 自动化边界（可自动/不能自动/需注意） */
  automationBoundary: string;
  /** 错误处理方案 */
  errorHandling: string;
  /** 隐私风险和缓解措施 */
  privacyRisk: string;
  /** 预计节省时间 */
  timeSaved: string;
  /** 定价建议 */
  pricing: string;
  /** Demo 实现方案 */
  demoApproach: string;
  /** 生产环境实现方案 */
  productionApproach: string;
  /** 可复用模块列表 */
  reusableModules: string[];
  /** 开发难度 */
  difficulty: '入门' | '中级' | '高级';
  /** 适用行业 */
  industry: string[];
  /** 商业价值评级 */
  businessValue: '高' | '中' | '低';
}

// ---------------------------------------------------------------------------
// 4. Eval Suite / Case / Report — 评测数据（来自 ai-eval-bench）
// ---------------------------------------------------------------------------

/** 评分维度 */
export interface DimensionScores {
  /** 正确性 */
  correctness: number;
  /** 有据性（基于证据） */
  groundedness: number;
  /** 安全性 */
  safety: number;
  /** 指令遵循 */
  instruction_following: number;
  /** 完整性 */
  completeness: number;
  /** 工具使用准确性 */
  tool_use_accuracy: number;
  /** 幻觉风险（100=无风险，0=高风险） */
  hallucination_risk: number;
}

/** 评分结果 */
export interface ScoreResult {
  /** 各维度分数 */
  dimensions: DimensionScores;
  /** 加权总分 */
  weighted_score: number;
  /** 是否通过 */
  pass: boolean;
  /** 各维度权重 */
  weights: Record<keyof DimensionScores, number>;
}

/** 错误类型枚举 */
export enum ErrorType {
  HALLUCINATION = 'hallucination',
  MISSING_EVIDENCE = 'missing_evidence',
  WRONG_TOOL_CALL = 'wrong_tool_call',
  UNSAFE_COMPLIANCE = 'unsafe_compliance',
  OVER_REFUSAL = 'over_refusal',
  UNDER_REFUSAL = 'under_refusal',
  INCOMPLETE_ANSWER = 'incomplete_answer',
  IRRELEVANT_ANSWER = 'irrelevant_answer',
  PRIVACY_LEAK = 'privacy_leak',
  PROMPT_INJECTION_FAILURE = 'prompt_injection_failure',
  NONE = 'none',
}

/** 评测测试用例 */
export interface EvalCase {
  /** 测试用例 ID */
  id: string;
  /** 场景名称 */
  scenario_name: string;
  /** 用户输入（单轮为 string，多轮为 string[]） */
  user_input: string | string[];
  /** 背景知识（作为 system prompt） */
  background_knowledge: string;
  /** 标准答案 */
  standard_answer: string;
  /** 错误回答示例 */
  wrong_answer_example: string;
  /** 评分标准 */
  scoring_rubric: string;
  /** 需要检索的信息 */
  information_to_retrieve: string | string[];
  /** 不应编造的信息 */
  information_not_to_invent: string | string[];
  /** 风险点 */
  risk_points: string | string[];
  /** 通过标准 */
  pass_criteria: string;
  /** 失败分析 */
  failure_analysis: string;
  /** 修复建议 */
  fix_suggestions: string;
  /** 所属套件（由 loader 注入） */
  _suite?: string;
}

/** 评测套件 */
export interface EvalSuite {
  /** 套件名称: rag, multiturn, tool, hallucination, safety, malicious */
  name: string;
  /** 套件描述 */
  description: string;
  /** 测试用例列表 */
  cases: EvalCase[];
}

/** 单个测试结果 */
export interface EvalResult {
  /** 测试用例 ID */
  test_case_id: string;
  /** 所属套件 */
  suite: string;
  /** 场景名称 */
  scenario_name: string;
  /** 模型输出 */
  model_output: string;
  /** 标准答案 */
  standard_answer: string;
  /** 评分结果 */
  scores: ScoreResult;
  /** 错误分类列表 */
  errors: ErrorType[];
  /** 响应延迟（毫秒） */
  latency_ms: number;
  /** 是否通过 */
  passed: boolean;
}

/** 套件统计 */
export interface SuiteSummary {
  /** 总用例数 */
  total: number;
  /** 通过数 */
  passed: number;
  /** 通过率 */
  pass_rate: number;
  /** 平均分 */
  avg_score: number;
}

/** 评测报告 */
export interface EvalReport {
  /** 报告摘要 */
  summary: {
    /** 总用例数 */
    total_cases: number;
    /** 通过数 */
    passed: number;
    /** 失败数 */
    failed: number;
    /** 通过率 */
    pass_rate: number;
    /** 平均加权分 */
    avg_weighted_score: number;
    /** 按套件统计 */
    by_suite: Record<string, SuiteSummary>;
    /** 错误类型分布 */
    error_counts: Record<string, number>;
    /** 生成时间戳 */
    timestamp: string;
  };
  /** 详细结果列表 */
  results: EvalResult[];
}

// ---------------------------------------------------------------------------
// 5. Service Product — 接单产品（14 个产品，来自 V-warfare-system）
// ---------------------------------------------------------------------------

/** 接单产品定价 */
export interface ProductPricing {
  /** 基础版价格 */
  basic: number;
  /** 标准版价格 */
  standard: number;
  /** 高级版价格 */
  premium: number;
}

/** 接单产品完整数据模型 */
export interface ServiceProduct {
  /** 唯一标识 */
  id: number;
  /** 产品名称 */
  name: string;
  /** 价格范围（文字描述） */
  priceRange: string;
  /** 交付天数 */
  deliveryDays: string;
  /** 开发难度 1-5 */
  difficulty: number;
  /** 是否适合第一单 */
  suitableForFirst: boolean;
  /** 目标客户类型 */
  targetCustomers: string[];
  /** 产品描述 */
  description: string;
  /** 交付物列表 */
  deliverables: string[];
  /** 三档定价 */
  pricing: ProductPricing;
  /** 销售话术（一句话版） */
  salesPitch: string;
  /** 风险点 */
  riskPoints: string[];
  /** 防翻车方案 */
  antiRisk: string[];

  // --- 扩展字段（来自 02_AI接单产品库.md 的完整结构） ---
  /** 需要客户提供什么材料 */
  clientMaterialsNeeded?: string[];
  /** 需要提前准备什么 */
  preparationNeeded?: string[];
  /** 最容易翻车的地方 */
  commonPitfalls?: string[];
  /** Demo 形式 */
  demoForm?: string;
  /** 对外销售话术（完整版） */
  fullSalesPitch?: string;
}

// ---------------------------------------------------------------------------
// 6. Risk Rule — 风险规则（来自 V-warfare-system 的风险评估逻辑）
// ---------------------------------------------------------------------------

/** 风险等级 */
export type RiskLevel = '低风险' | '中风险' | '高风险';

/** 风险评估结果 */
export interface RiskAssessment {
  /** 风险等级 */
  level: RiskLevel;
  /** 风险分数 */
  score: number;
  /** 风险因素列表 */
  factors: string[];
}

/** 风险规则 */
export interface RiskRule {
  /** 规则 ID */
  id: string;
  /** 规则名称 */
  name: string;
  /** 规则描述 */
  description: string;
  /** 触发条件 */
  condition: string;
  /** 风险分数增量 */
  scoreDelta: number;
  /** 缓解措施 */
  mitigation: string;
  /** 适用客户类型 */
  applicableCustomerTypes?: string[];
}

/** 定金规则 */
export interface DepositRule {
  /** 金额范围 */
  range: string;
  /** 定金比例 */
  ratio: string;
  /** 备注 */
  note: string;
}

/** 坏账策略 */
export interface BadDebtStrategy {
  /** 金额范围 */
  range: string;
  /** 处理方式 */
  action: string;
}

// ---------------------------------------------------------------------------
// 7. Talk Script — 话术模板（来自 V-warfare-system）
// ---------------------------------------------------------------------------

/** 话术类型 */
export type TalkScriptType =
  | 'firstMessage'      // 首条私信
  | 'firstCall'         // 首次电话
  | 'pricing'           // 报价话术
  | 'urgency'           // 催单话术
  | 'closing'           // 成交话术
  | 'objectionHandling' // 异议处理
  | 'followUp';         // 跟进话术

/** 话术模板 */
export interface TalkScript {
  /** 话术 ID */
  id: string;
  /** 话术类型 */
  type: TalkScriptType;
  /** 适用客户类型 */
  customerType: string;
  /** 适用场景描述 */
  scenario: string;
  /** 话术内容 */
  content: string;
  /** 使用说明/注意事项 */
  notes?: string;
  /** 替换变量说明（如 {客户名}, {行业}, {产品名}） */
  variables?: string[];
}

/** 客户画像完整数据模型 */
export interface CustomerProfile {
  /** 唯一标识 */
  id: number;
  /** 客户类型名称 */
  type: string;
  /** 最可能付钱的事 */
  willingToPayFor: string[];
  /** AI 的真实误解 */
  aiMisconceptions: string[];
  /** 切入策略 */
  approach: string;
  /** 首条私信模板 */
  firstMessage: string;
  /** 首次电话流程 */
  firstCallSteps: string[];
  /** 判断预算的指标 */
  budgetIndicators: string[];
  /** 报价策略 */
  pricingStrategy: string;
  /** 成交技巧 */
  closingTactics: string[];
}

// ---------------------------------------------------------------------------
// 8. Delivery SOP — 交付流程（来自 V-warfare-system）
// ---------------------------------------------------------------------------

/** SOP 步骤 */
export interface SOPStep {
  /** 步骤名称 */
  name: string;
  /** 持续时间 */
  duration: string;
  /** 任务列表 */
  tasks: string[];
}

/** 项目阶段 */
export interface ProjectPhase {
  /** 阶段名称 */
  name: string;
  /** 天数范围 */
  days: string;
  /** 任务列表 */
  tasks: string[];
}

/** 交付 SOP 完整数据模型 */
export interface DeliverySOP {
  /** 首次沟通流程 */
  firstContact: {
    /** 准备事项 */
    preparation: string[];
    /** 沟通步骤 */
    steps: SOPStep[];
    /** 沟通后事项 */
    postContact: string[];
  };
  /** 定金规则 */
  depositRules: {
    /** 定金比例表 */
    scales: DepositRule[];
    /** 收取时机 */
    timing: string[];
    /** 话术 */
    script: string;
    /** 不可退情况 */
    nonRefundable: string[];
    /** 可退情况 */
    refundable: string[];
  };
  /** 付款规则 */
  paymentRules: {
    /** 尾款支付时间 */
    finalPayment: string;
    /** 验收流程 */
    acceptanceProcess: string[];
    /** 催款话术（按天数） */
    collectionScript: Record<string, string>;
    /** 坏账策略 */
    badDebtStrategy: BadDebtStrategy[];
  };
  /** 项目排期 */
  projectSchedule: {
    /** 阶段列表 */
    phases: ProjectPhase[];
  };
}

// ---------------------------------------------------------------------------
// 9. Provider 接口（来自 ai-eval-bench，可复用到整个项目）
// ---------------------------------------------------------------------------

/** LLM Provider 响应 */
export interface ProviderResponse {
  /** 模型输出文本 */
  text: string;
  /** Token 使用量 */
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  /** 响应延迟（毫秒） */
  latency_ms: number;
}

/** LLM Provider 接口 */
export interface Provider {
  /** Provider 名称 */
  readonly name: string;
  /** 发送请求 */
  complete(prompt: string, systemPrompt?: string): Promise<ProviderResponse>;
}

/** OpenAI Provider 配置 */
export interface OpenAIProviderOptions {
  /** API 基础 URL */
  baseURL: string;
  /** API Key */
  apiKey: string;
  /** 模型名称 */
  model: string;
  /** 温度参数 */
  temperature?: number;
  /** 最大 token 数 */
  max_tokens?: number;
}

// ---------------------------------------------------------------------------
// 10. App-level 类型
// ---------------------------------------------------------------------------

/** 需求接单表单数据 */
export interface IntakeFormData {
  companyName: string;
  contactName: string;
  contactInfo: string;
  industry: string;
  teamSize: string;
  problem: string;
  currentSolution: string;
  timeImpact: string;
  expectedSolution: string;
  expectedEffect: string;
  reference: string;
  systems: string;
  dataSource: string;
  dataVolume: string;
  techRequirements: string;
  deliveryTime: string;
  deliveryForm: string;
  acceptanceCriteria: string;
  trainingNeeded: boolean;
  supportPeriod: string;
  budget: string;
  paymentPreference: string;
  additionalNotes: string;
}

/** 应用设置 */
export interface AppSettings {
  /** Mock Mode 开关 */
  mockMode: boolean;
  /** OpenAI Provider 配置 */
  provider: OpenAIProviderOptions;
  /** 语言 */
  locale: 'zh-CN' | 'en';
  /** 主题 */
  theme: 'light' | 'dark' | 'system';
}

/** 项目-工作流关联 */
export interface ProjectWorkflowLink {
  /** 项目 ID */
  projectId: string;
  /** 工作流 ID 列表 */
  workflowIds: string[];
  /** 关联说明 */
  description: string;
}

/** 项目-产品关联 */
export interface ProjectProductLink {
  /** 项目 ID */
  projectId: string;
  /** 可转化为的产品 ID 列表 */
  productIds: number[];
  /** 关联说明 */
  description: string;
}

// ---------------------------------------------------------------------------
// 11. JSON 文件结构定义（/data/ 目录下的文件）
// ---------------------------------------------------------------------------

/** /data/projects.json 的结构 */
export type ProjectsData = AIProject[];

/** /data/workflows.json 的结构 */
export type WorkflowsData = WorkflowTemplate[];

/** /data/customerCases.json 的结构 */
export type CustomerCasesData = CustomerCase[];

/** /data/customerProfiles.json 的结构 */
export type CustomerProfilesData = CustomerProfile[];

/** /data/serviceProducts.json 的结构 */
export type ServiceProductsData = ServiceProduct[];

/** /data/evalReport.json 的结构 */
export type EvalReportData = EvalReport;

/** /data/deliverySOP.json 的结构 */
export type DeliverySOPData = DeliverySOP;

/** /data/talkScripts.json 的结构 */
export type TalkScriptsData = TalkScript[];

/** /data/riskRules.json 的结构 */
export type RiskRulesData = RiskRule[];

/** /data/appSettings.json 的结构 */
export type AppSettingsData = AppSettings;
