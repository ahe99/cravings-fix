import { Schema, model } from 'mongoose'

const CartSchema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: 'CustomerModel',
    },
    cartItemIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'CartItemModel',
      },
    ],
  },
  {
    timestamps: true,
  },
)
export const CartModel = model('CartModel', CartSchema)
