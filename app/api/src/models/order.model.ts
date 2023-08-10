import { Schema, model } from 'mongoose'

const OrderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'UserModel',
    },
    orderItemIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'OrderItemModel',
      },
    ],
    totalPrice: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
)
export const OrderModel = model('OrderModel', OrderSchema)
