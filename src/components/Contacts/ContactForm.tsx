import { useState } from 'react';
import { Contact } from '../../types';
import { X } from 'lucide-react';

interface ContactFormProps {
  contact?: Contact;
  onSave: (contact: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

export function ContactForm({ contact, onSave, onCancel }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: contact?.name || '',
    email: contact?.email || '',
    phone: contact?.phone || '',
    company: contact?.company || '',
    position: contact?.position || '',
    tags: contact?.tags?.join(', ') || '',
    notes: contact?.notes || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      tags: formData.tags.split(',').map((t) => t.trim()).filter(Boolean),
      lastContact: contact?.lastContact,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="label">Nombre *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input"
            required
          />
        </div>

        <div>
          <label className="label">Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input"
            required
          />
        </div>

        <div>
          <label className="label">Teléfono</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div>
          <label className="label">Empresa *</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="input"
            required
          />
        </div>

        <div>
          <label className="label">Cargo</label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div>
          <label className="label">Etiquetas (separadas por comas)</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="input"
            placeholder="VIP, Tecnología, Consultoría"
          />
        </div>
      </div>

      <div>
        <label className="label">Notas</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          className="input"
          rows={3}
          placeholder="Información adicional sobre el contacto..."
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button type="button" onClick={onCancel} className="btn-secondary">
          Cancelar
        </button>
        <button type="submit" className="btn-primary">
          {contact ? 'Actualizar' : 'Crear'} Contacto
        </button>
      </div>
    </form>
  );
}
