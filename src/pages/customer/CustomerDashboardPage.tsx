import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { applicationService } from '../../services/applicationService';
import { documentService } from '../../services/documentService';
import type { LoanApplication } from '../../types/application';
import type { CustomerDocument } from '../../types/document';
import { formatINR, formatDate } from '../../utils/formatters';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { StatCard } from '../../components/common/StatCard';
import { Skeleton } from '../../components/common/Skeleton';
import {
  FileCheck,
  FolderOpen,
  PhoneCall,
  ArrowRight,
  AlertCircle,
  Clock,
  Compass
} from 'lucide-react';

export const CustomerDashboardPage: React.FC = () => {
  const [apps, setApps] = useState<LoanApplication[]>([]);
  const [docs, setDocs] = useState<CustomerDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadData() {
      try {
        const [aList, dList] = await Promise.all([
          applicationService.getApplications(),
          documentService.getDocuments()
        ]);
        setApps(aList);
        setDocs(dList);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return <div className="space-y-4"><Skeleton className="h-20 w-full" /><Skeleton className="h-64 w-full" /></div>;
  }

  const activeApp = apps[0];
  const pendingDocs = docs.filter((d) => d.status === 'uploaded' || d.status === 'under_review' || d.status === 'replacement_required');

  return (
    <div className="space-y-8">
      {/* Top Banner Alert if documents are pending */}
      {pendingDocs.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-amber-950">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Document Center Verification Alert</p>
              <p className="text-amber-800">You have {pendingDocs.length} document(s) currently under review or needing update.</p>
            </div>
          </div>
          <Button size="sm" variant="secondary" onClick={() => navigate('/customer/documents')}>
            Manage Documents
          </Button>
        </div>
      )}

      {/* KPI Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard
          title="ACTIVE APPLICATIONS"
          value={apps.length}
          subtitle="1 Disbursed, 1 In Processing"
          icon={<FileCheck className="w-5 h-5" />}
        />
        <StatCard
          title="TOTAL SANCTIONED VALUE"
          value={formatINR(8000000)}
          subtitle="Across 2 loan accounts"
          icon={<FolderOpen className="w-5 h-5 text-emerald-600" />}
          iconBgColor="bg-emerald-50"
        />
        <StatCard
          title="PENDING DOCUMENTS"
          value={pendingDocs.length}
          subtitle="Verification in progress"
          icon={<Clock className="w-5 h-5 text-amber-600" />}
          iconBgColor="bg-amber-50"
        />
      </div>

      {/* Quick Action Grid (Requirement 20) */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-slate-900">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <button
            onClick={() => navigate('/customer/applications')}
            className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-blue-600 hover:shadow-md transition-all text-left space-y-2 group"
          >
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl w-fit group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <FileCheck className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-slate-900">Track Application</p>
            <p className="text-[11px] text-slate-500">View 7-stage visual timeline</p>
          </button>

          <button
            onClick={() => navigate('/customer/documents')}
            className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-blue-600 hover:shadow-md transition-all text-left space-y-2 group"
          >
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl w-fit group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <FolderOpen className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-slate-900">Upload Documents</p>
            <p className="text-[11px] text-slate-500">Submit KYC & Income statements</p>
          </button>

          <button
            onClick={() => navigate('/customer/support')}
            className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-blue-600 hover:shadow-md transition-all text-left space-y-2 group"
          >
            <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl w-fit group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <PhoneCall className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-slate-900">Contact Support</p>
            <p className="text-[11px] text-slate-500">Raise query or ticket</p>
          </button>

          <button
            onClick={() => navigate('/financial-solutions')}
            className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-blue-600 hover:shadow-md transition-all text-left space-y-2 group"
          >
            <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl w-fit group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <Compass className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-slate-900">Explore Solutions</p>
            <p className="text-[11px] text-slate-500">Browse financial catalog</p>
          </button>
        </div>
      </div>

      {/* Active Application Card */}
      {activeApp && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-fintech space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400">{activeApp.applicationNumber}</span>
                <Badge status={activeApp.currentStage} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-1">{activeApp.productName}</h3>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(`/customer/applications/${activeApp.id}`)}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              View Application Timeline
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl">
              <p className="text-slate-500 font-semibold">Requested Loan</p>
              <p className="text-base font-bold text-slate-900 mt-0.5">{formatINR(activeApp.requestedAmount)}</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl">
              <p className="text-slate-500 font-semibold">Interest ROI</p>
              <p className="text-base font-bold text-blue-600 mt-0.5">{activeApp.interestRate}% p.a.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl">
              <p className="text-slate-500 font-semibold">Lender Partner</p>
              <p className="text-xs font-bold text-slate-800 mt-1">{activeApp.lenderName}</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl">
              <p className="text-slate-500 font-semibold">Submission Date</p>
              <p className="text-xs font-bold text-slate-800 mt-1">{formatDate(activeApp.submissionDate)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
