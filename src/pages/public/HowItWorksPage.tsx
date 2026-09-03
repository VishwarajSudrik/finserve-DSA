import React, { useState } from 'react';
import { DisclaimerBanner } from '../../components/common/DisclaimerBanner';
import { Button } from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  Building2,
  Users,
  Clock,
  Sparkles,
  Lock,
  Cpu,
  BadgeCheck
} from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'borrower' | 'partner' | 'lender'>('borrower');
  const navigate = useNavigate();

  const borrowerSteps = [
    { step: '01', title: 'Smart Eligibility Journey', duration: '2 Mins', desc: 'Enter basic income, employment, and loan requirements in our 8-step wizard to evaluate indicative credit capacity with zero credit score impact.' },
    { step: '02', title: 'Secure Digital Document Vault', duration: '5 Mins', desc: 'Upload PAN, Aadhaar, 6-month bank statements, and IT returns into our encrypted document repository with automated optical verification.' },
    { step: '03', title: 'Algorithmic Lender Matching', duration: 'Instant', desc: 'FinServe routing engine compares your profile against underwriting policies of 35+ partner Banks & NBFCs to identify optimal ROI interest rates.' },
    { step: '04', title: 'Dedicated RM Underwriting Desk', duration: '2-4 Hours', desc: 'An assigned Relationship Manager verifies documentation, addresses queries, and packages your file for institutional credit approval.' },
    { step: '05', title: 'Formal Sanction Letter Issuance', duration: '24 Hours', desc: 'Partner lending institution issues an official digital sanction letter detailing approved loan amount, tenure, interest rate, and processing fees.' },
    { step: '06', title: 'Direct Disbursal to Bank Account', duration: 'Same Day', desc: 'Upon e-sign of loan agreement and NACH mandate setup, funds are disbursed directly into your registered bank account.' },
  ];

  const partnerSteps = [
    { step: '01', title: 'Digital DSA Registration', duration: '5 Mins', desc: 'Submit GST, PAN, Aadhaar, and bank account details online to complete partner KYC onboarding.' },
    { step: '02', title: 'Code Activation & RM Assignment', duration: '24 Hours', desc: 'Receive your unique FinServe Partner Code and get linked with a dedicated regional Relationship Manager.' },
    { step: '03', title: 'Lead Submission via Partner CRM', duration: 'Instant', desc: 'Punch customer leads via mobile or web CRM with automated duplicate checks across all partner banks.' },
    { step: '04', title: 'Real-Time Pipeline Tracking', duration: 'Continuous', desc: 'Track application movement across Login, Technical Valuation, Legal Verification, Credit Approval, and Disbursal.' },
    { step: '05', title: 'Automated Commission Calculation', duration: 'On Disbursal', desc: 'Earn lucrative commission slabs automatically calculated on net disbursed loan value with TDS Form 26AS compliance.' },
    { step: '06', title: 'Bank Disbursal Statement & UTR', duration: 'Monthly', desc: 'Direct credit into your partner bank account with downloadable PDF/Excel payout breakdown statements.' },
  ];

  const lenderSteps = [
    { step: '01', title: 'Institutional API Integration', duration: 'Setup', desc: 'Connect lending policy schemas, targeted geographies, and credit score cutoffs via secure REST APIs.' },
    { step: '02', title: 'Pre-Filtered Lead Ingestion', duration: 'Real-time', desc: 'Receive standardized, pre-verified loan dossiers containing verified bank statements and KYC packages.' },
    { step: '03', title: 'Digital Credit Evaluation', duration: 'Automated', desc: 'Execute automated BRE (Business Rule Engine) checks or manual credit officer appraisals.' },
    { step: '04', title: 'Sanction & Disbursal Sync', duration: 'API Sync', desc: 'Push sanction status, LOS application IDs, and final disbursal amounts back to FinServe system.' },
  ];

  const slaTable = [
    { product: 'Personal Loan', checkTime: '2 Mins', sanctionSLA: '24 Hours', disbursalSLA: 'Same Day' },
    { product: 'Home Loan', checkTime: '3 Mins', sanctionSLA: '48 - 72 Hours', disbursalSLA: '5 - 7 Days' },
    { product: 'Business Loan / MSME', checkTime: '2 Mins', sanctionSLA: '24 - 48 Hours', disbursalSLA: '48 Hours' },
    { product: 'Loan Against Property', checkTime: '3 Mins', sanctionSLA: '3 - 5 Days', disbursalSLA: '7 Days' },
    { product: 'Machinery & Vehicle Finance', checkTime: '2 Mins', sanctionSLA: '48 Hours', disbursalSLA: '3 Days' },
  ];

  return (
    <div className="space-y-16 py-12">
      {/* Dark Hero Section */}
      <section className="bg-slate-950 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-900 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto space-y-4 text-center relative z-10">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-xs font-extrabold border border-blue-500/20">
            <Sparkles className="w-3.5 h-3.5" /> End-to-End Digital Credit Workflow
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">How FinServe Works</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto font-normal">
            A transparent, tech-enabled credit distribution journey connecting retail borrowers, partner DSAs, and institutional lenders.
          </p>
        </div>
      </section>

      {/* Main Workflow Container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Role Tab Selector */}
        <div className="flex flex-wrap items-center justify-center gap-3 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm max-w-xl mx-auto">
          <button
            onClick={() => setActiveTab('borrower')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 'borrower' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Users className="w-4 h-4" /> Borrower Journey
          </button>
          <button
            onClick={() => setActiveTab('partner')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 'partner' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <BadgeCheck className="w-4 h-4" /> DSA Partner Flow
          </button>
          <button
            onClick={() => setActiveTab('lender')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 'lender' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Building2 className="w-4 h-4" /> Lender Integration
          </button>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(activeTab === 'borrower' ? borrowerSteps : activeTab === 'partner' ? partnerSteps : lenderSteps).map((s) => (
            <div
              key={s.step}
              className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-fintech hover:shadow-xl hover:border-blue-500/30 transition-all duration-300 space-y-4 relative group overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-black text-lg flex items-center justify-center shadow-md">
                  {s.step}
                </span>
                <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full flex items-center gap-1 border border-slate-200">
                  <Clock className="w-3 h-3 text-blue-600" /> {s.duration}
                </span>
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">{s.title}</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed font-normal">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SLA Turnaround Comparison Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Standard Turnaround Time SLAs</h2>
          <p className="text-xs text-slate-600">Expected processing timelines per credit product category</p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-fintech overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white uppercase text-[10px] font-extrabold tracking-wider">
                  <th className="p-4">Product Category</th>
                  <th className="p-4">Indicative Check</th>
                  <th className="p-4">Sanction SLA</th>
                  <th className="p-4">Disbursal SLA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {slaTable.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-bold text-slate-900">{row.product}</td>
                    <td className="p-4 text-blue-600 font-semibold">{row.checkTime}</td>
                    <td className="p-4">{row.sanctionSLA}</td>
                    <td className="p-4 text-emerald-600 font-bold">{row.disbursalSLA}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Security & Tech Architecture Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-950 to-blue-950 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <div className="p-3 bg-blue-600/20 text-blue-400 rounded-2xl w-fit border border-blue-500/30">
              <Lock className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white">256-Bit SSL Data Vault</h4>
            <p className="text-xs text-slate-400 leading-relaxed font-normal">All customer financial documents are encrypted at rest and in transit using enterprise SSL standards.</p>
          </div>

          <div className="space-y-2">
            <div className="p-3 bg-emerald-600/20 text-emerald-400 rounded-2xl w-fit border border-emerald-500/30">
              <Cpu className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white">BRE Matching Engine</h4>
            <p className="text-xs text-slate-400 leading-relaxed font-normal">Business Rule Engine maps customer profile against policy matrices of 35+ partner Banks & NBFCs.</p>
          </div>

          <div className="space-y-2">
            <div className="p-3 bg-indigo-600/20 text-indigo-400 rounded-2xl w-fit border border-indigo-500/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white">Zero Hard Credit Impact</h4>
            <p className="text-xs text-slate-400 leading-relaxed font-normal">Indicative eligibility checks utilize soft assessment logic without impacting CIBIL credit score.</p>
          </div>
        </div>
      </section>

      {/* Action CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <h3 className="text-2xl font-black text-slate-900">Experience the seamless digital loan journey</h3>
        <Button
          size="lg"
          variant="gradient"
          onClick={() => navigate('/check-eligibility')}
          rightIcon={<ArrowRight className="w-5 h-5" />}
        >
          Check Your Eligibility Now
        </Button>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DisclaimerBanner />
      </div>
    </div>
  );
};
