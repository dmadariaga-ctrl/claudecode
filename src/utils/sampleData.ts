import type { Contact, Deal, Activity } from '../types';
import { generateId } from './helpers';

const now = new Date();
const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

export const sampleContacts: Contact[] = [
  {
    id: generateId(),
    name: 'María García',
    email: 'maria.garcia@empresa.com',
    phone: '+34 600 123 456',
    company: 'Tech Solutions S.L.',
    position: 'Directora de Compras',
    tags: ['VIP', 'Tecnología'],
    createdAt: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: yesterday.toISOString(),
    lastContact: yesterday.toISOString(),
    notes: 'Cliente importante con alto potencial de compra'
  },
  {
    id: generateId(),
    name: 'Juan Pérez',
    email: 'juan.perez@consultores.com',
    phone: '+34 611 234 567',
    company: 'Consultores Asociados',
    position: 'CEO',
    tags: ['Consultoría'],
    createdAt: new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: now.toISOString(),
    lastContact: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: generateId(),
    name: 'Ana Martínez',
    email: 'ana.martinez@startupxyz.com',
    phone: '+34 622 345 678',
    company: 'Startup XYZ',
    position: 'Co-fundadora',
    tags: ['Startup', 'Innovación'],
    createdAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: now.toISOString(),
    notes: 'Interesada en soluciones escalables'
  },
];

export const createSampleDeals = (contacts: Contact[]): Deal[] => {
  if (contacts.length === 0) return [];

  return [
    {
      id: generateId(),
      title: 'Implementación Sistema CRM',
      contactId: contacts[0].id,
      value: 45000,
      stage: 'proposal',
      probability: 60,
      expectedCloseDate: nextWeek.toISOString(),
      createdAt: new Date(now.getTime() - 20 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: yesterday.toISOString(),
      notes: 'Propuesta presentada, esperando feedback',
      products: ['CRM Enterprise', 'Soporte Premium']
    },
    {
      id: generateId(),
      title: 'Consultoría Digital',
      contactId: contacts[1].id,
      value: 15000,
      stage: 'negotiation',
      probability: 80,
      expectedCloseDate: tomorrow.toISOString(),
      createdAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: now.toISOString(),
      products: ['Consultoría']
    },
    {
      id: generateId(),
      title: 'Software a Medida',
      contactId: contacts[2].id,
      value: 75000,
      stage: 'qualified',
      probability: 40,
      expectedCloseDate: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: now.toISOString(),
      notes: 'Necesita presupuesto detallado'
    },
  ];
};

export const createSampleActivities = (contacts: Contact[], deals: Deal[]): Activity[] => {
  if (contacts.length === 0) return [];

  return [
    {
      id: generateId(),
      type: 'call',
      title: 'Llamada de seguimiento',
      description: 'Revisar propuesta y resolver dudas',
      contactId: contacts[0].id,
      dealId: deals[0]?.id,
      dueDate: tomorrow.toISOString(),
      createdAt: now.toISOString(),
      priority: 'high',
      status: 'pending'
    },
    {
      id: generateId(),
      type: 'meeting',
      title: 'Reunión presentación producto',
      description: 'Demo del CRM en sus oficinas',
      contactId: contacts[1].id,
      dealId: deals[1]?.id,
      dueDate: nextWeek.toISOString(),
      createdAt: yesterday.toISOString(),
      priority: 'high',
      status: 'pending'
    },
    {
      id: generateId(),
      type: 'email',
      title: 'Enviar documentación',
      description: 'Casos de éxito y referencias',
      contactId: contacts[2].id,
      dueDate: now.toISOString(),
      createdAt: yesterday.toISOString(),
      priority: 'medium',
      status: 'pending'
    },
    {
      id: generateId(),
      type: 'task',
      title: 'Preparar propuesta económica',
      contactId: contacts[0].id,
      dealId: deals[0]?.id,
      completedAt: yesterday.toISOString(),
      createdAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      priority: 'high',
      status: 'completed'
    },
  ];
};
