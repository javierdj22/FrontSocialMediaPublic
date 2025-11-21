import { useCallback, useMemo, useState } from 'react';
import { z } from 'zod';
import { useProductStore } from '../store/productStore';
import type { ProductDraft } from '../types/ProductDraft';
import { productDraftSchema } from '../utils/validators';

export const useProductDraft = () => {
  const draft = useProductStore((state) => state.draft);
  const updateField = useProductStore((state) => state.updateDraftField);
  const setDraft = useProductStore((state) => state.setDraft);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateDraft = useCallback(
    (data: ProductDraft = draft) => {
      try {
        productDraftSchema.parse(data);
        setErrors({});
        return { success: true as const, data };
      } catch (err) {
        if (err instanceof z.ZodError) {
          const nextErrors: Record<string, string> = {};
          err.issues.forEach((issue) => {
            const path = issue.path.join('.');
            nextErrors[path] = issue.message;
          });
          setErrors(nextErrors);
        }
        return { success: false as const, data: null };
      }
    },
    [draft],
  );

  const updateTags = useCallback(
    (value: string) => {
      // Split by comma and filter empty strings, preserving tags that may contain commas if quoted
      const tags = value
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean);
      updateField('tags', tags);
    },
    [updateField],
  );

  const helpers = useMemo(
    () => ({
      setDraft,
      updateField,
      updateTags,
      validateDraft,
      errors,
    }),
    [setDraft, updateField, updateTags, validateDraft, errors],
  );

  return { draft, ...helpers };
};

