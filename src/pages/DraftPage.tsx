import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ProductDraftEditor from '../components/ProductDraftEditor';
import PreviewCard from '../components/PreviewCard';
import ImageUpload from '../components/ImageUpload';
import { useProductDraft } from '../hooks/useProductDraft';
import { useProductStore } from '../store/productStore';
import { productApi } from '../services/productApi';
import type { ProductDraft } from '../types/ProductDraft';

const sampleProduct: ProductDraft = {
  title: 'Monkey D. Luffy Action Figure',
  brand: 'Gears Giant',
  model: 'One Piece',
  description:
    'The One Piece Monkey D. Luffy action figure is a collectible item inspired by the popular Japanese manga and anime series. The action figure showcases Monkey D. Luffy in his iconic straw hat, long sleeves with three buttons on each sleeve, and blue shorts. It is posed in dynamic action stance, capturing the adventurous spirit of the character. This figure is a great addition to any One Piece fan\'s collection.',
  price: 10,
  tags: ['One Piece', 'Action Figure', 'Monkey D. Luffy', 'Gears Giant', 'Collectible'],
};

const DraftPage = () => {
  const navigate = useNavigate();
  const { draft, validateDraft, setDraft } = useProductDraft();
  const setFeedback = useProductStore((state) => state.setFeedback);
  const setLoading = useProductStore((state) => state.setLoading);
  const [isSaving, setIsSaving] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);

  // Initialize draft with sample data if empty
  useEffect(() => {
    if (!hasInitialized && (!draft.title || draft.title === '')) {
      setDraft(sampleProduct);
      setHasInitialized(true);
    }
  }, [draft.title, hasInitialized, setDraft]);

  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      setLoading(true);
      const { imageUrl } = await productApi.uploadImage(formData);
      setDraft({ ...draft, imageUrl });
      setFeedback({
        intent: 'success',
        message: 'Imagen subida correctamente',
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'No pudimos subir la imagen';
      setFeedback({ intent: 'error', message });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDraft = async () => {
    const validation = validateDraft();
    if (!validation.success) {
      setFeedback({
        intent: 'error',
        message: 'Revisa el formulario antes de guardar.',
      });
      return;
    }

    try {
      setIsSaving(true);
      setLoading(true);
      const savedDraft = await productApi.saveDraft(draft);
      setDraft(savedDraft);
      setFeedback({
        intent: 'success',
        message: 'Borrador guardado correctamente',
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'No pudimos guardar el borrador';
      setFeedback({ intent: 'error', message });
    } finally {
      setIsSaving(false);
      setLoading(false);
    }
  };

  const handleContinue = () => {
    const validation = validateDraft();
    if (!validation.success) {
      setFeedback({
        intent: 'error',
        message: 'Revisa el formulario antes de continuar.',
      });
      return;
    }
    setFeedback({
      intent: 'success',
      message: 'Borrador listo. Ahora puedes publicar.',
    });
    navigate('/publish');
  };

  return (
    <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
      <div className="space-y-4 rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">Edita tu ficha</h2>
            <p className="text-sm text-slate-400">Pulimos el contenido antes de publicar.</p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              className="rounded-full bg-slate-600/80 px-4 py-2 text-sm font-semibold text-white shadow-card transition hover:bg-slate-500 disabled:opacity-50"
              onClick={handleSaveDraft}
              disabled={isSaving}
            >
              {isSaving ? 'Guardando...' : 'Guardar'}
            </button>
            <button
              type="button"
              className="rounded-full bg-sky-500/80 px-4 py-2 text-sm font-semibold text-white shadow-card transition hover:bg-sky-400"
              onClick={handleContinue}
            >
              Continuar
            </button>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-slate-400">Imagen del producto</label>
            <ImageUpload onUpload={handleImageUpload} currentImageUrl={draft.imageUrl} />
          </div>
          <ProductDraftEditor />
        </div>
      </div>
      <PreviewCard />
    </section>
  );
};

export default DraftPage;

