import { ImageType } from './Image'
import { ExtendedMongoData } from './MongoData'
import { Category } from './Category'

export type Product = ExtendedMongoData<{
  name: string
  description: string
  price: number
  stockQuantity: number
  category: Category
  images: ImageType[]
}>
