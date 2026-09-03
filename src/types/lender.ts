export type LenderType = 'Bank' | 'NBFC' | 'HFC' | 'Fintech Partner';

export interface LenderPartner {
  id: string;
  lenderCode: string;
  name: string;
  type: LenderType;
  logoUrl?: string;
  productsCovered: string[];
  statesCovered: string[];
  minCibilScore: number;
  maxLTV: string;
  avgTurnaroundDays: number;
  status: 'active' | 'inactive';
}
