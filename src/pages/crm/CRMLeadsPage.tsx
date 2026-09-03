import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { leadService } from '../../services/leadService';
import type { Lead, LeadStatus } from '../../types/lead';
import { useToast } from '../../app/providers/ToastContext';
import { formatINR, formatDateTime } from '../../utils/formatters';
import { DataTable, type Column } from '../../components/common/DataTable';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { Select } from '../../components/common/Select';
import { Skeleton } from '../../components/common/Skeleton';
import { Clock, ChevronRight } from 'lucide-react';

export const CRMLeadsPage: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [targetRm, setTargetRm] = useState('Vikram Malhotra');

  const { showToast } = useToast();

  const loadLeads = async () => {
    try {
      const res = await leadService.getLeads({ status: statusFilter });
      setLeads(res);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeads();
  }, [statusFilter]);

  const handleAssignSubmit = async () => {
    if (!selectedLead) return;
    await leadService.assignLead(selectedLead.id, targetRm);
    showToast('Lead Assigned', `Lead ${selectedLead.leadNumber} assigned to ${targetRm}.`, 'success');
    setAssignModalOpen(false);
    loadLeads();
  };

  const handleStatusChange = async (leadId: string, newStatus: LeadStatus) => {
    await leadService.updateLeadStatus(leadId, newStatus);
    showToast('Status Updated', `Lead status updated to ${newStatus}.`, 'success');
    loadLeads();
  };

  const columns: Column<Lead>[] = [
    { header: 'Lead ID', accessorKey: 'leadNumber', cell: (r) => (
      <Link to={`/crm/leads/${r.id}`} className="font-mono font-bold text-blue-600 hover:underline">
        {r.leadNumber}
      </Link>
    )},
    { header: 'Customer', accessorKey: 'customerName', cell: (r) => (
      <div>
        <p className="font-bold text-slate-900">{r.customerName}</p>
        <p className="text-[11px] text-slate-500">{r.mobile} • {r.city}</p>
      </div>
    )},
    { header: 'Product', accessorKey: 'productName' },
    { header: 'Amount', accessorKey: 'loanAmount', cell: (r) => <span className="font-bold">{formatINR(r.loanAmount)}</span> },
    { header: 'Source', accessorKey: 'source', cell: (r) => <span className="uppercase text-[11px] font-semibold text-slate-500">{r.partnerName || r.source}</span> },
    { header: 'Status', accessorKey: 'status', cell: (r) => (
      <Select
        value={r.status}
        onChange={(e) => handleStatusChange(r.id, e.target.value as LeadStatus)}
        options={[
          { label: 'New', value: 'new' },
          { label: 'Contacted', value: 'contacted' },
          { label: 'Qualified', value: 'qualified' },
          { label: 'Documents Pending', value: 'documents_pending' },
          { label: 'Submitted', value: 'submitted' },
          { label: 'Processing', value: 'processing' },
          { label: 'Sanctioned', value: 'sanctioned' },
          { label: 'Disbursed', value: 'disbursed' },
          { label: 'Rejected', value: 'rejected' }
        ]}
        className="text-xs py-1 px-2 h-auto font-semibold"
      />
    )},
    { header: 'Assigned RM', accessorKey: 'assignedRmName', cell: (r) => (
      <div className="flex items-center gap-2">
        <span className="font-medium text-slate-800">{r.assignedRmName || 'Unassigned'}</span>
        <button
          onClick={() => { setSelectedLead(r); setAssignModalOpen(true); }}
          className="text-[10px] text-blue-600 hover:underline font-bold"
        >
          Assign
        </button>
      </div>
    )},
  ];

  if (loading) return <Skeleton className="h-64 w-full" />;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Lead Operations & Pipeline CRM</h1>
          <p className="text-xs text-slate-500">Enterprise lead management, RM allocation, and status transitions</p>
        </div>
      </div>

      <DataTable
        data={leads}
        columns={columns}
        keyExtractor={(r) => r.id}
        searchPlaceholder="Search by customer name, mobile, lead ID, city..."
        extraFilters={
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs p-2 rounded-xl border border-slate-300 bg-white font-medium"
            >
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="processing">Processing</option>
              <option value="sanctioned">Sanctioned</option>
              <option value="disbursed">Disbursed</option>
            </select>
          </div>
        }
      />

      {/* RM Assignment Modal */}
      <Modal isOpen={assignModalOpen} onClose={() => setAssignModalOpen(false)} title="Assign Relationship Manager">
        {selectedLead && (
          <div className="space-y-4 text-xs">
            <p>Re-assigning Lead <strong>{selectedLead.leadNumber}</strong> ({selectedLead.customerName}):</p>
            <Select
              label="Select Relationship Manager"
              value={targetRm}
              onChange={(e) => setTargetRm(e.target.value)}
              options={[
                { label: 'Vikram Malhotra (Senior RM)', value: 'Vikram Malhotra' },
                { label: 'Neha Kapoor (SME Specialist)', value: 'Neha Kapoor' },
                { label: 'Rohan Joshi (Mortgage RM)', value: 'Rohan Joshi' }
              ]}
            />
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" onClick={() => setAssignModalOpen(false)}>Cancel</Button>
              <Button onClick={handleAssignSubmit}>Confirm Assignment</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export const CRMLeadDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [lead, setLead] = useState<Lead | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      leadService.getLeadById(id).then((res) => {
        setLead(res);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) return <Skeleton className="h-64 w-full" />;
  if (!lead) return <p className="text-slate-500">Lead record not found.</p>;

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/crm/leads" className="hover:underline">Leads</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="font-bold text-slate-900">{lead.leadNumber}</span>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-fintech space-y-6">
        <div className="flex justify-between items-start border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-mono text-slate-400">{lead.leadNumber}</span>
            <h1 className="text-2xl font-bold text-slate-900">{lead.customerName}</h1>
            <p className="text-xs text-slate-500">{lead.mobile} • {lead.email} • {lead.city}</p>
          </div>
          <Badge status={lead.status} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl">
            <p className="text-slate-500 font-semibold">Product</p>
            <p className="font-bold text-slate-900 mt-0.5">{lead.productName}</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl">
            <p className="text-slate-500 font-semibold">Requirement</p>
            <p className="font-bold text-blue-600 mt-0.5">{formatINR(lead.loanAmount)}</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl">
            <p className="text-slate-500 font-semibold">Source</p>
            <p className="font-bold text-slate-900 mt-0.5">{lead.partnerName || lead.source}</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl">
            <p className="text-slate-500 font-semibold">Assigned RM</p>
            <p className="font-bold text-slate-900 mt-0.5">{lead.assignedRmName}</p>
          </div>
        </div>

        {/* ACTIVITY TIMELINE (Requirement 34) */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-sm font-bold text-slate-900">Activity History & Interaction Logs</h3>
          <div className="space-y-3">
            {(lead.activities || []).map((act) => (
              <div key={act.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-3 text-xs">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-xl shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <p className="font-bold text-slate-900">{act.title} — <span className="font-normal text-slate-500">{act.actorName}</span></p>
                  <p className="text-slate-600">{act.description}</p>
                  <span className="text-[10px] text-slate-400 font-medium block">{formatDateTime(act.timestamp)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
