export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TaskStatus = 'pending' | 'completed' | 'overdue';

export interface CRMTask {
  id: string;
  customerName: string;
  leadId: string;
  leadNumber: string;
  assignedEmployeeName: string;
  dueDate: string;
  dueTime: string;
  priority: TaskPriority;
  taskType: 'call' | 'email' | 'document_followup' | 'meeting' | 'verification';
  notes: string;
  status: TaskStatus;
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  actorName: string;
  actorRole: string;
  action: string;
  targetResource: string;
  details: string;
  ipAddress: string;
}
