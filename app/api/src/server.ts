// initializes
import express, { Application } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import config from './helpers/config'
import initSwagger from './lib/swagger.lib'
import { initMinio } from './lib/minio.lib'
import morgan from './middleware/logger.middleware'
import exceptionParser from './middleware/exception.middleware'

// routes
import homeRoute from './routes/home.route'
import foodRoute from './routes/food.route'
import categoryRoute from './routes/category.route'
import cartRoute from './routes/cart.route'
import orderRoute from './routes/order.route'
import bannerRoute from './routes/banner.route'
import userRoute from './routes/user.route'
import newsRoute from './routes/news.route'
import trendingRoute from './routes/trending.route'

import bodyParser from 'body-parser'

// mongodb
mongoose.connect(config.mongodb.uri ?? 'mongo')
mongoose.set('strictQuery', false)

// app
const app: Application = express()
// port
const port = config.app.port || 3600

initSwagger(app)
initMinio()

// middleware
app.use(cors())
app.use(morgan)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/', homeRoute)
app.use('/foods', foodRoute)
app.use('/categories', categoryRoute)
app.use('/carts', cartRoute)
app.use('/orders', orderRoute)
app.use('/banners', bannerRoute)
app.use('/users', userRoute)
app.use('/news', newsRoute)
app.use('/trending', trendingRoute)

app.use(exceptionParser)

app.listen(port, () => {
  console.log('cravings-fix-api is running at port: ', port)
})

export default app
