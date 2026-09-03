import React, { useState } from 'react';
import { calculateEligibility } from '../../utils/calculators';
import { formatINR } from '../../utils/formatters';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { ShieldAlert, ArrowRight, Calculator } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const EligibilityCalculator: React.FC = () => {
  const [income, setIncome] = useState<number>(100000);
  const [existingEmi, setExistingEmi] = useState<number>(15000);
  const [tenureYears, setTenureYears] = useState<number>(5);
  const [interestRate, setInterestRate] = useState<number>(10.5);

  const navigate = useNavigate();
  const res = calculateEligibility(income, existingEmi, tenureYears, interestRate);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-fintech-lg space-y-8">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">FOIR Loan Eligibility Estimator</h3>
            <p className="text-xs text-slate-500">Fixed Obligation to Income Ratio assessment used by Indian Banks & NBFCs</p>
          </div>
        </div>
        <span className="text-xs font-extrabold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-100 hidden sm:inline-block">
          FOIR Cap: {res.foirPercentage}%
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Sliders */}
        <div className="lg:col-span-7 space-y-6">
          {/* Gross Monthly Income */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
              <label htmlFor="foir-gross-income">GROSS MONTHLY INCOME (₹)</label>
              <div className="flex items-center gap-1 bg-blue-50 px-2.5 py-1 rounded-xl border border-blue-200 shadow-xs focus-within:ring-2 focus-within:ring-blue-500">
                <span className="text-blue-600 font-bold">₹</span>
                <input
                  id="foir-gross-income"
                  type="number"
                  value={income || ''}
                  onChange={(e) => setIncome(Math.max(0, Number(e.target.value)))}
                  className="w-28 bg-transparent text-right font-bold text-blue-600 focus:outline-none text-xs sm:text-sm"
                />
              </div>
            </div>
            <input
              type="range"
              min={25000}
              max={1000000}
              step={5000}
              value={income}
              onChange={(e) => setIncome(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>₹25,000</span>
              <span>₹10 Lakhs</span>
            </div>
          </div>

          {/* Existing Monthly EMIs */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
              <label htmlFor="foir-existing-emi">EXISTING MONTHLY EMIS (₹)</label>
              <div className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-xl border border-slate-200 shadow-xs focus-within:ring-2 focus-within:ring-blue-500">
                <span className="text-slate-700 font-bold">₹</span>
                <input
                  id="foir-existing-emi"
                  type="number"
                  value={existingEmi || ''}
                  onChange={(e) => setExistingEmi(Math.max(0, Number(e.target.value)))}
                  className="w-28 bg-transparent text-right font-bold text-slate-800 focus:outline-none text-xs sm:text-sm"
                />
              </div>
            </div>
            <input
              type="range"
              min={0}
              max={500000}
              step={2500}
              value={existingEmi}
              onChange={(e) => setExistingEmi(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>₹0</span>
              <span>₹5 Lakhs</span>
            </div>
          </div>

          {/* Desired Interest Rate (Min 1%) */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
              <label htmlFor="foir-interest-rate">ASSUMED INTEREST RATE (% P.A.)</label>
              <div className="flex items-center gap-1 bg-blue-50 px-2.5 py-1 rounded-xl border border-blue-200 shadow-xs focus-within:ring-2 focus-within:ring-blue-500">
                <input
                  id="foir-interest-rate"
                  type="number"
                  step="0.1"
                  min={1}
                  max={30}
                  value={interestRate || ''}
                  onChange={(e) => setInterestRate(Math.max(0, Number(e.target.value)))}
                  className="w-16 bg-transparent text-right font-bold text-blue-600 focus:outline-none text-xs sm:text-sm"
                />
                <span className="text-blue-600 font-bold">%</span>
              </div>
            </div>
            <input
              type="range"
              min={1}
              max={24}
              step={0.25}
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>1%</span>
              <span>24%</span>
            </div>
          </div>

          {/* Desired Tenure (Years) */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
              <label htmlFor="foir-tenure-years">DESIRED TENURE (YEARS)</label>
              <div className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-xl border border-slate-200 shadow-xs focus-within:ring-2 focus-within:ring-blue-500">
                <input
                  id="foir-tenure-years"
                  type="number"
                  min={1}
                  max={30}
                  value={tenureYears || ''}
                  onChange={(e) => setTenureYears(Math.max(0, Number(e.target.value)))}
                  className="w-14 bg-transparent text-right font-bold text-slate-800 focus:outline-none text-xs sm:text-sm"
                />
                <span className="text-slate-800 font-bold text-xs">Yrs</span>
              </div>
            </div>
            <input
              type="range"
              min={1}
              max={30}
              step={1}
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>1 Year</span>
              <span>30 Years</span>
            </div>
          </div>
        </div>

        {/* FOIR Breakdown Panel */}
        <div className="lg:col-span-5 bg-slate-900 text-white p-6 rounded-2xl flex flex-col justify-between space-y-6 shadow-xl">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold">FOIR ASSESSMENT</span>
              <Badge status={res.status === 'Potentially Suitable' ? 'active' : 'pending'}>
                {res.status}
              </Badge>
            </div>

            <div>
              <p className="text-xs text-slate-400 font-medium">Estimated Max Loan Capacity</p>
              <p className="text-3xl font-black text-emerald-400 mt-1 tracking-tight">{formatINR(res.maxLoanAmount)}</p>
            </div>

            {/* FOIR Utilization Bar */}
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-400 font-semibold">Current FOIR Utilization</span>
                <span className="font-extrabold text-blue-400">{res.foirUtilization}% of {res.foirPercentage}% Cap</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${res.foirUtilization > 40 ? 'bg-amber-400' : 'bg-emerald-400'}`}
                  style={{ width: `${Math.min(100, (res.foirUtilization / res.foirPercentage) * 100)}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/80 space-y-2 text-xs text-slate-300">
              <div className="flex justify-between text-[11px] font-semibold border-b border-slate-700/60 pb-1.5">
                <span>Max Allowed Total EMI ({res.foirPercentage}%):</span>
                <span className="text-white">{formatINR(res.totalAllowedEmi)}/mo</span>
              </div>
              <div className="flex justify-between text-[11px] font-semibold">
                <span>Net Disposable EMI Budget:</span>
                <span className="text-emerald-400 font-bold">{formatINR(res.maxEMI)}/mo</span>
              </div>
              <p className="text-[11px] text-slate-400 pt-1 leading-relaxed">{res.assessmentDetails}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-[11px] text-slate-400 flex items-start gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>Indicative assessment. Final sanction subject to bank underwriting policy.</span>
            </div>
            <Button
              className="w-full font-extrabold text-sm"
              variant="success"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              onClick={() => navigate('/check-eligibility')}
            >
              Start Complete Eligibility Flow
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
