export type ImageType = {
  blurHash: string
  src: string
}

export type Product = {
  id: string
  name: string
  description: string
  price: number
  stock_quantity: number
  category_name: string
  createdAt: string
  updatedAt: string
  image: ImageType
}
export type CartProduct = Product & {
  quantity: number
}
export type Order = {
  id: string
  products: CartProduct[]
  createdAt: string
  updatedAt: string
  buyer: string
  totalPrice: number
  description: string
}
