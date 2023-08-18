import { RequestHandler } from 'express'
import * as argon2 from 'argon2'
import jwt from 'jsonwebtoken'

import config from '../helpers/config'
import { ROLES, UserModel } from '../models/user.model'
import { responseMessage } from '../utils/errorException'

export const getAllUsers: RequestHandler = async (req, res, next) => {
  const {
    query: { name, limit = '50', offset = '0' },
  } = req

  try {
    let userQuery = UserModel.find().skip(Number(offset))

    if (typeof name === 'string') {
      userQuery = userQuery.find({ name })
    }
    if (limit !== '-1') {
      userQuery = userQuery.limit(Number(limit))
    }
    const result = await userQuery.exec()

    res.json(result.map(UserModel.toApiUserSchema))
  } catch (e) {
    next(e)
  }
}

export const register: RequestHandler = async (req, res, next) => {
  const newUser = new UserModel()
  const { username, email, password, role } = req.body

  newUser.username = username
  newUser.email = email
  newUser.role = role

  try {
    const hash = await argon2.hash(password)
    newUser.password = hash

    await newUser.save()

    res.status(200).json({ msg: 'Register Success' })
  } catch (e) {
    next(e)
  }
}

export const login: RequestHandler = async (req, res, next) => {
  const { email, password, shouldValidAdmin } = req.body

  const user = await UserModel.findOne({
    email,
  }).exec()
  if (user === undefined || user === null) {
    res.status(401).json({ msg: 'Verify Failed' })
    return
  }

  if (shouldValidAdmin) {
    if (user.role !== ROLES.ADMIN) {
      res.status(401).json(responseMessage['401'])

      return
    }
  }

  try {
    const validation = await argon2.verify(user.password, password)

    if (validation) {
      const token = jwt.sign(
        UserModel.toApiUserSchema(user),
        config.jwt.secret,
        { expiresIn: config.jwt.expiry },
      )

      res.status(200).json({
        msg: 'Verify Success',
        token,
      })
    } else {
      res.status(401).json({ msg: 'Verify Failed' })
    }
  } catch (e) {
    next(e)
  }
}

export const getSingleUser: RequestHandler = async (req, res, next) => {
  const id = req.params.id

  try {
    const result = await UserModel.findById(id)

    res.json(UserModel.toApiUserSchema(result))
  } catch (e) {
    next(e)
  }
}

export const getCurrentUser: RequestHandler = async (req, res, next) => {
  const {
    headers: { userId },
  } = req

  try {
    const result = await UserModel.findById(userId)

    res.json(UserModel.toApiUserSchema(result))
  } catch (e) {
    next(e)
  }
}

export const updateUser: RequestHandler = async (req, res, next) => {
  const id = req.params.id

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(id, {
      ...req.body,
    })

    res.json({
      msg: 'User updated',
      objectId: updatedUser?.id,
    })
  } catch (error) {
    next(error)
  }
}

export const deleteUser: RequestHandler = async (req, res, next) => {
  const { id } = req.params
  try {
    const response = await UserModel.findByIdAndDelete(id)
    res.json({
      msg: 'User Deleted',
      data: UserModel.toApiUserSchema(response),
    })
  } catch (error) {
    next(error)
  }
}
