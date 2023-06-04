const { z } = require('zod')
// const Parse = require('parse/node')
// const User = new Parse.User()
// const UserQuery = new Parse.Query(User)

module.exports = {
  GetRolesRequestSchema: z.object({
    query: z
      .object({
        limit: z.string().regex(/^\d+$/),
        offset: z.string().regex(/^\d+$/),
      })
      .partial(),
  }),
}
