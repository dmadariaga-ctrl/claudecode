import { useState } from 'react';
import { Deal, Contact, DealStage } from '../../types';
import { DealCard } from './DealCard';
import { DealForm } from './DealForm';
import { Modal } from '../UI/Modal';
import { EmptyState } from '../UI/EmptyState';
import { Plus, Filter, TrendingUp } from 'lucide-react';
import { generateId } from '../../utils/helpers';

interface DealsProps {
  deals: Deal[];
  contacts: Contact[];
  onAddDeal: (deal: Deal) => void;
  onUpdateDeal: (deal: Deal) => void;
  onDeleteDeal: (id: string) => void;
}

export function Deals({ deals, contacts, onAddDeal, onUpdateDeal, onDeleteDeal }: DealsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDeal, setEditingDeal] = useState<Deal | undefined>();
  const [stageFilter, setStageFilter] = useState<DealStage | 'all'>('all');

  const filteredDeals = deals.filter(
    (deal) => stageFilter === 'all' || deal.stage === stageFilter
  );

  const handleSave = (dealData: Omit<Deal, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingDeal) {
      onUpdateDeal({
        ...editingDeal,
        ...dealData,
        updatedAt: new Date().toISOString(),
      });
    } else {
      onAddDeal({
        ...dealData,
        id: generateId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
    setIsModalOpen(false);
    setEditingDeal(undefined);
  };

  const handleEdit = (deal: Deal) => {
    setEditingDeal(deal);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingDeal(undefined);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingDeal(undefined);
  };

  const stages: { value: DealStage | 'all'; label: string }[] = [
    { value: 'all', label: 'Todas' },
    { value: 'lead', label: 'Lead' },
    { value: 'qualified', label: 'Calificado' },
    { value: 'proposal', label: 'Propuesta' },
    { value: 'negotiation', label: 'Negociación' },
    { value: 'closed-won', label: 'Ganadas' },
    { value: 'closed-lost', label: 'Perdidas' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Filter size={20} className="text-gray-400" />
          <select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value as DealStage | 'all')}
            className="input w-auto"
          >
            {stages.map((stage) => (
              <option key={stage.value} value={stage.value}>
                {stage.label}
              </option>
            ))}
          </select>
          <span className="text-sm text-gray-500">
            {filteredDeals.length} oportunidad{filteredDeals.length !== 1 ? 'es' : ''}
          </span>
        </div>
        <button onClick={handleAdd} className="btn-primary flex items-center gap-2">
          <Plus size={20} />
          Nueva Oportunidad
        </button>
      </div>

      {filteredDeals.length === 0 ? (
        <EmptyState
          icon={<TrendingUp size={48} />}
          title="No hay oportunidades"
          description={
            stageFilter === 'all'
              ? 'Comienza creando tu primera oportunidad de venta'
              : 'No hay oportunidades en esta etapa'
          }
          action={
            stageFilter === 'all'
              ? { label: 'Crear Oportunidad', onClick: handleAdd }
              : undefined
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDeals.map((deal) => (
            <DealCard
              key={deal.id}
              deal={deal}
              contact={contacts.find((c) => c.id === deal.contactId)}
              onEdit={handleEdit}
              onDelete={onDeleteDeal}
            />
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCancel}
        title={editingDeal ? 'Editar Oportunidad' : 'Nueva Oportunidad'}
        size="lg"
      >
        <DealForm
          deal={editingDeal}
          contacts={contacts}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </Modal>
    </div>
  );
}
