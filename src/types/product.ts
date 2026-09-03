export type ProductCategoryId = 
  | 'personal-loan'
  | 'home-loan'
  | 'business-loan'
  | 'msme-finance'
  | 'loan-against-property'
  | 'working-capital'
  | 'machinery-finance'
  | 'commercial-vehicle-finance'
  | 'credit-card';

export interface ProductFeature {
  title: string;
  description: string;
}

export interface EligibilityCriterion {
  label: string;
  value: string;
}

export interface ProductFAQ {
  question: string;
  answer: string;
}

export interface LoanProduct {
  id: string;
  slug: ProductCategoryId;
  name: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  minAmount: number;
  maxAmount: number;
  minInterestRate: number;
  maxTenureMonths: number;
  processingFeeRange: string;
  keyBenefits: string[];
  features: ProductFeature[];
  eligibility: EligibilityCriterion[];
  requiredDocuments: string[];
  faqs: ProductFAQ[];
  calculatorType: 'emi' | 'eligibility' | 'credit-card';
  status: 'active' | 'inactive';
}
