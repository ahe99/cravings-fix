import { Schema, model } from 'mongoose'

const CartSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'UserModel',
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
