import { Schema, model, CallbackWithoutResultAndOptionalError } from 'mongoose'

export enum POLICY {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}

const NewsSchema = new Schema(
  {
    author: {
      type: Schema.ObjectId,
      ref: 'UserModel',
    },
    title: {
      type: String,
      required: true,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: '',
    },
    policy: {
      type: String,
      enum: Object.keys(POLICY),
      default: POLICY.PRIVATE,
    },
  },
  {
    timestamps: true,
  },
)

NewsSchema.pre(
  ['find', 'findOne'],
  function (next: CallbackWithoutResultAndOptionalError) {
    this.populate('author')
    next()
  },
)
export const NewsModel = model('NewsModel', NewsSchema)
