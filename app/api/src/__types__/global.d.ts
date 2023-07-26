import { IncomingHttpHeaders } from 'http'

declare module 'http' {
  interface IncomingHttpHeaders {
    authorization?: string
    userId?: string
  }
}
