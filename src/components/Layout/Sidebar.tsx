import { LayoutDashboard, Users, TrendingUp, CheckSquare } from 'lucide-react';
import type { ViewType } from '../../types';

interface SidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const menuItems = [
  { id: 'dashboard' as ViewType, label: 'Dashboard', icon: LayoutDashboard },
  { id: 'contacts' as ViewType, label: 'Contactos', icon: Users },
  { id: 'deals' as ViewType, label: 'Oportunidades', icon: TrendingUp },
  { id: 'activities' as ViewType, label: 'Actividades', icon: CheckSquare },
];

export function Sidebar({ currentView, onViewChange }: SidebarProps) {
  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-primary-600">CRM Ventas</h1>
        <p className="text-sm text-gray-500 mt-1">Sistema de Gestión</p>
      </div>

      <nav className="mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center gap-3 px-6 py-3 text-left transition-colors ${
                isActive
                  ? 'bg-primary-50 text-primary-700 border-r-4 border-primary-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
        <div className="text-xs text-gray-500">
          <p>Versión 1.0.0</p>
          <p className="mt-1">© 2024 CRM Ventas</p>
        </div>
      </div>
    </div>
  );
}
