import { Activity, Contact } from '../../types';
import { Phone, Mail, Calendar, CheckCircle, FileText } from 'lucide-react';
import { formatShortDate } from '../../utils/helpers';

interface RecentActivityProps {
  activities: Activity[];
  contacts: Contact[];
}

const activityIcons = {
  call: Phone,
  email: Mail,
  meeting: Calendar,
  task: CheckCircle,
  note: FileText,
};

const activityColors = {
  call: 'text-blue-600 bg-blue-100',
  email: 'text-purple-600 bg-purple-100',
  meeting: 'text-green-600 bg-green-100',
  task: 'text-orange-600 bg-orange-100',
  note: 'text-gray-600 bg-gray-100',
};

export function RecentActivity({ activities, contacts }: RecentActivityProps) {
  const recentActivities = activities
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const getContactName = (contactId?: string) => {
    if (!contactId) return 'Sin contacto';
    const contact = contacts.find((c) => c.id === contactId);
    return contact?.name || 'Desconocido';
  };

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Actividad Reciente</h3>
      <div className="space-y-4">
        {recentActivities.map((activity) => {
          const Icon = activityIcons[activity.type];
          const colorClass = activityColors[activity.type];

          return (
            <div key={activity.id} className="flex items-start gap-3">
              <div className={`p-2 rounded-lg ${colorClass}`}>
                <Icon size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                <p className="text-sm text-gray-500 truncate">{getContactName(activity.contactId)}</p>
              </div>
              <div className="text-xs text-gray-400">
                {formatShortDate(activity.createdAt)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
