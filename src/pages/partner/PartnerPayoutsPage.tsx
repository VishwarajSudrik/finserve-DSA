import React, { useEffect, useState } from 'react';
import { payoutService } from '../../services/payoutService';
import { reportService } from '../../services/reportService';
import type { PayoutRecord } from '../../types/payout';
import { useToast } from '../../app/providers/ToastContext';
import { formatINR } from '../../utils/formatters';
import { StatCard } from '../../components/common/StatCard';
import { DataTable, type Column } from '../../components/common/DataTable';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Skeleton } from '../../components/common/Skeleton';
import { Wallet, Download, FileSpreadsheet, FileText } from 'lucide-react';

export const PartnerPayoutsPage: React.FC = () => {
  const [payouts, setPayouts] = useState<PayoutRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    payoutService.getPayouts({ partnerId: 'pt-201' }).then((res) => {
      setPayouts(res);
      setLoading(false);
    });
  }, []);

  const handleExport = async (format: 'csv' | 'excel' | 'pdf') => {
    const res = await reportService.exportReportSimulator('Partner_Commission_Statement', format);
    showToast('Export Initiated', `Generated ${res.filename}`, 'success');
  };

  const columns: Column<PayoutRecord>[] = [
    { header: 'Payout No', accessorKey: 'payoutNumber', cell: (r) => <span className="font-mono font-bold">{r.payoutNumber}</span> },
    { header: 'Customer', accessorKey: 'customerName' },
    { header: 'Product', accessorKey: 'productName' },
    { header: 'Disbursal Amount', accessorKey: 'disbursalAmount', cell: (r) => formatINR(r.disbursalAmount) },
    { header: 'Rate (%)', accessorKey: 'commissionPercentage', cell: (r) => `${r.commissionPercentage}%` },
    { header: 'Gross Payout', accessorKey: 'grossPayoutAmount', cell: (r) => formatINR(r.grossPayoutAmount) },
    { header: 'TDS (5%)', accessorKey: 'tdsDeduction', cell: (r) => formatINR(r.tdsDeduction) },
    { header: 'Net Payout', accessorKey: 'netPayoutAmount', cell: (r) => <span className="font-bold text-emerald-600">{formatINR(r.netPayoutAmount)}</span> },
    { header: 'Status', accessorKey: 'payoutStatus', cell: (r) => <Badge status={r.payoutStatus} /> },
  ];

  if (loading) return <Skeleton className="h-64 w-full" />;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Partner Commission & Payout Desk</h1>
          <p className="text-xs text-slate-500">Transparent commission statements, TDS breakdown, and disbursal UTRs</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" leftIcon={<FileSpreadsheet className="w-4 h-4 text-emerald-600" />} onClick={() => handleExport('excel')}>
            Excel
          </Button>
          <Button variant="outline" size="sm" leftIcon={<Download className="w-4 h-4 text-blue-600" />} onClick={() => handleExport('csv')}>
            CSV
          </Button>
          <Button variant="outline" size="sm" leftIcon={<FileText className="w-4 h-4 text-red-600" />} onClick={() => handleExport('pdf')}>
            PDF
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="TOTAL DISBURSED FACILITY" value={formatINR(18500000)} subtitle="2 Disbursed Accounts" />
        <StatCard title="EXPECTED COMMISSION" value={formatINR(30875)} subtitle="Approval Pending" icon={<Wallet className="w-5 h-5 text-amber-600" />} iconBgColor="bg-amber-50" />
        <StatCard title="PAID NET PAYOUT" value={formatINR(21375)} subtitle="Credited to Bank" icon={<Wallet className="w-5 h-5 text-emerald-600" />} iconBgColor="bg-emerald-50" />
        <StatCard title="TDS DEDUCTED (5%)" value={formatINR(2750)} subtitle="Form 26AS Reported" />
      </div>

      {/* Payouts Table */}
      <DataTable
        data={payouts}
        columns={columns}
        keyExtractor={(r) => r.id}
        searchPlaceholder="Search payouts by number, customer, product..."
      />
    </div>
  );
};

export const PartnerReportsPage: React.FC = () => {
  const { showToast } = useToast();

  const handleExport = async (reportName: string, format: 'csv' | 'excel' | 'pdf') => {
    const res = await reportService.exportReportSimulator(reportName, format);
    showToast('Report Downloaded', `Simulated file ${res.filename} downloaded.`, 'success');
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Partner Analytics & Performance Reports</h1>
        <p className="text-xs text-slate-500">Generate lead, application, disbursal, and payout statements</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { title: 'Lead Funnel Report', desc: 'Summary of all lead submissions and stage conversion rates.' },
          { title: 'Application Pipeline Report', desc: 'Detailed status report of loan applications across lenders.' },
          { title: 'Disbursement Summary Report', desc: 'Breakdown of disbursed loan accounts and amounts.' },
          { title: 'Payout & TDS Statement', desc: 'Complete statement of gross commission, TDS, and UTR numbers.' }
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-fintech space-y-4">
            <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
            <p className="text-xs text-slate-500">{item.desc}</p>
            <div className="flex gap-2 pt-2">
              <Button size="sm" variant="outline" onClick={() => handleExport(item.title, 'csv')}>CSV</Button>
              <Button size="sm" variant="outline" onClick={() => handleExport(item.title, 'excel')}>Excel</Button>
              <Button size="sm" variant="outline" onClick={() => handleExport(item.title, 'pdf')}>PDF</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
