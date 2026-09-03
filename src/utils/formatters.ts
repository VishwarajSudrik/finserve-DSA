import { format, parseISO } from 'date-fns';

export function formatINR(amount: number | undefined | null): string {
  if (amount === undefined || amount === null || isNaN(amount)) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatLakhsCrores(amount: number): string {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  }
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)} Lakh`;
  }
  return formatINR(amount);
}

export function formatDate(dateString: string | undefined): string {
  if (!dateString) return '-';
  try {
    const date = parseISO(dateString);
    return format(date, 'dd MMM yyyy');
  } catch {
    return dateString;
  }
}

export function formatDateTime(dateString: string | undefined): string {
  if (!dateString) return '-';
  try {
    const date = parseISO(dateString);
    return format(date, 'dd MMM yyyy, hh:mm a');
  } catch {
    return dateString;
  }
}

export function maskPAN(pan: string): string {
  if (!pan || pan.length < 10) return 'XXXXX1234X';
  return `${pan.substring(0, 2)}XXXX${pan.substring(6)}`;
}

export function maskMobile(mobile: string): string {
  if (!mobile || mobile.length < 10) return '+91 XXXXX-XXXXX';
  return `+91 ${mobile.substring(0, 2)}XXX-XX${mobile.substring(8)}`;
}

export function getStatusBadgeClass(status: string): string {
  switch (status.toLowerCase()) {
    case 'active':
    case 'sanctioned':
    case 'disbursed':
    case 'paid':
    case 'accepted':
    case 'completed':
    case 'resolved':
      return 'badge-emerald';
    
    case 'new':
    case 'contacted':
    case 'submitted':
    case 'uploaded':
    case 'processing':
    case 'in_progress':
    case 'under_review':
      return 'badge-blue';

    case 'qualified':
    case 'documents_pending':
    case 'pending':
    case 'waiting_for_customer':
    case 'replacement_required':
    case 'on_hold':
      return 'badge-amber';

    case 'rejected':
    case 'closed':
    case 'suspended':
    case 'inactive':
    case 'overdue':
      return 'badge-red';

    default:
      return 'badge-slate';
  }
}

export function formatStatusLabel(status: string): string {
  return status
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
