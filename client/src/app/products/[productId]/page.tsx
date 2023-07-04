import { notFound } from 'next/navigation'

import { ProductPage } from '@/components/pages'

import { API, SERVER } from '@/utils/API'
import { Product } from '@/utils/ProductData'

// const MAX_DISPLAY_QUANTITY = 6

const getSpecificProduct = (productId: Product['objectId']) =>
  SERVER.request<Product>(API.routes.products.data(productId))

// const getRecentlyViewedProducts = () =>
//   SERVER.request<Product[]>(API.routes.recently.list)

export default async function ProductRoute({
  params: { productId },
}: {
  params: { productId: Product['objectId'] }
}) {
  const prefetchProduct = await getSpecificProduct(productId)
  // const prefetchRecentlyProducts = await getRecentlyViewedProducts()
  // const reversedRecentlyProducts = prefetchRecentlyProducts.reverse()
  // const filteredRecentlyProducts = reversedRecentlyProducts.filter(
  //   (_, index) => index < MAX_DISPLAY_QUANTITY,
  // )

  const notFoundProduct = !prefetchProduct?.objectId
  if (notFoundProduct) {
    notFound()
  }

  return (
    <ProductPage
      prefetchProduct={prefetchProduct}
      prefetchRecentlyProducts={[]}
    />
  )
}
