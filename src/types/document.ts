export type DocumentStatus = 
  | 'not_uploaded'
  | 'uploaded'
  | 'under_review'
  | 'accepted'
  | 'rejected'
  | 'replacement_required';

export interface CustomerDocument {
  id: string;
  applicationId: string;
  customerName: string;
  documentType: 'PAN Card' | 'Aadhaar Card' | 'Bank Statement (6 Months)' | 'Salary Slips (3 Months)' | 'ITR & Computation (2 Yrs)' | 'GST Certificate' | 'Property Documents' | 'Business License';
  fileName: string;
  fileSizeFormatted: string;
  status: DocumentStatus;
  uploadedAt?: string;
  rejectionReason?: string;
  reviewedBy?: string;
}
