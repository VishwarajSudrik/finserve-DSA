import React, { useEffect, useState } from 'react';
import { supportService } from '../../services/customerService';
import type { SupportTicket } from '../../types/support';
import { useToast } from '../../app/providers/ToastContext';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { Skeleton } from '../../components/common/Skeleton';
import { Plus } from 'lucide-react';

export const CustomerSupportPage: React.FC = () => {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');

  const { showToast } = useToast();

  const loadTickets = async () => {
    try {
      const res = await supportService.getTickets();
      setTickets(res);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTickets();
  }, []);

  const handleCreateTicket = async () => {
    if (!subject || !content) {
      showToast('Form incomplete', 'Subject and details are required.', 'warning');
      return;
    }
    await supportService.createTicket({
      subject,
      category: 'Application Status',
      userRole: 'customer',
      userName: 'Rahul Mehta',
      userEmail: 'rahul.mehta.demo@example.com',
      messages: [{ id: '1', senderName: 'Rahul Mehta', senderRole: 'Customer', content, timestamp: new Date().toISOString() }]
    });

    showToast('Support Ticket Raised', 'Ticket assigned to Relationship Manager.', 'success');
    setModalOpen(false);
    setSubject('');
    setContent('');
    loadTickets();
  };

  if (loading) return <Skeleton className="h-64 w-full" />;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Customer Support & Help Center</h1>
          <p className="text-xs text-slate-500">Raise support queries or communicate with your Relationship Manager</p>
        </div>

        <Button leftIcon={<Plus className="w-4 h-4" />} onClick={() => setModalOpen(true)}>
          Raise New Ticket
        </Button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-fintech divide-y divide-slate-100">
        {tickets.map((tkt) => (
          <div key={tkt.id} className="p-6 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-mono text-slate-400">{tkt.ticketNumber} • {tkt.category}</span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">{tkt.subject}</h3>
              </div>
              <Badge status={tkt.status} />
            </div>

            <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs">
              {tkt.messages.map((msg) => (
                <div key={msg.id} className="space-y-1">
                  <p className="font-bold text-slate-800">{msg.senderName} ({msg.senderRole}):</p>
                  <p className="text-slate-600">{msg.content}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Raise Customer Ticket">
        <div className="space-y-4">
          <Input label="Subject" placeholder="Brief subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Details</label>
            <textarea
              rows={3}
              className="w-full p-3 rounded-xl border border-slate-300 text-xs"
              placeholder="Describe your issue or request..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateTicket}>Submit Ticket</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export const CustomerProfilePage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Borrower Customer Profile</h1>
        <p className="text-xs text-slate-500">Personal & financial profile metrics</p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-fintech space-y-6 text-xs">
        <div className="grid grid-cols-2 gap-4">
          <div><p className="text-slate-400">Full Name</p><p className="font-bold text-slate-900 text-sm mt-0.5">Rahul Mehta</p></div>
          <div><p className="text-slate-400">Mobile</p><p className="font-bold text-slate-900 text-sm mt-0.5">+91 98201-23456</p></div>
          <div><p className="text-slate-400">Email</p><p className="font-bold text-slate-900 text-sm mt-0.5">rahul.mehta.demo@example.com</p></div>
          <div><p className="text-slate-400">City & State</p><p className="font-bold text-slate-900 text-sm mt-0.5">Mumbai, Maharashtra</p></div>
          <div><p className="text-slate-400">PAN Masked</p><p className="font-bold text-slate-900 text-sm mt-0.5">ABCDE1234F</p></div>
          <div><p className="text-slate-400">Monthly Income</p><p className="font-bold text-emerald-600 text-sm mt-0.5">₹1,25,000</p></div>
        </div>
      </div>
    </div>
  );
};
