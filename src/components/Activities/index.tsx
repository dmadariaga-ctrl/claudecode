import { useState } from 'react';
import { Activity, Contact, Deal, ActivityStatus } from '../../types';
import { ActivityCard } from './ActivityCard';
import { ActivityForm } from './ActivityForm';
import { Modal } from '../UI/Modal';
import { EmptyState } from '../UI/EmptyState';
import { Plus, Filter, CheckSquare } from 'lucide-react';
import { generateId } from '../../utils/helpers';

interface ActivitiesProps {
  activities: Activity[];
  contacts: Contact[];
  deals: Deal[];
  onAddActivity: (activity: Activity) => void;
  onUpdateActivity: (activity: Activity) => void;
  onDeleteActivity: (id: string) => void;
}

export function Activities({
  activities,
  contacts,
  deals,
  onAddActivity,
  onUpdateActivity,
  onDeleteActivity,
}: ActivitiesProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | undefined>();
  const [statusFilter, setStatusFilter] = useState<ActivityStatus | 'all'>('all');

  const filteredActivities = activities
    .filter((activity) => statusFilter === 'all' || activity.status === statusFilter)
    .sort((a, b) => {
      // Sort by due date, then by creation date
      if (a.dueDate && b.dueDate) {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      if (a.dueDate) return -1;
      if (b.dueDate) return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  const handleSave = (activityData: Omit<Activity, 'id' | 'createdAt'>) => {
    if (editingActivity) {
      onUpdateActivity({
        ...activityData,
        id: editingActivity.id,
        createdAt: editingActivity.createdAt,
      });
    } else {
      onAddActivity({
        ...activityData,
        id: generateId(),
        createdAt: new Date().toISOString(),
      });
    }
    setIsModalOpen(false);
    setEditingActivity(undefined);
  };

  const handleEdit = (activity: Activity) => {
    setEditingActivity(activity);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingActivity(undefined);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingActivity(undefined);
  };

  const handleToggleComplete = (id: string) => {
    const activity = activities.find((a) => a.id === id);
    if (!activity) return;

    onUpdateActivity({
      ...activity,
      status: activity.status === 'completed' ? 'pending' : 'completed',
      completedAt: activity.status === 'completed' ? undefined : new Date().toISOString(),
    });
  };

  const statusOptions: { value: ActivityStatus | 'all'; label: string }[] = [
    { value: 'all', label: 'Todas' },
    { value: 'pending', label: 'Pendientes' },
    { value: 'completed', label: 'Completadas' },
    { value: 'cancelled', label: 'Canceladas' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Filter size={20} className="text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as ActivityStatus | 'all')}
            className="input w-auto"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <span className="text-sm text-gray-500">
            {filteredActivities.length} actividad{filteredActivities.length !== 1 ? 'es' : ''}
          </span>
        </div>
        <button onClick={handleAdd} className="btn-primary flex items-center gap-2">
          <Plus size={20} />
          Nueva Actividad
        </button>
      </div>

      {filteredActivities.length === 0 ? (
        <EmptyState
          icon={<CheckSquare size={48} />}
          title="No hay actividades"
          description={
            statusFilter === 'all'
              ? 'Comienza creando tu primera actividad o tarea'
              : `No hay actividades ${statusFilter === 'pending' ? 'pendientes' : statusFilter === 'completed' ? 'completadas' : 'canceladas'}`
          }
          action={
            statusFilter === 'all'
              ? { label: 'Crear Actividad', onClick: handleAdd }
              : undefined
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredActivities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              contact={contacts.find((c) => c.id === activity.contactId)}
              onEdit={handleEdit}
              onDelete={onDeleteActivity}
              onToggleComplete={handleToggleComplete}
            />
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCancel}
        title={editingActivity ? 'Editar Actividad' : 'Nueva Actividad'}
        size="lg"
      >
        <ActivityForm
          activity={editingActivity}
          contacts={contacts}
          deals={deals}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </Modal>
    </div>
  );
}
