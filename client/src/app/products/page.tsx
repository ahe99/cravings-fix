import { ProductsPage } from '@/components/pages'

import { API, SERVER } from '@/utils/API'
import { Category } from '@/utils/Category'
import { Product } from '@/utils/ProductData'

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
