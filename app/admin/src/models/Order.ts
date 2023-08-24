import { Product } from './Product'
import { User } from './User'
import { ExtendedMongoData } from './MongoData'

export type OrderProduct = ExtendedMongoData<{
  user: string
  food: Product
  quantity: number
  price: number
}>

export type Order = ExtendedMongoData<{
  user: User
  orderItems: OrderProduct[]
  totalPrice: number
}>
