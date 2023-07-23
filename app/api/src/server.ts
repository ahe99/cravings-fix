// initializes
import express, {
  Application,
  Express,
  NextFunction,
  Request,
  Response,
} from 'express'
import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'
import { ZodError } from 'zod'
import cors from 'cors'
import mongoose, { MongooseError } from 'mongoose'

import initSwagger from './models/swagger'

// routes
import homeRoute from './routes/home'
import foodRoute from './routes/food'
import categoryRoute from './routes/category'
// import userRoute from ./routes/user'
// import roleRoute from ./routes/role'
// import bannerRoute from ./routes/banner'
// import orderRoute from ./routes/order'

// const Parse = require('parse/node')
const bodyParser = require('body-parser')

const myEnv = dotenv.config()
dotenvExpand.expand(myEnv)

import {
  ClientError,
  ServerError,
  responseMessage,
} from './utils/errorException'

//mongodb
mongoose.connect(process.env.MONGO_URI ?? 'mongo')
mongoose.set('strictQuery', false)

// app
const app: Application = express()

// port
const port = process.env.PORT || 3600

initSwagger(app)

// middleware
app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/', homeRoute)
app.use('/foods', foodRoute)
app.use('/categories', categoryRoute)
// app.use('/users', userRoute)
// app.use('/roles', roleRoute)
// app.use('/banner', bannerRoute)
// app.use('/orders', orderRoute)

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  if (err instanceof ClientError || err instanceof ServerError) {
    return res
      .status(err.statusCode)
      .json({ name: err.name, message: err.message })
  }
  if (err instanceof ZodError) {
    return res.status(400).json({ error: err.issues })
  }
  if (err instanceof MongooseError) {
    return res.status(400).json({ error: err.message })
  }
  if (err instanceof Error) {
    console.log('Error: ', err)
  } else {
    console.log('Error: ', err)
  }
  res.status(500).send(responseMessage[500])
  next(err)
})

app.listen(port, () => {
  console.log('e-commerce-api is running at port: ', port)
})

module.exports = app
