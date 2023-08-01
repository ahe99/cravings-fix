import { Schema, model } from 'mongoose'

export const BannerSchema = new Schema(
  {},
  {
    timestamps: true,
  },
)

export const BannerModel = model('BannerModel', BannerSchema)
