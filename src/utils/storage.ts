import type { Contact, Deal, Activity } from '../types';

const STORAGE_KEYS = {
  CONTACTS: 'crm_contacts',
  DEALS: 'crm_deals',
  ACTIVITIES: 'crm_activities',
};

export const storage = {
  getContacts: (): Contact[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CONTACTS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading contacts:', error);
      return [];
    }
  },

  saveContacts: (contacts: Contact[]): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(contacts));
    } catch (error) {
      console.error('Error saving contacts:', error);
    }
  },

  getDeals: (): Deal[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.DEALS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading deals:', error);
      return [];
    }
  },

  saveDeals: (deals: Deal[]): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.DEALS, JSON.stringify(deals));
    } catch (error) {
      console.error('Error saving deals:', error);
    }
  },

  getActivities: (): Activity[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ACTIVITIES);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading activities:', error);
      return [];
    }
  },

  saveActivities: (activities: Activity[]): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(activities));
    } catch (error) {
      console.error('Error saving activities:', error);
    }
  },

  clearAll: (): void => {
    Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
  },
};
