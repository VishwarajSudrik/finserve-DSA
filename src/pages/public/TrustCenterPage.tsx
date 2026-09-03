import React from 'react';
import { ShieldCheck, Lock, Building2, Eye, PhoneCall } from 'lucide-react';
import { DisclaimerBanner } from '../../components/common/DisclaimerBanner';

export const TrustCenterPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="bg-slate-900 text-white p-8 sm:p-12 rounded-3xl space-y-4 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
          <ShieldCheck className="w-4 h-4" /> FinServe Trust & Compliance Center
        </div>
        <h1 className="text-3xl sm:text-4xl font-black">Transparency, Security & Governance</h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
          Clear disclosures on platform architecture, data protection standards, lending partner relationships, and borrower rights.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Card 1: Our Role vs Lender Role */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-fintech space-y-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl w-fit">
            <Building2 className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Our Role vs. Lending Institution Role</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            <strong>FinServe Platform:</strong> We act purely as a digital distribution marketplace and credit facilitator. We assist with profile collection, document verification, and RM guidance. We do not issue credit directly.
          </p>
          <p className="text-xs text-slate-600 leading-relaxed">
            <strong>RBI Registered Banks & NBFCs:</strong> All underwriting decisions, interest rate determinations, sanction letters, and fund disbursals are executed exclusively by our partner lending institutions.
          </p>
        </div>

        {/* Card 2: Customer Data & Consent */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-fintech space-y-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl w-fit">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Customer Data & Explicit Consent</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Borrower data (KYC, income statements, PAN) is processed strictly under explicit consent. We never sell customer records to unverified third-party telemarketers.
          </p>
          <p className="text-xs text-slate-600 leading-relaxed">
            All consent records are timestamped and logged for auditability compliant with Indian digital data protection standards.
          </p>
        </div>

        {/* Card 3: Fees & Charges Disclosure */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-fintech space-y-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl w-fit">
            <Eye className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Zero Upfront Customer Fees</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            FinServe does not collect cash payments or upfront fees from loan applicants. Processing charges (if applicable) are explicitly stated in the formal sanction letter issued by the lending bank or NBFC.
          </p>
        </div>

        {/* Card 4: Grievance Mechanism */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-fintech space-y-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl w-fit">
            <PhoneCall className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Grievance Redressal Desk</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Dedicated Nodal Grievance Officer desk to address borrower queries or complaints within designated turnaround timeframes.
          </p>
        </div>
      </div>

      <DisclaimerBanner />
    </div>
  );
};
