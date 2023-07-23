import { RequestHandler } from 'express'
import { FoodModel } from '../models/food'

export const getAllFoods: RequestHandler = async (req, res, next) => {
  const {
    query: { name, limit = '50', offset = '0' },
  } = req

  try {
    let foodQuery = FoodModel.find().skip(Number(offset))

    if (typeof name === 'string') {
      foodQuery = foodQuery.find({ name })
    }
    if (limit !== '-1') {
      foodQuery = foodQuery.limit(Number(limit))
    }
    const result = await foodQuery.exec()

    res.json(result)
  } catch (e) {
    next(e)
  }
}

export const addFood: RequestHandler = async (req, res, next) => {
  const newFood = new FoodModel()
  const { name, description, stockQuantity, price, categoryId } = req.body

  newFood.name = name
  newFood.description = description
  newFood.stockQuantity = stockQuantity
  newFood.price = price

  if (categoryId) {
    newFood.categoryId = categoryId
  }

  try {
    const result = await newFood.save()

    res.json(result)
  } catch (e) {
    next(e)
  }
}

export const getSingleFood: RequestHandler = async (req, res, next) => {
  const id = req.params.id

  try {
    const result = await FoodModel.findById(id)

    res.json(result)
  } catch (e) {
    next(e)
  }
}

export const updateFood: RequestHandler = async (req, res, next) => {
  const id = req.params.id

  try {
    const updatedFood = await FoodModel.findByIdAndUpdate(id, {
      ...req.body,
    })

    res.json({
      msg: 'Food updated',
      objectId: updatedFood?.id,
    })
  } catch (error) {
    console.error('Error while updating Food', error)
    next(error)
  }
}

export const deleteFood: RequestHandler = async (req, res, next) => {
  const { id } = req.params
  try {
    const response = await FoodModel.findByIdAndDelete(id)
    res.json({
      msg: 'Food Deleted',
      data: response,
    })
  } catch (error) {
    console.error('Error while deleting ParseObject', error)
    next(error)
  }
}
// export const updateImage: RequestHandler = async (req, res, next) => {
//   const id = req.params.id
//   const currentFood = await FoodQuery.get(id)
//   const fileData = req.file
//   const parseFile = new Parse.File(fileData.originalname, {
//     base64: fileData.buffer.toString('base64'),
//   })
//   currentFood.set('image', parseFile)
//   try {
//     const result = await currentFood.save()
//     // Access the Parse Object attributes using the .GET method
//     const formattedFood = getFormattedFood(result)
//     res.json({
//       msg: 'Food updated',
//       objectId: formattedFood.objectId,
//       image: {
//         src: formattedFood.image.url,
//       },
//     })
//     res.json(result)
//   } catch (error) {
//     console.error('Error while creating Image: ', error)
//     next(error)
//   }
// }
