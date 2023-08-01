import { Schema, model } from 'mongoose'

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
    categoryId: {
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

export const FoodModel = model('FoodModel', FoodSchema)
