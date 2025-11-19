import { Deal, Contact, DealStage } from '../../types';
import { Building, Calendar, TrendingUp, Edit, Trash2, Package } from 'lucide-react';
import { formatCurrency, formatShortDate } from '../../utils/helpers';

interface DealCardProps {
  deal: Deal;
  contact?: Contact;
  onEdit: (deal: Deal) => void;
  onDelete: (id: string) => void;
}

const stageConfig: Record<DealStage, { label: string; color: string }> = {
  lead: { label: 'Lead', color: 'bg-gray-100 text-gray-700' },
  qualified: { label: 'Calificado', color: 'bg-blue-100 text-blue-700' },
  proposal: { label: 'Propuesta', color: 'bg-purple-100 text-purple-700' },
  negotiation: { label: 'Negociación', color: 'bg-orange-100 text-orange-700' },
  'closed-won': { label: 'Ganada', color: 'bg-green-100 text-green-700' },
  'closed-lost': { label: 'Perdida', color: 'bg-red-100 text-red-700' },
};

export function DealCard({ deal, contact, onEdit, onDelete }: DealCardProps) {
  const stage = stageConfig[deal.stage];

  return (
    <div className="card hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-900 mb-1">{deal.title}</h3>
          <span className={`badge ${stage.color}`}>{stage.label}</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(deal)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Editar"
          >
            <Edit size={16} className="text-gray-600" />
          </button>
          <button
            onClick={() => onDelete(deal.id)}
            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
            title="Eliminar"
          >
            <Trash2 size={16} className="text-red-600" />
          </button>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary-600">
            {formatCurrency(deal.value)}
          </span>
          <span className="text-sm text-gray-500">{deal.probability}% prob.</span>
        </div>

        {contact && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Building size={14} />
            <span>
              {contact.name} - {contact.company}
            </span>
          </div>
        )}

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar size={14} />
          <span>Cierre esperado: {formatShortDate(deal.expectedCloseDate)}</span>
        </div>

        {deal.products && deal.products.length > 0 && (
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <Package size={14} className="mt-0.5" />
            <div className="flex flex-wrap gap-1">
              {deal.products.map((product) => (
                <span key={product} className="badge bg-gray-100 text-gray-700">
                  {product}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {deal.notes && (
        <div className="pt-3 border-t border-gray-200">
          <p className="text-sm text-gray-600 line-clamp-2">{deal.notes}</p>
        </div>
      )}

      {/* Probability bar */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
          <span>Probabilidad de cierre</span>
          <span>{deal.probability}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${deal.probability}%` }}
          />
        </div>
      </div>
    </div>
  );
}
