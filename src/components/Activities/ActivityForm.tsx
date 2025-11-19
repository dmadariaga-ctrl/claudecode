import { useState } from 'react';
import { Activity, Contact, Deal, ActivityType, Priority } from '../../types';

interface ActivityFormProps {
  activity?: Activity;
  contacts: Contact[];
  deals: Deal[];
  onSave: (activity: Omit<Activity, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

const activityTypes: { value: ActivityType; label: string }[] = [
  { value: 'call', label: 'Llamada' },
  { value: 'email', label: 'Email' },
  { value: 'meeting', label: 'Reunión' },
  { value: 'task', label: 'Tarea' },
  { value: 'note', label: 'Nota' },
];

const priorities: { value: Priority; label: string }[] = [
  { value: 'low', label: 'Baja' },
  { value: 'medium', label: 'Media' },
  { value: 'high', label: 'Alta' },
];

export function ActivityForm({ activity, contacts, deals, onSave, onCancel }: ActivityFormProps) {
  const [formData, setFormData] = useState({
    type: activity?.type || 'task' as ActivityType,
    title: activity?.title || '',
    description: activity?.description || '',
    contactId: activity?.contactId || '',
    dealId: activity?.dealId || '',
    dueDate: activity?.dueDate?.split('T')[0] || '',
    priority: activity?.priority || 'medium' as Priority,
    status: activity?.status || 'pending',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      type: formData.type,
      title: formData.title,
      description: formData.description || undefined,
      contactId: formData.contactId || undefined,
      dealId: formData.dealId || undefined,
      dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : undefined,
      priority: formData.priority,
      status: formData.status as 'pending' | 'completed' | 'cancelled',
      completedAt: activity?.completedAt,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="label">Tipo *</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="input"
            required
          >
            {activityTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label">Prioridad *</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="input"
            required
          >
            {priorities.map((priority) => (
              <option key={priority.value} value={priority.value}>
                {priority.label}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="label">Título *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="input"
            required
            placeholder="ej. Llamar para hacer seguimiento"
          />
        </div>

        <div>
          <label className="label">Contacto</label>
          <select
            name="contactId"
            value={formData.contactId}
            onChange={handleChange}
            className="input"
          >
            <option value="">Sin contacto</option>
            {contacts.map((contact) => (
              <option key={contact.id} value={contact.id}>
                {contact.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label">Oportunidad</label>
          <select
            name="dealId"
            value={formData.dealId}
            onChange={handleChange}
            className="input"
          >
            <option value="">Sin oportunidad</option>
            {deals.map((deal) => (
              <option key={deal.id} value={deal.id}>
                {deal.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label">Fecha de vencimiento</label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div>
          <label className="label">Estado</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="input"
          >
            <option value="pending">Pendiente</option>
            <option value="completed">Completada</option>
            <option value="cancelled">Cancelada</option>
          </select>
        </div>
      </div>

      <div>
        <label className="label">Descripción</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="input"
          rows={3}
          placeholder="Detalles adicionales..."
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button type="button" onClick={onCancel} className="btn-secondary">
          Cancelar
        </button>
        <button type="submit" className="btn-primary">
          {activity ? 'Actualizar' : 'Crear'} Actividad
        </button>
      </div>
    </form>
  );
}
