const Parse = require('parse/node')
const Category = Parse.Object.extend('Category')
const CategoryQuery = new Parse.Query(Category)

module.exports = {
  getAllCategories: (req, res, next) => {
    const name = req.query.name || ''
    CategoryQuery.contains('name', name)
      .find()
      .then((categorys) => {
        if (categorys) {
          res.json(categorys)
        } else {
          console.log('Nothing found, please try again')
        }
      })
      .catch(function (error) {
        console.log('Error: ' + error.code + ' ' + error.message)
        next(error)
      })
  },
  getSingleCategory: (req, res, next) => {
    const id = req.params.id
    CategoryQuery.equalTo('objectId', id)
      .find()
      .then((category) => {
        if (category) {
          res.json(category)
        } else {
          console.log('Nothing found, please try again')
        }
      })
      .catch(function (error) {
        console.log('Error: ' + error.code + ' ' + error.message)
        next(error)
      })
  },
  addCategory: async (req, res, next) => {
    const newCategory = new Parse.Object('Category')
    const { name } = req.body
    newCategory.set('name', name)
    try {
      const result = await newCategory.save()
      // Access the Parse Object attributes using the .GET method
      res.json(result)
    } catch (error) {
      console.error('Error while creating Category: ', error)
      next(error)
    }
  },
  updateCategory: async (req, res, next) => {
    const { id } = req.params
    const { name } = req.body
    const currentCategory = await CategoryQuery.get(id)
    currentCategory.set('name', name)

    try {
      const response = await currentCategory.save()

      res.json(response)
    } catch (error) {
      console.error('Error while updating Category', error)
      next(error)
    }
  },
  deleteCategory: async (req, res, next) => {
    const { id } = req.params
    // here you put the objectId that you want to delete
    const object = await CategoryQuery.get(id)
    try {
      const response = await object.destroy()
      res.json(response)
    } catch (error) {
      console.error('Error while deleting ParseObject', error)
      next(error)
    }
  },
}
