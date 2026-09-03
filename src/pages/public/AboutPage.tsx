import React, { useState } from 'react';
import { DisclaimerBanner } from '../../components/common/DisclaimerBanner';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { useToast } from '../../app/providers/ToastContext';
import {
  Building2,
  Target,
  Globe,
  PhoneCall,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  ShieldCheck,
  Users,
  TrendingUp
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const operatingPillars = [
    {
      title: 'Institutional Governance',
      icon: ShieldCheck,
      desc: 'Strict alignment with RBI Digital Lending Guidelines, ISO 27001 data security standards, and Form 26AS TDS tax compliance.'
    },
    {
      title: 'Proprietary BRE Technology',
      icon: TrendingUp,
      desc: 'Algorithmic Business Rule Engine (BRE) that instantly matches applicant profiles against policy criteria of 35+ partner Banks & NBFCs.'
    },
    {
      title: 'Empowered Partner Ecosystem',
      icon: Users,
      desc: 'Providing over 2,500+ financial advisors and DSAs with enterprise CRM tools, real-time tracking, and assured monthly payout processing.'
    },
  ];

  const regionalOffices = [
    { city: 'Mumbai (Corporate HQ)', address: 'FinServe Towers, Level 8, Bandra-Kurla Complex (BKC), Mumbai, MH 400051', contact: '+91 22 4900 1200' },
    { city: 'New Delhi NCR Regional', address: 'Cyber City, Tower B, 12th Floor, DLF Phase 2, Gurugram, HR 122002', contact: '+91 124 480 3400' },
    { city: 'Bengaluru Tech Hub', address: 'Prestige Trade Tower, Palace Road, High Grounds, Bengaluru, KA 560001', contact: '+91 80 6700 8900' },
  ];

  return (
    <div className="space-y-16 py-12">
      {/* Hero Header */}
      <section className="bg-slate-950 text-white py-16 lg:py-24 border-b border-slate-900 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-3.5 py-1.5 rounded-full border border-blue-500/20">
            <Building2 className="w-3.5 h-3.5" /> Financial Distribution Technology Platform
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight max-w-4xl mx-auto text-white leading-tight">
            Empowering Financial Distribution Across India
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            FinServe is an enterprise financial technology platform bridging retail borrowers, partner DSAs, and institutional lenders through transparent credit facilitation.
          </p>
        </div>
      </section>

      {/* Corporate Profile Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-fintech space-y-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-extrabold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase border border-blue-100">
              Corporate Overview
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Who We Are</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              FinServe operates at the intersection of financial technology and credit distribution. By combining an algorithmic credit routing engine with a nationwide partner network, we enable seamless loan origination, document verification, and institutional underwriting across 9 loan product verticals.
            </p>
          </div>

          {/* Key Impact Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-slate-100 text-center">
            <div className="space-y-1">
              <p className="text-3xl font-black text-slate-900">₹500+ Cr</p>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Disbursed Facility Value</p>
            </div>
            <div className="space-y-1 border-l border-slate-100">
              <p className="text-3xl font-black text-blue-600">35+</p>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Empanelled Lenders</p>
            </div>
            <div className="space-y-1 border-l border-slate-100">
              <p className="text-3xl font-black text-emerald-600">2,500+</p>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Partner DSAs</p>
            </div>
            <div className="space-y-1 border-l border-slate-100">
              <p className="text-3xl font-black text-slate-900">100+</p>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cities Network</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-fintech space-y-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl w-fit">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-black text-slate-900">Our Corporate Mission</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              To democratize access to credit across Tier 1, Tier 2, and Tier 3 Indian markets by providing a transparent, tech-first distribution ecosystem that empowers financial advisors and ensures friction-free borrower journeys.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-fintech space-y-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl w-fit">
              <Globe className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-black text-slate-900">Our Corporate Vision</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              To serve as India’s most trusted digital credit distribution infrastructure, facilitating over ₹5,000 Crore in annual credit disbursals while upholding strict data privacy and institutional compliance.
            </p>
          </div>
        </div>
      </section>

      {/* Strategic Operating Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Our Core Operating Pillars</h2>
          <p className="text-xs sm:text-sm text-slate-600">The core standards governing every credit facilitation on the FinServe platform</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {operatingPillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div key={i} className="bg-white p-7 rounded-3xl border border-slate-200/90 shadow-fintech hover:shadow-xl hover:border-blue-500/30 transition-all duration-300 space-y-4">
                <div className="p-3.5 bg-blue-50 text-blue-600 rounded-2xl w-fit">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900">{pillar.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">{pillar.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Corporate Offices Network */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Corporate Office Locations</h2>
          <p className="text-xs text-slate-500">Key regional hubs providing ground operations and partner desk support</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {regionalOffices.map((off, idx) => (
            <div key={idx} className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 space-y-3 shadow-xl flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-sm">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span>{off.city}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">{off.address}</p>
              </div>
              <p className="text-xs text-blue-400 font-mono pt-2 border-t border-slate-800">{off.contact}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DisclaimerBanner />
      </div>
    </div>
  );
};

export const ContactPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [inquiryType, setInquiryType] = useState('borrower_support');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !mobile || !message) {
      showToast('Please fill in required fields (Name, Mobile, Message)', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      showToast('Contact request submitted successfully! Reference #CN-8902', 'success');
    }, 600);
  };

  return (
    <div className="space-y-16 py-12">
      {/* Header Banner */}
      <section className="bg-slate-950 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-900 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[130px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto space-y-4 text-center relative z-10">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-xs font-extrabold border border-blue-500/20">
            <PhoneCall className="w-3.5 h-3.5" /> Operations & Support Desk
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">Contact FinServe Support Desk</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto font-normal">
            Reach out for borrower application assistance, DSA partner onboarding inquiries, or institutional grievance escalation.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Contact Info Cards (Left) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-7 rounded-3xl border border-slate-200/90 shadow-fintech space-y-6">
              <h3 className="text-lg font-black text-slate-900">Helpline & Support Desks</h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3.5">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl shrink-0">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-extrabold text-slate-900 text-sm">Customer Toll-Free Hotline</p>
                    <p className="text-blue-600 font-extrabold text-base mt-0.5">1800-123-4567</p>
                    <p className="text-slate-500 text-[11px] mt-0.5">Mon - Sat, 9:30 AM to 6:30 PM (IST)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 pt-4 border-t border-slate-100">
                  <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-extrabold text-slate-900 text-sm">Email Support Desks</p>
                    <p className="text-slate-600"><strong className="text-slate-800">Borrower Support:</strong> support@finserve-dsa.example.com</p>
                    <p className="text-slate-600"><strong className="text-slate-800">DSA Partner Desk:</strong> partners@finserve-dsa.example.com</p>
                    <p className="text-slate-600"><strong className="text-slate-800">Grievance Officer:</strong> grievance@finserve-dsa.example.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 pt-4 border-t border-slate-100">
                  <div className="p-3 bg-slate-100 text-slate-700 rounded-2xl shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-extrabold text-slate-900 text-sm">Corporate HQ Address</p>
                    <p className="text-slate-600 leading-relaxed mt-0.5">
                      FinServe Towers, Level 8, Plot C-45, G-Block, Bandra-Kurla Complex (BKC), Bandra (East), Mumbai, Maharashtra 400051
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Form (Right) */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/90 shadow-fintech space-y-6">
              <div>
                <h3 className="text-xl font-black text-slate-900">Send an Enquiry Message</h3>
                <p className="text-xs text-slate-500 mt-1">Our support team will respond within 2 business hours</p>
              </div>

              {isSuccess ? (
                <div className="p-8 bg-emerald-50 text-emerald-800 rounded-3xl border border-emerald-200 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="text-lg font-bold">Message Received!</h4>
                  <p className="text-xs leading-relaxed max-w-md mx-auto">
                    Thank you, {fullName}. Your query regarding {inquiryType.replace('_', ' ')} has been assigned reference ticket <strong>#CN-8902</strong>. An RM will contact you shortly.
                  </p>
                  <Button size="sm" variant="outline" onClick={() => { setIsSuccess(false); setFullName(''); setMobile(''); setMessage(''); }}>
                    Send Another Inquiry
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Full Name *"
                      placeholder="e.g. Rahul Mehta"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                    <Input
                      label="10-Digit Mobile Number *"
                      placeholder="e.g. 9820012345"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Email Address"
                      type="email"
                      placeholder="rahul@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Select
                      label="Inquiry Category *"
                      value={inquiryType}
                      onChange={(e) => setInquiryType(e.target.value)}
                      options={[
                        { value: 'borrower_support', label: 'Borrower Application Status' },
                        { value: 'partner_onboarding', label: 'Become a DSA Partner' },
                        { value: 'payout_inquiry', label: 'Partner Commission & Payout' },
                        { value: 'grievance', label: 'Grievance / Dispute Escalation' },
                        { value: 'lender_tieup', label: 'Bank / NBFC Empanelment' },
                      ]}
                    />
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <label className="font-semibold text-slate-700">Message / Inquiry Details *</label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please describe your query or requirement..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    ></textarea>
                  </div>

                  <Button
                    type="submit"
                    variant="gradient"
                    size="lg"
                    className="w-full font-bold"
                    isLoading={isSubmitting}
                    rightIcon={<Send className="w-4 h-4" />}
                  >
                    Submit Enquiry Message
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
