import { z } from 'zod'

import { FoodModel } from '../models/food.model'
import { CategoryModel } from '../models/category.model'

// import { isObjectExisting } from '../lib/minio.lib'

export const GetFoodsRequestSchema = z.object({
  query: z
    .object({
      name: z.string().max(20),
      limit: z.string().regex(/^\d+$/).default('20'),
      offset: z.string().regex(/^\d+$/).default('0'),
    })
    .partial(),
})

export const GetFoodRequestSchema = z.object({
  params: z.object({
    id: z.string().refine(
      async (_id) => {
        const count = await FoodModel.find({ _id }).count()
        return count !== 0
      },
      {
        message: 'FOOD_NOT_FOUND',
      },
    ),
  }),
})

export const PostFoodCreateSchema = z.object({
  body: z.object({
    name: z.string().max(20),
    description: z.string().optional(),
    price: z.number().min(0).default(0),
    stockQuantity: z.number().min(0).default(0),
    category: z
      .string()
      .refine(
        async (category) => {
          const count = await CategoryModel.find({ _id: category }).count()
          return count !== 0
        },
        {
          message: 'CATEGORY_NOT_FOUND',
        },
      )
      .optional(),
  }),
})
export const PatchFoodRequestSchema = z.object({
  params: z.object({
    id: z.string().refine(
      async (_id) => {
        const count = await FoodModel.find({ _id }).count().exec()
        return count !== 0
      },
      {
        message: 'FOOD_NOT_FOUND',
      },
    ),
  }),
  body: z
    .object({
      name: z.string().max(20),
      description: z.string(),
      price: z.number().min(0),
      stockQuantity: z.number().min(0),
      category: z.string().refine(
        async (category) => {
          const count = await CategoryModel.find({ _id: category }).count()
          return count !== 0
        },
        {
          message: 'CATEGORY_NOT_FOUND',
        },
      ),
    })
    .partial()
    .refine((body) => !(Object.keys(body).length === 0), {
      message: 'CANNOT_UPDATE_WITH_EMPTY_OBJECT',
    }),
})
export const DeleteFoodRequestSchema = z.object({
  params: z.object({
    id: z.string().refine(
      async (_id) => {
        const count = await FoodModel.find({ _id }).count()
        return count !== 0
      },
      {
        message: 'FOOD_NOT_FOUND',
      },
    ),
  }),
})

export const DeleteFoodImageRequestSchema = z.object({
  params: z.object({
    id: z.string().refine(
      async (_id) => {
        const count = await FoodModel.find({ _id }).count()
        return count !== 0
      },
      {
        message: 'FOOD_NOT_FOUND',
      },
    ),
    imageId: z.string(),

    //   .refine(
    //   async (_id) => {
    //     return await isObjectExisting({ bucket: 'food-images', object: _id })
    //   },
    //   {
    //     message: 'IMAGE_NOT_FOUND',
    //   },
    // ),
  }),
})
