import { Schema, model, CallbackWithoutResultAndOptionalError } from 'mongoose'

const OrderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'UserModel',
    },
    orderItems: [
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

OrderSchema.pre(
  ['find', 'findOne'],
  function (next: CallbackWithoutResultAndOptionalError) {
    this.populate('orderItems')
    this.populate('user', '-password')
    next()
  },
)
export const OrderModel = model('OrderModel', OrderSchema)
