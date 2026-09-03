import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LOAN_PRODUCTS } from '../../config/products';
import { ProductCard } from '../../components/cards/ProductCard';
import { EMICalculator } from '../../components/marketing/EMICalculator';
import { DisclaimerBanner } from '../../components/common/DisclaimerBanner';
import { MOCK_FAQS } from '../../data/blogs';
import {
  ArrowRight,
  ShieldCheck,
  Building2,
  CheckCircle2,
  Home,
  Briefcase,
  User,
  Building,
  Truck,
  Wrench,
  Sparkles,
  PhoneCall,
  Zap
} from 'lucide-react';
import { Button } from '../../components/common/Button';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const categories = [
    { title: 'Home Loan', icon: Home, slug: 'home-loan', desc: 'Attractive rates for flat purchase, plot & construction' },
    { title: 'Business Loan', icon: Briefcase, slug: 'business-loan', desc: 'Unsecured capital for growth & operational expansion' },
    { title: 'Personal Loan', icon: User, slug: 'personal-loan', desc: 'Fast digital credit for salaried & self-employed' },
    { title: 'Property Loan', icon: Building, slug: 'loan-against-property', desc: 'Leverage real estate equity for high-value funding' },
    { title: 'Vehicle Finance', icon: Truck, slug: 'commercial-vehicle-finance', desc: 'Commercial transport fleet credit' },
    { title: 'Equipment Finance', icon: Wrench, slug: 'machinery-finance', desc: 'Asset-backed funding for industrial machinery' },
  ];

  return (
    <div className="space-y-20 lg:space-y-28 pb-16">
      {/* SECTION 2: HERO SECTION */}
      <section className="relative overflow-hidden bg-slate-950 text-white pt-8 pb-20 lg:pt-12 lg:pb-28">
        {/* Glowing Mesh Background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-emerald-500/15 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Col: Copy & CTAs */}
            <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 border border-slate-800 text-blue-400 text-xs font-bold shadow-lg backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span>Next-Gen Financial Distribution Architecture</span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1]">
                Financial Solutions, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400">
                  Built Around Your Needs
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
                Explore suitable credit options with end-to-end guidance. Connect with 35+ Banks & NBFCs through India’s transparent financial distribution ecosystem.
              </p>

              {/* 3 CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-3">
                <Button
                  size="lg"
                  variant="gradient"
                  onClick={() => navigate('/check-eligibility')}
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                  className="w-full sm:w-auto font-bold text-base shadow-xl text-white hover:text-white"
                >
                  Check Eligibility
                </Button>
                <Button
                  size="lg"
                  variant="primary"
                  onClick={() => navigate('/contact')}
                  leftIcon={<PhoneCall className="w-4.5 h-4.5 text-white" />}
                  className="w-full sm:w-auto text-white hover:text-white bg-blue-600 hover:bg-blue-500 border border-blue-400/60 shadow-xl shadow-blue-500/25 font-black text-base tracking-wide"
                >
                  Talk to Loan Expert
                </Button>
                <Button
                  size="lg"
                  variant="success"
                  onClick={() => navigate('/partners')}
                  className="w-full sm:w-auto text-white hover:text-white bg-emerald-600 hover:bg-emerald-500 border border-emerald-500 shadow-lg shadow-emerald-500/20 font-extrabold"
                >
                  Become a Partner →
                </Button>
              </div>

              {/* Security & Regulatory Highlights */}
              <div className="pt-8 border-t border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
                <span className="flex items-center gap-2 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% Data Encryption Standard
                </span>
                <span className="flex items-center gap-2 font-medium">
                  <Building2 className="w-4 h-4 text-blue-400" /> 35+ Institutional Lenders
                </span>
              </div>
            </div>

            {/* Right Col: Hyper-Modern Live Credit Dashboard Card */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 opacity-40 blur-xl animate-pulse"></div>
                <div className="relative bg-slate-900/90 backdrop-blur-2xl border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-6">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                    </div>
                    <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-semibold">DIGITAL CREDIT DESK</span>
                  </div>

                  {/* Pre-Approved Credit Card Widget */}
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700/80 flex items-center justify-between shadow-inner">
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">INDICATIVE ASSESSMENT</p>
                        <p className="text-2xl font-black text-emerald-400 tracking-tight mt-0.5">₹25,00,000</p>
                      </div>
                      <span className="px-3 py-1 rounded-full text-[10px] font-extrabold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                        <Zap className="w-3 h-3" /> Pre-Approved
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3.5 bg-slate-800/60 rounded-xl border border-slate-800">
                        <p className="text-[10px] text-slate-400 font-semibold uppercase">Tentative ROI</p>
                        <p className="text-sm font-extrabold text-white mt-0.5">8.40% p.a.</p>
                      </div>
                      <div className="p-3.5 bg-slate-800/60 rounded-xl border border-slate-800">
                        <p className="text-[10px] text-slate-400 font-semibold uppercase">Turnaround SLA</p>
                        <p className="text-sm font-extrabold text-white mt-0.5">24 - 48 Hours</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Underwriting Status</span>
                    <span className="text-emerald-400 font-extrabold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span> Active Pipeline
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: TRUST METRICS BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-fintech-lg grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative overflow-hidden">
          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">₹500+ Cr</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Disbursed Facility Value</p>
          </div>
          <div className="space-y-1 border-l border-slate-100">
            <p className="text-3xl sm:text-4xl font-black text-blue-600 tracking-tight">100+ Cities</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Presence Across India</p>
          </div>
          <div className="space-y-1 border-l border-slate-100">
            <p className="text-3xl sm:text-4xl font-black text-emerald-600 tracking-tight">35+ Lenders</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Institutional Partners</p>
          </div>
          <div className="space-y-1 border-l border-slate-100">
            <p className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">99.4%</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Customer Satisfaction</p>
          </div>
        </div>
      </section>

      {/* SECTION 4: WHAT ARE YOU LOOKING FOR? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">What are you looking for?</h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">Select a financial category to explore tailored credit solutions</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <div
                key={i}
                onClick={() => navigate(`/financial-solutions/${cat.slug}`)}
                className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-fintech hover:shadow-2xl hover:border-blue-500/30 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer group space-y-4"
              >
                <div className="p-3.5 bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600 rounded-2xl w-fit group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white transition-all duration-300 shadow-xs">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed font-normal">{cat.desc}</p>
                </div>
                <span className="text-xs font-bold text-blue-600 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Explore Category →
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 5: FINANCIAL SOLUTIONS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-slate-200 pb-5">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Our Financial Solutions</h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">Structured financing products for retail borrowers, business owners, and corporates</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate('/financial-solutions')}>
            View All 9 Solutions
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LOAN_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* SECTION 6: HOW IT WORKS */}
      <section className="bg-white py-20 border-y border-slate-200/90 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">How It Works</h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">Simple 4-step digital credit journey with end-to-end guidance</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { num: '1', title: 'Check Eligibility', desc: 'Fill out basic financial inputs to receive instant indicative evaluation.' },
              { num: '2', title: 'Upload Documents', desc: 'Submit KYC & income statements digitally through our secure borrower portal.' },
              { num: '3', title: 'Lender Review', desc: 'Our relationship desk matches your profile with partner Banks & NBFCs.' },
              { num: '4', title: 'Sanction & Disbursal', desc: 'Receive formal sanction letter and loan disbursal directly into your account.' }
            ].map((step, idx) => (
              <div key={idx} className="bg-slate-50 p-6 rounded-3xl border border-slate-200/80 space-y-4 hover:shadow-lg transition-all duration-300">
                <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-black text-lg flex items-center justify-center shadow-md">
                  {step.num}
                </span>
                <h3 className="text-base font-extrabold text-slate-900">{step.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: SMART ELIGIBILITY CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 text-white rounded-3xl p-8 sm:p-14 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-800 relative overflow-hidden">
          <div className="space-y-3 text-center md:text-left z-10">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Ready to verify your credit eligibility?</h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl font-normal">
              Complete our 8-step smart eligibility wizard in under 2 minutes. No impact on official credit score.
            </p>
          </div>
          <Button
            size="lg"
            variant="success"
            onClick={() => navigate('/check-eligibility')}
            rightIcon={<ArrowRight className="w-5 h-5" />}
            className="w-full md:w-auto font-black text-base z-10 shadow-xl"
          >
            Start Eligibility Flow
          </Button>
        </div>
      </section>

      {/* SECTION 8: EMI CALCULATOR PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <EMICalculator />
      </section>

      {/* SECTION 9: LENDING PARTNER NETWORK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-center">
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Institutional Lending Partner Ecosystem</h2>
          <p className="text-xs text-slate-500 font-medium">Represented via generic placeholders until partner API integration</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Lender Partner Alpha (National Bank)', 'Lender Partner Beta (Premier NBFC)', 'Lender Partner Gamma (Housing Corp)', 'Lender Partner Delta (Fintech Lending)'].map((lender, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 text-xs font-bold text-slate-800 shadow-xs flex items-center justify-center min-h-[76px] hover:border-blue-500/40 hover:shadow-md transition-all">
              {lender}
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 12: DSA PARTNER SECTION */}
      <section className="bg-slate-950 text-white py-20 border-y border-slate-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3.5 py-1.5 rounded-full border border-emerald-500/20">
                DSA Partner Network
              </span>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">Grow Your Financial Distribution Business</h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Join India’s premier financial distribution platform. Access 35+ lending institutions, transparent payout tracking, digital lead management, and dedicated relationship manager support.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-1">
                  <p className="font-extrabold text-white">Transparent Payout Engine</p>
                  <p className="text-slate-400">Timely monthly disbursal commission payouts with detailed UTR records.</p>
                </div>
                <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-1">
                  <p className="font-extrabold text-white">Digital Lead CRM</p>
                  <p className="text-slate-400">Track application stages from enquiry to disbursal on mobile.</p>
                </div>
              </div>

              <Button
                size="lg"
                variant="success"
                onClick={() => navigate('/partners/become-a-partner')}
                rightIcon={<ArrowRight className="w-5 h-5" />}
                className="font-bold"
              >
                Become a DSA Partner
              </Button>
            </div>

            <div className="lg:col-span-5 bg-slate-900 p-7 rounded-3xl border border-slate-800 space-y-5 shadow-2xl">
              <h3 className="text-lg font-bold text-white">Partner Program Highlights</h3>
              <ul className="space-y-3 text-xs text-slate-300 font-medium">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Multi-product credit distribution rights
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Dedicated RM & back-office desk support
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Real-time mobile portal dashboard
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Automated Form 26AS TDS reporting
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 15: FAQS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Frequently Asked Questions</h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">Get answers to common queries regarding credit facilitation</p>
        </div>

        <div className="space-y-4">
          {MOCK_FAQS.map((faq) => (
            <div key={faq.id} className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-fintech space-y-2">
              <h3 className="text-sm font-extrabold text-slate-900">{faq.question}</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 16: FINAL DISCLAIMER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DisclaimerBanner />
      </section>
    </div>
  );
};
