import { MOCK_CUSTOMERS } from '../data/customers';
import { MOCK_TICKETS } from '../data/tickets';
import { MOCK_NOTIFICATIONS } from '../data/notifications';
import type { Customer } from '../types/customer';
import type { SupportTicket } from '../types/support';
import type { AppNotification } from '../types/notification';

const delay = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms));

class CustomerService {
  private customers: Customer[] = [...MOCK_CUSTOMERS];

  async getCustomers(search?: string): Promise<Customer[]> {
    await delay();
    if (!search) return this.customers;
    const q = search.toLowerCase();
    return this.customers.filter(
      (c) => c.name.toLowerCase().includes(q) || c.mobile.includes(q) || c.city.toLowerCase().includes(q)
    );
  }

  async getCustomerById(id: string): Promise<Customer | undefined> {
    await delay();
    return this.customers.find((c) => c.id === id);
  }
}

class SupportService {
  private tickets: SupportTicket[] = [...MOCK_TICKETS];

  async getTickets(): Promise<SupportTicket[]> {
    await delay();
    return this.tickets;
  }

  async createTicket(ticket: Partial<SupportTicket>): Promise<SupportTicket> {
    await delay(400);
    const newTkt: SupportTicket = {
      id: `tkt-${Date.now()}`,
      ticketNumber: `TKT-2026-${Math.floor(100 + Math.random() * 900)}`,
      subject: ticket.subject || 'Help Request',
      category: ticket.category || 'Application Status',
      priority: ticket.priority || 'medium',
      status: 'open',
      userRole: ticket.userRole || 'customer',
      userName: ticket.userName || 'Demo User',
      userEmail: ticket.userEmail || 'user@example.com',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [
        {
          id: `msg-${Date.now()}`,
          senderName: ticket.userName || 'Demo User',
          senderRole: ticket.userRole === 'dsa_partner' ? 'DSA Partner' : 'Customer',
          content: ticket.messages?.[0]?.content || ticket.subject || '',
          timestamp: new Date().toISOString()
        }
      ]
    };
    this.tickets.unshift(newTkt);
    return newTkt;
  }
}

class NotificationService {
  private notifications: AppNotification[] = [...MOCK_NOTIFICATIONS];

  async getNotifications(): Promise<AppNotification[]> {
    await delay();
    return this.notifications;
  }

  async markAsRead(id: string): Promise<void> {
    await delay(100);
    const item = this.notifications.find((n) => n.id === id);
    if (item) item.read = true;
  }
}

export const customerService = new CustomerService();
export const supportService = new SupportService();
export const notificationService = new NotificationService();
