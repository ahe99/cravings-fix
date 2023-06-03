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
}
