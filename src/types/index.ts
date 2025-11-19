export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  lastContact?: string;
  notes?: string;
}

export interface Deal {
  id: string;
  title: string;
  contactId: string;
  value: number;
  stage: DealStage;
  probability: number;
  expectedCloseDate: string;
  createdAt: string;
  updatedAt: string;
  notes?: string;
  products?: string[];
}

export type DealStage = 'lead' | 'qualified' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';

export interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  description?: string;
  contactId?: string;
  dealId?: string;
  dueDate?: string;
  completedAt?: string;
  createdAt: string;
  priority: Priority;
  status: ActivityStatus;
}

export type ActivityType = 'call' | 'email' | 'meeting' | 'task' | 'note';
export type ActivityStatus = 'pending' | 'completed' | 'cancelled';
export type Priority = 'low' | 'medium' | 'high';

export interface DashboardMetrics {
  totalContacts: number;
  totalDeals: number;
  totalRevenue: number;
  wonDeals: number;
  lostDeals: number;
  activeDeals: number;
  pendingActivities: number;
  completedActivitiesThisWeek: number;
  averageDealValue: number;
  conversionRate: number;
}

export interface AppState {
  contacts: Contact[];
  deals: Deal[];
  activities: Activity[];
}

export type ViewType = 'dashboard' | 'contacts' | 'deals' | 'activities';
