import { z } from 'zod'

import { CategoryModel } from '../models/category'

export const GetCategoriesRequestSchema = z.object({
  query: z
    .object({
      name: z.string().max(20),
      limit: z.string().regex(/^\d+$/).default('20'),
      offset: z.string().regex(/^\d+$/).default('0'),
    })
    .partial(),
})

export const GetCategoryRequestSchema = z.object({
  params: z.object({
    id: z.string().refine(
      async (_id) => {
        const count = await CategoryModel.find({ _id }).count()
        return count !== 0
      },
      {
        message: 'CATEGORY_NOT_FOUND',
      },
    ),
  }),
})

export const PostCategoryCreateSchema = z.object({
  body: z.object({
    name: z.string().max(20),
    description: z.string().optional(),
    price: z.number().min(0).default(0),
    stockQuantity: z.number().min(0).default(0).optional(),
    // categoryId: z
    //   .string()
    //   .refine(async (categoryId) => {}, {
    //     message: 'CATEGORY_NOT_FOUND',
    //   })
    //   .optional(),
  }),
})
export const PatchCategoryRequestSchema = z.object({
  params: z.object({
    id: z.string().refine(
      async (_id) => {
        const count = await CategoryModel.find({ _id }).count().exec()
        return count !== 0
      },
      {
        message: 'CATEGORY_NOT_FOUND',
      },
    ),
  }),
  body: z
    .object({
      name: z.string().max(20),
      description: z.string(),
      price: z.number().min(0),
      stockQuantity: z.number().min(0),
      // categoryId: z.string().refine((categoryId) => async (id) => {}, {
      //   message: 'CATEGORY_NOT_FOUND',
      // }),
    })
    .partial()
    .refine((body) => !(Object.keys(body).length === 0), {
      message: 'CANNOT_UPDATE_WITH_EMPTY_OBJECT',
    }),
})
export const DeleteCategoryRequestSchema = z.object({
  params: z.object({
    id: z.string().refine(
      async (_id) => {
        const count = await CategoryModel.find({ _id }).count()
        return count !== 0
      },
      {
        message: 'CATEGORY_NOT_FOUND',
      },
    ),
  }),
})
