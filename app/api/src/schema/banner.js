const { z } = require('zod')
const Parse = require('parse/node')
const Banner = Parse.Object.extend('Banner')
const BannerQuery = new Parse.Query(Banner)

module.exports = {
  GetBannersRequestSchema: z.object({
    query: z
      .object({
        name: z.string().max(20),
        limit: z.string().regex(/^\d+$/),
        offset: z.string().regex(/^\d+$/),
      })
      .partial(),
  }),
  GetBannerRequestSchema: z.object({
    params: z.object({
      id: z.string().refine(
        async (id) => {
          const count = await Promise.resolve(
            BannerQuery.equalTo('objectId', id).count(),
          )
          return count !== 0
        },
        {
          message: 'BANNER_NOT_FOUND',
        },
      ),
    }),
  }),
  PostBannerCreateSchema: z.object({
    body: z
      .object({
        name: z.string().max(20),
        description: z.string(),
      })
      .partial()
      .refine((body) => !(Object.keys(body).length === 0), {
        message: 'CANNOT_UPDATE_WITH_EMPTY_OBJECT',
      }),
  }),
  PatchBannerRequestSchema: z.object({
    params: z.object({
      id: z.string().refine(
        async (id) => {
          const count = await Promise.resolve(
            BannerQuery.equalTo('objectId', id).count(),
          )
          return count !== 0
        },
        {
          message: 'BANNER_NOT_FOUND',
        },
      ),
    }),
    body: z
      .object({
        name: z.string().max(20),
        description: z.string(),
      })
      .partial()
      .refine((body) => !(Object.keys(body).length === 0), {
        message: 'CANNOT_UPDATE_WITH_EMPTY_OBJECT',
      }),
  }),
  DeleteBannerRequestSchema: z.object({
    params: z.object({
      id: z.string().refine(
        async (id) => {
          const count = await Promise.resolve(
            BannerQuery.equalTo('objectId', id).count(),
          )
          return count !== 0
        },
        {
          message: 'BANNER_NOT_FOUND',
        },
      ),
    }),
  }),
}
