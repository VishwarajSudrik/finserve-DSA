import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Building2,
  Menu as MenuIcon,
  ChevronDown,
  Shield,
  PhoneCall,
  ArrowRight,
  User,
  Briefcase,
  UserCheck,
  ShieldCheck,
  LogIn
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Drawer } from '../components/common/Drawer';
import { PersonaSwitcher } from '../components/common/PersonaSwitcher';
import { useAuth } from '../app/providers/AuthContext';

export const PublicLayout: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [solutionsDropdown, setSolutionsDropdown] = useState(false);
  const [calculatorsDropdown, setCalculatorsDropdown] = useState(false);
  const [ecosystemDropdown, setEcosystemDropdown] = useState(false);

  const { setPersona } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setSolutionsDropdown(false);
    setCalculatorsDropdown(false);
    setEcosystemDropdown(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Top Banner Notice */}
      <div className="bg-slate-950 text-slate-300 text-[11px] py-2 px-4 font-semibold flex items-center justify-between border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>India’s Professional Financial Distribution Platform • 100+ Cities Network</span>
          </div>
          <div className="hidden md:flex items-center gap-5 text-slate-400 text-xs">
            <Link to="/trust-center" className="hover:text-white transition-colors flex items-center gap-1.5 font-bold">
              <Shield className="w-3.5 h-3.5 text-emerald-400" /> Trust Center
            </Link>
            <Link to="/grievance-redressal" className="hover:text-white transition-colors">Grievance Desk</Link>
            <a href="tel:+9118001234567" className="hover:text-white transition-colors flex items-center gap-1.5 font-bold">
              <PhoneCall className="w-3.5 h-3.5 text-blue-400" /> 1800-123-4567
            </a>
          </div>
        </div>
      </div>

      {/* Sticky Desktop & Mobile Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled ? 'bg-white/90 backdrop-blur-md shadow-fintech border-b border-slate-200/80 py-3.5' : 'bg-white border-b border-slate-200 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="p-2.5 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 rounded-2xl text-white shadow-md group-hover:scale-105 transition-transform duration-200">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-slate-900 block leading-none">FINSERVE</span>
              <span className="text-[10px] font-extrabold tracking-widest text-blue-600 uppercase block mt-0.5">DSA PLATFORM</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-bold text-slate-700">
            <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <Link to="/about" className="hover:text-blue-600 transition-colors">About Us</Link>

            {/* Solutions Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setSolutionsDropdown(true)}
              onMouseLeave={() => setSolutionsDropdown(false)}
            >
              <button className="flex items-center gap-1.5 py-2 hover:text-blue-600 transition-colors cursor-pointer">
                Financial Solutions <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {solutionsDropdown && (
                <div className="absolute top-full left-0 w-64 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200/90 p-3 space-y-1 animate-in fade-in duration-150 z-50">
                  <Link to="/financial-solutions/personal-loan" className="block px-3.5 py-2.5 rounded-2xl hover:bg-blue-50 hover:text-blue-600 transition-colors font-semibold">Personal Loan</Link>
                  <Link to="/financial-solutions/home-loan" className="block px-3.5 py-2.5 rounded-2xl hover:bg-blue-50 hover:text-blue-600 transition-colors font-semibold">Home Loan</Link>
                  <Link to="/financial-solutions/business-loan" className="block px-3.5 py-2.5 rounded-2xl hover:bg-blue-50 hover:text-blue-600 transition-colors font-semibold">Business Loan</Link>
                  <Link to="/financial-solutions/msme-finance" className="block px-3.5 py-2.5 rounded-2xl hover:bg-blue-50 hover:text-blue-600 transition-colors font-semibold">MSME Finance</Link>
                  <Link to="/financial-solutions/loan-against-property" className="block px-3.5 py-2.5 rounded-2xl hover:bg-blue-50 hover:text-blue-600 transition-colors font-semibold">Loan Against Property</Link>
                  <Link to="/financial-solutions/working-capital" className="block px-3.5 py-2.5 rounded-2xl hover:bg-blue-50 hover:text-blue-600 transition-colors font-semibold">Working Capital</Link>
                  <Link to="/financial-solutions/machinery-finance" className="block px-3.5 py-2.5 rounded-2xl hover:bg-blue-50 hover:text-blue-600 transition-colors font-semibold">Machinery Finance</Link>
                  <Link to="/financial-solutions/commercial-vehicle-finance" className="block px-3.5 py-2.5 rounded-2xl hover:bg-blue-50 hover:text-blue-600 transition-colors font-semibold">Commercial Vehicle Finance</Link>
                  <Link to="/financial-solutions/credit-card" className="block px-3.5 py-2.5 rounded-2xl hover:bg-blue-50 hover:text-blue-600 transition-colors font-semibold">Credit Cards</Link>
                </div>
              )}
            </div>

            {/* Calculators Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCalculatorsDropdown(true)}
              onMouseLeave={() => setCalculatorsDropdown(false)}
            >
              <button className="flex items-center gap-1.5 py-2 hover:text-blue-600 transition-colors cursor-pointer">
                Calculators <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {calculatorsDropdown && (
                <div className="absolute top-full left-0 w-56 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200/90 p-3 space-y-1 animate-in fade-in duration-150 z-50">
                  <Link to="/calculators/emi" className="block px-3.5 py-2.5 rounded-2xl hover:bg-blue-50 hover:text-blue-600 transition-colors font-semibold">EMI Calculator</Link>
                  <Link to="/calculators/loan-eligibility" className="block px-3.5 py-2.5 rounded-2xl hover:bg-blue-50 hover:text-blue-600 transition-colors font-semibold">FOIR Eligibility Estimator</Link>
                </div>
              )}
            </div>

            {/* Ecosystem & Guides Dropdown (How It Works, Partners, Resources) */}
            <div
              className="relative"
              onMouseEnter={() => setEcosystemDropdown(true)}
              onMouseLeave={() => setEcosystemDropdown(false)}
            >
              <button className="flex items-center gap-1.5 py-2 hover:text-blue-600 transition-colors cursor-pointer">
                Ecosystem & Guides <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {ecosystemDropdown && (
                <div className="absolute top-full left-0 w-56 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200/90 p-3 space-y-1 animate-in fade-in duration-150 z-50">
                  <Link to="/how-it-works" className="block px-3.5 py-2.5 rounded-2xl hover:bg-blue-50 hover:text-blue-600 transition-colors font-semibold">How It Works</Link>
                  <Link to="/partners" className="block px-3.5 py-2.5 rounded-2xl hover:bg-blue-50 hover:text-blue-600 transition-colors font-semibold">Partners</Link>
                  <Link to="/resources" className="block px-3.5 py-2.5 rounded-2xl hover:bg-blue-50 hover:text-blue-600 transition-colors font-semibold">Resources & Knowledge Hub</Link>
                </div>
              )}
            </div>

            <Link to="/contact" className="hover:text-blue-600 transition-colors">Contact</Link>
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/partners/become-a-partner')}
              className="border-emerald-600/40 text-emerald-700 hover:bg-emerald-50 font-bold hover:border-emerald-600 shadow-xs"
            >
              Become a Partner
            </Button>
            <Button
              variant="gradient"
              size="sm"
              onClick={() => navigate('/check-eligibility')}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="font-extrabold shadow-md shadow-blue-500/20"
            >
              Check Eligibility
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/login')}
              leftIcon={<LogIn className="w-4 h-4 text-blue-600" />}
              className="border-slate-300 text-slate-900 hover:bg-slate-100 font-extrabold shadow-xs"
            >
              Login
            </Button>
          </div>

          {/* Mobile Menu Icon */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2.5 rounded-2xl text-slate-700 hover:bg-slate-100 min-h-[44px] min-w-[44px] flex items-center justify-center border border-slate-200"
          >
            <MenuIcon className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <Drawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        title="FinServe Navigation"
      >
        <div className="space-y-6 text-sm font-semibold">
          <div className="space-y-2">
            <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">Financial Solutions</p>
            <div className="pl-3 space-y-2 text-slate-700 font-medium">
              <Link to="/financial-solutions/personal-loan" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 hover:text-blue-600">Personal Loan</Link>
              <Link to="/financial-solutions/home-loan" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 hover:text-blue-600">Home Loan</Link>
              <Link to="/financial-solutions/business-loan" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 hover:text-blue-600">Business Loan</Link>
              <Link to="/financial-solutions/msme-finance" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 hover:text-blue-600">MSME Finance</Link>
              <Link to="/financial-solutions/loan-against-property" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 hover:text-blue-600">Loan Against Property</Link>
              <Link to="/financial-solutions/working-capital" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 hover:text-blue-600">Working Capital</Link>
              <Link to="/financial-solutions/machinery-finance" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 hover:text-blue-600">Machinery Finance</Link>
              <Link to="/financial-solutions/commercial-vehicle-finance" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 hover:text-blue-600">Commercial Vehicle Finance</Link>
              <Link to="/financial-solutions/credit-card" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 hover:text-blue-600">Credit Cards</Link>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">Calculators & Tools</p>
            <div className="pl-3 space-y-2 text-slate-700 font-medium">
              <Link to="/calculators/emi" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 hover:text-blue-600">EMI Calculator</Link>
              <Link to="/calculators/loan-eligibility" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 hover:text-blue-600">FOIR Eligibility Estimator</Link>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">Ecosystem & Guides</p>
            <div className="pl-3 space-y-2 text-slate-700 font-medium">
              <Link to="/how-it-works" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 hover:text-blue-600">How It Works</Link>
              <Link to="/partners" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 hover:text-blue-600">Partners</Link>
              <Link to="/resources" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 hover:text-blue-600">Resources & Knowledge Hub</Link>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100">
            <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">Portal Logins</p>
            <div className="pl-3 space-y-2 text-slate-700 font-medium">
              <button
                onClick={() => { setIsMobileMenuOpen(false); setPersona('customer'); navigate('/customer/dashboard'); }}
                className="w-full text-left py-1 text-blue-600 font-bold flex items-center gap-2 cursor-pointer"
              >
                <User className="w-4 h-4" /> Borrower Customer Login
              </button>
              <button
                onClick={() => { setIsMobileMenuOpen(false); setPersona('dsa_partner'); navigate('/partner/dashboard'); }}
                className="w-full text-left py-1 text-emerald-600 font-bold flex items-center gap-2 cursor-pointer"
              >
                <Briefcase className="w-4 h-4" /> DSA Partner Login
              </button>
              <button
                onClick={() => { setIsMobileMenuOpen(false); setPersona('relationship_manager'); navigate('/crm/leads'); }}
                className="w-full text-left py-1 text-indigo-600 font-bold flex items-center gap-2 cursor-pointer"
              >
                <UserCheck className="w-4 h-4" /> Relationship Manager Login
              </button>
              <button
                onClick={() => { setIsMobileMenuOpen(false); setPersona('admin'); navigate('/crm/dashboard'); }}
                className="w-full text-left py-1 text-purple-600 font-bold flex items-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" /> Enterprise Admin Login
              </button>
            </div>
          </div>

          <div className="space-y-3 pt-2 border-t border-slate-100 text-slate-800">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block py-1.5 text-blue-600 font-bold">Home</Link>
            <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="block py-1.5 font-bold text-slate-900">About Us</Link>
            <Link to="/trust-center" onClick={() => setIsMobileMenuOpen(false)} className="block py-1.5 text-emerald-600 font-bold">Trust Center</Link>
            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="block py-1.5 hover:text-blue-600">Contact Us</Link>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-100">
            <Button className="w-full font-bold" variant="outline" onClick={() => { setIsMobileMenuOpen(false); navigate('/login'); }} leftIcon={<LogIn className="w-4 h-4 text-blue-600" />}>
              Login to Portal
            </Button>
            <Button className="w-full font-extrabold" variant="gradient" onClick={() => { setIsMobileMenuOpen(false); navigate('/check-eligibility'); }}>
              Check Eligibility
            </Button>
            <Button className="w-full" variant="outline" onClick={() => { setIsMobileMenuOpen(false); navigate('/partners/become-a-partner'); }}>
              Become a Partner
            </Button>
          </div>
        </div>
      </Drawer>

      {/* Main Page Body */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Global Footer */}
      <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-900 pt-20 pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            {/* Col 1: Brand Info */}
            <div className="lg:col-span-2 space-y-5">
              <div className="flex items-center gap-3 text-white">
                <div className="p-2.5 bg-blue-600 rounded-2xl">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-black tracking-tight">FINSERVE</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed max-w-sm font-normal">
                FinServe is India’s professional financial distribution and DSA technology platform. Connecting borrower applicants, partner DSAs, and institutional lenders under transparent, compliant standards.
              </p>
              <div className="pt-2 flex items-center gap-3 text-slate-300 font-semibold">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>ISO 27001 Security Standard Ready Architecture</span>
              </div>
            </div>

            {/* Col 2: Products */}
            <div className="space-y-3">
              <h5 className="font-extrabold uppercase text-white tracking-widest text-[11px]">Financial Solutions</h5>
              <ul className="space-y-2.5 font-medium">
                <li><Link to="/financial-solutions/personal-loan" className="hover:text-white transition-colors">Personal Loan</Link></li>
                <li><Link to="/financial-solutions/home-loan" className="hover:text-white transition-colors">Home Loan</Link></li>
                <li><Link to="/financial-solutions/business-loan" className="hover:text-white transition-colors">Business Loan</Link></li>
                <li><Link to="/financial-solutions/msme-finance" className="hover:text-white transition-colors">MSME Finance</Link></li>
                <li><Link to="/financial-solutions/loan-against-property" className="hover:text-white transition-colors">Loan Against Property</Link></li>
                <li><Link to="/financial-solutions/working-capital" className="hover:text-white transition-colors">Working Capital</Link></li>
              </ul>
            </div>

            {/* Col 3: Ecosystem */}
            <div className="space-y-3">
              <h5 className="font-extrabold uppercase text-white tracking-widest text-[11px]">Ecosystem & Tools</h5>
              <ul className="space-y-2.5 font-medium">
                <li><Link to="/partners" className="hover:text-white transition-colors">DSA Partner Program</Link></li>
                <li><Link to="/partners/become-a-partner" className="hover:text-white transition-colors">Partner Onboarding</Link></li>
                <li><Link to="/calculators/emi" className="hover:text-white transition-colors">EMI Calculator</Link></li>
                <li><Link to="/calculators/loan-eligibility" className="hover:text-white transition-colors">FOIR Eligibility Estimator</Link></li>
                <li><Link to="/how-it-works" className="hover:text-white transition-colors">Process Flow</Link></li>
                <li><Link to="/resources/blog" className="hover:text-white transition-colors">Knowledge Hub</Link></li>
              </ul>
            </div>

            {/* Col 4: Trust & Legal */}
            <div className="space-y-3">
              <h5 className="font-extrabold uppercase text-white tracking-widest text-[11px]">Trust & Governance</h5>
              <ul className="space-y-2.5 font-medium">
                <li><Link to="/trust-center" className="text-emerald-400 hover:underline">Trust Center</Link></li>
                <li><Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link to="/disclaimer" className="hover:text-white transition-colors">Disclaimer Notice</Link></li>
                <li><Link to="/grievance-redressal" className="hover:text-white transition-colors">Grievance Mechanism</Link></li>
                <li><Link to="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-10 border-t border-slate-900 text-[11px] text-slate-400 space-y-4">
            <p className="leading-relaxed">
              <strong>Regulatory Disclaimer:</strong> FinServe Platform operates as a loan distribution agent and marketplace facilitator. Eligibility, sanctions, interest rates, and loan terms are exclusively decided by partner lending institutions. All statistics, lender counts, testimonials, and financial claims are represented as configurable placeholders for demonstration.
            </p>
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-400 font-medium">
              <p>© 2026 FinServe Technologies Pvt Ltd. All rights reserved.</p>
              <div className="flex gap-4">
                <span>Built for Indian Financial Distribution</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <PersonaSwitcher />
    </div>
  );
};
