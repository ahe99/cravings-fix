import { RequestHandler } from 'express'

import { OrderItemModel } from '../models/orderItem.model'

import { responseMessage } from '../utils/errorException'

export const getTreningItems: RequestHandler = async (req, res, next) => {
  const {
    query: { limit = '50', offset = '0' },
  } = req
  try {
    let orderItemQuery = OrderItemModel.find().lean().skip(Number(offset))

    if (limit !== '-1') {
      orderItemQuery = orderItemQuery.limit(Number(limit))
    }

    const result = await orderItemQuery.exec()

    const dataTable: Record<string, any> = {}

    result.forEach((orderItem) => {
      if (dataTable[String(orderItem._id)] === undefined) {
        dataTable[String(orderItem._id)] = {
          ...orderItem.food,
          sold: orderItem.quantity,
        }
      } else {
        dataTable[String(orderItem._id)].sold += orderItem.quantity
      }
    })

    const finalResult = Object.values(dataTable).sort(
      (formmer, latter) => latter.sold - formmer.sold,
    )

    res.json(finalResult)
  } catch (e) {
    next(e)
  }
}

export const getBestSeller: RequestHandler = async (req, res, next) => {
  const {
    query: { limit = '50', offset = '0' },
  } = req

  try {
    let orderItemQuery = OrderItemModel.find().lean().skip(Number(offset))

    if (limit !== '-1') {
      orderItemQuery = orderItemQuery.limit(Number(limit))
    }

    const result = await orderItemQuery.exec()

    const dataTable: Record<string, any> = {}

    result.forEach((orderItem) => {
      if (dataTable[String(orderItem._id)] === undefined) {
        dataTable[String(orderItem._id)] = {
          ...orderItem.food,
          sold: orderItem.quantity,
        }
      } else {
        dataTable[String(orderItem._id)].sold += orderItem.quantity
      }
    })

    const finalResult = Object.values(dataTable).sort(
      (formmer, latter) => latter.sold - formmer.sold,
    )
    if (finalResult.length === 0) {
      res.status(404).send(responseMessage[404])
    } else {
      res.json(finalResult[0] ?? {})
    }
  } catch (e) {
    next(e)
  }
}
