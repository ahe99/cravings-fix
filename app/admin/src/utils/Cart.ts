import { Product } from './Product'
import { User } from './User'
import { ExtendedMongoData } from './MongoData'

export type CartProduct = ExtendedMongoData<{
  user: string
  food: Product
  quantity: number
  price: number
}>

export type Cart = ExtendedMongoData<{
  user: User
  cartItems: CartProduct[]
}>
