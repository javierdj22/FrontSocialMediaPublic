import type { ChangeEvent } from 'react';
import { useProductDraft } from '../hooks/useProductDraft';

const inputClasses =
  'w-full rounded-2xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20';

const ProductDraftEditor = () => {
  const { draft, updateField, updateTags, errors } = useProductDraft();

  const handleChange =
    (field: keyof typeof draft) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (field === 'price') {
        updateField(field, Number(event.target.value));
        return;
      }
      updateField(field, event.target.value);
    };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm text-slate-400">Título</label>
        <input
          className={inputClasses}
          placeholder="Nombre del producto"
          value={draft.title}
          onChange={handleChange('title')}
        />
        {errors.title && <p className="text-sm text-rose-300">{errors.title}</p>}
      </div>
      <div>
        <label className="text-sm text-slate-400">Descripción</label>
        <textarea
          className={`${inputClasses} min-h-[120px]`}
          placeholder="Descripción atractiva del producto"
          value={draft.description}
          onChange={handleChange('description')}
        />
        {errors.description && <p className="text-sm text-rose-300">{errors.description}</p>}
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label className="text-sm text-slate-400">Precio (S/.)</label>
          <input
            type="number"
            min="0"
            step="0.01"
            className={inputClasses}
            value={draft.price}
            onChange={handleChange('price')}
          />
          {errors.price && <p className="text-sm text-rose-300">{errors.price}</p>}
        </div>
        <div>
          <label className="text-sm text-slate-400">Marca</label>
          <input
            className={inputClasses}
            value={draft.brand}
            onChange={handleChange('brand')}
          />
          {errors.brand && <p className="text-sm text-rose-300">{errors.brand}</p>}
        </div>
        <div>
          <label className="text-sm text-slate-400">Modelo</label>
          <input
            className={inputClasses}
            value={draft.model}
            onChange={handleChange('model')}
          />
          {errors.model && <p className="text-sm text-rose-300">{errors.model}</p>}
        </div>
      </div>
      <div>
        <label className="text-sm text-slate-400">Tags</label>
        <input
          className={inputClasses}
          placeholder="separa, por, comas"
          value={draft.tags.join(', ')}
          onChange={(event) => updateTags(event.target.value)}
        />
        <p className="mt-1 text-xs text-slate-500">
          Separa los tags con comas. Ejemplo: One Piece, Action Figure, Collectible
        </p>
        {errors.tags && <p className="text-sm text-rose-300">{errors.tags}</p>}
      </div>
    </div>
  );
};

export default ProductDraftEditor;

