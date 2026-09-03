import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { LOAN_PRODUCTS } from '../../config/products';
import { EMICalculator } from '../../components/marketing/EMICalculator';
import { DisclaimerBanner } from '../../components/common/DisclaimerBanner';
import { formatINR } from '../../utils/formatters';
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  ChevronRight,
  PhoneCall
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const product = LOAN_PRODUCTS.find((p) => p.slug === slug || p.id === slug) || LOAN_PRODUCTS[0];

  const formatTenureDisplay = (months: number) => {
    if (months < 12) {
      return `${months} Month${months > 1 ? 's' : ''}`;
    }
    const years = months / 12;
    const formattedYears = Number.isInteger(years) ? years.toString() : years.toFixed(1);
    return `${formattedYears} Year${years > 1 ? 's' : ''}`;
  };

  const formatInterestRateDisplay = (rate: number) => {
    if (rate === 0) {
      return '0% Interest (up to 50 days)';
    }
    return `From ${rate}% p.a.`;
  };

  return (
    <div className="space-y-12 py-12">
      {/* Dark Product Banner */}
      <section className="bg-slate-950 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-900 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[130px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto space-y-6 relative z-10">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
            <Link to="/financial-solutions" className="hover:text-white transition-colors">Financial Solutions</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-blue-400">{product.name}</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <Badge status="active">{product.category}</Badge>
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">{product.name}</h1>
            </div>
          </div>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed font-normal">
            {product.fullDescription}
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 max-w-xl">
            <Button
              size="lg"
              variant="gradient"
              onClick={() => navigate('/check-eligibility')}
              rightIcon={<ArrowRight className="w-5 h-5" />}
              className="font-extrabold text-base shadow-xl text-white hover:text-white justify-center"
            >
              Check Eligibility
            </Button>
            <Button
              size="lg"
              variant="primary"
              onClick={() => navigate('/contact')}
              leftIcon={<PhoneCall className="w-4.5 h-4.5 text-white" />}
              className="text-white hover:text-white bg-blue-600 hover:bg-blue-500 border border-blue-400/60 shadow-lg shadow-blue-500/20 font-black text-base justify-center"
            >
              Talk to Loan Expert
            </Button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Product Key Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-fintech text-center">
          <div className="p-3.5 bg-slate-50/60 rounded-2xl border border-slate-100 flex flex-col justify-center">
            <p className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Max Amount</p>
            <p className="text-base sm:text-xl font-extrabold text-slate-900 mt-1 truncate">{formatINR(product.maxAmount)}</p>
          </div>
          <div className="p-3.5 bg-blue-50/50 rounded-2xl border border-blue-100/60 flex flex-col justify-center">
            <p className="text-[11px] font-extrabold text-blue-600 uppercase tracking-wider">Interest Rate</p>
            <p className="text-base sm:text-lg font-extrabold text-blue-600 mt-1 leading-tight">{formatInterestRateDisplay(product.minInterestRate)}</p>
          </div>
          <div className="p-3.5 bg-slate-50/60 rounded-2xl border border-slate-100 flex flex-col justify-center">
            <p className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Max Tenure</p>
            <p className="text-base sm:text-xl font-extrabold text-slate-900 mt-1 truncate">{formatTenureDisplay(product.maxTenureMonths)}</p>
          </div>
          <div className="p-3.5 bg-slate-50/60 rounded-2xl border border-slate-100 flex flex-col justify-center">
            <p className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Processing Fee</p>
            <p className="text-xs sm:text-sm font-bold text-slate-700 mt-1 leading-snug">{product.processingFeeRange}</p>
          </div>
        </div>

        {/* Features & Eligibility Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Key Features */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-fintech space-y-6">
            <h3 className="text-xl font-bold text-slate-900">Key Solution Features</h3>
            <div className="space-y-4">
              {product.features.map((feat, i) => (
                <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                  <h4 className="text-sm font-bold text-slate-900">{feat.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{feat.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Eligibility Criteria */}
          <div className="lg:col-span-5 bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
            <h3 className="text-xl font-bold">Eligibility Parameters</h3>
            <div className="space-y-3 text-xs">
              {product.eligibility.map((item, i) => (
                <div key={i} className="flex justify-between items-center py-2.5 border-b border-slate-800">
                  <span className="text-slate-400 font-semibold">{item.label}</span>
                  <span className="font-bold text-emerald-400 text-right">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Required Documents */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-fintech space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Required Documentation</h3>
              <p className="text-xs text-slate-500">Standard documents required for initial credit verification</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.requiredDocuments.map((doc, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs font-semibold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{doc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* EMI Calculator Component */}
        <EMICalculator defaultAmount={product.minAmount * 2} defaultRate={product.minInterestRate} />

        {/* Product FAQs */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-slate-900">Frequently Asked Questions</h3>
          <div className="space-y-3">
            {product.faqs.map((faq, i) => (
              <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
                <h4 className="text-sm font-bold text-slate-900">{faq.question}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        <DisclaimerBanner />
      </div>
    </div>
  );
};
