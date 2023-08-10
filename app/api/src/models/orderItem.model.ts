import { Schema, model } from 'mongoose'

const OrderItemSchema = new Schema(
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
    price: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
)
export const OrderItemModel = model('OrderItemModel', OrderItemSchema)
