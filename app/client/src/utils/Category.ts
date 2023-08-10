import { ExtendedMongoData } from './MongoData'

export type Category = ExtendedMongoData<{
  name: string
  description: string
}>
