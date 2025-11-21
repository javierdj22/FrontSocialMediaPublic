import { useApi } from '../hooks/useApi';
import type { PublishRequest } from '../types/PublishRequest';
import type { PublishResult } from '../types/PublishResult';

export const publishApi = {
  async publish(payload: PublishRequest): Promise<PublishResult> {
    const api = useApi();
    const { data } = await api.post<PublishResult>('/product/publish', payload);
    return data;
  },
  async getHistory(): Promise<PublishResult[]> {
    const api = useApi();
    const { data } = await api.get<PublishResult[]>('/publication/history');
    return data;
  },
};

