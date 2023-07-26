import { z } from 'zod'

import { CartModel } from '../models/cart.model'
import { CartItemModel } from '../models/cartItem.model'
import { FoodModel } from '../models/food.model'
import { CustomerModel } from '../models/customer.model'

export const GetCartsRequestSchema = z.object({
  query: z
    .object({
      limit: z.string().regex(/^\d+$/).default('20'),
      offset: z.string().regex(/^\d+$/).default('0'),
    })
    .partial(),
})

export const GetCartRequestSchema = z.object({
  params: z.object({
    id: z.string().refine(
      async (_id) => {
        const count = await CartModel.find({ _id }).count()
        return count !== 0
      },
      {
        message: 'CART_NOT_FOUND',
      },
    ),
  }),
})

export const GetCartByCustomerIdRequestSchema = z.object({
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
})

export const PostCartCreateItemRequestSchema = z.object({
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
// export const PatchCartRequestSchema = z.object({
//   params: z.object({
//     id: z.string().refine(
//       async (_id) => {
//         const count = await CartModel.find({ _id }).count().exec()
//         return count !== 0
//       },
//       {
//         message: 'CART_NOT_FOUND',
//       },
//     ),
//   }),
//   body: z
//     .object({
//       name: z.string().max(20),
//       description: z.string(),
//       price: z.number().min(0),
//       stockQuantity: z.number().min(0),
//       categoryId: z.string().refine(
//         async (categoryId) => {
//           const count = await CategoryModel.find({ _id: categoryId }).count()
//           return count !== 0
//         },
//         {
//           message: 'CATEGORY_NOT_FOUND',
//         },
//       ),
//     })
//     .partial()
//     .refine((body) => !(Object.keys(body).length === 0), {
//       message: 'CANNOT_UPDATE_WITH_EMPTY_OBJECT',
//     }),
// })
export const DeleteCartItemRequestSchema = z.object({
  params: z.object({
    cartItemId: z.string().refine(
      async (_id) => {
        const count = await CartItemModel.find({ _id }).count()
        return count !== 0
      },
      {
        message: 'CART_ITEM_NOT_FOUND',
      },
    ),
  }),
})
