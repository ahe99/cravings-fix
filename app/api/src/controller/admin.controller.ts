import { RequestHandler } from 'express'
import * as argon2 from 'argon2'
import jwt from 'jsonwebtoken'

import config from '../helpers/config'
import { AdminModel } from '../models/admin.model'

export const getAllAdmins: RequestHandler = async (req, res, next) => {
  const {
    query: { name, limit = '50', offset = '0' },
  } = req

  try {
    let adminQuery = AdminModel.find().skip(Number(offset))

    if (typeof name === 'string') {
      adminQuery = adminQuery.find({ name })
    }
    if (limit !== '-1') {
      adminQuery = adminQuery.limit(Number(limit))
    }
    const result = await adminQuery.exec()

    res.json(result.map(AdminModel.toApiAdminSchema))
  } catch (e) {
    next(e)
  }
}

export const register: RequestHandler = async (req, res, next) => {
  const newAdmin = new AdminModel()
  const { username, email, password } = req.body

  newAdmin.username = username
  newAdmin.email = email

  try {
    const hash = await argon2.hash(password)
    newAdmin.password = hash

    await newAdmin.save()

    res.status(200).json({ msg: 'Register Success' })
  } catch (e) {
    next(e)
  }
}

export const login: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body
  const user = await AdminModel.findOne({
    email,
  }).exec()
  if (user === undefined || user === null) {
    res.status(401).json({ msg: 'Verify Failed' })
    return
  }

  try {
    const validation = await argon2.verify(user.password, password)

    if (validation) {
      const token = jwt.sign(
        AdminModel.toApiAdminSchema(user),
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

export const getSingleAdmin: RequestHandler = async (req, res, next) => {
  const id = req.params.id

  try {
    const result = await AdminModel.findById(id)

    res.json(AdminModel.toApiAdminSchema(result))
  } catch (e) {
    next(e)
  }
}

export const getCurrentAdmin: RequestHandler = async (req, res, next) => {
  const {
    headers: { userId },
  } = req

  try {
    const result = await AdminModel.findById(userId)

    res.json(AdminModel.toApiAdminSchema(result))
  } catch (e) {
    next(e)
  }
}

export const updateAdmin: RequestHandler = async (req, res, next) => {
  const id = req.params.id

  try {
    const updatedAdmin = await AdminModel.findByIdAndUpdate(id, {
      ...req.body,
    })

    res.json({
      msg: 'Admin updated',
      objectId: updatedAdmin?.id,
    })
  } catch (error) {
    console.error('Error while updating Admin', error)
    next(error)
  }
}

export const deleteAdmin: RequestHandler = async (req, res, next) => {
  const { id } = req.params
  try {
    const response = await AdminModel.findByIdAndDelete(id)
    res.json({
      msg: 'Admin Deleted',
      data: AdminModel.toApiAdminSchema(response),
    })
  } catch (error) {
    console.error('Error while deleting ParseObject', error)
    next(error)
  }
}
