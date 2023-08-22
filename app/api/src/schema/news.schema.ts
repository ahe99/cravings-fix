import { z } from 'zod'

import { POLICY, NewsModel } from '../models/news.model'

export const GetNewsRequestSchema = z.object({
  query: z
    .object({
      name: z.string().max(20),
      limit: z.string().regex(/^\d+$/).default('20'),
      offset: z.string().regex(/^\d+$/).default('0'),
    })
    .partial(),
})

export const GetSingleNewsRequestSchema = z.object({
  params: z.object({
    id: z.string().refine(
      async (_id) => {
        const count = await NewsModel.find({ _id }).count()
        return count !== 0
      },
      {
        message: 'NEWS_NOT_FOUND',
      },
    ),
  }),
})

export const PostNewsCreateSchema = z.object({
  body: z.object({
    title: z.string(),
    description: z.string().default(''),
    content: z.string().optional().default(''),
    policy: z.string().refine(
      (role) => {
        const hasRole =
          Object.keys(POLICY).findIndex((_role) => role === _role) !== -1
        return hasRole
      },
      {
        message: 'ROLE_NOT_FOUND',
      },
    ),
  }),
})
export const PatchNewsRequestSchema = z.object({
  params: z.object({
    id: z.string().refine(
      async (_id) => {
        const count = await NewsModel.find({ _id }).count().exec()
        return count !== 0
      },
      {
        message: 'NEWS_NOT_FOUND',
      },
    ),
  }),
  body: z
    .object({
      title: z.string(),
      description: z.string().default(''),
      content: z.string().optional().default(''),
      policy: z.string().refine(
        (role) => {
          const hasRole =
            Object.keys(POLICY).findIndex((_role) => role === _role) !== -1
          return hasRole
        },
        {
          message: 'ROLE_NOT_FOUND',
        },
      ),
    })
    .partial()
    .refine((body) => !(Object.keys(body).length === 0), {
      message: 'CANNOT_UPDATE_WITH_EMPTY_OBJECT',
    }),
})
export const DeleteNewsRequestSchema = z.object({
  params: z.object({
    id: z.string().refine(
      async (_id) => {
        const count = await NewsModel.find({ _id }).count()
        return count !== 0
      },
      {
        message: 'NEWS_NOT_FOUND',
      },
    ),
  }),
})
