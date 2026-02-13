import { z } from 'zod';
import { LEAD_STATUSES } from '../../../constants';

export const updateLeadStatusSchema = z.object({
  status: z.enum(LEAD_STATUSES, {
    errorMap: () => ({ message: `Status must be one of: ${LEAD_STATUSES.join(', ')}` }),
  }),
});

export type UpdateLeadStatusDto = z.infer<typeof updateLeadStatusSchema>;
