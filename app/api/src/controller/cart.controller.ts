import { RequestHandler } from 'express'
import { Types } from 'mongoose'

import { CartItemModel } from '../models/cartItem.model'
import { CartModel } from '../models/cart.model'
import { OrderModel } from '../models/order.model'
import { OrderItemModel } from '../models/orderItem.model'
import { FoodModel } from '../models/food.model'

import { parseFloat } from '../helpers/format'
import { responseMessage } from '../utils/errorException'

const createCartItem = async ({
  food,
  user,
  quantity,
}: {
  food: string
  user: string
  quantity: string
}) => {
  const newCartItem = new CartItemModel({
    food,
    quantity,
    user,
  })
  const result = await newCartItem.save()

  return result
}

export const getAllCarts: RequestHandler = async (req, res, next) => {
  const {
    query: { limit = '50', offset = '0' },
  } = req

  try {
    let cartQuery = CartModel.find().lean().skip(Number(offset))

    if (limit !== '-1') {
      cartQuery = cartQuery.limit(Number(limit))
    }
    const result = await cartQuery.exec()

    res.json(result)
  } catch (e) {
    next(e)
  }
}

export const getCartByUserId: RequestHandler = async (req, res, next) => {
  const {
    params: { userId },
  } = req

  try {
    const result = await CartModel.findOne({
      user: userId,
    })
      .lean()
      .exec()

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
      user: userId,
    })
      .lean()
      .exec()

    res.json(result)
  } catch (e) {
    next(e)
  }
}

export const getSingleCart: RequestHandler = async (req, res, next) => {
  const id = req.params.id

  try {
    const result = await CartModel.findById(id).lean()

    res.json(result)
  } catch (e) {
    next(e)
  }
}

export const addCartItem: RequestHandler = async (req, res, next) => {
  const {
    headers: { userId = '' },
    params: { foodId },
    body: { quantity },
  } = req
  const newCartItem = await createCartItem({
    user: userId,
    food: foodId,
    quantity,
  })
  const { _id } = newCartItem

  try {
    const currentCart = await CartModel.findOne({
      user: userId,
    }).exec()
    if (currentCart !== undefined && currentCart !== null) {
      currentCart.cartItems = [...currentCart.cartItems, _id]

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

    const currentCart = await CartModel.findOne({ userId: userId }).exec()
    if (currentCart !== undefined && currentCart !== null) {
      currentCart.cartItems = currentCart.cartItems.filter(
        (_id) => String(_id) !== cartItemId,
      )
      await currentCart.save()
    }
    res.json({
      msg: 'Cart Deleted',
      data: response,
    })
  } catch (error) {
    next(error)
  }
}

export const updateCartItem: RequestHandler = async (req, res, next) => {
  const {
    params: { cartItemId },
    body: { quantity },
  } = req

  try {
    const updatedCartItem = await CartItemModel.findByIdAndUpdate(cartItemId, {
      quantity,
    })

    res.json({
      msg: 'Cart Deleted',
      data: updatedCartItem,
    })
  } catch (error) {
    next(error)
  }
}

export const checkoutMyCart: RequestHandler = async (req, res, next) => {
  const {
    headers: { userId },
  } = req

  try {
    const currentCart = await CartModel.findOne({ user: userId }).exec()

    if (currentCart !== undefined && currentCart !== null) {
      const { cartItems, user } = currentCart
      if (cartItems.length === 0) {
        return res.status(400).send("Can't checkout with empty cart")
      }

      let orderItems: Types.ObjectId[] = []
      let totalPrice = 0

      await Promise.all(
        cartItems.map(async (cartItemId) => {
          const currentCartItem = await CartItemModel.findByIdAndDelete(
            cartItemId,
          ).exec()
          if (currentCartItem !== undefined && currentCartItem !== null) {
            const { food, quantity, user } = currentCartItem
            const currentFood = await FoodModel.findById(food).exec()
            const foodPrice = currentFood?.price ?? 0
            const itemPrice = quantity * foodPrice
            const newOrderItem = new OrderItemModel({
              food,
              quantity,
              user,
              price: itemPrice,
            })

            const { _id } = await newOrderItem.save()

            orderItems = [...orderItems, _id]
            totalPrice += itemPrice
          }
        }),
      )

      if (orderItems.length !== 0) {
        currentCart.cartItems = []
        await currentCart.save()
        const newOrder = new OrderModel({
          user,
          orderItems,
          totalPrice: parseFloat(totalPrice),
        })
        const result = await newOrder.save()

        res.json(result)
      } else {
        res.status(400).send(responseMessage['400'])
      }
    }
  } catch (error) {
    next(error)
  }
}
