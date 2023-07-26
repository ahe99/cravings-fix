import { Schema, model } from 'mongoose'

const CartItemSchema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: 'CustomerModel',
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
