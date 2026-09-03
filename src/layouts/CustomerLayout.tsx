import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../app/providers/AuthContext';
import {
  LayoutDashboard,
  FileCheck,
  FolderOpen,
  MessageSquare,
  HelpCircle,
  Bell,
  User,
  LogOut,
  Building2,
  Menu,
  ChevronDown
} from 'lucide-react';
import { Drawer } from '../components/common/Drawer';

export const CustomerLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Dashboard', path: '/customer/dashboard', icon: LayoutDashboard },
    { label: 'My Applications', path: '/customer/applications', icon: FileCheck },
    { label: 'Document Center', path: '/customer/documents', icon: FolderOpen },
    { label: 'Messages', path: '/customer/messages', icon: MessageSquare },
    { label: 'Help & Support', path: '/customer/support', icon: HelpCircle },
    { label: 'My Profile', path: '/customer/profile', icon: User },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 font-sans text-slate-900">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-white border-r border-slate-800 shrink-0">
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-xl text-white">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-base font-extrabold tracking-tight block">Borrower Portal</span>
            <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase block">FinServe Network</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 text-xs font-semibold">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md font-bold'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Assigned RM Summary Box */}
        <div className="p-4 m-4 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-2 text-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Assigned Advisor</span>
          <p className="font-bold text-white">Vikram Malhotra</p>
          <p className="text-slate-400 text-[11px]">Senior Relationship Manager</p>
          <a href="tel:+919876500111" className="text-blue-400 text-[11px] hover:underline block font-semibold">+91 98765-00111</a>
        </div>
      </aside>

      {/* Main Right Content Section */}
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
              <h2 className="text-sm font-bold text-slate-900 hidden sm:block">Welcome, {user?.name}</h2>
              <span className="text-[11px] text-slate-500 block">Borrower Dashboard</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/customer/notifications"
              className="relative p-2.5 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            </Link>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                  RM
                </div>
                <ChevronDown className="w-4 h-4 text-slate-500 hidden sm:block" />
              </button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-fintech-lg border border-slate-200 p-2 space-y-1 text-xs font-semibold z-50">
                  <Link to="/customer/profile" className="block px-3 py-2 rounded-xl hover:bg-slate-100">My Profile</Link>
                  <Link to="/customer/support" className="block px-3 py-2 rounded-xl hover:bg-slate-100">Support Desk</Link>
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

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      {/* Mobile Drawer Menu */}
      <Drawer isOpen={isMobileDrawerOpen} onClose={() => setIsMobileDrawerOpen(false)} title="Customer Navigation">
        <nav className="space-y-2 text-sm font-semibold">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileDrawerOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 text-slate-700"
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
          to="/customer/dashboard"
          className={`flex flex-col items-center gap-1 text-[10px] font-semibold p-1 ${
            location.pathname === '/customer/dashboard' ? 'text-blue-600' : 'text-slate-500'
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span>Home</span>
        </Link>
        <Link
          to="/customer/applications"
          className={`flex flex-col items-center gap-1 text-[10px] font-semibold p-1 ${
            location.pathname.startsWith('/customer/applications') ? 'text-blue-600' : 'text-slate-500'
          }`}
        >
          <FileCheck className="w-5 h-5" />
          <span>Tracker</span>
        </Link>
        <Link
          to="/customer/documents"
          className={`flex flex-col items-center gap-1 text-[10px] font-semibold p-1 ${
            location.pathname === '/customer/documents' ? 'text-blue-600' : 'text-slate-500'
          }`}
        >
          <FolderOpen className="w-5 h-5" />
          <span>Docs</span>
        </Link>
        <Link
          to="/customer/notifications"
          className={`flex flex-col items-center gap-1 text-[10px] font-semibold p-1 ${
            location.pathname === '/customer/notifications' ? 'text-blue-600' : 'text-slate-500'
          }`}
        >
          <Bell className="w-5 h-5" />
          <span>Notifs</span>
        </Link>
        <Link
          to="/customer/profile"
          className={`flex flex-col items-center gap-1 text-[10px] font-semibold p-1 ${
            location.pathname === '/customer/profile' ? 'text-blue-600' : 'text-slate-500'
          }`}
        >
          <User className="w-5 h-5" />
          <span>Profile</span>
        </Link>
      </nav>
    </div>
  );
};
