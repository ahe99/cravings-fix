import config from '../helpers/config'
import * as Minio from 'minio'
import Logger from './logger.lib'

const minioClient = new Minio.Client({
  endPoint: config.minio.endpoint,
  region: config.minio.region,
  port: config.minio.port,
  useSSL: config.minio.useSSL,
  accessKey: config.minio.accessKeyId,
  secretKey: config.minio.secretKeyId,
})

export const bucketObject = {
  foods: 'cravings-fix-food-images',
  banners: 'cravings-fix-banner-images',
} as const
export type ValidBucketNames = (typeof bucketObject)[keyof typeof bucketObject]

const checkMinioConnection = async () => {
  return await minioClient.listBuckets()
}

export const initMinio = async () => {
  try {
    await checkMinioConnection() // Check Minio connection
  } catch (error) {
    Logger.error('Minio connection attempt failed:', error)
  }

  const bucketNames = Object.values(bucketObject)
  bucketNames.map(async (bucket) => {
    const isBucketExists = await minioClient.bucketExists(bucket)
    if (!isBucketExists) {
      await minioClient.makeBucket(bucket)
      Logger.info(`Bucket ${bucket} created successfully.`)
    }
  })

  Logger.debug('Minio Initiated')
}

export const isObjectExisting = async ({
  bucket,
  object,
}: {
  bucket: ValidBucketNames
  object: string
}) => {
  try {
    await minioClient.statObject(bucket, object)
    return true
  } catch (error) {
    Logger.error(error)
    return false
  }
}

export const getObjectUrl = async ({
  bucket,
  object,
}: {
  bucket: ValidBucketNames
  object: string
}) => {
  const isExisting = await isObjectExisting({ bucket, object })
  if (isExisting) {
    const presignedUrl = await minioClient.presignedGetObject(bucket, object)
    return presignedUrl
  } else {
    return null
  }
}

export const putObject = async ({
  bucket,
  object,
  fileBuffer,
}: {
  bucket: ValidBucketNames
  object: string
  fileBuffer: Buffer
}) => {
  const metaData = {}
  const objInfo = await minioClient.putObject(
    bucket,
    object,
    fileBuffer,
    metaData,
  )
  return objInfo
}

export const removeObject = async ({
  bucket,
  object,
}: {
  bucket: ValidBucketNames
  object: string
}) => {
  const isExisting = await isObjectExisting({ bucket, object })
  if (isExisting) {
    const result = minioClient.removeObject(bucket, object)

    return result
  } else {
    return null
  }
}
