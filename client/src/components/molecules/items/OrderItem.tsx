import dayjs from 'dayjs'

import { Order } from '@/utils/ProductData'
import { Divider } from '@/components/atoms'

interface OrderItemProps {
  order: Order
  onClick: (orderId: Order['objectId']) => void
}

export const OrderItem = ({
  order: { objectId, createdAt, products, totalPrice },
  onClick = () => {},
}: OrderItemProps) => {
  return (
    <div
      className="flex flex-col gap-2 rounded-md border-4 border-dashed border-brown-800 bg-white p-4 hover:cursor-pointer hover:opacity-40"
      onClick={() => onClick(objectId)}
    >
      <div className="flex flex-row justify-between font-bold">
        <div>{`Id: ${objectId}`}</div>
        <div>{dayjs(createdAt).format('YYYY-MM-DD HH:mm:ss')}</div>
      </div>
      <Divider />
      <div>
        {products.map(({ objectId, price, quantity, name }) => (
          <div className="flex flex-row justify-between" key={objectId}>
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
