import type { PublishChannel } from './PublishRequest';

export type PublishStatus = 'pending' | 'success' | 'error';

export interface PublishResult {
  id: string;
  productId: string;
  channel: PublishChannel;
  status: PublishStatus;
  message: string;
  publishedAt: string;
}

