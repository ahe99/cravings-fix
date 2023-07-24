import { Schema, model } from 'mongoose'

const CustomerSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    statics: {
      toApiCustomerSchema: (data) => {
        const { username, email } = data
        return {
          username,
          email,
        }
      },
    },
    timestamps: true,
  },
)

export const CustomerModel = model('CustomerModel', CustomerSchema)
