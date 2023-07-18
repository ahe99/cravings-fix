import { RequestHandler } from 'express'

const path = require('path')

export const indexPage: RequestHandler = (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'))
}
