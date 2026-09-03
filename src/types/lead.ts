export type LeadStatus = 
  | 'new'
  | 'contacted'
  | 'qualified'
  | 'documents_pending'
  | 'submitted'
  | 'processing'
  | 'sanctioned'
  | 'disbursed'
  | 'rejected'
  | 'closed';

export type EmploymentType = 'salaried' | 'self_employed' | 'business_owner' | 'professional' | 'other';

export interface LeadActivity {
  id: string;
  type: 'call' | 'email' | 'whatsapp' | 'document_upload' | 'status_change' | 'note' | 'assignment';
  title: string;
  description: string;
  timestamp: string;
  actorName: string;
}

export interface Lead {
  id: string;
  leadNumber: string;
  customerName: string;
  mobile: string;
  email: string;
  city: string;
  productSlug: string;
  productName: string;
  loanAmount: number;
  employmentType: EmploymentType;
  monthlyIncome?: number;
  source: 'website' | 'dsa_partner' | 'walk_in' | 'referral';
  partnerId?: string;
  partnerName?: string;
  assignedRmId?: string;
  assignedRmName?: string;
  status: LeadStatus;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  nextFollowUp?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  activities?: LeadActivity[];
}
