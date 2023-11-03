import { Product } from './Product'

export type TrendingProduct = Product & {
  sold: number
}

export type Bestseller = Product & {
  sold: number
}
