import { useState } from 'react';
import { Deal, Contact, DealStage } from '../../types';

interface DealFormProps {
  deal?: Deal;
  contacts: Contact[];
  onSave: (deal: Omit<Deal, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

const stages: { value: DealStage; label: string }[] = [
  { value: 'lead', label: 'Lead' },
  { value: 'qualified', label: 'Calificado' },
  { value: 'proposal', label: 'Propuesta' },
  { value: 'negotiation', label: 'Negociación' },
  { value: 'closed-won', label: 'Ganada' },
  { value: 'closed-lost', label: 'Perdida' },
];

export function DealForm({ deal, contacts, onSave, onCancel }: DealFormProps) {
  const [formData, setFormData] = useState({
    title: deal?.title || '',
    contactId: deal?.contactId || '',
    value: deal?.value?.toString() || '',
    stage: deal?.stage || 'lead' as DealStage,
    probability: deal?.probability?.toString() || '50',
    expectedCloseDate: deal?.expectedCloseDate?.split('T')[0] || '',
    notes: deal?.notes || '',
    products: deal?.products?.join(', ') || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title: formData.title,
      contactId: formData.contactId,
      value: parseFloat(formData.value),
      stage: formData.stage,
      probability: parseInt(formData.probability),
      expectedCloseDate: new Date(formData.expectedCloseDate).toISOString(),
      notes: formData.notes,
      products: formData.products.split(',').map((p) => p.trim()).filter(Boolean),
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
        <div className="md:col-span-2">
          <label className="label">Título de la Oportunidad *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="input"
            required
            placeholder="ej. Implementación CRM"
          />
        </div>

        <div>
          <label className="label">Contacto *</label>
          <select
            name="contactId"
            value={formData.contactId}
            onChange={handleChange}
            className="input"
            required
          >
            <option value="">Seleccionar contacto</option>
            {contacts.map((contact) => (
              <option key={contact.id} value={contact.id}>
                {contact.name} - {contact.company}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label">Valor (€) *</label>
          <input
            type="number"
            name="value"
            value={formData.value}
            onChange={handleChange}
            className="input"
            required
            min="0"
            step="0.01"
            placeholder="50000"
          />
        </div>

        <div>
          <label className="label">Etapa *</label>
          <select
            name="stage"
            value={formData.stage}
            onChange={handleChange}
            className="input"
            required
          >
            {stages.map((stage) => (
              <option key={stage.value} value={stage.value}>
                {stage.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label">Probabilidad (%) *</label>
          <input
            type="number"
            name="probability"
            value={formData.probability}
            onChange={handleChange}
            className="input"
            required
            min="0"
            max="100"
          />
        </div>

        <div>
          <label className="label">Fecha Esperada de Cierre *</label>
          <input
            type="date"
            name="expectedCloseDate"
            value={formData.expectedCloseDate}
            onChange={handleChange}
            className="input"
            required
          />
        </div>

        <div>
          <label className="label">Productos/Servicios</label>
          <input
            type="text"
            name="products"
            value={formData.products}
            onChange={handleChange}
            className="input"
            placeholder="CRM, Consultoría, Soporte"
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
          placeholder="Información adicional sobre la oportunidad..."
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button type="button" onClick={onCancel} className="btn-secondary">
          Cancelar
        </button>
        <button type="submit" className="btn-primary">
          {deal ? 'Actualizar' : 'Crear'} Oportunidad
        </button>
      </div>
    </form>
  );
}
