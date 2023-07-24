import { z } from 'zod'

import { CustomerModel } from '../models/customer'

export const GetCustomersRequestSchema = z.object({
  query: z
    .object({
      name: z.string().max(20),
      limit: z.string().regex(/^\d+$/).default('20'),
      offset: z.string().regex(/^\d+$/).default('0'),
    })
    .partial(),
})

export const GetCustomerRequestSchema = z.object({
  params: z.object({
    id: z.string().refine(
      async (_id) => {
        const count = await CustomerModel.find({ _id }).count()
        return count !== 0
      },
      {
        message: 'CUSTOMER_NOT_FOUND',
      },
    ),
  }),
})

export const PostCustomerCreateSchema = z.object({
  body: z.object({
    username: z.string().min(1).max(20),
    email: z
      .string()
      .min(1)
      .regex(/\S+@\S+\.\S+/),
    password: z.string().min(4),
  }),
})

export const PostCustomerLoginSchema = z.object({
  body: z.object({
    email: z
      .string()
      .min(1)
      .regex(/\S+@\S+\.\S+/),
    password: z.string().min(4),
  }),
})


export const PatchCustomerRequestSchema = z.object({
  params: z.object({
    id: z.string().refine(
      async (_id) => {
        const count = await CustomerModel.find({ _id }).count().exec()
        return count !== 0
      },
      {
        message: 'CUSTOMER_NOT_FOUND',
      },
    ),
  }),
  body: z
    .object({
      username: z.string().min(1).max(20),
      password: z.string().min(4),
    })
    .partial()
    .refine((body) => !(Object.keys(body).length === 0), {
      message: 'CANNOT_UPDATE_WITH_EMPTY_OBJECT',
    }),
})
export const DeleteCustomerRequestSchema = z.object({
  params: z.object({
    id: z.string().refine(
      async (_id) => {
        const count = await CustomerModel.find({ _id }).count()
        return count !== 0
      },
      {
        message: 'CUSTOMER_NOT_FOUND',
      },
    ),
  }),
})
