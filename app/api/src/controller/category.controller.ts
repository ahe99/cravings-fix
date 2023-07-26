import { RequestHandler } from 'express'
import { CategoryModel } from '../models/category.model'

export const getAllCategories: RequestHandler = async (req, res, next) => {
  const {
    query: { name, limit = '50', offset = '0' },
  } = req

  try {
    let categoryQuery = CategoryModel.find().skip(Number(offset))

    if (typeof name === 'string') {
      categoryQuery = categoryQuery.find({ name })
    }
    if (limit !== '-1') {
      categoryQuery = categoryQuery.limit(Number(limit))
    }
    const result = await categoryQuery.exec()

    res.json(result)
  } catch (e) {
    next(e)
  }
}

export const addCategory: RequestHandler = async (req, res, next) => {
  const newCategory = new CategoryModel()
  const { name, description } = req.body

  newCategory.name = name
  newCategory.description = description

  try {
    const result = await newCategory.save()

    res.json(result)
  } catch (e) {
    next(e)
  }
}

export const getSingleCategory: RequestHandler = async (req, res, next) => {
  const id = req.params.id

  try {
    const result = await CategoryModel.findById(id)

    res.json(result)
  } catch (e) {
    next(e)
  }
}

export const updateCategory: RequestHandler = async (req, res, next) => {
  const id = req.params.id

  try {
    const updatedCategory = await CategoryModel.findByIdAndUpdate(id, {
      ...req.body,
    })

    res.json({
      msg: 'Category updated',
      objectId: updatedCategory?.id,
    })
  } catch (error) {
    console.error('Error while updating Category', error)
    next(error)
  }
}

export const deleteCategory: RequestHandler = async (req, res, next) => {
  const { id } = req.params
  try {
    const response = await CategoryModel.findByIdAndDelete(id)
    res.json({
      msg: 'Category Deleted',
      data: response,
    })
  } catch (error) {
    console.error('Error while deleting ParseObject', error)
    next(error)
  }
}