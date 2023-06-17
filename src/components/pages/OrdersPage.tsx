import { useMemo } from 'react'
import { Button } from '@mui/material'
import { MdAdd } from 'react-icons/md'

import { useOrders } from '@/hooks'
import { OrderTable } from '@/components/organisms'
import { Breadcrumbs } from '@/components/atoms'

import CSS from './OrdersPage.module.css'

export const OrdersPage = () => {
  const orders = useOrders()

  const ordersData = useMemo(() => orders.query.data ?? [], [orders.query.data])

  return (
    <div className={CSS.orders_page}>
      <div className={CSS.header}>
        <Breadcrumbs />
        <Button
          variant="contained"
          className={CSS.add_button}
          endIcon={<MdAdd />}
        >
          New
        </Button>
      </div>

      <OrderTable orders={ordersData} />
    </div>
  )
}
