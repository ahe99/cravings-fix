import { NextFunction, Request, Response, RequestHandler } from 'express'
import { ZodError } from 'zod'
import { MongooseError } from 'mongoose'
import { MulterError } from 'multer'

import {
  ClientError,
  ServerError,
  responseMessage,
} from '../utils/errorException'

const exceptionParser = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
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

  if (err instanceof MulterError) {
    return res.status(400).json({ error: err.message })
  }

  if (err instanceof Error) {
    console.log('Error: ', err)
  } else {
    console.log('Error: ', err)
  }
  res.status(500).send(responseMessage[500])
  next(err)
}

export default exceptionParser
