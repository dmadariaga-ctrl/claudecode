import { useState } from 'react';
import { Contact } from '../../types';
import { ContactCard } from './ContactCard';
import { ContactForm } from './ContactForm';
import { Modal } from '../UI/Modal';
import { EmptyState } from '../UI/EmptyState';
import { Plus, Search, Users } from 'lucide-react';
import { generateId } from '../../utils/helpers';

interface ContactsProps {
  contacts: Contact[];
  onAddContact: (contact: Contact) => void;
  onUpdateContact: (contact: Contact) => void;
  onDeleteContact: (id: string) => void;
}

export function Contacts({ contacts, onAddContact, onUpdateContact, onDeleteContact }: ContactsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | undefined>();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSave = (contactData: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingContact) {
      onUpdateContact({
        ...editingContact,
        ...contactData,
        updatedAt: new Date().toISOString(),
      });
    } else {
      onAddContact({
        ...contactData,
        id: generateId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
    setIsModalOpen(false);
    setEditingContact(undefined);
  };

  const handleEdit = (contact: Contact) => {
    setEditingContact(contact);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingContact(undefined);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingContact(undefined);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar contactos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10"
            />
          </div>
        </div>
        <button onClick={handleAdd} className="btn-primary flex items-center gap-2">
          <Plus size={20} />
          Nuevo Contacto
        </button>
      </div>

      {filteredContacts.length === 0 ? (
        <EmptyState
          icon={<Users size={48} />}
          title={searchTerm ? 'No se encontraron contactos' : 'No hay contactos aún'}
          description={
            searchTerm
              ? 'Intenta con otros términos de búsqueda'
              : 'Comienza agregando tu primer contacto para gestionar tu red de clientes'
          }
          action={!searchTerm ? { label: 'Agregar Contacto', onClick: handleAdd } : undefined}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              onEdit={handleEdit}
              onDelete={onDeleteContact}
            />
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCancel}
        title={editingContact ? 'Editar Contacto' : 'Nuevo Contacto'}
        size="lg"
      >
        <ContactForm contact={editingContact} onSave={handleSave} onCancel={handleCancel} />
      </Modal>
    </div>
  );
}
