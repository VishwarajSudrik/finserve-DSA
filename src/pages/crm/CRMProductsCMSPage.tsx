import React, { useEffect, useState } from 'react';
import { productService } from '../../services/productService';
import { documentService } from '../../services/documentService';
import type { LoanProduct } from '../../types/product';
import type { CustomerDocument } from '../../types/document';
import { useToast } from '../../app/providers/ToastContext';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { Skeleton } from '../../components/common/Skeleton';
import { Package, CheckCircle2, XCircle } from 'lucide-react';

export const CRMProductsCMSPage: React.FC = () => {
  const [prods, setProds] = useState<LoanProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedProd, setSelectedProd] = useState<LoanProduct | null>(null);

  const { showToast } = useToast();

  useEffect(() => {
    productService.getProducts().then((res) => {
      setProds(res);
      setLoading(false);
    });
  }, []);

  const handleSaveProduct = async () => {
    if (!selectedProd) return;
    await productService.updateProduct(selectedProd);
    showToast('Product CMS Updated', `Saved changes for ${selectedProd.name}`, 'success');
    setEditModalOpen(false);
  };

  if (loading) return <Skeleton className="h-64 w-full" />;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Product Management CMS</h1>
        <p className="text-xs text-slate-500">Add, edit, preview, and publish financial solution offerings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {prods.map((p) => (
          <div key={p.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-fintech space-y-4">
            <div className="flex justify-between items-start">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                <Package className="w-6 h-6" />
              </div>
              <Badge status={p.status} />
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900">{p.name}</h3>
              <p className="text-xs text-slate-500">{p.category}</p>
            </div>

            <Button
              size="sm"
              variant="outline"
              className="w-full"
              onClick={() => { setSelectedProd(p); setEditModalOpen(true); }}
            >
              Edit CMS Content
            </Button>
          </div>
        ))}
      </div>

      <Modal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)} title="Product CMS Editor">
        {selectedProd && (
          <div className="space-y-4 text-xs">
            <Input label="Product Name" value={selectedProd.name} onChange={(e) => setSelectedProd({ ...selectedProd, name: e.target.value })} />
            <Input label="Short Description" value={selectedProd.shortDescription} onChange={(e) => setSelectedProd({ ...selectedProd, shortDescription: e.target.value })} />
            <Input label="Processing Fee Range" value={selectedProd.processingFeeRange} onChange={(e) => setSelectedProd({ ...selectedProd, processingFeeRange: e.target.value })} />

            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" onClick={() => setEditModalOpen(false)}>Cancel</Button>
              <Button onClick={handleSaveProduct}>Publish Changes</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export const CRMDocumentsPage: React.FC = () => {
  const [docs, setDocs] = useState<CustomerDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  const loadDocs = async () => {
    try {
      const res = await documentService.getDocuments();
      setDocs(res);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDocs();
  }, []);

  const handleAction = async (id: string, status: 'accepted' | 'rejected') => {
    await documentService.updateDocumentStatus(id, status, status === 'rejected' ? 'Incomplete blur copy' : undefined);
    showToast('Document Status Updated', `Document set to ${status}.`, 'success');
    loadDocs();
  };

  if (loading) return <Skeleton className="h-64 w-full" />;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Admin Document Verification Desk</h1>
        <p className="text-xs text-slate-500">Review, approve, or request replacements for borrower documents</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-fintech divide-y divide-slate-100">
        {docs.map((doc) => (
          <div key={doc.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono text-slate-400">{doc.applicationId} • {doc.customerName}</span>
              <h4 className="text-sm font-bold text-slate-900">{doc.documentType} ({doc.fileName})</h4>
              <Badge status={doc.status} />
            </div>

            <div className="flex gap-2">
              <Button size="sm" variant="success" leftIcon={<CheckCircle2 className="w-3.5 h-3.5" />} onClick={() => handleAction(doc.id, 'accepted')}>
                Approve
              </Button>
              <Button size="sm" variant="danger" leftIcon={<XCircle className="w-3.5 h-3.5" />} onClick={() => handleAction(doc.id, 'rejected')}>
                Reject
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
