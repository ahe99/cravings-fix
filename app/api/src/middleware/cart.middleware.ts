import { RequestHandler } from 'express'

import { CartModel } from '../models/cart.model'
import { responseMessage } from '../utils/errorException'

const createCart = async (userId: string) => {
  const newCart = new CartModel({
    user: userId,
    cartItemIds: [],
  })
  const result = await newCart.save()
  return result
}

export const hasCart: RequestHandler = async (req, res, next) => {
  const { userId = '' } = req.headers
  try {
    const count = await CartModel.find({
      user: userId,
    }).count()

    const hasNoCart = count === 0
    if (hasNoCart) {
      await createCart(userId)
    }

    next()
  } catch (e) {
    return res.status(500).send(responseMessage[500])
  }
}
