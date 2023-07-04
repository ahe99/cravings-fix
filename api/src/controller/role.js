const Parse = require('parse/node')

const Role = Parse.Object.extend('_Role')
const RoleQuery = new Parse.Query(Role)

module.exports = {
  getAllRoles: (req, res, next) => {
    const name = req.query.name || ''
    console.log('getAllRoles')
    RoleQuery.contains('name', name)
      .find()
      .then((roles) => {
        if (roles) {
          res.json(roles)
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
