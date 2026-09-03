import type { CustomerDocument, DocumentStatus } from '../types/document';

const INITIAL_DOCUMENTS: CustomerDocument[] = [
  { id: 'doc-1', applicationId: 'app-501', customerName: 'Rahul Mehta', documentType: 'PAN Card', fileName: 'pan_card_rahul_mehta.pdf', fileSizeFormatted: '1.2 MB', status: 'accepted', uploadedAt: '2026-01-20T11:00:00Z', reviewedBy: 'Operations Team' },
  { id: 'doc-2', applicationId: 'app-501', customerName: 'Rahul Mehta', documentType: 'Aadhaar Card', fileName: 'aadhaar_front_back.pdf', fileSizeFormatted: '2.4 MB', status: 'accepted', uploadedAt: '2026-01-20T11:05:00Z', reviewedBy: 'Operations Team' },
  { id: 'doc-3', applicationId: 'app-501', customerName: 'Rahul Mehta', documentType: 'Salary Slips (3 Months)', fileName: 'salary_slips_q4_2025.pdf', fileSizeFormatted: '3.8 MB', status: 'accepted', uploadedAt: '2026-01-21T09:30:00Z', reviewedBy: 'Operations Team' },
  { id: 'doc-4', applicationId: 'app-502', customerName: 'Priya Sharma', documentType: 'ITR & Computation (2 Yrs)', fileName: 'itr_2024_2025_priya_sharma.pdf', fileSizeFormatted: '5.1 MB', status: 'under_review', uploadedAt: '2026-02-12T16:20:00Z' },
  { id: 'doc-5', applicationId: 'app-502', customerName: 'Priya Sharma', documentType: 'Property Documents', fileName: 'bengaluru_property_deed.pdf', fileSizeFormatted: '8.7 MB', status: 'under_review', uploadedAt: '2026-02-12T16:25:00Z' }
];

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

class DocumentService {
  private documents: CustomerDocument[] = [...INITIAL_DOCUMENTS];

  async getDocuments(applicationId?: string): Promise<CustomerDocument[]> {
    await delay();
    if (applicationId) {
      return this.documents.filter((d) => d.applicationId === applicationId);
    }
    return this.documents;
  }

  async uploadDocument(doc: Partial<CustomerDocument>): Promise<CustomerDocument> {
    await delay(500);
    const newDoc: CustomerDocument = {
      id: `doc-${Date.now()}`,
      applicationId: doc.applicationId || 'app-501',
      customerName: doc.customerName || 'Customer',
      documentType: doc.documentType || 'PAN Card',
      fileName: doc.fileName || 'uploaded_document.pdf',
      fileSizeFormatted: doc.fileSizeFormatted || '1.5 MB',
      status: 'uploaded',
      uploadedAt: new Date().toISOString()
    };
    this.documents.unshift(newDoc);
    return newDoc;
  }

  async updateDocumentStatus(id: string, status: DocumentStatus, reason?: string): Promise<CustomerDocument> {
    await delay();
    const target = this.documents.find((d) => d.id === id);
    if (!target) throw new Error('Document not found');
    target.status = status;
    if (reason) target.rejectionReason = reason;
    target.reviewedBy = 'Compliance Officer';
    return target;
  }
}

export const documentService = new DocumentService();
