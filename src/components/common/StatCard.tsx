import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  icon?: React.ReactNode;
  iconBgColor?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  trend,
  icon,
  iconBgColor = 'bg-blue-50 text-blue-600',
}) => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-fintech hover:shadow-fintech-lg transition-all duration-200">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{title}</p>
          <p className="text-2xl font-bold text-slate-900 tracking-tight">{value}</p>
          {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
        </div>
        {icon && <div className={`p-3 rounded-xl ${iconBgColor}`}>{icon}</div>}
      </div>

      {trend && (
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-medium">
          {trend.isPositive ? (
            <span className="flex items-center text-emerald-600 font-semibold gap-0.5">
              <TrendingUp className="w-3.5 h-3.5" />
              {trend.value}
            </span>
          ) : (
            <span className="flex items-center text-red-600 font-semibold gap-0.5">
              <TrendingDown className="w-3.5 h-3.5" />
              {trend.value}
            </span>
          )}
          <span className="text-slate-500">vs last period</span>
        </div>
      )}
    </div>
  );
};
