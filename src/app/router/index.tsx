import { createHashRouter, Navigate } from 'react-router-dom';

// Layouts
import { PublicLayout } from '../../layouts/PublicLayout';
import { CustomerLayout } from '../../layouts/CustomerLayout';
import { PartnerLayout } from '../../layouts/PartnerLayout';
import { CRMLayout } from '../../layouts/CRMLayout';
import { AuthLayout } from '../../layouts/AuthLayout';

// Public Pages
import { HomePage } from '../../pages/public/HomePage';
import { SolutionsPage } from '../../pages/public/SolutionsPage';
import { ProductDetailPage } from '../../pages/public/ProductDetailPage';
import { CalculatorsPage } from '../../pages/public/CalculatorsPage';
import { CheckEligibilityPage } from '../../pages/public/CheckEligibilityPage';
import { PartnerLandingPage } from '../../pages/public/PartnerLandingPage';
import { PartnerRegisterPage } from '../../pages/public/PartnerRegisterPage';
import { TrustCenterPage } from '../../pages/public/TrustCenterPage';
import { HowItWorksPage } from '../../pages/public/HowItWorksPage';
import { AboutPage, ContactPage } from '../../pages/public/AboutPage';
import { ResourcesPage } from '../../pages/public/ResourcesPage';
import { LegalPage } from '../../pages/public/LegalPage';

// Customer Pages
import { CustomerDashboardPage } from '../../pages/customer/CustomerDashboardPage';
import { CustomerApplicationsPage } from '../../pages/customer/CustomerApplicationsPage';
import { CustomerDocumentsPage } from '../../pages/customer/CustomerDocumentsPage';
import { CustomerSupportPage, CustomerProfilePage } from '../../pages/customer/CustomerSupportPage';
import { CustomerNotificationsPage } from '../../pages/customer/CustomerNotificationsPage';

// Partner Pages
import { PartnerDashboardPage } from '../../pages/partner/PartnerDashboardPage';
import { PartnerLeadsPage } from '../../pages/partner/PartnerLeadsPage';
import { PartnerPayoutsPage, PartnerReportsPage } from '../../pages/partner/PartnerPayoutsPage';
import { PartnerProductsPage, PartnerLendersPage } from '../../pages/partner/PartnerProductsPage';

// CRM Pages
import { CRMDashboardPage } from '../../pages/crm/CRMDashboardPage';
import { CRMLeadsPage, CRMLeadDetailPage } from '../../pages/crm/CRMLeadsPage';
import { CRMPartnersPage } from '../../pages/crm/CRMPartnersPage';
import { CRMProductsCMSPage, CRMDocumentsPage } from '../../pages/crm/CRMProductsCMSPage';
import { CRMPayoutsPage } from '../../pages/crm/CRMPayoutsPage';
import { CRMTasksPage, CRMAuditLogsPage, CRMSettingsPage } from '../../pages/crm/CRMTasksPage';

// Auth Pages
import { LoginPage, ForgotPasswordPage, VerifyOtpPage, ResetPasswordPage } from '../../pages/auth/LoginPage';
import { NotFoundPage, ForbiddenPage } from '../../pages/errors/NotFoundPage';

export const router = createHashRouter([
  // Public Marketing Routes
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'financial-solutions', element: <SolutionsPage /> },
      { path: 'financial-solutions/:slug', element: <ProductDetailPage /> },
      { path: 'calculators', element: <CalculatorsPage type="emi" /> },
      { path: 'calculators/emi', element: <CalculatorsPage type="emi" /> },
      { path: 'calculators/loan-eligibility', element: <CalculatorsPage type="eligibility" /> },
      { path: 'calculators/home-loan', element: <Navigate to="/calculators/emi" replace /> },
      { path: 'calculators/business-loan', element: <Navigate to="/calculators/emi" replace /> },
      { path: 'check-eligibility', element: <CheckEligibilityPage /> },
      { path: 'how-it-works', element: <HowItWorksPage /> },
      { path: 'partners', element: <PartnerLandingPage /> },
      { path: 'partners/become-a-partner', element: <PartnerRegisterPage /> },
      { path: 'resources', element: <ResourcesPage /> },
      { path: 'resources/blog', element: <ResourcesPage /> },
      { path: 'resources/blog/:slug', element: <ResourcesPage /> },
      { path: 'resources/guides', element: <ResourcesPage /> },
      { path: 'resources/faqs', element: <ResourcesPage /> },
      { path: 'trust-center', element: <TrustCenterPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'privacy-policy', element: <LegalPage type="privacy" /> },
      { path: 'terms', element: <LegalPage type="terms" /> },
      { path: 'disclaimer', element: <LegalPage type="disclaimer" /> },
      { path: 'grievance-redressal', element: <LegalPage type="grievance" /> },
      { path: 'cookie-policy', element: <LegalPage type="cookie" /> },
    ],
  },

  // Customer Portal Routes
  {
    path: '/customer',
    element: <CustomerLayout />,
    children: [
      { index: true, element: <Navigate to="/customer/dashboard" replace /> },
      { path: 'dashboard', element: <CustomerDashboardPage /> },
      { path: 'applications', element: <CustomerApplicationsPage /> },
      { path: 'applications/:id', element: <CustomerApplicationsPage /> },
      { path: 'documents', element: <CustomerDocumentsPage /> },
      { path: 'messages', element: <CustomerSupportPage /> },
      { path: 'support', element: <CustomerSupportPage /> },
      { path: 'notifications', element: <CustomerNotificationsPage /> },
      { path: 'profile', element: <CustomerProfilePage /> },
    ],
  },

  // DSA Partner Portal Routes
  {
    path: '/partner',
    element: <PartnerLayout />,
    children: [
      { index: true, element: <Navigate to="/partner/dashboard" replace /> },
      { path: 'dashboard', element: <PartnerDashboardPage /> },
      { path: 'leads', element: <PartnerLeadsPage /> },
      { path: 'leads/:id', element: <PartnerLeadsPage /> },
      { path: 'applications', element: <PartnerLeadsPage /> },
      { path: 'applications/:id', element: <PartnerLeadsPage /> },
      { path: 'documents', element: <CustomerDocumentsPage /> },
      { path: 'payouts', element: <PartnerPayoutsPage /> },
      { path: 'products', element: <PartnerProductsPage /> },
      { path: 'lenders', element: <PartnerLendersPage /> },
      { path: 'reports', element: <PartnerReportsPage /> },
      { path: 'support', element: <CustomerSupportPage /> },
      { path: 'notifications', element: <CustomerNotificationsPage /> },
      { path: 'profile', element: <CustomerProfilePage /> },
    ],
  },

  // Internal CRM & Admin Dashboard Routes
  {
    path: '/crm',
    element: <CRMLayout />,
    children: [
      { index: true, element: <Navigate to="/crm/dashboard" replace /> },
      { path: 'dashboard', element: <CRMDashboardPage /> },
      { path: 'leads', element: <CRMLeadsPage /> },
      { path: 'leads/:id', element: <CRMLeadDetailPage /> },
      { path: 'applications', element: <CRMLeadsPage /> },
      { path: 'applications/:id', element: <CRMLeadDetailPage /> },
      { path: 'customers', element: <CRMPartnersPage /> },
      { path: 'partners', element: <CRMPartnersPage /> },
      { path: 'lenders', element: <PartnerLendersPage /> },
      { path: 'products', element: <CRMProductsCMSPage /> },
      { path: 'documents', element: <CRMDocumentsPage /> },
      { path: 'payouts', element: <CRMPayoutsPage /> },
      { path: 'reports', element: <PartnerReportsPage /> },
      { path: 'tasks', element: <CRMTasksPage /> },
      { path: 'support', element: <CustomerSupportPage /> },
      { path: 'grievances', element: <CustomerSupportPage /> },
      { path: 'notifications', element: <CustomerNotificationsPage /> },
      { path: 'settings', element: <CRMSettingsPage /> },
      { path: 'audit-logs', element: <CRMAuditLogsPage /> },
    ],
  },

  // Auth Routes
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'forgot-password', element: <ForgotPasswordPage /> },
      { path: 'verify-otp', element: <VerifyOtpPage /> },
      { path: 'reset-password', element: <ResetPasswordPage /> },
    ],
  },

  // Error Pages
  { path: '/403', element: <ForbiddenPage /> },
  { path: '/404', element: <NotFoundPage /> },
  { path: '*', element: <NotFoundPage /> },
]);
