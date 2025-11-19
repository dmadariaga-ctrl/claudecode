import { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { Contacts } from './components/Contacts';
import { Deals } from './components/Deals';
import { Activities } from './components/Activities';
import { Contact, Deal, Activity, ViewType } from './types';
import { storage } from './utils/storage';
import { sampleContacts, createSampleDeals, createSampleActivities } from './utils/sampleData';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const loadedContacts = storage.getContacts();
    const loadedDeals = storage.getDeals();
    const loadedActivities = storage.getActivities();

    // If no data exists, load sample data
    if (loadedContacts.length === 0) {
      setContacts(sampleContacts);
      const sampleDeals = createSampleDeals(sampleContacts);
      const sampleActivities = createSampleActivities(sampleContacts, sampleDeals);
      setDeals(sampleDeals);
      setActivities(sampleActivities);

      // Save sample data to localStorage
      storage.saveContacts(sampleContacts);
      storage.saveDeals(sampleDeals);
      storage.saveActivities(sampleActivities);
    } else {
      setContacts(loadedContacts);
      setDeals(loadedDeals);
      setActivities(loadedActivities);
    }

    setIsInitialized(true);
  }, []);

  // Save contacts to localStorage whenever they change
  useEffect(() => {
    if (isInitialized) {
      storage.saveContacts(contacts);
    }
  }, [contacts, isInitialized]);

  // Save deals to localStorage whenever they change
  useEffect(() => {
    if (isInitialized) {
      storage.saveDeals(deals);
    }
  }, [deals, isInitialized]);

  // Save activities to localStorage whenever they change
  useEffect(() => {
    if (isInitialized) {
      storage.saveActivities(activities);
    }
  }, [activities, isInitialized]);

  // Contact handlers
  const handleAddContact = (contact: Contact) => {
    setContacts([...contacts, contact]);
  };

  const handleUpdateContact = (updatedContact: Contact) => {
    setContacts(contacts.map((c) => (c.id === updatedContact.id ? updatedContact : c)));
  };

  const handleDeleteContact = (id: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este contacto?')) {
      setContacts(contacts.filter((c) => c.id !== id));
      // Also delete related deals and activities
      setDeals(deals.filter((d) => d.contactId !== id));
      setActivities(activities.filter((a) => a.contactId !== id));
    }
  };

  // Deal handlers
  const handleAddDeal = (deal: Deal) => {
    setDeals([...deals, deal]);
  };

  const handleUpdateDeal = (updatedDeal: Deal) => {
    setDeals(deals.map((d) => (d.id === updatedDeal.id ? updatedDeal : d)));
  };

  const handleDeleteDeal = (id: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta oportunidad?')) {
      setDeals(deals.filter((d) => d.id !== id));
      setActivities(activities.filter((a) => a.dealId !== id));
    }
  };

  // Activity handlers
  const handleAddActivity = (activity: Activity) => {
    setActivities([...activities, activity]);
  };

  const handleUpdateActivity = (updatedActivity: Activity) => {
    setActivities(activities.map((a) => (a.id === updatedActivity.id ? updatedActivity : a)));
  };

  const handleDeleteActivity = (id: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta actividad?')) {
      setActivities(activities.filter((a) => a.id !== id));
    }
  };

  const viewTitles: Record<ViewType, { title: string; subtitle?: string }> = {
    dashboard: {
      title: 'Dashboard',
      subtitle: 'Resumen general de tu negocio',
    },
    contacts: {
      title: 'Contactos',
      subtitle: 'Gestiona tu red de clientes y prospectos',
    },
    deals: {
      title: 'Oportunidades de Venta',
      subtitle: 'Administra tu pipeline de ventas',
    },
    activities: {
      title: 'Actividades y Tareas',
      subtitle: 'Organiza tu trabajo diario',
    },
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard contacts={contacts} deals={deals} activities={activities} />;
      case 'contacts':
        return (
          <Contacts
            contacts={contacts}
            onAddContact={handleAddContact}
            onUpdateContact={handleUpdateContact}
            onDeleteContact={handleDeleteContact}
          />
        );
      case 'deals':
        return (
          <Deals
            deals={deals}
            contacts={contacts}
            onAddDeal={handleAddDeal}
            onUpdateDeal={handleUpdateDeal}
            onDeleteDeal={handleDeleteDeal}
          />
        );
      case 'activities':
        return (
          <Activities
            activities={activities}
            contacts={contacts}
            deals={deals}
            onAddActivity={handleAddActivity}
            onUpdateActivity={handleUpdateActivity}
            onDeleteActivity={handleDeleteActivity}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Layout
      currentView={currentView}
      onViewChange={setCurrentView}
      title={viewTitles[currentView].title}
      subtitle={viewTitles[currentView].subtitle}
    >
      {renderView()}
    </Layout>
  );
}

export default App;
