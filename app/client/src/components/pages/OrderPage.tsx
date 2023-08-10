import dayjs from 'dayjs'

import { Divider } from '@/components/atoms'
import { ProductProfileCard } from '@/components/molecules'

import { Order } from '@/utils/Order'
interface OrderPageProps {
  prefetchOrder: Order
}

export const OrderPage = ({
  prefetchOrder: { _id, createdAt, totalPrice, orderItems = [] },
}: OrderPageProps) => {
  return (
    <main className="page-container">
      <h1 className="mb-8 text-3xl">Order Detail</h1>

      <div className="flex flex-col gap-4 rounded-md border-4 border-dashed border-brown-800 p-4">
        <div className="flex flex-row justify-between text-xl font-bold">
          <div>{`Id: ${_id}`}</div>
          <div>{dayjs(createdAt).format('YYYY-MM-DD HH:mm:ss')}</div>
        </div>
        <Divider />
        {orderItems.map((orderItem) => (
          <div key={orderItem._id} className="flex flex-row">
            <ProductProfileCard className="flex-1" product={orderItem.food} />
            <div className="flex-shrink-0 self-start font-bold">{`x${orderItem.quantity}`}</div>
          </div>
        ))}
        <Divider />

        <div className="flex flex-col gap-4">
          <div className="flex flex-row justify-between text-lg font-bold">
            <div>Total</div>
            <div>{`$${totalPrice}`}</div>
          </div>
        </div>
      </div>
    </main>
  )
}
