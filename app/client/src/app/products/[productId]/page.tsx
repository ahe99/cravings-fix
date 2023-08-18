import { notFound } from 'next/navigation'

import { ProductPage } from '@/components/pages'

import { API, SERVER } from '@/API'
import { Product } from '@/models/Product'
import { Category } from '@/models/Category'

// const MAX_DISPLAY_QUANTITY = 6

const getSpecificProduct = (productId: Product['_id']) =>
  SERVER.request<Product>(API.routes.products.data(productId))

const getCategories = () =>
  SERVER.request<Category[]>(API.routes.categories.list)

// const getRecentlyViewedProducts = () =>
//   SERVER.request<Product[]>(API.routes.recently.list)

export default async function ProductRoute({
  params: { productId },
}: {
  params: { productId: Product['_id'] }
}) {
  const prefetchProduct = await getSpecificProduct(productId)
  const prefetchCategories = await getCategories()
  // const prefetchRecentlyProducts = await getRecentlyViewedProducts()
  // const reversedRecentlyProducts = prefetchRecentlyProducts.reverse()
  // const filteredRecentlyProducts = reversedRecentlyProducts.filter(
  //   (_, index) => index < MAX_DISPLAY_QUANTITY,
  // )

  const notFoundProduct = !prefetchProduct?._id
  if (notFoundProduct) {
    notFound()
  }

  return (
    <ProductPage
      prefetchProduct={prefetchProduct}
      prefetchCategories={prefetchCategories}
      prefetchRecentlyProducts={[]}
    />
  )
}
