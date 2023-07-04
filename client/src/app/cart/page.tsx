import { CartProductPage } from '@/components/pages'

import { API, SERVER } from '@/utils/API'
import { CartProduct } from '@/utils/ProductData'

const getCartProducts = () =>
  SERVER.request<CartProduct[]>(API.routes.cart.list)

export default async function Cart() {
  const prefetchProducts = await getCartProducts()
  return <CartProductPage prefetchCartProducts={prefetchProducts} />
}
