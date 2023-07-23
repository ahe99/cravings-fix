import { Schema, model } from 'mongoose'

const CategorySchema = new Schema(
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
  },
  {
    timestamps: true,
  },
)
export const CategoryModel = model('CategoryModel', CategorySchema)
