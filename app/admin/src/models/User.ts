import { ExtendedMongoData } from './MongoData'

export type Roles = 'CUSTOMER' | 'ADMIN'

export type User = ExtendedMongoData<{
  email: string
  username: string
  password: string
  role: Roles
}>
