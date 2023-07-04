import { ImageType } from './Image'

export type Product = {
  objectId: string
  name: string
  description: string
  price: number
  stock_quantity: number
  category_id: string
  category_name: string
  createdAt: string
  updatedAt: string
  image: ImageType
}
export type CartProduct = Product & {
  quantity: number
}
export type Order = {
  objectId: string
  products: CartProduct[]
  createdAt: string
  updatedAt: string
  owner: string
  totalPrice: number
}
