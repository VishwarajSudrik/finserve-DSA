const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

export interface AnalyticsReportData {
  monthlyLeadTrend: { month: string; leads: number; applications: number; disbursements: number }[];
  productDistribution: { name: string; value: number }[];
  leadSourceBreakdown: { source: string; percentage: number }[];
  partnerPerformance: { partnerName: string; leadsSubmitted: number; amountDisbursed: number; commissionPaid: number }[];
  disbursementSummary: { totalRequested: number; totalSanctioned: number; totalDisbursed: number; avgTurnaroundDays: number };
}

class ReportService {
  async getAnalyticsData(): Promise<AnalyticsReportData> {
    await delay();
    return {
      monthlyLeadTrend: [
        { month: 'Oct 2025', leads: 120, applications: 85, disbursements: 42 },
        { month: 'Nov 2025', leads: 145, applications: 102, disbursements: 58 },
        { month: 'Dec 2025', leads: 180, applications: 130, disbursements: 74 },
        { month: 'Jan 2026', leads: 210, applications: 155, disbursements: 92 },
        { month: 'Feb 2026', leads: 260, applications: 190, disbursements: 115 },
      ],
      productDistribution: [
        { name: 'Personal Loan', value: 35 },
        { name: 'Home Loan', value: 25 },
        { name: 'Business Loan', value: 20 },
        { name: 'LAP', value: 12 },
        { name: 'Machinery / Others', value: 8 },
      ],
      leadSourceBreakdown: [
        { source: 'DSA Partner Network', percentage: 55 },
        { source: 'Direct Website / Organic', percentage: 28 },
        { source: 'Referrals & Advisory', percentage: 17 },
      ],
      partnerPerformance: [
        { partnerName: 'Apex Financial Services', leadsSubmitted: 42, amountDisbursed: 18500000, commissionPaid: 277500 },
        { partnerName: 'Horizon Capital Solutions', leadsSubmitted: 31, amountDisbursed: 34000000, commissionPaid: 510000 },
        { partnerName: 'Zenith Wealth Partners', leadsSubmitted: 6, amountDisbursed: 1200000, commissionPaid: 18000 },
      ],
      disbursementSummary: {
        totalRequested: 145000000,
        totalSanctioned: 112000000,
        totalDisbursed: 96500000,
        avgTurnaroundDays: 3.8
      }
    };
  }

  async exportReportSimulator(reportName: string, format: 'csv' | 'excel' | 'pdf'): Promise<{ success: boolean; filename: string }> {
    await delay(600);
    return {
      success: true,
      filename: `${reportName.toLowerCase().replace(/\s+/g, '_')}_export_${Date.now()}.${format === 'excel' ? 'xlsx' : format}`
    };
  }
}

export const reportService = new ReportService();
