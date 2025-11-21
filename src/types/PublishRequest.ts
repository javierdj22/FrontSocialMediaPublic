import type { ProductDraft } from './ProductDraft';

export type PublishChannel =
  | 'facebook'
  | 'instagram'
  | 'tiktok'
  | 'pinterest'
  | 'whatsapp';

export interface PublishRequest {
  productId: string;
  channel: PublishChannel;
  payload: {
    title: string;
    description: string;
    price: number;
    tags: string[];
    mediaUrl?: string;
  };
}

export interface PublishPayload extends PublishRequest {
  draft: ProductDraft;
}

