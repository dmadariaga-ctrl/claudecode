import { Activity, Contact, ActivityType, Priority } from '../../types';
import { Phone, Mail, Calendar, CheckCircle, FileText, Edit, Trash2, Clock, AlertCircle, Check } from 'lucide-react';
import { formatShortDate, isOverdue } from '../../utils/helpers';

interface ActivityCardProps {
  activity: Activity;
  contact?: Contact;
  onEdit: (activity: Activity) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

const activityIcons: Record<ActivityType, any> = {
  call: Phone,
  email: Mail,
  meeting: Calendar,
  task: CheckCircle,
  note: FileText,
};

const activityColors = {
  call: 'bg-blue-100 text-blue-700',
  email: 'bg-purple-100 text-purple-700',
  meeting: 'bg-green-100 text-green-700',
  task: 'bg-orange-100 text-orange-700',
  note: 'bg-gray-100 text-gray-700',
};

const priorityColors: Record<Priority, string> = {
  high: 'bg-red-100 text-red-700 border-red-300',
  medium: 'bg-orange-100 text-orange-700 border-orange-300',
  low: 'bg-green-100 text-green-700 border-green-300',
};

const priorityLabels: Record<Priority, string> = {
  high: 'Alta',
  medium: 'Media',
  low: 'Baja',
};

export function ActivityCard({ activity, contact, onEdit, onDelete, onToggleComplete }: ActivityCardProps) {
  const Icon = activityIcons[activity.type];
  const overdue = activity.dueDate && activity.status === 'pending' && isOverdue(activity.dueDate);
  const isCompleted = activity.status === 'completed';

  return (
    <div className={`card ${overdue ? 'border-l-4 border-red-500' : ''} ${isCompleted ? 'opacity-60' : ''}`}>
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${activityColors[activity.type]} flex-shrink-0`}>
          <Icon size={20} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex-1">
              <h3 className={`font-semibold text-gray-900 ${isCompleted ? 'line-through' : ''}`}>
                {activity.title}
              </h3>
              {contact && (
                <p className="text-sm text-gray-500 mt-1">{contact.name}</p>
              )}
            </div>
            <div className="flex gap-1 flex-shrink-0">
              {activity.status === 'pending' && (
                <button
                  onClick={() => onToggleComplete(activity.id)}
                  className="p-1.5 hover:bg-green-50 rounded-lg transition-colors"
                  title="Marcar como completada"
                >
                  <Check size={16} className="text-green-600" />
                </button>
              )}
              <button
                onClick={() => onEdit(activity)}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                title="Editar"
              >
                <Edit size={16} className="text-gray-600" />
              </button>
              <button
                onClick={() => onDelete(activity.id)}
                className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                title="Eliminar"
              >
                <Trash2 size={16} className="text-red-600" />
              </button>
            </div>
          </div>

          {activity.description && (
            <p className="text-sm text-gray-600 mb-3">{activity.description}</p>
          )}

          <div className="flex flex-wrap gap-2 items-center">
            <span className={`badge ${priorityColors[activity.priority]}`}>
              {priorityLabels[activity.priority]}
            </span>

            {activity.dueDate && (
              <div className={`flex items-center gap-1 text-xs ${
                overdue ? 'text-red-600 font-semibold' : 'text-gray-500'
              }`}>
                {overdue ? <AlertCircle size={14} /> : <Clock size={14} />}
                <span>{formatShortDate(activity.dueDate)}</span>
                {overdue && <span className="ml-1">(Vencida)</span>}
              </div>
            )}

            {isCompleted && activity.completedAt && (
              <div className="flex items-center gap-1 text-xs text-green-600">
                <CheckCircle size={14} />
                <span>Completada {formatShortDate(activity.completedAt)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
