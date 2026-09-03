import React from 'react';
import { MOCK_TASKS, MOCK_AUDIT_LOGS } from '../../data/tickets';
import { Badge } from '../../components/common/Badge';

export const CRMTasksPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">RM Follow-up Tasks & Reminders</h1>
        <p className="text-xs text-slate-500">Scheduled calls, document follow-ups, and customer verifications</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-fintech divide-y divide-slate-100">
        {MOCK_TASKS.map((t) => (
          <div key={t.id} className="p-5 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono text-slate-400">{t.leadNumber} • {t.taskType.toUpperCase()}</span>
              <h4 className="text-sm font-bold text-slate-900">{t.customerName} — {t.notes}</h4>
              <p className="text-xs text-slate-500">Due: <strong>{t.dueDate} at {t.dueTime}</strong> • Assigned: {t.assignedEmployeeName}</p>
            </div>
            <Badge status={t.status} />
          </div>
        ))}
      </div>
    </div>
  );
};

export const CRMAuditLogsPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Security Audit Logs</h1>
        <p className="text-xs text-slate-500">Track system actions, user role modifications, and status changes</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-fintech divide-y divide-slate-100">
        {MOCK_AUDIT_LOGS.map((log) => (
          <div key={log.id} className="p-4 text-xs flex justify-between items-center">
            <div>
              <span className="font-mono text-slate-400">{log.timestamp}</span>
              <p className="font-bold text-slate-900">{log.action}: {log.targetResource}</p>
              <p className="text-slate-500">{log.details} by {log.actorName} ({log.actorRole})</p>
            </div>
            <span className="font-mono text-[10px] text-slate-400">IP: {log.ipAddress}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const CRMSettingsPage: React.FC = () => {
  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="text-2xl font-extrabold text-slate-900">CRM Platform Settings</h1>
      <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4 text-xs">
        <p className="font-bold text-slate-900">Environment Configuration</p>
        <p className="text-slate-500">Frontend Mock API Engine Active. REST API base URL configured via VITE_API_BASE_URL.</p>
      </div>
    </div>
  );
};
