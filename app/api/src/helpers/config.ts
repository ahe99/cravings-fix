import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'

const myEnv = dotenv.config({ path: __dirname + '/../../.env' })
dotenvExpand.expand(myEnv)

const config = {
  app: {
    port: parseInt(process.env.PORT || '3600'), // Listening Port
  },
  mongodb: {
    uri: process.env.MONGO_URI,
  },
  jwt: {
    secret: process.env.TOKEN_SECRET || 'secret',
    expiry: process.env.TOKEN_EXPIRY || '30d',
  },
} as const

export default config
