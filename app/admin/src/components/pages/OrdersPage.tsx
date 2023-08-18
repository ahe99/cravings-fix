import { useMemo } from 'react'
import { Button, Card } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { useOrders } from '@/hooks'
import { OrdersTable } from '@/components/organisms'
import { Breadcrumbs } from '@/components/atoms'

import CSS from './OrdersPage.module.css'

export const OrdersPage = () => {
  const orders = useOrders()

  const ordersData = useMemo(() => orders.query.data ?? [], [orders.query.data])

  return (
    <div className={CSS.orders_page}>
      <div className={CSS.header}>
        <Breadcrumbs />
      </div>
      <Card title="Latest Orders">
        <OrdersTable orders={ordersData} />
      </Card>
    </div>
  )
}
