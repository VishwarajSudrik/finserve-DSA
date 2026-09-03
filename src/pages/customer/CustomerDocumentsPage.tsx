import React, { useEffect, useState } from 'react';
import { documentService } from '../../services/documentService';
import type { CustomerDocument } from '../../types/document';
import { useToast } from '../../app/providers/ToastContext';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { Skeleton } from '../../components/common/Skeleton';
import { FileText, UploadCloud, Lock } from 'lucide-react';

export const CustomerDocumentsPage: React.FC = () => {
  const [docs, setDocs] = useState<CustomerDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedDocType, setSelectedDocType] = useState<string>('PAN Card');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { showToast } = useToast();

  const loadDocuments = async () => {
    try {
      const list = await documentService.getDocuments('app-501');
      setDocs(list);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  const handleSimulatedUpload = async () => {
    if (!selectedFile) {
      showToast('Please select a file', 'Choose a PDF or JPEG image file to upload.', 'warning');
      return;
    }

    try {
      await documentService.uploadDocument({
        applicationId: 'app-501',
        customerName: 'Rahul Mehta',
        documentType: selectedDocType as any,
        fileName: selectedFile.name,
        fileSizeFormatted: `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`
      });

      showToast('Document Uploaded Successfully', `${selectedDocType} submitted for compliance review.`, 'success');
      setUploadModalOpen(false);
      setSelectedFile(null);
      loadDocuments();
    } catch {
      showToast('Upload Error', 'Failed to upload document.', 'error');
    }
  };

  if (loading) return <Skeleton className="h-64 w-full" />;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Document Upload & Management Center</h1>
          <p className="text-xs text-slate-500">Secure document vault for borrower KYC & income verification</p>
        </div>

        <Button
          variant="primary"
          leftIcon={<UploadCloud className="w-4 h-4" />}
          onClick={() => setUploadModalOpen(true)}
        >
          Upload New Document
        </Button>
      </div>

      {/* Security Disclaimer Notice */}
      <div className="bg-slate-900 text-slate-300 p-4 rounded-2xl border border-slate-800 text-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>256-Bit Encrypted Secure Storage Simulator • Document access restricted to compliance desk</span>
        </div>
      </div>

      {/* Document Grid Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-fintech overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Application APP-2026-00124 Vault</h3>
          <span className="text-xs text-slate-500 font-semibold">{docs.length} Documents Logged</span>
        </div>

        <div className="divide-y divide-slate-100">
          {docs.map((doc) => (
            <div key={doc.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
              <div className="flex items-start gap-3.5">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{doc.documentType}</h4>
                  <p className="text-xs text-slate-500">{doc.fileName} • {doc.fileSizeFormatted}</p>
                  {doc.rejectionReason && (
                    <p className="text-xs text-red-600 font-medium mt-1">Rejection Note: {doc.rejectionReason}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Badge status={doc.status} />
                {(doc.status === 'rejected' || doc.status === 'replacement_required') && (
                  <Button size="sm" variant="outline" onClick={() => setUploadModalOpen(true)}>
                    Re-upload
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Simulation Modal */}
      <Modal isOpen={uploadModalOpen} onClose={() => setUploadModalOpen(false)} title="Upload Borrower Document">
        <div className="space-y-4 text-xs">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Document Category</label>
            <select
              value={selectedDocType}
              onChange={(e) => setSelectedDocType(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-medium min-h-[44px]"
            >
              <option value="PAN Card">PAN Card</option>
              <option value="Aadhaar Card">Aadhaar Card</option>
              <option value="Bank Statement (6 Months)">Bank Statement (6 Months)</option>
              <option value="Salary Slips (3 Months)">Salary Slips (3 Months)</option>
              <option value="ITR & Computation (2 Yrs)">ITR & Computation (2 Yrs)</option>
              <option value="GST Certificate">GST Certificate</option>
            </select>
          </div>

          <div className="border-2 border-dashed border-slate-300 p-6 rounded-2xl text-center space-y-2 bg-slate-50">
            <UploadCloud className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="font-bold text-slate-800">Choose File or Drag & Drop</p>
            <p className="text-slate-500 text-[11px]">PDF, PNG, JPG up to 10MB</p>
            <input
              type="file"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              className="mt-2 text-xs text-slate-600 mx-auto"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setUploadModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSimulatedUpload}>
              Simulate Secure Upload
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
