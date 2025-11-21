import { z } from 'zod';

export const productDraftSchema = z.object({
  id: z.string().optional(),
  imageUrl: z.string().url().optional(),
  title: z.string().min(3, 'El título es obligatorio'),
  description: z.string().min(10, 'Describe el producto'),
  price: z.number().nonnegative('Precio inválido'),
  tags: z.array(z.string()).min(1, 'Agrega al menos un tag'),
  brand: z.string().min(2, 'La marca es obligatoria'),
  model: z.string().min(1, 'El modelo es obligatorio'),
  lastAnalyzedAt: z.string().optional(),
});

export const publishRequestSchema = z.object({
  productId: z.string().min(1),
  channel: z.enum(['facebook', 'instagram', 'tiktok', 'pinterest', 'whatsapp']),
  payload: z.object({
    title: z.string(),
    description: z.string(),
    price: z.number(),
    tags: z.array(z.string()),
    mediaUrl: z.string().optional(),
  }),
});

export type ProductDraftValidation = z.infer<typeof productDraftSchema>;


