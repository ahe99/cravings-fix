//initializes
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const dotenvExpand = require('dotenv-expand')
const myEnv = dotenv.config()
dotenvExpand.expand(myEnv)

//app
const app = express()

//port
const port = process.env.PORT || 6400

//routes
const homeRoute = require('./routes/home')

//middleware
app.use(cors())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', homeRoute)

app.listen(port, () => {
  console.log('e-commerce-api is running at port: ', port)
})

module.exports = app
