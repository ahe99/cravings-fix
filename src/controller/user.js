const Parse = require('parse/node')

const User = new Parse.User()
const UserQuery = new Parse.Query(User)

const SessionQuery = new Parse.Query(Parse.Session)

module.exports = {
  getAllUser: (req, res, next) => {
    const name = req.query.name || ''
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
  addUser: async (req, res, next) => {
    const { username, email, password } = req.body

    User.set('username', username)
    User.set('email', email)
    User.set('password', password)
    try {
      const userResult = await User.signUp()

      res.json(userResult)
    } catch (error) {
      console.error('Error while signing up user', error)
      next(error)
    }
  },
  postLogin: async (req, res, next) => {
    const { username, password } = req.body
    try {
      // Pass the username and password to logIn function
      const user = await Parse.User.logIn(username, password)
      res.json(user)
    } catch (error) {
      console.error('Error while logging in user', error)
      next(error)
    }
  },
  getCurrentUser: (req, res, next) => {
    const { authorization } = req.headers
    console.log('authorization', authorization)

    SessionQuery.equalTo('sessionToken', authorization)
      .include('user')
      .first({ useMasterKey: true })
      .then((currentSession) => {
        const currentUser = currentSession.toJSON().user
        res.json(currentUser)
      })
      .catch((error) => {
        console.error('Error while fetching current user', error)
        next(error)
      })
  },
}
