import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { LOAN_PRODUCTS } from '../../config/products';
import { calculateEligibility } from '../../utils/calculators';
import { formatINR } from '../../utils/formatters';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { Badge } from '../../components/common/Badge';
import { DisclaimerBanner } from '../../components/common/DisclaimerBanner';
import { ArrowRight, ArrowLeft, CheckCircle2, Building2, Download } from 'lucide-react';
import { useToast } from '../../app/providers/ToastContext';

const eligibilityFormSchema = z.object({
  productSlug: z.string().min(1, 'Please select a product'),
  employmentType: z.enum(['salaried', 'self_employed', 'business_owner', 'professional', 'other']),
  loanAmount: z.number().min(10000, 'Minimum loan requirement is ₹10,000'),
  monthlyIncome: z.number().min(10000, 'Monthly income must be at least ₹10,000'),
  existingEmi: z.number().min(0, 'Existing EMI cannot be negative'),
  creditScoreRange: z.string().min(1, 'Please select credit score range'),
  city: z.string().min(2, 'City name required'),
  state: z.string().min(2, 'State required'),
  pincode: z.string().length(6, 'Pincode must be 6 digits'),
  fullName: z.string().min(3, 'Full name required'),
  mobile: z.string().regex(/^[6-9]\d{9}$/, 'Enter valid 10-digit Indian mobile number'),
  email: z.string().email('Enter valid email address'),
  agreeTerms: z.literal(true, { errorMap: () => ({ message: 'You must agree to the privacy terms & consent' }) }),
  optionalMarketing: z.boolean().optional()
});

type FormValues = z.infer<typeof eligibilityFormSchema>;

export const CheckEligibilityPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [assessmentResult, setAssessmentResult] = useState<ReturnType<typeof calculateEligibility> | null>(null);
  const [formDataSummary, setFormDataSummary] = useState<FormValues | null>(null);

  const topRef = useRef<HTMLDivElement>(null);
  const { showToast } = useToast();

  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentStep]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(eligibilityFormSchema),
    mode: 'onChange',
    defaultValues: {
      productSlug: 'personal-loan',
      employmentType: 'salaried',
      loanAmount: 1000000,
      monthlyIncome: 100000,
      existingEmi: 15000,
      creditScoreRange: '750-900',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400053',
      fullName: 'Rahul Sharma',
      mobile: '9820012345',
      email: 'rahul.sharma@example.com',
      agreeTerms: true,
      optionalMarketing: false
    }
  });

  const selectedProductSlug = watch('productSlug');
  const selectedEmployment = watch('employmentType');
  const loanAmount = watch('loanAmount');
  const monthlyIncome = watch('monthlyIncome');
  const existingEmi = watch('existingEmi');

  const selectedProduct = LOAN_PRODUCTS.find((p) => p.slug === selectedProductSlug) || LOAN_PRODUCTS[0];

  const onNextStep = () => {
    setCurrentStep((prev) => Math.min(8, prev + 1));
  };

  const onPrevStep = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const onSubmitForm = (data: FormValues) => {
    const res = calculateEligibility(data.monthlyIncome, data.existingEmi, 5, 10.5);
    setAssessmentResult(res);
    setFormDataSummary(data);
    setCurrentStep(8);
    showToast('Indicative Loan Assessment Generated Successfully!', 'success');
  };

  const handleDownloadPDF = () => {
    showToast('Downloading Indicative Assessment Report PDF (#FAC-98421)...', 'info');
    setTimeout(() => {
      showToast('Downloaded Assessment Report PDF successfully!', 'success');
    }, 800);
  };

  return (
    <div ref={topRef} className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8 scroll-mt-24">
      {/* Step Header Indicator */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-fintech space-y-4">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
          <span>Smart Eligibility Journey</span>
          <span className="text-blue-600">Step {currentStep} of 8</span>
        </div>

        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-blue-600 h-full transition-all duration-300 rounded-full"
            style={{ width: `${(currentStep / 8) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Form Cards */}
      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-fintech-lg">
        {/* STEP 1: Finance Type */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Step 1: Select Finance Solution Needed</h3>
              <p className="text-xs text-slate-500 mt-1">Choose the financial product category matching your requirement</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {LOAN_PRODUCTS.map((prod) => (
                <div
                  key={prod.slug}
                  onClick={() => setValue('productSlug', prod.slug)}
                  className={`p-4 rounded-2xl border text-xs font-semibold cursor-pointer transition-all ${
                    selectedProductSlug === prod.slug
                      ? 'border-blue-600 bg-blue-50/80 text-blue-900 shadow-sm'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <p className="font-bold text-sm">{prod.name}</p>
                  <p className="text-[11px] text-slate-500 mt-1 font-normal line-clamp-1">{prod.shortDescription}</p>
                </div>
              ))}
            </div>

            <Button className="w-full" onClick={onNextStep} rightIcon={<ArrowRight className="w-4 h-4" />}>
              Continue to Applicant Profile
            </Button>
          </div>
        )}

        {/* STEP 2: Employment Type */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Step 2: Employment / Applicant Type</h3>
              <p className="text-xs text-slate-500 mt-1">Select your primary income source category</p>
            </div>

            <div className="space-y-3">
              {[
                { label: 'Salaried Individual', value: 'salaried', desc: 'Employed in private, public, or govt organization' },
                { label: 'Self-Employed Businessman', value: 'business_owner', desc: 'Proprietor, partner, or director of a firm' },
                { label: 'Self-Employed Professional', value: 'professional', desc: 'Doctor, CA, Advocate, Architect' },
                { label: 'Independent Consultant / Freelancer', value: 'self_employed', desc: 'Independent contractor' }
              ].map((item) => (
                <div
                  key={item.value}
                  onClick={() => setValue('employmentType', item.value as any)}
                  className={`p-4 rounded-2xl border text-xs font-semibold cursor-pointer transition-all ${
                    selectedEmployment === item.value
                      ? 'border-blue-600 bg-blue-50/80 text-blue-900 shadow-sm'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <p className="font-bold text-sm">{item.label}</p>
                  <p className="text-[11px] text-slate-500 font-normal mt-0.5">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={onPrevStep} leftIcon={<ArrowLeft className="w-4 h-4" />}>
                Back
              </Button>
              <Button className="flex-1" onClick={onNextStep} rightIcon={<ArrowRight className="w-4 h-4" />}>
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3: Requirement Amount */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Step 3: Approximate Loan Requirement</h3>
              <p className="text-xs text-slate-500 mt-1">How much capital do you estimate needing?</p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
                <span>ESTIMATED AMOUNT</span>
                <span className="text-lg font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-xl">
                  {formatINR(loanAmount)}
                </span>
              </div>
              <input
                type="range"
                min={50000}
                max={10000000}
                step={50000}
                value={loanAmount}
                onChange={(e) => setValue('loanAmount', Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={onPrevStep} leftIcon={<ArrowLeft className="w-4 h-4" />}>
                Back
              </Button>
              <Button className="flex-1" onClick={onNextStep} rightIcon={<ArrowRight className="w-4 h-4" />}>
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* STEP 4: Financial Profile */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Step 4: Basic Financial Profile</h3>
              <p className="text-xs text-slate-500 mt-1">Specify monthly income and existing EMI obligations</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 uppercase">Gross Monthly Income ({formatINR(monthlyIncome)})</label>
                <input
                  type="range"
                  min={25000}
                  max={1000000}
                  step={5000}
                  value={monthlyIncome}
                  onChange={(e) => setValue('monthlyIncome', Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer accent-blue-600"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 uppercase">Existing Monthly EMIs ({formatINR(existingEmi)})</label>
                <input
                  type="range"
                  min={0}
                  max={500000}
                  step={2500}
                  value={existingEmi}
                  onChange={(e) => setValue('existingEmi', Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer accent-blue-600"
                />
              </div>

              <Select
                label="CIBIL / Credit Score Range"
                options={[
                  { label: '750 - 900 (Excellent)', value: '750-900' },
                  { label: '700 - 749 (Good)', value: '700-749' },
                  { label: '650 - 699 (Average)', value: '650-699' },
                  { label: 'Below 650 / New to Credit', value: 'below-650' }
                ]}
                {...register('creditScoreRange')}
              />
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={onPrevStep} leftIcon={<ArrowLeft className="w-4 h-4" />}>
                Back
              </Button>
              <Button className="flex-1" onClick={onNextStep} rightIcon={<ArrowRight className="w-4 h-4" />}>
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* STEP 5: Location */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Step 5: Location Details</h3>
              <p className="text-xs text-slate-500 mt-1">Specify your current residential city & pincode</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="City" placeholder="e.g. Mumbai" error={errors.city?.message} {...register('city')} />
              <Input label="State" placeholder="e.g. Maharashtra" error={errors.state?.message} {...register('state')} />
              <Input label="Pincode" placeholder="6-digit pincode" error={errors.pincode?.message} {...register('pincode')} />
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={onPrevStep} leftIcon={<ArrowLeft className="w-4 h-4" />}>
                Back
              </Button>
              <Button className="flex-1" onClick={onNextStep} rightIcon={<ArrowRight className="w-4 h-4" />}>
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* STEP 6: Contact Details */}
        {currentStep === 6 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Step 6: Contact Information</h3>
              <p className="text-xs text-slate-500 mt-1">Provide contact details to view your eligibility report</p>
            </div>

            <div className="space-y-4">
              <Input label="Full Name *" placeholder="As per PAN card" error={errors.fullName?.message} {...register('fullName')} />
              <Input label="Mobile Number *" placeholder="10-digit mobile number" error={errors.mobile?.message} {...register('mobile')} />
              <Input label="Email Address *" type="email" placeholder="name@example.com" error={errors.email?.message} {...register('email')} />
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={onPrevStep} leftIcon={<ArrowLeft className="w-4 h-4" />}>
                Back
              </Button>
              <Button className="flex-1" onClick={onNextStep} rightIcon={<ArrowRight className="w-4 h-4" />}>
                Continue to Consent
              </Button>
            </div>
          </div>
        )}

        {/* STEP 7: Consent & Generate */}
        {currentStep === 7 && (
          <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Step 7: Privacy Consent & Declarations</h3>
              <p className="text-xs text-slate-500 mt-1">Review transparency guidelines before generating assessment</p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4 text-xs">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="mt-0.5 w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                  {...register('agreeTerms')}
                />
                <span className="text-slate-700 leading-relaxed">
                  <strong>Mandatory Consent:</strong> I agree to be contacted regarding my financial enquiry. I authorize FinServe Platform and its partner lending institutions to evaluate my profile.
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="mt-0.5 w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                  {...register('optionalMarketing')}
                />
                <span className="text-slate-600 leading-relaxed">
                  (Optional) I would like to receive financial updates, interest rate alerts and offers.
                </span>
              </label>

              {errors.agreeTerms && <p className="text-xs text-red-600 font-semibold">{errors.agreeTerms.message}</p>}
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={onPrevStep} leftIcon={<ArrowLeft className="w-4 h-4" />}>
                Back
              </Button>
              <Button type="submit" variant="success" className="flex-1 font-black text-sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Generate Indicative Assessment
              </Button>
            </div>
          </form>
        )}

        {/* STEP 8: Rich Assessment Result Output */}
        {currentStep === 8 && assessmentResult && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <Badge status="active">Indicative Assessment Generated</Badge>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Loan Pre-Evaluation Result</h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
                Reference Docket <strong>#FAC-98421</strong> • Evaluated for {formDataSummary?.fullName || 'Applicant'}
              </p>
            </div>

            {/* Main Result Card */}
            <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none"></div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">Selected Facility</span>
                  <h4 className="text-lg font-black text-white">{selectedProduct.name}</h4>
                </div>
                <Badge status={assessmentResult.status === 'Potentially Suitable' ? 'active' : 'pending'}>
                  {assessmentResult.status}
                </Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80 space-y-1">
                  <p className="text-xs text-slate-400 font-medium">Estimated Max Loan Capacity</p>
                  <p className="text-3xl font-black text-emerald-400 tracking-tight">{formatINR(assessmentResult.maxLoanAmount)}</p>
                </div>

                <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80 space-y-1">
                  <p className="text-xs text-slate-400 font-medium">Net Disposable EMI Budget</p>
                  <p className="text-3xl font-black text-blue-400 tracking-tight">{formatINR(assessmentResult.maxEMI)}/mo</p>
                </div>
              </div>

              {/* FOIR Metrics */}
              <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/60 space-y-2 text-xs text-slate-300">
                <div className="flex justify-between font-semibold text-[11px]">
                  <span>FOIR Limit Cap: <strong>{assessmentResult.foirPercentage}%</strong></span>
                  <span>Existing EMI Utilization: <strong>{assessmentResult.foirUtilization}%</strong></span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">{assessmentResult.assessmentDetails}</p>
              </div>

              {/* Empanelled Lenders Matching */}
              <div className="space-y-3 pt-2 border-t border-slate-800">
                <p className="text-xs font-bold text-slate-300 uppercase tracking-wider">Tentative Matching Institutional Lenders</p>
                <div className="grid grid-cols-3 gap-3 text-center">
                  {['HDFC Bank', 'ICICI Bank', 'Axis Bank'].map((bank, i) => (
                    <div key={i} className="bg-slate-800 p-2.5 rounded-xl border border-slate-700 text-xs font-bold text-slate-200 flex items-center justify-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span className="truncate">{bank}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                variant="gradient"
                size="lg"
                onClick={handleDownloadPDF}
                leftIcon={<Download className="w-4 h-4 text-white" />}
                className="font-extrabold"
              >
                Download PDF Assessment Report
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setCurrentStep(1)}
              >
                Recalculate Eligibility
              </Button>
            </div>
          </div>
        )}
      </div>

      <DisclaimerBanner compact />
    </div>
  );
};
