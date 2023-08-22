import { IncomingHttpHeaders } from 'http'
import { Schema } from 'mongoose'

declare module 'http' {
  interface IncomingHttpHeaders {
    authorization?: string
    userId?: Schema.ObjectId
  }
}
