import React from 'react';

export const LegalPage: React.FC<{ type: 'privacy' | 'terms' | 'disclaimer' | 'grievance' | 'cookie' }> = ({ type }) => {
  const titles = {
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    disclaimer: 'Financial Disclaimer & Disclosure Notice',
    grievance: 'Grievance Redressal Policy',
    cookie: 'Cookie Policy'
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <h1 className="text-3xl font-extrabold text-slate-900">{titles[type]}</h1>
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-fintech text-xs text-slate-700 leading-relaxed space-y-4">
        <p>
          <strong>Effective Date:</strong> January 1, 2026
        </p>
        <p>
          This document establishes the official regulatory compliance standards for FinServe Platform. As a digital loan distribution facilitator, we comply with relevant guidelines published by the Reserve Bank of India (RBI) regarding digital lending transparency and partner disclosures.
        </p>
        {type === 'grievance' && (
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <p className="font-bold text-slate-900">Nodal Grievance Redressal Officer</p>
            <p>Name: Mr. Alok Kumar Verma</p>
            <p>Email: grievance@finserve-dsa.example.com</p>
            <p>Address: FinServe Towers, BKC, Mumbai 400051</p>
          </div>
        )}
      </div>
    </div>
  );
};
