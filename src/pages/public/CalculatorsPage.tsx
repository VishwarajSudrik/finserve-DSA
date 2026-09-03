import React from 'react';
import { EMICalculator } from '../../components/marketing/EMICalculator';
import { EligibilityCalculator } from '../../components/marketing/EligibilityCalculator';
import { useNavigate } from 'react-router-dom';
import { Calculator } from 'lucide-react';

export interface CalculatorsPageProps {
  type?: 'emi' | 'eligibility';
}

export const CalculatorsPage: React.FC<CalculatorsPageProps> = ({ type = 'emi' }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-12 py-12">
      {/* Dark Header Banner */}
      <section className="bg-slate-950 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-900 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[130px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto space-y-4 text-center relative z-10">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-xs font-extrabold border border-blue-500/20">
            <Calculator className="w-3.5 h-3.5" /> Interactive Financial Tools
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">Loan Calculators & Estimators</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto font-normal">
            Accurately plan your loan repayments, estimate monthly EMI obligations, and evaluate tentative borrowing capacity.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm max-w-md">
          <button
            onClick={() => navigate('/calculators/emi')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              type === 'emi' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            EMI Calculator
          </button>
          <button
            onClick={() => navigate('/calculators/loan-eligibility')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              type === 'eligibility' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            FOIR Eligibility Estimator
          </button>
        </div>

        {/* Dynamic Calculator Render */}
        {type === 'eligibility' ? (
          <EligibilityCalculator />
        ) : (
          <EMICalculator defaultAmount={1000000} defaultRate={10.5} defaultTenureYears={5} />
        )}
      </section>
    </div>
  );
};
