import { RequestHandler } from 'express'

import { bucketObject, getObjectUrl, putObject } from '../lib/minio.lib'
import { BannerModel } from '../models/banner.model'
import { responseMessage } from '../utils/errorException'

const BANNER_IMAGE_BUCKET_NAME = bucketObject.banners

const getImagesFromImageIds = async (imageIds: string[]) => {
  if (Array.isArray(imageIds)) {
    const images = await Promise.all(
      imageIds.map(async (imageId) => {
        return {
          imageId,
          url: await getObjectUrl({
            bucket: BANNER_IMAGE_BUCKET_NAME,
            object: imageId,
          }),
        }
      }),
    )
    return images
  } else {
    return []
  }
}

export const getAllBanners: RequestHandler = async (req, res, next) => {
  try {
    let bannerQuery = BannerModel.find().lean()

    const result = await bannerQuery.exec()
    const ids = result.map(({ _id }) => _id.toString())

    const bannersWithImage = await getImagesFromImageIds(ids)

    res.json(bannersWithImage)
  } catch (e) {
    next(e)
  }
}

// export const updateBanner: RequestHandler = async (req, res, next) => {
//   const id = req.params.id

//   try {
//     const updatedBanner = await BannerModel.findByIdAndUpdate(id, {
//       ...req.body,
//     })

//     res.json({
//       msg: 'Banner updated',
//       objectId: updatedBanner?.id,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

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
      await Promise.all(
        files.map(async (file) => {
          const newBanner = new BannerModel()
          const { _id } = await newBanner.save()
          const imageName = _id.toString()

          await putObject({
            bucket: BANNER_IMAGE_BUCKET_NAME,
            object: imageName,
            fileBuffer: file.buffer,
          })
          return imageName
        }),
      )

      res.json({
        msg: 'Banner added',
      })
    } catch (error) {
      next(error)
    }
  } else {
    res.status(400).send(responseMessage[400])
  }
}
