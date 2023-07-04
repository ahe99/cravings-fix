import { OrdersPage } from '@/components/pages'

import { API, SERVER } from '@/utils/API'
import { Order } from '@/utils/ProductData'

const getOrders = () => SERVER.request<Order[]>(API.routes.orders.list)

export default async function orders() {
  const prefetchOrders = await getOrders()
  return <OrdersPage prefetchOrders={prefetchOrders} />
}
