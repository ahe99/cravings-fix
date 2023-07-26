import { z } from 'zod'

import { AdminModel } from '../models/admin.model'

export const GetAdminsRequestSchema = z.object({
  query: z
    .object({
      name: z.string().max(20),
      limit: z.string().regex(/^\d+$/).default('20'),
      offset: z.string().regex(/^\d+$/).default('0'),
    })
    .partial(),
})

export const GetAdminRequestSchema = z.object({
  params: z.object({
    id: z.string().refine(
      async (_id) => {
        const count = await AdminModel.find({ _id }).count()
        return count !== 0
      },
      {
        message: 'ADMIN_NOT_FOUND',
      },
    ),
  }),
})

export const PostAdminCreateSchema = z.object({
  body: z.object({
    username: z.string().min(1).max(20),
    email: z
      .string()
      .min(1)
      .regex(/\S+@\S+\.\S+/),
    password: z.string().min(4),
  }),
})

export const PostAdminLoginSchema = z.object({
  body: z.object({
    email: z
      .string()
      .min(1)
      .regex(/\S+@\S+\.\S+/),
    password: z.string().min(4),
  }),
})


export const PatchAdminRequestSchema = z.object({
  params: z.object({
    id: z.string().refine(
      async (_id) => {
        const count = await AdminModel.find({ _id }).count().exec()
        return count !== 0
      },
      {
        message: 'ADMIN_NOT_FOUND',
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
export const DeleteAdminRequestSchema = z.object({
  params: z.object({
    id: z.string().refine(
      async (_id) => {
        const count = await AdminModel.find({ _id }).count()
        return count !== 0
      },
      {
        message: 'ADMIN_NOT_FOUND',
      },
    ),
  }),
})
