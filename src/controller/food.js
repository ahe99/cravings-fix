const Parse = require('parse/node')
const Food = Parse.Object.extend('Food')
const Category = Parse.Object.extend('Category')
const FoodQuery = new Parse.Query(Food)
const CategoryQuery = new Parse.Query(Category)

module.exports = {
  getAllFoods: (req, res, next) => {
    const name = req.query.name || ''
    FoodQuery.contains('name', name)
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
        next(error)
      })
  },
  getSingleFood: (req, res, next) => {
    const id = req.params.id
    FoodQuery.equalTo('objectId', id)
      .find()
      .then((food) => {
        if (food) {
          res.json(food)
        } else {
          console.log('Nothing found, please try again')
        }
      })
      .catch(function (error) {
        console.log('Error: ' + error.code + ' ' + error.message)
        next(error)
      })
  },
  addFood: async (req, res, next) => {
    if (typeof req.body === 'undefined') {
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

      if (category_id) {
        const category = await CategoryQuery.get(category_id)
        if (category) {
          newFood.set('category_id', category.toPointer())
        } else {
          res.json({
            status: 'error',
            message: 'category not found',
          })
        }
      }
      // newFood.set(
      //   'image',
      //   new Parse.File('resume.txt', { base64: btoa('My file content') })
      // )
      try {
        const result = await newFood.save()
        // Access the Parse Object attributes using the .GET method
        console.log('Food created', result)
        res.json(result)
      } catch (error) {
        console.error('Error while creating Food: ', error)
        next(error)
      }
    }
  },
  updateFood: async (req, res, next) => {
    try {
      const { id } = req.params
      const { name, description, price, stock_quantity, category_id } = req.body
      const currentFood = await FoodQuery.get(id)
      currentFood.set('name', name)
      currentFood.set('description', description)
      currentFood.set('price', price)
      currentFood.set('stock_quantity', stock_quantity)
      const category = await CategoryQuery.get(category_id)
      if (category) {
        currentFood.set('category_id', category.toPointer())
      }

      try {
        const response = await currentFood.save()

        console.log('Food updated', response)
        res.json(response)
      } catch (error) {
        console.error('Error while updating Food', error)
        next(error)
      }
    } catch (error) {
      console.error('Error while retrieving object Food', error)
      next(error)
    }
  },
  deleteFood: async (req, res, next) => {
    const { id } = req.params
    try {
      // here you put the objectId that you want to delete
      const object = await FoodQuery.get(id)
      try {
        const response = await object.destroy()
        console.log('Deleted ParseObject', response)
        res.json(response)
      } catch (error) {
        console.error('Error while deleting ParseObject', error)
        next(error)
      }
    } catch (error) {
      console.error('Error while retrieving ParseObject', error)
      next(error)
    }
  },
  // getSingleImage: (req, res, next) => {
  //   const id = req.params.id
  //   FoodQuery.equalTo('objectId', id)
  //     .find()
  //     .then((food) => {
  //       if (food) {
  //         // error
  //         res.json(food[0].image)
  //       } else {
  //         console.log('Nothing found, please try again')
  //       }
  //     })
  //     .catch(function (error) {
  //       console.log('Error: ' + error.code + ' ' + error.message)
  //       next(error)
  //     })
  // },
  updateImage: async (req, res, next) => {
    const id = req.params.id

    const currentFood = await FoodQuery.get(id)
    const fileData = req.file
    const parseFile = new Parse.File(fileData.originalname, {
      base64: fileData.buffer.toString('base64'),
    })

    currentFood.set('image', parseFile)
    try {
      const result = await currentFood.save()
      // Access the Parse Object attributes using the .GET method
      console.log('Food updated', result)
      res.json(result)
    } catch (error) {
      console.error('Error while creating Image: ', error)
      next(error)
    }
  },
}
