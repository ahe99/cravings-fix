import { notFound } from 'next/navigation'

import { OrderPage } from '@/components/pages'

import { Order } from '@/models/Order'

export default async function OrderRoute({
  params: { orderId },
}: {
  params: { orderId: Order['_id'] }
}) {
  return <OrderPage orderId={orderId} />
}
