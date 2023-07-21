import { ZodSchema } from 'zod'
import { RequestHandler } from 'express'

export const validateResource =
  (schema: ZodSchema): RequestHandler =>
  async (req, res, next) => {
    try {
      const validateResult = await schema.safeParseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      })
      if (validateResult.success) {
        req.body = validateResult.data.body
        req.query = validateResult.data.query
        req.params = validateResult.data.params
        return next()
      } else {
        const formattedErrors = validateResult.error.errors.map((error) => {
          return {
            code: error.code,
            path: error.path,
            message: error.message,
          }
        })
        return res.status(400).json({ error: formattedErrors })
      }
    } catch (err) {
      return res.status(400).json(err)
    }
  }
