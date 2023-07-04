import { notFound } from 'next/navigation'

import { OrderPage } from '@/components/pages'

import { API, SERVER } from '@/utils/API'
import { Order } from '@/utils/ProductData'

const getSpecificOrder = (orderId: Order['objectId']) =>
  SERVER.request<Order>(API.routes.orders.data(orderId))

export default async function OrderRoute({
  params: { orderId },
}: {
  params: { orderId: Order['objectId'] }
}) {
  const prefetchOrder = await getSpecificOrder(orderId)

  const notFoundOrder = !prefetchOrder?.objectId
  if (notFoundOrder) {
    notFound()
  }

  return <OrderPage prefetchOrder={prefetchOrder} />
}
