import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../app/providers/AuthContext';
import {
  LayoutDashboard,
  Users,
  FileText,
  UserCheck,
  Building2,
  Package,
  FolderOpen,
  Wallet,
  BarChart3,
  CheckSquare,
  HelpCircle,
  ShieldAlert,
  Bell,
  Settings,
  History,
  Search,
  Menu,
  ChevronDown,
  LogOut
} from 'lucide-react';
import { Input } from '../components/common/Input';
import { Drawer } from '../components/common/Drawer';
import { PersonaSwitcher } from '../components/common/PersonaSwitcher';

export const CRMLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');

  const crmNavItems = [
    { label: 'CRM Dashboard', path: '/crm/dashboard', icon: LayoutDashboard },
    { label: 'Lead Operations', path: '/crm/leads', icon: Users },
    { label: 'Loan Pipeline', path: '/crm/applications', icon: FileText },
    { label: 'Borrowers', path: '/crm/customers', icon: UserCheck },
    { label: 'DSA Partners', path: '/crm/partners', icon: Building2 },
    { label: 'Lender Network', path: '/crm/lenders', icon: Package },
    { label: 'Product CMS', path: '/crm/products', icon: Package },
    { label: 'Document Review', path: '/crm/documents', icon: FolderOpen },
    { label: 'Payout Engine', path: '/crm/payouts', icon: Wallet },
    { label: 'Analytics & Reports', path: '/crm/reports', icon: BarChart3 },
    { label: 'RM Follow-up Tasks', path: '/crm/tasks', icon: CheckSquare },
    { label: 'Support & Tickets', path: '/crm/support', icon: HelpCircle },
    { label: 'Grievances', path: '/crm/grievances', icon: ShieldAlert },
    { label: 'Notifications', path: '/crm/notifications', icon: Bell },
    { label: 'Audit Logs', path: '/crm/audit-logs', icon: History },
    { label: 'CRM Settings', path: '/crm/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-100 font-sans text-slate-900">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-white border-r border-slate-800 shrink-0">
        <div className="p-5 border-b border-slate-800 flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-xl text-white">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-sm font-extrabold tracking-tight block">FINSERVE CRM</span>
            <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider block">Enterprise Suite</span>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1 text-xs font-semibold overflow-y-auto max-h-[calc(100vh-140px)]">
          {crmNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || (item.path !== '/crm/dashboard' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md font-bold'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <button
              onClick={() => setIsMobileDrawerOpen(true)}
              className="md:hidden p-2 text-slate-600 rounded-xl hover:bg-slate-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Global Search Bar (Requirement 53) */}
            <div className="hidden sm:block w-full">
              <Input
                placeholder="Global CRM search (Lead ID, Name, PAN)..."
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                leftIcon={<Search className="w-4 h-4 text-slate-400" />}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/crm/notifications"
              className="relative p-2.5 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            </Link>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold text-xs">
                  RM
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-xs font-bold text-slate-900 leading-none">{user?.name}</p>
                  <p className="text-[10px] text-slate-500 font-semibold uppercase">{user?.role}</p>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-500" />
              </button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-fintech-lg border border-slate-200 p-2 space-y-1 text-xs font-semibold z-50">
                  <Link to="/crm/settings" className="block px-3 py-2 rounded-xl hover:bg-slate-100">CRM Settings</Link>
                  <Link to="/crm/audit-logs" className="block px-3 py-2 rounded-xl hover:bg-slate-100">Security Audit Logs</Link>
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

        {/* CRM Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto">
          <Outlet />
        </main>
      </div>

      {/* Mobile Drawer Menu */}
      <Drawer isOpen={isMobileDrawerOpen} onClose={() => setIsMobileDrawerOpen(false)} title="CRM Admin Menu" position="left">
        <nav className="space-y-1 text-xs font-semibold">
          {crmNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileDrawerOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-blue-50 hover:text-blue-600 text-slate-700"
              >
                <Icon className="w-4 h-4 text-slate-500" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </Drawer>
      <PersonaSwitcher />
    </div>
  );
};
