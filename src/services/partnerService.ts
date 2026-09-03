import { MOCK_PARTNERS } from '../data/partners';
import type { DSAPartner, PartnerStatus } from '../types/partner';

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

class PartnerService {
  private partners: DSAPartner[] = [...MOCK_PARTNERS];

  async getPartners(filters?: { status?: string; search?: string }): Promise<DSAPartner[]> {
    await delay();
    let result = [...this.partners];
    if (filters?.status && filters.status !== 'all') {
      result = result.filter((p) => p.status === filters.status);
    }
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (p) => p.fullName.toLowerCase().includes(q) || p.partnerCode.toLowerCase().includes(q) || p.city.toLowerCase().includes(q)
      );
    }
    return result;
  }

  async registerPartner(data: Partial<DSAPartner>): Promise<DSAPartner> {
    await delay(600);
    const partner: DSAPartner = {
      id: `pt-${Date.now()}`,
      partnerCode: `DSA-2026-${Math.floor(100 + Math.random() * 900)}`,
      fullName: data.fullName || 'Partner Applicant',
      businessName: data.businessName,
      mobile: data.mobile || '9800000000',
      email: data.email || 'partner@example.com',
      city: data.city || 'Mumbai',
      state: data.state || 'Maharashtra',
      profession: data.profession || 'Financial Consultant',
      businessType: data.businessType || 'individual',
      existingDsaStatus: !!data.existingDsaStatus,
      productsInterested: data.productsInterested || ['Personal Loan'],
      panMasked: data.panMasked || 'ABCXX1234X',
      bankAccountMasked: 'Pending Verification',
      status: 'pending',
      totalLeadsCount: 0,
      totalApplicationsCount: 0,
      totalDisbursedAmount: 0,
      totalEarnedPayout: 0,
      joinedDate: new Date().toISOString()
    };
    this.partners.unshift(partner);
    return partner;
  }

  async updatePartnerStatus(id: string, status: PartnerStatus): Promise<DSAPartner> {
    await delay();
    const p = this.partners.find((item) => item.id === id);
    if (!p) throw new Error('Partner not found');
    p.status = status;
    return p;
  }
}

export const partnerService = new PartnerService();
