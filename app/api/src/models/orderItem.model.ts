import { Schema, model, CallbackWithoutResultAndOptionalError } from 'mongoose'

const OrderItemSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'UserModel',
    },
    food: {
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

OrderItemSchema.pre(
  ['find', 'findOne'],
  function (next: CallbackWithoutResultAndOptionalError) {
    this.populate('food')
    next()
  },
)
export const OrderItemModel = model('OrderItemModel', OrderItemSchema)
