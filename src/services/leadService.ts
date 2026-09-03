import { MOCK_LEADS } from '../data/leads';
import type { Lead, LeadStatus } from '../types/lead';

// Simulated delay helper
const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

class LeadService {
  private leads: Lead[] = [...MOCK_LEADS];

  async getLeads(filters?: { status?: string; search?: string; partnerId?: string }): Promise<Lead[]> {
    await delay();
    let result = [...this.leads];

    if (filters?.status && filters.status !== 'all') {
      result = result.filter((l) => l.status === filters.status);
    }
    if (filters?.partnerId) {
      result = result.filter((l) => l.partnerId === filters.partnerId);
    }
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (l) =>
          l.customerName.toLowerCase().includes(q) ||
          l.leadNumber.toLowerCase().includes(q) ||
          l.mobile.includes(q) ||
          l.city.toLowerCase().includes(q)
      );
    }
    return result;
  }

  async getLeadById(id: string): Promise<Lead | undefined> {
    await delay();
    return this.leads.find((l) => l.id === id || l.leadNumber === id);
  }

  async createLead(newLeadData: Partial<Lead>): Promise<{ lead: Lead; isDuplicateWarning?: boolean }> {
    await delay(500);
    // Frontend mock duplicate detection check
    const isDuplicate = this.leads.some(
      (l) => l.mobile === newLeadData.mobile && l.productSlug === newLeadData.productSlug
    );

    const createdLead: Lead = {
      id: `ld-${Date.now()}`,
      leadNumber: `LD-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: newLeadData.customerName || 'Prospect Name',
      mobile: newLeadData.mobile || '9999999999',
      email: newLeadData.email || 'prospect@example.com',
      city: newLeadData.city || 'Mumbai',
      productSlug: newLeadData.productSlug || 'personal-loan',
      productName: newLeadData.productName || 'Personal Loan',
      loanAmount: newLeadData.loanAmount || 500000,
      employmentType: newLeadData.employmentType || 'salaried',
      monthlyIncome: newLeadData.monthlyIncome,
      source: newLeadData.source || 'website',
      partnerId: newLeadData.partnerId,
      partnerName: newLeadData.partnerName,
      assignedRmName: 'Unassigned',
      status: 'new',
      priority: newLeadData.priority || 'medium',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      activities: [
        {
          id: `act-${Date.now()}`,
          type: 'note',
          title: 'Lead Created',
          description: 'Lead registered in platform.',
          timestamp: new Date().toISOString(),
          actorName: newLeadData.partnerName ? `Partner (${newLeadData.partnerName})` : 'System'
        }
      ]
    };

    this.leads.unshift(createdLead);
    return { lead: createdLead, isDuplicateWarning: isDuplicate };
  }

  async updateLeadStatus(id: string, newStatus: LeadStatus, note?: string): Promise<Lead> {
    await delay();
    const index = this.leads.findIndex((l) => l.id === id);
    if (index === -1) throw new Error('Lead not found');

    const updated = {
      ...this.leads[index],
      status: newStatus,
      updatedAt: new Date().toISOString(),
      activities: [
        ...(this.leads[index].activities || []),
        {
          id: `act-${Date.now()}`,
          type: 'status_change' as const,
          title: 'Status Updated',
          description: note || `Status changed to ${newStatus}`,
          timestamp: new Date().toISOString(),
          actorName: 'User Action'
        }
      ]
    };
    this.leads[index] = updated;
    return updated;
  }

  async assignLead(id: string, rmName: string): Promise<Lead> {
    await delay();
    const index = this.leads.findIndex((l) => l.id === id);
    if (index === -1) throw new Error('Lead not found');

    const updated = {
      ...this.leads[index],
      assignedRmName: rmName,
      updatedAt: new Date().toISOString(),
    };
    this.leads[index] = updated;
    return updated;
  }
}

export const leadService = new LeadService();
