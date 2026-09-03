import React, { useEffect, useState } from 'react';
import { reportService, type AnalyticsReportData } from '../../services/reportService';
import { StatCard } from '../../components/common/StatCard';
import { Skeleton } from '../../components/common/Skeleton';
import { formatINR } from '../../utils/formatters';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import { Users, FileText, CheckCircle2, TrendingUp } from 'lucide-react';

export const CRMDashboardPage: React.FC = () => {
  const [analytics, setAnalytics] = useState<AnalyticsReportData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    reportService.getAnalyticsData().then((data) => {
      setAnalytics(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <Skeleton className="h-64 w-full" />;

  const COLORS = ['#2563EB', '#059669', '#D97706', '#9333EA', '#64748B'];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Enterprise Operations & CRM Dashboard</h1>
        <p className="text-xs text-slate-500">Live operational overview for Relationship Managers and Administrators</p>
      </div>

      {/* Metric Cards Grid (Requirement 32) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="TODAY'S LEADS" value={14} subtitle="4 Urgent priority" icon={<Users className="w-5 h-5 text-blue-600" />} />
        <StatCard title="NEW APPLICATIONS" value={8} subtitle="Underwriting active" icon={<FileText className="w-5 h-5 text-amber-600" />} iconBgColor="bg-amber-50" />
        <StatCard title="SANCTIONED VALUE" value={formatINR(112000000)} subtitle="This month" icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />} iconBgColor="bg-emerald-50" />
        <StatCard title="DISBURSED TOTAL" value={formatINR(96500000)} subtitle="Avg TAT: 3.8 Days" icon={<TrendingUp className="w-5 h-5 text-purple-600" />} iconBgColor="bg-purple-50" />
      </div>

      {/* Analytics Charts Grid */}
      {analytics && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Applications by Product Bar Chart */}
          <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-fintech space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Lead Volume Trend by Month</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics.monthlyLeadTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="month" stroke="#64748B" fontSize={11} />
                  <YAxis stroke="#64748B" fontSize={11} />
                  <Tooltip />
                  <Bar dataKey="leads" fill="#2563EB" radius={[6, 6, 0, 0]} name="Leads" />
                  <Bar dataKey="disbursements" fill="#059669" radius={[6, 6, 0, 0]} name="Disbursements" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Lead Source Breakdown */}
          <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-fintech space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Lead Source Attribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={analytics.leadSourceBreakdown} dataKey="percentage" nameKey="source" cx="50%" cy="50%" outerRadius={75} label>
                    {analytics.leadSourceBreakdown.map((_, index) => (
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
    </div>
  );
};
