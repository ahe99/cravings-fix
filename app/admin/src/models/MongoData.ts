export type MongoData = {
  _id: string
  createdAt: string
  updatedAt: string
  _v: number
}

export type ExtendedMongoData<T extends object = object> = T & MongoData
