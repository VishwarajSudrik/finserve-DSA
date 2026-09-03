export type TicketStatus = 'open' | 'in_progress' | 'waiting_for_customer' | 'resolved' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface TicketMessage {
  id: string;
  senderName: string;
  senderRole: string;
  content: string;
  timestamp: string;
  attachments?: string[];
}

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  subject: string;
  category: 'Application Status' | 'Document Issue' | 'Payout Query' | 'Technical Support' | 'Grievance / Complaint';
  priority: TicketPriority;
  status: TicketStatus;
  userRole: 'customer' | 'dsa_partner';
  userName: string;
  userEmail: string;
  assignedRmName?: string;
  createdAt: string;
  updatedAt: string;
  messages: TicketMessage[];
}
