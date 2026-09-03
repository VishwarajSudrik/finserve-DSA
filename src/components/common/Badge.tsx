import React from 'react';
import { getStatusBadgeClass, formatStatusLabel } from '../../utils/formatters';

export interface BadgeProps {
  status?: string;
  children?: React.ReactNode;
  variant?: 'emerald' | 'blue' | 'amber' | 'red' | 'slate';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ status, children, variant, className = '' }) => {
  let badgeClass = 'badge-slate';
  if (status) {
    badgeClass = getStatusBadgeClass(status);
  } else if (variant) {
    badgeClass = `badge-${variant}`;
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${badgeClass} ${className}`}
    >
      {status ? formatStatusLabel(status) : children}
    </span>
  );
};
