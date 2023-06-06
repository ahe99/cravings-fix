// initializes
const express = require('express')
const Parse = require('parse/node')
const bodyParser = require('body-parser')
const { ZodError } = require('zod')
const cors = require('cors')
const dotenv = require('dotenv')
const dotenvExpand = require('dotenv-expand')
const myEnv = dotenv.config()
dotenvExpand.expand(myEnv)

const {
  ClientError,
  ServerError,
  responseMessage,
} = require('./utils/errorException')

// parse
const APP_ID = process.env.B4A_APP_ID
const JAVASCRIPT_KEY = process.env.B4A_JAVASCRIPT_KEY
const MASTER_KEY = process.env.B4A_MASTER_KEY
Parse.initialize(APP_ID, JAVASCRIPT_KEY, MASTER_KEY)
Parse.serverURL = process.env.B4A_BASE_URL

// app
const app = express()

// port
const port = process.env.PORT || 6400

// routes
const homeRoute = require('./routes/home')
const foodRoute = require('./routes/food')
const categoryRoute = require('./routes/category')
const userRoute = require('./routes/user')
const roleRoute = require('./routes/role')

// middleware
app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/', homeRoute)
app.use('/foods', foodRoute)
app.use('/categories', categoryRoute)
app.use('/users', userRoute)
app.use('/roles', roleRoute)

app.use((err, req, res, next) => {
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
