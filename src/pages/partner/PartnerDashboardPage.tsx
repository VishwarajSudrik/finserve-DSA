import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { leadService } from '../../services/leadService';
import { payoutService } from '../../services/payoutService';
import { reportService, type AnalyticsReportData } from '../../services/reportService';
import type { Lead } from '../../types/lead';
import { formatINR } from '../../utils/formatters';
import { StatCard } from '../../components/common/StatCard';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Skeleton } from '../../components/common/Skeleton';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import { Users, FileCheck, Wallet, Plus, TrendingUp } from 'lucide-react';

export const PartnerDashboardPage: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsReportData | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const [lList, , aData] = await Promise.all([
          leadService.getLeads({ partnerId: 'pt-201' }),
          payoutService.getPayouts({ partnerId: 'pt-201' }),
          reportService.getAnalyticsData()
        ]);
        setLeads(lList);
        setAnalytics(aData);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <Skeleton className="h-64 w-full" />;

  const COLORS = ['#2563EB', '#059669', '#D97706', '#9333EA', '#64748B'];

  return (
    <div className="space-y-8">
      {/* Header & Quick Action */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Apex Financial Services (DSA Dashboard)</h1>
          <p className="text-xs text-slate-500">Real-time lead conversion pipeline & payout summary</p>
        </div>

        <Button
          variant="success"
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={() => navigate('/partner/leads?action=add')}
        >
          Add New Customer Lead
        </Button>
      </div>

      {/* KPI Row (Requirement 25) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="TOTAL LEADS" value={42} subtitle="3 new this week" icon={<Users className="w-5 h-5 text-blue-600" />} />
        <StatCard title="DISBURSED AMOUNT" value={formatINR(18500000)} subtitle="28 Applications" icon={<FileCheck className="w-5 h-5 text-emerald-600" />} iconBgColor="bg-emerald-50" />
        <StatCard title="EXPECTED PAYOUT" value={formatINR(30875)} subtitle="Approval Pending" icon={<Wallet className="w-5 h-5 text-amber-600" />} iconBgColor="bg-amber-50" />
        <StatCard title="PAID COMMISSION" value={formatINR(277500)} subtitle="TDS Paid (5%)" icon={<TrendingUp className="w-5 h-5 text-purple-600" />} iconBgColor="bg-purple-50" />
      </div>

      {/* Recharts Analytics Section (Requirement 25) */}
      {analytics && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Lead Trend Line Chart */}
          <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-fintech space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Monthly Lead & Disbursal Performance</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analytics.monthlyLeadTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="month" stroke="#64748B" fontSize={11} />
                  <YAxis stroke="#64748B" fontSize={11} />
                  <Tooltip />
                  <Line type="monotone" dataKey="leads" stroke="#2563EB" strokeWidth={3} name="Total Leads" />
                  <Line type="monotone" dataKey="disbursements" stroke="#059669" strokeWidth={3} name="Disbursed Loans" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Product Distribution Pie Chart */}
          <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-fintech space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Lead Product Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={analytics.productDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={75} fill="#8884d8" label>
                    {analytics.productDistribution.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Recent Leads Preview */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-fintech p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-base font-bold text-slate-900">Recent Customer Leads</h3>
          <Button variant="outline" size="sm" onClick={() => navigate('/partner/leads')}>
            View Lead CRM
          </Button>
        </div>

        <div className="space-y-3">
          {leads.map((lead) => (
            <div key={lead.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center text-xs">
              <div>
                <span className="font-mono text-slate-400">{lead.leadNumber}</span>
                <p className="font-bold text-slate-900 text-sm">{lead.customerName}</p>
                <p className="text-slate-500">{lead.productName} • {formatINR(lead.loanAmount)}</p>
              </div>
              <Badge status={lead.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
