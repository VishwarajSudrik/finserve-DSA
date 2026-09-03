import type { SupportTicket } from '../types/support';
import type { CRMTask, AuditLogItem } from '../types/task';

export const MOCK_TICKETS: SupportTicket[] = [
  {
    id: 'tkt-801',
    ticketNumber: 'TKT-2026-042',
    subject: 'Query regarding sanction letter tenure revision',
    category: 'Application Status',
    priority: 'medium',
    status: 'in_progress',
    userRole: 'customer',
    userName: 'Rahul Mehta',
    userEmail: 'rahul.mehta.demo@example.com',
    assignedRmName: 'Vikram Malhotra',
    createdAt: '2026-02-10T09:00:00Z',
    updatedAt: '2026-02-11T14:30:00Z',
    messages: [
      {
        id: 'msg-1',
        senderName: 'Rahul Mehta',
        senderRole: 'Customer',
        content: 'Hi, I received the sanction letter for APP-2026-00124. Can the tenure be extended from 48 months to 60 months?',
        timestamp: '2026-02-10T09:00:00Z'
      },
      {
        id: 'msg-2',
        senderName: 'Vikram Malhotra',
        senderRole: 'Relationship Manager',
        content: 'Hello Rahul, we have submitted the request for 60 months tenure to the credit manager. Updated sanction expected shortly.',
        timestamp: '2026-02-11T14:30:00Z'
      }
    ]
  }
];

export const MOCK_TASKS: CRMTask[] = [
  {
    id: 'tsk-901',
    customerName: 'Priya Sharma',
    leadId: 'ld-302',
    leadNumber: 'LD-2026-00388',
    assignedEmployeeName: 'Neha Kapoor',
    dueDate: '2026-03-04',
    dueTime: '15:00',
    priority: 'high',
    taskType: 'document_followup',
    notes: 'Collect original title deed verification copy for Lender Partner Beta valuation.',
    status: 'pending'
  },
  {
    id: 'tsk-902',
    customerName: 'Karan Malhotra',
    leadId: 'ld-305',
    leadNumber: 'LD-2026-00489',
    assignedEmployeeName: 'Neha Kapoor',
    dueDate: '2026-03-04',
    dueTime: '10:30',
    priority: 'urgent',
    taskType: 'call',
    notes: 'Verify machinery supplier proforma quote & delivery timeline.',
    status: 'pending'
  }
];

export const MOCK_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: 'aud-1001',
    timestamp: '2026-03-02T11:45:12Z',
    actorName: 'Vikram Malhotra',
    actorRole: 'Relationship Manager',
    action: 'LEAD_STATUS_UPDATE',
    targetResource: 'Lead LD-2026-00351',
    details: 'Status changed from Sanctioned to Disbursed',
    ipAddress: '192.168.1.45'
  },
  {
    id: 'aud-1002',
    timestamp: '2026-03-01T16:20:00Z',
    actorName: 'Super Admin',
    actorRole: 'Super Admin',
    action: 'PARTNER_APPROVAL',
    targetResource: 'Partner DSA-2026-081',
    details: 'Partner status updated to Active',
    ipAddress: '10.0.0.12'
  }
];
