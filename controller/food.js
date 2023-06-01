const Parse = require('parse/node')

module.exports = {
  getAllFoods: (req, res) => {
    const Food = Parse.Object.extend('Food')

    const query = new Parse.Query(Food)
    query
      .findAll()
      .then((foods) => {
        if (foods) {
          res.json(foods)
        } else {
          console.log('Nothing found, please try again')
        }
      })
      .catch(function (error) {
        console.log('Error: ' + error.code + ' ' + error.message)
      })
  },
}
