import { useState } from 'react';
import PublishButtons from '../components/PublishButtons';
import { useProductDraft } from '../hooks/useProductDraft';
import { publishApi } from '../services/publishApi';
import { useProductStore } from '../store/productStore';
import type { PublishChannel } from '../types/PublishRequest';

const PublishPage = () => {
  const { draft, validateDraft } = useProductDraft();
  const publishResults = useProductStore((state) => state.publishResults);
  const recordPublishResult = useProductStore((state) => state.recordPublishResult);
  const setLoading = useProductStore((state) => state.setLoading);
  const setFeedback = useProductStore((state) => state.setFeedback);
  const [currentChannel, setCurrentChannel] = useState<PublishChannel | null>(null);

  const handlePublish = async (channel: PublishChannel) => {
    const validation = validateDraft();
    if (!validation.success) {
      setFeedback({
        intent: 'error',
        message: 'Necesitamos un borrador válido para publicar.',
      });
      return;
    }

    const productId = draft.id ?? crypto.randomUUID();

    try {
      setCurrentChannel(channel);
      setLoading(true);
      const result = await publishApi.publish({
        productId,
        channel,
        payload: {
          title: draft.title,
          description: draft.description,
          price: draft.price,
          tags: draft.tags,
          mediaUrl: draft.imageUrl,
        },
      });
      recordPublishResult(result);
      setFeedback({
        intent: 'success',
        message: `Publicado en ${channel}.`,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'No pudimos publicar';
      setFeedback({ intent: 'error', message });
    } finally {
      setCurrentChannel(null);
      setLoading(false);
    }
  };

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
        <h2 className="text-xl font-semibold text-white">Publica en redes</h2>
        <p className="text-sm text-slate-400">
          Selecciona una red para publicar el contenido optimizado con un clic.
        </p>
      </div>
      <PublishButtons
        onPublish={handlePublish}
        results={publishResults}
        isPublishing={Boolean(currentChannel)}
      />
    </section>
  );
};

export default PublishPage;

