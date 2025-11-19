import { Contact } from '../../types';
import { Mail, Phone, Building, Briefcase, Tag, Edit, Trash2 } from 'lucide-react';
import { formatShortDate } from '../../utils/helpers';

interface ContactCardProps {
  contact: Contact;
  onEdit: (contact: Contact) => void;
  onDelete: (id: string) => void;
}

export function ContactCard({ contact, onEdit, onDelete }: ContactCardProps) {
  return (
    <div className="card hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-semibold text-lg">
            {contact.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{contact.name}</h3>
            <p className="text-sm text-gray-500">{contact.position}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(contact)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Editar"
          >
            <Edit size={16} className="text-gray-600" />
          </button>
          <button
            onClick={() => onDelete(contact.id)}
            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
            title="Eliminar"
          >
            <Trash2 size={16} className="text-red-600" />
          </button>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Building size={14} />
          <span>{contact.company}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Mail size={14} />
          <a href={`mailto:${contact.email}`} className="hover:text-primary-600">
            {contact.email}
          </a>
        </div>
        {contact.phone && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Phone size={14} />
            <a href={`tel:${contact.phone}`} className="hover:text-primary-600">
              {contact.phone}
            </a>
          </div>
        )}
      </div>

      {contact.tags.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap mb-3">
          <Tag size={14} className="text-gray-400" />
          {contact.tags.map((tag) => (
            <span key={tag} className="badge bg-primary-100 text-primary-700">
              {tag}
            </span>
          ))}
        </div>
      )}

      {contact.lastContact && (
        <div className="text-xs text-gray-500 pt-3 border-t border-gray-200">
          Último contacto: {formatShortDate(contact.lastContact)}
        </div>
      )}
    </div>
  );
}
