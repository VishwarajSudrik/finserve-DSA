export type PayoutStatus = 'pending' | 'approved' | 'processing' | 'paid' | 'on_hold' | 'rejected';

export interface PayoutRecord {
  id: string;
  payoutNumber: string;
  applicationId: string;
  partnerId: string;
  partnerName: string;
  customerName: string;
  productName: string;
  disbursalAmount: number;
  commissionPercentage: number;
  grossPayoutAmount: number;
  tdsDeduction: number;
  netPayoutAmount: number;
  disbursalDate: string;
  payoutStatus: PayoutStatus;
  paymentDate?: string;
  utrNumber?: string;
}
