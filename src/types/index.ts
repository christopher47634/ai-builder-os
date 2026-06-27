// AI Builder OS — TypeScript Type Definitions

export interface ProjectScores {
  resumeValue: number;
  businessValue: number;
  techGrowth: number;
  freelanceValue: number;
  developability: number;
}

export interface TechStack {
  frontend: string;
  backend: string;
  database: string;
  others?: string[];
}

export interface AIProject {
  id: string;
  name: string;
  englishName?: string;
  category: string;
  categoryIndex: number;
  oneliner: string;
  difficulty: number;
  scores: ProjectScores;
  avgScore: number;
  targetUsers: string[];
  painPoints: string[];
  traditionalSolutionWeakness: string;
  aiIntervention: string;
  coreFeatures: string[];
  mvpScope: string[];
  v1Scope: string[];
  outOfScope: string[];
  userFlow: string[];
  pageStructure: string;
  dataSource: string[];
  dataStructure: string;
  needsRAG: boolean;
  needsAgent: boolean;
  needsToolCalling: boolean;
  needsMultimodal: boolean;
  techStack: TechStack;
  apiDesign?: string;
  keyAlgorithms?: string;
  promptTemplate?: string;
  risks: string[];
  estimatedDuration?: string;
  businessValueRating?: string;
  sourceFile: string;
}

export interface QuoteOption {
  low: number;
  standard: number;
  high: number;
  recommended: number;
}

export interface CustomerCase {
  id: number;
  customerType: string;
  name: string;
  age: number;
  location: string;
  industry: string;
  description: string;
  painPoint: string;
  willingness: string;
  budget: string;
  difficulty: string;
  quote: QuoteOption;
  product: string;
  deliveryDays: string;
  communicationTips: string;
  closingScript: string;
  riskPoints: string[];
  keyLearning: string;
  customerQuote?: string;
  surfaceNeed?: string;
  realNeed?: string;
  hiddenRisks?: string[];
  worthTaking?: boolean;
  firstRoundQuestions?: string[];
  acceptanceCriteria?: string;
  biggestRisk?: string;
  stopConditions?: string[];
}

export interface WorkflowTemplate {
  id: string;
  name: string;
  category: string;
  targetUser: string;
  painPoint: string;
  input: string;
  output: string;
  trigger: string;
  steps: string[];
  tools: string[];
  apis: string[];
  promptTemplate: string;
  humanCheckpoints: string;
  automationBoundary: string;
  errorHandling: string;
  privacyRisk: string;
  timeSaved: string;
  pricing: string;
  demoApproach: string;
  productionApproach: string;
  reusableModules: string[];
  difficulty: string;
  industry: string[];
  businessValue: string;
}

export interface EvalCase {
  id: string;
  scenario_name: string;
  user_input: string | string[];
  background_knowledge: string;
  standard_answer: string;
  wrong_answer_example: string;
  scoring_rubric: string;
  information_to_retrieve: string | string[];
  information_not_to_invent: string | string[];
  risk_points: string | string[];
  pass_criteria: string;
  failure_analysis: string;
  fix_suggestions: string;
}

export interface ServiceProduct {
  id: number;
  name: string;
  priceRange: string;
  deliveryDays: string;
  difficulty: number;
  suitableForFirst: boolean;
  targetCustomers: string[];
  description: string;
  deliverables: string[];
  pricing: { basic: number; standard: number; premium: number };
  salesPitch: string;
  riskPoints: string[];
  antiRisk: string[];
}

export interface CustomerProfile {
  id: number;
  type: string;
  willingToPayFor: string[];
  aiMisconceptions: string[];
  approach: string;
  firstMessage: string;
  firstCallSteps: string[];
  budgetIndicators: string[];
  pricingStrategy: string;
  closingTactics: string[];
}

export interface SOPData {
  firstContact: {
    preparation: string[];
    steps: { name: string; duration: string; tasks: string[] }[];
    postContact: string[];
  };
  depositRules: {
    scales: { range: string; ratio: string; note: string }[];
    timing: string[];
    script: string;
  };
  paymentRules: {
    finalPayment: string;
    acceptanceProcess: string[];
  };
  projectSchedule: {
    phases: { name: string; days: string; tasks: string[] }[];
  };
}
