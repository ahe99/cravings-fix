import { Schema, model } from 'mongoose'

const CartItemSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'UserModel',
    },
    foodId: {
      type: Schema.Types.ObjectId,
      ref: 'FoodModel',
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  },
)
export const CartItemModel = model('CartItemModel', CartItemSchema)
