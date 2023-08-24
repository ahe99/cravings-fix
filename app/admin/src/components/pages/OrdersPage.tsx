import { useState, useMemo } from 'react'
import { Card, DatePicker } from 'antd'
import dayjs from 'dayjs'

import {
  useDateRange,
  useOrders,
  useMessage,
  useRightDrawer,
  APIRequestEditOrder,
} from '@/hooks'
import { DATE_FORMAT } from '@/helpers/date'
import { Order } from '@/models/Order'
import { exceptionHandler } from '@/helpers/exceptionHandler'

import { OrdersTable, OrderForm } from '@/components/organisms'
import { Breadcrumbs } from '@/components/atoms'

import CSS from './OrdersPage.module.css'

const { RangePicker } = DatePicker

export const OrdersPage = () => {
  const orders = useOrders()
  const [dateRange, setDateRange] = useDateRange()
  const { RightDrawer, actions } = useRightDrawer()
  const { message } = useMessage()

  const [clickedOrder, setClickedOrder] = useState<Order | null>(null)

  const ordersData = useMemo(() => orders.query.data ?? [], [orders.query.data])

  const onCloseDrawer = () => {
    actions.close()
  }

  const onClickOrderItem = (category: Order) => {
    setClickedOrder(category)
    actions.open()
  }

  const onSubmit = async (formValues: APIRequestEditOrder) => {
    message.loading('In Progress...')
    try {
      await orders.update.mutateAsync(formValues)
      message.success('Order Updated!')
      actions.close()
    } catch (e) {
      message.error(exceptionHandler(e))
    }
  }

  return (
    <div className={CSS.orders_page}>
      <div className={CSS.header}>
        <Breadcrumbs />
        <RangePicker
          defaultValue={[dateRange.start, dateRange.end]}
          onChange={(props) => {
            setDateRange({
              start: props && dayjs(props[0]),
              end: props && dayjs(props[1]),
            })
          }}
          format={DATE_FORMAT}
        />
      </div>
      <Card>
        <OrdersTable orders={ordersData} onClickItem={onClickOrderItem} />
      </Card>

      <RightDrawer onClose={onCloseDrawer} size="large">
        <Card title="Edit a Order">
          {clickedOrder !== null && (
            <OrderForm.Edit initialValues={clickedOrder} onSubmit={onSubmit} />
          )}
        </Card>
      </RightDrawer>
    </div>
  )
}
