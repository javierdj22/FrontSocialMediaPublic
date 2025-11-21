import { useProductDraft } from '../hooks/useProductDraft';
import { formatCurrency } from '../utils/formatters';

const PreviewCard = () => {
  const { draft } = useProductDraft();

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 shadow-card">
      <div className="flex gap-5">
        <div className="hidden h-36 w-36 flex-shrink-0 overflow-hidden rounded-2xl bg-slate-800/60 sm:block">
          {draft.imageUrl ? (
            <img
              src={draft.imageUrl}
              alt={draft.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-slate-600">
              Sin imagen
            </div>
          )}
        </div>
        <div className="space-y-3">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
              Previsualización
            </p>
            <h3 className="text-xl font-semibold text-white">{draft.title || 'Producto'}</h3>
          </div>
          <p className="text-sm text-slate-300">{draft.description || 'Añade una descripción'}</p>
          <div className="flex flex-wrap gap-2 text-xs uppercase tracking-wide text-slate-400">
            <span className="rounded-full bg-slate-800/80 px-3 py-1">
              {draft.brand || 'Marca'}
            </span>
            <span className="rounded-full bg-slate-800/80 px-3 py-1">
              {draft.model || 'Modelo'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-3xl font-bold text-white">
              {draft.price ? formatCurrency(draft.price) : 'S/ 0.00'}
            </p>
            <div className="flex flex-wrap gap-2 text-xs text-sky-300">
              {draft.tags.length
                ? draft.tags.map((tag: string) => (
                    <span key={tag} className="rounded-full bg-sky-500/10 px-3 py-1">
                      #{tag}
                    </span>
                  ))
                : 'Añade tags para mejorar el alcance.'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewCard;

