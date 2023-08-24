import { RequestHandler } from 'express'
import { Types } from 'mongoose'

import { bucketObject, getObjectUrl, putObject } from '../lib/minio.lib'
import { BannerModel } from '../models/banner.model'
import { responseMessage } from '../utils/errorException'

const BANNER_IMAGE_BUCKET_NAME = bucketObject.banners

const getFullImageNameFromId = (imageId: Types.ObjectId) => {
  return `${imageId.toString()}.webp`
}

const getImageFromImageId = async (imageId: Types.ObjectId) => {
  return {
    imageId,
    url: await getObjectUrl({
      bucket: BANNER_IMAGE_BUCKET_NAME,
      object: getFullImageNameFromId(imageId),
    }),
  }
}

export const getAllBanners: RequestHandler = async (req, res, next) => {
  try {
    const bannerQuery = BannerModel.find().lean()

    const result = await bannerQuery.exec()
    const ids = result.map(({ _id }) => _id.toString())

    const bannersWithImage = await Promise.all(
      result.map(async (banner) => ({
        ...banner,
        ...(await getImageFromImageId(banner._id)),
      })),
    )

    res.json(bannersWithImage)
  } catch (e) {
    next(e)
  }
}

export const deleteBanner: RequestHandler = async (req, res, next) => {
  const { id } = req.params
  try {
    const response = await BannerModel.findByIdAndDelete(id)

    res.json({
      msg: 'Banner Deleted',
      data: response,
    })
  } catch (error) {
    next(error)
  }
}

export const addBanners: RequestHandler = async (req, res, next) => {
  const files = req.files as Express.Multer.File[]

  const hasFiles = files !== undefined && files.length !== 0
  if (hasFiles) {
    try {
      const fileIds = await Promise.all(
        files.map(async (file) => {
          const newBanner = new BannerModel()
          const { _id } = await newBanner.save()

          await putObject({
            bucket: BANNER_IMAGE_BUCKET_NAME,
            object: getFullImageNameFromId(_id),
            fileBuffer: file.buffer,
          })
          return _id.toString()
        }),
      )

      res.json({
        msg: 'Banner added',
        _ids: fileIds,
      })
    } catch (error) {
      next(error)
    }
  } else {
    res.status(400).send(responseMessage[400])
  }
}
