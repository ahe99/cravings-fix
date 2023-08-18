import { ProductsPage } from '@/components/pages'

import { API, SERVER } from '@/API'
import { Category } from '@/models/Category'
import { Product } from '@/models/Product'

const getProducts = () => SERVER.request<Product[]>(API.routes.products.list)
const getCategories = () =>
  SERVER.request<Category[]>(API.routes.categories.list)

export default async function Products() {
  const prefetchProducts = await getProducts()
  const prefetchCategories = await getCategories()
  return (
    <ProductsPage
      prefetchProducts={prefetchProducts}
      prefetchCategories={prefetchCategories}
    />
  )
}
