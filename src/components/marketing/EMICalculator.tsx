import React, { useState } from 'react';
import { calculateEMI } from '../../utils/calculators';
import { formatINR } from '../../utils/formatters';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Calculator, ArrowRight, RotateCcw } from 'lucide-react';
import { Button } from '../common/Button';
import { useNavigate } from 'react-router-dom';

export interface EMICalculatorProps {
  defaultAmount?: number;
  defaultRate?: number;
  defaultTenureYears?: number;
  showApplyBtn?: boolean;
}

export const EMICalculator: React.FC<EMICalculatorProps> = ({
  defaultAmount = 1000000,
  defaultRate = 10.5,
  defaultTenureYears = 5,
  showApplyBtn = true,
}) => {
  const [amount, setAmount] = useState<number>(defaultAmount);
  const [rate, setRate] = useState<number>(defaultRate);
  const [tenureYears, setTenureYears] = useState<number>(defaultTenureYears);

  const navigate = useNavigate();
  const emiResult = calculateEMI(amount, rate, tenureYears * 12);

  const chartData = [
    { name: 'Principal Amount', value: amount, color: '#2563EB' },
    { name: 'Total Interest', value: emiResult.totalInterest, color: '#059669' },
  ];

  const handleReset = () => {
    setAmount(defaultAmount);
    setRate(defaultRate);
    setTenureYears(defaultTenureYears);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-fintech-lg space-y-8">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">EMI Calculator</h3>
            <p className="text-xs text-slate-500">Calculate monthly repayment breakdown and total interest payable</p>
          </div>
        </div>
        <button
          onClick={handleReset}
          className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 font-medium p-2 rounded-lg hover:bg-slate-100"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sliders Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Loan Amount Slider & Manual Input */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
              <label htmlFor="emi-loan-amount">LOAN AMOUNT (₹)</label>
              <div className="flex items-center gap-1 bg-blue-50 px-3 py-1 rounded-xl border border-blue-200 shadow-xs focus-within:ring-2 focus-within:ring-blue-500">
                <span className="text-blue-600 font-bold">₹</span>
                <input
                  id="emi-loan-amount"
                  type="number"
                  value={amount || ''}
                  onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
                  className="w-28 bg-transparent text-right font-bold text-blue-600 focus:outline-none text-sm sm:text-base"
                />
              </div>
            </div>
            <input
              type="range"
              min={50000}
              max={10000000}
              step={50000}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-medium">
              <span>₹50,000</span>
              <span>₹1 Crore</span>
            </div>
          </div>

          {/* Interest Rate Slider & Manual Input */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
              <label htmlFor="emi-interest-rate">INTEREST RATE (% P.A.)</label>
              <div className="flex items-center gap-1 bg-blue-50 px-3 py-1 rounded-xl border border-blue-200 shadow-xs focus-within:ring-2 focus-within:ring-blue-500">
                <input
                  id="emi-interest-rate"
                  type="number"
                  step="0.1"
                  min={1}
                  max={30}
                  value={rate || ''}
                  onChange={(e) => setRate(Math.max(0, Number(e.target.value)))}
                  className="w-16 bg-transparent text-right font-bold text-blue-600 focus:outline-none text-sm sm:text-base"
                />
                <span className="text-blue-600 font-bold">%</span>
              </div>
            </div>
            <input
              type="range"
              min={1}
              max={24}
              step={0.25}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-medium">
              <span>1%</span>
              <span>24%</span>
            </div>
          </div>

          {/* Tenure Slider & Manual Input */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
              <label htmlFor="emi-tenure-years">LOAN TENURE (YEARS)</label>
              <div className="flex items-center gap-1 bg-blue-50 px-3 py-1 rounded-xl border border-blue-200 shadow-xs focus-within:ring-2 focus-within:ring-blue-500">
                <input
                  id="emi-tenure-years"
                  type="number"
                  min={1}
                  max={30}
                  value={tenureYears || ''}
                  onChange={(e) => setTenureYears(Math.max(0, Number(e.target.value)))}
                  className="w-14 bg-transparent text-right font-bold text-blue-600 focus:outline-none text-sm sm:text-base"
                />
                <span className="text-blue-600 font-bold text-xs">Yrs</span>
              </div>
            </div>
            <input
              type="range"
              min={1}
              max={30}
              step={1}
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-medium">
              <span>1 Year</span>
              <span>30 Years</span>
            </div>
          </div>
        </div>

        {/* Calculation Summary & Donut Chart */}
        <div className="lg:col-span-5 bg-slate-50 p-6 rounded-2xl border border-slate-200/80 flex flex-col justify-between space-y-6">
          <div className="text-center space-y-1 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Estimated Monthly EMI</p>
            <p className="text-3xl font-extrabold text-blue-600 tracking-tight">{formatINR(emiResult.monthlyEMI)}</p>
          </div>

          <div className="h-44 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => [formatINR(Number(value || 0)), 'Amount']} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 text-xs font-medium">
            <div className="flex justify-between items-center text-slate-600">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-blue-600"></span>
                Principal Amount
              </span>
              <span className="font-bold text-slate-900">{formatINR(amount)}</span>
            </div>
            <div className="flex justify-between items-center text-slate-600">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-600"></span>
                Total Interest Payable
              </span>
              <span className="font-bold text-slate-900">{formatINR(emiResult.totalInterest)}</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-slate-200 text-slate-900 font-bold">
              <span>Total Repayment</span>
              <span className="text-sm">{formatINR(emiResult.totalRepayment)}</span>
            </div>
          </div>

          {showApplyBtn && (
            <Button
              className="w-full"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              onClick={() => navigate('/check-eligibility')}
            >
              Apply With This Calculation
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
