import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { FileQuestion, Home, Compass, ShieldAlert } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-6">
      <div className="p-5 bg-blue-50 text-blue-600 rounded-3xl">
        <FileQuestion className="w-16 h-16" />
      </div>
      <div className="space-y-2 max-w-md">
        <h1 className="text-4xl font-black text-slate-900">404 - Page Not Found</h1>
        <p className="text-xs sm:text-sm text-slate-600">
          The financial route or resource you requested does not exist or has been relocated.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Button variant="primary" leftIcon={<Home className="w-4 h-4" />} onClick={() => navigate('/')}>
          Go Home
        </Button>
        <Button variant="outline" leftIcon={<Compass className="w-4 h-4" />} onClick={() => navigate('/financial-solutions')}>
          Explore Financial Solutions
        </Button>
      </div>
    </div>
  );
};

export const ForbiddenPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-6">
      <div className="p-5 bg-red-50 text-red-600 rounded-3xl">
        <ShieldAlert className="w-16 h-16" />
      </div>
      <div className="space-y-2 max-w-md">
        <h1 className="text-3xl font-black text-slate-900">403 - Permission Denied</h1>
        <p className="text-xs sm:text-sm text-slate-600">
          You don't have permission to view this page under your current demo persona role.
        </p>
      </div>

      <Button variant="primary" onClick={() => navigate('/')}>
        Return to Dashboard
      </Button>
    </div>
  );
};
