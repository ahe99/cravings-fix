import { RequestHandler } from 'express'
import { Types } from 'mongoose'

import { CartItemModel } from '../models/cartItem.model'
import { CartModel } from '../models/cart.model'
import { OrderModel } from '../models/order.model'
import { OrderItemModel } from '../models/orderItem.model'
import { FoodModel } from '../models/food.model'
import { parseFloat } from '../helpers/format'
import { bucketObject, getObjectUrl } from '../lib/minio.lib'

const FOOD_IMAGE_BUCKET_NAME = bucketObject.foods

const getImagesFromImageIds = async (imageIds: string[]) => {
  if (Array.isArray(imageIds)) {
    const images = await Promise.all(
      imageIds.map(async (imageId) => {
        return {
          imageId,
          url: await getObjectUrl({
            bucket: FOOD_IMAGE_BUCKET_NAME,
            object: imageId,
          }),
        }
      }),
    )
    return images
  } else {
    return []
  }
}

const createCartItem = async ({
  foodId,
  userId,
  quantity,
}: {
  foodId: string
  userId: string
  quantity: string
}) => {
  const newCartItem = new CartItemModel({
    foodId,
    quantity,
    userId,
  })
  const result = await newCartItem.save()

  return result
}

const getCartItem = async (cartItemId: Types.ObjectId) => {
  const cartItem = await CartItemModel.findById(cartItemId).lean()
  const foodItem = await FoodModel.findById(cartItem?.foodId).lean()
  const images = await getImagesFromImageIds(foodItem?.imageIds ?? [])

  return {
    ...foodItem,
    ...cartItem,
    images: images,
  }
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

export const getCartByUserId: RequestHandler = async (req, res, next) => {
  const {
    params: { userId },
  } = req

  try {
    const result = await CartModel.findOne({
      userId,
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
      userId: userId,
    })
      .lean()
      .exec()

    const cartItems = await Promise.all(
      result?.cartItemIds.map(getCartItem) ?? [],
    )

    res.json(cartItems)
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
    userId: userId,
    foodId,
    quantity,
  })
  const { _id } = newCartItem

  try {
    const currentCart = await CartModel.findOne({
      userId: userId,
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
    const currentCart = await CartModel.findOne({ userId: userId }).exec()
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
    const currentCart = await CartModel.findOne({ userId: userId }).exec()

    if (currentCart !== undefined && currentCart !== null) {
      const { cartItemIds, userId } = currentCart
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
            const { foodId, quantity, userId } = currentCartItem
            const currentFood = await FoodModel.findById(foodId).exec()
            const foodPrice = currentFood?.price ?? 0
            const itemPrice = quantity * foodPrice
            const newOrderItem = new OrderItemModel({
              foodId,
              quantity,
              userId,
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
        userId,
        orderItemIds,
        totalPrice: parseFloat(totalPrice),
      })
      const result = await newOrder.save()

      res.json(result)
    }
  } catch (error) {
    next(error)
  }
}
