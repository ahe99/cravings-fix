const { z } = require('zod')
const Parse = require('parse/node')
const Category = Parse.Object.extend('Category')
const CategoryQuery = new Parse.Query(Category)

module.exports = {
  GetCategoriesRequestSchema: z.object({
    query: z
      .object({
        name: z.string().max(20),
        limit: z.string().regex(/^\d+$/),
        offset: z.string().regex(/^\d+$/),
      })
      .partial(),
  }),
  GetCategoryRequestSchema: z.object({
    params: z.object({
      id: z.string().refine(
        async (id) => {
          const count = await Promise.resolve(
            CategoryQuery.equalTo('objectId', id).count(),
          )
          return count !== 0
        },
        {
          message: 'CATEGORY_NOT_FOUND',
        },
      ),
    }),
  }),
  PostCategoryCreateSchema: z.object({
    body: z.object({
      name: z.string().max(20),
    }),
  }),
  PatchCategoryRequestSchema: z.object({
    params: z.object({
      id: z.string().refine(
        async (id) => {
          const count = await Promise.resolve(
            CategoryQuery.equalTo('objectId', id).count(),
          )
          return count !== 0
        },
        {
          message: 'CATEGORY_NOT_FOUND',
        },
      ),
    }),
    body: z
      .object({
        name: z.string().max(20),
      })
      .refine((body) => !(Object.keys(body).length === 0), {
        message: 'CANNOT_UPDATE_WITH_EMPTY_OBJECT',
      }),
  }),
  DeleteCategoryRequestSchema: z.object({
    params: z.object({
      id: z.string().refine(
        async (id) => {
          const count = await Promise.resolve(
            CategoryQuery.equalTo('objectId', id).count(),
          )
          return count !== 0
        },
        {
          message: 'CATEGORY_NOT_FOUND',
        },
      ),
    }),
  }),
}
