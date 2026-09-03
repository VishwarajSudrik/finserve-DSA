export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'borrower-guide' | 'credit-score' | 'msme' | 'regulatory';
  categoryLabel: string;
  author: string;
  authorRole: string;
  publishedDate: string;
  readTime: string;
  tags: string[];
}

export const MOCK_BLOGS: BlogPost[] = [
  {
    id: 'blog-01',
    slug: 'demystifying-home-loan-interest-rates-repo-linked',
    title: 'Understanding Repo-Rate Linked Home Loan ROI in 2026',
    excerpt: 'A beginner-friendly guide on how EBLR and central repo rates affect your monthly Home Loan EMI and balance transfer savings.',
    content: `
      ## What is an External Benchmark Linked Rate (EBLR)?
      In India, standard retail loans including Home Loans are benchmarked against the Reserve Bank of India (RBI) Repo Rate. Understanding your interest rate spread over the repo rate is critical for managing long-term mortgage obligations.

      ### Key Concepts Explained Simply:
      1. **Repo Rate**: The rate at which RBI lends money to commercial banks in India.
      2. **Spread / Margin**: The additional interest margin added by the bank based on your CIBIL score and employment category.
      3. **Reset Window**: RBI mandates banks to review and adjust your loan interest rate every 3 months when repo rate changes.

      ### 3 Steps to Evaluate a Home Loan Balance Transfer:
      - **Step 1**: Calculate total remaining interest outgo with your current bank.
      - **Step 2**: Deduct one-time balance transfer fees (Processing fee, legal charges, MODT stamp duty ~ 0.5%).
      - **Step 3**: If net interest savings over the remaining tenure exceed ₹1,50,000, initiating a balance transfer is highly beneficial.
    `,
    category: 'borrower-guide',
    categoryLabel: 'Borrower Guides',
    author: 'Financial Advisory Desk',
    authorRole: 'Senior Credit Strategist',
    publishedDate: '2026-02-10T10:00:00Z',
    readTime: '5 min read',
    tags: ['Home Loan', 'Interest Rates', 'EBLR', 'Mortgage Guide']
  },
  {
    id: 'blog-02',
    slug: 'step-by-step-loan-application-document-guide',
    title: 'Complete Document Checklist for Salaried & Self-Employed Borrowers',
    excerpt: 'Avoid loan application rejections by organizing your KYC, income proof, and bank statements before applying.',
    content: `
      ## Why Document Verification Matters
      Underwriting algorithms verify applicant income, debt-to-income ratio (FOIR), and bank account cash flows before issuing a loan sanction letter. Having clean documents ensures faster approval within 24 to 48 hours.

      ### Documents Required for Salaried Borrowers:
      - **Identity & Address Proof**: Aadhaar Card (linked with mobile), PAN Card, Passport/Voter ID.
      - **Income Proof**: Salary Slips for the last 3 months, Form 16 for 2 financial years.
      - **Banking**: Bank statement for the last 6 months showing salary credits.

      ### Documents Required for Self-Employed Professionals & Business Owners:
      - **Business Registration**: GST Registration Certificate, Udyam Registration, Partnership Deed or MOA/AOA.
      - **Financial Statements**: Audited P&L Statements and Balance Sheets for the last 2 Financial Years with Computation of Income.
      - **Banking & Returns**: GST 3B returns for 12 months & Current Bank Account Statements for 12 months.
    `,
    category: 'borrower-guide',
    categoryLabel: 'Borrower Guides',
    author: 'Retail Credit Team',
    authorRole: 'Senior Underwriting Officer',
    publishedDate: '2026-02-14T11:30:00Z',
    readTime: '6 min read',
    tags: ['Document Checklist', 'KYC', 'Personal Loan', 'Approval SLA']
  },
  {
    id: 'blog-03',
    slug: 'improve-cibil-score-from-650-to-750-in-90-days',
    title: 'How to Improve Your CIBIL Score from 650 to 750+ in 90 Days',
    excerpt: 'Actionable steps to fix credit report errors, lower credit card utilization, and build a strong credit profile.',
    content: `
      ## The Importance of a 750+ CIBIL Score
      In Indian lending, a CIBIL score of 750 or higher qualifies you for prime interest rates (up to 2% to 3% lower) and instant digital pre-approvals across major Banks and NBFCs.

      ### 4 Action Steps to Boost Your CIBIL Score:
      1. **Keep Credit Card Utilization Below 30%**: If your credit limit is ₹1,00,000, avoid spending more than ₹30,000 in a billing cycle. High credit utilization signals financial distress to credit bureaus.
      2. **Never Miss EMI or Credit Card Payment Due Dates**: Set up NACH Auto-Debit for monthly obligations. A single 30-day late payment can drop your score by 50 to 80 points.
      3. **Avoid Applying to Multiple Lenders Simultaneously**: Multiple loan applications trigger 'Hard Inquiries' on your credit report. Instead, use FinServe pre-check which performs a soft inquiry.
      4. **Rectify Errors in Your CIBIL Credit Report**: Download your CIBIL report and check for closed accounts incorrectly listed as active or duplicate loan entries. Raise an online dispute at CIBIL.com.
    `,
    category: 'credit-score',
    categoryLabel: 'CIBIL & Credit Score',
    author: 'Credit Risk Analysis Desk',
    authorRole: 'Lead Risk Consultant',
    publishedDate: '2026-02-16T09:15:00Z',
    readTime: '7 min read',
    tags: ['CIBIL Score', 'Credit Repair', 'Credit Card', 'Loan Approval']
  },
  {
    id: 'blog-04',
    slug: 'understanding-hard-vs-soft-credit-inquiries',
    title: 'Hard Inquiries vs Soft Inquiries: How They Impact Your Credit Profile',
    excerpt: 'Learn the difference between checking your own score and bank loan eligibility checks.',
    content: `
      ## What is a Credit Inquiry?
      Whenever a financial institution checks your CIBIL profile, a record is added to your credit history. Understanding the difference between Hard and Soft inquiries protects your score.

      ### Soft Inquiries (Zero Impact on CIBIL):
      - Checking your own CIBIL score on credit platforms or bank apps.
      - Preliminary pre-approval checks performed by FinServe's eligibility wizard.
      - Employer background checks.

      ### Hard Inquiries (Temporary Minor Impact):
      - Formal loan or credit card applications submitted directly to a bank.
      - Each hard inquiry reduces your CIBIL score by 3 to 5 points.
      - **Tip**: Applying at 5 different bank websites in one week creates 5 hard inquiries, giving lenders the impression of 'credit hunger'.
    `,
    category: 'credit-score',
    categoryLabel: 'CIBIL & Credit Score',
    author: 'FinTech Analytics Team',
    authorRole: 'Data & Risk Officer',
    publishedDate: '2026-02-20T16:45:00Z',
    readTime: '4 min read',
    tags: ['Credit Score', 'CIBIL Inquiries', 'Loan Tips']
  },
  {
    id: 'blog-05',
    slug: 'essential-documents-for-cgtmse-msme-business-loans',
    title: 'How MSMEs Can Secure Collateral-Free Loans Up To ₹5 Crores',
    excerpt: 'Key guidelines for small and medium business owners leveraging CGTMSE credit guarantee schemes in India.',
    content: `
      ## Unlocking CGTMSE Credit Guarantee Support
      The Credit Guarantee Fund Trust for Micro and Small Enterprises (CGTMSE) enables formal lending institutions to provide working capital and term loans up to ₹5 Crore to eligible MSMEs without requiring property collateral.

      ### Key Benefits of CGTMSE Scheme:
      - **No Property Collateral**: Guarantee cover is provided directly by the Trust.
      - **Flexible Funding Lines**: Available for manufacturing, service, and trading enterprises.
      - **Competitive Interest Rates**: Interest margins capped as per RBI MSME guidelines.

      ### Eligibility Requirements:
      - Active **Udyam Registration Certificate**.
      - 2 Years Audited P&L Statements and Balance Sheets showing positive cash flows.
      - GST 3B & 1A returns matching bank account credits.
      - Clean track record with no default history in CIBIL Commercial report.
    `,
    category: 'msme',
    categoryLabel: 'MSME & Business Finance',
    author: 'SME Solutions Desk',
    authorRole: 'Enterprise Banking Specialist',
    publishedDate: '2026-02-18T14:30:00Z',
    readTime: '6 min read',
    tags: ['MSME', 'Business Loan', 'CGTMSE', 'Working Capital']
  },
  {
    id: 'blog-06',
    slug: 'rbi-digital-lending-guidelines-borrower-protection',
    title: 'RBI Digital Lending Guidelines 2026: Borrower Rights & Transparency',
    excerpt: 'Key regulations protecting borrowers from hidden charges, unethical recovery practices, and unauthorized data sharing.',
    content: `
      ## RBI Regulations Safeguarding Indian Borrowers
      The Reserve Bank of India (RBI) mandates strict operational norms for Digital Lending Apps (DLAs) and Lending Service Providers (LSPs) like FinServe to ensure complete transparency.

      ### Mandatory Regulatory Standards:
      1. **Key Fact Statement (KFS)**: Before signing any loan contract, the lender must provide a standardized KFS detailing Annual Percentage Rate (APR), processing fees, penalty charges, and EMI schedules.
      2. **Direct Bank Disbursement**: Loan funds must be disbursed directly from the regulated bank/NBFC bank account into the borrower's verified bank account without routing through third-party wallets.
      3. **No Hidden Charges**: Lenders cannot charge fees that are not explicitly stated in the Key Fact Statement.
      4. **Grievance Redressal**: Lenders and platforms must designate a 24x7 Grievance Officer with details published on their website.
    `,
    category: 'regulatory',
    categoryLabel: 'RBI Guidelines',
    author: 'Legal & Compliance Desk',
    authorRole: 'Chief Regulatory Counsel',
    publishedDate: '2026-02-22T12:00:00Z',
    readTime: '5 min read',
    tags: ['RBI Guidelines', 'Borrower Rights', 'KFS', 'Compliance']
  }
];

export interface FAQItem {
  id: string;
  category: 'General' | 'Personal Finance' | 'Home Finance' | 'Business Finance' | 'Applications' | 'Documents' | 'Partners';
  question: string;
  answer: string;
}

export const MOCK_FAQS: FAQItem[] = [
  {
    id: 'faq-01',
    category: 'General',
    question: 'What is the role of the FinServe platform?',
    answer: 'FinServe acts as a digital credit distribution technology platform connecting loan applicants and DSA partner advisors with formal lending institutions (Banks and NBFCs) across India.'
  },
  {
    id: 'faq-02',
    category: 'General',
    question: 'Are loan approvals guaranteed by the platform?',
    answer: 'No. Loan eligibility, interest rates, and final sanction are strictly evaluated and determined by the respective lending institution based on RBI and internal underwriting guidelines.'
  },
  {
    id: 'faq-03',
    category: 'Personal Finance',
    question: 'What minimum CIBIL score is required for personal loans?',
    answer: 'While requirements vary by lender, a credit score of 700 or above typically unlocks preferable interest rates, higher loan amounts, and faster approval processing.'
  },
  {
    id: 'faq-04',
    category: 'Partners',
    question: 'How do DSA partners track lead commissions and payouts?',
    answer: 'DSA partners have access to a dedicated Partner Portal showing real-time lead status updates, disbursal milestones, expected payouts with TDS breakdown, and downloadable payout vouchers.'
  }
];
