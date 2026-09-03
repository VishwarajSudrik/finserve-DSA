import React, { useEffect, useState } from 'react';
import { partnerService } from '../../services/partnerService';
import type { DSAPartner, PartnerStatus } from '../../types/partner';
import { useToast } from '../../app/providers/ToastContext';
import { formatINR } from '../../utils/formatters';
import { DataTable, type Column } from '../../components/common/DataTable';
import { Select } from '../../components/common/Select';
import { Skeleton } from '../../components/common/Skeleton';

export const CRMPartnersPage: React.FC = () => {
  const [partners, setPartners] = useState<DSAPartner[]>([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  const loadPartners = async () => {
    try {
      const res = await partnerService.getPartners();
      setPartners(res);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPartners();
  }, []);

  const handleStatusChange = async (id: string, status: PartnerStatus) => {
    await partnerService.updatePartnerStatus(id, status);
    showToast('Partner Status Updated', `Partner status updated to ${status}.`, 'success');
    loadPartners();
  };

  const columns: Column<DSAPartner>[] = [
    { header: 'Partner Code', accessorKey: 'partnerCode', cell: (r) => <span className="font-mono font-bold">{r.partnerCode}</span> },
    { header: 'Partner Name', accessorKey: 'fullName', cell: (r) => (
      <div>
        <p className="font-bold text-slate-900">{r.fullName}</p>
        <p className="text-[11px] text-slate-500">{r.businessName || r.profession}</p>
      </div>
    )},
    { header: 'City', accessorKey: 'city' },
    { header: 'Leads', accessorKey: 'totalLeadsCount' },
    { header: 'Disbursed', accessorKey: 'totalDisbursedAmount', cell: (r) => formatINR(r.totalDisbursedAmount) },
    { header: 'Earned Payout', accessorKey: 'totalEarnedPayout', cell: (r) => <span className="font-bold text-emerald-600">{formatINR(r.totalEarnedPayout)}</span> },
    { header: 'Status', accessorKey: 'status', cell: (r) => (
      <Select
        value={r.status}
        onChange={(e) => handleStatusChange(r.id, e.target.value as PartnerStatus)}
        options={[
          { label: 'Active', value: 'active' },
          { label: 'Under Review', value: 'under_review' },
          { label: 'Pending', value: 'pending' },
          { label: 'Suspended', value: 'suspended' },
          { label: 'Rejected', value: 'rejected' }
        ]}
        className="text-xs py-1 px-2 h-auto font-semibold"
      />
    )},
  ];

  if (loading) return <Skeleton className="h-64 w-full" />;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">DSA Partner Management Desk</h1>
        <p className="text-xs text-slate-500">Manage DSA partner onboarding approvals, status control, and payouts</p>
      </div>

      <DataTable data={partners} columns={columns} keyExtractor={(r) => r.id} searchPlaceholder="Search partners..." />
    </div>
  );
};
