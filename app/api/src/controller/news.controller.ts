import { RequestHandler } from 'express'
import { NewsModel } from '../models/news.model'

export const getAllNews: RequestHandler = async (req, res, next) => {
  const {
    query: { name, limit = '50', offset = '0' },
  } = req

  try {
    let newsQuery = NewsModel.find().skip(Number(offset))

    if (typeof name === 'string') {
      newsQuery = newsQuery.find({ name })
    }
    if (limit !== '-1') {
      newsQuery = newsQuery.limit(Number(limit))
    }
    const result = await newsQuery.exec()

    res.json(result)
  } catch (e) {
    next(e)
  }
}

export const addNews: RequestHandler = async (req, res, next) => {
  const newNews = new NewsModel()
  const { userId } = req.headers
  const { title, content, author, policy, description } = req.body

  newNews.title = title
  newNews.description = description
  newNews.content = content
  newNews.author = userId
  newNews.policy = policy

  try {
    const result = await newNews.save()

    res.json(result)
  } catch (e) {
    next(e)
  }
}

export const getSingleNews: RequestHandler = async (req, res, next) => {
  const id = req.params.id

  try {
    const result = await NewsModel.findById(id)

    res.json(result)
  } catch (e) {
    next(e)
  }
}

export const updateNews: RequestHandler = async (req, res, next) => {
  const id = req.params.id

  try {
    const updatedNews = await NewsModel.findByIdAndUpdate(id, {
      ...req.body,
    })

    res.json({
      msg: 'News updated',
      objectId: updatedNews?.id,
    })
  } catch (error) {
    next(error)
  }
}

export const deleteNews: RequestHandler = async (req, res, next) => {
  const { id } = req.params
  try {
    const response = await NewsModel.findByIdAndDelete(id)
    res.json({
      msg: 'News Deleted',
      data: response,
    })
  } catch (error) {
    next(error)
  }
}
