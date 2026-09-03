import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { applicationService } from '../../services/applicationService';
import type { LoanApplication } from '../../types/application';
import { formatINR, formatDate } from '../../utils/formatters';
import { Badge } from '../../components/common/Badge';
import { Skeleton } from '../../components/common/Skeleton';
import { CheckCircle2, Circle } from 'lucide-react';

export const CustomerApplicationsPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [apps, setApps] = useState<LoanApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadData() {
      try {
        const list = await applicationService.getApplications();
        setApps(list);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) return <Skeleton className="h-64 w-full" />;

  const selectedApp = id ? apps.find((a) => a.id === id || a.applicationNumber === id) || apps[0] : apps[0];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Application Status & Visual Timeline</h1>
          <p className="text-xs text-slate-500">Track 7-stage loan processing progress live</p>
        </div>
      </div>

      {/* Application Selector Tabs */}
      <div className="flex gap-3 overflow-x-auto pb-2 border-b border-slate-200">
        {apps.map((app) => (
          <button
            key={app.id}
            onClick={() => navigate(`/customer/applications/${app.id}`)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedApp?.id === app.id
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {app.applicationNumber} ({app.productName})
          </button>
        ))}
      </div>

      {selectedApp && (
        <div className="space-y-8">
          {/* Details Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-fintech space-y-4">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-mono text-slate-400">{selectedApp.applicationNumber}</span>
                <h3 className="text-xl font-bold text-slate-900">{selectedApp.productName}</h3>
              </div>
              <Badge status={selectedApp.currentStage} />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <p className="text-slate-500 font-semibold">Sanction Amount</p>
                <p className="text-base font-bold text-slate-900">{formatINR(selectedApp.sanctionedAmount || selectedApp.requestedAmount)}</p>
              </div>
              <div>
                <p className="text-slate-500 font-semibold">Lender Partner</p>
                <p className="text-xs font-bold text-slate-800 mt-1">{selectedApp.lenderName || 'Evaluation Desk'}</p>
              </div>
              <div>
                <p className="text-slate-500 font-semibold">Assigned RM</p>
                <p className="text-xs font-bold text-blue-600 mt-1">{selectedApp.assignedRmName}</p>
              </div>
              <div>
                <p className="text-slate-500 font-semibold">Submitted On</p>
                <p className="text-xs font-bold text-slate-800 mt-1">{formatDate(selectedApp.submissionDate)}</p>
              </div>
            </div>
          </div>

          {/* 7-STAGE VISUAL TIMELINE (Requirement 21) */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-fintech space-y-6">
            <h3 className="text-lg font-bold text-slate-900">7-Stage Application Processing Timeline</h3>

            <div className="relative pl-6 space-y-8 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
              {selectedApp.timeline.map((event, idx) => (
                <div key={idx} className="relative flex items-start gap-4">
                  <div className="absolute -left-6 top-0.5">
                    {event.isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 bg-white rounded-full" />
                    ) : event.isCurrent ? (
                      <div className="w-5 h-5 rounded-full bg-blue-600 border-4 border-blue-100 animate-pulse" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-300 bg-white rounded-full" />
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h4 className={`text-sm font-bold ${event.isCurrent ? 'text-blue-600' : event.isCompleted ? 'text-slate-900' : 'text-slate-400'}`}>
                        {event.label}
                      </h4>
                      {event.timestamp && (
                        <span className="text-[11px] text-slate-400 font-medium">{formatDate(event.timestamp)}</span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
