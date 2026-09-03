import { MOCK_PAYOUTS } from '../data/payouts';
import { MOCK_LENDERS } from '../data/lenders';
import type { PayoutRecord, PayoutStatus } from '../types/payout';
import type { LenderPartner } from '../types/lender';

const delay = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms));

class PayoutService {
  private payouts: PayoutRecord[] = [...MOCK_PAYOUTS];

  async getPayouts(filters?: { status?: string; partnerId?: string }): Promise<PayoutRecord[]> {
    await delay();
    let res = [...this.payouts];
    if (filters?.status && filters.status !== 'all') {
      res = res.filter((p) => p.payoutStatus === filters.status);
    }
    if (filters?.partnerId) {
      res = res.filter((p) => p.partnerId === filters.partnerId);
    }
    return res;
  }

  async updatePayoutStatus(id: string, status: PayoutStatus, utr?: string): Promise<PayoutRecord> {
    await delay();
    const item = this.payouts.find((p) => p.id === id);
    if (!item) throw new Error('Payout not found');
    item.payoutStatus = status;
    if (utr) item.utrNumber = utr;
    if (status === 'paid') item.paymentDate = new Date().toISOString();
    return item;
  }
}

class LenderService {
  private lenders: LenderPartner[] = [...MOCK_LENDERS];

  async getLenders(): Promise<LenderPartner[]> {
    await delay();
    return this.lenders;
  }
}

export const payoutService = new PayoutService();
export const lenderService = new LenderService();
