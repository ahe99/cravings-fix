import { z } from 'zod'

import { ROLES, UserModel } from '../models/user.model'

export const GetUsersRequestSchema = z.object({
  query: z
    .object({
      name: z.string().max(20),
      limit: z.string().regex(/^\d+$/).default('20'),
      offset: z.string().regex(/^\d+$/).default('0'),
    })
    .partial(),
})

export const GetUserRequestSchema = z.object({
  params: z.object({
    id: z.string().refine(
      async (_id) => {
        const count = await UserModel.find({ _id }).count()
        return count !== 0
      },
      {
        message: 'USER_NOT_FOUND',
      },
    ),
  }),
})

export const PostUserCreateSchema = z.object({
  body: z.object({
    username: z.string().min(1).max(20),
    email: z
      .string()
      .min(1)
      .regex(/\S+@\S+\.\S+/),
    password: z.string().min(4),
    role: z.string().refine(
      (role) => {
        const hasRole =
          Object.keys(ROLES).findIndex((_role) => role === _role) !== -1
        return hasRole
      },
      {
        message: 'ROLE_NOT_FOUND',
      },
    ),
  }),
})

export const PostUserLoginSchema = z.object({
  body: z.object({
    email: z
      .string()
      .min(1)
      .regex(/\S+@\S+\.\S+/),
    password: z.string().min(4),
  }),
  query: z.object({
    shouldValidAdmin: z.boolean().optional().default(false),
  }),
})

export const PatchUserRequestSchema = z.object({
  params: z.object({
    id: z.string().refine(
      async (_id) => {
        const count = await UserModel.find({ _id }).count().exec()
        return count !== 0
      },
      {
        message: 'USER_NOT_FOUND',
      },
    ),
  }),
  body: z
    .object({
      username: z.string().min(1).max(20),
      password: z.string().min(4),
      roleId: z.string().refine(
        (role) => {
          const hasRole =
            Object.keys(ROLES).findIndex((_role) => role === _role) !== -1
          return hasRole
        },
        {
          message: 'ROLE_NOT_FOUND',
        },
      ),
    })
    .partial()
    .refine((body) => !(Object.keys(body).length === 0), {
      message: 'CANNOT_UPDATE_WITH_EMPTY_OBJECT',
    }),
})
export const DeleteUserRequestSchema = z.object({
  params: z.object({
    id: z.string().refine(
      async (_id) => {
        const count = await UserModel.find({ _id }).count()
        return count !== 0
      },
      {
        message: 'USER_NOT_FOUND',
      },
    ),
  }),
})
