import { Schema, model } from 'mongoose'

const OrderSchema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: 'CustomerModel',
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
