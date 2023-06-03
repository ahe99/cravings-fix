const Parse = require('parse/node')

const User = new Parse.User()
const UserQuery = new Parse.Query(User)

module.exports = {
  getAllUser: (req, res, next) => {
    const name = req.query.name || ''
    console.log('getAllUser')
    UserQuery.contains('username', name)
      .find()
      .then((users) => {
        if (users) {
          res.json(users)
        } else {
          console.log('Nothing found, please try again')
        }
      })
      .catch(function (error) {
        console.log('Error: ' + error.code + ' ' + error.message)
        next(error)
      })
  },
}
