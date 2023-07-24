import { Schema, model } from 'mongoose'

const AdminSchema = new Schema(
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
      toApiAdminSchema: (data) => {
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

export const AdminModel = model('AdminModel', AdminSchema)
