import { z } from 'zod';
import { PRODUCT_STYLES } from '../../../constants';

export const queryProductsSchema = z.object({
  style: z.enum(PRODUCT_STYLES).optional(),
  minPrice: z.coerce.number().int().min(0).optional(),
  maxPrice: z.coerce.number().int().min(0).optional(),
});

export type QueryProductsDto = z.infer<typeof queryProductsSchema>;
