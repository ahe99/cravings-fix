import { ImageType } from './Image'

export type Product = {
  _id: string
  name: string
  description: string
  price: number
  stockQuantity: number
  categoryId: string
  createdAt: string
  updatedAt: string
  images: ImageType[]
}

export type CartProduct = Product & {
  quantity: number
}
export type Order = {
  _id: string
  products: CartProduct[]
  createdAt: string
  updatedAt: string
  owner: string
  totalPrice: number
}
