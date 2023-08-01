import { z } from 'zod'

import { BannerModel } from '../models/banner.model'

export const GetBannersRequestSchema = z.object({})

export const GetBannerRequestSchema = z.object({
  params: z.object({
    id: z.string().refine(
      async (_id) => {
        const count = await BannerModel.find({ _id }).count()
        return count !== 0
      },
      {
        message: 'BANNER_NOT_FOUND',
      },
    ),
  }),
})

export const PostBannerCreateSchema = z.object({})

export const DeleteBannerRequestSchema = z.object({
  params: z.object({
    id: z.string().refine(
      async (_id) => {
        const count = await BannerModel.find({ _id }).count()
        return count !== 0
      },
      {
        message: 'BANNER_NOT_FOUND',
      },
    ),
  }),
})
