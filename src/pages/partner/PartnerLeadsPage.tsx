import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { leadService } from '../../services/leadService';
import type { Lead } from '../../types/lead';
import { useToast } from '../../app/providers/ToastContext';
import { formatINR, formatDate } from '../../utils/formatters';
import { DataTable, type Column } from '../../components/common/DataTable';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { Skeleton } from '../../components/common/Skeleton';
import { Plus, AlertTriangle } from 'lucide-react';

export const PartnerLeadsPage: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [duplicateWarning, setDuplicateWarning] = useState(false);

  // Form State
  const [customerName, setCustomerName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Mumbai');
  const [productSlug, setProductSlug] = useState('personal-loan');
  const [loanAmount, setLoanAmount] = useState('1000000');
  const [employmentType] = useState<'salaried' | 'self_employed' | 'business_owner' | 'professional' | 'other'>('salaried');

  const { showToast } = useToast();

  const loadLeads = async () => {
    try {
      const res = await leadService.getLeads({ partnerId: 'pt-201' });
      setLeads(res);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeads();
    if (searchParams.get('action') === 'add') {
      setAddModalOpen(true);
    }
  }, [searchParams]);

  const handleAddLead = async () => {
    if (!customerName || !mobile) {
      showToast('Validation Error', 'Customer Name and Mobile are required.', 'warning');
      return;
    }

    try {
      const res = await leadService.createLead({
        customerName,
        mobile,
        email,
        city,
        productSlug,
        productName: productSlug.replace(/-/g, ' ').toUpperCase(),
        loanAmount: Number(loanAmount),
        employmentType,
        partnerId: 'pt-201',
        partnerName: 'Apex Financial Services',
        source: 'dsa_partner'
      });

      if (res.isDuplicateWarning) {
        setDuplicateWarning(true);
        showToast('Potential Duplicate Lead', 'This phone number exists for this product category.', 'warning');
      } else {
        showToast('Lead Created Successfully', `Lead number ${res.lead.leadNumber} added to pipeline.`, 'success');
        setAddModalOpen(false);
        resetForm();
        loadLeads();
      }
    } catch {
      showToast('Error', 'Could not create lead.', 'error');
    }
  };

  const resetForm = () => {
    setCustomerName('');
    setMobile('');
    setEmail('');
    setDuplicateWarning(false);
  };

  const columns: Column<Lead>[] = [
    { header: 'Lead ID', accessorKey: 'leadNumber', cell: (r) => <span className="font-mono font-bold text-slate-900">{r.leadNumber}</span> },
    { header: 'Customer', accessorKey: 'customerName', cell: (r) => (
      <div>
        <p className="font-bold text-slate-900">{r.customerName}</p>
        <p className="text-[11px] text-slate-500">{r.mobile}</p>
      </div>
    )},
    { header: 'Product', accessorKey: 'productName' },
    { header: 'Amount', accessorKey: 'loanAmount', cell: (r) => <span className="font-bold">{formatINR(r.loanAmount)}</span> },
    { header: 'Status', accessorKey: 'status', cell: (r) => <Badge status={r.status} /> },
    { header: 'RM Assigned', accessorKey: 'assignedRmName' },
    { header: 'Created Date', accessorKey: 'createdAt', cell: (r) => formatDate(r.createdAt) },
  ];

  if (loading) return <Skeleton className="h-64 w-full" />;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Partner Lead Management CRM</h1>
          <p className="text-xs text-slate-500">Track and manage customer leads submitted under your DSA desk</p>
        </div>

        <Button variant="success" leftIcon={<Plus className="w-4 h-4" />} onClick={() => setAddModalOpen(true)}>
          + Add New Lead
        </Button>
      </div>

      {/* CRM DataTable */}
      <DataTable
        data={leads}
        columns={columns}
        keyExtractor={(r) => r.id}
        searchPlaceholder="Search leads by customer name, mobile, lead ID..."
        renderMobileCard={(r) => (
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-mono text-slate-400">{r.leadNumber}</span>
                <h4 className="text-sm font-bold text-slate-900">{r.customerName}</h4>
              </div>
              <Badge status={r.status} />
            </div>
            <div className="text-xs space-y-1 text-slate-600">
              <p>Product: <strong>{r.productName}</strong></p>
              <p>Amount: <strong>{formatINR(r.loanAmount)}</strong></p>
              <p>Assigned RM: <strong>{r.assignedRmName}</strong></p>
            </div>
          </div>
        )}
      />

      {/* Add Lead Modal */}
      <Modal isOpen={addModalOpen} onClose={() => setAddModalOpen(false)} title="Register Customer Lead">
        <div className="space-y-4 text-xs">
          {duplicateWarning && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-950 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>Potential duplicate lead detected for this mobile number. Proceeding will merge activity under RM supervision.</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input label="Customer Name" placeholder="Full name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
            <Input label="Mobile Number" placeholder="10-digit mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} />
            <Input label="Email Address" placeholder="email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input label="City" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
            <Select
              label="Product Required"
              options={[
                { label: 'Personal Loan', value: 'personal-loan' },
                { label: 'Home Loan', value: 'home-loan' },
                { label: 'Business Loan', value: 'business-loan' },
                { label: 'MSME Finance', value: 'msme-finance' },
                { label: 'Loan Against Property', value: 'loan-against-property' }
              ]}
              value={productSlug}
              onChange={(e) => setProductSlug(e.target.value)}
            />
            <Input label="Loan Amount Requirement (₹)" type="number" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setAddModalOpen(false)}>Cancel</Button>
            <Button variant="success" onClick={handleAddLead}>
              {duplicateWarning ? 'Proceed & Save Lead' : 'Submit Lead'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
