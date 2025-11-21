import { useApi } from '../hooks/useApi';
import type { ProductDraft } from '../types/ProductDraft';

interface AnalyzeResponse {
  product: ProductDraft;
}

export const productApi = {
  async analyzeImage(formData: FormData): Promise<ProductDraft> {
    const api = useApi();
    const { data } = await api.post<AnalyzeResponse>('/product/analyze', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data.product;
  },
  async getProduct(id: string): Promise<ProductDraft> {
    const api = useApi();
    const { data } = await api.get<ProductDraft>(`/product/${id}`);
    return data;
  },
  async listProducts(): Promise<ProductDraft[]> {
    const api = useApi();
    const { data } = await api.get<ProductDraft[]>('/product');
    return data;
  },
  async saveDraft(draft: ProductDraft): Promise<ProductDraft> {
    const api = useApi();
    try {
      if (draft.id) {
        const { data } = await api.put<ProductDraft>(`/product/draft/${draft.id}`, draft);
        return data;
      } else {
        const { data } = await api.post<ProductDraft>('/product/draft', draft);
        return data;
      }
    } catch (error: any) {
      // If endpoint doesn't exist, return the draft as-is (client-side only)
      if (error?.response?.status === 404) {
        console.warn('Save draft endpoint not available, saving locally only');
        return draft;
      }
      throw error;
    }
  },
  async uploadImage(formData: FormData): Promise<{ imageUrl: string }> {
    const api = useApi();
    try {
      const { data } = await api.post<{ imageUrl: string }>('/product/upload-image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return data;
    } catch (error: any) {
      // If endpoint doesn't exist, create a local blob URL
      if (error?.response?.status === 404) {
        const file = formData.get('image') as File;
        if (file) {
          const imageUrl = URL.createObjectURL(file);
          console.warn('Upload image endpoint not available, using local blob URL');
          return { imageUrl };
        }
      }
      throw error;
    }
  },
};

