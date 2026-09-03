import React, { createContext, useContext, useState } from 'react';
import type { User, UserRole } from '../../types/user';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  setPersona: (role: UserRole) => void;
  isAuthenticated: boolean;
  hasPermission: (allowedRoles: UserRole[]) => boolean;
  logout: () => void;
}

const DEMO_PERSONAS: Record<UserRole, User> = {
  customer: {
    id: 'cust-101',
    name: 'Customer Login',
    email: 'rahul.mehta.demo@example.com',
    mobile: '9820123456',
    role: 'customer',
    city: 'Mumbai',
    createdAt: '2026-01-15T10:30:00Z'
  },
  dsa_partner: {
    id: 'pt-201',
    name: 'Rajesh Singhania (DSA Partner)',
    email: 'rajesh.singhania.demo@example.com',
    mobile: '9821098765',
    role: 'dsa_partner',
    partnerId: 'pt-201',
    city: 'Mumbai',
    createdAt: '2025-11-10T10:00:00Z'
  },
  relationship_manager: {
    id: 'rm-01',
    name: 'RM LOGIN ',
    email: 'vikram.rm@finserve-dsa.example.com',
    mobile: '9876500111',
    role: 'relationship_manager',
    city: 'Mumbai',
    createdAt: '2025-06-01T09:00:00Z'
  },
  admin: {
    id: 'admin-01',
    name: 'Enterprise Admin',
    email: 'admin@finserve-dsa.example.com',
    mobile: '9800011122',
    role: 'admin',
    city: 'Mumbai',
    createdAt: '2025-01-01T00:00:00Z'
  },
  super_admin: {
    id: 'super-01',
    name: 'Super Admin',
    email: 'superadmin@finserve-dsa.example.com',
    mobile: '9800000000',
    role: 'super_admin',
    city: 'Mumbai',
    createdAt: '2025-01-01T00:00:00Z'
  },
  sales_manager: {
    id: 'sales-01',
    name: 'Sales Manager',
    email: 'sales@finserve-dsa.example.com',
    mobile: '9800022233',
    role: 'sales_manager',
    createdAt: '2025-01-01T00:00:00Z'
  },
  operations: {
    id: 'ops-01',
    name: 'Ops Executive',
    email: 'ops@finserve-dsa.example.com',
    mobile: '9800033344',
    role: 'operations',
    createdAt: '2025-01-01T00:00:00Z'
  },
  credit_executive: {
    id: 'credit-01',
    name: 'Credit Underwriter',
    email: 'credit@finserve-dsa.example.com',
    mobile: '9800044455',
    role: 'credit_executive',
    createdAt: '2025-01-01T00:00:00Z'
  },
  partner_manager: {
    id: 'pm-01',
    name: 'Partner Desk Lead',
    email: 'pm@finserve-dsa.example.com',
    mobile: '9800055566',
    role: 'partner_manager',
    createdAt: '2025-01-01T00:00:00Z'
  },
  finance: {
    id: 'fin-01',
    name: 'Finance & Payout Lead',
    email: 'finance@finserve-dsa.example.com',
    mobile: '9800066677',
    role: 'finance',
    createdAt: '2025-01-01T00:00:00Z'
  },
  support: {
    id: 'sup-01',
    name: 'Support Agent',
    email: 'support@finserve-dsa.example.com',
    mobile: '9800077788',
    role: 'support',
    createdAt: '2025-01-01T00:00:00Z'
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(DEMO_PERSONAS.customer);

  const setPersona = (role: UserRole) => {
    setUser(DEMO_PERSONAS[role] || DEMO_PERSONAS.customer);
  };

  const logout = () => {
    setUser(null);
  };

  const hasPermission = (allowedRoles: UserRole[]) => {
    if (!user) return false;
    if (user.role === 'super_admin') return true;
    return allowedRoles.includes(user.role);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || 'customer',
        setPersona,
        isAuthenticated: !!user,
        hasPermission,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
