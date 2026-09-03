export type NotificationType = 
  | 'application_update' 
  | 'document_request' 
  | 'follow_up' 
  | 'partner_update' 
  | 'payout_update' 
  | 'system_notification';

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  timestamp: string;
  linkUrl?: string;
}
