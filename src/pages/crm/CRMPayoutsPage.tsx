import React, { useEffect, useState } from 'react';
import { payoutService } from '../../services/payoutService';
import type { PayoutRecord, PayoutStatus } from '../../types/payout';
import { useToast } from '../../app/providers/ToastContext';
import { formatINR } from '../../utils/formatters';
import { DataTable, type Column } from '../../components/common/DataTable';
import { Select } from '../../components/common/Select';
import { Skeleton } from '../../components/common/Skeleton';

export const CRMPayoutsPage: React.FC = () => {
  const [payouts, setPayouts] = useState<PayoutRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  const loadPayouts = async () => {
    try {
      const res = await payoutService.getPayouts();
      setPayouts(res);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPayouts();
  }, []);

  const handleStatusChange = async (id: string, status: PayoutStatus) => {
    await payoutService.updatePayoutStatus(id, status, status === 'paid' ? `CMS${Math.floor(1000000 + Math.random() * 9000000)}` : undefined);
    showToast('Payout Updated', `Payout marked as ${status}.`, 'success');
    loadPayouts();
  };

  const columns: Column<PayoutRecord>[] = [
    { header: 'Payout No', accessorKey: 'payoutNumber', cell: (r) => <span className="font-mono font-bold">{r.payoutNumber}</span> },
    { header: 'Partner', accessorKey: 'partnerName' },
    { header: 'Customer', accessorKey: 'customerName' },
    { header: 'Disbursal Amount', accessorKey: 'disbursalAmount', cell: (r) => formatINR(r.disbursalAmount) },
    { header: 'Gross Payout', accessorKey: 'grossPayoutAmount', cell: (r) => formatINR(r.grossPayoutAmount) },
    { header: 'Net Payout', accessorKey: 'netPayoutAmount', cell: (r) => <span className="font-bold text-emerald-600">{formatINR(r.netPayoutAmount)}</span> },
    { header: 'Status', accessorKey: 'payoutStatus', cell: (r) => (
      <Select
        value={r.payoutStatus}
        onChange={(e) => handleStatusChange(r.id, e.target.value as PayoutStatus)}
        options={[
          { label: 'Pending', value: 'pending' },
          { label: 'Approved', value: 'approved' },
          { label: 'Processing', value: 'processing' },
          { label: 'Paid', value: 'paid' },
          { label: 'On Hold', value: 'on_hold' }
        ]}
        className="text-xs py-1 px-2 h-auto font-semibold"
      />
    )},
  ];

  if (loading) return <Skeleton className="h-64 w-full" />;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Admin Payout Approval Engine</h1>
        <p className="text-xs text-slate-500">Approve, hold, and disburse partner commission payouts</p>
      </div>

      <DataTable data={payouts} columns={columns} keyExtractor={(r) => r.id} searchPlaceholder="Search payouts..." />
    </div>
  );
};
