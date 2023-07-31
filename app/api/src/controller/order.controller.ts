import { RequestHandler } from 'express'
import { OrderItemModel } from '../models/orderItem.model'
import { OrderModel } from '../models/order.model'

const createOrderItem = async ({
  foodId,
  customerId,
  quantity,
}: {
  foodId: string
  customerId: string
  quantity: string
}) => {
  const newOrderItem = new OrderItemModel({
    foodId,
    quantity,
    customerId,
  })
  const result = await newOrderItem.save()

  return result
}

export const getAllOrders: RequestHandler = async (req, res, next) => {
  const {
    query: { limit = '50', offset = '0' },
  } = req

  try {
    let orderQuery = OrderModel.find().skip(Number(offset))

    if (limit !== '-1') {
      orderQuery = orderQuery.limit(Number(limit))
    }
    const result = await orderQuery.exec()

    res.json(result)
  } catch (e) {
    next(e)
  }
}

export const getMyOrders: RequestHandler = async (req, res, next) => {
  const {
    headers: { userId },
    query: { limit = '50', offset = '0' },
  } = req

  try {
    let orderQuery = OrderModel.find({
      customerId: userId,
    }).skip(Number(offset))

    if (limit !== '-1') {
      orderQuery = orderQuery.limit(Number(limit))
    }
    const result = await orderQuery.exec()

    res.json(result)
  } catch (e) {
    next(e)
  }
}

export const getOrdersByCustomerId: RequestHandler = async (req, res, next) => {
  const {
    params: { customerId },
    query: { limit = '50', offset = '0' },
  } = req

  try {
    let orderQuery = OrderModel.find({
      customerId,
    }).skip(Number(offset))

    if (limit !== '-1') {
      orderQuery = orderQuery.limit(Number(limit))
    }
    const result = await orderQuery.exec()

    res.json(result)
  } catch (e) {
    next(e)
  }
}

export const getOrderByCustomerId: RequestHandler = async (req, res, next) => {
  const {
    params: { customerId },
  } = req

  try {
    const result = await OrderModel.findOne({
      customerId,
    }).exec()

    res.json(result)
  } catch (e) {
    next(e)
  }
}

export const getMyOrder: RequestHandler = async (req, res, next) => {
  const {
    headers: { userId },
  } = req
  try {
    const result = await OrderModel.findOne({
      customerId: userId,
    }).exec()

    res.json(result)
  } catch (e) {
    next(e)
  }
}

export const getSingleOrder: RequestHandler = async (req, res, next) => {
  const id = req.params.id

  try {
    const result = await OrderModel.findById(id)

    res.json(result)
  } catch (e) {
    next(e)
  }
}

export const updateOrderPrice: RequestHandler = async (req, res, next) => {
  const {
    params: { id },
    body: { totalPrice },
  } = req

  try {
    const currentOrder = await OrderModel.findById(id)
    if (currentOrder) {
      currentOrder.totalPrice = totalPrice

      const result = await currentOrder.save()

      res.json({
        msg: 'Order Updated',
        data: result,
      })
    }
  } catch (error) {
    next(error)
  }
}

export const addOrderItem: RequestHandler = async (req, res, next) => {
  const {
    headers: { userId = '' },
    params: { foodId },
    body: { quantity },
  } = req
  const newOrderItem = await createOrderItem({
    customerId: userId,
    foodId,
    quantity,
  })
  const { _id } = newOrderItem

  try {
    const currentOrder = await OrderModel.findOne({
      customerId: userId,
    }).exec()
    if (currentOrder !== undefined && currentOrder !== null) {
      currentOrder.orderItemIds = [...currentOrder.orderItemIds, _id]

      const result = await currentOrder.save()

      res.json(result)
    }
  } catch (e) {
    next(e)
  }
}

export const deleteOrderItem: RequestHandler = async (req, res, next) => {
  const {
    headers: { userId },
    params: { orderItemId },
  } = req

  try {
    const response = await OrderItemModel.findByIdAndDelete(orderItemId)
    const currentOrder = await OrderModel.findOne({ customerId: userId }).exec()
    if (currentOrder !== undefined && currentOrder !== null) {
      currentOrder.orderItemIds = currentOrder.orderItemIds.filter(
        (_id) => String(_id) !== orderItemId,
      )
      await currentOrder.save()
    }
    res.json({
      msg: 'Order Deleted',
      data: response,
    })
  } catch (error) {
    console.error('Error while deleting ParseObject', error)
    next(error)
  }
}

export const deleteOrder: RequestHandler = async (req, res, next) => {
  const { id } = req.params
  try {
    const response = await OrderModel.findByIdAndDelete(id)
    res.json({
      msg: 'Order Deleted',
      data: response,
    })
  } catch (error) {
    next(error)
  }
}
