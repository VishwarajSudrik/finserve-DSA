import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Building2, ShieldCheck } from 'lucide-react';

export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-between p-4 sm:p-6 text-white font-sans">
      <div className="max-w-md w-full mx-auto flex justify-between items-center py-4">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="p-2 bg-blue-600 rounded-xl text-white">
            <Building2 className="w-5 h-5" />
          </div>
          <span className="text-lg font-bold tracking-tight">FINSERVE</span>
        </Link>
        <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
          <ShieldCheck className="w-4 h-4" /> 256-Bit SSL Demo
        </span>
      </div>

      <div className="w-full max-w-md mx-auto my-auto py-8">
        <Outlet />
      </div>

      <div className="text-center text-xs text-slate-500 py-4">
        <p>© 2026 FinServe Technologies. Frontend Demo Architecture.</p>
      </div>
    </div>
  );
};
