import type { AppNotification } from '../types/notification';

export const MOCK_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'Application Disbursed',
    message: 'Application APP-2026-00124 (Rahul Mehta) has been disbursed successfully.',
    type: 'application_update',
    read: false,
    timestamp: '2026-02-15T16:00:00Z',
    linkUrl: '/customer/applications/app-501'
  },
  {
    id: 'notif-2',
    title: 'Payout Processed',
    message: 'Payout PO-2026-089 credited for ₹21,375 (UTR: CMS901238471203).',
    type: 'payout_update',
    read: true,
    timestamp: '2026-02-25T11:00:00Z',
    linkUrl: '/partner/payouts'
  },
  {
    id: 'notif-3',
    title: 'Document Verified',
    message: 'Income documents for Application APP-2026-00189 approved.',
    type: 'document_request',
    read: false,
    timestamp: '2026-02-28T12:00:00Z',
    linkUrl: '/customer/documents'
  }
];
