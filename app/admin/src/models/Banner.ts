import { ImageType } from './Image'
import { ExtendedMongoData } from './MongoData'

export type Banner = Omit<ExtendedMongoData<ImageType>, '_id'>
