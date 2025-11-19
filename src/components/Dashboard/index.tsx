import { Contact, Deal, Activity, DashboardMetrics } from '../../types';
import { MetricCard } from './MetricCard';
import { RecentActivity } from './RecentActivity';
import { DealsPipeline } from './DealsPipeline';
import { UpcomingTasks } from './UpcomingTasks';
import { Users, TrendingUp, DollarSign, Target, CheckCircle } from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';

interface DashboardProps {
  contacts: Contact[];
  deals: Deal[];
  activities: Activity[];
}

export function Dashboard({ contacts, deals, activities }: DashboardProps) {
  const metrics: DashboardMetrics = {
    totalContacts: contacts.length,
    totalDeals: deals.length,
    totalRevenue: deals
      .filter((d) => d.stage === 'closed-won')
      .reduce((sum, deal) => sum + deal.value, 0),
    wonDeals: deals.filter((d) => d.stage === 'closed-won').length,
    lostDeals: deals.filter((d) => d.stage === 'closed-lost').length,
    activeDeals: deals.filter((d) => !['closed-won', 'closed-lost'].includes(d.stage)).length,
    pendingActivities: activities.filter((a) => a.status === 'pending').length,
    completedActivitiesThisWeek: activities.filter((a) => {
      if (!a.completedAt) return false;
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return new Date(a.completedAt) > weekAgo;
    }).length,
    averageDealValue:
      deals.length > 0 ? deals.reduce((sum, deal) => sum + deal.value, 0) / deals.length : 0,
    conversionRate:
      deals.length > 0 ? (metrics.wonDeals / deals.length) * 100 : 0,
  };

  return (
    <div className="space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Contactos"
          value={metrics.totalContacts}
          icon={Users}
          color="blue"
          trend={{ value: 12, isPositive: true }}
        />
        <MetricCard
          title="Oportunidades Activas"
          value={metrics.activeDeals}
          icon={TrendingUp}
          color="purple"
        />
        <MetricCard
          title="Ingresos Cerrados"
          value={formatCurrency(metrics.totalRevenue)}
          icon={DollarSign}
          color="green"
          trend={{ value: 8, isPositive: true }}
        />
        <MetricCard
          title="Tareas Pendientes"
          value={metrics.pendingActivities}
          icon={CheckCircle}
          color="orange"
        />
      </div>

      {/* Second Row Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="Tasa de Conversión"
          value={`${metrics.conversionRate.toFixed(1)}%`}
          icon={Target}
          color="green"
        />
        <MetricCard
          title="Valor Promedio"
          value={formatCurrency(metrics.averageDealValue)}
          icon={DollarSign}
          color="blue"
        />
        <MetricCard
          title="Cerradas (Ganadas)"
          value={metrics.wonDeals}
          icon={CheckCircle}
          color="green"
        />
      </div>

      {/* Charts and Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DealsPipeline deals={deals} />
        <UpcomingTasks activities={activities} contacts={contacts} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <RecentActivity activities={activities} contacts={contacts} />
      </div>
    </div>
  );
}
