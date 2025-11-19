import { Deal } from '../../types';
import { formatCurrency } from '../../utils/helpers';

interface DealsPipelineProps {
  deals: Deal[];
}

const stages = [
  { id: 'lead', label: 'Lead', color: 'bg-gray-400' },
  { id: 'qualified', label: 'Calificado', color: 'bg-blue-400' },
  { id: 'proposal', label: 'Propuesta', color: 'bg-purple-400' },
  { id: 'negotiation', label: 'Negociación', color: 'bg-orange-400' },
  { id: 'closed-won', label: 'Ganada', color: 'bg-green-400' },
];

export function DealsPipeline({ deals }: DealsPipelineProps) {
  const getDealsInStage = (stageId: string) => {
    return deals.filter((d) => d.stage === stageId);
  };

  const getTotalValue = (stageId: string) => {
    return getDealsInStage(stageId).reduce((sum, deal) => sum + deal.value, 0);
  };

  const maxDeals = Math.max(...stages.map((s) => getDealsInStage(s.id).length), 1);

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Pipeline de Ventas</h3>
      <div className="space-y-4">
        {stages.map((stage) => {
          const dealsCount = getDealsInStage(stage.id).length;
          const totalValue = getTotalValue(stage.id);
          const percentage = (dealsCount / maxDeals) * 100;

          return (
            <div key={stage.id}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">{stage.label}</span>
                <div className="text-right">
                  <span className="text-sm font-semibold text-gray-900">{dealsCount}</span>
                  <span className="text-xs text-gray-500 ml-2">
                    {totalValue > 0 ? formatCurrency(totalValue) : '-'}
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`${stage.color} h-2 rounded-full transition-all duration-300`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
