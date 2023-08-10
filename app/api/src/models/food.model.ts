import { CallbackWithoutResultAndOptionalError, Schema, model } from 'mongoose'

import { bucketObject, getObjectUrl } from '../lib/minio.lib'

const FOOD_IMAGE_BUCKET_NAME = bucketObject.foods

const getImagesFromImageIds = async (imageIds: string[]) => {
  if (Array.isArray(imageIds)) {
    const images = await Promise.all(
      imageIds.map(async (imageId) => {
        return {
          imageId,
          url: await getObjectUrl({
            bucket: FOOD_IMAGE_BUCKET_NAME,
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

export const FoodSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    price: {
      type: Number,
      default: 0,
    },
    stockQuantity: {
      type: Number,
      default: 0,
    },
    category: {
      type: Schema.ObjectId,
      ref: 'CategoryModel',
      required: false,
    },
    imageIds: {
      type: Array(String),
      default: [],
    },
  },
  {
    timestamps: true,
  },
)

FoodSchema.pre(
  ['find', 'findOne'],
  function (next: CallbackWithoutResultAndOptionalError) {
    this.populate('category')
    next()
  },
)
FoodSchema.post(['find', 'findOne'], async function (result, next) {
  try {
    if (Array.isArray(result)) {
      await Promise.all(
        result.map(async (item: any) => {
          const parsedItem = JSON.parse(JSON.stringify(item))
          item.images = await getImagesFromImageIds(parsedItem.imageIds)
          delete item['imageIds']
        }),
      )
    } else {
      const parsedItem = JSON.parse(JSON.stringify(result))
      result.images = await getImagesFromImageIds(parsedItem.imageIds)
      delete result['imageIds']
    }
  } catch (e) {
    console.log(e)
  }
  next()
})

export const FoodModel = model('FoodModel', FoodSchema)
