import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../app/providers/AuthContext';
import type { UserRole } from '../../types/user';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { ArrowRight } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('customer');
  const [email, setEmail] = useState('rahul.mehta.demo@example.com');
  const [password, setPassword] = useState('••••••••••••');

  const { setPersona } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setPersona(selectedRole);

    switch (selectedRole) {
      case 'customer':
        navigate('/customer/dashboard');
        break;
      case 'dsa_partner':
        navigate('/partner/dashboard');
        break;
      default:
        navigate('/crm/dashboard');
        break;
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 text-slate-900 shadow-2xl border border-slate-200 space-y-6">
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-black text-slate-900">Sign In to FinServe</h2>
        <p className="text-xs text-slate-500">Frontend Demo Persona Authentication</p>
      </div>

      {/* Role Persona Selectors */}
      <div className="grid grid-cols-3 gap-2 p-1 bg-slate-100 rounded-2xl text-xs font-semibold">
        <button
          type="button"
          onClick={() => { setSelectedRole('customer'); setEmail('rahul.mehta.demo@example.com'); }}
          className={`py-2 px-3 rounded-xl transition-all ${selectedRole === 'customer' ? 'bg-white text-blue-600 shadow-xs font-bold' : 'text-slate-600'}`}
        >
          Customer
        </button>
        <button
          type="button"
          onClick={() => { setSelectedRole('dsa_partner'); setEmail('rajesh.singhania.demo@example.com'); }}
          className={`py-2 px-3 rounded-xl transition-all ${selectedRole === 'dsa_partner' ? 'bg-white text-emerald-600 shadow-xs font-bold' : 'text-slate-600'}`}
        >
          DSA Partner
        </button>
        <button
          type="button"
          onClick={() => { setSelectedRole('admin'); setEmail('admin@finserve-dsa.example.com'); }}
          className={`py-2 px-3 rounded-xl transition-all ${selectedRole === 'admin' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600'}`}
        >
          CRM / Admin
        </button>
      </div>

      <form onSubmit={handleLogin} className="space-y-4 text-xs">
        <Input label="Email / Identity" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <div className="flex justify-between items-center text-xs">
          <Link to="/forgot-password" className="text-blue-600 hover:underline">Forgot password?</Link>
        </div>

        <Button type="submit" className="w-full font-bold" rightIcon={<ArrowRight className="w-4 h-4" />}>
          Login as {selectedRole.toUpperCase().replace(/_/g, ' ')}
        </Button>
      </form>
    </div>
  );
};

export const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-3xl p-8 text-slate-900 shadow-2xl space-y-4">
      <h2 className="text-2xl font-bold">Reset Password</h2>
      <Input label="Registered Mobile or Email" placeholder="Enter mobile or email" />
      <Button className="w-full" onClick={() => navigate('/verify-otp')}>Send OTP</Button>
    </div>
  );
};

export const VerifyOtpPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-3xl p-8 text-slate-900 shadow-2xl space-y-4">
      <h2 className="text-2xl font-bold">Verify OTP</h2>
      <Input label="6-Digit OTP Code" placeholder="e.g. 123456" />
      <Button className="w-full" onClick={() => navigate('/reset-password')}>Verify OTP</Button>
    </div>
  );
};

export const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-3xl p-8 text-slate-900 shadow-2xl space-y-4">
      <h2 className="text-2xl font-bold">Create New Password</h2>
      <Input label="New Password" type="password" />
      <Input label="Confirm New Password" type="password" />
      <Button className="w-full" onClick={() => navigate('/login')}>Update Password</Button>
    </div>
  );
};
