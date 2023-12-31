import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'
import path from 'path'

const myEnv = dotenv.config({ path: path.join(__dirname, '/../../.env') })
dotenvExpand.expand(myEnv)

const config = {
  app: {
    port: parseInt(process.env.PORT ?? '3600'), // Listening Port
  },
  mongodb: {
    uri: process.env.MONGO_URI,
  },
  jwt: {
    secret: process.env.TOKEN_SECRET ?? 'secret',
    expiry: process.env.TOKEN_EXPIRY ?? '30d',
  },
  minio: {
    endpoint: process.env.MINIO_HOST ?? 'minio',
    region: process.env.MINIO_REGION ?? '',
    port: parseInt(process.env.MINIO_PORT ?? ''),
    useSSL: process.env.MINIO_SSL === 'true' || false,
    accessKeyId: process.env.MINIO_ACCESS_KEY_ID ?? '',
    secretKeyId: process.env.MINIO_SECRET_KEY_ID ?? '',
    expiry: 24 * 60 * 60,
  },
  debug: process.env.DEBUG,
} as const

export default config
