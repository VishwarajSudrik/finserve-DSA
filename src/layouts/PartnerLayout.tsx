import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../app/providers/AuthContext';
import {
  LayoutDashboard,
  Users,
  FileCheck,
  Wallet,
  Building,
  BarChart3,
  HelpCircle,
  Plus,
  Bell,
  User,
  LogOut,
  Building2,
  Menu,
  ChevronDown
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Drawer } from '../components/common/Drawer';

export const PartnerLayout: React.FC = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Dashboard', path: '/partner/dashboard', icon: LayoutDashboard },
    { label: 'Lead Management', path: '/partner/leads', icon: Users },
    { label: 'Applications Pipeline', path: '/partner/applications', icon: FileCheck },
    { label: 'Payouts & Commission', path: '/partner/payouts', icon: Wallet },
    { label: 'Products Catalog', path: '/partner/products', icon: Building },
    { label: 'Lender Network', path: '/partner/lenders', icon: Building2 },
    { label: 'Reports & Export', path: '/partner/reports', icon: BarChart3 },
    { label: 'Partner Support', path: '/partner/support', icon: HelpCircle },
    { label: 'Partner Profile', path: '/partner/profile', icon: User },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 font-sans text-slate-900">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-white border-r border-slate-800 shrink-0">
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="p-2 bg-emerald-600 rounded-xl text-white">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-base font-extrabold tracking-tight block">DSA Partner Portal</span>
            <span className="text-[10px] text-emerald-400 font-semibold tracking-wider uppercase block">Code: DSA-2026-081</span>
          </div>
        </div>

        {/* Quick Lead Button */}
        <div className="p-4">
          <Button
            className="w-full justify-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => navigate('/partner/leads?action=add')}
          >
            Add New Lead
          </Button>
        </div>

        <nav className="flex-1 px-4 space-y-1 text-xs font-semibold overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md font-bold'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Payout Summary Widget */}
        <div className="p-4 m-4 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-1.5 text-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Expected Payout</span>
          <p className="text-xl font-black text-emerald-400">₹30,875</p>
          <p className="text-[11px] text-slate-400">Next Payout Cycle: 10th Mar</p>
        </div>
      </aside>

      {/* Main Right Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 md:pb-0">
        {/* Top Navbar */}
        <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileDrawerOpen(true)}
              className="md:hidden p-2 text-slate-600 rounded-xl hover:bg-slate-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h2 className="text-sm font-bold text-slate-900 hidden sm:block">Apex Financial Services (DSA Partner)</h2>
              <span className="text-[11px] text-slate-500 block">DSA Partner CRM Dashboard</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              size="sm"
              variant="success"
              className="md:hidden"
              leftIcon={<Plus className="w-3.5 h-3.5" />}
              onClick={() => navigate('/partner/leads?action=add')}
            >
              Lead
            </Button>

            <Link
              to="/partner/notifications"
              className="relative p-2.5 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            </Link>

            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                  AP
                </div>
                <ChevronDown className="w-4 h-4 text-slate-500 hidden sm:block" />
              </button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-fintech-lg border border-slate-200 p-2 space-y-1 text-xs font-semibold z-50">
                  <Link to="/partner/profile" className="block px-3 py-2 rounded-xl hover:bg-slate-100">Partner Profile</Link>
                  <Link to="/partner/payouts" className="block px-3 py-2 rounded-xl hover:bg-slate-100">Payout Statements</Link>
                  <button
                    onClick={() => {
                      logout();
                      navigate('/');
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <LogOut className="w-3.5 h-3.5" /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      {/* Mobile Drawer Menu */}
      <Drawer isOpen={isMobileDrawerOpen} onClose={() => setIsMobileDrawerOpen(false)} title="Partner Workspace" position="left">
        <nav className="space-y-2 text-sm font-semibold">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileDrawerOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-emerald-50 hover:text-emerald-700 text-slate-700"
              >
                <Icon className="w-5 h-5 text-slate-500" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </Drawer>

      {/* Mobile Bottom Navigation Bar (Requirement 64) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 flex items-center justify-around py-2 px-2 shadow-lg">
        <Link
          to="/partner/dashboard"
          className={`flex flex-col items-center gap-1 text-[10px] font-semibold p-1 ${
            location.pathname === '/partner/dashboard' ? 'text-emerald-600' : 'text-slate-500'
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span>Dash</span>
        </Link>
        <Link
          to="/partner/leads"
          className={`flex flex-col items-center gap-1 text-[10px] font-semibold p-1 ${
            location.pathname.startsWith('/partner/leads') ? 'text-emerald-600' : 'text-slate-500'
          }`}
        >
          <Users className="w-5 h-5" />
          <span>Leads</span>
        </Link>
        <Link
          to="/partner/applications"
          className={`flex flex-col items-center gap-1 text-[10px] font-semibold p-1 ${
            location.pathname.startsWith('/partner/applications') ? 'text-emerald-600' : 'text-slate-500'
          }`}
        >
          <FileCheck className="w-5 h-5" />
          <span>Pipeline</span>
        </Link>
        <Link
          to="/partner/payouts"
          className={`flex flex-col items-center gap-1 text-[10px] font-semibold p-1 ${
            location.pathname === '/partner/payouts' ? 'text-emerald-600' : 'text-slate-500'
          }`}
        >
          <Wallet className="w-5 h-5" />
          <span>Payouts</span>
        </Link>
        <Link
          to="/partner/profile"
          className={`flex flex-col items-center gap-1 text-[10px] font-semibold p-1 ${
            location.pathname === '/partner/profile' ? 'text-emerald-600' : 'text-slate-500'
          }`}
        >
          <User className="w-5 h-5" />
          <span>Profile</span>
        </Link>
      </nav>
    </div>
  );
};
