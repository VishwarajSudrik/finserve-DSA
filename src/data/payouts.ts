import type { PayoutRecord } from '../types/payout';

export const MOCK_PAYOUTS: PayoutRecord[] = [
  {
    id: 'pay-701',
    payoutNumber: 'PO-2026-089',
    applicationId: 'app-501',
    partnerId: 'pt-201',
    partnerName: 'Apex Financial Services',
    customerName: 'Rahul Mehta',
    productName: 'Personal Loan',
    disbursalAmount: 1500000,
    commissionPercentage: 1.50,
    grossPayoutAmount: 22500,
    tdsDeduction: 1125,
    netPayoutAmount: 21375,
    disbursalDate: '2026-02-15T16:00:00Z',
    payoutStatus: 'paid',
    paymentDate: '2026-02-25T11:00:00Z',
    utrNumber: 'CMS901238471203'
  },
  {
    id: 'pay-702',
    payoutNumber: 'PO-2026-112',
    applicationId: 'app-502',
    partnerId: 'pt-201',
    partnerName: 'Apex Financial Services',
    customerName: 'Priya Sharma',
    productName: 'Home Loan',
    disbursalAmount: 6500000,
    commissionPercentage: 0.50,
    grossPayoutAmount: 32500,
    tdsDeduction: 1625,
    netPayoutAmount: 30875,
    disbursalDate: '2026-02-28T12:00:00Z',
    payoutStatus: 'approved',
    paymentDate: undefined,
    utrNumber: undefined
  }
];
