import { RequestHandler } from 'express'

import { v4 as uuidv4 } from 'uuid'

import { bucketObject, removeObject, putObject } from '../lib/minio.lib'
import { FoodModel } from '../models/food.model'
import { responseMessage } from '../utils/errorException'

const FOOD_IMAGE_BUCKET_NAME = bucketObject.foods

export const getAllFoods: RequestHandler = async (req, res, next) => {
  const {
    query: { name, limit = '50', offset = '0' },
  } = req

  try {
    let foodQuery = FoodModel.find().lean().skip(Number(offset))

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
  const { name, description, stockQuantity, price, category } = req.body
  const newFood = new FoodModel({
    name,
    description,
    stockQuantity,
    price,
    category,
  })

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
    const result = await FoodModel.findById(id).lean()
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
    next(error)
  }
}

export const updateImage: RequestHandler = async (req, res, next) => {
  const id = req.params.id
  const files = req.files as Express.Multer.File[]

  const currentFood = await FoodModel.findById(id)

  if (currentFood === undefined || currentFood === null) {
    res.status(404).send(responseMessage[404])
  } else {
    const hasFiles = files !== undefined && files.length !== 0
    if (hasFiles) {
      try {
        const newFileIds = await Promise.all(
          files.map(async (file) => {
            const randomName = `${uuidv4()}.webp`

            await putObject({
              bucket: FOOD_IMAGE_BUCKET_NAME,
              object: randomName,
              fileBuffer: file.buffer,
            })
            return randomName
          }),
        )

        currentFood.imageIds = [...currentFood.imageIds, ...newFileIds]
        await currentFood.save()
        res.json({
          msg: 'Food updated',
          objectId: currentFood._id,
          images: currentFood.imageIds,
        })
      } catch (error) {
        next(error)
      }
    } else {
      res.status(400).send(responseMessage[400])
    }
  }
}

export const removeImage: RequestHandler = async (req, res, next) => {
  const {
    params: { id, imageId },
  } = req
  try {
    const currentFood = await FoodModel.findById(id)

    if (currentFood === undefined || currentFood === null) {
      res.status(404).send(responseMessage[404])
    } else {
      currentFood.imageIds = currentFood.imageIds.filter(
        (_imageId) => _imageId !== imageId,
      )
      await currentFood.save()

      res.json({
        msg: 'Food Image Deleted',
      })
    }
  } catch (e) {
    next(e)
  }
}
