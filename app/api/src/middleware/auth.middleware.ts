import { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'

import config from '../helpers/config'
import { AdminModel } from '../models/admin.model'
import { CustomerModel } from '../models/customer.model'
import { responseMessage } from '../utils/errorException'

export const isAuth: RequestHandler = async (req, res, next) => {
  const { authorization = '' } = req.headers
  try {
    const decoded = jwt.verify(authorization, config.jwt.secret)
    if (typeof decoded === 'object') {
      req.headers.userId = decoded._id
      next()
    } else {
      return res.status(401).send(responseMessage[401])
    }
  } catch (e) {
    return res.status(401).send(responseMessage[401])
  }
}

export const isAdmin: RequestHandler = async (req, res, next) => {
  const { authorization = '' } = req.headers

  try {
    const decoded = jwt.verify(authorization, config.jwt.secret)

    if (typeof decoded === 'object') {
      req.headers.userId = decoded._id

      const count = await AdminModel.find({ _id: decoded._id }).count().exec()
      if (count !== 0) {
        next()
      }
    } else {
      return res.status(401).send(responseMessage[401])
    }
  } catch (e) {
    return res.status(401).send(responseMessage[401])
  }
}

export const isCustomer: RequestHandler = async (req, res, next) => {
  const { authorization = '' } = req.headers
  try {
    const decoded = jwt.verify(authorization, config.jwt.secret)

    if (typeof decoded === 'object') {
      req.headers.userId = decoded._id

      const count = await CustomerModel.find({ _id: decoded._id })
        .count()
        .exec()
      if (count !== 0) {
        next()
      }
    } else {
      return res.status(401).send(responseMessage[401])
    }
  } catch (e) {
    return res.status(401).send(responseMessage[401])
  }
}
