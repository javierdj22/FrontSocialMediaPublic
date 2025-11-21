import { useNavigate } from 'react-router-dom';
import ImageUpload from '../components/ImageUpload';
import { productApi } from '../services/productApi';
import { useProductStore } from '../store/productStore';

const UploadPage = () => {
  const navigate = useNavigate();
  const setDraft = useProductStore((state) => state.setDraft);
  const setLoading = useProductStore((state) => state.setLoading);
  const setFeedback = useProductStore((state) => state.setFeedback);

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      setLoading(true);
      const product = await productApi.analyzeImage(formData);
      setDraft(product);
      setFeedback({
        intent: 'success',
        message: 'Hemos generado un borrador a partir de la imagen 💡',
      });
      navigate('/draft');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'No pudimos analizar la imagen';
      setFeedback({ intent: 'error', message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
        <h2 className="text-xl font-semibold text-white">Analiza tu producto</h2>
        <p className="text-sm text-slate-400">
          Subimos la imagen, extraemos atributos y preparamos un borrador editable listo para
          publicar.
        </p>
      </div>
      <ImageUpload onUpload={handleUpload} />
    </section>
  );
};

export default UploadPage;


