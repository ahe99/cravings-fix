import { Schema, model, CallbackWithoutResultAndOptionalError } from 'mongoose'

const CartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'UserModel',
    },
    cartItems: [
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

CartSchema.pre(
  ['find', 'findOne'],
  function (next: CallbackWithoutResultAndOptionalError) {
    this.populate('cartItems')
    this.populate('user', '-password')
    next()
  },
)
export const CartModel = model('CartModel', CartSchema)
