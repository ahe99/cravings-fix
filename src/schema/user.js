const { z } = require('zod')
// const Parse = require('parse/node')
// const User = new Parse.User()
// const UserQuery = new Parse.Query(User)

module.exports = {
  GetUsersRequestSchema: z.object({
    query: z
      .object({
        name: z.string().max(20),
        limit: z.string().regex(/^\d+$/),
        offset: z.string().regex(/^\d+$/),
      })
      .partial(),
  }),
  GetUserLoginRequestSchema: z.object({
    body: z.object({
      username: z.string().min(4).max(20),
      password: z.string().min(4).max(20),
    }),
  }),
  PostUserRequestSchema: z.object({
    body: z.object({
      email: z.string().email().optional(),
      username: z.string().min(4).max(20),
      password: z.string().min(4).max(20),
    }),
  }),
}
