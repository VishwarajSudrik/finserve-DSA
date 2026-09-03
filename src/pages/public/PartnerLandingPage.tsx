import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  PhoneCall
} from 'lucide-react';

export const PartnerLandingPage: React.FC = () => {
  const navigate = useNavigate();

  const commissionSlabs = [
    { category: 'Personal Loan', payoutRange: '1.50% - 2.50%', SLA: '24 Hours', note: 'Higher slabs for >₹25L monthly volume' },
    { category: 'Business Loan / MSME', payoutRange: '2.00% - 3.50%', SLA: '24 - 48 Hours', note: 'Top payout rates for GST registered entities' },
    { category: 'Home Loan / LAP', payoutRange: '0.40% - 0.90%', SLA: '3 - 5 Days', note: 'Lucrative payouts on high ticket balance transfers' },
    { category: 'Machinery & Equipment', payoutRange: '1.25% - 2.00%', SLA: '48 Hours', note: 'Covers industrial equipment & CAPEX funding' },
    { category: 'Commercial Vehicle', payoutRange: '1.50% - 2.25%', SLA: '48 Hours', note: 'Fleet & heavy vehicle credit lines' },
  ];

  const partnerFeatures = [
    { title: 'Multi-Lender Access', desc: 'Distribute credit products across 35+ partner Banks, HFCs & NBFCs with one code.' },
    { title: 'Automated Deduplication', desc: 'Real-time check prevents lead collision and protects your client relationships.' },
    { title: 'Dedicated RM Support', desc: 'Direct access to regional Relationship Managers for file structuring and escalation.' },
    { title: 'Digital Document Vault', desc: 'Share encrypted file upload links directly with your borrowers for hassle-free KYC.' },
    { title: 'Monthly Payout Statement', desc: 'Transparent UTR generation with TDS Form 26AS digital tax compliance certificates.' },
    { title: 'Sub-Agent / Employee Hierarchy', desc: 'Manage your field staff, sub-agents, and branch offices within a single partner portal.' },
  ];

  return (
    <div className="space-y-16 py-12">
      {/* Dark Mesh Hero */}
      <section className="bg-slate-950 text-white py-16 lg:py-24 border-b border-slate-900 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3.5 py-1.5 rounded-full border border-emerald-500/20">
            <Sparkles className="w-3.5 h-3.5" /> India’s Premier DSA & Financial Distribution Network
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight max-w-4xl mx-auto text-white leading-tight">
            Empower & Scale Your Financial Distribution Business
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Partner with FinServe to access 35+ Banks & NBFCs, real-time digital lead tracking CRM, transparent commission payout engine, and dedicated RM desk support.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              size="lg"
              variant="success"
              onClick={() => navigate('/partners/become-a-partner')}
              rightIcon={<ArrowRight className="w-5 h-5" />}
              className="font-extrabold text-base shadow-xl w-full sm:w-auto"
            >
              Become a Partner Today
            </Button>
            <Button
              size="lg"
              variant="primary"
              onClick={() => navigate('/contact')}
              leftIcon={<PhoneCall className="w-4.5 h-4.5 text-white" />}
              className="w-full sm:w-auto text-white hover:text-white bg-blue-600 hover:bg-blue-500 border border-blue-400/60 shadow-xl shadow-blue-500/25 font-black text-base tracking-wide"
            >
              Talk to Partner Desk
            </Button>
          </div>
        </div>
      </section>

      {/* Program Metrics Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-fintech-lg grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-black text-slate-900">2,500+</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Partner DSAs</p>
          </div>
          <div className="space-y-1 border-l border-slate-100">
            <p className="text-3xl sm:text-4xl font-black text-emerald-600">Up to 3.5%</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Top Disbursal Slabs</p>
          </div>
          <div className="space-y-1 border-l border-slate-100">
            <p className="text-3xl sm:text-4xl font-black text-blue-600">Monthly</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Assured UTR Disbursals</p>
          </div>
          <div className="space-y-1 border-l border-slate-100">
            <p className="text-3xl sm:text-4xl font-black text-slate-900">35+</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Empanelled Lenders</p>
          </div>
        </div>
      </section>

      {/* Indicative Payout Structure Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Indicative Payout Commission Slabs</h2>
          <p className="text-xs sm:text-sm text-slate-600">Transparent commission percentages based on product category & monthly loan volume</p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-fintech overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white uppercase text-[10px] font-extrabold tracking-wider">
                  <th className="p-4">Loan Category</th>
                  <th className="p-4">Indicative Payout Slab</th>
                  <th className="p-4">Turnaround SLA</th>
                  <th className="p-4">Volume Bonus Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {commissionSlabs.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-bold text-slate-900">{row.category}</td>
                    <td className="p-4 text-emerald-600 font-extrabold text-sm">{row.payoutRange}</td>
                    <td className="p-4 text-slate-600">{row.SLA}</td>
                    <td className="p-4 text-slate-500 italic">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Partner Capabilities Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Why Financial Advisors Partner With FinServe</h2>
          <p className="text-xs sm:text-sm text-slate-600">Enterprise CRM tools, multi-lender access, and automated back-office ops</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {partnerFeatures.map((f, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-fintech hover:shadow-xl hover:border-blue-500/30 transition-all duration-300 space-y-3">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl w-fit">
                <CheckCircle2 className="w-6 h-6 text-emerald-500" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900">{f.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Onboarding Registration CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-950 to-blue-950 text-white p-8 sm:p-14 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-800">
          <div className="space-y-3 text-center md:text-left">
            <h2 className="text-3xl font-black tracking-tight">Ready to activate your partner code?</h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl font-normal">
              Complete our 4-stage digital partner registration form. KYC verification completed in 24 hours.
            </p>
          </div>
          <Button
            size="lg"
            variant="success"
            onClick={() => navigate('/partners/become-a-partner')}
            rightIcon={<ArrowRight className="w-5 h-5" />}
            className="w-full md:w-auto font-black text-base shadow-xl"
          >
            Register as Partner Now
          </Button>
        </div>
      </section>
    </div>
  );
};
