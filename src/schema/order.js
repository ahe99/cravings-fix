const { z } = require('zod')
const Parse = require('parse/node')
const Order = Parse.Object.extend('Order')
const Food = Parse.Object.extend('Food')
const OrderQuery = new Parse.Query(Order)
const FoodQuery = new Parse.Query(Food)

module.exports = {
  GetOrdersRequestSchema: z.object({
    query: z
      .object({
        name: z.string().max(20),
        limit: z.string().regex(/^\d+$/),
        offset: z.string().regex(/^\d+$/),
      })
      .partial(),
  }),
  GetOrderRequestSchema: z.object({
    params: z.object({
      id: z.string().refine(
        async (id) => {
          const count = await Promise.resolve(
            OrderQuery.equalTo('objectId', id).count(),
          )
          return count !== 0
        },
        {
          message: 'ORDER_NOT_FOUND',
        },
      ),
    }),
  }),
  PostOrderCreateSchema: z.object({
    body: z.object({
      foods: z.array().refine(
        async (foods) => {
          return await Promise.all(
            foods.map((foodId) => FoodQuery.equalTo('objectId', foodId)),
          )
        },
        {
          message: 'FOOD_NOT_FOUND',
        },
      ),
    }),
  }),
  PatchOrderRequestSchema: z.object({
    params: z.object({
      id: z.string().refine(
        async (id) => {
          const count = await Promise.resolve(
            OrderQuery.equalTo('objectId', id).count(),
          )
          return count !== 0
        },
        {
          message: 'ORDER_NOT_FOUND',
        },
      ),
    }),
    body: z.object({
      foods: z.array().refine(
        async (foods) => {
          return await Promise.all(
            foods.map((foodId) => FoodQuery.equalTo('objectId', foodId)),
          )
        },
        {
          message: 'FOOD_NOT_FOUND',
        },
      ),
    }),
  }),
  DeleteOrderRequestSchema: z.object({
    params: z.object({
      id: z.string().refine(
        async (id) => {
          const count = await Promise.resolve(
            OrderQuery.equalTo('objectId', id).count(),
          )
          return count !== 0
        },
        {
          message: 'ORDER_NOT_FOUND',
        },
      ),
    }),
  }),
}
