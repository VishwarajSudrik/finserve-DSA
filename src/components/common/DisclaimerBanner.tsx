import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';

export const DisclaimerBanner: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  if (compact) {
    return (
      <div className="bg-slate-100/80 border border-slate-200 rounded-xl p-3 text-xs text-slate-600 flex items-start gap-2">
        <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <span>
          <strong>Financial Disclaimer:</strong> Loan eligibility, assessment, interest rates and approval are subject to the applicable lender's underwriting policies and documentation requirements.
        </span>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 text-slate-300 rounded-2xl p-6 border border-slate-800 my-6 space-y-2 shadow-fintech">
      <div className="flex items-center gap-2 text-white font-semibold text-sm">
        <ShieldCheck className="w-5 h-5 text-emerald-400" />
        <span>Regulatory & Lending Partner Transparency Notice</span>
      </div>
      <p className="text-xs text-slate-400 leading-relaxed">
        Our platform operates as a digital credit distribution and technology facilitator. We do not issue loans directly nor guarantee approvals. Loan sanctioning, interest rate determination, processing timelines, and disbursement terms are solely decided by our partner Banks and RBI-registered NBFCs based on individual applicant evaluation.
      </p>
    </div>
  );
};
