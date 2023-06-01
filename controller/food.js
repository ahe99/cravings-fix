const Parse = require('parse/node')
const Food = Parse.Object.extend('Food')
const query = new Parse.Query(Food)

module.exports = {
  getAllFoods: (req, res) => {
    const name = req.query.name
    console.log('getAllFoods')
    query
      .contains('name', name)
      .find()
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
  getSingleFood: (req, res) => {
    console.log('getSingleFood')
    const id = req.params.id
    query
      .equalTo('objectId', id)
      .find()
      .then((food) => {
        if (foods) {
          res.json(food)
        } else {
          console.log('Nothing found, please try again')
        }
      })
      .catch(function (error) {
        console.log('Error: ' + error.code + ' ' + error.message)
      })
  },
  addFood: async (req, res) => {
    if (typeof req.body == undefined) {
      res.json({
        status: 'error',
        message: 'data is undefined',
      })
    } else {
      const newFood = new Parse.Object('Food')
      const { name, description, price, stock_quantity, category_id } = req.body

      newFood.set('name', name)
      newFood.set('description', description)
      newFood.set('price', price)
      newFood.set('stock_quantity', stock_quantity)
      newFood.set('category_id', category_id)
      // newFood.set(
      //   'image',
      //   new Parse.File('resume.txt', { base64: btoa('My file content') })
      // )
      try {
        const result = await newFood.save()
        // Access the Parse Object attributes using the .GET method
        console.log('Food created', result)
      } catch (error) {
        console.error('Error while creating Food: ', error)
      }
    }
  },
  updateFood: async (req, res) => {
    try {
      const { id } = req.params
      const { name, description, price, stock_quantity, category_id } = req.body
      const currentFood = await query.get(id)
      currentFood.set('name', name)
      currentFood.set('description', description)
      currentFood.set('price', price)
      currentFood.set('stock_quantity', stock_quantity)
      currentFood.set('category_id', category_id)
      // currentFood.set(
      //   'image',
      //   new Parse.File('resume.txt', { base64: btoa('My file content') })
      // )
      try {
        const response = await object.save()
        // You can use the "get" method to get the value of an attribute
        // Ex: response.get("<ATTRIBUTE_NAME>")
        // Access the Parse Object attributes using the .GET method
        console.log(response.get('name'))
        console.log(response.get('description'))
        console.log(response.get('price'))
        console.log(response.get('stock_quantity'))
        console.log(response.get('category_id'))
        console.log(response.get('image'))
        console.log('Food updated', response)
      } catch (error) {
        console.error('Error while updating Food', error)
      }
    } catch (error) {
      console.error('Error while retrieving object Food', error)
    }
  },
  deleteFood: async (req, res) => {
    const { id } = req.params.id
    try {
      // here you put the objectId that you want to delete
      const object = await query.get(id)
      try {
        const response = await object.destroy()
        console.log('Deleted ParseObject', response)
      } catch (error) {
        console.error('Error while deleting ParseObject', error)
      }
    } catch (error) {
      console.error('Error while retrieving ParseObject', error)
    }
  },
}
