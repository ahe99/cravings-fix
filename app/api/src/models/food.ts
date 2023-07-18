import { Schema, model } from 'mongoose'

const exampleSchema = new Schema({
  a: {
    type: String,
    required: true,
  },
  d: Date,
})
export const SomeModel = model('TestModel', exampleSchema)
