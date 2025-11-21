import type { PublishChannel } from '../types/PublishRequest';
import type { PublishResult } from '../types/PublishResult';

const channelMeta: Record<
  PublishChannel,
  { label: string; color: string; gradient: string }
> = {
  facebook: {
    label: 'Facebook',
    color: 'text-blue-300',
    gradient: 'from-blue-600/60 to-blue-800/60',
  },
  instagram: {
    label: 'Instagram',
    color: 'text-pink-300',
    gradient: 'from-pink-500/60 to-fuchsia-600/60',
  },
  tiktok: {
    label: 'TikTok',
    color: 'text-teal-300',
    gradient: 'from-slate-900/80 to-slate-800/80',
  },
  pinterest: {
    label: 'Pinterest',
    color: 'text-rose-300',
    gradient: 'from-rose-600/70 to-rose-800/70',
  },
  whatsapp: {
    label: 'WhatsApp',
    color: 'text-emerald-300',
    gradient: 'from-emerald-600/60 to-emerald-800/60',
  },
};

interface PublishButtonsProps {
  onPublish: (channel: PublishChannel) => Promise<void>;
  results: Partial<Record<PublishChannel, PublishResult>>;
  isPublishing: boolean;
}

const PublishButtons = ({ onPublish, results, isPublishing }: PublishButtonsProps) => (
  <div className="grid gap-4 md:grid-cols-2">
    {(Object.keys(channelMeta) as PublishChannel[]).map((channel) => {
      const meta = channelMeta[channel];
      const result = results[channel];
      return (
        <button
          key={channel}
          type="button"
          disabled={isPublishing}
          onClick={() => onPublish(channel)}
          className={`rounded-3xl border border-slate-800 bg-gradient-to-br ${meta.gradient} p-5 text-left transition hover:-translate-y-0.5 hover:border-slate-700 disabled:cursor-not-allowed disabled:opacity-60`}
        >
          <p className={`text-lg font-semibold ${meta.color}`}>{meta.label}</p>
          <p className="text-sm text-slate-200">Publicar directamente en {meta.label}</p>
          {result && (
            <div className="mt-3 rounded-2xl bg-slate-900/60 px-4 py-2 text-xs">
              <p className="uppercase tracking-wide text-slate-400">
                {result.status === 'success' ? 'Publicado' : 'Error'}
              </p>
              <p className="text-slate-100">{result.message}</p>
            </div>
          )}
        </button>
      );
    })}
  </div>
);

export default PublishButtons;

