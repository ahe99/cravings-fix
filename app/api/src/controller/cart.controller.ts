import { RequestHandler } from 'express'
import { CartItemModel } from '../models/cartItem.model'
import { CartModel } from '../models/cart.model'

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
