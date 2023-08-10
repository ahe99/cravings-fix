import dayjs from 'dayjs'

import { Order } from '@/utils/Order'
import { Divider } from '@/components/atoms'

interface OrderItemProps {
  order: Order
  onClick: (orderId: Order['_id']) => void
}

export const OrderItem = ({
  order: { _id, createdAt, orderItems, totalPrice },
  onClick = () => {},
}: OrderItemProps) => {
  return (
    <div
      className="flex flex-col gap-2 rounded-md border-4 border-dashed border-brown-800 bg-white p-4 hover:cursor-pointer hover:opacity-40"
      onClick={() => onClick(_id)}
    >
      <div className="flex flex-row justify-between font-bold">
        <div>{`Id: ${_id}`}</div>
        <div>{dayjs(createdAt).format('YYYY-MM-DD HH:mm:ss')}</div>
      </div>
      <Divider />
      <div>
        {orderItems.map(({ _id, price, quantity, food: { name } }) => (
          <div className="flex flex-row justify-between" key={_id}>
            <div>{`${name} x${quantity}`}</div>
            <div>{`$${price}`}</div>
          </div>
        ))}
      </div>
      <Divider />
      <div className="flex flex-row justify-between font-bold">
        <div>Total</div>
        <div>{`$${totalPrice}`}</div>
      </div>
    </div>
  )
}
