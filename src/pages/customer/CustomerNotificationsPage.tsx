import React, { useEffect, useState } from 'react';
import { notificationService } from '../../services/customerService';
import type { AppNotification } from '../../types/notification';
import { formatDateTime } from '../../utils/formatters';
import { Bell } from 'lucide-react';

export const CustomerNotificationsPage: React.FC = () => {
  const [notifs, setNotifs] = useState<AppNotification[]>([]);

  useEffect(() => {
    notificationService.getNotifications().then(setNotifs);
  }, []);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-extrabold text-slate-900">Notifications</h1>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-fintech divide-y divide-slate-100">
        {notifs.map((n) => (
          <div key={n.id} className="p-5 flex items-start gap-4 hover:bg-slate-50">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-2xl shrink-0 mt-0.5">
              <Bell className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-slate-900">{n.title}</h4>
              <p className="text-xs text-slate-600">{n.message}</p>
              <span className="text-[10px] text-slate-400 font-medium block">{formatDateTime(n.timestamp)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
