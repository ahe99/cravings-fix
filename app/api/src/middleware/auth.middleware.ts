import { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'

import config from '../helpers/config'
import { ROLES, UserModel } from '../models/user.model'
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

      const user = await UserModel.findById(decoded._id)
      if (user?.role === ROLES.ADMIN) {
        next()
      } else {
        throw new Error(responseMessage[401])
      }
    } else {
      throw new Error(responseMessage[401])
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

      const user = await UserModel.findById(decoded._id)

      if (user?.role === ROLES.CUSTOMER) {
        next()
      } else {
        throw new Error(responseMessage[401])
      }
    } else {
      throw new Error(responseMessage[401])
    }
  } catch (e) {
    return res.status(401).send(responseMessage[401])
  }
}
