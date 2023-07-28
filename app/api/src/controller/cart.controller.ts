import { RequestHandler } from 'express'
import { Types } from 'mongoose'

import { CartItemModel } from '../models/cartItem.model'
import { CartModel } from '../models/cart.model'
import { OrderModel } from '../models/order.model'
import { OrderItemModel } from '../models/orderItem.model'
import { FoodModel } from '../models/food.model'
import { parseFloat } from '../helpers/format'

const createCartItem = async ({
  foodId,
  customerId,
  quantity,
}: {
  foodId: string
  customerId: string
  quantity: string
}) => {
  const newCartItem = new CartItemModel({
    foodId,
    quantity,
    customerId,
  })
  const result = await newCartItem.save()

  return result
}

export const getAllCarts: RequestHandler = async (req, res, next) => {
  const {
    query: { limit = '50', offset = '0' },
  } = req

  try {
    let cartQuery = CartModel.find().skip(Number(offset))

    if (limit !== '-1') {
      cartQuery = cartQuery.limit(Number(limit))
    }
    const result = await cartQuery.exec()

    res.json(result)
  } catch (e) {
    next(e)
  }
}

export const getCartByCustomerId: RequestHandler = async (req, res, next) => {
  const {
    params: { customerId },
  } = req

  try {
    const result = await CartModel.findOne({
      customerId,
    }).exec()

    res.json(result)
  } catch (e) {
    next(e)
  }
}

export const getMyCart: RequestHandler = async (req, res, next) => {
  const {
    headers: { userId },
  } = req
  try {
    const result = await CartModel.findOne({
      customerId: userId,
    }).exec()

    res.json(result)
  } catch (e) {
    next(e)
  }
}

export const getSingleCart: RequestHandler = async (req, res, next) => {
  const id = req.params.id

  try {
    const result = await CartModel.findById(id)

    res.json(result)
  } catch (e) {
    next(e)
  }
}

// export const updateCart: RequestHandler = async (req, res, next) => {
//   const id = req.params.id

//   try {
//     const updatedCart = await CartModel.findByIdAndUpdate(id, {
//       ...req.body,
//     })

//     res.json({
//       msg: 'Cart updated',
//       objectId: updatedCart?.id,
//     })
//   } catch (error) {
//     console.error('Error while updating Cart', error)
//     next(error)
//   }
// }

export const addCartItem: RequestHandler = async (req, res, next) => {
  const {
    headers: { userId = '' },
    params: { foodId },
    body: { quantity },
  } = req
  const newCartItem = await createCartItem({
    customerId: userId,
    foodId,
    quantity,
  })
  const { _id } = newCartItem

  try {
    const currentCart = await CartModel.findOne({
      customerId: userId,
    }).exec()
    if (currentCart !== undefined && currentCart !== null) {
      currentCart.cartItemIds = [...currentCart.cartItemIds, _id]

      const result = await currentCart.save()

      res.json(result)
    }
  } catch (e) {
    next(e)
  }
}

export const deleteCartItem: RequestHandler = async (req, res, next) => {
  const {
    headers: { userId },
    params: { cartItemId },
  } = req

  try {
    const response = await CartItemModel.findByIdAndDelete(cartItemId)
    const currentCart = await CartModel.findOne({ customerId: userId }).exec()
    if (currentCart !== undefined && currentCart !== null) {
      currentCart.cartItemIds = currentCart.cartItemIds.filter(
        (_id) => String(_id) !== cartItemId,
      )
      await currentCart.save()
    }
    res.json({
      msg: 'Cart Deleted',
      data: response,
    })
  } catch (error) {
    console.error('Error while deleting ParseObject', error)
    next(error)
  }
}

export const checkoutMyCart: RequestHandler = async (req, res, next) => {
  const {
    headers: { userId },
  } = req

  try {
    const currentCart = await CartModel.findOne({ customerId: userId }).exec()

    if (currentCart !== undefined && currentCart !== null) {
      const { cartItemIds, customerId } = currentCart
      if (cartItemIds.length === 0) {
        return res.status(400).send("Can't checkout with empty cart")
      }

      let orderItemIds: Types.ObjectId[] = []
      let totalPrice = 0

      await Promise.all(
        cartItemIds.map(async (cartItemId) => {
          const currentCartItem = await CartItemModel.findByIdAndDelete(
            cartItemId,
          ).exec()
          if (currentCartItem !== undefined && currentCartItem !== null) {
            const { foodId, quantity, customerId } = currentCartItem
            const currentFood = await FoodModel.findById(foodId).exec()
            const foodPrice = currentFood?.price ?? 0
            const itemPrice = quantity * foodPrice
            const newOrderItem = new OrderItemModel({
              foodId,
              quantity,
              customerId,
              price: itemPrice,
            })

            const { _id } = await newOrderItem.save()

            orderItemIds = [...orderItemIds, _id]
            totalPrice += itemPrice
          }
        }),
      )

      currentCart.cartItemIds = []
      await currentCart.save()
      const newOrder = new OrderModel({
        customerId,
        orderItemIds,
        totalPrice: parseFloat(totalPrice),
      })
      const result = await newOrder.save()

      res.json(result)
    }
  } catch (error) {
    console.error('Error while checkout', error)
    next(error)
  }
}
