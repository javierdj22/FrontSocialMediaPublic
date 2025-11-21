import { NavLink, Route, Routes } from 'react-router-dom';
import UploadPage from './pages/UploadPage';
import DraftPage from './pages/DraftPage';
import PublishPage from './pages/PublishPage';
import HistoryPage from './pages/HistoryPage';
import GlobalSpinner from './components/GlobalSpinner';
import FeedbackBanner from './components/FeedbackBanner';

const navItems = [
  { path: '/', label: 'Subir', exact: true },
  { path: '/draft', label: 'Borrador' },
  { path: '/publish', label: 'Publicar' },
  { path: '/history', label: 'Historial' },
];

const App = () => (
  <div className="min-h-screen bg-slate-950 text-slate-100">
    <div className="app-gradient min-h-screen">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-6 px-4 py-6">
        <header className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-card">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Social Commerce Studio
              </p>
              <h1 className="mt-1 text-2xl font-semibold text-white md:text-3xl">
                Publicador omnicanal
              </h1>
            </div>
            <nav className="flex flex-wrap gap-2 text-sm">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    [
                      'rounded-full border px-4 py-2 transition',
                      isActive
                        ? 'border-sky-400 bg-sky-500/20 text-white shadow-[0_0_20px_rgba(56,189,248,0.35)]'
                        : 'border-transparent bg-slate-800/70 text-slate-300 hover:border-slate-600',
                    ].join(' ')
                  }
                  end={item.exact}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </header>

        <FeedbackBanner />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<UploadPage />} />
            <Route path="/draft" element={<DraftPage />} />
            <Route path="/publish" element={<PublishPage />} />
            <Route path="/history" element={<HistoryPage />} />
          </Routes>
        </main>
      </div>
    </div>
    <GlobalSpinner />
  </div>
);

export default App;


