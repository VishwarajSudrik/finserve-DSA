import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { partnerService } from '../../services/partnerService';
import { useToast } from '../../app/providers/ToastContext';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { Modal } from '../../components/common/Modal';
import { useNavigate } from 'react-router-dom';

const partnerRegisterSchema = z.object({
  fullName: z.string().min(3, 'Full name is required'),
  mobile: z.string().regex(/^[6-9]\d{9}$/, 'Enter valid 10-digit mobile number'),
  email: z.string().email('Enter valid email'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  profession: z.string().min(2, 'Profession is required'),
  businessType: z.enum(['individual', 'proprietorship', 'partnership', 'pvtltd', 'nbfc_agent']),
  businessName: z.string().optional(),
  existingDsaStatus: z.boolean(),
  panMasked: z.string().length(10, 'Enter 10-character PAN number'),
  productsInterested: z.array(z.string()).min(1, 'Select at least one product category')
});

type FormValues = z.infer<typeof partnerRegisterSchema>;

export const PartnerRegisterPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [formDataCache, setFormDataCache] = useState<FormValues | null>(null);

  const { showToast } = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(partnerRegisterSchema),
    defaultValues: {
      fullName: '',
      mobile: '',
      email: '',
      city: 'Mumbai',
      state: 'Maharashtra',
      profession: 'Financial Consultant',
      businessType: 'proprietorship',
      businessName: '',
      existingDsaStatus: true,
      panMasked: 'ABCDE1234F',
      productsInterested: ['Personal Loan', 'Home Loan', 'Business Loan']
    }
  });

  const selectedProducts = watch('productsInterested') || [];

  const handleProductToggle = (prodName: string) => {
    if (selectedProducts.includes(prodName)) {
      setValue('productsInterested', selectedProducts.filter((p) => p !== prodName));
    } else {
      setValue('productsInterested', [...selectedProducts, prodName]);
    }
  };

  const onOpenReview = (data: FormValues) => {
    setFormDataCache(data);
    setShowReviewModal(true);
  };

  const onFinalSubmit = async () => {
    if (!formDataCache) return;
    setIsSubmitting(true);
    try {
      const res = await partnerService.registerPartner(formDataCache);
      showToast('Partner Application Submitted!', `Application code ${res.partnerCode} received. Under verification.`, 'success');
      setShowReviewModal(false);
      navigate('/partner/dashboard');
    } catch {
      showToast('Submission Failed', 'Something went wrong. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900">DSA Partner Onboarding Application</h1>
        <p className="text-xs text-slate-500">Provide personal, business, and location details for partner verification</p>
      </div>

      <form onSubmit={handleSubmit(onOpenReview)} className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-fintech space-y-6">
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">1. Personal & Contact Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Full Name" placeholder="Full Legal Name" error={errors.fullName?.message} {...register('fullName')} />
            <Input label="Mobile Number" placeholder="10-digit mobile" error={errors.mobile?.message} {...register('mobile')} />
            <Input label="Email Address" type="email" placeholder="email@example.com" error={errors.email?.message} {...register('email')} />
            <Input label="PAN Card Number" placeholder="10-character PAN" error={errors.panMasked?.message} {...register('panMasked')} />
          </div>
        </div>

        <div className="space-y-4 pt-4">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">2. Professional & Business Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Profession / Designation" placeholder="e.g. Financial Advisory" error={errors.profession?.message} {...register('profession')} />
            <Select
              label="Business Entity Type"
              options={[
                { label: 'Individual / Proprietorship', value: 'individual' },
                { label: 'Sole Proprietorship Firm', value: 'proprietorship' },
                { label: 'Partnership Firm', value: 'partnership' },
                { label: 'Private Limited Company', value: 'pvtltd' },
                { label: 'NBFC Agent / Corporate Sub-DSA', value: 'nbfc_agent' }
              ]}
              {...register('businessType')}
            />
            <div className="sm:col-span-2">
              <Input label="Business / Agency Name (Optional)" placeholder="e.g. Apex Wealth Solutions" {...register('businessName')} />
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">3. Location Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Operating City" placeholder="e.g. Mumbai" error={errors.city?.message} {...register('city')} />
            <Input label="State" placeholder="e.g. Maharashtra" error={errors.state?.message} {...register('state')} />
          </div>
        </div>

        <div className="space-y-3 pt-4">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">4. Products Interested in Distributing</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {['Personal Loan', 'Home Loan', 'Business Loan', 'MSME Finance', 'Loan Against Property', 'Working Capital', 'Machinery Finance', 'Commercial Vehicle Finance', 'Credit Card'].map((prod) => {
              const isChecked = selectedProducts.includes(prod);
              return (
                <div
                  key={prod}
                  onClick={() => handleProductToggle(prod)}
                  className={`p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-colors ${
                    isChecked ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold' : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {prod}
                </div>
              );
            })}
          </div>
          {errors.productsInterested && <p className="text-xs text-red-600">{errors.productsInterested.message}</p>}
        </div>

        <Button type="submit" size="lg" variant="success" className="w-full font-bold">
          Review Application & Submit
        </Button>
      </form>

      {/* Review Modal before submission */}
      <Modal isOpen={showReviewModal} onClose={() => setShowReviewModal(false)} title="Review Partner Registration Details">
        {formDataCache && (
          <div className="space-y-4 text-xs">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <p><strong>Name:</strong> {formDataCache.fullName}</p>
              <p><strong>Mobile:</strong> {formDataCache.mobile}</p>
              <p><strong>Email:</strong> {formDataCache.email}</p>
              <p><strong>Location:</strong> {formDataCache.city}, {formDataCache.state}</p>
              <p><strong>Entity:</strong> {formDataCache.businessName || formDataCache.fullName} ({formDataCache.businessType})</p>
              <p><strong>PAN:</strong> {formDataCache.panMasked}</p>
              <p><strong>Products:</strong> {formDataCache.productsInterested.join(', ')}</p>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" onClick={() => setShowReviewModal(false)}>
                Edit Details
              </Button>
              <Button variant="success" isLoading={isSubmitting} onClick={onFinalSubmit}>
                Confirm & Submit Application
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
