const Parse = require('parse/node')
const SessionQuery = new Parse.Query(Parse.Session)

const { responseMessage } = require('../utils/errorException')

module.exports = {
  isAuth: async (req, res, next) => {
    const { authorization } = req.headers
    try {
      const sessionResult = await SessionQuery.equalTo(
        'sessionToken',
        authorization,
      )
        .include('user')
        .first({ useMasterKey: true })
      if (sessionResult) {
        return next()
      } else {
        return res.status(401).send(responseMessage[401])
      }
    } catch (e) {
      return res.status(401).send(responseMessage[401])
    }
  },
}
