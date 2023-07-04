const { z } = require('zod')
const Parse = require('parse/node')
const Order = Parse.Object.extend('Order')
const Food = Parse.Object.extend('Food')
const OrderQuery = new Parse.Query(Order)
const FoodQuery = new Parse.Query(Food)
const User = new Parse.User()
const UserQuery = new Parse.Query(User)

module.exports = {
  GetOrdersRequestSchema: z.object({
    query: z
      .object({
        name: z.string().max(20),
        limit: z.string().regex(/^\d+$/),
        offset: z.string().regex(/^\d+$/),
        userId: z.string().refine(
          (userId) => {
            const count = UserQuery.equalTo('objectId', userId).count()
            return count !== 0
          },
          {
            message: 'USER_NOT_FOUND',
          },
        ),
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
      foods: z
        .object({
          id: z.string().refine(
            async (foodId) => {
              // need to be validate
              const count = await Promise.resolve(
                FoodQuery.equalTo(foodId).count(),
              )
              return count !== 0
            },
            {
              message: 'FOOD_NOT_FOUND',
            },
          ),
          quantity: z.number().positive(),
        })
        .array(),
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
      foods: z
        .object({
          id: z.string().refine(
            async (foodId) => {
              // need to be validate
              const count = await Promise.resolve(
                FoodQuery.equalTo(foodId).count(),
              )
              return count !== 0
            },
            {
              message: 'FOOD_NOT_FOUND',
            },
          ),
          quantity: z.number().positive(),
        })
        .array(),
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
