import React, { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../app/providers/AuthContext';
import type { UserRole } from '../../types/user';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { ArrowRight, ArrowLeft, User, Briefcase, UserCheck, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useToast } from '../../app/providers/ToastContext';

export const LoginPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialRole = (searchParams.get('role') as UserRole) || 'customer';

  const [selectedRole, setSelectedRole] = useState<UserRole>(initialRole);
  const [email, setEmail] = useState('rahul.mehta.demo@example.com');
  const [password, setPassword] = useState('••••••••••••');
  const [isLoading, setIsLoading] = useState(false);

  const { setPersona } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const roleConfigs: Record<UserRole, {
    title: string;
    defaultEmail: string;
    defaultName: string;
    redirectPath: string;
    badgeColor: string;
  }> = {
    customer: {
      title: 'Borrower Customer Portal',
      defaultEmail: 'rahul.mehta.demo@example.com',
      defaultName: 'CUSTOMER LOGIN',
      redirectPath: '/customer/dashboard',
      badgeColor: 'bg-blue-600 text-white'
    },
    dsa_partner: {
      title: 'DSA Partner Portal',
      defaultEmail: 'rajesh.singhania.demo@example.com',
      defaultName: 'DSA PARTNER LOGIN',
      redirectPath: '/partner/dashboard',
      badgeColor: 'bg-emerald-600 text-white'
    },
    relationship_manager: {
      title: 'Relationship Manager Desk',
      defaultEmail: 'vikram.rm@finserve-dsa.example.com',
      defaultName: 'RM LOGIN',
      redirectPath: '/crm/leads',
      badgeColor: 'bg-indigo-600 text-white'
    },
    admin: {
      title: 'Enterprise Admin Suite',
      defaultEmail: 'admin@finserve-dsa.example.com',
      defaultName: 'Enterprise Admin',
      redirectPath: '/crm/dashboard',
      badgeColor: 'bg-purple-600 text-white'
    },
    super_admin: {
      title: 'Super Admin Suite',
      defaultEmail: 'superadmin@finserve-dsa.example.com',
      defaultName: 'Super Admin',
      redirectPath: '/crm/dashboard',
      badgeColor: 'bg-purple-700 text-white'
    },
    sales_manager: {
      title: 'Sales Desk',
      defaultEmail: 'sales@finserve-dsa.example.com',
      defaultName: 'Sales Lead',
      redirectPath: '/crm/leads',
      badgeColor: 'bg-indigo-600 text-white'
    },
    operations: {
      title: 'Operations Desk',
      defaultEmail: 'ops@finserve-dsa.example.com',
      defaultName: 'Ops Executive',
      redirectPath: '/crm/leads',
      badgeColor: 'bg-indigo-600 text-white'
    },
    credit_executive: {
      title: 'Credit Underwriting',
      defaultEmail: 'credit@finserve-dsa.example.com',
      defaultName: 'Credit Officer',
      redirectPath: '/crm/leads',
      badgeColor: 'bg-indigo-600 text-white'
    },
    partner_manager: {
      title: 'Partner Desk',
      defaultEmail: 'pm@finserve-dsa.example.com',
      defaultName: 'Partner Desk Lead',
      redirectPath: '/crm/partners',
      badgeColor: 'bg-emerald-600 text-white'
    },
    finance: {
      title: 'Finance Lead',
      defaultEmail: 'finance@finserve-dsa.example.com',
      defaultName: 'Finance Lead',
      redirectPath: '/crm/payouts',
      badgeColor: 'bg-emerald-600 text-white'
    },
    support: {
      title: 'Support Desk',
      defaultEmail: 'support@finserve-dsa.example.com',
      defaultName: 'Support Agent',
      redirectPath: '/crm/tasks',
      badgeColor: 'bg-blue-600 text-white'
    }
  };

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setEmail(roleConfigs[role]?.defaultEmail || 'user@example.com');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setPersona(selectedRole);
      const config = roleConfigs[selectedRole] || roleConfigs.customer;
      showToast(`Authenticated as ${config.defaultName}`, 'success');
      navigate(config.redirectPath);
    }, 350);
  };

  const activeConfig = roleConfigs[selectedRole] || roleConfigs.customer;

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 text-slate-900 shadow-2xl border border-slate-200 space-y-4 max-w-md w-full mx-auto my-auto">
      {/* Back Button & Top Header Bar */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100 uppercase tracking-wider">
          Single Sign-On
        </span>
      </div>

      <div className="text-center space-y-0.5">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Sign In to FinServe</h2>
        <p className="text-xs text-slate-500">Select your portal role to authenticate</p>
      </div>

      {/* Compact 4 Dedicated Portal Role Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 bg-slate-100 rounded-2xl text-[11px] font-extrabold">
        {[
          { role: 'customer' as UserRole, label: 'Borrower', icon: User },
          { role: 'dsa_partner' as UserRole, label: 'Partner', icon: Briefcase },
          { role: 'relationship_manager' as UserRole, label: 'RM Desk', icon: UserCheck },
          { role: 'admin' as UserRole, label: 'Admin', icon: ShieldCheck },
        ].map((tab) => {
          const TabIcon = tab.icon;
          const isSelected = selectedRole === tab.role;
          return (
            <button
              key={tab.role}
              type="button"
              onClick={() => handleRoleSelect(tab.role)}
              className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 py-2 px-2 rounded-xl text-[11px] font-extrabold transition-all cursor-pointer ${
                isSelected
                  ? 'bg-white text-blue-600 shadow-md border border-slate-200/80 font-black'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <TabIcon className="w-3.5 h-3.5 shrink-0" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Sleek 1-Line Persona Badge Indicator */}
      <div className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs">
        <div className="flex items-center gap-2 truncate">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          <span className="font-bold text-slate-800 text-xs truncate">{activeConfig.defaultName}</span>
        </div>
        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md shrink-0 ${activeConfig.badgeColor}`}>
          {selectedRole.toUpperCase().replace(/_/g, ' ')}
        </span>
      </div>

      {/* Compact Login Form */}
      <form onSubmit={handleLogin} className="space-y-3 text-xs">
        <Input
          label="Registered Email / User ID"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex justify-between items-center text-xs pt-1">
          <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
            <input type="checkbox" defaultChecked className="rounded text-blue-600" />
            <span>Remember me</span>
          </label>
          <Link to="/forgot-password" className="text-blue-600 hover:underline font-semibold">
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          variant="gradient"
          size="lg"
          className="w-full font-extrabold text-sm shadow-lg mt-2"
          isLoading={isLoading}
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          Sign In to {selectedRole.toUpperCase().replace(/_/g, ' ')}
        </Button>
      </form>
    </div>
  );
};

export const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-3xl p-6 text-slate-900 shadow-2xl max-w-md mx-auto space-y-4 border border-slate-200">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <Link to="/login" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600">
          <ArrowLeft className="w-4 h-4" /> Back to Login
        </Link>
      </div>
      <h2 className="text-xl font-bold">Reset Password</h2>
      <p className="text-xs text-slate-500">Enter registered mobile or email to receive password reset OTP</p>
      <Input label="Registered Mobile or Email" placeholder="Enter mobile or email" />
      <Button className="w-full font-bold" variant="gradient" onClick={() => navigate('/verify-otp')}>Send OTP</Button>
    </div>
  );
};

export const VerifyOtpPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-3xl p-6 text-slate-900 shadow-2xl max-w-md mx-auto space-y-4 border border-slate-200">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <Link to="/forgot-password" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
      </div>
      <h2 className="text-xl font-bold">Verify OTP</h2>
      <p className="text-xs text-slate-500">Enter the 6-digit verification code sent to your registered mobile</p>
      <Input label="6-Digit OTP Code" placeholder="e.g. 123456" />
      <Button className="w-full font-bold" variant="gradient" onClick={() => navigate('/reset-password')}>Verify OTP</Button>
    </div>
  );
};

export const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-3xl p-6 text-slate-900 shadow-2xl max-w-md mx-auto space-y-4 border border-slate-200">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <Link to="/login" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600">
          <ArrowLeft className="w-4 h-4" /> Back to Login
        </Link>
      </div>
      <h2 className="text-xl font-bold">Create New Password</h2>
      <Input label="New Password" type="password" />
      <Input label="Confirm New Password" type="password" />
      <Button className="w-full font-bold" variant="gradient" onClick={() => navigate('/login')}>Update Password</Button>
    </div>
  );
};
