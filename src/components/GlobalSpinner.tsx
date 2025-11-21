import { useProductStore } from '../store/productStore';

const GlobalSpinner = () => {
  const isLoading = useProductStore((state) => state.isLoading);

  if (!isLoading) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-slate-700 border-t-sky-400" />
    </div>
  );
};

export default GlobalSpinner;


