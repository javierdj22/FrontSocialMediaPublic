import { useEffect } from 'react';
import PublicationHistory from '../components/PublicationHistory';
import { publishApi } from '../services/publishApi';
import { useProductStore } from '../store/productStore';

const HistoryPage = () => {
  const history = useProductStore((state) => state.history);
  const setHistory = useProductStore((state) => state.setHistory);
  const setLoading = useProductStore((state) => state.setLoading);
  const setFeedback = useProductStore((state) => state.setFeedback);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const records = await publishApi.getHistory();
        setHistory(records);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'No pudimos recuperar el historial';
        setFeedback({ intent: 'error', message });
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [setFeedback, setHistory, setLoading]);

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
        <h2 className="text-xl font-semibold text-white">Historial</h2>
        <p className="text-sm text-slate-400">
          Seguimiento de publicaciones previas y su estado en cada red social.
        </p>
      </div>
      <PublicationHistory items={history} />
    </section>
  );
};

export default HistoryPage;


