import React, { useEffect, useState } from 'react';
import { lenderService } from '../../services/payoutService';
import { productService } from '../../services/productService';
import type { LenderPartner } from '../../types/lender';
import type { LoanProduct } from '../../types/product';
import { Badge } from '../../components/common/Badge';
import { Skeleton } from '../../components/common/Skeleton';
import { Building2, Package } from 'lucide-react';

export const PartnerLendersPage: React.FC = () => {
  const [lenders, setLenders] = useState<LenderPartner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    lenderService.getLenders().then((res) => {
      setLenders(res);
      setLoading(false);
    });
  }, []);

  if (loading) return <Skeleton className="h-64 w-full" />;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Partner Lender Network</h1>
        <p className="text-xs text-slate-500">Generic mock institutional bank and NBFC relationships</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {lenders.map((lnd) => (
          <div key={lnd.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-fintech space-y-4">
            <div className="flex justify-between items-start">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                <Building2 className="w-6 h-6" />
              </div>
              <Badge status={lnd.status} />
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900">{lnd.name}</h3>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">{lnd.type} • TAT: {lnd.avgTurnaroundDays} Days</p>
            </div>

            <div className="text-xs space-y-1 pt-2 border-t border-slate-100 text-slate-600">
              <p>Products: <strong>{lnd.productsCovered.join(', ')}</strong></p>
              <p>Min CIBIL: <strong>{lnd.minCibilScore}</strong></p>
              <p>Max LTV: <strong>{lnd.maxLTV}</strong></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const PartnerProductsPage: React.FC = () => {
  const [prods, setProds] = useState<LoanProduct[]>([]);

  useEffect(() => {
    productService.getProducts().then(setProds);
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Partner Product Catalog</h1>
        <p className="text-xs text-slate-500">Distribution eligibility and commission terms</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {prods.map((p) => (
          <div key={p.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-fintech space-y-3">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl w-fit">
              <Package className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">{p.name}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">{p.shortDescription}</p>
            <div className="pt-2 border-t border-slate-100 text-xs font-semibold text-slate-700">
              <p>Commission payout: <strong>0.50% - 1.50%</strong></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
