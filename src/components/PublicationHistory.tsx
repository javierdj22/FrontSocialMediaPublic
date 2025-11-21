import type { PublishResult } from '../types/PublishResult';
import { formatDateTime } from '../utils/formatters';

interface PublicationHistoryProps {
  items: PublishResult[];
}

const statusColors = {
  success: 'text-emerald-300',
  pending: 'text-amber-300',
  error: 'text-rose-300',
};

const PublicationHistory = ({ items }: PublicationHistoryProps) => {
  if (!items.length) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 text-center text-slate-400">
        Aún no hay publicaciones.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={item.id}
          className="rounded-3xl border border-slate-800 bg-slate-900/50 p-4 backdrop-blur-card"
        >
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                {item.channel}
              </p>
              <p className="text-lg font-semibold text-white">{item.message}</p>
            </div>
            <div className="text-right text-sm text-slate-400">
              <p className={statusColors[item.status]}>Estado: {item.status}</p>
              <p>{formatDateTime(item.publishedAt)}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PublicationHistory;

