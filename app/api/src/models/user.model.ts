import { Schema, model } from 'mongoose'

export enum ROLES {
  CUSTOMER = 'CUSTOMER',
  ADMIN = 'ADMIN',
}

const UserSchema = new Schema(
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
    role: {
      type: String,
      enum: Object.keys(ROLES),
      default: ROLES.CUSTOMER,
    },
  },
  {
    statics: {
      toApiUserSchema: (data) => {
        const { username, email, _id, role, createdAt, updatedAt } = data
        return {
          _id,
          username,
          email,
          role,
          createdAt,
          updatedAt,
        }
      },
    },
    timestamps: true,
  },
)

export const UserModel = model('UserModel', UserSchema)
