// import {} from '@wayne0127/mall-api-types'

export type Product = {
  id: string
  name: string
  description: string
  price: number
  stock_quantity: number
  category_name: string
  createdAt: string
  updatedAt: string
}
export type CartProduct = Product & {
  quantity: number
}
