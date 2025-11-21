import { useProductStore } from '../store/productStore';

const intentStyles = {
  success: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/40',
  error: 'bg-rose-500/10 text-rose-300 border-rose-500/40',
};

const FeedbackBanner = () => {
  const feedback = useProductStore((state) => state.feedback);
  const setFeedback = useProductStore((state) => state.setFeedback);

  if (!feedback) {
    return null;
  }

  return (
    <div
      className={`rounded-2xl border px-4 py-3 text-sm shadow-card transition ${intentStyles[feedback.intent]}`}
      role="alert"
    >
      <div className="flex items-start justify-between gap-3">
        <p>{feedback.message}</p>
        <button
          type="button"
          className="text-xs uppercase tracking-wider text-slate-400 hover:text-white"
          onClick={() => setFeedback(null)}
        >
          cerrar
        </button>
      </div>
    </div>
  );
};

export default FeedbackBanner;


