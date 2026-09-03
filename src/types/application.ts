export type ApplicationStage = 
  | 'enquiry_received'
  | 'profile_reviewed'
  | 'documents_uploaded'
  | 'application_processing'
  | 'lender_review'
  | 'sanctioned'
  | 'disbursed'
  | 'rejected'
  | 'closed';

export interface TimelineEvent {
  stage: ApplicationStage;
  label: string;
  description: string;
  timestamp?: string;
  isCompleted: boolean;
  isCurrent: boolean;
}

export interface LoanApplication {
  id: string;
  applicationNumber: string;
  leadId: string;
  customerName: string;
  customerMobile: string;
  customerEmail: string;
  productName: string;
  productSlug: string;
  requestedAmount: number;
  sanctionedAmount?: number;
  disbursedAmount?: number;
  interestRate?: number;
  tenureMonths?: number;
  lenderName?: string;
  currentStage: ApplicationStage;
  assignedRmName: string;
  assignedRmMobile: string;
  assignedRmEmail: string;
  submissionDate: string;
  lastUpdatedDate: string;
  timeline: TimelineEvent[];
}
