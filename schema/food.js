const { z } = require('zod')
const Parse = require('parse/node')
const Food = Parse.Object.extend('Food')
const Category = Parse.Object.extend('Category')
const foodQuery = new Parse.Query(Food)
const categoryQuery = new Parse.Query(Category)

module.exports = {
  GetFoodsRequestSchema: z.object({
    query: z
      .object({
        name: z.string().max(20),
        limit: z.string().regex(/^\d+$/),
        offset: z.string().regex(/^\d+$/),
      })
      .partial(),
  }),
  GetFoodRequestSchema: z.object({
    params: z.object({
      id: z.string().refine(
        async (id) => {
          const count = await Promise.resolve(
            foodQuery.equalTo('objectId', id).count()
          )
          return count !== 0
        },
        {
          message: 'FOOD_NOT_FOUND',
        }
      ),
    }),
  }),

  PostProductCreateSchema: z.object({
    body: z.object({
      name: z.string().max(20),
      description: z.string().optional(),
      price: z.number().min(0),
      stock_quantity: z.number().min(0),
      category_id: z.string().refine(
        (category_id) => async (id) => {
          const count = await Promise.resolve(
            categoryQuery.equalTo('objectId', category_id).count()
          )
          return count !== 0
        },
        {
          message: 'CATEGORY_NOT_FOUND',
        }
      ),
    }),
  }),
  PatchProductRequestSchema: z.object({
    params: z.object({
      id: z.string().refine(
        async (id) => {
          const count = await Promise.resolve(
            foodQuery.equalTo('objectId', id).count()
          )
          return count !== 0
        },
        {
          message: 'FOOD_NOT_FOUND',
        }
      ),
    }),
    body: z
      .object({
        name: z.string().max(20),
        description: z.string().optional(),
        price: z.number().min(0),
        stock_quantity: z.number().min(0),
        category_id: z.string().refine(
          (category_id) => async (id) => {
            const count = await Promise.resolve(
              categoryQuery.equalTo('objectId', category_id).count()
            )
            return count !== 0
          },
          {
            message: 'CATEGORY_NOT_FOUND',
          }
        ),
      })
      .partial()
      .refine((body) => !(Object.keys(body).length === 0), {
        message: 'CANNOT_UPDATE_WITH_EMPTY_OBJECT',
      }),
  }),
  DeleteProductRequestSchema: z.object({
    params: z.object({
      id: z
        .string()
        .refine((id) => foodQuery.exists({ where: { objectId: id } }), {
          message: 'FOOD_NOT_FOUND',
        }),
    }),
  }),
}
