import { useMemo } from 'react'
import { useRouter } from 'next/navigation'

import { OrderList } from '@/components/organisms'

import { useOrders } from '@/hooks'
import { Order } from '@/utils/ProductData'

interface OrdersPageProps {
  prefetchOrders?: Order[]
}

export const OrdersPage = ({ prefetchOrders = [] }: OrdersPageProps) => {
  const orders = useOrders(prefetchOrders)
  const router = useRouter()

  const ordersData = useMemo(() => orders.query.data ?? [], [orders.query.data])

  const handleClickOrderItem = (orderId: Order['objectId']) => {
    router.push(`orders/${orderId}`)
  }

  return (
    <main className="page-container">
      <h1 className="mb-8 text-3xl">History Orders</h1>
      <OrderList orders={ordersData} onClickItem={handleClickOrderItem} />
    </main>
  )
}
