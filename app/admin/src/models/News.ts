import { ExtendedMongoData } from './MongoData'
import { User } from './User'

export type Policy = 'CUSTOMER' | 'ADMIN'

export type News = ExtendedMongoData<{
  title: string
  content: string
  policy: Policy
  author: User
}>
