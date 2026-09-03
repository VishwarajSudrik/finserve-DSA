import type { LoanProduct } from '../types/product';

export const LOAN_PRODUCTS: LoanProduct[] = [
  {
    id: 'prod-001',
    slug: 'personal-loan',
    name: 'Personal Loan',
    category: 'Consumer Finance',
    shortDescription: 'Unsecured personal financing tailored for salaried professionals and self-employed individuals with quick processing.',
    fullDescription: 'Our Personal Loan solutions connect you with leading banks and NBFCs across India. Enjoy competitive interest rates, flexible repayment tenures, transparent processing fees, and zero hidden charges.',
    iconName: 'UserCheck',
    minAmount: 50000,
    maxAmount: 4000000,
    minInterestRate: 10.49,
    maxTenureMonths: 72,
    processingFeeRange: '0.50% - 2.50% of loan amount',
    keyBenefits: [
      'No collateral or security required',
      'Flexible tenure up to 6 years',
      'Minimal paperwork & digital verification',
      'Pre-approved offers for qualified profiles'
    ],
    features: [
      { title: 'High Loan Quantum', description: 'Borrow up to ₹40 Lakhs based on monthly income and credit assessment.' },
      { title: 'Flexible Repayment', description: 'Choose tenures from 12 to 72 months to align with your financial commitments.' },
      { title: 'Transparent Terms', description: 'Clear disclosure of APR, processing charges, and foreclosure rules.' }
    ],
    eligibility: [
      { label: 'Minimum Age', value: '21 Years (Max 60 years at maturity)' },
      { label: 'Minimum Net Monthly Income', value: '₹25,000 / month for metros (₹20,000 for tier-2/3)' },
      { label: 'Work Experience', value: 'Minimum 1 year total, 6 months in current organization' },
      { label: 'Credit Score Indicator', value: 'Preferred 700+ CIBIL score' }
    ],
    requiredDocuments: [
      'PAN Card & Aadhaar Card (KYC Proof)',
      'Salary Slips for the last 3 months',
      'Bank Statement for the last 6 months (Salary Account)',
      'Employment ID card / Appointment letter',
      'Current Address Proof (Utility bill / Rent Agreement)'
    ],
    faqs: [
      { question: 'Can I foreclose my personal loan before tenure ends?', answer: 'Yes, most lending partners allow foreclosure after 6 to 12 EMIs, subject to partner-specific prepayment charges.' },
      { question: 'What is the processing time for personal loan approval?', answer: 'Indicative approval typically takes 24-48 business hours after complete document submission.' }
    ],
    calculatorType: 'emi',
    status: 'active'
  },
  {
    id: 'prod-002',
    slug: 'home-loan',
    name: 'Home Loan',
    category: 'Secured Housing Finance',
    shortDescription: 'Long-term secured financing for purchasing residential properties, flat construction, or balance transfers.',
    fullDescription: 'Fulfill your dream of homeownership with structured mortgage financing. Benefit from low interest rates, extended tenure options up to 30 years, and expert legal and technical property verification guidance.',
    iconName: 'Home',
    minAmount: 500000,
    maxAmount: 100000000,
    minInterestRate: 8.35,
    maxTenureMonths: 360,
    processingFeeRange: '0.25% - 0.50% of loan amount',
    keyBenefits: [
      'Attractive floating & fixed interest rates',
      'Extended tenure up to 30 years for lower EMIs',
      'Tax benefits under Section 80C & Section 24',
      'Balance transfer & top-up loan facility'
    ],
    features: [
      { title: 'High LTV Ratio', description: 'Up to 75% - 90% property cost financing based on property valuation.' },
      { title: 'PMAY & Govt Subsidy Guidance', description: 'Assistance with eligible government housing schemes and subsidies.' },
      { title: 'Property Legal Verification', description: 'Professional legal & technical property valuation support.' }
    ],
    eligibility: [
      { label: 'Minimum Age', value: '18 Years (Max 70 years at loan maturity)' },
      { label: 'Minimum Monthly Income', value: '₹30,000 combined household income' },
      { label: 'Employment Status', value: 'Salaried, Self-employed Businessman or Professional' }
    ],
    requiredDocuments: [
      'PAN Card & KYC Documents',
      'Last 6 months Bank Statements',
      'Form 16 / ITR for last 2 Assessment Years',
      'Complete Property Chain Documents & Title Deed',
      'Approved Building Plan & Allotment Letter'
    ],
    faqs: [
      { question: 'Can I apply for a co-applicant home loan?', answer: 'Yes, adding a co-applicant (spouse, parent, or working child) enhances loan eligibility and income assessment.' }
    ],
    calculatorType: 'emi',
    status: 'active'
  },
  {
    id: 'prod-003',
    slug: 'business-loan',
    name: 'Business Loan',
    category: 'Commercial Finance',
    shortDescription: 'Customized collateral-free business financing for expanding operations, purchasing inventory, or managing cash flows.',
    fullDescription: 'Empower your business growth with structured business loans. Designed for sole proprietors, partnerships, private limited firms, and SMEs with transparent evaluation.',
    iconName: 'Building2',
    minAmount: 300000,
    maxAmount: 7500000,
    minInterestRate: 14.00,
    maxTenureMonths: 48,
    processingFeeRange: '1.50% - 3.00% of loan amount',
    keyBenefits: [
      'Unsecured financing up to ₹75 Lakhs',
      'Minimal operational disruption with fast disbursal',
      'Customized repayment choices',
      'Overdraft & Term Loan structures'
    ],
    features: [
      { title: 'Cashflow Based Underwriting', description: 'Loan eligibility evaluated using GST returns & banking cash flows.' },
      { title: 'Flexible Working Capital', description: 'Combine term loan and credit line facility.' }
    ],
    eligibility: [
      { label: 'Business Vintage', value: 'Minimum 3 years active business operations' },
      { label: 'Annual Turnover', value: 'Minimum ₹40 Lakhs annual turnover reported in GST' },
      { label: 'Business Owner Age', value: '25 to 65 Years' }
    ],
    requiredDocuments: [
      'Business Registration / GST Certificate',
      'ITR & Audit Reports for last 2 Years',
      'Bank Statement for last 12 Months',
      'KYC of Promoters / Directors'
    ],
    faqs: [
      { question: 'Do I need collateral for a Business Loan?', answer: 'Unsecured business loans up to ₹75L do not require tangible collateral.' }
    ],
    calculatorType: 'emi',
    status: 'active'
  },
  {
    id: 'prod-004',
    slug: 'msme-finance',
    name: 'MSME Finance',
    category: 'Priority Sector Credit',
    shortDescription: 'Government scheme aligned credit facilities for Micro, Small and Medium Enterprises with collateral subsidy incentives.',
    fullDescription: 'Unlock institutional credit backed by CGTMSE cover or priority sector lending guidelines. Specially designed for manufacturing and service sector MSMEs.',
    iconName: 'Factory',
    minAmount: 500000,
    maxAmount: 20000000,
    minInterestRate: 11.50,
    maxTenureMonths: 84,
    processingFeeRange: '1.00% - 2.00%',
    keyBenefits: [
      'Access to CGTMSE collateral-free guarantee schemes',
      'Competitive interest rates under SME priority lending',
      'Comprehensive term & working capital support'
    ],
    features: [
      { title: 'Udyam Registration Support', description: 'Guidance on MSME Udyam certificate registration and benefits.' }
    ],
    eligibility: [
      { label: 'Entity Registration', value: 'Udyam Registered MSME' },
      { label: 'Vintage', value: 'Minimum 2 years of manufacturing/service operations' }
    ],
    requiredDocuments: [
      'Udyam Registration Certificate',
      'GST Returns for last 12 Months',
      'Audited Financials (Balance Sheet & P&L)'
    ],
    faqs: [
      { question: 'What is CGTMSE coverage?', answer: 'CGTMSE provides credit guarantee coverage to lenders for MSME loans without third-party collateral.' }
    ],
    calculatorType: 'emi',
    status: 'active'
  },
  {
    id: 'prod-005',
    slug: 'loan-against-property',
    name: 'Loan Against Property (LAP)',
    category: 'Secured Asset Finance',
    shortDescription: 'Leverage your residential, commercial, or industrial property equity to secure high-value long-term capital.',
    fullDescription: 'Unlock the equity stored in your real estate assets. Loan Against Property (LAP) offers lower interest rates than unsecured loans with flexible multi-purpose usage.',
    iconName: 'Building',
    minAmount: 1000000,
    maxAmount: 150000000,
    minInterestRate: 9.25,
    maxTenureMonths: 180,
    processingFeeRange: '0.50% - 1.00%',
    keyBenefits: [
      'Higher loan amount against property market value',
      'Significantly lower interest rate than personal loans',
      'Extended tenure up to 15 years for manageable EMIs'
    ],
    features: [
      { title: 'Multi-property Collateral', description: 'Residential flats, commercial shops, plots, or industrial units accepted.' }
    ],
    eligibility: [
      { label: 'Property Ownership', value: 'Clear title, unencumbered residential or commercial property' },
      { label: 'Applicant Type', value: 'Salaried, Self-employed, or Corporate entity' }
    ],
    requiredDocuments: [
      'Property title deeds & Sanctioned plan',
      'Income documentation (ITR/Form 16/Audited P&L)',
      '12 Months Bank Statements'
    ],
    faqs: [
      { question: 'Can self-occupied residential property be used as LAP collateral?', answer: 'Yes, self-occupied residential properties are accepted by most lending partners.' }
    ],
    calculatorType: 'emi',
    status: 'active'
  },
  {
    id: 'prod-006',
    slug: 'working-capital',
    name: 'Working Capital Finance',
    category: 'Liquidity Management',
    shortDescription: 'Cash credit, overdraft, and trade credit lines to maintain smooth daily business operations and inventory cycles.',
    fullDescription: 'Bridge operational funding gaps with structured Cash Credit (CC), Overdraft (OD), and Letter of Credit (LC) facilities tailored to your cash-flow cycle.',
    iconName: 'Coins',
    minAmount: 1000000,
    maxAmount: 100000000,
    minInterestRate: 10.50,
    maxTenureMonths: 12,
    processingFeeRange: '0.50% - 1.50%',
    keyBenefits: [
      'Pay interest only on the utilized amount in Overdraft',
      'Annual renewal with flexible limit enhancement',
      'Seamless supplier payment management'
    ],
    features: [
      { title: 'Revolving Line of Credit', description: 'Withdraw and deposit funds repeatedly within authorized limits.' }
    ],
    eligibility: [
      { label: 'Business Turnover', value: 'Minimum ₹1 Crore annual turnover' },
      { label: 'Banking Conduct', value: 'Satisfactory debt servicing history' }
    ],
    requiredDocuments: [
      'Sanction Letter of existing limits (if any)',
      'Stock & Debtors statements',
      'Audited financials for 3 years'
    ],
    faqs: [
      { question: 'How is interest calculated on Cash Credit/Overdraft?', answer: 'Interest is calculated daily on the utilized balance and billed monthly.' }
    ],
    calculatorType: 'emi',
    status: 'active'
  },
  {
    id: 'prod-007',
    slug: 'machinery-finance',
    name: 'Machinery & Equipment Finance',
    category: 'Asset Backed Finance',
    shortDescription: 'Asset-backed funding for acquiring medical, industrial, printing, construction, and manufacturing equipment.',
    fullDescription: 'Modernize your production facilities or upgrade capital equipment without straining core cash flows. The purchased machinery acts as primary security.',
    iconName: 'Wrench',
    minAmount: 500000,
    maxAmount: 50000000,
    minInterestRate: 11.00,
    maxTenureMonths: 84,
    processingFeeRange: '1.00% - 2.00%',
    keyBenefits: [
      'Machinery serves as primary collateral',
      'Financing up to 80%-90% of equipment invoice value',
      'Structured repayment linked to production cycles'
    ],
    features: [
      { title: 'New & Used Machinery', description: 'Financing for imported, indigenous new, and certified refurbished equipment.' }
    ],
    eligibility: [
      { label: 'Industry Sector', value: 'Manufacturing, Healthcare, Printing, Packaging, Construction' },
      { label: 'Business Vintage', value: 'Minimum 2 years of operation' }
    ],
    requiredDocuments: [
      'Proforma Invoice from Equipment OEM/Supplier',
      'Machine Technical Specifications',
      'Business KYC & Banking Statements'
    ],
    faqs: [
      { question: 'Is imported equipment eligible for machinery financing?', answer: 'Yes, both domestic and imported equipment with proper customs documentation are covered.' }
    ],
    calculatorType: 'emi',
    status: 'active'
  },
  {
    id: 'prod-008',
    slug: 'commercial-vehicle-finance',
    name: 'Commercial Vehicle Finance',
    category: 'Transport & Logistics',
    shortDescription: 'Financing solutions for light, medium, and heavy commercial vehicles, buses, and fleet expansion.',
    fullDescription: 'Expand your transport fleet or purchase single commercial vehicles. Tailored credit structures for fleet operators, first-time buyers, and logistics companies.',
    iconName: 'Truck',
    minAmount: 300000,
    maxAmount: 30000000,
    minInterestRate: 10.75,
    maxTenureMonths: 60,
    processingFeeRange: '1.00% - 2.50%',
    keyBenefits: [
      'High vehicle LTV financing',
      'Coverage for LCV, MCV, HCV, Tipper, and Bus categories',
      'Specialized schemes for First Time Buyers (FTB) & Fleet Owners'
    ],
    features: [
      { title: 'Chassis & Body Funding', description: 'Comprehensive funding for vehicle chassis as well as custom body fabrication.' }
    ],
    eligibility: [
      { label: 'Applicant Category', value: 'Fleet Operator, Captive Business User, FTB with driving experience' }
    ],
    requiredDocuments: [
      'Proforma Invoice & Dealer Quote',
      'Driving License / Transport Contract Copy',
      'Banking & Income Proofs'
    ],
    faqs: [
      { question: 'Can a first-time buyer without previous loan history get CV finance?', answer: 'Yes, specialized First Time User (FTU) schemes are available with partner assessment.' }
    ],
    calculatorType: 'emi',
    status: 'active'
  },
  {
    id: 'prod-009',
    slug: 'credit-card',
    name: 'Corporate & Premium Credit Cards',
    category: 'Payment Solutions',
    shortDescription: 'Curated credit cards with reward structures, lounge access, cashbacks, and expense management tools.',
    fullDescription: 'Compare and apply for top-tier credit card offerings from leading partner institutions tailored for executive travel, business expenses, and premium rewards.',
    iconName: 'CreditCard',
    minAmount: 50000,
    maxAmount: 1500000,
    minInterestRate: 0.00,
    maxTenureMonths: 1,
    processingFeeRange: 'Nil to ₹4,999 joining fee',
    keyBenefits: [
      'Up to 50 days interest-free credit period',
      'Airport lounge access & travel privileges',
      'Reward points, cashback, and fuel surcharge waivers',
      'Seamless digital approval'
    ],
    features: [
      { title: 'Expense Categorization', description: 'Detailed monthly spend reporting for taxation & accounting.' }
    ],
    eligibility: [
      { label: 'Minimum Net Income', value: '₹35,000 / month for salaried' },
      { label: 'Age', value: '21 to 65 Years' }
    ],
    requiredDocuments: [
      'Identity & Address Proof',
      'Latest Salary Slip or ITR'
    ],
    faqs: [
      { question: 'Is there an annual fee on these cards?', answer: 'Cards range from lifetime-free options to premium fee-based cards with milestone fee waivers.' }
    ],
    calculatorType: 'credit-card',
    status: 'active'
  }
];
