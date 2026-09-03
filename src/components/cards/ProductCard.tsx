import React from 'react';
import type { LoanProduct } from '../../types/product';
import * as Icons from 'lucide-react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '../common/Button';
import { useNavigate } from 'react-router-dom';

export const ProductCard: React.FC<{ product: LoanProduct }> = ({ product }) => {
  const navigate = useNavigate();

  // Dynamic Lucide icon lookup
  const IconComponent = (Icons as unknown as Record<string, React.FC<{ className?: string }>>)[product.iconName] || Icons.HelpCircle;

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-fintech hover:shadow-2xl hover:border-blue-500/30 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
      {/* Top subtle highlight gradient */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50/80 text-blue-600 rounded-2xl border border-blue-100 group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300 shadow-xs">
            <IconComponent className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200/60">
            {product.category}
          </span>
        </div>

        <div>
          <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight">
            {product.name}
          </h3>
          <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed font-normal">
            {product.shortDescription}
          </p>
        </div>

        {product.keyBenefits.length > 0 && (
          <div className="space-y-2 pt-3 border-t border-slate-100 text-xs text-slate-700">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span className="font-semibold text-slate-800">{product.keyBenefits[0]}</span>
            </div>
            {product.keyBenefits[1] && (
              <div className="flex items-start gap-2 text-slate-600">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-slate-600">{product.keyBenefits[1]}</span>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="pt-6">
        <Button
          variant="outline"
          size="sm"
          className="w-full justify-between group-hover:border-blue-600 group-hover:bg-blue-50/50 group-hover:text-blue-700 font-bold"
          rightIcon={<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
          onClick={() => navigate(`/financial-solutions/${product.slug}`)}
        >
          Explore Solution
        </Button>
      </div>
    </div>
  );
};
