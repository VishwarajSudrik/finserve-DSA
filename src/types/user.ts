export type UserRole = 
  | 'super_admin' 
  | 'admin' 
  | 'sales_manager' 
  | 'relationship_manager' 
  | 'operations' 
  | 'credit_executive' 
  | 'partner_manager' 
  | 'finance' 
  | 'support' 
  | 'dsa_partner' 
  | 'customer';

export interface User {
  id: string;
  name: string;
  email: string;
  mobile: string;
  role: UserRole;
  avatarUrl?: string;
  city?: string;
  partnerId?: string;
  createdAt: string;
}
