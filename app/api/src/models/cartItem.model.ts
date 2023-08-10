import { Schema, model, CallbackWithoutResultAndOptionalError } from 'mongoose'

const CartItemSchema = new Schema(
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
  },
  {
    timestamps: true,
  },
)

CartItemSchema.pre(
  ['find', 'findOne'],
  function (next: CallbackWithoutResultAndOptionalError) {
    this.populate('food')
    next()
  },
)
export const CartItemModel = model('CartItemModel', CartItemSchema)
