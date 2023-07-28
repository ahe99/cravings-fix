import { Schema, model } from 'mongoose'

const OrderItemSchema = new Schema(
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
