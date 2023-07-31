import { z } from 'zod'

import { OrderModel } from '../models/order.model'
import { OrderItemModel } from '../models/orderItem.model'
import { FoodModel } from '../models/food.model'
import { CustomerModel } from '../models/customer.model'

export const GetOrdersRequestSchema = z.object({
  query: z
    .object({
      limit: z.string().regex(/^\d+$/).default('20'),
      offset: z.string().regex(/^\d+$/).default('0'),
    })
    .partial(),
})

export const GetMyOrdersRequestSchema = z.object({
  query: z
    .object({
      limit: z.string().regex(/^\d+$/).default('20'),
      offset: z.string().regex(/^\d+$/).default('0'),
    })
    .partial(),
})

export const GetOrdersByCustomerIdRequestSchema = z.object({
  params: z.object({
    customerId: z.string().refine(
      async (_id) => {
        const count = await CustomerModel.find({ _id }).count()
        return count !== 0
      },
      {
        message: 'CUSTOMER_NOT_FOUND',
      },
    ),
  }),
  query: z
    .object({
      limit: z.string().regex(/^\d+$/).default('20'),
      offset: z.string().regex(/^\d+$/).default('0'),
    })
    .partial(),
})

export const GetOrderRequestSchema = z.object({
  params: z.object({
    id: z.string().refine(
      async (_id) => {
        const count = await OrderModel.find({ _id }).count()
        return count !== 0
      },
      {
        message: 'ORDER_NOT_FOUND',
      },
    ),
  }),
})

export const PostOrderCreateItemRequestSchema = z.object({
  params: z.object({
    foodId: z.string().refine(
      async (_id) => {
        const count = await FoodModel.find({ _id }).count()
        return count !== 0
      },
      {
        message: 'FOOD_NOT_FOUND',
      },
    ),
  }),
  body: z.object({
    quantity: z.number().min(1),
  }),
})

export const PatchOrderPriceRequestSchema = z.object({
  params: z.object({
    id: z.string().refine(
      async (_id) => {
        const count = await OrderModel.find({ _id }).count().exec()
        return count !== 0
      },
      {
        message: 'ORDER_NOT_FOUND',
      },
    ),
  }),
  body: z.object({
    totalPrice: z.number().min(0),
  }),
})

export const DeleteOrderRequestSchema = z.object({
  params: z.object({
    id: z.string().refine(
      async (_id) => {
        const count = await OrderModel.find({ _id }).count()
        return count !== 0
      },
      {
        message: 'ORDER_NOT_FOUND',
      },
    ),
  }),
})

export const DeleteOrderItemRequestSchema = z.object({
  params: z.object({
    orderItemId: z.string().refine(
      async (_id) => {
        const count = await OrderItemModel.find({ _id }).count()
        return count !== 0
      },
      {
        message: 'ORDER_ITEM_NOT_FOUND',
      },
    ),
  }),
})
