import { z } from 'zod';
import { INTEREST_TYPES } from '../../../constants';

export const createLeadSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(255, 'Full name must not exceed 255 characters'),
  email: z
    .string()
    .email('Invalid email address')
    .max(255),
  phone: z
    .string()
    .min(7, 'Phone number must be at least 7 characters')
    .max(50, 'Phone number must not exceed 50 characters'),
  interestType: z.enum(INTEREST_TYPES, {
    errorMap: () => ({ message: `Interest type must be one of: ${INTEREST_TYPES.join(', ')}` }),
  }),
  message: z
    .string()
    .max(2000, 'Message must not exceed 2000 characters')
    .optional()
    .nullable(),
});

export type CreateLeadDto = z.infer<typeof createLeadSchema>;
