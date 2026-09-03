export type PartnerStatus = 'pending' | 'under_review' | 'active' | 'suspended' | 'rejected' | 'inactive';

export interface DSAPartner {
  id: string;
  partnerCode: string;
  fullName: string;
  businessName?: string;
  mobile: string;
  email: string;
  city: string;
  state: string;
  profession: string;
  businessType: 'individual' | 'proprietorship' | 'partnership' | 'pvtltd' | 'nbfc_agent';
  existingDsaStatus: boolean;
  productsInterested: string[];
  gstin?: string;
  panMasked: string;
  bankAccountMasked: string;
  status: PartnerStatus;
  totalLeadsCount: number;
  totalApplicationsCount: number;
  totalDisbursedAmount: number;
  totalEarnedPayout: number;
  joinedDate: string;
}
