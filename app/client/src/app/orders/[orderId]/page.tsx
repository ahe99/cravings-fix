import { notFound } from 'next/navigation'

import { OrderPage } from '@/components/pages'

import { API, SERVER } from '@/utils/API'
import { Order } from '@/utils/Order'

const getSpecificOrder = (orderId: Order['_id']) =>
  SERVER.request<Order>(API.routes.orders.data(orderId))

export default async function OrderRoute({
  params: { orderId },
}: {
  params: { orderId: Order['_id'] }
}) {
  const prefetchOrder = await getSpecificOrder(orderId)

  const notFoundOrder = !prefetchOrder?._id
  if (notFoundOrder) {
    notFound()
  }

  return <OrderPage prefetchOrder={prefetchOrder} />
}
