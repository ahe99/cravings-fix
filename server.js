//initializes
const express = require('express')
const Parse = require('parse/node')

const cors = require('cors')
const dotenv = require('dotenv')
const dotenvExpand = require('dotenv-expand')
const myEnv = dotenv.config()
dotenvExpand.expand(myEnv)
//parse
const APP_ID = process.env.B4A_APP_ID
const JAVASCRIPT_KEY = process.env.B4A_JAVASCRIPT_KEY
const MASTER_KEY = process.env.B4A_MASTER_KEY
Parse.initialize(APP_ID, JAVASCRIPT_KEY, MASTER_KEY)
Parse.serverURL = process.env.B4A_BASE_URL

//app
const app = express()

//port
const port = process.env.PORT || 6400

//routes
const homeRoute = require('./routes/home')
const foodRoute = require('./routes/food')

//middleware
app.use(cors())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', homeRoute)
app.use('/foods', foodRoute)

app.listen(port, () => {
  console.log('e-commerce-api is running at port: ', port)
})

module.exports = app
