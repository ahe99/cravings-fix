import { RequestHandler } from 'express'

import { responseMessage } from '../utils/errorException'
import { OrderModel } from '../models/order.model'

export const isMyOrder: RequestHandler = async (req, res, next) => {
  const { userId = '' } = req.headers
  const { id: orderId } = req.params
  try {
    const order = await OrderModel.findById(orderId).lean().exec()

    if (order?.user?._id.toString() === userId) {
      next()
    } else {
      return res.status(401).send(responseMessage[401])
    }
  } catch (e) {
    return res.status(500).send(responseMessage[500])
  }
}
