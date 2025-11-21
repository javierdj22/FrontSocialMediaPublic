export type ProductTag = string;

export interface ProductDraft {
  id?: string;
  imageUrl?: string;
  title: string;
  description: string;
  price: number;
  tags: ProductTag[];
  brand: string;
  model: string;
  lastAnalyzedAt?: string;
}


