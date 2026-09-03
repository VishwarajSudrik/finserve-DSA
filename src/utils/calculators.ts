export interface EMIResult {
  monthlyEMI: number;
  totalInterest: number;
  totalRepayment: number;
  principalAmount: number;
  amortizationSchedule: {
    month: number;
    principalPaid: number;
    interestPaid: number;
    remainingBalance: number;
  }[];
}

export function calculateEMI(
  principal: number,
  annualInterestRate: number,
  tenureMonths: number
): EMIResult {
  if (principal <= 0 || annualInterestRate <= 0 || tenureMonths <= 0) {
    return {
      monthlyEMI: 0,
      totalInterest: 0,
      totalRepayment: 0,
      principalAmount: principal,
      amortizationSchedule: [],
    };
  }

  const monthlyRate = annualInterestRate / 12 / 100;
  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
    (Math.pow(1 + monthlyRate, tenureMonths) - 1);

  const monthlyEMI = Math.round(emi);
  const totalRepayment = Math.round(monthlyEMI * tenureMonths);
  const totalInterest = Math.round(totalRepayment - principal);

  let balance = principal;
  const schedule = [];

  for (let month = 1; month <= tenureMonths; month++) {
    const interestForMonth = balance * monthlyRate;
    const principalForMonth = monthlyEMI - interestForMonth;
    balance = Math.max(0, balance - principalForMonth);

    schedule.push({
      month,
      interestPaid: Math.round(interestForMonth),
      principalPaid: Math.round(principalForMonth),
      remainingBalance: Math.round(balance),
    });
  }

  return {
    monthlyEMI,
    totalInterest,
    totalRepayment,
    principalAmount: principal,
    amortizationSchedule: schedule,
  };
}

export interface EligibilityResult {
  maxLoanAmount: number;
  maxEMI: number;
  foirPercentage: number;
  totalAllowedEmi: number;
  foirUtilization: number;
  status: 'Potentially Suitable' | 'May Require Additional Review' | 'Needs Further Assessment';
  assessmentDetails: string;
}

export function calculateEligibility(
  grossMonthlyIncome: number,
  existingMonthlyEmi: number,
  tenureYears: number = 5,
  interestRate: number = 10.5
): EligibilityResult {
  // Tiered FOIR (Fixed Obligation to Income Ratio) calculation:
  // Income < ₹50k: 45% FOIR | ₹50k - ₹1.5L: 50% FOIR | > ₹1.5L: 55% FOIR
  let maxAllowedEmiRatio = 0.50;
  if (grossMonthlyIncome < 50000) {
    maxAllowedEmiRatio = 0.45;
  } else if (grossMonthlyIncome >= 150000) {
    maxAllowedEmiRatio = 0.55;
  }

  const totalAvailableForEmi = grossMonthlyIncome * maxAllowedEmiRatio;
  const netAvailableEmi = Math.max(0, totalAvailableForEmi - existingMonthlyEmi);

  const tenureMonths = tenureYears * 12;
  const monthlyRate = interestRate / 12 / 100;

  let estimatedMaxLoan = 0;
  if (monthlyRate > 0 && netAvailableEmi > 0) {
    estimatedMaxLoan =
      (netAvailableEmi * (Math.pow(1 + monthlyRate, tenureMonths) - 1)) /
      (monthlyRate * Math.pow(1 + monthlyRate, tenureMonths));
  }

  const roundedMaxLoan = Math.round(estimatedMaxLoan / 10000) * 10000;
  const foirUtilization = Math.min(100, Math.round((existingMonthlyEmi / (grossMonthlyIncome || 1)) * 100));

  let status: EligibilityResult['status'] = 'Potentially Suitable';
  let details = `Your FOIR cap is ${Math.round(maxAllowedEmiRatio * 100)}%. Existing EMIs utilize ${foirUtilization}% of monthly income.`;

  if (existingMonthlyEmi >= totalAvailableForEmi || roundedMaxLoan < 100000) {
    status = 'Needs Further Assessment';
    details = 'Existing monthly obligations reach or exceed maximum allowed FOIR threshold. Adding a co-applicant or clearing existing EMIs can boost eligibility.';
  } else if (existingMonthlyEmi > grossMonthlyIncome * 0.4) {
    status = 'May Require Additional Review';
    details = `Existing EMIs consume ${foirUtilization}% of income (close to ${Math.round(maxAllowedEmiRatio * 100)}% FOIR cap). Approval depends on lender criteria.`;
  }

  return {
    maxLoanAmount: roundedMaxLoan,
    maxEMI: Math.round(netAvailableEmi),
    foirPercentage: Math.round(maxAllowedEmiRatio * 100),
    totalAllowedEmi: Math.round(totalAvailableForEmi),
    foirUtilization,
    status,
    assessmentDetails: details,
  };
}
