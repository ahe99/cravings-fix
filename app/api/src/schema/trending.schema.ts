import { z } from 'zod'

export const GetTrendinItemsRequestSchema = z.object({
  query: z
    .object({
      limit: z.string().regex(/^\d+$/).default('20'),
      offset: z.string().regex(/^\d+$/).default('0'),
    })
    .partial(),
})
