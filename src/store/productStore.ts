import { create } from 'zustand';
import type { ProductDraft } from '../types/ProductDraft';
import type { PublishChannel } from '../types/PublishRequest';
import type { PublishResult } from '../types/PublishResult';

type FeedbackIntent = 'success' | 'error';

interface FeedbackState {
  intent: FeedbackIntent;
  message: string;
}

interface ProductStore {
  draft: ProductDraft;
  publishResults: Partial<Record<PublishChannel, PublishResult>>;
  history: PublishResult[];
  isLoading: boolean;
  feedback: FeedbackState | null;
  setDraft: (draft: ProductDraft) => void;
  updateDraftField: <K extends keyof ProductDraft>(field: K, value: ProductDraft[K]) => void;
  setLoading: (value: boolean) => void;
  setFeedback: (payload: FeedbackState | null) => void;
  recordPublishResult: (result: PublishResult) => void;
  setHistory: (items: PublishResult[]) => void;
  resetDraft: () => void;
}

const emptyDraft: ProductDraft = {
  title: '',
  description: '',
  price: 0,
  tags: [],
  brand: '',
  model: '',
};

export const useProductStore = create<ProductStore>((set) => ({
  draft: emptyDraft,
  publishResults: {},
  history: [],
  isLoading: false,
  feedback: null,
  setDraft: (draft) => set({ draft }),
  updateDraftField: (field, value) =>
    set((state) => ({ draft: { ...state.draft, [field]: value } })),
  setLoading: (value) => set({ isLoading: value }),
  setFeedback: (payload) => set({ feedback: payload }),
  recordPublishResult: (result) =>
    set((state) => ({
      publishResults: { ...state.publishResults, [result.channel]: result },
    })),
  setHistory: (items) => set({ history: items }),
  resetDraft: () => set({ draft: emptyDraft, publishResults: {} }),
}));

