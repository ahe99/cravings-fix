import { useMemo } from 'react'
import { useRouter } from 'next/navigation'

import { OrderList } from '@/components/organisms'

import { useOrders } from '@/hooks'
import { Order } from '@/models/Order'

interface OrdersPageProps {}

export const OrdersPage = () => {
  const orders = useOrders()
  const router = useRouter()

  const ordersData = useMemo(() => orders.query.data ?? [], [orders.query.data])

  const handleClickOrderItem = (orderId: Order['_id']) => {
    router.push(`orders/${orderId}`)
  }

  return (
    <main className="page-container">
      <h1 className="mb-8 text-3xl">History Orders</h1>
      <OrderList orders={ordersData} onClickItem={handleClickOrderItem} />
    </main>
  )
}
