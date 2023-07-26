import { RequestHandler } from 'express'
import * as argon2 from 'argon2'
import jwt from 'jsonwebtoken'

import config from '../helpers/config'
import { CustomerModel } from '../models/customer.model'

export const getAllCustomers: RequestHandler = async (req, res, next) => {
  const {
    query: { name, limit = '50', offset = '0' },
  } = req

  try {
    let customerQuery = CustomerModel.find().skip(Number(offset))

    if (typeof name === 'string') {
      customerQuery = customerQuery.find({ name })
    }
    if (limit !== '-1') {
      customerQuery = customerQuery.limit(Number(limit))
    }
    const result = await customerQuery.exec()

    res.json(result.map(CustomerModel.toApiCustomerSchema))
  } catch (e) {
    next(e)
  }
}

export const register: RequestHandler = async (req, res, next) => {
  const newCustomer = new CustomerModel()
  const { username, email, password } = req.body

  newCustomer.username = username
  newCustomer.email = email

  try {
    const hash = await argon2.hash(password)
    newCustomer.password = hash

    await newCustomer.save()

    res.status(200).json({ msg: 'Register Success' })
  } catch (e) {
    next(e)
  }
}

export const login: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body
  const user = await CustomerModel.findOne({
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
        CustomerModel.toApiCustomerSchema(user),
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

export const getSingleCustomer: RequestHandler = async (req, res, next) => {
  const id = req.params.id

  try {
    const result = await CustomerModel.findById(id)

    res.json(CustomerModel.toApiCustomerSchema(result))
  } catch (e) {
    next(e)
  }
}

export const getCurrentCustomer: RequestHandler = async (req, res, next) => {
  const {
    headers: { userId },
  } = req

  try {
    const result = await CustomerModel.findById(userId)

    res.json(CustomerModel.toApiCustomerSchema(result))
  } catch (e) {
    next(e)
  }
}

export const updateCustomer: RequestHandler = async (req, res, next) => {
  const id = req.params.id

  try {
    const updatedCustomer = await CustomerModel.findByIdAndUpdate(id, {
      ...req.body,
    })

    res.json({
      msg: 'Customer updated',
      objectId: updatedCustomer?.id,
    })
  } catch (error) {
    console.error('Error while updating Customer', error)
    next(error)
  }
}

export const deleteCustomer: RequestHandler = async (req, res, next) => {
  const { id } = req.params
  try {
    const response = await CustomerModel.findByIdAndDelete(id)
    res.json({
      msg: 'Customer Deleted',
      data: CustomerModel.toApiCustomerSchema(response),
    })
  } catch (error) {
    console.error('Error while deleting ParseObject', error)
    next(error)
  }
}
