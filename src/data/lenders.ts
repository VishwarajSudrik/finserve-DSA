import type { LenderPartner } from '../types/lender';

export const MOCK_LENDERS: LenderPartner[] = [
  {
    id: 'lnd-01',
    lenderCode: 'LND-ALPHA',
    name: 'Lender Partner Alpha (National Bank)',
    type: 'Bank',
    productsCovered: ['Personal Loan', 'Home Loan', 'Business Loan', 'Loan Against Property'],
    statesCovered: ['Pan India'],
    minCibilScore: 700,
    maxLTV: '85%',
    avgTurnaroundDays: 3,
    status: 'active'
  },
  {
    id: 'lnd-02',
    lenderCode: 'LND-BETA',
    name: 'Lender Partner Beta (Premier NBFC)',
    type: 'NBFC',
    productsCovered: ['Business Loan', 'MSME Finance', 'Working Capital', 'Machinery Finance'],
    statesCovered: ['Pan India'],
    minCibilScore: 680,
    maxLTV: '80%',
    avgTurnaroundDays: 2,
    status: 'active'
  },
  {
    id: 'lnd-03',
    lenderCode: 'LND-GAMMA',
    name: 'Lender Partner Gamma (Housing Finance Corp)',
    type: 'HFC',
    productsCovered: ['Home Loan', 'Loan Against Property'],
    statesCovered: ['Maharashtra', 'Karnataka', 'Delhi-NCR', 'Gujarat', 'Tamil Nadu'],
    minCibilScore: 650,
    maxLTV: '90%',
    avgTurnaroundDays: 5,
    status: 'active'
  }
];
