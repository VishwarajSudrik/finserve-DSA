import { MOCK_APPLICATIONS } from '../data/applications';
import type { LoanApplication, ApplicationStage } from '../types/application';

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

class ApplicationService {
  private applications: LoanApplication[] = [...MOCK_APPLICATIONS];

  async getApplications(filters?: { search?: string; stage?: string }): Promise<LoanApplication[]> {
    await delay();
    let result = [...this.applications];

    if (filters?.stage && filters.stage !== 'all') {
      result = result.filter((a) => a.currentStage === filters.stage);
    }
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (a) =>
          a.customerName.toLowerCase().includes(q) ||
          a.applicationNumber.toLowerCase().includes(q) ||
          a.productName.toLowerCase().includes(q)
      );
    }
    return result;
  }

  async getApplicationById(id: string): Promise<LoanApplication | undefined> {
    await delay();
    return this.applications.find((a) => a.id === id || a.applicationNumber === id);
  }

  async updateStage(id: string, stage: ApplicationStage): Promise<LoanApplication> {
    await delay();
    const app = this.applications.find((a) => a.id === id);
    if (!app) throw new Error('Application not found');

    app.currentStage = stage;
    app.lastUpdatedDate = new Date().toISOString();
    return app;
  }
}

export const applicationService = new ApplicationService();
