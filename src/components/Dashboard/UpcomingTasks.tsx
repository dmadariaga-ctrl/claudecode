import { Activity, Contact } from '../../types';
import { Clock, AlertCircle } from 'lucide-react';
import { formatShortDate, isOverdue } from '../../utils/helpers';

interface UpcomingTasksProps {
  activities: Activity[];
  contacts: Contact[];
}

export function UpcomingTasks({ activities, contacts }: UpcomingTasksProps) {
  const upcomingTasks = activities
    .filter((a) => a.status === 'pending' && a.dueDate)
    .sort((a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime())
    .slice(0, 5);

  const getContactName = (contactId?: string) => {
    if (!contactId) return null;
    const contact = contacts.find((c) => c.id === contactId);
    return contact?.name;
  };

  const priorityColors = {
    high: 'bg-red-100 text-red-700',
    medium: 'bg-orange-100 text-orange-700',
    low: 'bg-green-100 text-green-700',
  };

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Próximas Tareas</h3>
      <div className="space-y-3">
        {upcomingTasks.map((task) => {
          const overdue = task.dueDate && isOverdue(task.dueDate);
          const contactName = getContactName(task.contactId);

          return (
            <div
              key={task.id}
              className={`p-3 rounded-lg border-l-4 ${
                overdue ? 'bg-red-50 border-red-500' : 'bg-gray-50 border-gray-300'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{task.title}</p>
                  {contactName && (
                    <p className="text-xs text-gray-500 mt-1">{contactName}</p>
                  )}
                </div>
                <span className={`badge ${priorityColors[task.priority]}`}>
                  {task.priority === 'high' ? 'Alta' : task.priority === 'medium' ? 'Media' : 'Baja'}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-2 text-xs text-gray-600">
                {overdue ? (
                  <>
                    <AlertCircle size={14} className="text-red-500" />
                    <span className="text-red-600 font-medium">
                      Vencida - {formatShortDate(task.dueDate!)}
                    </span>
                  </>
                ) : (
                  <>
                    <Clock size={14} />
                    <span>{formatShortDate(task.dueDate!)}</span>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
